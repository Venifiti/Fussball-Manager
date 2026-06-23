const LEAGUES = [
  { region: 'Europa', country: 'England', league: 'Premier League', tier: 'Topliga', clubs: 20 },
  { region: 'Europa', country: 'Spanien', league: 'LaLiga', tier: 'Topliga', clubs: 20 },
  { region: 'Europa', country: 'Italien', league: 'Serie A', tier: 'Topliga', clubs: 20 },
  { region: 'Europa', country: 'Deutschland', league: 'Bundesliga', tier: 'Topliga', clubs: 18 },
  { region: 'Europa', country: 'Frankreich', league: 'Ligue 1', tier: 'Topliga', clubs: 18 },
  { region: 'Europa', country: 'Portugal', league: 'Liga Portugal', tier: 'Stark', clubs: 18 },
  { region: 'Europa', country: 'Niederlande', league: 'Eredivisie', tier: 'Stark', clubs: 18 },
  { region: 'Europa', country: 'Belgien', league: 'Jupiler Pro League', tier: 'Stark', clubs: 16 },
  { region: 'Europa', country: 'Türkei', league: 'Süper Lig', tier: 'Stark', clubs: 20 },
  { region: 'Europa', country: 'Schottland', league: 'Premiership', tier: 'Mittel', clubs: 12 },
  { region: 'Europa', country: 'Österreich', league: 'Bundesliga', tier: 'Mittel', clubs: 12 },
  { region: 'Europa', country: 'Schweiz', league: 'Super League', tier: 'Mittel', clubs: 12 },
  { region: 'Europa', country: 'Dänemark', league: 'Superliga', tier: 'Mittel', clubs: 12 },
  { region: 'Europa', country: 'Griechenland', league: 'Super League', tier: 'Mittel', clubs: 14 },
  { region: 'Europa', country: 'Tschechien', league: 'Chance Liga', tier: 'Mittel', clubs: 16 },
  { region: 'Nordamerika', country: 'USA/Kanada', league: 'Major League Soccer', tier: 'Spezialliga', clubs: 30 },
  { region: 'Südamerika', country: 'Südamerika', league: 'Südamerikanische Liga', tier: 'Spezialliga', clubs: 20 }
];

const OWN_LEAGUE_INDEX = 10;

const CURRENT_TABLE = [
  { pos: 1, club: 'SC Bergheim', played: 7, points: 17, diff: 9 },
  { pos: 2, club: 'Union Hainstadt', played: 7, points: 15, diff: 6 },
  { pos: 3, club: 'ASK West', played: 7, points: 14, diff: 5 },
  { pos: 4, club: 'SV Nordheim', played: 7, points: 13, diff: 4 },
  { pos: 5, club: 'FC Altbrunn', played: 7, points: 13, diff: 2 },
  { pos: 6, club: 'Rapid Neustadt', played: 7, points: 12, diff: 1 },
  { pos: 7, club: 'FC Beispielstadt', played: 7, points: 12, diff: 0, own: true },
  { pos: 8, club: 'VfB Kronau', played: 7, points: 10, diff: -1 },
  { pos: 9, club: 'Sporting Mühlbach', played: 7, points: 8, diff: -3 },
  { pos: 10, club: 'TSV Südstadt', played: 7, points: 6, diff: -5 },
  { pos: 11, club: 'SV Donaupark', played: 7, points: 5, diff: -7 },
  { pos: 12, club: 'FC Talblick', played: 7, points: 3, diff: -11 }
];

const INTERNATIONALS = [
  { name: 'Champions League', teams: 36, games: 8, reward: 'sehr hoch' },
  { name: 'Europa League', teams: 36, games: 8, reward: 'hoch' },
  { name: 'Conference League', teams: 36, games: 6, reward: 'mittel' }
];

const TRAINING_PLANS = {
  Technik: 'Mehr Entwicklung für junge Mittelfeld- und Offensivspieler.',
  Angriff: 'Stürmer und Flügelspieler profitieren stärker.',
  Verteidigung: 'Verteidiger und Torhüter profitieren stärker.',
  Taktik: 'Mehr Stabilität und kleiner Spieltagsbonus.',
  Fitness: 'Fitness steigt, Verletzungsrisiko sinkt.',
  Regeneration: 'Müdigkeit sinkt, kaum Stärkeentwicklung.',
  Jugendförderung: 'Jugendspieler erhalten einen zusätzlichen Entwicklungsbonus.'
};



const TACTIC_OPTIONS = {
  style: {
    label: 'Spielstil',
    options: {
      Defensiv: 'Mehr Stabilität, weniger Offensivkraft.',
      Ausgeglichen: 'Keine Extreme, gute Basis für normale Spiele.',
      Offensiv: 'Mehr Torchancen, aber mehr Risiko für Gegentore.'
    }
  },
  pressing: {
    label: 'Pressing',
    options: {
      Niedrig: 'Schont Fitness, erzeugt aber weniger Druck.',
      Normal: 'Solider Mittelweg.',
      Hoch: 'Mehr Ballgewinne, kostet aber Fitness.'
    }
  },
  tempo: {
    label: 'Tempo',
    options: {
      Langsam: 'Kontrollierter Aufbau, gut gegen stärkere Gegner.',
      Normal: 'Ausgewogenes Spieltempo.',
      Schnell: 'Mehr Durchschlagskraft, aber fehleranfälliger.'
    }
  },
  passStyle: {
    label: 'Passstil',
    options: {
      'Immer flach': 'Sehr kontrolliert, gut für technische Teams, weniger Gefahr durch lange Bälle.',
      Flach: 'Meist flaches Kombinationsspiel mit ordentlicher Kontrolle.',
      Gemischt: 'Ausgewogene Mischung aus kurzen und hohen Pässen.',
      Hoch: 'Mehr direkte Bälle, gut für körperlich starke Stürmer.',
      'Meistens hoch': 'Sehr direkt und riskanter, kann gegen Pressing helfen, verliert aber Kontrolle.'
    }
  },
  attackSide: {
    label: 'Bevorzugte Angriffsseite',
    options: {
      Rechts: 'Angriffe laufen häufiger über rechts.',
      Links: 'Angriffe laufen häufiger über links.',
      Mitte: 'Zentrales Spiel durch Mittelfeld und Sturmzentrum.',
      Flügel: 'Beide Flügel werden bevorzugt eingebunden.'
    }
  },
  risk: {
    label: 'Risiko',
    options: {
      Sicher: 'Weniger Gegentore, aber weniger Chancen.',
      Ausgewogen: 'Normales Risiko.',
      Mutig: 'Kann Spiele drehen, kann aber auch schiefgehen.'
    }
  },
  line: {
    label: 'Defensivlinie',
    options: {
      Tief: 'Sicherer gegen schnelle Gegner.',
      Normal: 'Normale Kompaktheit.',
      Hoch: 'Mehr Druck nach vorne, anfällig für Konter.'
    }
  }
};


const PLAYER_SKILLS = [
  'abschluss','torriecher','dribbling','schnelligkeit','passspiel','technik','uebersicht','zweikampf','antizipation','stellungsspiel','sprungkraft','ausdauer','flanken','reflexe','handling','kommunikation'
];
const SKILL_LABELS = {
  abschluss:'Abschluss', torriecher:'Torriecher', dribbling:'Dribbling', schnelligkeit:'Schnelligkeit', passspiel:'Passspiel', technik:'Technik', uebersicht:'Übersicht', zweikampf:'Zweikampf', antizipation:'Antizipation', stellungsspiel:'Stellungsspiel', sprungkraft:'Sprungkraft', ausdauer:'Ausdauer', flanken:'Flanken', reflexe:'Reflexe', handling:'Handling', kommunikation:'Kommunikation'
};
const POSITION_SKILL_WEIGHTS = {
  TW: { reflexe:4, handling:4, kommunikation:2, sprungkraft:2, stellungsspiel:1, passspiel:1 },
  IV: { stellungsspiel:3, antizipation:3, zweikampf:3, sprungkraft:2, kommunikation:1, ausdauer:1, passspiel:1 },
  LV: { zweikampf:2, schnelligkeit:2, flanken:2, ausdauer:2, stellungsspiel:2, passspiel:1, antizipation:1 },
  RV: { zweikampf:2, schnelligkeit:2, flanken:2, ausdauer:2, stellungsspiel:2, passspiel:1, antizipation:1 },
  DM: { zweikampf:3, antizipation:3, stellungsspiel:2, passspiel:2, uebersicht:2, ausdauer:1 },
  ZM: { passspiel:3, uebersicht:3, technik:2, ausdauer:2, zweikampf:1, dribbling:1 },
  OM: { technik:3, uebersicht:3, passspiel:2, dribbling:2, abschluss:1, torriecher:1 },
  LM: { flanken:3, schnelligkeit:2, ausdauer:2, dribbling:2, passspiel:1, technik:1 },
  RM: { flanken:3, schnelligkeit:2, ausdauer:2, dribbling:2, passspiel:1, technik:1 },
  LA: { dribbling:3, schnelligkeit:3, flanken:2, technik:2, abschluss:1, torriecher:1 },
  RA: { dribbling:3, schnelligkeit:3, flanken:2, technik:2, abschluss:1, torriecher:1 },
  ST: { abschluss:4, torriecher:4, schnelligkeit:2, sprungkraft:2, dribbling:1, technik:1 }
};
const UNIT_SKILL_WEIGHTS = {
  attack: { abschluss:3, torriecher:3, dribbling:2, schnelligkeit:2, technik:1, flanken:1 },
  defense: { zweikampf:3, antizipation:3, stellungsspiel:3, sprungkraft:1, kommunikation:1, ausdauer:1 },
  control: { passspiel:3, uebersicht:3, technik:2, ausdauer:1, dribbling:1 },
  wings: { flanken:3, schnelligkeit:2, dribbling:2, ausdauer:1 },
  aerial: { sprungkraft:3, stellungsspiel:1, torriecher:1, zweikampf:1 }
};

const FORMATIONS = {
  '4-4-2': ['TW', 'LV', 'IV', 'IV', 'RV', 'LM', 'ZM', 'ZM', 'RM', 'ST', 'ST'],
  '4-3-3': ['TW', 'LV', 'IV', 'IV', 'RV', 'ZM', 'ZM', 'OM', 'LA', 'ST', 'RA'],
  '4-2-3-1': ['TW', 'LV', 'IV', 'IV', 'RV', 'DM', 'DM', 'LA', 'OM', 'RA', 'ST'],
  '3-5-2': ['TW', 'IV', 'IV', 'IV', 'LM', 'ZM', 'DM', 'ZM', 'RM', 'ST', 'ST'],
  '5-3-2': ['TW', 'LV', 'IV', 'IV', 'IV', 'RV', 'ZM', 'DM', 'ZM', 'ST', 'ST']
};

const FORMATION_LAYOUTS = {
  '4-4-2': [
    { x: 50, y: 90 },
    { x: 18, y: 72 }, { x: 38, y: 72 }, { x: 62, y: 72 }, { x: 82, y: 72 },
    { x: 18, y: 48 }, { x: 40, y: 50 }, { x: 60, y: 50 }, { x: 82, y: 48 },
    { x: 40, y: 23 }, { x: 60, y: 23 }
  ],
  '4-3-3': [
    { x: 50, y: 90 },
    { x: 18, y: 72 }, { x: 38, y: 72 }, { x: 62, y: 72 }, { x: 82, y: 72 },
    { x: 30, y: 50 }, { x: 50, y: 53 }, { x: 70, y: 50 },
    { x: 22, y: 23 }, { x: 50, y: 18 }, { x: 78, y: 23 }
  ],
  '4-2-3-1': [
    { x: 50, y: 90 },
    { x: 18, y: 72 }, { x: 38, y: 72 }, { x: 62, y: 72 }, { x: 82, y: 72 },
    { x: 40, y: 56 }, { x: 60, y: 56 },
    { x: 22, y: 36 }, { x: 50, y: 35 }, { x: 78, y: 36 },
    { x: 50, y: 17 }
  ],
  '3-5-2': [
    { x: 50, y: 90 },
    { x: 30, y: 72 }, { x: 50, y: 74 }, { x: 70, y: 72 },
    { x: 14, y: 48 }, { x: 35, y: 49 }, { x: 50, y: 57 }, { x: 65, y: 49 }, { x: 86, y: 48 },
    { x: 40, y: 21 }, { x: 60, y: 21 }
  ],
  '5-3-2': [
    { x: 50, y: 90 },
    { x: 12, y: 71 }, { x: 30, y: 73 }, { x: 50, y: 75 }, { x: 70, y: 73 }, { x: 88, y: 71 },
    { x: 32, y: 49 }, { x: 50, y: 55 }, { x: 68, y: 49 },
    { x: 40, y: 22 }, { x: 60, y: 22 }
  ]
};

const state = {
  gameStarted: false,
  manager: { name: '', age: 35, country: 'Österreich' },
  startSetup: { managerName: '', managerAge: 35, managerCountry: 'Österreich', leagueIndex: 10, clubName: 'FC Beispielstadt' },
  clubName: 'FC Beispielstadt',
  startLeagueIndex: 10,
  tab: 'dashboard',
  teamSection: 'lineup',
  clubSection: 'finances',
  seasonSection: 'table',
  environmentSection: 'overview',
  seasonStartYear: 2026,
  seasonEndModal: null,
  seasonStartModal: null,
  week: 12,
  money: 2450000,
  clubImage: { national: 42, international: 18, history: ['solider österreichischer Bundesligist', 'noch wenig internationales Profil'] },
  sponsor: null,
  finance: {
    incomeTransfers: 0,
    expenseTransfers: 0,
    incomeInfrastructure: 111600,
    expenseInfrastructure: 0,
    incomeSponsors: 0,
    incomePrizeMoney: 0,
    incomeTickets: 111600,
    incomeMerchandising: 18000,
    expenseSalaries: 168000,
    expenseStaff: 42000,
    expenseScouting: 0,
    expenseTrainingBoost: 0,
    expenseYouth: 12000
  },
  facilities: {
    stadium: { name: 'Stadion', icon: '🏟️', level: 1, maxLevel: 15, capacity: 8000, construction: null },
    training: { name: 'Trainingszentrum', icon: '🏋️', level: 1, maxLevel: 15, construction: null },
    academy: { name: 'Akademie', icon: '👥', level: 1, maxLevel: 15, construction: null },
    youthCenter: { name: 'Jugendzentrum', icon: '🌱', level: 1, maxLevel: 15, construction: null },
    medical: { name: 'Medizin', icon: '🏥', level: 1, maxLevel: 15, construction: null }
  },
  sponsorOffers: [
    { id: 'safe', name: 'AlpenBank Sicherheitspartner', style: 'Sicherer Grundbetrag', base: 720000, perPoint: 12000, titleBonus: 120000, winBonus: 4000, europeanBonus: 90000, description: 'Hoher fixer Betrag, dafür kleinere Erfolgsboni. Gut, wenn du planbar wirtschaften willst.' },
    { id: 'risk', name: 'Voltix Sport Energy', style: 'Risiko & hohe Boni', base: 260000, perPoint: 32000, titleBonus: 650000, winBonus: 14000, europeanBonus: 260000, description: 'Niedriger Fixbetrag, aber riesige Boni bei Punkten, Siegen und Titeln.' },
    { id: 'balanced', name: 'Nordstern Mobile', style: 'Ausgewogen', base: 480000, perPoint: 22000, titleBonus: 340000, winBonus: 8500, europeanBonus: 170000, description: 'Gute Mischung aus Planungssicherheit und leistungsabhängigen Einnahmen.' }
  ],
  trainingFocus: 'Technik',
  autoTraining: false,
  tactics: { style: 'Ausgeglichen', pressing: 'Normal', tempo: 'Normal', risk: 'Ausgewogen', line: 'Normal', passStyle: 'Gemischt', attackSide: 'Mitte' },
  lastMatchReport: null,
  transferFreeAgents: [],
  contractNegotiation: null,
  contractOffer: { years: 2, salary: 25000, bonus: 50000 },
  contractSort: 'asc',
  monthlyTrainingBoost: null,
  trainingSort: 'desc',
  formation: '4-4-2',
  lineup: {},
  bench: {},
  lineupEditSlot: null,
  benchEditSlot: null,
  marketSection: 'overview',
  marketSearch: { name: '', position: 'Alle', maxAge: '', minStrength: '', minTalent: '', minValue: '', maxValue: '' },
  savedMarketSearches: [],
  scoutingJobs: [],
  scoutingSection: 'overview',
  scoutingLeagueIndex: 0,
  scoutedLeagueIds: [OWN_LEAGUE_INDEX],
  scoutedClubKeys: {},
  scoutedPlayerIds: [],
  scoutedPlayerHistory: [],
  calendarMonthOffset: 0,
  selectedLeagueIndex: null,
  viewedClub: null,
  playerProfile: null,
  watchlist: [],
  clubRosterCache: {},
  leagueTableCache: {},
  youthDiscoveryPopup: null,
  nextYouthDiscoveryWeek: 13,
  academyPlayers: [
    { id: 101, name: 'Max Reiter', age: 17, pos: 'ZM', secondary: ['OM', 'DM'], strength: 47, talent: 5, progress: 72 },
    { id: 102, name: 'Noah Berger', age: 15, pos: 'LA', secondary: ['RA', 'ST'], strength: 39, talent: 4, progress: 56 },
    { id: 103, name: 'Emil Novak', age: 18, pos: 'RV', secondary: ['LV', 'RM'], strength: 49, talent: 4, progress: 41 },
    { id: 104, name: 'Ben Wagner', age: 16, pos: 'RA', secondary: ['LA', 'ST'], strength: 50, talent: 5, progress: 28 },
    { id: 105, name: 'Luca Steiner', age: 14, pos: 'IV', secondary: ['DM'], strength: 34, talent: 3, progress: 18 },
    { id: 106, name: 'Mahir Yilmaz', age: 16, pos: 'ST', secondary: ['LA'], strength: 43, talent: 3, progress: 64 }
  ],
  players: [
    { id: 1, name: 'Lukas Bauer', age: 24, pos: 'ST', secondary: ['LA', 'RA'], strength: 68, talent: 4, progress: 34, rating: 2.5, minutes: 90, youth: false, loan: null },
    { id: 3, name: 'David Kern', age: 29, pos: 'IV', secondary: ['RV', 'LV'], strength: 61, talent: 3, progress: 11, rating: 3.5, minutes: 18, youth: false, loan: null },
    { id: 5, name: 'Simon Wolf', age: 33, pos: 'TW', secondary: [], strength: 70, talent: 2, progress: 5, rating: 2.7, minutes: 90, youth: false, loan: null },
    { id: 7, name: 'Jonas Gruber', age: 26, pos: 'LV', secondary: ['RV', 'LM'], strength: 59, talent: 3, progress: 24, rating: 2.9, minutes: 82, youth: false, loan: null },
    { id: 8, name: 'Tobias Leitner', age: 22, pos: 'IV', secondary: ['DM'], strength: 64, talent: 3, progress: 44, rating: 2.4, minutes: 90, youth: false, loan: null },
    { id: 9, name: 'Felix Haas', age: 20, pos: 'RM', secondary: ['RA', 'RV'], strength: 55, talent: 4, progress: 63, rating: 2.6, minutes: 51, youth: false, loan: null },
    { id: 10, name: 'Armin Celik', age: 27, pos: 'LM', secondary: ['LA', 'LV'], strength: 62, talent: 3, progress: 15, rating: 3.0, minutes: 74, youth: false, loan: null },
    { id: 11, name: 'Paul Steiner', age: 31, pos: 'DM', secondary: ['ZM', 'IV'], strength: 66, talent: 2, progress: 8, rating: 2.8, minutes: 90, youth: false, loan: null },
    { id: 12, name: 'Milan Horvat', age: 21, pos: 'OM', secondary: ['ZM', 'RA'], strength: 60, talent: 4, progress: 69, rating: 2.1, minutes: 36, youth: false, loan: null },
    { id: 13, name: 'Christian Maier', age: 28, pos: 'TW', secondary: [], strength: 57, talent: 2, progress: 12, rating: 3.0, minutes: 0, youth: false, loan: null },
    { id: 14, name: 'Nico Schwarz', age: 25, pos: 'ST', secondary: ['OM'], strength: 58, talent: 3, progress: 49, rating: 3.1, minutes: 12, youth: false, loan: null },
    { id: 15, name: 'Rene Kofler', age: 23, pos: 'IV', secondary: ['DM'], strength: 54, talent: 3, progress: 30, rating: 3.0, minutes: 0, youth: false, loan: null },
    { id: 16, name: 'Mario Weiss', age: 30, pos: 'ZM', secondary: ['DM'], strength: 56, talent: 2, progress: 20, rating: 3.2, minutes: 0, youth: false, loan: null },
    { id: 17, name: 'Andreas Novak', age: 24, pos: 'RV', secondary: ['RM', 'LV'], strength: 57, talent: 3, progress: 41, rating: 3.0, minutes: 0, youth: false, loan: null },
    { id: 18, name: 'Marko Petrovic', age: 19, pos: 'LA', secondary: ['RA', 'ST'], strength: 53, talent: 4, progress: 77, rating: 2.8, minutes: 0, youth: false, loan: null }
  ]
};

function euro(value) {
  return value.toLocaleString('de-AT') + ' €';
}

function facilityConfig(type) {
  const configs = {
    stadium: {
      label: 'Stadion',
      area: 'Kapazität & Zuschauereinnahmen',
      benefit: level => `${facilityCapacity(level).toLocaleString('de-AT')} Plätze · höhere Ticketeinnahmen`,
      baseCost: 350000,
      baseWeeks: 8,
      weekStep: 3,
      description: 'Mehr Plätze und bessere Stadionbereiche erhöhen langfristig Ticket-, VIP- und Umfeld-Einnahmen.'
    },
    training: {
      label: 'Trainingszentrum',
      area: 'Spielerentwicklung',
      benefit: level => `+${Math.max(0, level - 1) * 2}% Entwicklungsbonus`,
      baseCost: 220000,
      baseWeeks: 4,
      weekStep: 2,
      description: 'Ein besseres Trainingszentrum beschleunigt die Entwicklung deiner Spieler.'
    },
    academy: {
      label: 'Akademie',
      area: 'Nachwuchsqualität',
      benefit: level => `${2 + Math.floor(level / 3)}-${4 + Math.floor(level / 2)} Jugendspieler pro Saison · bessere Talentchance`,
      baseCost: 260000,
      baseWeeks: 5,
      weekStep: 2,
      description: 'Eine bessere Akademie bringt mehr und bessere Jugendspieler zu Saisonbeginn.'
    },
    youthCenter: {
      label: 'Jugendzentrum',
      area: 'Jugendfindung & Jugendentwicklung',
      benefit: level => `+${level * 3}% Jugend-Entwicklungsbonus · alle ${Math.max(2, 9 - Math.floor(level / 2))} Wochen bessere Fundchance`,
      baseCost: 240000,
      baseWeeks: 5,
      weekStep: 2,
      description: 'Ein besseres Jugendzentrum sorgt dafür, dass Jugendspieler schneller besser werden und dass dein Verein häufiger neue Talente entdeckt.'
    },
    medical: {
      label: 'Medizin',
      area: 'Verletzungen & Regeneration',
      benefit: level => `${Math.max(0, level - 1) * 3}% geringeres Verletzungsrisiko`,
      baseCost: 180000,
      baseWeeks: 3,
      weekStep: 1,
      description: 'Eine bessere medizinische Abteilung reduziert Verletzungsrisiko und Ausfallzeiten.'
    }
  };
  return configs[type];
}
function facilityCapacity(level) {
  return 8000 + (level - 1) * 1800;
}
function upgradeCost(type) {
  const f = state.facilities[type];
  const cfg = facilityConfig(type);
  return Math.round(cfg.baseCost * Math.pow(1.38, f.level - 1));
}
function upgradeWeeks(type) {
  const f = state.facilities[type];
  const cfg = facilityConfig(type);
  return cfg.baseWeeks + (f.level - 1) * cfg.weekStep;
}
function upgradeStatus(type) {
  const f = state.facilities[type];
  if (f.level >= f.maxLevel) return 'Maximalstufe erreicht';
  if (f.construction) return `Ausbau auf Level ${f.construction.targetLevel} läuft · ${f.construction.remainingWeeks}/${f.construction.totalWeeks} Wochen`;
  return `Nächster Ausbau: Level ${f.level + 1} · ${upgradeWeeks(type)} Wochen · ${euro(upgradeCost(type))}`;
}
function startUpgrade(type) {
  const f = state.facilities[type];
  if (!f || f.level >= f.maxLevel || f.construction) return;
  const cost = upgradeCost(type);
  const weeks = upgradeWeeks(type);
  const cfg = facilityConfig(type);
  if (state.money < cost) {
    alert('Nicht genug Geld für diesen Ausbau.');
    return;
  }
  const ok = confirm(`${cfg.label} auf Level ${f.level + 1} ausbauen?\n\nDauer: ${weeks} Kalenderwochen\nKosten: ${euro(cost)}\n\nDer Effekt ist erst nach Fertigstellung aktiv.`);
  if (!ok) return;
  f.construction = { targetLevel: f.level + 1, remainingWeeks: weeks, totalWeeks: weeks, cost };
  state.money -= cost;
  state.finance.expenseInfrastructure += cost;
  render();
}
function progressConstruction() {
  Object.entries(state.facilities).forEach(([type, facility]) => {
    if (!facility.construction) return;
    facility.construction.remainingWeeks -= 1;
    if (facility.construction.remainingWeeks <= 0) {
      facility.level = facility.construction.targetLevel;
      if (type === 'stadium') facility.capacity = facilityCapacity(facility.level);
      facility.construction = null;
    }
  });
}
function stars(n) {
  return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
}
function allPositions(player) {
  return [player.pos, ...(player.secondary || [])];
}
function positionText(player) {
  const secondary = (player.secondary || []).length ? ` / ${(player.secondary || []).join(' / ')}` : '';
  return `${player.pos}${secondary}`;
}
function positionFit(player, slotPos) {
  if (!player) return { factor: 0, label: 'Leer', className: 'bad' };
  if (player.pos === slotPos) return { factor: 1, label: 'Hauptposition', className: 'great' };
  if ((player.secondary || []).includes(slotPos)) return { factor: 0.92, label: 'Nebenposition', className: 'good' };
  if (player.pos === 'TW' && slotPos !== 'TW') return { factor: 0.2, label: 'völlig ungeeignet', className: 'bad' };
  if (player.pos !== 'TW' && slotPos === 'TW') return { factor: 0.15, label: 'kein Torhüter', className: 'bad' };
  const related = {
    ST: ['LA', 'RA', 'OM'],
    LA: ['RA', 'LM', 'ST', 'OM'],
    RA: ['LA', 'RM', 'ST', 'OM'],
    LM: ['LA', 'LV', 'ZM'],
    RM: ['RA', 'RV', 'ZM'],
    OM: ['ZM', 'LA', 'RA', 'ST'],
    ZM: ['DM', 'OM', 'LM', 'RM'],
    DM: ['ZM', 'IV'],
    IV: ['RV', 'LV', 'DM'],
    LV: ['RV', 'LM', 'IV'],
    RV: ['LV', 'RM', 'IV']
  };
  if ((related[player.pos] || []).includes(slotPos)) return { factor: 0.76, label: 'notfalls spielbar', className: 'okay' };
  return { factor: 0.5, label: 'falsche Position', className: 'bad' };
}
function weightedSkillAverage(player, weights) {
  const skills = player?.skills || {};
  let sum = 0, total = 0;
  Object.entries(weights || {}).forEach(([key, weight]) => {
    sum += (skills[key] || player?.strength || 50) * weight;
    total += weight;
  });
  return total ? sum / total : (player?.strength || 50);
}
function positionOverall(player, pos = player?.pos) {
  if (!player) return 0;
  if (!player.skills) return player.strength || 0;
  const weights = POSITION_SKILL_WEIGHTS[pos] || POSITION_SKILL_WEIGHTS[player.pos] || {};
  return Math.round(weightedSkillAverage(player, weights));
}
function generateSkillSet(player) {
  const base = Number(player.strength || 50);
  const seed = stableHash(`${player.name}-${player.pos}-${player.age}-${player.talent}`);
  const weights = POSITION_SKILL_WEIGHTS[player.pos] || {};
  const skills = {};
  PLAYER_SKILLS.forEach((skill, index) => {
    const roleWeight = weights[skill] || 0;
    const roleBonus = roleWeight * 4;
    const noise = ((seed + index * 17) % 13) - 6;
    const weakPenalty = roleWeight ? 0 : ((seed + index * 11) % 8);
    skills[skill] = clamp(Math.round(base + roleBonus + noise - weakPenalty), 1, 100);
  });
  return skills;
}
function ensurePlayerSkillProfile(player) {
  const skills = player.skills || generateSkillSet(player);
  const updated = { ...player, skills };
  return { ...updated, strength: positionOverall(updated, updated.pos) };
}
function ensurePlayerSkills() {
  state.players = state.players.map(ensurePlayerSkillProfile);
  state.academyPlayers = state.academyPlayers.map(ensurePlayerSkillProfile);
}
function improvePlayerSkills(player, amount = 1) {
  const skills = { ...(player.skills || generateSkillSet(player)) };
  const weights = POSITION_SKILL_WEIGHTS[player.pos] || {};
  const totalWeight = Object.values(weights).reduce((a,b)=>a+b,0) || 1;
  Object.keys(weights).forEach(skill => {
    const gain = Math.max(1, Math.round(amount * 0.6 + (weights[skill] / totalWeight) * amount * 7));
    skills[skill] = clamp((skills[skill] || player.strength || 50) + gain, 1, 100);
  });
  const updated = { ...player, skills };
  return { ...updated, strength: positionOverall(updated, updated.pos) };
}
function playerUnitScore(player, unit) {
  return Math.round(weightedSkillAverage(player, UNIT_SKILL_WEIGHTS[unit] || POSITION_SKILL_WEIGHTS[player.pos] || {}));
}
function shortSkillProfile(player) {
  if (!player?.skills) return '';
  const attack = playerUnitScore(player, 'attack');
  const defense = playerUnitScore(player, 'defense');
  const control = playerUnitScore(player, 'control');
  return `<span>Off ${attack}</span><span>Def ${defense}</span><span>Tech ${control}</span>`;
}
function skillBars(player) {
  if (!player?.skills) return '';
  const important = Object.entries(POSITION_SKILL_WEIGHTS[player.pos] || {})
    .sort((a,b)=>b[1]-a[1])
    .slice(0,6)
    .map(([key]) => `<div class="skillRow"><span>${SKILL_LABELS[key] || key}</span><b>${player.skills[key] || 0}</b><i><em style="width:${player.skills[key] || 0}%"></em></i></div>`).join('');
  return `<div class="skillBox"><h3>Wichtigste Fähigkeiten</h3>${important}</div>`;
}
function lineupUnitScores() {
  const entries = lineupEntries();
  const collect = (positions, unit) => {
    const group = entries.filter(e => positions.includes(e.slot.pos));
    const use = group.length ? group : entries;
    return Math.round(use.reduce((sum, e) => sum + playerUnitScore(e.player, unit) * positionFit(e.player, e.slot.pos).factor, 0) / Math.max(1, use.length));
  };
  return {
    attack: collect(['ST','LA','RA','OM'], 'attack'),
    defense: collect(['TW','IV','LV','RV','DM'], 'defense'),
    control: collect(['DM','ZM','OM','LM','RM'], 'control'),
    wings: collect(['LA','RA','LM','RM','LV','RV'], 'wings'),
    aerial: collect(['ST','IV','TW'], 'aerial')
  };
}
function tacticSkillSynergy() {
  const u = lineupUnitScores();
  const t = state.tactics || {};
  let bonus = 0;
  if (t.passStyle === 'Immer flach' || t.passStyle === 'Flach') bonus += Math.round((u.control - 58) / 8);
  if (t.passStyle === 'Hoch' || t.passStyle === 'Meistens hoch') bonus += Math.round((u.aerial - 58) / 8);
  if (t.attackSide === 'Flügel') bonus += Math.round((u.wings - 58) / 8);
  if (t.attackSide === 'Mitte') bonus += Math.round((u.control - 58) / 10);
  if (t.pressing === 'Hoch') bonus += Math.round(((u.defense + u.control) / 2 - 58) / 12);
  return clamp(bonus, -5, 6);
}
function effectiveStrength(player, slotPos) {
  const fit = positionFit(player, slotPos);
  return Math.max(1, Math.round(positionOverall(player, slotPos) * fit.factor));
}
function avgStrength() {
  return Math.round(state.players.reduce((sum, p) => sum + p.strength, 0) / state.players.length);
}
function activePositions() {
  const coords = FORMATION_LAYOUTS[state.formation] || [];
  return FORMATIONS[state.formation].map((pos, index) => ({ id: `${pos}-${index}`, pos, index, ...(coords[index] || { x: 50, y: 50 }) }));
}
function initLineup() {
  const used = new Set();
  const lineup = {};
  activePositions().forEach(slot => {
    const available = state.players.filter(p => !used.has(p.id) && p.loan !== 'verliehen');
    const chosen = available
      .map(p => ({ player: p, value: effectiveStrength(p, slot.pos) }))
      .sort((a, b) => b.value - a.value)[0]?.player;
    if (chosen) {
      lineup[slot.id] = chosen.id;
      used.add(chosen.id);
    }
  });
  state.lineup = lineup;
  initBench();
}
function benchSlots() {
  return Array.from({ length: 7 }, (_, index) => ({ id: `B-${index}`, index }));
}
function usedPlayerIds(exceptLineupSlot = null, exceptBenchSlot = null) {
  const ids = new Set();
  Object.entries(state.lineup).forEach(([key, id]) => {
    if (key !== exceptLineupSlot && Number(id)) ids.add(Number(id));
  });
  Object.entries(state.bench || {}).forEach(([key, id]) => {
    if (key !== exceptBenchSlot && Number(id)) ids.add(Number(id));
  });
  return ids;
}
function initBench() {
  const used = usedPlayerIds();
  const bench = {};
  const candidates = state.players
    .filter(p => p.loan !== 'verliehen' && !used.has(p.id))
    .sort((a, b) => b.strength - a.strength);
  benchSlots().forEach((slot, index) => {
    bench[slot.id] = candidates[index]?.id || null;
  });
  state.bench = bench;
}
function lineupEntries() {
  return activePositions().map(slot => {
    const player = state.players.find(p => p.id === Number(state.lineup[slot.id]));
    return { slot, player };
  }).filter(entry => entry.player);
}
function lineupPlayers() {
  return lineupEntries().map(entry => entry.player);
}
function lineupStrength() {
  const entries = lineupEntries();
  if (!entries.length) return 0;
  return Math.round(entries.reduce((sum, entry) => sum + effectiveStrength(entry.player, entry.slot.pos), 0) / entries.length);
}
function lineupPenaltyCount() {
  return lineupEntries().filter(entry => positionFit(entry.player, entry.slot.pos).factor < 0.92).length;
}

function ensurePlayerContracts() {
  state.players = state.players.map((player, index) => ({
    salary: Math.round(((player.strength || 50) * 650 + (player.talent || 2) * 1800) / 1000) * 1000,
    marketValue: Math.round((((player.strength || 50) ** 2) * 780 + (player.talent || 2) * 70000 + Math.max(0, 25 - (player.age || 25)) * 35000) / 10000) * 10000,
    contractYears: Math.max(1, Math.min(4, 4 - (index % 4))),
    negotiationLockUntil: 0,
    satisfaction: Math.max(35, Math.min(92, 54 + Math.round((player.minutes || 0) / 3) - (index % 3) * 4)),
    noPlayWeeks: player.minutes ? 0 : Math.min(8, index % 5),
    ...player
  }));
}
function tacticModifier() {
  const t = state.tactics || {};
  let attack = 0, defense = 0, control = 0, risk = 0;
  if (t.style === 'Defensiv') { defense += 4; attack -= 2; }
  if (t.style === 'Offensiv') { attack += 4; defense -= 2; risk += 1; }
  if (t.pressing === 'Niedrig') { defense += 1; control -= 1; }
  if (t.pressing === 'Hoch') { attack += 2; control += 1; risk += 1; }
  if (t.tempo === 'Langsam') { control += 3; attack -= 1; }
  if (t.tempo === 'Schnell') { attack += 3; control -= 1; risk += 1; }
  if (t.passStyle === 'Immer flach') { control += 3; attack -= 1; risk -= 1; }
  if (t.passStyle === 'Flach') { control += 2; }
  if (t.passStyle === 'Hoch') { attack += 1; control -= 1; risk += 1; }
  if (t.passStyle === 'Meistens hoch') { attack += 2; control -= 2; risk += 2; }
  if (t.attackSide === 'Mitte') { control += 1; }
  if (t.attackSide === 'Flügel') { attack += 2; risk += 1; }
  if (t.attackSide === 'Links' || t.attackSide === 'Rechts') { attack += 1; }
  if (t.risk === 'Sicher') { defense += 2; attack -= 1; risk -= 1; }
  if (t.risk === 'Mutig') { attack += 3; defense -= 1; risk += 2; }
  if (t.line === 'Tief') { defense += 2; control -= 1; }
  if (t.line === 'Hoch') { attack += 1; defense -= 1; risk += 1; }
  const skillSynergy = tacticSkillSynergy();
  return { attack, defense, control, risk, skillSynergy, total: Math.round((attack + defense + control - Math.max(0, risk - 2)) / 2) + skillSynergy };
}
function tacticSummaryText() {
  const t = state.tactics || {};
  const mod = tacticModifier();
  return `${t.style}, Pressing ${t.pressing}, Tempo ${t.tempo}, Passstil ${t.passStyle}, Angriff ${t.attackSide}, Risiko ${t.risk}, Linie ${t.line} · Simulationsbonus ${mod.total >= 0 ? '+' : ''}${mod.total} (Fähigkeiten ${mod.skillSynergy >= 0 ? '+' : ''}${mod.skillSynergy})`;
}
function setTactic(key, value) { state.tactics[key] = value; render(); }
function simulateCurrentMatch() {
  const fixtures = ['SV Nordheim','Rapid Neustadt','TSV Südstadt','SC Bergheim','Union Hainstadt','ASK West','FC Altbrunn','VfB Kronau','Sporting Mühlbach','SV Donaupark','FC Talblick'];
  const opponent = fixtures[(state.week - 12 + fixtures.length) % fixtures.length];
  const ownRow = CURRENT_TABLE.find(r => r.own);
  const oppRow = CURRENT_TABLE.find(r => r.club === opponent) || CURRENT_TABLE.find(r => !r.own);
  const mod = tacticModifier();
  const positionPenalty = lineupPenaltyCount() * 2;
  const unit = lineupUnitScores();
  const ownPower = lineupStrength() * 0.55 + unit.attack * 0.16 + unit.control * 0.13 + unit.defense * 0.16 + mod.total - positionPenalty + 3;
  const oppPower = 55 + (oppRow?.points || 10) * 0.9 + ((stableHash(opponent + state.week) % 9) - 4);
  const diff = ownPower - oppPower;
  const ownGoals = Math.max(0, Math.min(5, Math.round(1.2 + diff / 18 + (unit.attack - 58) / 28 + mod.attack / 10 + ((stableHash('a'+state.week) % 5) - 2) / 3)));
  const oppGoals = Math.max(0, Math.min(5, Math.round(1.2 - diff / 20 - (unit.defense - 58) / 32 - mod.defense / 12 + Math.max(0, mod.risk) / 5 + ((stableHash('b'+state.week) % 5) - 2) / 3)));
  if (ownRow && oppRow) {
    ownRow.played += 1; oppRow.played += 1;
    ownRow.diff += ownGoals - oppGoals; oppRow.diff += oppGoals - ownGoals;
    if (ownGoals > oppGoals) ownRow.points += 3;
    else if (ownGoals < oppGoals) oppRow.points += 3;
    else { ownRow.points += 1; oppRow.points += 1; }
    CURRENT_TABLE.sort((a,b)=>b.points-a.points||b.diff-a.diff).forEach((r,i)=>r.pos=i+1);
  }
  const starters = lineupEntries().map(e => e.player.id);
  const benchIds = Object.values(state.bench || {}).map(Number).filter(Boolean).slice(0,3);
  const resultBonus = ownGoals > oppGoals ? -0.35 : ownGoals === oppGoals ? 0 : 0.35;
  state.players = state.players.map(p => {
    let minutes = starters.includes(p.id) ? 90 : benchIds.includes(p.id) ? 20 : 0;
    let rating = minutes ? Math.max(1, Math.min(5, 2.8 + resultBonus - (p.strength - 60) / 90 - (playerUnitScore(p, ['ST','LA','RA','OM'].includes(p.pos) ? 'attack' : ['IV','LV','RV','DM','TW'].includes(p.pos) ? 'defense' : 'control') - 60) / 120 - mod.total / 35 + ((stableHash(p.name + state.week) % 9) - 4) / 20)) : p.rating;
    const roundedRating = Math.round(rating * 10) / 10;
    const oldSatisfaction = typeof p.satisfaction === 'number' ? p.satisfaction : 60;
    let satisfactionChange = minutes >= 70 ? 6 : minutes >= 20 ? 2 : -5;
    if (minutes && roundedRating <= 2.3) satisfactionChange += 2;
    if (minutes && roundedRating >= 3.6) satisfactionChange -= 2;
    const noPlayWeeks = minutes ? 0 : (p.noPlayWeeks || 0) + 1;
    if (noPlayWeeks >= 6) satisfactionChange -= 2;
    const satisfaction = clamp(oldSatisfaction + satisfactionChange, 0, 100);
    return { ...p, minutes, rating: roundedRating, satisfaction, noPlayWeeks };
  });
  state.lastMatchReport = { opponent, score: `${ownGoals}:${oppGoals}`, tacticBonus: mod.total, skillSynergy: mod.skillSynergy, positionPenalty, ownPower: Math.round(ownPower), oppPower: Math.round(oppPower), units: unit, text: ownGoals > oppGoals ? 'Sieg' : ownGoals === oppGoals ? 'Unentschieden' : 'Niederlage' };
}
function retirementChance(player) {
  if (player.age < 34) return 0;
  if (player.age >= 38) return 85;
  return { 34: 25, 35: 40, 36: 55, 37: 70 }[player.age] || 35;
}
function plansRetirementAfterContract(player) {
  const chance = retirementChance(player);
  return chance > 0 && (stableHash(player.name + player.age + 'career-end') % 100) < chance;
}
function playerSatisfaction(player) {
  return typeof player.satisfaction === 'number' ? player.satisfaction : 60;
}
function satisfactionLabel(player) {
  const s = playerSatisfaction(player);
  if (s >= 80) return 'sehr zufrieden';
  if (s >= 60) return 'zufrieden';
  if (s >= 45) return 'neutral';
  if (s >= 30) return 'unglücklich';
  return 'sehr unglücklich';
}
function contractWillingness(player) {
  if ((player.negotiationLockUntil || 0) > state.week) {
    return { ok: false, reason: `gesperrt bis KW ${player.negotiationLockUntil}` };
  }
  if ((player.contractYears || 0) > 2) {
    return { ok: false, reason: 'zu lange Restlaufzeit - möchte noch nicht verhandeln' };
  }
  if (plansRetirementAfterContract(player)) {
    return { ok: false, reason: 'plant Karriereende nach Vertragsende' };
  }
  if (playerSatisfaction(player) < 35 || (player.noPlayWeeks || 0) >= 8) {
    return { ok: false, reason: 'zu unglücklich wegen fehlender Einsätze' };
  }
  return { ok: true, reason: 'verhandlungsbereit' };
}
function processContractYearEnd() {
  if (state.week % 52 !== 0) return;
  const leaving = [];
  const retired = [];
  state.players = state.players.map(p => ({ ...p, contractYears: Math.max(0, (p.contractYears || 1) - 1), age: p.age + 1 })).filter(p => {
    if (p.contractYears <= 0) {
      if (plansRetirementAfterContract(p)) retired.push({ ...p, retired: true });
      else leaving.push({ ...p, freeAgent: true });
      return false;
    }
    return true;
  });
  state.transferFreeAgents.push(...leaving);
  const parts = [];
  if (leaving.length) parts.push(`${leaving.length} Spieler mit ausgelaufenem Vertrag landen ablösefrei auf der Transferliste`);
  if (retired.length) parts.push(`${retired.length} ältere Spieler beenden ihre Karriere`);
  if (parts.length) alert(parts.join('. ') + '.');
}
function contractDemand(player) {
  const baseSalary = player.salary || 25000;
  const happinessPremium = playerSatisfaction(player) < 55 ? 0.12 : 0;
  return {
    salary: Math.round((baseSalary * (1.08 + player.talent * 0.04 + Math.max(0, player.strength - 65) * 0.01 + happinessPremium)) / 1000) * 1000,
    years: Math.min(5, player.age >= 34 ? 1 : player.age >= 32 ? 2 : player.age <= 22 ? 4 : 3),
    bonus: Math.round((player.marketValue || 200000) * (playerSatisfaction(player) < 55 ? 0.11 : 0.08) / 1000) * 1000
  };
}
function openContractExtension(playerId) {
  const player = state.players.find(p => p.id === Number(playerId));
  if (!player) return;
  const willingness = contractWillingness(player);
  if (!willingness.ok) { alert(`${player.name} will aktuell nicht verlängern: ${willingness.reason}.`); return; }
  const demand = contractDemand(player);
  state.contractNegotiation = { playerId: player.id, round: 1, patience: Math.max(1, Math.min(3, Math.ceil(playerSatisfaction(player) / 35))) };
  state.contractOffer = { years: demand.years, salary: demand.salary, bonus: demand.bonus };
  render();
}
function closeContractNegotiation() { state.contractNegotiation = null; render(); }
function setContractOfferField(field, value) {
  const n = Number(value);
  state.contractOffer[field] = field === 'years' ? Math.max(1, Math.min(5, n)) : n;
  render();
}
function submitContractOffer() {
  const neg = state.contractNegotiation;
  const player = state.players.find(p => p.id === Number(neg?.playerId));
  if (!player) return;
  const willingness = contractWillingness(player);
  if (!willingness.ok) {
    state.contractNegotiation = null;
    alert(`${player.name} bricht die Gespräche ab: ${willingness.reason}.`);
    render();
    return;
  }
  const demand = contractDemand(player);
  const offer = state.contractOffer;
  if (offer.years > 5) { alert('Verträge über 5 Jahre sind nicht möglich.'); return; }
  const satisfaction = playerSatisfaction(player);
  const offerScore = offer.salary / demand.salary * 58 + offer.years / Math.max(1, demand.years) * 18 + offer.bonus / Math.max(1, demand.bonus) * 24 + (satisfaction - 50) / 4;
  const required = 94 + (neg.round - 1) * 4 + Math.max(0, 55 - satisfaction) / 3 - (player.age >= 31 ? 4 : 0);
  if (offerScore >= required) {
    player.contractYears = Math.min(5, offer.years);
    player.salary = offer.salary;
    player.satisfaction = clamp((player.satisfaction || 60) + 8, 0, 100);
    state.money -= offer.bonus;
    state.finance.expenseSalaries += offer.bonus;
    state.contractNegotiation = null;
    alert(`${player.name} nimmt das Angebot an. Vertrag: ${offer.years} Jahre, Gehalt ${euro(offer.salary)}.`);
    render();
    return;
  }
  if (neg.round >= 3 || neg.patience <= 1) {
    player.negotiationLockUntil = state.week + 12;
    player.satisfaction = clamp((player.satisfaction || 60) - 7, 0, 100);
    state.contractNegotiation = null;
    alert(`${player.name} bricht die Verhandlung ab. Drei Monate lang sind keine neuen Gespräche möglich.`);
    render();
    return;
  }
  neg.round += 1;
  neg.patience -= 1;
  state.contractOffer.salary = Math.round(state.contractOffer.salary * 1.08 / 1000) * 1000;
  state.contractOffer.bonus = Math.round(state.contractOffer.bonus * 1.12 / 1000) * 1000;
  alert(`${player.name} lehnt ab und verlangt eine bessere Runde. Geduld verbleibend: ${neg.patience}.`);
  render();
}
function releasePlayerContract(playerId) {
  const player = state.players.find(p => p.id === Number(playerId));
  if (!player) return;
  const compensation = Math.round(((player.salary || 20000) * Math.max(1, player.contractYears || 1) * 6) / 1000) * 1000;
  if (!confirm(`${player.name} Vertrag auflösen?

Abfindung: ${euro(compensation)}
Der Spieler verlässt den Verein sofort.`)) return;
  if (state.money < compensation) { alert('Nicht genug Geld für die Abfindung.'); return; }
  state.money -= compensation;
  state.finance.expenseSalaries += compensation;
  state.players = state.players.filter(p => p.id !== player.id);
  initLineup();
  render();
}

function sponsorCurrentBonus() {
  if (!state.sponsor) return 0;
  const points = CURRENT_TABLE.find(row => row.own)?.points || 0;
  const simulatedWins = 3;
  return points * state.sponsor.perPoint + simulatedWins * state.sponsor.winBonus;
}
function totalIncome() {
  const f = state.finance;
  return f.incomeTransfers + f.incomeInfrastructure + f.incomeSponsors + f.incomePrizeMoney + f.incomeTickets + f.incomeMerchandising + sponsorCurrentBonus();
}
function totalExpenses() {
  const f = state.finance;
  return f.expenseTransfers + f.expenseInfrastructure + f.expenseSalaries + f.expenseStaff + f.expenseScouting + (f.expenseTrainingBoost || 0) + f.expenseYouth;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)));
}
function imageLabel(value) {
  if (value >= 85) return 'Weltweite Strahlkraft';
  if (value >= 70) return 'Sehr hohes Image';
  if (value >= 55) return 'Starkes Image';
  if (value >= 40) return 'Solides Image';
  if (value >= 25) return 'Kleines Image';
  return 'Niedriges Image';
}
function leagueImageBase(leagueIndex) {
  const league = LEAGUES[Number(leagueIndex)] || LEAGUES[OWN_LEAGUE_INDEX];
  if (league.tier === 'Topliga') return { national: 72, international: 66 };
  if (league.tier === 'Stark') return { national: 62, international: 52 };
  if (league.tier === 'Spezialliga') return { national: 64, international: 44 };
  return { national: 50, international: 34 };
}
function getOwnTablePosition() {
  return CURRENT_TABLE.find(r => r.own)?.pos || 7;
}
function getClubImage(clubName, leagueIndex = OWN_LEAGUE_INDEX) {
  if (clubName === ownClubName()) return { national: state.clubImage.national, international: state.clubImage.international };
  const idx = Number(leagueIndex);
  const table = getLeagueTable(idx);
  const row = table.find(r => r.club === clubName);
  const pos = row?.pos || Math.ceil((LEAGUES[idx]?.clubs || 12) / 2);
  const base = leagueImageBase(idx);
  const clubSeed = stableHash(clubName) % 11 - 5;
  const positionBonus = Math.max(-16, 18 - pos * 2);
  const historyBonus = (stableHash(clubName + 'history') % 19) - 6;
  return {
    national: clamp(base.national + positionBonus + clubSeed, 8, 96),
    international: clamp(base.international + Math.floor(positionBonus * 0.75) + historyBonus, 5, 94)
  };
}
function combinedImage(img) {
  return Math.round(img.national * 0.6 + img.international * 0.4);
}
function ownCombinedImage() {
  return combinedImage(state.clubImage);
}
function playerCareerPhase(player) {
  if (player.age <= 22) return 'Talentphase';
  if (player.age <= 29) return 'Prime';
  if (player.age <= 33) return 'Erfahren';
  return 'Karriereende';
}
function transferInterest(player, sourceClubName, leagueIndex) {
  const sourceImage = getClubImage(sourceClubName, leagueIndex);
  const imageGap = combinedImage(sourceImage) - ownCombinedImage();
  let score = 58 - imageGap;
  if (player.age <= 23) score += 8;          // junge Spieler sind eher offen für Entwicklung und Spielzeit
  if (player.age >= 30) score += 14;         // ältere Spieler ziehen eher nochmals weiter
  if (player.age >= 34) score += 16;         // Karriereausklang wird möglich
  if (player.age >= 24 && player.age <= 29 && player.strength >= 72 && imageGap > 12) score -= 24; // Prime-Spieler von großen Vereinen blocken eher ab
  if (player.strength >= 82 && imageGap > 0) score -= 18;
  if (player.contractYears <= 1) score += 12;
  if (state.money > player.marketValue * 1.4) score += 5;
  return clamp(score, 0, 100);
}
function transferInterestText(player, sourceClubName, leagueIndex) {
  const chance = transferInterest(player, sourceClubName, leagueIndex);
  if (chance >= 75) return `sehr offen (${chance}%)`;
  if (chance >= 55) return `verhandelbar (${chance}%)`;
  if (chance >= 35) return `schwierig (${chance}%)`;
  return `sehr unwahrscheinlich (${chance}%)`;
}
function updateClubImageTrend() {
  const pos = getOwnTablePosition();
  let nationalDelta = 0;
  let internationalDelta = 0;
  if (pos <= 2) nationalDelta = 1;
  if (pos <= 4) internationalDelta = 0.35;
  if (pos >= 10) nationalDelta = -1;
  if (pos >= 11) internationalDelta = -0.4;
  state.clubImage.national = clamp(state.clubImage.national + nationalDelta, 1, 100);
  state.clubImage.international = clamp(state.clubImage.international + internationalDelta, 1, 100);
}
function awardTitleImageBoost(type) {
  const boosts = {
    league: { national: 8, international: 3, text: 'Meistertitel' },
    cup: { national: 4, international: 1, text: 'Pokalsieg' },
    europe: { national: 10, international: 14, text: 'internationaler Titel' }
  };
  const boost = boosts[type] || boosts.league;
  state.clubImage.national = clamp(state.clubImage.national + boost.national, 1, 100);
  state.clubImage.international = clamp(state.clubImage.international + boost.international, 1, 100);
  alert(`${boost.text}: Dein Vereinsimage steigt. National +${boost.national}, international +${boost.international}.`);
  render();
}
function sponsorForecast(offer) {
  const expectedPoints = 44;
  const expectedWins = 12;
  return offer.base + expectedPoints * offer.perPoint + expectedWins * offer.winBonus;
}
function selectSponsor(id) {
  const offer = state.sponsorOffers.find(s => s.id === id);
  if (!offer || state.sponsor) return;
  state.sponsor = offer;
  state.finance.incomeSponsors += offer.base;
  state.money += offer.base;
  render();
}
function calcDevelopment(player, focus) {
  const ratingBase = Math.max(0, (5.2 - player.rating) * 1.6);
  const minuteFactor = player.minutes >= 61 ? 1 : player.minutes >= 31 ? 0.75 : player.minutes >= 16 ? 0.5 : player.minutes > 0 ? 0.25 : 0.1;
  const talentFactor = [0, 0.75, 0.9, 1, 1.15, 1.35][player.talent];
  const ageFactor = player.age <= 18 ? 1.4 : player.age <= 21 ? 1.25 : player.age <= 24 ? 1.1 : player.age <= 28 ? 1 : player.age <= 31 ? 0.75 : player.age <= 34 ? 0.45 : 0.15;
  const youthBonus = player.youth && player.minutes > 0 ? 1.25 : 1;
  let focusBonus = 1;
  if (focus === 'Jugendförderung' && player.youth) focusBonus = 1.25;
  if (focus === 'Technik' && ['ZM', 'OM', 'LA', 'RA'].includes(player.pos)) focusBonus = 1.15;
  if (focus === 'Angriff' && ['ST', 'LA', 'RA'].includes(player.pos)) focusBonus = 1.2;
  if (focus === 'Verteidigung' && ['IV', 'LV', 'RV', 'TW'].includes(player.pos)) focusBonus = 1.2;
  const boostFactor = boostedPlayerIdThisMonth() === player.id ? 1.18 : 1;
  return Math.round((2 + ratingBase * minuteFactor * talentFactor * ageFactor * youthBonus * focusBonus * boostFactor) * 10) / 10;
}
function assistantTraining() {
  const tired = state.players.filter(p => p.minutes >= 80).length;
  const young = state.players.filter(p => p.youth).length;
  const poorDefenders = state.players.filter(p => ['IV', 'LV', 'RV', 'TW'].includes(p.pos) && p.rating >= 3.2).length;
  if (tired >= 3) return 'Regeneration';
  if (poorDefenders >= 2) return 'Verteidigung';
  if (young >= 3) return 'Jugendförderung';
  return 'Taktik';
}

function seasonStartDate() {
  return new Date(state.seasonStartYear || 2026, 6, 1); // Saisonbeginn ist immer 01.07.
}
function seasonEndDate() {
  return new Date((state.seasonStartYear || 2026) + 1, 5, 30); // Saisonabschluss ist immer 30.06.
}
function seasonLabel() {
  const y = state.seasonStartYear || 2026;
  return `${y}/${String(y + 1).slice(-2)}`;
}
function isSeasonEndCrossed(nextDate) {
  return nextDate >= seasonEndDate();
}
function currentGameDate() {
  const date = seasonStartDate();
  date.setDate(date.getDate() + (state.week - 1) * 7);
  return date;
}
function nextMatchDate() {
  const date = currentGameDate();
  date.setDate(date.getDate() + 5); // Samstag der aktuellen Kalenderwoche
  return date;
}

function currentDayIndex() {
  return (state.week - 1) * 7;
}
function pruneScoutedPlayerHistory() {
  state.scoutedPlayerHistory = (state.scoutedPlayerHistory || []).filter(entry => entry.expiresDay >= currentDayIndex());
}
function rememberScoutedPlayer(player, clubName, leagueIndex) {
  if (!player) return;
  if (!isPlayerScouted(player.id)) state.scoutedPlayerIds.push(player.id);
  state.scoutedPlayerHistory = state.scoutedPlayerHistory || [];
  state.scoutedPlayerHistory = state.scoutedPlayerHistory.filter(entry => String(entry.id) !== String(player.id));
  state.scoutedPlayerHistory.unshift({
    id: player.id,
    name: player.name,
    age: player.age,
    pos: player.pos,
    secondary: player.secondary || [],
    nationality: player.nationality || 'International',
    club: clubName || player.club,
    leagueIndex: Number(leagueIndex ?? player.leagueIndex ?? OWN_LEAGUE_INDEX),
    scoutedDay: currentDayIndex(),
    scoutedDate: formatGermanDate(currentGameDate()),
    expiresDay: currentDayIndex() + 90
  });
  pruneScoutedPlayerHistory();
}
function rememberScoutedClub(clubName, leagueIndex) {
  getClubRoster(clubName, Number(leagueIndex)).forEach(player => rememberScoutedPlayer(player, clubName, Number(leagueIndex)));
}
function rememberScoutedLeague(leagueIndex) {
  makeLeagueClubs(Number(leagueIndex)).forEach(club => rememberScoutedClub(club, Number(leagueIndex)));
}
function formatGermanDate(date) {
  return date.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
}



function stableHash(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}
function seededNumber(seed, min, max) {
  const x = Math.sin(seed) * 10000;
  const r = x - Math.floor(x);
  return Math.floor(min + r * (max - min + 1));
}
function externalPositions(index) {
  const roles = [
    { pos: 'TW', secondary: [] }, { pos: 'RV', secondary: ['RM', 'IV'] }, { pos: 'IV', secondary: ['DM', 'RV'] },
    { pos: 'IV', secondary: ['LV', 'DM'] }, { pos: 'LV', secondary: ['LM', 'IV'] }, { pos: 'DM', secondary: ['ZM', 'IV'] },
    { pos: 'ZM', secondary: ['DM', 'OM'] }, { pos: 'OM', secondary: ['ZM', 'RA'] }, { pos: 'RA', secondary: ['LA', 'ST'] },
    { pos: 'LA', secondary: ['RA', 'ST'] }, { pos: 'ST', secondary: ['LA', 'RA'] }, { pos: 'TW', secondary: [] },
    { pos: 'IV', secondary: ['RV'] }, { pos: 'ZM', secondary: ['RM'] }, { pos: 'ST', secondary: ['OM'] }, { pos: 'RM', secondary: ['RA', 'RV'] }
  ];
  return roles[index % roles.length];
}
function makeExternalPlayer(clubName, index, leagueIndex = 10) {
  const first = ['Adam','Ben','Carlos','Daniel','Elias','Fabio','Gregor','Ivan','Jonas','Kevin','Leo','Mateo','Noel','Oscar','Pavel','Rafael','Silas','Theo','Viktor','Yannick'];
  const last = ['Meyer','Novak','Silva','Klein','Gruber','Costa','Weber','Kovac','Schmidt','Rossi','Fischer','Santos','Bauer','Pavlovic','Huber','Martinez','Leitner','Horvat','Steiner','Moreira'];
  const seed = stableHash(clubName) + index * 97 + leagueIndex * 251;
  const role = externalPositions(index);
  const tierBoost = leagueIndex <= 4 ? 14 : leagueIndex <= 8 ? 9 : leagueIndex <= 14 ? 5 : 2;
  const age = seededNumber(seed + 7, 17, 34);
  const strength = Math.min(92, seededNumber(seed + 13, 42, 68) + tierBoost);
  const talent = age <= 21 && strength >= 62 ? seededNumber(seed + 19, 3, 5) : seededNumber(seed + 23, 1, 4);
  const marketValue = Math.round((strength * strength * 950 + talent * 85000 + Math.max(0, 26 - age) * 42000) / 10000) * 10000;
  const nationalityPool = { England: ['England','Schottland','Irland'], Spanien: ['Spanien','Argentinien','Uruguay'], Italien: ['Italien','Serbien','Kroatien'], Deutschland: ['Deutschland','Österreich','Schweiz'], Frankreich: ['Frankreich','Belgien','Marokko'], Portugal: ['Portugal','Brasilien','Angola'], Niederlande: ['Niederlande','Belgien','Suriname'], Belgien: ['Belgien','Frankreich','Niederlande'], Türkei: ['Türkei','Deutschland','Georgien'], Schottland: ['Schottland','England','Irland'], Österreich: ['Österreich','Deutschland','Slowenien'], USA: ['USA','Kanada','Mexiko'], Südamerika: ['Brasilien','Argentinien','Kolumbien'] };
  const leagueCountry = LEAGUES[leagueIndex]?.country || 'Europa';
  const pool = nationalityPool[leagueCountry] || [leagueCountry, 'International'];
  const nationality = pool[seed % pool.length];
  const player = {
    id: `ext-${leagueIndex}-${stableHash(clubName)}-${index}`,
    name: `${first[seed % first.length]} ${last[Math.floor(seed / 8) % last.length]}`,
    age, nationality, pos: role.pos, secondary: role.secondary, strength, talent,
    salary: Math.round((strength * 820 + talent * 2200) / 1000) * 1000,
    marketValue,
    contractYears: seededNumber(seed + 31, 1, 4),
    club: clubName,
    leagueIndex
  };
  return ensurePlayerSkillProfile(player);
}
function getClubRoster(clubName, leagueIndex = 10) {
  const key = `${leagueIndex}:${clubName}`;
  if (!state.clubRosterCache[key]) {
    state.clubRosterCache[key] = Array.from({ length: 16 }, (_, i) => makeExternalPlayer(clubName, i, leagueIndex));
  }
  return state.clubRosterCache[key];
}
function makeLeagueClubs(leagueIndex) {
  if (leagueIndex === 10) return CURRENT_TABLE.map(r => r.club);
  const league = LEAGUES[leagueIndex];
  const prefixes = ['FC','Sporting','Union','Athletic','Real','Rapid','Dynamo','City','Racing','Viktoria','Olympic','Inter'];
  const places = ['Nordstadt','Bergheim','Altbrunn','Neustadt','Südstadt','Westhaven','Kronau','Talblick','Mühlbach','Donaupark','Hainstadt','Ostfeld','Porta','Riverton','Lindau','Marina','Castello','United','Central','Academia'];
  return Array.from({ length: league.clubs }, (_, i) => `${prefixes[(i + leagueIndex) % prefixes.length]} ${places[(i * 3 + leagueIndex) % places.length]}`);
}
function getLeagueTable(leagueIndex) {
  if (leagueIndex === 10) return CURRENT_TABLE.map(r => ({ ...r, leagueIndex }));
  if (!state.leagueTableCache[leagueIndex]) {
    const clubs = makeLeagueClubs(leagueIndex);
    state.leagueTableCache[leagueIndex] = clubs.map((club, i) => {
      const seed = stableHash(club) + leagueIndex * 1000;
      const played = 7;
      const points = Math.max(1, 18 - i + seededNumber(seed, -3, 3));
      const diff = points - 10 + seededNumber(seed + 8, -3, 3);
      return { pos: i + 1, club, played, diff, points, leagueIndex };
    }).sort((a,b) => b.points - a.points || b.diff - a.diff).map((r,i) => ({...r, pos:i+1}));
  }
  return state.leagueTableCache[leagueIndex];
}
function setMarketSection(section) { state.marketSection = section; render(); }
function openLeagueTable(index) { state.selectedLeagueIndex = Number(index); state.seasonSection = 'leagueTable'; render(); }
function openClubRoster(clubName, leagueIndex = 10) { state.viewedClub = { clubName, leagueIndex: Number(leagueIndex) }; state.playerProfile = null; state.seasonSection = 'clubRoster'; render(); }
function openPlayerProfile(playerId, clubName, leagueIndex = 10) {
  const roster = getClubRoster(clubName, Number(leagueIndex));
  const player = roster.find(p => String(p.id) === String(playerId));
  if (!player) return;
  state.playerProfile = { ...player, club: clubName, leagueIndex: Number(leagueIndex) };
  render();
}
function closePlayerProfile() { state.playerProfile = null; render(); }
function watchlistHas(playerId) { return state.watchlist.some(p => String(p.id) === String(playerId)); }
function addToWatchlist(playerId, clubName, leagueIndex = 10) {
  const player = getClubRoster(clubName, Number(leagueIndex)).find(p => String(p.id) === String(playerId));
  if (!player || watchlistHas(player.id)) return;
  state.watchlist.push({ ...player, club: clubName, leagueIndex: Number(leagueIndex) });
  alert(`${player.name} wurde auf die Beobachtungsliste gesetzt.`);
  render();
}
function removeFromWatchlist(playerId) { state.watchlist = state.watchlist.filter(p => String(p.id) !== String(playerId)); render(); }
function makeContractOffer(playerId, clubName, leagueIndex = 10) {
  const player = getClubRoster(clubName, Number(leagueIndex)).find(p => String(p.id) === String(playerId));
  if (!player) return;
  if (!isPlayerKnown({ ...player, club: clubName, leagueIndex: Number(leagueIndex) })) { alert('Diesen Spieler musst du zuerst scouten, bevor du ein seriöses Vertragsangebot machen kannst.'); return; }
  const sourceImage = getClubImage(clubName, Number(leagueIndex));
  const chance = transferInterest(player, clubName, Number(leagueIndex));
  const phase = playerCareerPhase(player);
  const reason = chance < 35
    ? 'Der Spieler sieht deinen Verein aktuell als sportlichen Rückschritt. Besonders Prime-Spieler von Vereinen mit höherem Image wechseln selten.'
    : chance < 55
      ? 'Der Wechsel ist schwierig, aber mit gutem Angebot nicht unmöglich.'
      : 'Der Spieler kann sich einen Wechsel grundsätzlich vorstellen.';
  const ok = confirm(`${player.name} ein Vertragsangebot machen?\n\nAblöse-Schätzung: ${euro(player.marketValue)}\nGehalt: ${euro(player.salary)}\nKarrierephase: ${phase}\nWechselbereitschaft: ${transferInterestText(player, clubName, Number(leagueIndex))}\n\nDein Image: ${ownCombinedImage()}/100\nAktueller Verein: ${combinedImage(sourceImage)}/100\n\n${reason}`);
  if (!ok) return;
  if (chance < 35) {
    alert(`${player.name} lehnt ab. Dein Vereinsimage ist für diesen Spieler aktuell nicht attraktiv genug.`);
    return;
  }
  if (chance < 55 && !confirm('Der Transfer ist riskant. Du musst vermutlich deutlich über Marktwert zahlen. Trotzdem weitermachen?')) return;
  const premium = chance < 55 ? 1.25 : chance < 75 ? 1.1 : 1;
  const transferFee = Math.round(player.marketValue * premium);
  if (state.money < transferFee) { alert(`Nicht genug Geld für diesen Transfer. Benötigt: ${euro(transferFee)}`); return; }
  state.money -= transferFee;
  state.finance.expenseTransfers += transferFee;
  const nextId = Math.max(0, ...state.players.map(p => p.id)) + 1;
  state.players.push(ensurePlayerSkillProfile({ id: nextId, name: player.name, age: player.age, pos: player.pos, secondary: player.secondary, strength: player.strength, talent: player.talent, skills: player.skills, progress: 0, rating: 3.0, minutes: 0, youth: false, loan: null }));
  state.watchlist = state.watchlist.filter(p => String(p.id) !== String(player.id));
  alert(`${player.name} wurde verpflichtet. Ablöse: ${euro(transferFee)}`);
  initLineup();
  render();
}

function allMarketPlayers(limit = 1800) {
  const players = [];
  LEAGUES.forEach((league, leagueIndex) => {
    makeLeagueClubs(leagueIndex).forEach(club => {
      getClubRoster(club, leagueIndex).forEach(player => {
        players.push({ ...player, club, leagueIndex });
      });
    });
  });
  state.transferFreeAgents.forEach(player => players.push({ ...player, club: 'Ablösefrei', leagueIndex: OWN_LEAGUE_INDEX, freeAgent: true }));
  return players.slice(0, limit);
}
function transferListSeed(player) {
  return stableHash(`${player.id}-${player.club}-transferlist`);
}
function isTransferListed(player) {
  if (player.freeAgent) return true;
  const seed = transferListSeed(player);
  return player.contractYears <= 1 || player.age >= 31 || seed % 100 < 18;
}
function transferListReason(player) {
  if (player.freeAgent) return 'ablösefrei nach Vertragsende';
  if (player.contractYears <= 1) return 'kurze Vertragslaufzeit';
  if (player.age >= 31) return 'Verein plant Kaderumbruch';
  return transferListSeed(player) % 3 === 0 ? 'passt nicht mehr in die Planung' : transferListSeed(player) % 3 === 1 ? 'soll Gehaltsbudget freimachen' : 'offen für Angebote';
}
function transferListPrice(player) {
  if (player.freeAgent) return 0;
  const base = player.marketValue || 150000;
  const seed = transferListSeed(player);
  let factor = 0.78 + (seed % 38) / 100; // oft günstiger, aber nicht immer
  if (player.contractYears <= 1) factor -= 0.12;
  if (player.age >= 32) factor -= 0.08;
  if (seed % 11 === 0) factor += 0.22; // manchmal will der Verein trotzdem viel
  return Math.max(25000, Math.round(base * factor / 10000) * 10000);
}
function transferListedPlayers() {
  return allMarketPlayers().filter(isTransferListed).sort((a,b) => transferListPrice(a) - transferListPrice(b)).slice(0, 80);
}
function buyTransferListedPlayer(playerId, clubName, leagueIndex) {
  const idx = Number(leagueIndex);
  const source = clubName === 'Ablösefrei'
    ? state.transferFreeAgents.find(p => String(p.id) === String(playerId))
    : getClubRoster(clubName, idx).find(p => String(p.id) === String(playerId));
  if (!source) return;
  const player = { ...source, club: clubName, leagueIndex: idx };
  if (!isPlayerKnown(player) && !player.freeAgent) {
    alert('Diesen Spieler solltest du zuerst scouten. Auf der Transferliste siehst du zwar die Gesamtstärke, aber noch nicht die einzelnen Fähigkeiten und damit nicht zuverlässig, ob er zu deiner Taktik passt.');
    return;
  }
  const price = transferListPrice(player);
  const normalChance = transferInterest(player, clubName, idx);
  const chance = clamp(normalChance + 18 + (player.age >= 30 ? 8 : 0) + (player.contractYears <= 1 ? 8 : 0), 0, 100);
  const message = player.freeAgent
    ? `${player.name} ablösefrei verpflichten?\n\nHandgeld: ${euro(Math.round((player.salary || 20000) * 2 / 1000) * 1000)}\nWechselbereitschaft: ${chance}%`
    : `${player.name} von der Transferliste kaufen?\n\nMarktwert: ${euro(player.marketValue)}\nGeforderter Preis: ${euro(price)}\nGrund: ${transferListReason(player)}\nWechselbereitschaft: ${chance}%\n\nTransferlisten-Spieler sind leichter zu bekommen und oft günstiger, aber nicht immer.`;
  if (!confirm(message)) return;
  if (chance < 30) { alert(`${player.name} möchte trotz Transferliste aktuell nicht zu deinem Verein wechseln.`); return; }
  const total = player.freeAgent ? Math.round((player.salary || 20000) * 2 / 1000) * 1000 : price;
  if (state.money < total) { alert(`Nicht genug Geld. Benötigt: ${euro(total)}`); return; }
  state.money -= total;
  state.finance.expenseTransfers += total;
  const nextId = Math.max(0, ...state.players.map(p => p.id)) + 1;
  state.players.push(ensurePlayerSkillProfile({ id: nextId, name: player.name, age: player.age, pos: player.pos, secondary: player.secondary || [], strength: player.strength, talent: player.talent, skills: player.skills, progress: 0, rating: 3.0, minutes: 0, youth: false, loan: null, salary: player.salary, marketValue: player.marketValue, contractYears: player.freeAgent ? 2 : Math.max(1, player.contractYears || 2), satisfaction: 60 }));
  state.watchlist = state.watchlist.filter(p => String(p.id) !== String(player.id));
  state.transferFreeAgents = state.transferFreeAgents.filter(p => String(p.id) !== String(player.id));
  alert(`${player.name} wurde verpflichtet. Kosten: ${euro(total)}.`);
  initLineup();
  render();
}
function setMarketSearchField(field, value) {
  state.marketSearch[field] = value;
  render();
}
function saveMarketSearch() {
  const label = prompt('Name für diesen Suchfilter:', `Filter ${state.savedMarketSearches.length + 1}`);
  if (!label) return;
  state.savedMarketSearches.push({ label, filter: { ...state.marketSearch } });
  render();
}
function loadMarketSearch(index) {
  const saved = state.savedMarketSearches[Number(index)];
  if (!saved) return;
  state.marketSearch = { ...state.marketSearch, ...saved.filter };
  render();
}
function deleteMarketSearch(index) {
  state.savedMarketSearches.splice(Number(index), 1);
  render();
}
function clearMarketSearch() {
  state.marketSearch = { name: '', position: 'Alle', maxAge: '', minStrength: '', minTalent: '', minValue: '', maxValue: '' };
  render();
}
function marketSearchResults() {
  const f = state.marketSearch;
  return allMarketPlayers().filter(player => {
    const known = isPlayerKnown(player);
    if (f.name && !player.name.toLowerCase().includes(f.name.toLowerCase())) return false;
    if (f.position !== 'Alle' && player.pos !== f.position && !(player.secondary || []).includes(f.position)) return false;
    if (f.maxAge && player.age > Number(f.maxAge)) return false;
    if (f.minStrength && (!known || player.strength < Number(f.minStrength))) return false;
    if (f.minTalent && (!known || player.talent < Number(f.minTalent))) return false;
    if (f.minValue && (!known || player.marketValue < Number(f.minValue))) return false;
    if (f.maxValue && (!known || player.marketValue > Number(f.maxValue))) return false;
    return true;
  }).slice(0, 80);
}
function loanStatusText(player) {
  if (player.loan === 'verliehen') return 'verliehen · steht aktuell nicht zur Verfügung';
  if (player.loan === 'geliehen') return 'geliehen · temporär im Kader';
  return 'kein Leihstatus';
}

function monthCursorDate() {
  const d = currentGameDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + state.calendarMonthOffset);
  return d;
}
function changeCalendarMonth(delta) { state.calendarMonthOffset += delta; render(); }

function clubScoutKey(clubName, leagueIndex) {
  return `${Number(leagueIndex)}:${clubName}`;
}
function isOwnLeague(leagueIndex) {
  return Number(leagueIndex) === OWN_LEAGUE_INDEX;
}
function isLeagueScouted(leagueIndex) {
  return isOwnLeague(leagueIndex) || state.scoutedLeagueIds.includes(Number(leagueIndex));
}
function isClubScouted(clubName, leagueIndex) {
  return isLeagueScouted(leagueIndex) || !!state.scoutedClubKeys[clubScoutKey(clubName, leagueIndex)];
}
function isPlayerScouted(playerId) {
  return state.scoutedPlayerIds.some(id => String(id) === String(playerId));
}
function isPlayerKnown(player) {
  if (!player) return false;
  return isClubScouted(player.club, player.leagueIndex) || isPlayerScouted(player.id);
}
function scoutLeagueCost(leagueIndex) {
  const league = LEAGUES[Number(leagueIndex)];
  const tierFactor = league?.tier === 'Topliga' ? 1.5 : league?.tier === 'Stark' ? 1.25 : league?.tier === 'Spezialliga' ? 1.35 : 1;
  return Math.round((85000 * tierFactor + (league?.clubs || 12) * 3500) / 1000) * 1000;
}
function scoutClubCost(clubName, leagueIndex) {
  const base = isLeagueScouted(leagueIndex) ? 28000 : 45000;
  return Math.round((base + (stableHash(clubName) % 17000)) / 1000) * 1000;
}
function scoutPlayerCost(player) {
  if (!player) return 12000;
  const league = LEAGUES[Number(player.leagueIndex)];
  const tierFactor = league?.tier === 'Topliga' ? 1.35 : league?.tier === 'Stark' ? 1.15 : league?.tier === 'Spezialliga' ? 1.25 : 1;
  return Math.round((9000 * tierFactor + player.age * 350 + (stableHash(player.id) % 9000)) / 1000) * 1000;
}
function setScoutingLeague(index) {
  state.scoutingLeagueIndex = Number(index);
  render();
}
function setScoutingSection(section) {
  state.scoutingSection = section;
  render();
}
function scoutingSubButton(id, label) {
  return `<button class="chip ${state.scoutingSection === id ? 'selected' : ''}" onclick="setScoutingSection('${id}')">${label}</button>`;
}
function scoutingJobKey(type, payload) {
  if (type === 'player') return `player:${payload.playerId}`;
  if (type === 'club') return `club:${payload.leagueIndex}:${payload.clubName}`;
  return `${type}:${payload.leagueIndex}`;
}
function activeScoutingJob(type, payload) {
  const key = scoutingJobKey(type, payload);
  return (state.scoutingJobs || []).find(job => job.key === key);
}
function startScoutingJob(job) {
  state.scoutingJobs = state.scoutingJobs || [];
  if (state.scoutingJobs.some(existing => existing.key === job.key)) { alert('Dieser Scouting-Auftrag läuft bereits.'); return false; }
  state.scoutingJobs.push(job);
  return true;
}
function processScoutingJobs(days = 7) {
  if (!state.scoutingJobs || !state.scoutingJobs.length) return;
  const completed = [];
  state.scoutingJobs = state.scoutingJobs.map(job => ({ ...job, remainingDays: job.remainingDays - days })).filter(job => {
    if (job.remainingDays <= 0) { completed.push(job); return false; }
    return true;
  });
  completed.forEach(job => {
    if (job.type === 'player') {
      const player = getClubRoster(job.clubName, job.leagueIndex).find(p => String(p.id) === String(job.playerId));
      rememberScoutedPlayer(player, job.clubName, job.leagueIndex);
    }
    if (job.type === 'club') {
      state.scoutedClubKeys[clubScoutKey(job.clubName, job.leagueIndex)] = true;
      rememberScoutedClub(job.clubName, job.leagueIndex);
    }
  });
  if (completed.length) alert(`${completed.length} Scouting-Auftrag${completed.length === 1 ? '' : 'e'} abgeschlossen.`);
}
function scoutingJobStatusText(type, payload) {
  const job = activeScoutingJob(type, payload);
  return job ? `Scouting läuft · noch ${Math.max(1, job.remainingDays)} Tage` : '';
}
function scoutLeague(index) {
  const leagueIndex = Number(index);
  if (isLeagueScouted(leagueIndex)) return;
  const league = LEAGUES[leagueIndex];
  const cost = scoutLeagueCost(leagueIndex);
  if (state.money < cost) { alert('Nicht genug Geld für diesen Scouting-Auftrag.'); return; }
  const ok = confirm(`${league.league} scouten?\n\nKosten: ${euro(cost)}\n\nDanach kennst du Stärke, Talent, Marktwert und Vertragsdaten aller Spieler dieser Liga.`);
  if (!ok) return;
  state.money -= cost;
  state.finance.expenseScouting += cost;
  state.scoutedLeagueIds.push(leagueIndex);
  rememberScoutedLeague(leagueIndex);
  alert(`${league.league} wurde gescoutet. Die Spielerwerte dieser Liga sind jetzt sichtbar.`);
  render();
}
function scoutClub(clubName, leagueIndex) {
  const idx = Number(leagueIndex);
  if (isClubScouted(clubName, idx)) return;
  const cost = scoutClubCost(clubName, idx);
  if (state.money < cost) { alert('Nicht genug Geld für diesen Scouting-Auftrag.'); return; }
  const payload = { clubName, leagueIndex: idx };
  if (activeScoutingJob('club', payload)) { alert('Dieser Verein wird bereits gescoutet.'); return; }
  const ok = confirm(`${clubName} scouten?

Kosten: ${euro(cost)}
Dauer: 1 Monat / 30 Tage

Nach Abschluss kennst du Stärke, Talent, Marktwert und Vertragsdaten der Spieler dieses Vereins.`);
  if (!ok) return;
  state.money -= cost;
  state.finance.expenseScouting += cost;
  startScoutingJob({ key: scoutingJobKey('club', payload), type: 'club', clubName, leagueIndex: idx, label: `Verein: ${clubName}`, totalDays: 30, remainingDays: 30, cost });
  alert(`Scouting-Auftrag gestartet: ${clubName}. Dauer: 30 Tage.`);
  render();
}
function scoutPlayer(playerId, clubName, leagueIndex) {
  const idx = Number(leagueIndex);
  const player = getClubRoster(clubName, idx).find(p => String(p.id) === String(playerId));
  if (!player || isPlayerKnown({ ...player, club: clubName, leagueIndex: idx })) return;
  const cost = scoutPlayerCost({ ...player, club: clubName, leagueIndex: idx });
  if (state.money < cost) { alert('Nicht genug Geld, um diesen Spieler zu scouten.'); return; }
  const payload = { playerId: player.id };
  if (activeScoutingJob('player', payload)) { alert('Dieser Spieler wird bereits gescoutet.'); return; }
  const ok = confirm(`${player.name} scouten?

Kosten: ${euro(cost)}
Dauer: 3 Tage

Nach Abschluss kennst du Stärke, Talent, Marktwert und Vertragsdaten dieses Spielers.`);
  if (!ok) return;
  state.money -= cost;
  state.finance.expenseScouting += cost;
  startScoutingJob({ key: scoutingJobKey('player', payload), type: 'player', playerId: player.id, clubName, leagueIndex: idx, label: `Spieler: ${player.name}`, totalDays: 3, remainingDays: 3, cost });
  alert(`Scouting-Auftrag gestartet: ${player.name}. Dauer: 3 Tage.`);
  render();
}
function unknownPlayerMeta(player = null, showOverall = false) {
  if (showOverall && player) {
    return `<span>Stärke ${player.strength}/100</span><span>Talent: Scouting erforderlich</span><span>Fähigkeiten: Scouting erforderlich</span><span>Vertrag: Scouting erforderlich</span>`;
  }
  return '<span>Scouting erforderlich</span><span>Scouting erforderlich</span><span>Scouting erforderlich</span><span>Scouting erforderlich</span>';
}
function knownPlayerMeta(p) {
  return `<span>Stärke ${p.strength}/100</span><span class="stars">${stars(p.talent)}</span>${shortSkillProfile(p)}<span>Wert ${euro(p.marketValue)}</span><span>Vertrag ${p.contractYears} J.</span>`;
}

function youthCenterDiscoveryInterval() {
  const level = state.facilities.youthCenter.level;
  return Math.max(2, 9 - Math.floor(level / 2));
}
function youthCenterDevelopmentBonus() {
  return 1 + state.facilities.youthCenter.level * 0.03;
}
function developAcademyPlayers(focus) {
  const bonus = youthCenterDevelopmentBonus();
  state.academyPlayers = state.academyPlayers.map(player => {
    const ageFactor = player.age <= 15 ? 1.15 : player.age <= 17 ? 1.35 : 1.2;
    const talentFactor = [0, 0.75, 0.9, 1, 1.18, 1.4][player.talent];
    const focusBonus = focus === 'Jugendförderung' ? 1.2 : 1;
    let gain = (2.5 + player.talent * 0.7) * ageFactor * talentFactor * bonus * focusBonus;
    let progress = player.progress + gain;
    let updated = player;
    while (progress >= 100 && updated.strength < 100) {
      updated = improvePlayerSkills(updated, 1);
      progress -= 100;
    }
    return { ...updated, progress: Math.round(progress) };
  });
}
function generateYouthPlayer() {
  const firstNames = ['Julian', 'Marco', 'Adrian', 'Niklas', 'Samuel', 'Timo', 'Denis', 'Fabio', 'Elias', 'Kilian', 'Leon', 'Matteo'];
  const lastNames = ['Hofer', 'Schmid', 'Kraus', 'Fischer', 'Pichler', 'Auer', 'Huber', 'Kovac', 'Moser', 'Lechner', 'Baumgartner', 'Sailer'];
  const positions = [
    { pos: 'TW', secondary: [] },
    { pos: 'IV', secondary: ['DM', 'RV'] },
    { pos: 'LV', secondary: ['LM', 'RV'] },
    { pos: 'RV', secondary: ['RM', 'LV'] },
    { pos: 'DM', secondary: ['ZM', 'IV'] },
    { pos: 'ZM', secondary: ['DM', 'OM'] },
    { pos: 'OM', secondary: ['ZM', 'RA'] },
    { pos: 'LA', secondary: ['RA', 'ST'] },
    { pos: 'RA', secondary: ['LA', 'ST'] },
    { pos: 'ST', secondary: ['LA', 'RA'] }
  ];
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const role = pick(positions);
  const level = state.facilities.youthCenter.level;
  const academyLevel = state.facilities.academy.level;
  const talentRoll = Math.random() + level * 0.025 + academyLevel * 0.02;
  const talent = talentRoll > 0.92 ? 5 : talentRoll > 0.72 ? 4 : talentRoll > 0.42 ? 3 : talentRoll > 0.18 ? 2 : 1;
  const age = 14 + Math.floor(Math.random() * 5);
  const strength = Math.min(60, Math.max(25, 28 + talent * 4 + Math.floor(Math.random() * 10) + Math.floor(level / 3)));
  const id = Math.max(100, ...state.academyPlayers.map(p => p.id), ...state.players.map(p => p.id)) + 1;
  return ensurePlayerSkillProfile({
    id,
    name: `${pick(firstNames)} ${pick(lastNames)}`,
    age,
    pos: role.pos,
    secondary: role.secondary,
    strength,
    talent,
    progress: Math.floor(Math.random() * 55)
  });
}
function maybeDiscoverYouthPlayer() {
  if (state.week < state.nextYouthDiscoveryWeek) return;
  const player = generateYouthPlayer();
  state.academyPlayers.push(player);
  state.youthDiscoveryPopup = player;
  state.nextYouthDiscoveryWeek = state.week + youthCenterDiscoveryInterval();
}
function closeYouthDiscoveryPopup() {
  state.youthDiscoveryPopup = null;
  render();
}
function openYouthAfterDiscovery() {
  state.youthDiscoveryPopup = null;
  state.tab = 'team';
  state.teamSection = 'youth';
  render();
}


function buildSeasonReview() {
  const row = CURRENT_TABLE.find(r => r.own) || CURRENT_TABLE[6];
  const points = row?.points || 0;
  const place = row?.pos || 7;
  const squadAvg = Math.round(averageLineupStrength() || state.players.reduce((s,p)=>s+p.strength,0)/Math.max(1,state.players.length));
  const topPlayer = [...state.players].sort((a,b) => (b.strength || 0) - (a.strength || 0))[0];
  const talents = state.academyPlayers.length;
  const income = totalIncome();
  const expense = totalExpense();
  const saldo = income - expense;
  return {
    season: seasonLabel(),
    endDate: formatGermanDate(seasonEndDate()),
    place,
    points,
    squadAvg,
    topPlayerName: topPlayer ? topPlayer.name : 'kein Spieler',
    topPlayerStrength: topPlayer ? topPlayer.strength : 0,
    academyPlayers: talents,
    money: state.money,
    income,
    expense,
    saldo,
    sponsorName: state.sponsor ? state.sponsor.name : 'kein Sponsor',
    lastMatch: state.lastMatchReport ? `${state.lastMatchReport.ownGoals}:${state.lastMatchReport.oppGoals} gegen ${state.lastMatchReport.opponent}` : 'kein Spielbericht'
  };
}
function finishSeasonIfNeeded(nextDate) {
  if (!isSeasonEndCrossed(nextDate) || state.seasonEndModal) return false;
  state.seasonEndModal = buildSeasonReview();
  return true;
}
function beginNewSeason() {
  state.seasonStartYear = (state.seasonStartYear || 2026) + 1;
  state.week = 1;
  state.sponsor = null;
  state.seasonEndModal = null;
  state.seasonStartModal = {
    season: seasonLabel(),
    startDate: formatGermanDate(seasonStartDate()),
    message: 'Neue Saison, neuer Sponsorvertrag und neue Ziele.'
  };
  state.trainingBoosts = [];
  state.nextYouthDiscoveryWeek = 3;
  state.tab = 'dashboard';
  state.seasonSection = 'calendar';
  state.players = state.players.map(p => ({ ...p, age: p.age + 1, minutes: 0, rating: 3.0 }));
  state.academyPlayers = state.academyPlayers.map(p => ({ ...p, age: p.age + 1 }));
  render();
}
function closeSeasonStartModal() {
  state.seasonStartModal = null;
  render();
}
function nextWeek() {
  const nextDatePreview = new Date(currentGameDate());
  nextDatePreview.setDate(nextDatePreview.getDate() + 7);
  const focus = state.autoTraining ? assistantTraining() : state.trainingFocus;
  state.trainingFocus = focus;
  simulateCurrentMatch();
  state.week += 1;
  progressConstruction();
  processScoutingJobs(7);
  pruneScoutedPlayerHistory();
  state.players = state.players.map(player => {
    const gain = calcDevelopment(player, focus);
    let progress = player.progress + gain;
    let updated = player;
    while (progress >= 100 && updated.strength < 100) {
      updated = improvePlayerSkills(updated, 1);
      progress -= 100;
    }
    return { ...updated, progress: Math.round(progress) };
  });
  developAcademyPlayers(focus);
  updateClubImageTrend();
  processContractYearEnd();
  maybeDiscoverYouthPlayer();
  if (finishSeasonIfNeeded(nextDatePreview)) { render(); return; }
  render();
}
function setTab(tab) { state.tab = tab; render(); }
function goTo(tab, section) {
  state.tab = tab;
  if (tab === 'team' && section) state.teamSection = section;
  if (tab === 'club' && section) state.clubSection = section;
  if (tab === 'season' && section) state.seasonSection = section;
  if (tab === 'environment' && section) state.environmentSection = section;
  render();
}
function setTeamSection(section) { state.teamSection = section; render(); }
function setClubSection(section) { state.clubSection = section; render(); }
function setSeasonSection(section) { state.seasonSection = section; render(); }
function setEnvironmentSection(section) { state.environmentSection = section; render(); }
function setTrainingFocus(focus) { state.trainingFocus = focus; render(); }
function currentMonthKey() {
  const d = currentGameDate();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function trainingBoostCost(player) {
  return Math.round((12000 + (player.strength || 50) * 450 + (player.talent || 3) * 2500) / 1000) * 1000;
}
function boostedPlayerIdThisMonth() {
  const boost = state.monthlyTrainingBoost;
  return boost && boost.monthKey === currentMonthKey() ? Number(boost.playerId) : null;
}
function giveTrainingBoost(playerId) {
  const player = state.players.find(p => p.id === Number(playerId));
  if (!player) return;
  if (boostedPlayerIdThisMonth()) {
    alert('Für diesen Monat wurde bereits ein Spieler-Trainingsboost vergeben. Der nächste Boost ist erst im nächsten Monat möglich.');
    return;
  }
  const cost = trainingBoostCost(player);
  if (state.money < cost) { alert('Nicht genug Geld für diesen Trainingsboost.'); return; }
  const ok = confirm(`${player.name} für diesen Monat einen Trainingsboost geben?\n\nKosten: ${euro(cost)}\nEffekt: etwas schnellere Entwicklung bis zum Monatswechsel.`);
  if (!ok) return;
  state.money -= cost;
  state.finance.expenseTrainingBoost = (state.finance.expenseTrainingBoost || 0) + cost;
  state.monthlyTrainingBoost = { playerId: player.id, monthKey: currentMonthKey() };
  render();
}
function setContractSort(value) { state.contractSort = value; render(); }
function toggleAutoTraining() { state.autoTraining = !state.autoTraining; render(); }
function setTrainingSort(value) { state.trainingSort = value === 'asc' ? 'asc' : 'desc'; render(); }
function setFormation(formation) { state.formation = formation; initLineup(); render(); }
function setLineupPlayer(slotId, playerId) {
  const id = Number(playerId);
  Object.keys(state.lineup).forEach(key => {
    if (key !== slotId && Number(state.lineup[key]) === id) state.lineup[key] = null;
  });
  Object.keys(state.bench || {}).forEach(key => {
    if (Number(state.bench[key]) === id) state.bench[key] = null;
  });
  state.lineup[slotId] = id || null;
  render();
}
function setBenchPlayer(slotId, playerId) {
  const id = Number(playerId);
  Object.keys(state.bench || {}).forEach(key => {
    if (key !== slotId && Number(state.bench[key]) === id) state.bench[key] = null;
  });
  Object.keys(state.lineup).forEach(key => {
    if (Number(state.lineup[key]) === id) state.lineup[key] = null;
  });
  state.bench[slotId] = id || null;
  render();
}

function openLineupSlot(slotId) {
  state.lineupEditSlot = slotId;
  render();
}
function closeLineupSlot() {
  state.lineupEditSlot = null;
  render();
}
function openBenchSlot(slotId) {
  state.benchEditSlot = slotId;
  render();
}
function closeBenchSlot() {
  state.benchEditSlot = null;
  render();
}
function setLineupPlayerFromModal(slotId, playerId) {
  setLineupPlayer(slotId, playerId);
  state.lineupEditSlot = null;
  render();
}
function setBenchPlayerFromModal(slotId, playerId) {
  setBenchPlayer(slotId, playerId);
  state.benchEditSlot = null;
  render();
}
function selectedSlot() {
  return activePositions().find(slot => slot.id === state.lineupEditSlot) || null;
}
function selectedBenchSlot() {
  return benchSlots().find(slot => slot.id === state.benchEditSlot) || null;
}
function toggleLoan(id) {
  state.players = state.players.map(p => p.id === id ? { ...p, loan: p.loan === 'verliehen' ? null : 'verliehen' } : p);
  initLineup();
  render();
}
function offerYouthContract(id) {
  const player = state.academyPlayers.find(p => p.id === id);
  if (!player) return;
  if (player.age < 16) {
    alert('Dieser Jugendspieler ist noch zu jung. Verträge sind erst ab 16 Jahren möglich.');
    return;
  }
  const ok = confirm(`${player.name} einen Vertrag für die erste Mannschaft anbieten?\n\nDer Spieler wechselt danach aus der Jugend in deinen Kader.`);
  if (!ok) return;
  const nextId = Math.max(0, ...state.players.map(p => p.id)) + 1;
  state.players.push(ensurePlayerSkillProfile({
    ...player,
    id: nextId,
    rating: 3.0,
    minutes: 0,
    youth: true,
    loan: null,
    satisfaction: 58,
    noPlayWeeks: 0
  }));
  state.academyPlayers = state.academyPlayers.filter(p => p.id !== id);
  render();
}
function releaseYouthPlayer(id) {
  const player = state.academyPlayers.find(p => p.id === id);
  if (!player) return;
  const ok = confirm(`${player.name} wirklich aus dem Verein werfen?\n\nEr wird dauerhaft aus deiner Jugend entfernt.`);
  if (!ok) return;
  state.academyPlayers = state.academyPlayers.filter(p => p.id !== id);
  render();
}
function card(icon, title, value, detail, action = '') {
  const clickable = action ? ` linkCard" role="button" tabindex="0" onclick="${action}" onkeydown="if(event.key==='Enter'||event.key===' '){${action}}"` : '"';
  const hint = action ? '<em>Antippen zum Öffnen</em>' : '';
  return `<article class="card${clickable}><div class="icon">${icon}</div><p>${title}</p><h2>${value}</h2><span>${detail}</span>${hint}</article>`;
}

function ownClubName() {
  return state.clubName || 'FC Beispielstadt';
}
function currentOpponentName() {
  const row = CURRENT_TABLE.find(r => !r.own) || { club: 'SV Nordheim' };
  return row.club === ownClubName() ? 'SV Nordheim' : row.club;
}
function startLeagueOptions() {
  return LEAGUES.map((l, i) => `<option value="${i}" ${Number(state.startSetup.leagueIndex) === i ? 'selected' : ''}>${l.country} · ${l.league}</option>`).join('');
}
function startClubOptions() {
  return makeLeagueClubs(Number(state.startSetup.leagueIndex)).map(club => `<option value="${club}" ${state.startSetup.clubName === club ? 'selected' : ''}>${club}</option>`).join('');
}
function setStartLeague(value) {
  const idx = Number(value);
  state.startSetup.leagueIndex = idx;
  state.startSetup.clubName = makeLeagueClubs(idx)[0] || 'FC Beispielstadt';
  render();
}
function startGame() {
  const name = String(document.getElementById('managerName')?.value || '').trim();
  const age = Number(document.getElementById('managerAge')?.value || 0);
  const country = String(document.getElementById('managerCountry')?.value || '').trim();
  const leagueIndex = Number(document.getElementById('startLeague')?.value || state.startSetup.leagueIndex);
  const clubName = String(document.getElementById('startClub')?.value || '').trim();
  if (!name) { alert('Bitte gib deinen Namen ein.'); return; }
  if (!age || age < 18 || age > 90) { alert('Bitte gib ein Alter zwischen 18 und 90 ein.'); return; }
  if (!country) { alert('Bitte gib dein Herkunftsland ein.'); return; }
  if (!clubName) { alert('Bitte wähle einen Verein aus.'); return; }
  state.manager = { name, age, country };
  state.startLeagueIndex = leagueIndex;
  state.clubName = clubName;
  state.startSetup = { managerName: name, managerAge: age, managerCountry: country, leagueIndex, clubName };
  const ownRow = CURRENT_TABLE.find(r => r.own);
  if (ownRow) ownRow.club = clubName;
  state.scoutedLeagueIds = Array.from(new Set([...(state.scoutedLeagueIds || []), leagueIndex]));
  state.gameStarted = true;
  state.sponsor = null;
  render();
}
function startScreen() {
  const league = LEAGUES[Number(state.startSetup.leagueIndex)] || LEAGUES[10];
  return `<div class="appShell startShell">
    <header class="hero startHero">
      <div><p class="eyebrow">Neues Spiel</p><h1>Managerprofil erstellen</h1><p>Bevor die Saison startet, legst du deinen Manager an, wählst Liga und Verein. Danach beginnt das Spiel direkt mit der Sponsorenauswahl.</p></div>
    </header>
    <main>
      <section class="panel startPanel">
        <p class="eyebrow">Schritt 1</p>
        <h2>Deine Managerdaten</h2>
        <label class="fieldLabel">Name</label>
        <input id="managerName" class="textInput" value="${state.startSetup.managerName || ''}" placeholder="z. B. Lukas Weinguny">
        <div class="twoColFields">
          <div><label class="fieldLabel">Alter</label><input id="managerAge" class="textInput" type="number" min="18" max="90" value="${state.startSetup.managerAge || 35}"></div>
          <div><label class="fieldLabel">Herkunftsland</label><input id="managerCountry" class="textInput" value="${state.startSetup.managerCountry || 'Österreich'}"></div>
        </div>
      </section>
      <section class="panel startPanel">
        <p class="eyebrow">Schritt 2</p>
        <h2>Startliga & Verein</h2>
        <label class="fieldLabel">Liga</label>
        <select id="startLeague" onchange="setStartLeague(this.value)">${startLeagueOptions()}</select>
        <label class="fieldLabel">Verein</label>
        <select id="startClub">${startClubOptions()}</select>
        <div class="infoBox"><b>Ausgewählt:</b> ${league.country} · ${league.league}<br>Nach dem Start folgt verpflichtend die Sponsorenauswahl.</div>
        <button class="primary full" onclick="startGame()">Spiel starten</button>
      </section>
    </main>
  </div>`;
}
function dashboard() {
  return `<section class="grid">
    ${card('💶', 'Finanzen', euro(state.money), state.sponsor ? `Sponsor: ${state.sponsor.name}` : 'Sponsor noch wählen', "goTo('club','finances')")}
    ${card('📅', 'Nächstes Spiel', `${ownClubName()} - ${currentOpponentName()}`, `${formatGermanDate(nextMatchDate())} · Heimspiel`, "goTo('season','schedule')")}
    ${card('📆', 'Aktuelles Datum', formatGermanDate(currentGameDate()), 'heutiger Spieltag im Kalender', "goTo('season','calendar')")}
    ${card('🏆', 'Tabelle', 'Platz 7', '12 Punkte nach 7 Spielen', "goTo('season','table')")}
    ${card('⚽', 'Aufstellung', `${state.formation} · Ø ${lineupStrength()}`, `${lineupPenaltyCount()} Positionsprobleme`, "goTo('team','lineup')")}
  </section>`;
}
function subButton(id, label) {
  return `<button class="chip ${state.teamSection === id ? 'selected' : ''}" onclick="setTeamSection('${id}')">${label}</button>`;
}
function playerOption(player, selectedId, slotPos, disabled) {
  const selected = Number(selectedId) === player.id ? 'selected' : '';
  const locked = disabled && !selected ? 'disabled' : '';
  const eff = effectiveStrength(player, slotPos);
  return `<option value="${player.id}" ${selected} ${locked}>${player.name} · ${positionText(player)} · ${player.strength} → ${eff}</option>`;
}
function lineup() {
  const formationButtons = Object.keys(FORMATIONS).map(f => `<button class="chip ${state.formation === f ? 'selected' : ''}" onclick="setFormation('${f}')">${f}</button>`).join('');
  const available = state.players.filter(p => p.loan !== 'verliehen');
  const usedInOtherSlots = slotId => new Set(Object.entries(state.lineup).filter(([key]) => key !== slotId).map(([, id]) => Number(id)).filter(Boolean));
  const detailCards = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const loss = selectedPlayer ? selectedPlayer.strength - eff : 0;
    return `<button class="positionCard ${fit.className}" onclick="openLineupSlot('${slot.id}')">
      <div class="positionHeader"><span class="positionBadge">${slot.pos}</span><span class="fitTag ${fit.className}">${fit.label}</span></div>
      <strong>${selectedPlayer ? selectedPlayer.name : 'Spieler wählen'}</strong>
      <small>${selectedPlayer ? `${selectedPlayer.age} Jahre · ${stars(selectedPlayer.talent)} · Positionen: ${positionText(selectedPlayer)}` : 'Tippen, um diese Position zu besetzen'}</small>
      <div class="strengthLine">
        <span>Basis: <b>${selectedPlayer ? selectedPlayer.strength : '-'}</b></span>
        <span>Auf ${slot.pos}: <b>${selectedPlayer ? eff : '-'}</b></span>
        ${loss > 0 ? `<span class="loss">-${loss}</span>` : selectedPlayer ? `<span class="bonus">optimal</span>` : ''}
      </div>
    </button>`;
  }).join('');
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    return `<button class="fieldPlayer ${fit.className}" style="left:${slot.x}%; top:${slot.y}%;" onclick="openLineupSlot('${slot.id}')" aria-label="${slot.pos} bearbeiten">
      <span class="fieldPos">${slot.pos}</span>
      <strong>${name}</strong>
      <small>${selectedPlayer ? eff : '+'}</small>
    </button>`;
  }).join('');
  const benchCards = benchSlots().map(slot => {
    const player = state.players.find(p => p.id === Number((state.bench || {})[slot.id]));
    return `<button class="benchCard" onclick="openBenchSlot('${slot.id}')">
      <span class="benchNumber">Bank ${slot.index + 1}</span>
      <strong>${player ? player.name : 'Spieler wählen'}</strong>
      <small>${player ? `${positionText(player)} · Stärke ${player.strength} · ${stars(player.talent)}` : 'Antippen, um Ersatzspieler zu setzen'}</small>
    </button>`;
  }).join('');
  const modal = lineupSlotModal() + benchSlotModal();
  return `<section class="panel">
    <p class="eyebrow">Team · Aufstellung</p><h2>Formation wählen & Spieler platzieren</h2>
    <div class="chips">${formationButtons}</div>
    <div class="infoBox">Wähle eine Formation und tippe anschließend auf eine Position im Spielfeld. Darunter kannst du zusätzlich deine Ersatzbank besetzen. Spieler können nicht gleichzeitig in der Startelf und auf der Bank stehen.</div>
    <div class="lineupSummary">
      <span>Formation: <b>${state.formation}</b></span>
      <span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span>
      <span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span>
    </div>
    <div class="visualPitch" role="group" aria-label="Visuelle Aufstellung">
      <div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>
      ${markers}
    </div>
    <h3>Ersatzbank</h3>
    <div class="benchGrid">${benchCards}</div>
    <h3>Positionsdetails</h3>
    <div class="pitch detailPitch">${detailCards}</div>
    ${modal}
  </section>`;
}
function lineupSlotModal() {
  const slot = selectedSlot();
  if (!slot) return '';
  const currentId = Number(state.lineup[slot.id]);
  const used = new Set(Object.entries(state.lineup).filter(([key]) => key !== slot.id).map(([, id]) => Number(id)).filter(Boolean));
  const players = state.players
    .filter(p => p.loan !== 'verliehen' && (!used.has(p.id) || p.id === currentId))
    .map(p => ({ player: p, eff: effectiveStrength(p, slot.pos), fit: positionFit(p, slot.pos) }))
    .sort((a, b) => b.eff - a.eff);
  const choices = players.map(({ player, eff, fit }) => {
    const active = player.id === currentId ? 'activeChoice' : '';
    const loss = player.strength - eff;
    return `<button class="playerChoice ${active}" onclick="setLineupPlayerFromModal('${slot.id}', ${player.id})">
      <div><strong>${player.name}</strong><span>${positionText(player)} · ${player.age} Jahre · ${stars(player.talent)}</span></div>
      <div class="choiceRight"><b>${eff}</b><small>${fit.label}${loss > 0 ? ` · -${loss}` : ''}</small></div>
    </button>`;
  }).join('');
  return `<div class="lineupModalBackdrop" role="dialog" aria-modal="true">
    <div class="lineupModal">
      <div class="modalHeader">
        <div><p class="eyebrow">Aufstellung</p><h2>${slot.pos} besetzen</h2></div>
        <button class="ghost closeButton" onclick="closeLineupSlot()">Schließen</button>
      </div>
      <p class="modalIntro">Wähle den Spieler für diese Position. Spieler auf Haupt- oder Nebenpositionen behalten deutlich mehr Stärke als auf fremden Positionen.</p>
      <button class="playerChoice removeChoice" onclick="setLineupPlayerFromModal('${slot.id}', '')"><strong>Position leer lassen</strong><span>Keinen Spieler aufstellen</span></button>
      <div class="choiceList">${choices}</div>
    </div>
  </div>`;
}

function benchSlotModal() {
  const slot = selectedBenchSlot();
  if (!slot) return '';
  const currentId = Number((state.bench || {})[slot.id]);
  const used = usedPlayerIds(null, slot.id);
  const players = state.players
    .filter(p => p.loan !== 'verliehen' && (!used.has(p.id) || p.id === currentId))
    .map(p => ({ player: p, alreadyStarter: Object.values(state.lineup).map(Number).includes(p.id) }))
    .sort((a, b) => b.player.strength - a.player.strength);
  const choices = players.map(({ player }) => {
    const active = player.id === currentId ? 'activeChoice' : '';
    return `<button class="playerChoice ${active}" onclick="setBenchPlayerFromModal('${slot.id}', ${player.id})">
      <div><strong>${player.name}</strong><span>${positionText(player)} · ${player.age} Jahre · ${stars(player.talent)}</span></div>
      <div class="choiceRight"><b>${player.strength}</b><small>Grundstärke</small></div>
    </button>`;
  }).join('');
  return `<div class="lineupModalBackdrop" role="dialog" aria-modal="true">
    <div class="lineupModal">
      <div class="modalHeader">
        <div><p class="eyebrow">Ersatzbank</p><h2>Bankplatz ${slot.index + 1} besetzen</h2></div>
        <button class="ghost closeButton" onclick="closeBenchSlot()">Schließen</button>
      </div>
      <p class="modalIntro">Wähle einen Ersatzspieler. Wenn du einen aktuellen Startelfspieler auf die Bank setzt, wird seine Startelfposition frei.</p>
      <button class="playerChoice removeChoice" onclick="setBenchPlayerFromModal('${slot.id}', '')"><strong>Bankplatz leer lassen</strong><span>Keinen Ersatzspieler setzen</span></button>
      <div class="choiceList">${choices}</div>
    </div>
  </div>`;
}


function tacticsView() {
  const groups = Object.entries(TACTIC_OPTIONS).map(([key, group]) => {
    const buttons = Object.entries(group.options).map(([value, desc]) => `<button class="chip ${state.tactics[key] === value ? 'selected' : ''}" onclick="setTactic('${key}','${value}')">${value}</button>`).join('');
    return `<div class="tacticBlock"><h3>${group.label}</h3><div class="chips">${buttons}</div><p class="hint">${group.options[state.tactics[key]]}</p></div>`;
  }).join('');
  const mod = tacticModifier();
  const units = lineupUnitScores();
  const report = state.lastMatchReport ? `<div class="infoBox"><b>Letztes Spiel:</b> ${state.lastMatchReport.text} gegen ${state.lastMatchReport.opponent} (${state.lastMatchReport.score}). Taktikbonus ${state.lastMatchReport.tacticBonus >= 0 ? '+' : ''}${state.lastMatchReport.tacticBonus}, Fähigkeiten-Synergie ${state.lastMatchReport.skillSynergy >= 0 ? '+' : ''}${state.lastMatchReport.skillSynergy}, Positionsmalus -${state.lastMatchReport.positionPenalty}.</div>` : '<div class="infoBox">Noch kein Spiel mit dieser Taktik simuliert. Beim Klick auf „Nächste Kalenderwoche“ fließt die Taktik in die Spielsimulation ein.</div>';
  return `<section class="panel"><p class="eyebrow">Team · Taktik</p><h2>Mannschaftstaktik</h2><div class="infoBox">Die Simulation berücksichtigt jetzt Formation, effektive Startelf-Stärke, Positionsfehler und deine Taktik. Extreme Einstellungen bringen Chancen, erhöhen aber auch Risiko. Zusätzlich zählen jetzt Einzelwerte: Abschluss/Torriecher für Tore, Antizipation/Stellungsspiel/Zweikampf für Defensive, Passspiel/Übersicht/Technik für Kontrolle sowie Flanken/Schnelligkeit für Flügelspiel.</div>${groups}<div class="grid compact">${card('⚔️','Angriff',`${mod.attack >= 0 ? '+' : ''}${mod.attack}`,'Einfluss auf eigene Tore')}${card('🛡️','Defensive',`${mod.defense >= 0 ? '+' : ''}${mod.defense}`,'Einfluss auf Gegentore')}${card('🎛️','Kontrolle',`${mod.control >= 0 ? '+' : ''}${mod.control}`,'Stabilität im Spiel')}${card('🎲','Risiko',`${mod.risk >= 0 ? '+' : ''}${mod.risk}`,'Schwankung in der Simulation')}${card('🧬','Fähigkeiten',`${mod.skillSynergy >= 0 ? '+' : ''}${mod.skillSynergy}`,'passt die Taktik zum Kader?')}${card('📊','Kaderprofil',`Off ${units.attack} · Def ${units.defense}`,`Kontrolle ${units.control} · Flügel ${units.wings}`)}</div><p class="hint"><b>Aktuell:</b> ${tacticSummaryText()}</p>${report}</section>`;
}
function contractBar(years) {
  const y = Math.max(0, Math.min(5, Number(years || 0)));
  return `<div class="contractVisual"><div class="contractScale"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5 J.</span></div><div class="bar contractBar"><div style="width:${(y / 5) * 100}%"></div></div></div>`;
}
function contractView() {
  const dir = state.contractSort || 'asc';
  const sorted = [...state.players].sort((a,b)=>{
    const byYears = (a.contractYears||0)-(b.contractYears||0);
    return (dir === 'asc' ? byYears : -byYears) || playerSatisfaction(a)-playerSatisfaction(b) || b.strength-a.strength;
  });
  const players = sorted.map(player => {
    const status = contractWillingness(player);
    const expireText = player.contractYears <= 1 ? 'läuft bald aus' : `${player.contractYears} Jahre Restlaufzeit`;
    const retirement = plansRetirementAfterContract(player) ? '<span>Karriereende möglich</span>' : '';
    return `<div class="player contractPlayer"><div class="playerTop"><strong>${player.name}</strong><span>${positionText(player)} · ${player.age} Jahre</span></div>${contractBar(player.contractYears)}<div class="meta"><span>Vertrag: ${expireText}</span><span>Gehalt ${euro(player.salary || 0)}</span><span>Zufriedenheit: ${playerSatisfaction(player)}/100 · ${satisfactionLabel(player)}</span><span>${player.noPlayWeeks || 0} Wochen ohne Einsatz</span><span>${status.reason}</span>${retirement}</div><div class="playerActions"><button class="primary" ${status.ok ? '' : 'disabled'} onclick="openContractExtension(${player.id})">Vertrag verlängern</button><button class="ghost dangerButton" onclick="releasePlayerContract(${player.id})">Vertrag auflösen</button></div></div>`;
  }).join('');
  const free = state.transferFreeAgents.length ? state.transferFreeAgents.map(p => `<div class="league"><strong>${p.name}</strong><span>${positionText(p)} · ablösefrei nach Vertragsende</span></div>`).join('') : '<div class="infoBox">Noch keine ablösefreien Spieler auf der Transferliste.</div>';
  return `<section class="panel"><p class="eyebrow">Team · Vertragsansicht</p><h2>Verträge & Laufzeiten</h2><div class="infoBox">Verträge sind maximal 5 Jahre lang. Spieler mit langer Restlaufzeit möchten meist noch nicht neu verhandeln. Ältere Spieler ab 34 können das Karriereende nach Vertragsablauf planen. Unglückliche Spieler ohne Einsätze verlängern nicht — durch Spielzeit kann ihre Zufriedenheit wieder steigen.</div><div class="sectionHeader"><h3>Sortierung</h3><select onchange="setContractSort(this.value)"><option value="asc" ${dir==='asc'?'selected':''}>Vertragslänge aufsteigend</option><option value="desc" ${dir==='desc'?'selected':''}>Vertragslänge absteigend</option></select></div><div class="playerList">${players}</div><h3>Ablösefreie Transferliste</h3><div class="leagueList">${free}</div>${contractNegotiationModal()}</section>`;
}
function contractNegotiationModal() {
  const neg = state.contractNegotiation;
  if (!neg) return '';
  const player = state.players.find(p => p.id === Number(neg.playerId));
  if (!player) return '';
  const demand = contractDemand(player);
  const annualCost = Number(state.contractOffer.salary || 0) * 12;
  const totalCommitment = annualCost * Number(state.contractOffer.years || 1) + Number(state.contractOffer.bonus || 0);
  return `<div class="lineupModalBackdrop" role="dialog" aria-modal="true"><div class="lineupModal"><div class="modalHeader"><div><p class="eyebrow">Vertragsverlängerung · Runde ${neg.round}/3</p><h2>${player.name}</h2></div><button class="ghost closeButton" onclick="closeContractNegotiation()">Schließen</button></div><div class="grid compact"><article class="card"><p>Aktuelles Budget</p><h2>${euro(state.money)}</h2><span>verfügbarer Kontostand</span></article><article class="card"><p>Dieses Angebot</p><h2>${euro(totalCommitment)}</h2><span>${euro(annualCost)} pro Jahr + ${euro(state.contractOffer.bonus || 0)} Bonus</span></article></div><div class="infoBox">Spielerwunsch grob: ${demand.years} Jahre, Gehalt ca. ${euro(demand.salary)}, Bonus ca. ${euro(demand.bonus)}. Maximal möglich sind 5 Jahre. Zufriedenheit: ${playerSatisfaction(player)}/100 · ${satisfactionLabel(player)}. Geduld: ${neg.patience}/3.</div><label class="fieldLabel">Vertragsdauer</label><select onchange="setContractOfferField('years', this.value)">${[1,2,3,4,5].map(y=>`<option value="${y}" ${state.contractOffer.years==y?'selected':''}>${y} Jahre</option>`).join('')}</select><label class="fieldLabel">Gehalt pro Monat</label><input type="number" value="${state.contractOffer.salary}" step="1000" onchange="setContractOfferField('salary', this.value)" /><label class="fieldLabel">Unterschriftsbonus</label><input type="number" value="${state.contractOffer.bonus}" step="5000" onchange="setContractOfferField('bonus', this.value)" /><div class="modalActions"><button class="ghost full" onclick="closeContractNegotiation()">Abbrechen</button><button class="primary full" onclick="submitContractOffer()">Angebot abgeben</button></div></div></div>`;
}

function training() {
  const dir = state.trainingSort || 'desc';
  const players = [...state.players].sort((a, b) => {
    const byProgress = (Number(a.progress || 0) - Number(b.progress || 0));
    return (dir === 'asc' ? byProgress : -byProgress) || b.strength - a.strength;
  });
  const boostedId = boostedPlayerIdThisMonth();
  const boostInfo = boostedId ? state.players.find(p => p.id === boostedId) : null;
  const list = players.map(player => {
    const isBoosted = boostedId === player.id;
    const boostAvailable = !boostedId;
    const cost = trainingBoostCost(player);
    return `<div class="player">
      <div class="playerTop"><strong>${player.name}</strong><span>${positionText(player)} · ${player.age} Jahre</span></div>
      <div class="meta"><span>Stärke ${player.strength}/100</span><span class="stars">${stars(player.talent)}</span><span>Trainingsfortschritt ${player.progress}%</span><span>Note ${player.rating.toFixed(1)}</span><span>${player.minutes} Min.</span>${isBoosted ? '<span>Monatsboost aktiv</span>' : ''}</div>
      <div class="bar"><div style="width:${player.progress}%"></div></div>
      <div class="playerBottom"><span>${player.progress}% bis Stärke ${Math.min(100, player.strength + 1)}</span><span>voraussichtlich +${calcDevelopment(player, state.trainingFocus)}% Fortschritt</span></div>
      <div class="playerActions"><button class="ghost" onclick="toggleLoan(${player.id})">${player.loan === 'verliehen' ? 'Leihe zurückholen' : 'Spieler verleihen'}</button><button class="primary" ${boostAvailable ? '' : 'disabled'} onclick="giveTrainingBoost(${player.id})">Monatsboost · ${euro(cost)}</button></div>
    </div>`;
  }).join('');
  return `<section class="panel">
    <div class="sectionHeader">
      <div><p class="eyebrow">Team · Training</p><h2>Trainingsübersicht</h2></div>
      <select onchange="setTrainingSort(this.value)">
        <option value="desc" ${dir === 'desc' ? 'selected' : ''}>Fortschritt absteigend</option>
        <option value="asc" ${dir === 'asc' ? 'selected' : ''}>Fortschritt aufsteigend</option>
      </select>
    </div>
    <div class="infoBox">Hier siehst du nur den Entwicklungsstand deiner Spieler. Es gibt keine Auswahl zwischen Technik, Angriff oder Verteidigung mehr. Die Entwicklung entsteht aus Training, Spielzeit, Note, Talent, Alter, Jugendbonus und Infrastruktur.${boostInfo ? `<br><b>Aktueller Monatsboost:</b> ${boostInfo.name} bis Monatsende.` : '<br><b>Monatsboost:</b> Noch verfügbar. Einmal pro Monat kann genau ein Spieler einen bezahlten kleinen Entwicklungsbonus erhalten.'}</div>
    <div class="playerList">${list}</div>
  </section>`;
}
function youth() {
  const youthPlayers = state.academyPlayers.map(p => {
    const canSign = p.age >= 16;
    return `<div class="player">
      <div class="playerTop"><strong>${p.name}</strong><span>${positionText(p)} · ${p.age} Jahre</span></div>
      <div class="meta"><span>Stärke ${p.strength}/100</span><span class="stars">${stars(p.talent)}</span><span>${p.progress}% bis nächste Stufe</span><span>${canSign ? 'vertragfähig' : 'noch zu jung'}</span></div>
      <div class="bar"><div style="width:${p.progress}%"></div></div>
      <div class="playerActions">
        <button class="ghost" ${canSign ? '' : 'disabled'} onclick="offerYouthContract(${p.id})">Vertrag anbieten</button>
        <button class="ghost dangerButton" onclick="releaseYouthPlayer(${p.id})">Aus Verein werfen</button>
      </div>
    </div>`;
  }).join('');
  return `<section class="panel">
    <p class="eyebrow">Team · Jugend</p>
    <h2>Jugendspieler in der Akademie</h2>
    <div class="infoBox">Hier siehst du Spieler, die noch nicht im Profikader sind. Ab 16 Jahren kannst du ihnen einen Vertrag anbieten. Zu schwache Spieler kannst du aus dem Verein werfen.</div>
    <div class="playerList">${youthPlayers || '<div class="infoBox">Derzeit sind keine Jugendspieler in der Akademie.</div>'}</div>
  </section>`;
}
function generalTeam() {
  return `<section class="panel"><p class="eyebrow">Team · Allgemeines</p><h2>Kaderübersicht</h2><div class="grid compact">
    ${card('👥', 'Kadergröße', `${state.players.length} Spieler`, `${state.academyPlayers.length} Akademiespieler`)}
    ${card('⚽', 'Teamstärke', `Ø ${avgStrength()}/100`, `Startelf Ø ${lineupStrength()}/100`)}
    ${card('🔁', 'Leihen', `${state.players.filter(p => p.loan === 'verliehen').length} verliehen`, 'Verliehene Spieler sind nicht aufstellbar')}
    ${card('⭐', 'Talente', `${state.players.filter(p => p.talent >= 4).length} im Kader · ${state.academyPlayers.filter(p => p.talent >= 4).length} in Akademie`, 'Talent 4 oder 5 Sterne')}
  </div></section>`;
}
function team() {
  const content = state.teamSection === 'lineup' ? lineup() : state.teamSection === 'tactics' ? tacticsView() : state.teamSection === 'training' ? training() : state.teamSection === 'contracts' ? contractView() : state.teamSection === 'youth' ? youth() : generalTeam();
  return `<section class="teamSubnav"><div class="chips">
    ${subButton('lineup', 'Aufstellung')}
    ${subButton('tactics', 'Taktik')}
    ${subButton('training', 'Training')}
    ${subButton('contracts', 'Vertragsansicht')}
    ${subButton('youth', 'Jugend')}
    ${subButton('general', 'Allgemeines')}
  </div></section>${content}`;
}
function marketSubButton(id, label) {
  return `<button class="chip ${state.marketSection === id ? 'selected' : ''}" onclick="setMarketSection('${id}')">${label}</button>`;
}
function availabilityLabel(p) {
  const chance = p.freeAgent ? transferInterest(p, p.club, p.leagueIndex) : clamp(transferInterest(p, p.club, p.leagueIndex) + 18 + (p.age >= 30 ? 8 : 0) + (p.contractYears <= 1 ? 8 : 0), 0, 100);
  if (chance >= 60) return { text: 'verfügbar', cls: 'positive' };
  if (chance >= 35) return { text: 'schwierig', cls: 'warning' };
  return { text: 'nicht verfügbar', cls: 'negative' };
}
function marketPlayerRow(p, options = {}) {
  const known = isPlayerKnown(p) || p.freeAgent;
  const price = options.transferList ? transferListPrice(p) : null;
  const meta = known ? knownPlayerMeta(p) : unknownPlayerMeta(p, !!options.transferList);
  const listHint = options.transferList ? `<span>${p.freeAgent ? 'Ablösefrei' : 'Transferliste'} · ${transferListReason(p)}</span><span>${p.freeAgent ? 'Preis: 0 €' : `Preis: ${euro(price)}`}</span>` : '';
  const scoutStatus = !known ? scoutingJobStatusText('player', { playerId: p.id }) : '';
  const offerButton = options.transferList
    ? `<button class="primary" onclick="buyTransferListedPlayer('${p.id}', '${p.club}', ${p.leagueIndex})">${p.freeAgent ? 'Verpflichten' : 'Kaufen'}</button>`
    : known ? `<button class="primary" onclick="makeContractOffer('${p.id}', '${p.club}', ${p.leagueIndex})">Vertragsangebot</button>` : `<button class="primary" onclick="scoutPlayer('${p.id}', '${p.club}', ${p.leagueIndex})">Spieler scouten</button>`;
  return `<div class="player"><div class="playerTop"><strong>${p.name}</strong><span>${positionText(p)} · ${p.age} Jahre</span></div><div class="meta"><span>${p.club}</span>${meta}${listHint}${scoutStatus ? `<span>${scoutStatus}</span>` : ''}</div><div class="playerActions"><button class="ghost" onclick="openPlayerProfile('${p.id}', '${p.club}', ${p.leagueIndex})">Spieler öffnen</button>${watchlistHas(p.id) ? '<button class="ghost" disabled>Auf Beobachtungsliste</button>' : `<button class="ghost" onclick="addToWatchlist('${p.id}', '${p.club}', ${p.leagueIndex})">Beobachten</button>`}${offerButton}</div></div>`;
}
function transferListTableRow(p) {
  const known = isPlayerKnown(p) || p.freeAgent;
  const price = transferListPrice(p);
  const availability = availabilityLabel(p);
  const marketValue = known ? euro(p.marketValue) : `Schätzung ${euro(p.marketValue)}`;
  const scoutStatus = !known ? scoutingJobStatusText('player', { playerId: p.id }) : '';
  return `<tr class="clickableRow" onclick="openPlayerProfile('${p.id}', '${p.club}', ${p.leagueIndex})"><td><strong>${p.name}</strong>${scoutStatus ? `<br><small>${scoutStatus}</small>` : ''}</td><td>${p.club}</td><td>${p.age}</td><td>${p.nationality || 'International'}</td><td>${positionText(p)}</td><td><strong>${p.strength}/100</strong></td><td>${marketValue}</td><td>${p.club}</td><td>${p.freeAgent ? '0 €' : euro(price)}</td><td><span class="statusPill ${availability.cls}">${availability.text}</span></td></tr>`;
}
function transferListView() {
  const rows = transferListedPlayers().map(transferListTableRow).join('');
  return `<section class="panel widePanel"><p class="eyebrow">Markt · Transferliste</p><h2>Transferliste</h2><div class="infoBox">Hier stehen Spieler, die Vereine aktiv abgeben möchten oder die ablösefrei verfügbar sind. Die Gesamtstärke ist auf der Transferliste immer sichtbar. Die einzelnen Fähigkeiten bleiben aber verborgen, bis du den Spieler, Verein oder die Liga scoutest. In der Spalte „verfügbar“ siehst du sofort, ob der Spieler realistisch zu deinem Verein wechseln möchte.</div><div class="tableWrap"><table><thead><tr><th>Name</th><th>Verein</th><th>Alter</th><th>Nationalität</th><th>Position</th><th>Stärke</th><th>Marktwert</th><th>Derzeitiger Verein</th><th>Preis</th><th>Verfügbar</th></tr></thead><tbody>${rows || '<tr><td colspan="10">Aktuell keine Spieler auf der Transferliste.</td></tr>'}</tbody></table></div></section>`;
}
function playerSearchView() {
  const f = state.marketSearch;
  const positions = ['Alle','TW','RV','IV','LV','DM','ZM','OM','RM','LM','RA','LA','ST'];
  const results = marketSearchResults().map(p => marketPlayerRow(p)).join('');
  const saved = (state.savedMarketSearches || []).map((entry, index) => `<div class="financeRow"><span>${entry.label}</span><strong><button class="ghost smallButton" onclick="loadMarketSearch(${index})">Laden</button> <button class="ghost smallButton" onclick="deleteMarketSearch(${index})">Löschen</button></strong></div>`).join('');
  return `<section class="panel"><p class="eyebrow">Markt · Spielersuche</p><h2>Spielersuche</h2><div class="infoBox">Durchsuche Spieler aller Vereine und Ligen. Bei nicht gescouteten Spielern sind Stärke, Talent, Marktwert und Vertrag verdeckt. Stärke-/Talent-/Wertfilter greifen nur bei bekannten Spielern.</div><div class="searchGrid"><label class="fieldLabel">Name<input value="${f.name}" oninput="setMarketSearchField('name', this.value)" placeholder="Spielername" /></label><label class="fieldLabel">Position<select onchange="setMarketSearchField('position', this.value)">${positions.map(pos => `<option ${f.position === pos ? 'selected' : ''}>${pos}</option>`).join('')}</select></label><label class="fieldLabel">Max. Alter<input type="number" value="${f.maxAge}" oninput="setMarketSearchField('maxAge', this.value)" placeholder="z.B. 24" /></label><label class="fieldLabel">Min. Stärke<input type="number" value="${f.minStrength}" oninput="setMarketSearchField('minStrength', this.value)" placeholder="z.B. 60" /></label><label class="fieldLabel">Min. Talent<input type="number" value="${f.minTalent}" min="1" max="5" oninput="setMarketSearchField('minTalent', this.value)" placeholder="1-5" /></label><label class="fieldLabel">Min. Marktwert<input type="number" value="${f.minValue}" oninput="setMarketSearchField('minValue', this.value)" placeholder="z.B. 100000" /></label><label class="fieldLabel">Max. Marktwert<input type="number" value="${f.maxValue}" oninput="setMarketSearchField('maxValue', this.value)" placeholder="z.B. 500000" /></label></div><div class="playerActions"><button class="primary" onclick="saveMarketSearch()">Filter speichern</button><button class="ghost" onclick="clearMarketSearch()">Filter zurücksetzen</button></div>${saved ? `<h3>Gespeicherte Filter</h3><div class="financeGrid">${saved}</div>` : ''}<h3>Suchergebnisse</h3><div class="playerList">${results || '<div class="infoBox">Keine passenden Spieler gefunden.</div>'}</div></section>`;
}
function watchlistView() {
  const list = state.watchlist.map(p => marketPlayerRow(p)).join('');
  return `<section class="panel"><p class="eyebrow">Markt · Beobachtungsliste</p><h2>Beobachtungsliste</h2><div class="infoBox">Spieler, die du aus fremden Kadern, der Suche oder der Transferliste markierst, landen hier und bleiben gegenverlinkt. Spieler aus nicht gescouteten Ligen bleiben teilweise verdeckt.</div><div class="playerList">${list || '<div class="infoBox">Noch keine Spieler auf der Beobachtungsliste.</div>'}</div></section>`;
}
function loansView() {
  const outgoing = state.players.filter(p => p.loan === 'verliehen');
  const incoming = state.players.filter(p => p.loan === 'geliehen');
  const outgoingRows = outgoing.map(p => `<div class="player"><div class="playerTop"><strong>${p.name}</strong><span>${positionText(p)} · ${p.age} Jahre</span></div><div class="meta"><span>${loanStatusText(p)}</span><span>Stärke ${p.strength}/100</span><span>${stars(p.talent)}</span></div><div class="playerActions"><button class="ghost" onclick="toggleLoan(${p.id})">Leihe zurückholen</button></div></div>`).join('');
  const incomingRows = incoming.map(p => `<div class="player"><div class="playerTop"><strong>${p.name}</strong><span>${positionText(p)} · ${p.age} Jahre</span></div><div class="meta"><span>${loanStatusText(p)}</span><span>Stärke ${p.strength}/100</span><span>${stars(p.talent)}</span></div></div>`).join('');
  return `<section class="panel"><p class="eyebrow">Markt · Leihen</p><h2>Leihübersicht</h2><div class="infoBox">Hier siehst du Spieler, die du verliehen hast oder selbst geliehen hast. Verliehene Spieler sind nicht aufstellbar und entwickeln sich am Saisonende über ihre Einsatzzeiten beim Leihverein.</div><h3>Von dir verliehen</h3><div class="playerList">${outgoingRows || '<div class="infoBox">Aktuell hast du keinen Spieler verliehen.</div>'}</div><h3>Von dir geliehen</h3><div class="playerList">${incomingRows || '<div class="infoBox">Aktuell hast du keinen Spieler geliehen.</div>'}</div></section>`;
}
function marketOverview() {
  const tlCount = transferListedPlayers().length;
  return `<section class="panel"><p class="eyebrow">Transfermarkt</p><h2>Transfers, Suche, Leihen und Beobachtung</h2><div class="grid compact">${card('📋', 'Transferliste', `${tlCount} Spieler`, 'leichter und oft günstiger kaufbar', "setMarketSection('transferlist')")}${card('🔎', 'Spielersuche', 'Filter bereit', 'alle Vereine und Ligen durchsuchen', "setMarketSection('search')")}${card('⭐', 'Beobachtungsliste', `${state.watchlist.length} Spieler`, 'gespeicherte Kandidaten', "setMarketSection('watchlist')")}${card('🔁', 'Leihen', `${state.players.filter(p => p.loan === 'verliehen').length} verliehen`, 'geliehene und verliehene Spieler', "setMarketSection('loans')")}</div></section>`;
}
function market() {
  const content = state.marketSection === 'transferlist' ? transferListView() : state.marketSection === 'search' ? playerSearchView() : state.marketSection === 'watchlist' ? watchlistView() : state.marketSection === 'loans' ? loansView() : marketOverview();
  return `<section class="teamSubnav"><div class="chips">${marketSubButton('overview', 'Übersicht')}${marketSubButton('transferlist', 'Transferliste')}${marketSubButton('search', 'Spielersuche')}${marketSubButton('watchlist', 'Beobachtungsliste')}${marketSubButton('loans', 'Leihen')}</div></section>${content}`;
}
function scoutingOverview() {
  const selectable = LEAGUES.map((l, index) => `<option value="${index}" ${state.scoutingLeagueIndex === index ? 'selected' : ''}>${l.league} · ${l.country}</option>`).join('');
  const idx = Number(state.scoutingLeagueIndex);
  const league = LEAGUES[idx];
  const leagueKnown = isLeagueScouted(idx);
  const clubs = makeLeagueClubs(idx).map(club => {
    const known = isClubScouted(club, idx);
    const status = scoutingJobStatusText('club', { clubName: club, leagueIndex: idx });
    return `<div class="league scoutingClub ${known ? 'scouted' : ''}"><strong>${club}</strong><span>${known ? 'gescoutet · Spielerwerte sichtbar' : status || 'nicht gescoutet · Spielerwerte verdeckt'}</span><div class="playerActions"><button class="ghost" onclick="openClubRoster('${club}', ${idx})">Kader ansehen</button><button class="primary" ${known || status ? 'disabled' : ''} onclick="scoutClub('${club}', ${idx})">${status ? 'Scouting läuft' : `Verein scouten · ${euro(scoutClubCost(club, idx))}`}</button></div></div>`;
  }).join('');
  const jobs = (state.scoutingJobs || []).map(job => `<div class="financeRow"><span>${job.label}</span><strong>${job.remainingDays} Tage</strong></div>`).join('');
  return `<section class="panel"><p class="eyebrow">Scouting</p><h2>Andere Ligen & Vereine scouten</h2><div class="infoBox">Spieler aus deiner eigenen Liga kennst du bereits. Einen Spieler zu scouten dauert 3 Tage. Einen ganzen Verein mit allen Spielern zu scouten dauert 1 Monat. Stärke, Talent, Marktwert und Vertragsdaten werden erst nach Abschluss sichtbar.</div>${jobs ? `<h3>Laufende Scouting-Aufträge</h3><div class="financeGrid">${jobs}</div>` : ''}<label class="fieldLabel">Liga auswählen</label><select onchange="setScoutingLeague(this.value)">${selectable}</select><div class="scoutSummary"><article class="card"><p>Ausgewählte Liga</p><h2>${league.league}</h2><span>${league.country} · ${league.clubs} Vereine</span></article><article class="card"><p>Status</p><h2>${leagueKnown ? 'Gesichtet' : 'Verdeckt'}</h2><span>${leagueKnown ? 'Alle Spielerwerte sichtbar' : 'Nur Grundinfos sichtbar'}</span></article></div><button class="primary full" ${leagueKnown ? 'disabled' : ''} onclick="scoutLeague(${idx})">Ganze Liga scouten · ${euro(scoutLeagueCost(idx))}</button><h3>Vereine</h3><div class="leagueList">${clubs}</div></section>`;
}
function scoutedPlayersView() {
  pruneScoutedPlayerHistory();
  const items = (state.scoutedPlayerHistory || []).map(entry => {
    const remainingDays = Math.max(0, entry.expiresDay - currentDayIndex());
    const player = getClubRoster(entry.club, entry.leagueIndex).find(p => String(p.id) === String(entry.id)) || entry;
    return `<div class="player"><div class="playerTop"><strong>${entry.name}</strong><span>${positionText(player)} · ${entry.age} Jahre · ${entry.nationality}</span></div><div class="meta"><span>${entry.club}</span><span>gescoutet am ${entry.scoutedDate}</span><span>noch ${remainingDays} Tage in dieser Liste</span>${knownPlayerMeta(player)}</div><div class="playerActions"><button class="ghost" onclick="openPlayerProfile('${entry.id}', '${entry.club}', ${entry.leagueIndex})">Spieler öffnen</button>${watchlistHas(entry.id) ? '<button class="ghost" disabled>Auf Beobachtungsliste</button>' : `<button class="ghost" onclick="addToWatchlist('${entry.id}', '${entry.club}', ${entry.leagueIndex})">Beobachten</button>`}</div></div>`;
  }).join('');
  return `<section class="panel"><p class="eyebrow">Scouting · Gescoutete Spieler</p><h2>Gescoutete Spieler</h2><div class="infoBox">Hier erscheinen abgeschlossene Scouting-Ergebnisse in chronologischer Reihenfolge. Nach 3 Monaten verschwinden Spieler aus dieser Übersicht. Ein einmal gescouteter Spieler bleibt aber dauerhaft bekannt — seine Werte bleiben auch später sichtbar, wenn er sich entwickelt oder abbaut.</div><div class="playerList">${items || '<div class="infoBox">Noch keine abgeschlossenen Spieler-Scoutings.</div>'}</div></section>`;
}
function scouting() {
  const content = state.scoutingSection === 'scoutedPlayers' ? scoutedPlayersView() : scoutingOverview();
  return `<section class="teamSubnav"><div class="chips">${scoutingSubButton('overview', 'Scouting')}${scoutingSubButton('scoutedPlayers', 'Gescoutete Spieler')}</div></section>${content}`;
}

function clubSubButton(id, label) {
  return `<button class="chip ${state.clubSection === id ? 'selected' : ''}" onclick="setClubSection('${id}')">${label}</button>`;
}
function financeRow(label, value, type = '') {
  return `<div class="financeRow ${type}"><span>${label}</span><strong>${euro(value)}</strong></div>`;
}
function sponsorChoice() {
  if (state.sponsor) {
    return `<div class="sponsorActive">
      <p class="eyebrow">Aktueller Sponsor</p>
      <h3>${state.sponsor.name}</h3>
      <p>${state.sponsor.description}</p>
      <div class="financeGrid">
        ${financeRow('Fixbetrag Saisonstart', state.sponsor.base, 'positive')}
        ${financeRow('Bonus pro Punkt', state.sponsor.perPoint, 'positive')}
        ${financeRow('Bonus pro Sieg', state.sponsor.winBonus, 'positive')}
        ${financeRow('Titelbonus', state.sponsor.titleBonus, 'positive')}
        ${financeRow('Europacup-Bonus', state.sponsor.europeanBonus, 'positive')}
        ${financeRow('Bisher verdient durch Punkte/Siege', sponsorCurrentBonus(), 'positive')}
      </div>
      <div class="infoBox">Sponsorverträge laufen immer nur 1 Jahr. Zu Beginn der nächsten Saison musst du wieder zwischen neuen Angeboten wählen.</div>
    </div>`;
  }
  const offers = state.sponsorOffers.map(offer => `<article class="sponsorCard">
    <div><p class="eyebrow">${offer.style}</p><h3>${offer.name}</h3><p>${offer.description}</p></div>
    <div class="financeGrid">
      ${financeRow('Fixbetrag', offer.base, 'positive')}
      ${financeRow('pro Punkt', offer.perPoint, 'positive')}
      ${financeRow('pro Sieg', offer.winBonus, 'positive')}
      ${financeRow('Titelbonus', offer.titleBonus, 'positive')}
      ${financeRow('Europacup', offer.europeanBonus, 'positive')}
      ${financeRow('vorsichtige Prognose', sponsorForecast(offer), 'positive')}
    </div>
    <button class="primary full" onclick="selectSponsor('${offer.id}')">Sponsor wählen</button>
  </article>`).join('');
  return `<div class="infoBox"><b>Saisonstart:</b> Bitte Sponsor wählen. Sicherer Sponsor = hoher Grundbetrag. Risiko-Sponsor = niedriger Grundbetrag, aber sehr hohe Boni bei Punkten, Siegen, Titeln und internationalen Erfolgen.</div><div class="sponsorList">${offers}</div>`;
}
function finances() {
  const net = totalIncome() - totalExpenses();
  return `<section class="panel">
    <p class="eyebrow">Verein · Finanzen</p><h2>Finanzübersicht</h2>
    <div class="grid compact">
      ${card('💶', 'Kontostand', euro(state.money), 'aktueller Vereinsstand')}
      ${card('📈', 'Einnahmen Saison', euro(totalIncome()), 'inkl. Sponsorboni')}
      ${card('📉', 'Ausgaben Saison', euro(totalExpenses()), 'Gehälter, Staff, Jugend, Transfers')}
      ${card(net >= 0 ? '✅' : '⚠️', 'Saldo Saison', euro(net), net >= 0 ? 'positiver Zwischenstand' : 'Achtung: negativer Verlauf')}
    </div>
    <h3>Einnahmen</h3>
    <div class="financeGrid">
      ${financeRow('Transfers', state.finance.incomeTransfers, 'positive')}
      ${financeRow('Infrastruktur / Stadion / Tickets', state.finance.incomeInfrastructure, 'positive')}
      ${financeRow('Sponsoren Fixbetrag', state.finance.incomeSponsors, 'positive')}
      ${financeRow('Sponsoren Punkte- & Siegboni', sponsorCurrentBonus(), 'positive')}
      ${financeRow('Preisgelder / Titel', state.finance.incomePrizeMoney, 'positive')}
      ${financeRow('Merchandising', state.finance.incomeMerchandising, 'positive')}
    </div>
    <h3>Ausgaben</h3>
    <div class="financeGrid">
      ${financeRow('Transfers', state.finance.expenseTransfers, 'negative')}
      ${financeRow('Infrastruktur-Ausbau', state.finance.expenseInfrastructure, 'negative')}
      ${financeRow('Spielergehälter', state.finance.expenseSalaries, 'negative')}
      ${financeRow('Mitarbeiter / Trainerstab', state.finance.expenseStaff, 'negative')}
      ${financeRow('Scouting', state.finance.expenseScouting, 'negative')}
      ${financeRow('Trainingsboosts', state.finance.expenseTrainingBoost || 0, 'negative')}
      ${financeRow('Nachwuchs / Akademie', state.finance.expenseYouth, 'negative')}
    </div>
    <h3>Sponsorvertrag</h3>
    ${sponsorChoice()}
  </section>`;
}
function imageView() {
  const national = state.clubImage.national;
  const international = state.clubImage.international;
  const total = ownCombinedImage();
  return `<section class="panel"><p class="eyebrow">Verein · Image</p><h2>Vereinsimage</h2><div class="infoBox">Das Image beeinflusst, welche Spieler realistisch zu deinem Verein wechseln wollen. Prime-Spieler von Vereinen mit hohem Image lehnen kleinere Vereine oft ab. Ältere Spieler oder Spieler mit kurzer Vertragslaufzeit sind eher erreichbar.</div><div class="grid compact">${card('🏠', 'Nationales Image', `${national}/100`, imageLabel(national))}${card('🌍', 'Internationales Image', `${international}/100`, imageLabel(international))}${card('⭐', 'Gesamtimage', `${total}/100`, 'wird für Transfers verwendet')}${card('🏆', 'Aktueller Trend', getOwnTablePosition() <= 4 ? 'steigend' : getOwnTablePosition() >= 10 ? 'fallend' : 'stabil', `Tabellenplatz ${getOwnTablePosition()}`)}</div><h3>Wie sich Image verändert</h3><div class="financeGrid"><div class="financeRow positive"><span>Meistertitel</span><strong>starker Imagegewinn</strong></div><div class="financeRow positive"><span>Pokalsieg</span><strong>mittlerer Imagegewinn</strong></div><div class="financeRow positive"><span>Internationaler Erfolg</span><strong>starkes internationales Wachstum</strong></div><div class="financeRow negative"><span>Schlechte Jahre</span><strong>langsamer Imageverlust</strong></div></div><h3>Prototyp-Test</h3><div class="playerActions"><button class="ghost" onclick="awardTitleImageBoost('league')">Meistertitel simulieren</button><button class="ghost" onclick="awardTitleImageBoost('cup')">Pokalsieg simulieren</button><button class="ghost" onclick="awardTitleImageBoost('europe')">Europacup-Erfolg simulieren</button></div></section>`;
}
function club() {
  const content = state.clubSection === 'image' ? imageView() : finances();
  return `<section class="teamSubnav"><div class="chips">
    ${clubSubButton('finances', 'Finanzen')}
    ${clubSubButton('image', 'Image')}
  </div></section>${content}`;
}
function environmentSubButton(id, label) {
  return `<button class="chip ${state.environmentSection === id ? 'selected' : ''}" onclick="setEnvironmentSection('${id}')">${label}</button>`;
}
function facilityOverviewCard(type) {
  const f = state.facilities[type];
  const cfg = facilityConfig(type);
  const value = type === 'stadium' ? `${f.capacity.toLocaleString('de-AT')} Plätze` : `Level ${f.level}`;
  return card(f.icon, cfg.label, value, upgradeStatus(type), `goTo('environment','${type}')`);
}
function environmentOverview() {
  return `<section class="panel">
    <p class="eyebrow">Stadion/Umfeld</p><h2>Stadion & Infrastruktur</h2>
    <div class="infoBox">Alle Ausbauten dauern mehrere Kalenderwochen. Je höher die Stufe, desto teurer und länger wird der nächste Ausbau. Stufe 15 ist das Maximum.</div>
    <div class="grid compact">
      ${facilityOverviewCard('stadium')}
      ${facilityOverviewCard('training')}
      ${facilityOverviewCard('academy')}
      ${facilityOverviewCard('youthCenter')}
      ${facilityOverviewCard('medical')}
    </div>
  </section>`;
}
function facilityDetail(type) {
  const f = state.facilities[type];
  const cfg = facilityConfig(type);
  const isMax = f.level >= f.maxLevel;
  const inProgress = Boolean(f.construction);
  const nextWeeks = isMax ? 0 : upgradeWeeks(type);
  const nextCost = isMax ? 0 : upgradeCost(type);
  const buttonText = isMax ? 'Maximum erreicht' : inProgress ? 'Ausbau läuft bereits' : `Ausbau starten · ${nextWeeks} Wochen · ${euro(nextCost)}`;
  const progress = inProgress ? Math.round(((f.construction.totalWeeks - f.construction.remainingWeeks) / f.construction.totalWeeks) * 100) : 0;
  return `<section class="panel">
    <p class="eyebrow">Stadion/Umfeld · ${cfg.label}</p><h2>${f.icon} ${cfg.label} ausbauen</h2>
    <div class="facilityHero">
      <div><span>Aktuelle Stufe</span><strong>${f.level}/${f.maxLevel}</strong></div>
      <div><span>Bereich</span><strong>${cfg.area}</strong></div>
      <div><span>Aktueller Effekt</span><strong>${cfg.benefit(f.level)}</strong></div>
    </div>
    <div class="infoBox">${cfg.description}</div>
    ${inProgress ? `<div class="buildBox"><b>Ausbau läuft</b><p>Level ${f.construction.targetLevel} wird gebaut. Verbleibend: ${f.construction.remainingWeeks} Kalenderwochen.</p><div class="bar"><div style="width:${progress}%"></div></div></div>` : ''}
    ${!isMax && !inProgress ? `<div class="buildPreview"><b>Vor dem Bau sichtbar:</b><span>Level ${f.level + 1}</span><span>Dauer: ${nextWeeks} Kalenderwochen</span><span>Kosten: ${euro(nextCost)}</span><span>Effekt nach Fertigstellung: ${cfg.benefit(f.level + 1)}</span></div>` : ''}
    <div class="grid compact">
      ${card('⏳', 'Dauer nächster Ausbau', isMax ? 'fertig' : `${nextWeeks} Wochen`, isMax ? 'Maximalstufe erreicht' : 'steigt mit jedem Level')}
      ${card('💶', 'Kosten nächster Ausbau', isMax ? '-' : euro(nextCost), 'wird sofort bezahlt')}
      ${card('📈', 'Nächster Effekt', isMax ? cfg.benefit(f.level) : cfg.benefit(f.level + 1), 'nach Fertigstellung aktiv')}
      ${card('🏁', 'Maximum', 'Level 15', 'danach kein weiterer Ausbau')}
    </div>
    <button class="primary full" ${isMax || inProgress ? 'disabled' : ''} onclick="startUpgrade('${type}')">${buttonText}</button>
  </section>`;
}
function environment() {
  const labels = { overview: 'Übersicht', stadium: 'Stadion', training: 'Trainingszentrum', academy: 'Akademie', youthCenter: 'Jugendzentrum', medical: 'Medizin' };
  const content = state.environmentSection === 'overview' ? environmentOverview() : facilityDetail(state.environmentSection);
  return `<section class="teamSubnav"><div class="chips">
    ${Object.entries(labels).map(([id, label]) => environmentSubButton(id, label)).join('')}
  </div></section>${content}`;
}
function seasonSubButton(id, label) {
  return `<button class="chip ${state.seasonSection === id ? 'selected' : ''}" onclick="setSeasonSection('${id}')">${label}</button>`;
}
function tableView() {
  const rows = CURRENT_TABLE.map(row => `<tr class="${row.own ? 'ownClub' : ''} clickableRow" onclick="openClubRoster('${row.club}', 10)"><td>${row.pos}</td><td>${row.club}</td><td>${row.played}</td><td>${row.diff > 0 ? '+' : ''}${row.diff}</td><td><b>${row.points}</b></td></tr>`).join('');
  return `<section class="panel"><p class="eyebrow">Saison · Tabelle</p><h2>Aktuelle Ligatabelle</h2><div class="infoBox">Vereine sind antippbar. Öffne einen Verein, um den Kader und einzelne Spieler anzusehen.</div><div class="tableWrap"><table><thead><tr><th>#</th><th>Verein</th><th>Sp</th><th>TD</th><th>Pts</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
}
function scheduleView() {
  return `<section class="panel"><p class="eyebrow">Saison · Spielplan</p><h2>Nächstes Spiel</h2><div class="infoBox"><b>${ownClubName()} - ${currentOpponentName()}</b><br>${formatGermanDate(nextMatchDate())} · Heimspiel · Ligaspieltag 8<br><span>Aktuelles Datum: ${formatGermanDate(currentGameDate())}</span></div><div class="grid compact">${card('🏠', 'Heimvorteil', '+3', 'kleiner Bonus in der Simulation')}${card('🧠', 'Taktik', tacticSummaryText(), 'wirkt auf die Simulation')}</div></section>`;
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function monthTitle(date) {
  return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
}
function calendarFixtures() {
  const base = nextMatchDate();
  return [
    { date: base, title: `${ownClubName()} - ${currentOpponentName()}`, kind: 'Liga · Heim' },
    { date: addDays(base, 7), title: `Rapid Neustadt - ${ownClubName()}`, kind: 'Liga · Auswärts' },
    { date: addDays(base, 14), title: `${ownClubName()} - TSV Südstadt`, kind: 'Liga · Heim' },
    { date: addDays(base, 21), title: 'Pokalrunde', kind: 'Pokal' },
    { date: addDays(base, 28), title: `SC Bergheim - ${ownClubName()}`, kind: 'Liga · Auswärts' }
  ];
}
function calendarView() {
  const today = currentGameDate();
  const cursor = monthCursorDate();
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mondayOffset = (first.getDay() + 6) % 7;
  const fixtures = calendarFixtures().filter(match => match.date.getMonth() === month && match.date.getFullYear() === year);
  const blanks = Array.from({ length: mondayOffset }, () => `<div class="calendarCell empty" aria-hidden="true"></div>`).join('');
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, month, day);
    const match = fixtures.find(item => sameDay(item.date, date));
    const isToday = sameDay(date, today);
    return `<div class="calendarCell ${isToday ? 'today' : ''} ${match ? 'matchDay' : ''}">
      <strong>${day}</strong>
      ${isToday ? '<span class="todayBadge">Heute</span>' : ''}
      ${match ? `<span class="matchBadge">${match.kind}</span><small>${match.title}</small>` : ''}
    </div>`;
  }).join('');
  const upcoming = calendarFixtures().filter(match => match.date >= today).map(match => `<div class="league"><strong>${formatGermanDate(match.date)}</strong><span>${match.title} · ${match.kind}</span></div>`).join('');
  return `<section class="panel"><p class="eyebrow">Saison · Kalender</p><div class="calendarHeader"><button class="ghost" onclick="changeCalendarMonth(-1)">← Voriger Monat</button><h2>${monthTitle(cursor)}</h2><button class="ghost" onclick="changeCalendarMonth(1)">Nächster Monat →</button></div><div class="infoBox">Hier siehst du die Monatsansicht. Spieltage sind farblich markiert, das aktuelle Datum ebenfalls. Du kannst zwischen den Monaten wechseln.</div><div class="calendarWeekdays"><span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span></div><div class="calendarGrid">${blanks}${days}</div><h3>Anstehende Termine</h3><div class="leagueList">${upcoming}</div></section>`;
}
function leagueTableView() {
  const index = state.selectedLeagueIndex ?? 10;
  const league = LEAGUES[index];
  const rows = getLeagueTable(index).map(row => `<tr class="${row.own ? 'ownClub' : ''} clickableRow" onclick="openClubRoster('${row.club}', ${index})"><td>${row.pos}</td><td>${row.club}</td><td>${row.played}</td><td>${row.diff > 0 ? '+' : ''}${row.diff}</td><td><b>${row.points}</b></td></tr>`).join('');
  return `<section class="panel"><p class="eyebrow">Saison · Ligen</p><h2>${league.league}</h2><div class="infoBox">${league.country} · ${league.region} · ${league.clubs} Vereine. Tippe auf einen Verein, um den Kader zu öffnen.</div><div class="tableWrap"><table><thead><tr><th>#</th><th>Verein</th><th>Sp</th><th>TD</th><th>Pts</th></tr></thead><tbody>${rows}</tbody></table></div><button class="ghost" onclick="setSeasonSection('world')">Zurück zu allen Ligen</button></section>`;
}
function clubRosterView() {
  const viewed = state.viewedClub || { clubName: 'SV Nordheim', leagueIndex: OWN_LEAGUE_INDEX };
  const league = LEAGUES[viewed.leagueIndex] || LEAGUES[OWN_LEAGUE_INDEX];
  const roster = getClubRoster(viewed.clubName, viewed.leagueIndex);
  const known = isClubScouted(viewed.clubName, viewed.leagueIndex);
  const players = roster.map(p => {
    const playerKnown = known || isPlayerScouted(p.id);
    return `<button class="player clickablePlayer" onclick="openPlayerProfile('${p.id}', '${viewed.clubName}', ${viewed.leagueIndex})"><div class="playerTop"><strong>${p.name}</strong><span>${positionText(p)} · ${p.age} Jahre</span></div><div class="meta">${playerKnown ? knownPlayerMeta(p) : unknownPlayerMeta()}</div></button>`;
  }).join('');
  return `<section class="panel"><p class="eyebrow">Verein · Kader</p><h2>${viewed.clubName}</h2><div class="infoBox">${league.league} · ${league.country}. Image: national ${getClubImage(viewed.clubName, viewed.leagueIndex).national}/100 · international ${getClubImage(viewed.clubName, viewed.leagueIndex).international}/100. ${known ? 'Dieser Kader ist gescoutet: alle Spielerwerte sind sichtbar.' : 'Dieser Kader ist noch nicht gescoutet: du siehst nur Name, Alter und Position.'}</div>${known ? '' : `<button class="primary full" ${scoutingJobStatusText('club', { clubName: viewed.clubName, leagueIndex: viewed.leagueIndex }) ? 'disabled' : ''} onclick="scoutClub('${viewed.clubName}', ${viewed.leagueIndex})">${scoutingJobStatusText('club', { clubName: viewed.clubName, leagueIndex: viewed.leagueIndex }) || `Diesen Verein scouten · ${euro(scoutClubCost(viewed.clubName, viewed.leagueIndex))}`}</button>`}<div class="playerList">${players}</div></section>`;
}
function playerProfileModal() {
  const p = state.playerProfile;
  if (!p) return '';
  const known = isPlayerKnown(p);
  const valueCards = known ? `<article class="card"><p>Gesamtstärke</p><h2>${p.strength}/100</h2><span class="stars">${stars(p.talent)}</span></article><article class="card"><p>Rollenprofil</p><h2>Off ${playerUnitScore(p,'attack')} · Def ${playerUnitScore(p,'defense')}</h2><span>Technik ${playerUnitScore(p,'control')} · Flügel ${playerUnitScore(p,'wings')}</span></article><article class="card"><p>Marktwert</p><h2>${euro(p.marketValue)}</h2><span>Gehalt ${euro(p.salary)}</span></article><article class="card"><p>Vertrag</p><h2>${p.contractYears} Jahre</h2><span>${p.club}</span></article><article class="card"><p>Wechselbereitschaft</p><h2>${transferInterest(p, p.club, p.leagueIndex)}%</h2><span>${playerCareerPhase(p)} · ${transferInterestText(p, p.club, p.leagueIndex)}</span></article>` : `<article class="card"><p>Gesamtstärke</p><h2>${p.strength}/100</h2><span>immer sichtbar</span></article><article class="card"><p>Fähigkeiten</p><h2>?</h2><span>Scouting erforderlich</span></article><article class="card"><p>Marktwert</p><h2>?</h2><span>Scouting erforderlich</span></article><article class="card"><p>Vertrag</p><h2>?</h2><span>Scouting erforderlich</span></article>`;
  return `<div class="lineupModalBackdrop" role="dialog" aria-modal="true"><div class="lineupModal"><div class="modalHeader"><div><p class="eyebrow">Spielerprofil</p><h2>${p.name}</h2></div><button class="ghost closeButton" onclick="closePlayerProfile()">Schließen</button></div><div class="grid compact"><article class="card"><p>Position</p><h2>${positionText(p)}</h2><span>${p.age} Jahre</span></article>${valueCards}</div>${known ? skillBars(p) : ''}${known ? '' : '<div class="infoBox">Dieser Spieler ist noch nicht gescoutet. Die Gesamtstärke ist bekannt, aber Talent, Marktwert, Vertrag und vor allem die einzelnen Fähigkeiten sind verborgen. Scouten bleibt wichtig, um zu erkennen, ob der Spieler zu deiner Taktik passt.</div>'}<div class="modalActions"><button class="ghost full" ${watchlistHas(p.id) ? 'disabled' : ''} onclick="addToWatchlist('${p.id}', '${p.club}', ${p.leagueIndex})">${watchlistHas(p.id) ? 'Bereits auf Beobachtungsliste' : 'Auf Beobachtungsliste setzen'}</button>${known ? `<button class="primary full" onclick="makeContractOffer('${p.id}', '${p.club}', ${p.leagueIndex})">Vertragsangebot machen</button>` : `<button class="primary full" ${scoutingJobStatusText('player', { playerId: p.id }) ? 'disabled' : ''} onclick="scoutPlayer('${p.id}', '${p.club}', ${p.leagueIndex})">${scoutingJobStatusText('player', { playerId: p.id }) || `Spieler scouten · ${euro(scoutPlayerCost(p))}`}</button><button class="ghost full" ${scoutingJobStatusText('club', { clubName: p.club, leagueIndex: p.leagueIndex }) ? 'disabled' : ''} onclick="scoutClub('${p.club}', ${p.leagueIndex})">${scoutingJobStatusText('club', { clubName: p.club, leagueIndex: p.leagueIndex }) || `Verein scouten · ${euro(scoutClubCost(p.club, p.leagueIndex))}`}</button><button class="ghost full" onclick="scoutLeague(${p.leagueIndex})">Liga scouten · ${euro(scoutLeagueCost(p.leagueIndex))}</button>`}</div></div></div>`;
}
function worldView() {
  const leagues = LEAGUES.map((l, index) => `<button class="league clickableLeague" onclick="openLeagueTable(${index})"><strong>${l.league}</strong><span>${l.country} · ${l.region} · ${l.clubs} Vereine · ${l.tier}</span></button>`).join('');
  return `<section class="panel"><p class="eyebrow">Spielbare Welt</p><h2>15 europäische Topligen + MLS + Südamerika</h2><div class="infoBox">Tippe auf eine Liga, um ihre aktuelle Tabelle zu öffnen.</div><div class="leagueList">${leagues}</div></section>`;
}
function internationalView() {
  const intl = INTERNATIONALS.map(c => `<div class="league"><strong>${c.name}</strong><span>${c.teams} Teams · ${c.games} Ligaphasen-Spiele · Prämien: ${c.reward}</span></div>`).join('');
  return `<section class="panel"><p class="eyebrow">Europa</p><h2>Internationale Wettbewerbe</h2><div class="internationalList">${intl}</div></section>`;
}
function season() {
  const content = state.seasonSection === 'calendar' ? calendarView() : state.seasonSection === 'table' ? tableView() : state.seasonSection === 'schedule' ? scheduleView() : state.seasonSection === 'world' ? worldView() : state.seasonSection === 'leagueTable' ? leagueTableView() : state.seasonSection === 'clubRoster' ? clubRosterView() : internationalView();
  return `<section class="teamSubnav"><div class="chips">${seasonSubButton('calendar', 'Kalender')}${seasonSubButton('table', 'Tabelle')}${seasonSubButton('schedule', 'Spielplan')}${seasonSubButton('world', 'Ligen')}${seasonSubButton('international', 'Europa')}</div></section>${content}`;
}


function youthDiscoveryModal() {
  const p = state.youthDiscoveryPopup;
  if (!p) return '';
  return `<div class="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="youthFoundTitle">
    <div class="modalBox smallModal">
      <div class="modalHeader">
        <div><p class="eyebrow">Nachwuchs</p><h2 id="youthFoundTitle">Jugendspieler gefunden</h2></div>
        <span class="requiredBadge">Neu</span>
      </div>
      <p class="modalIntro">Dein Jugendzentrum hat einen neuen Jugendspieler entdeckt. Er wurde deiner Vereinsjugend hinzugefügt.</p>
      <article class="youthFoundCard">
        <h3>${p.name}</h3>
        <p>${positionText(p)} · ${p.age} Jahre</p>
        <strong>Stärke ${p.strength} · ${stars(p.talent)}</strong>
        <span>${p.progress}% bis zur nächsten Stufe</span>
      </article>
      <div class="modalActions">
        <button class="ghost full" onclick="closeYouthDiscoveryPopup()">Später ansehen</button>
        <button class="primary full" onclick="openYouthAfterDiscovery()">Zur Jugend</button>
      </div>
    </div>
  </div>`;
}


function seasonEndModal() {
  const r = state.seasonEndModal;
  if (!r) return '';
  return `<div class="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="seasonEndTitle">
    <div class="modalBox">
      <div class="modalHeader">
        <div><p class="eyebrow">30.06. · Saisonabschluss</p><h2 id="seasonEndTitle">Ende der Saison ${r.season}</h2></div>
        <span class="requiredBadge">Pflicht</span>
      </div>
      <p class="modalIntro">Die Saison ist abgeschlossen. Vor dem Start der neuen Saison siehst du hier den kurzen Rückblick.</p>
      <div class="grid compact">
        ${card('🏆', 'Tabellenplatz', `${r.place}. Platz`, `${r.points} Punkte`)}
        ${card('⚽', 'Letztes Spiel', r.lastMatch, 'letzter Spielbericht')}
        ${card('💪', 'Kaderstärke', `${r.squadAvg}/100`, `Bester: ${r.topPlayerName} (${r.topPlayerStrength})`)}
        ${card('🌱', 'Jugend', `${r.academyPlayers} Spieler`, 'aktuell in der Vereinsjugend')}
        ${card('💶', 'Kontostand', euro(r.money), `Saldo: ${euro(r.saldo)}`)}
        ${card('🤝', 'Sponsor', r.sponsorName, 'Vertrag endet jetzt')}
      </div>
      <div class="financeGrid">
        ${financeRow('Saisoneinnahmen', r.income, 'positive')}
        ${financeRow('Saisonausgaben', r.expense, 'negative')}
        ${financeRow('Saison-Saldo', r.saldo, r.saldo >= 0 ? 'positive' : 'negative')}
      </div>
      <div class="modalActions"><button class="primary full" onclick="beginNewSeason()">Neue Saison am 01.07. beginnen</button></div>
    </div>
  </div>`;
}
function seasonStartModal() {
  const r = state.seasonStartModal;
  if (!r) return '';
  return `<div class="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="seasonStartTitle">
    <div class="modalBox smallModal">
      <div class="modalHeader">
        <div><p class="eyebrow">01.07. · Saisonbeginn</p><h2 id="seasonStartTitle">Beginn der Saison ${r.season}</h2></div>
        <span class="requiredBadge">Neu</span>
      </div>
      <p class="modalIntro">${r.startDate}: Die neue Saison startet. Spieler sind gealtert, Verträge wurden fortgeschrieben und der Sponsorvertrag der alten Saison ist ausgelaufen.</p>
      <div class="grid compact">
        ${card('📅', 'Startdatum', r.startDate, 'offizieller Saisonbeginn')}
        ${card('🤝', 'Sponsor', 'noch offen', 'als Nächstes auswählen')}
        ${card('🌱', 'Jugend', `${state.academyPlayers.length} Spieler`, 'neue Talente können während der Saison erscheinen')}
      </div>
      <div class="modalActions"><button class="primary full" onclick="closeSeasonStartModal()">Weiter zur Sponsorenauswahl</button></div>
    </div>
  </div>`;
}
function sponsorModal() {
  if (!state.gameStarted || state.sponsor || state.seasonEndModal || state.seasonStartModal) return '';
  const offers = state.sponsorOffers.map(offer => `<article class="sponsorCard modalSponsorCard">
    <div><p class="eyebrow">${offer.style}</p><h3>${offer.name}</h3><p>${offer.description}</p></div>
    <div class="financeGrid">
      ${financeRow('Fixbetrag', offer.base, 'positive')}
      ${financeRow('pro Punkt', offer.perPoint, 'positive')}
      ${financeRow('pro Sieg', offer.winBonus, 'positive')}
      ${financeRow('Titelbonus', offer.titleBonus, 'positive')}
      ${financeRow('Europacup', offer.europeanBonus, 'positive')}
      ${financeRow('vorsichtige Prognose', sponsorForecast(offer), 'positive')}
    </div>
    <button class="primary full" onclick="selectSponsor('${offer.id}')">Diesen Sponsor wählen</button>
  </article>`).join('');
  return `<div class="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="sponsorModalTitle">
    <div class="modalBox">
      <div class="modalHeader">
        <div><p class="eyebrow">Saisonstart</p><h2 id="sponsorModalTitle">Sponsorvertrag wählen</h2></div>
        <span class="requiredBadge">Pflicht</span>
      </div>
      <p class="modalIntro">Vor dem Start der Saison musst du einen Sponsor für genau 1 Jahr wählen. Sicher bedeutet mehr Fixgeld. Risiko bedeutet weniger Grundbetrag, aber viel höhere Boni bei Punkten, Siegen, Titeln und Europacup-Erfolgen.</p>
      <div class="sponsorList modalSponsorList">${offers}</div>
    </div>
  </div>`;
}

function navButton(id, icon, label) {
  return `<button class="${state.tab === id ? 'active' : ''}" onclick="setTab('${id}')"><b>${icon}</b><span>${label}</span></button>`;
}
function render() {
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); return; }
  const content = state.tab === 'dashboard' ? dashboard() : state.tab === 'team' ? team() : state.tab === 'market' ? market() : state.tab === 'scouting' ? scouting() : state.tab === 'club' ? club() : state.tab === 'environment' ? environment() : season();
  document.getElementById('app').innerHTML = `<div class="appShell">
    <header class="hero">
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()} · Aufstellung, Training, Scouting, Entwicklung, Leihen und Ligastruktur.</p></div>
      <button class="primary" onclick="nextWeek()">Nächste Kalenderwoche</button>
    </header>
    <main>${content}</main>
    <nav class="bottomNav">
      ${navButton('dashboard', '⌂', 'Home')}
      ${navButton('team', '⚽', 'Team')}
      ${navButton('market', '↔', 'Markt')}
      ${navButton('scouting', '🔭', 'Scouting')}
      ${navButton('club', '▣', 'Verein')}
      ${navButton('environment', '🏟️', 'Stadion/Umfeld')}
      ${navButton('season', '🏆', 'Saison')}
    </nav>
    ${seasonEndModal()}
    ${seasonStartModal()}
    ${sponsorModal()}
    ${youthDiscoveryModal()}
    ${playerProfileModal()}
  </div>`;
}
ensurePlayerContracts();
ensurePlayerSkills();
initLineup();
render();
