/* v136: Stochastische Match-Engine
   Ziel: Die Simulation berechnet vor dem Spiel ein komplettes 90-Minuten-Objekt
   mit Wahrscheinlichkeiten, dynamischer Stärke, Form/Frische/Moral, Heimvorteil,
   Momentum, Karten, Verletzungen und Ereignisverlauf. */
(function(){
  'use strict';

  const clampLocal = (v, min, max) => Math.max(min, Math.min(max, Number.isFinite(Number(v)) ? Number(v) : min));
  const rnd = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
  const pick = (arr) => arr && arr.length ? arr[rnd(0, arr.length - 1)] : null;
  const avg = (arr) => arr.length ? arr.reduce((a,b)=>a+b,0) / arr.length : 0;
  const hasFn = (name) => typeof globalThis[name] === 'function';
  const call = (name, ...args) => hasFn(name) ? globalThis[name](...args) : undefined;
  const safeEuro = (v) => hasFn('euro') ? globalThis.euro(v) : `${Math.round(v).toLocaleString('de-DE')} €`;

  function v136PlayerSkill(player, keys, fallback) {
    if (!player) return fallback || 50;
    const skills = player.skills || {};
    const values = (Array.isArray(keys) ? keys : [keys]).map(k => Number(skills[k])).filter(Number.isFinite);
    if (values.length) return avg(values);
    return Number(player.strength || player.ca || fallback || 50);
  }

  function v136RoleGroup(player) {
    const pos = String(player?.pos || '').toUpperCase();
    if (pos === 'TW' || pos === 'GK') return 'keeper';
    if (['IV','LV','RV','DM'].includes(pos)) return 'defense';
    if (['ZM','OM','LM','RM'].includes(pos)) return 'midfield';
    return 'attack';
  }

  function v136SquadForOwn() {
    let entries = [];
    try { entries = typeof lineupEntries === 'function' ? lineupEntries() : []; } catch(e) { entries = []; }
    let players = entries.map(e => e.player).filter(Boolean);
    if (players.length < 11) players = (state.players || []).slice(0, 11);
    return players.slice(0, 11);
  }

  function v136SquadForOpponent(opponent) {
    let roster = [];
    try { roster = typeof opponentRosterForMatch === 'function' ? opponentRosterForMatch(opponent) : []; } catch(e) { roster = []; }
    if (!Array.isArray(roster) || !roster.length) {
      roster = Array.from({ length: 18 }, (_, i) => ({
        id: `opp-${opponent}-${i}`,
        name: `${opponent} Spieler ${i+1}`,
        pos: ['TW','IV','IV','LV','RV','DM','ZM','ZM','OM','LA','ST','RA'][i % 12],
        strength: 48 + rnd(0, 26),
        fitness: 82 + rnd(0, 18),
        satisfaction: 55 + rnd(0, 30),
        skills: {}
      }));
    }
    return roster.slice(0, 11);
  }

  function v136PlayerEffective(player, team, minute) {
    const base = Number(player?.strength || player?.ca || 50);
    const fitness = clampLocal(player?.fitness ?? player?.freshness ?? 82, 1, 100);
    const morale = clampLocal(player?.satisfaction ?? player?.morale ?? 60, 1, 100);
    let formFactor = 1;
    const form = String(player?.form || '').toLowerCase();
    if (form.includes('hoch')) formFactor += 0.05;
    if (form.includes('tief') || form.includes('frustriert')) formFactor -= 0.06;
    let fitnessFactor = 0.82 + fitness / 500; // 1.00 bei 90 Frische
    let moraleFactor = 0.92 + morale / 800; // 1.00 bei 64 Moral
    let fatigue = 1;
    if (minute >= 60) {
      const stamina = v136PlayerSkill(player, ['ausdauer','stamina','kondition'], 58);
      const fatigueLoss = ((minute - 59) / 31) * (0.05 + Math.max(0, 70 - stamina) / 500);
      fatigue -= fatigueLoss;
    }
    let trait = String(player?.trait || player?.characterTrait || player?.charakter || '').toLowerCase();
    if (trait.includes('kämpfer') && team.momentum < -0.4) moraleFactor += 0.04;
    if (trait.includes('nerven') && !trait.includes('bündel') && minute >= 80) formFactor += 0.04;
    if (trait.includes('nervenbündel') && minute >= 80) formFactor -= 0.05;
    if (trait.includes('musterprofi')) formFactor += 0.02;
    return base * formFactor * fitnessFactor * moraleFactor * fatigue;
  }

  function v136TeamMatrix(players, opponent, isHome, minute, redCards, momentum) {
    const team = { momentum: momentum || 0 };
    const attackPlayers = players.filter(p => v136RoleGroup(p) === 'attack' || v136RoleGroup(p) === 'midfield');
    const defensePlayers = players.filter(p => v136RoleGroup(p) === 'defense' || v136RoleGroup(p) === 'keeper');
    const midfieldPlayers = players.filter(p => v136RoleGroup(p) === 'midfield');
    const eff = p => v136PlayerEffective(p, team, minute);
    let attack = avg(attackPlayers.map(eff)) || avg(players.map(eff)) || 50;
    let defense = avg(defensePlayers.map(eff)) || avg(players.map(eff)) || 50;
    let control = avg(midfieldPlayers.map(eff)) || avg(players.map(eff)) || 50;
    const morale = avg(players.map(p => clampLocal(p?.satisfaction ?? p?.morale ?? 60, 1, 100))) || 60;
    const fitness = avg(players.map(p => clampLocal(p?.fitness ?? p?.freshness ?? 82, 1, 100))) || 82;
    if (isHome) { attack *= 1.06; defense *= 1.04; control *= 1.03; }
    const mod = (typeof tacticModifier === 'function') ? tacticModifier() : { attack:0, defense:0, control:0, risk:0, total:0, skillSynergy:0 };
    if (isHome) {
      attack += (mod.attack || 0) + (mod.total || 0) * 0.25;
      defense += (mod.defense || 0) + (mod.total || 0) * 0.20;
      control += (mod.control || 0) + (mod.skillSynergy || 0) * 0.40;
    }
    // Manager-Eigenschaft Taktikfuchs: Taktik wirkt leicht stärker.
    const managerTraits = state.managerTraits || state.manager?.traits || [];
    if (isHome && Array.isArray(managerTraits) && managerTraits.some(t => String(t).toLowerCase().includes('taktik'))) {
      attack *= 1.025; defense *= 1.025; control *= 1.025;
    }
    if (redCards > 0) { attack *= Math.pow(0.88, redCards); defense *= Math.pow(0.86, redCards); control *= Math.pow(0.90, redCards); }
    const moraleFactor = 0.94 + morale / 1000;
    const fitnessFactor = 0.96 + fitness / 2500;
    const momentumFactor = 1 + clampLocal(momentum, -1.5, 1.5) * 0.035;
    attack *= moraleFactor * fitnessFactor * momentumFactor;
    defense *= moraleFactor * fitnessFactor * momentumFactor;
    control *= moraleFactor * fitnessFactor * momentumFactor;
    return { attack, defense, control, morale, fitness, power: (attack + defense + control) / 3 };
  }

  function v136WeightedPick(players, group, weights) {
    let candidates = players.filter(p => group === 'any' || v136RoleGroup(p) === group || (group === 'midOrAttack' && ['midfield','attack'].includes(v136RoleGroup(p))) || (group === 'defOrMid' && ['defense','midfield'].includes(v136RoleGroup(p))));
    if (!candidates.length) candidates = players;
    const scored = candidates.map(p => {
      const score = (weights || ['strength']).reduce((sum, k) => sum + v136PlayerSkill(p, k, p.strength || 50), 0) / Math.max(1, (weights || []).length || 1);
      return { p, w: Math.max(1, score + rnd(-8, 8)) };
    });
    const total = scored.reduce((s,x)=>s+x.w,0);
    let r = Math.random() * total;
    for (const x of scored) { r -= x.w; if (r <= 0) return x.p; }
    return scored[0]?.p || null;
  }

  function v136ResolveChance(ctx, side, minute) {
    const own = side === 'own';
    const attackers = own ? ctx.ownPlayers : ctx.oppPlayers;
    const defenders = own ? ctx.oppPlayers : ctx.ownPlayers;
    const team = own ? ctx.own : ctx.opp;
    const opp = own ? ctx.opp : ctx.own;
    const creator = v136WeightedPick(attackers, 'midOrAttack', ['passspiel','technik','uebersicht']);
    const shooter = v136WeightedPick(attackers, 'attack', ['abschluss','torriecher','technik']);
    const keeper = v136WeightedPick(defenders, 'keeper', ['reflexe','handling','stellungsspiel']);
    const defender = v136WeightedPick(defenders, 'defense', ['zweikampf','stellungsspiel','antizipation']);
    const shotQuality = v136PlayerSkill(shooter, ['abschluss','torriecher','technik'], shooter?.strength || 55) * 0.65 + team.attack * 0.35 + rnd(-12, 12);
    const defensiveQuality = v136PlayerSkill(keeper, ['reflexe','handling','sprungkraft'], keeper?.strength || 55) * 0.55 + v136PlayerSkill(defender, ['zweikampf','stellungsspiel'], defender?.strength || 55) * 0.25 + opp.defense * 0.20 + rnd(-10, 10);
    let goalChance = 0.20 + (shotQuality - defensiveQuality) / 180;
    if (minute >= 80 && String(shooter?.trait || '').toLowerCase().includes('mann ohne nerven')) goalChance += 0.04;
    if (minute >= 80 && String(shooter?.trait || '').toLowerCase().includes('nervenbündel')) goalChance -= 0.04;
    goalChance = clampLocal(goalChance, 0.05, 0.46);
    const roll = Math.random();
    if (roll < goalChance) {
      return { type:'goal', player: shooter, assist: creator && creator !== shooter ? creator : null };
    }
    if (roll < goalChance + 0.30) return { type:'save', player: shooter, keeper };
    if (roll < goalChance + 0.60) return { type:'miss', player: shooter };
    if (roll < goalChance + 0.66) {
      const penGoal = Math.random() < clampLocal(0.70 + (v136PlayerSkill(shooter, ['abschluss','technik'], shooter?.strength || 55) - v136PlayerSkill(keeper, ['reflexe','nervenstaerke'], keeper?.strength || 55)) / 250, 0.55, 0.88);
      return { type: penGoal ? 'penalty_goal' : 'missed_penalty', player: shooter };
    }
    return { type:'foul', player: defender };
  }

  function v136CardProbability(player, base) {
    const trait = String(player?.trait || player?.characterTrait || '').toLowerCase();
    let factor = 1;
    if (trait.includes('hitzkopf') || trait.includes('aggressiv')) factor *= 1.55;
    if (trait.includes('musterprofi')) factor *= 0.78;
    const aggression = clampLocal(player?.aggression ?? player?.aggressivitaet ?? 45, 1, 100);
    factor *= 0.75 + aggression / 170;
    return base * factor;
  }

  function v136InjuryChance(player, minute, inMatch) {
    let risk = inMatch ? 0.00075 : 0.00035;
    const fitness = clampLocal(player?.fitness ?? player?.freshness ?? 82, 1, 100);
    if (fitness < 60) risk *= 1.7;
    if (fitness < 45) risk *= 2.2;
    if (String(player?.trait || '').toLowerCase().includes('verletzungsanf')) risk *= 1.8;
    if (String(player?.trait || '').toLowerCase().includes('robust')) risk *= 0.65;
    if (player?.firstTeamTraining) risk *= 1.05;
    const managerTraits = state.managerTraits || state.manager?.traits || [];
    if (Array.isArray(managerTraits) && managerTraits.some(t => String(t).toLowerCase().includes('fürsorger') || String(t).toLowerCase().includes('fuersorger'))) risk *= 0.90;
    return risk;
  }

  function v136GenerateInjury(player) {
    const roll = Math.random();
    if (roll < 0.70) return { name: pick(['Prellung','Muskelzerrung','leichte Bänderdehnung']) || 'Muskelzerrung', days: rnd(2, 7) };
    if (roll < 0.95) return { name: pick(['Muskelfaserriss','Kapselverletzung','Bänderriss']) || 'Muskelfaserriss', days: rnd(14, 42) };
    return { name: pick(['Kreuzbandriss','Achillessehnenreizung','schwerer Bänderriss']) || 'Kreuzbandriss', days: rnd(90, 240) };
  }

  function v136GenerateMatchPlan(opponent) {
    const ownPlayers = v136SquadForOwn();
    const oppPlayers = v136SquadForOpponent(opponent);
    const events = [];
    let ownGoals = 0, oppGoals = 0, ownShots = 0, oppShots = 0;
    let ownRed = 0, oppRed = 0;
    let ownMomentum = 0, oppMomentum = 0;
    const minuteStatus = [];

    for (let minute = 1; minute <= 90; minute++) {
      ownMomentum *= 0.90;
      oppMomentum *= 0.90;
      const own = v136TeamMatrix(ownPlayers, opponent, true, minute, ownRed, ownMomentum);
      const opp = v136TeamMatrix(oppPlayers, opponent, false, minute, oppRed, oppMomentum);
      minuteStatus[minute] = { own, opp };
      const totalTempo = 0.085 + clampLocal((own.control + opp.control - 100) / 1200, -0.015, 0.035);
      const lateChaos = minute > 75 ? 0.012 : 0;
      const highlightChance = clampLocal(totalTempo + lateChaos, 0.07, 0.16);
      if (Math.random() < highlightChance) {
        const ownChanceWeight = Math.max(12, own.attack * 0.62 + own.control * 0.20 - opp.defense * 0.24 + 45);
        const oppChanceWeight = Math.max(12, opp.attack * 0.62 + opp.control * 0.20 - own.defense * 0.24 + 43);
        const side = Math.random() < ownChanceWeight / (ownChanceWeight + oppChanceWeight) ? 'own' : 'opp';
        const resolved = v136ResolveChance({ ownPlayers, oppPlayers, own, opp }, side, minute);
        if (side === 'own') ownShots++; else oppShots++;
        if (resolved.type === 'goal' || resolved.type === 'penalty_goal') {
          if (side === 'own') { ownGoals++; ownMomentum += 0.8; oppMomentum -= 0.5; }
          else { oppGoals++; oppMomentum += 0.8; ownMomentum -= 0.5; }
          const p = resolved.player || pick(side === 'own' ? ownPlayers : oppPlayers);
          const a = resolved.assist;
          events.push({
            type:'goal', minute, team:side,
            scorerId: side === 'own' ? p?.id : undefined,
            scorerName: p?.name || 'Unbekannt',
            assistId: side === 'own' ? a?.id : undefined,
            assistName: a?.name,
            text: `${minute}. Min: Tor für ${side === 'own' ? ownClubName() : opponent}! ${p?.name || 'Ein Spieler'} ${resolved.type === 'penalty_goal' ? 'verwandelt einen Elfmeter' : 'trifft'}${a ? ` nach Vorarbeit von ${a.name}` : ''}.`
          });
        } else if (resolved.type === 'missed_penalty') {
          const p = resolved.player;
          events.push({ type:'missed_penalty', minute, team:side, playerId:side==='own'?p?.id:undefined, playerName:p?.name, text:`${minute}. Min: ${p?.name || 'Ein Spieler'} verschießt einen Elfmeter für ${side === 'own' ? ownClubName() : opponent}.` });
        } else if (resolved.type === 'save' && Math.random() < 0.35) {
          events.push({ type:'chance', minute, team:side, playerName:resolved.player?.name, text:`${minute}. Min: Große Chance für ${side === 'own' ? ownClubName() : opponent}, aber ${resolved.keeper?.name || 'der Torwart'} pariert.` });
        } else if (resolved.type === 'miss' && Math.random() < 0.22) {
          events.push({ type:'chance', minute, team:side, playerName:resolved.player?.name, text:`${minute}. Min: ${resolved.player?.name || 'Ein Spieler'} schießt knapp vorbei.` });
        }
      }

      // Karten-Rhythmus: etwa 1.5 bis 2.5 Gelbe pro Team, selten Rot/Gelb-Rot.
      ['own','opp'].forEach(side => {
        const list = side === 'own' ? ownPlayers : oppPlayers;
        const p = v136WeightedPick(list, 'defOrMid', ['zweikampf','aggression']);
        if (!p) return;
        if (Math.random() < v136CardProbability(p, 0.020)) {
          events.push({ type:'yellow', minute, team:side, playerId:side==='own'?p.id:undefined, playerName:p.name, text:`${minute}. Min: Gelbe Karte für ${p.name}${side === 'opp' ? ` (${opponent})` : ''}.` });
        }
        if (Math.random() < v136CardProbability(p, 0.00055)) {
          if (side === 'own') ownRed++; else oppRed++;
          events.push({ type:'red', minute, team:side, playerId:side==='own'?p.id:undefined, playerName:p.name, text:`${minute}. Min: Rote Karte für ${p.name}${side === 'opp' ? ` (${opponent})` : ''}!` });
        }
      });

      // Verletzungen: selten, aber abhängig von Frische/Anfälligkeit.
      ['own','opp'].forEach(side => {
        const list = side === 'own' ? ownPlayers : oppPlayers;
        const p = pick(list);
        if (p && Math.random() < v136InjuryChance(p, minute, true)) {
          const injury = v136GenerateInjury(p);
          events.push({ type:'injury', minute, team:side, playerId:side==='own'?p.id:undefined, playerName:p.name, injury, text:`${minute}. Min: ${p.name}${side === 'opp' ? ` (${opponent})` : ''} verletzt sich (${injury.name}, ca. ${injury.days} Tage).` });
        }
      });
    }

    events.sort((a,b)=>a.minute-b.minute || String(a.type).localeCompare(String(b.type))).forEach((e,i)=>e.id=`v136-${e.minute}-${i}-${e.type}-${e.playerId||e.playerName||''}`);
    const last = minuteStatus[90] || { own: v136TeamMatrix(ownPlayers, opponent, true, 90, ownRed, ownMomentum), opp: v136TeamMatrix(oppPlayers, opponent, false, 90, oppRed, oppMomentum) };
    const mod = (typeof tacticModifier === 'function') ? tacticModifier() : { total:0, skillSynergy:0 };
    return {
      events, ownGoals, oppGoals, ownShots, oppShots,
      setup: { own: last.own, opp: last.opp, expectation: last.own.attack / Math.max(1, last.own.attack + last.opp.defense), ownPlayers, oppPlayers, homeAdvantage: true },
      ratingRecords: {},
      engineVersion: 'v136-stochastic',
      mod,
      unit: typeof lineupUnitScores === 'function' ? lineupUnitScores() : {}
    };
  }

  predictedMatchScore = function(opponent) {
    const plan = v136GenerateMatchPlan(opponent || (typeof currentOpponentName === 'function' ? currentOpponentName() : 'Gegner'));
    return {
      ownGoals: plan.ownGoals,
      oppGoals: plan.oppGoals,
      mod: plan.mod,
      positionPenalty: typeof lineupPenaltyCount === 'function' ? lineupPenaltyCount() * 2 : 0,
      ownPower: Math.round(plan.setup.own.power),
      oppPower: Math.round(plan.setup.opp.power),
      unit: plan.unit,
      generatedPlan: plan
    };
  };

  createGoalEvents = function(ownGoals, oppGoals, opponent, score) {
    if (score?.generatedPlan?.events) return score.generatedPlan.events;
    return [];
  };

  startMatchScreen = function() {
    const opponent = state.matchDayModal?.opponent || (typeof currentOpponentName === 'function' ? currentOpponentName() : 'Gegner');
    const score = predictedMatchScore(opponent);
    const plan = score.generatedPlan;
    state.activeMatch = {
      opponent,
      score,
      events: plan.events || [],
      phase:'firstReady',
      currentMinute:0,
      liveScore:{ own:0, opp:0 },
      log:[],
      processedEventKeys:[],
      subs:[],
      subCount:0,
      halftimeStats:null,
      fullStats:null,
      interruption:null,
      createdAt:Date.now(),
      ratingRecords: plan.ratingRecords || {},
      engineSetup: plan.setup,
      engineSummary: {
        ownShots: plan.ownShots,
        oppShots: plan.oppShots,
        expectation: plan.setup.expectation,
        version:'Stochastische v136-Engine',
        homeAdvantage:'+5-10%',
        ownAttack:Math.round(plan.setup.own.attack),
        ownDefense:Math.round(plan.setup.own.defense),
        oppAttack:Math.round(plan.setup.opp.attack),
        oppDefense:Math.round(plan.setup.opp.defense)
      },
      playerFitness:{},
      injuries:[],
      cards:[]
    };
    state.matchDayModal = null;
    state.halftimeEditSection = 'overview';
    state.tab = 'match';
    render();
  };

  matchStatsForHalf = function(untilMinute=45) {
    const m = state.activeMatch;
    if (!m) return { ownGoals:0, oppGoals:0, possession:50, shotsOwn:0, shotsOpp:0, xgOwn:'0.0', xgOpp:'0.0' };
    const events = m.events || [];
    const ownGoals = events.filter(e=>e.type==='goal' && e.team==='own' && e.minute<=untilMinute).length;
    const oppGoals = events.filter(e=>e.type==='goal' && e.team==='opp' && e.minute<=untilMinute).length;
    const shotsOwn = Math.max(0, Math.round((m.engineSummary?.ownShots || events.filter(e=>e.team==='own').length) * untilMinute / 90));
    const shotsOpp = Math.max(0, Math.round((m.engineSummary?.oppShots || events.filter(e=>e.team==='opp').length) * untilMinute / 90));
    const ownPower = m.score?.ownPower || 60;
    const oppPower = m.score?.oppPower || 60;
    const possession = Math.round(clampLocal(50 + (ownPower - oppPower) / 5 + ((m.score?.mod?.control || 0) * 1.2), 35, 65));
    return {
      ownGoals, oppGoals, possession,
      shotsOwn, shotsOpp,
      xgOwn: (shotsOwn * 0.12 + ownGoals * 0.24).toFixed(1),
      xgOpp: (shotsOpp * 0.12 + oppGoals * 0.24).toFixed(1)
    };
  };

  const previousFinishActiveMatch = typeof finishActiveMatch === 'function' ? finishActiveMatch : null;
  finishActiveMatch = function() {
    const m = state.activeMatch;
    if (previousFinishActiveMatch) previousFinishActiveMatch();
    if (!m || m.v136StatusApplied) return;
    const ownEvents = (m.events || []).filter(e => e.team === 'own');
    state.players = (state.players || []).map(p => {
      const id = String(p.id);
      const yellowCount = ownEvents.filter(e => e.type === 'yellow' && String(e.playerId) === id).length;
      const redCount = ownEvents.filter(e => e.type === 'red' && String(e.playerId) === id).length;
      const injuryEvent = ownEvents.find(e => e.type === 'injury' && String(e.playerId) === id);
      let next = { ...p };
      if (yellowCount) {
        const totalYellow = Number(next.yellowCardsSeason || 0) + yellowCount;
        next.yellowCardsSeason = totalYellow;
        if (totalYellow > 0 && totalYellow % 5 === 0) {
          next.isSuspended = true;
          next.suspensionGames = Math.max(Number(next.suspensionGames || 0), 1);
        }
      }
      if (redCount) {
        next.isSuspended = true;
        next.suspensionGames = Math.max(Number(next.suspensionGames || 0), rnd(2,4));
      }
      if (injuryEvent) {
        const inj = injuryEvent.injury || v136GenerateInjury(p);
        next.injury = { name: inj.name, days: inj.days, cause:'Spiel', sinceWeek: state.week };
      }
      return next;
    });
    const newsParts = [];
    ownEvents.filter(e => ['red','injury'].includes(e.type)).forEach(e => newsParts.push(e.text));
    if (newsParts.length) {
      state.news = state.news || [];
      state.news.unshift({ title:'Spielbericht: Sperren & Verletzungen', text: newsParts.join(' '), week: state.week, unread:true });
    }
    m.v136StatusApplied = true;
  };

  // UI-Hinweis auf der Spielstart-Maske bewusst deaktiviert: Die Match-Engine bleibt aktiv, aber die Startmaske bleibt kompakt.

})();
