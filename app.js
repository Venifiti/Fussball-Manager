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
    if (f.minStrength && player.strength < Number(f.minStrength)) return false;
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
    return `<span>Talent: Scouting erforderlich</span><span>Fähigkeiten: Scouting erforderlich</span><span>Vertrag: Scouting erforderlich</span>`;
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
  const squadAvg = Math.round(lineupStrength() || state.players.reduce((s,p)=>s+p.strength,0)/Math.max(1,state.players.length));
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
  const meta = known ? knownPlayerMeta(p) : unknownPlayerMeta(p, !!options.transferList || !!options.showOverall);
  const listHint = options.transferList ? `<span>${p.freeAgent ? 'Ablösefrei' : 'Transferliste'} · ${transferListReason(p)}</span><span>${p.freeAgent ? 'Preis: 0 €' : `Preis: ${euro(price)}`}</span>` : '';
  const scoutStatus = !known ? scoutingJobStatusText('player', { playerId: p.id }) : '';
  const offerButton = options.transferList
    ? `<button class="primary" onclick="buyTransferListedPlayer('${p.id}', '${p.club}', ${p.leagueIndex})">${p.freeAgent ? 'Verpflichten' : 'Kaufen'}</button>`
    : known ? `<button class="primary" onclick="makeContractOffer('${p.id}', '${p.club}', ${p.leagueIndex})">Vertragsangebot</button>` : `<button class="primary" onclick="scoutPlayer('${p.id}', '${p.club}', ${p.leagueIndex})">Spieler scouten</button>`;
  const searchQuickFacts = options.showOverall
    ? `<span class="marketQuickInfo">Stärke ${p.strength}/100</span><span class="marketQuickInfo marketValueInfo">Marktwert ca. ${euro(p.marketValue)}</span>`
    : '';
  return `<div class="player"><div class="playerTop"><strong>${p.name}</strong><span>${positionText(p)} · ${p.age} Jahre</span></div><div class="meta"><span>${p.club}</span>${meta}${listHint}${scoutStatus ? `<span>${scoutStatus}</span>` : ''}</div><div class="playerActions"><button class="ghost" onclick="openPlayerProfile('${p.id}', '${p.club}', ${p.leagueIndex})">Spieler öffnen</button>${watchlistHas(p.id) ? '<button class="ghost" disabled>Auf Beobachtungsliste</button>' : `<button class="ghost" onclick="addToWatchlist('${p.id}', '${p.club}', ${p.leagueIndex})">Beobachten</button>`}${offerButton}${searchQuickFacts}</div></div>`;
}
function transferListTableRow(p) {
  const known = isPlayerKnown(p) || p.freeAgent;
  const price = transferListPrice(p);
  const availability = availabilityLabel(p);
  const marketValue = known ? euro(p.marketValue) : `Schätzung ${euro(p.marketValue)}`;
  const scoutStatus = !known ? scoutingJobStatusText('player', { playerId: p.id }) : '';
  return `<tr class="clickableRow" onclick="openPlayerProfile('${p.id}', '${p.club}', ${p.leagueIndex})"><td><strong>${p.name}</strong>${scoutStatus ? `<br><small>${scoutStatus}</small>` : ''}</td><td>${p.age}</td><td>${positionText(p)}</td><td><strong>${p.strength}/100</strong></td><td><strong>${marketValue}</strong></td><td><strong>${p.freeAgent ? '0 €' : euro(price)}</strong></td><td>${p.club}</td><td>${p.nationality || 'International'}</td><td><span class="statusPill ${availability.cls}">${availability.text}</span></td></tr>`;
}
function transferListView() {
  const rows = transferListedPlayers().map(transferListTableRow).join('');
  return `<section class="panel widePanel"><p class="eyebrow">Markt · Transferliste</p><h2>Transferliste</h2><div class="infoBox">Hier stehen Spieler, die Vereine aktiv abgeben möchten oder die ablösefrei verfügbar sind. Die Gesamtstärke ist auf der Transferliste immer sichtbar. Zusätzlich siehst du jetzt direkt den Marktwert und den geforderten Preis, damit du sofort vergleichen kannst, ob ein Spieler günstig oder teuer angeboten wird.</div><div class="tableWrap transferListTable"><table><thead><tr><th>Name</th><th>Alter</th><th>Position</th><th>Stärke</th><th>Marktwert</th><th>Preis</th><th>Verein</th><th>Nationalität</th><th>Verfügbar</th></tr></thead><tbody>${rows || '<tr><td colspan="9">Aktuell keine Spieler auf der Transferliste.</td></tr>'}</tbody></table></div></section>`;
}
function playerSearchView() {
  const f = state.marketSearch;
  const positions = ['Alle','TW','RV','IV','LV','DM','ZM','OM','RM','LM','RA','LA','ST'];
  const results = marketSearchResults().map(p => marketPlayerRow(p, { showOverall: true })).join('');
  const saved = (state.savedMarketSearches || []).map((entry, index) => `<div class="financeRow"><span>${entry.label}</span><strong><button class="ghost smallButton" onclick="loadMarketSearch(${index})">Laden</button> <button class="ghost smallButton" onclick="deleteMarketSearch(${index})">Löschen</button></strong></div>`).join('');
  return `<section class="panel"><p class="eyebrow">Transfers · Spielersuche</p><h2>Spielersuche</h2><div class="infoBox">Durchsuche Spieler aller Vereine und Ligen. Die Gesamtstärke und ein ungefährer Marktwert sind immer sichtbar, damit du die sportliche Qualität und die ungefähren Kosten sofort einschätzen kannst. Bei nicht gescouteten Spielern bleiben Talent, Vertrag und Detailwerte verdeckt. Der Stärkefilter greift auch ohne Scouting.</div><div class="searchGrid"><label class="fieldLabel">Name<input value="${f.name}" oninput="setMarketSearchField('name', this.value)" placeholder="Spielername" /></label><label class="fieldLabel">Position<select onchange="setMarketSearchField('position', this.value)">${positions.map(pos => `<option ${f.position === pos ? 'selected' : ''}>${pos}</option>`).join('')}</select></label><label class="fieldLabel">Max. Alter<input type="number" value="${f.maxAge}" oninput="setMarketSearchField('maxAge', this.value)" placeholder="z.B. 24" /></label><label class="fieldLabel">Min. Stärke<input type="number" value="${f.minStrength}" oninput="setMarketSearchField('minStrength', this.value)" placeholder="z.B. 60" /></label><label class="fieldLabel">Min. Talent<input type="number" value="${f.minTalent}" min="1" max="5" oninput="setMarketSearchField('minTalent', this.value)" placeholder="1-5" /></label><label class="fieldLabel">Min. Marktwert<input type="number" value="${f.minValue}" oninput="setMarketSearchField('minValue', this.value)" placeholder="z.B. 100000" /></label><label class="fieldLabel">Max. Marktwert<input type="number" value="${f.maxValue}" oninput="setMarketSearchField('maxValue', this.value)" placeholder="z.B. 500000" /></label></div><div class="playerActions"><button class="primary" onclick="saveMarketSearch()">Filter speichern</button><button class="ghost" onclick="clearMarketSearch()">Filter zurücksetzen</button></div>${saved ? `<h3>Gespeicherte Filter</h3><div class="financeGrid">${saved}</div>` : ''}<h3>Suchergebnisse</h3><div class="playerList">${results || '<div class="infoBox">Keine passenden Spieler gefunden.</div>'}</div></section>`;
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
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b></p></div>
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


// ===== Version 32: Spieltag, Home-Sprung, seltener Nachwuchs, Spielerstatistiken =====
function initV32Features() {
  state.dayOffset = state.dayOffset || 0;
  state.matchPlayedWeek = state.matchPlayedWeek || 0;
  state.matchDayModal = state.matchDayModal || null;
  state.activeMatch = state.activeMatch || null;
  state.lastMatchdayResults = state.lastMatchdayResults || [];
  state.externalPlayerStats = state.externalPlayerStats || [];
  state.playerStatsMode = state.playerStatsMode || 'goals';
  if (!state.nextYouthDiscoveryWeek || state.nextYouthDiscoveryWeek < 18) state.nextYouthDiscoveryWeek = state.week + 12;
  state.players = state.players.map(p => ({ seasonGoals: 0, seasonAssists: 0, seasonPoints: 0, seasonRatingSum: 0, seasonRatingGames: 0, ...p }));
}
function currentGameDate() {
  const date = seasonStartDate();
  date.setDate(date.getDate() + (state.week - 1) * 7 + (state.dayOffset || 0));
  return date;
}
function nextMatchDate() {
  const date = seasonStartDate();
  date.setDate(date.getDate() + (state.week - 1) * 7 + 5);
  return date;
}
function isMatchPendingThisWeek() {
  return state.matchPlayedWeek !== state.week;
}
function dateOnlyValue(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}
function sameDate(a, b) {
  return dateOnlyValue(a) === dateOnlyValue(b);
}
function isoWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}
function sameCalendarWeek(a, b) {
  return dateOnlyValue(isoWeekStart(a)) === dateOnlyValue(isoWeekStart(b));
}
function daysBetweenDates(a, b) {
  return Math.round((dateOnlyValue(b) - dateOnlyValue(a)) / 86400000);
}
function headerActionLabel() {
  if (!isMatchPendingThisWeek()) return 'Zur nächsten KW.';
  const today = currentGameDate();
  const matchDate = nextMatchDate();
  if (sameDate(today, matchDate)) return 'Spiel starten';
  if (sameCalendarWeek(today, matchDate)) return 'Zum Spiel simulieren';
  return 'Zur nächsten KW.';
}
function advanceToNextCalendarWeek() {
  const today = currentGameDate();
  const matchDate = nextMatchDate();
  let target = isoWeekStart(matchDate);
  let diff = daysBetweenDates(today, target);
  if (diff <= 0) diff = Math.max(1, daysBetweenDates(today, matchDate));
  state.dayOffset = (state.dayOffset || 0) + diff;
  state.tab = 'dashboard';
  render();
}
function headerAction() {
  if (!isMatchPendingThisWeek()) { nextWeek(); return; }
  const today = currentGameDate();
  const matchDate = nextMatchDate();
  if (sameDate(today, matchDate) || sameCalendarWeek(today, matchDate)) openMatchDayModal();
  else advanceToNextCalendarWeek();
}
function youthCenterDiscoveryInterval() {
  const level = state.facilities.youthCenter.level;
  return Math.max(10, 22 - Math.floor(level / 2));
}
function maybeDiscoverYouthPlayer() {
  if (state.week < state.nextYouthDiscoveryWeek) return;
  const player = generateYouthPlayer();
  state.academyPlayers.push(player);
  state.youthDiscoveryPopup = player;
  state.nextYouthDiscoveryWeek = state.week + youthCenterDiscoveryInterval();
}
function discardYouthDiscoveryPlayer() {
  const p = state.youthDiscoveryPopup;
  if (p) state.academyPlayers = state.academyPlayers.filter(y => String(y.id) !== String(p.id));
  state.youthDiscoveryPopup = null;
  render();
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
      <p class="modalIntro">Dein Jugendzentrum hat einen neuen Jugendspieler gefunden. Du kannst ihn ansehen oder direkt aus dem Verein werfen, wenn er dir zu schwach erscheint.</p>
      <div class="grid compact">
        ${card('🌱', p.name, `${p.pos} · ${p.age} Jahre`, `Stärke ${p.strength}/100 · Talent ${stars(p.talent)}`)}
        ${card('📈', 'Fortschritt', `${p.progress}%`, `bis Stärke ${Math.min(100, p.strength + 1)}`)}
      </div>
      <div class="modalActions">
        <button class="ghost full dangerButton" onclick="discardYouthDiscoveryPlayer()">Aus Verein werfen</button>
        <button class="ghost full" onclick="closeYouthDiscoveryPopup()">Später ansehen</button>
        <button class="primary full" onclick="openYouthAfterDiscovery()">Zu Team → Jugend</button>
      </div>
    </div>
  </div>`;
}
function opponentRosterForMatch(opponent) {
  return getClubRoster(opponent, OWN_LEAGUE_INDEX);
}
function teamBestPlayer(players) {
  return [...players].sort((a,b)=>(b.strength||0)-(a.strength||0))[0];
}
function teamMostValuable(players) {
  return [...players].sort((a,b)=>(b.marketValue||0)-(a.marketValue||0))[0];
}
function opponentTeamStrength(opponent) {
  const roster = opponentRosterForMatch(opponent);
  return Math.round(roster.slice(0,11).reduce((s,p)=>s+(p.strength||0),0)/11);
}
function openMatchDayModal() {
  state.dayOffset = 5;
  const opponent = currentOpponentName();
  const ownPlayers = lineupPlayers().length ? lineupPlayers() : state.players.slice(0,11);
  const oppPlayers = opponentRosterForMatch(opponent);
  state.matchDayModal = {
    opponent,
    date: formatGermanDate(nextMatchDate()),
    ownStrength: Math.round(lineupStrength() || lineupStrength() || 0),
    oppStrength: opponentTeamStrength(opponent),
    ownBest: teamBestPlayer(ownPlayers),
    oppBest: teamBestPlayer(oppPlayers),
    ownValue: teamMostValuable(ownPlayers),
    oppValue: teamMostValuable(oppPlayers)
  };
  state.tab = 'dashboard';
  render();
}
function matchDayModal() {
  const m = state.matchDayModal;
  if (!m) return '';
  return `<div class="modalBackdrop" role="dialog" aria-modal="true">
    <div class="modalBox">
      <div class="modalHeader"><div><p class="eyebrow">${m.date}</p><h2>Spieltag</h2></div><span class="requiredBadge">Ligaspiel</span></div>
      <p class="modalIntro">Alle Spiele der Liga finden heute statt. Hier siehst du die Vorschau beider Teams.</p>
      <div class="matchPreviewGrid">
        <article class="teamPreview"><p class="eyebrow">Heimteam</p><h3>${ownClubName()}</h3><b>Gesamtstärke ${m.ownStrength}/100</b><span>Bester Spieler: ${m.ownBest?.name || '-'} (${m.ownBest?.strength || 0})</span><span>Teuerster Spieler: ${m.ownValue?.name || '-'} · ${euro(m.ownValue?.marketValue || 0)}</span></article>
        <article class="teamPreview"><p class="eyebrow">Auswärtsteam</p><h3>${m.opponent}</h3><b>Gesamtstärke ${m.oppStrength}/100</b><span>Bester Spieler: ${m.oppBest?.name || '-'} (${m.oppBest?.strength || 0})</span><span>Teuerster Spieler: ${m.oppValue?.name || '-'} · ${euro(m.oppValue?.marketValue || 0)}</span></article>
      </div>
      <div class="modalActions"><button class="ghost full" onclick="state.matchDayModal=null;render()">Noch nicht</button><button class="primary full" onclick="startMatchScreen()">Weiter zum Spielscreen</button></div>
    </div>
  </div>`;
}
function predictedMatchScore(opponent) {
  const oppRow = CURRENT_TABLE.find(r => r.club === opponent) || CURRENT_TABLE.find(r => !r.own);
  const mod = tacticModifier();
  const positionPenalty = lineupPenaltyCount() * 2;
  const unit = lineupUnitScores();
  const ownPower = lineupStrength() * 0.55 + unit.attack * 0.16 + unit.control * 0.13 + unit.defense * 0.16 + mod.total - positionPenalty + 3;
  const oppPower = 55 + (oppRow?.points || 10) * 0.9 + ((stableHash(opponent + state.week) % 9) - 4);
  const diff = ownPower - oppPower;
  const ownGoals = Math.max(0, Math.min(5, Math.round(1.2 + diff / 18 + (unit.attack - 58) / 28 + mod.attack / 10 + ((stableHash('a'+state.week) % 5) - 2) / 3)));
  const oppGoals = Math.max(0, Math.min(5, Math.round(1.2 - diff / 20 - (unit.defense - 58) / 32 - mod.defense / 12 + Math.max(0, mod.risk) / 5 + ((stableHash('b'+state.week) % 5) - 2) / 3)));
  return { ownGoals, oppGoals, ownPower: Math.round(ownPower), oppPower: Math.round(oppPower), mod, positionPenalty, unit };
}
function createGoalEvents(ownGoals, oppGoals, opponent) {
  const ownAttackers = lineupPlayers().filter(p => ['ST','LA','RA','OM','ZM'].includes(p.pos));
  const ownPool = ownAttackers.length ? ownAttackers : lineupPlayers();
  const oppPool = opponentRosterForMatch(opponent).filter(p => ['ST','LA','RA','OM','ZM'].includes(p.pos));
  const events = [];
  for (let i=0;i<ownGoals;i++) {
    const minute = 8 + ((stableHash('own'+state.week+i) % 82));
    const scorer = ownPool[i % Math.max(1, ownPool.length)];
    const assister = ownPool[(i + 2) % Math.max(1, ownPool.length)];
    events.push({ minute, team:'own', text:`${minute}. Min: Tor für ${ownClubName()}! ${scorer?.name || 'Spieler'} trifft.`, scorerId: scorer?.id, scorerName: scorer?.name, assistId: assister?.id, assistName: assister?.name });
  }
  for (let i=0;i<oppGoals;i++) {
    const minute = 10 + ((stableHash('opp'+state.week+i) % 80));
    const scorer = oppPool[i % Math.max(1, oppPool.length)];
    const assister = oppPool[(i + 1) % Math.max(1, oppPool.length)];
    events.push({ minute, team:'opp', text:`${minute}. Min: Tor für ${opponent}. ${scorer?.name || 'Gegner'} trifft.`, scorerName: scorer?.name, assistName: assister?.name, club: opponent });
  }
  return events.sort((a,b)=>a.minute-b.minute);
}
function startMatchScreen() {
  const opponent = state.matchDayModal?.opponent || currentOpponentName();
  const score = predictedMatchScore(opponent);
  const events = createGoalEvents(score.ownGoals, score.oppGoals, opponent);
  state.activeMatch = { opponent, score, events, phase:'firstReady', log:[], subs:[], halftimeStats: null, fullStats: null };
  state.matchDayModal = null;
  state.tab = 'match';
  render();
}
function matchStatsForHalf(untilMinute=45) {
  const m = state.activeMatch;
  const ownGoals = m.events.filter(e=>e.team==='own' && e.minute<=untilMinute).length;
  const oppGoals = m.events.filter(e=>e.team==='opp' && e.minute<=untilMinute).length;
  const ownPower = m.score.ownPower;
  const oppPower = m.score.oppPower;
  const possession = clamp(50 + Math.round((ownPower - oppPower) / 3), 35, 65);
  const shotsOwn = Math.max(1, ownGoals * 3 + 3 + Math.round((ownPower - 55) / 12));
  const shotsOpp = Math.max(1, oppGoals * 3 + 3 + Math.round((oppPower - 55) / 12));
  return { ownGoals, oppGoals, possession, shotsOwn, shotsOpp, xgOwn: (shotsOwn * 0.12 + ownGoals * 0.25).toFixed(1), xgOpp: (shotsOpp * 0.12 + oppGoals * 0.25).toFixed(1) };
}
function simulateFirstHalf() {
  if (!state.activeMatch) return;
  const logs = [];
  for (let minute=1; minute<=45; minute+=5) logs.push(`${minute}. Min: ${minute < 20 ? 'Abtasten im Mittelfeld.' : minute < 35 ? 'Beide Teams suchen Lücken.' : 'Die erste Halbzeit läuft aus.'}`);
  const goals = state.activeMatch.events.filter(e=>e.minute<=45).map(e=>e.text);
  state.activeMatch.log = [...logs, ...goals].sort((a,b)=>parseInt(a)-parseInt(b));
  state.activeMatch.halftimeStats = matchStatsForHalf(45);
  state.activeMatch.phase = 'halftime';
  render();
}
function liveSubstitute(slotId, playerId) {
  if (!slotId || !playerId) return;
  const oldId = state.lineup[slotId];
  state.lineup[slotId] = Number(playerId);
  Object.keys(state.bench || {}).forEach(k => { if (String(state.bench[k]) === String(playerId)) state.bench[k] = oldId || null; });
  if (state.activeMatch) state.activeMatch.subs.push(`Wechsel: ${state.players.find(p=>p.id===Number(playerId))?.name || 'Spieler'} kommt.`);
  render();
}
function simulateSecondHalf() {
  if (!state.activeMatch) return;
  const logs = [];
  for (let minute=50; minute<=90; minute+=5) logs.push(`${minute}. Min: ${minute < 65 ? 'Die zweite Halbzeit nimmt Fahrt auf.' : minute < 80 ? 'Die Kräfte lassen langsam nach.' : 'Schlussphase.'}`);
  const goals = state.activeMatch.events.filter(e=>e.minute>45).map(e=>e.text);
  state.activeMatch.log = [...state.activeMatch.log, ...logs, ...goals].sort((a,b)=>parseInt(a)-parseInt(b));
  state.activeMatch.fullStats = matchStatsForHalf(90);
  finishActiveMatch();
  state.activeMatch.phase = 'finished';
  render();
}
function updatePlayerSeasonStatsFromMatch() {
  const m = state.activeMatch;
  const ownEvents = m.events.filter(e=>e.team==='own');
  const starters = lineupEntries().map(e => e.player.id);
  const benchIds = Object.values(state.bench || {}).map(Number).filter(Boolean).slice(0,3);
  const resultBonus = m.score.ownGoals > m.score.oppGoals ? -0.35 : m.score.ownGoals === m.score.oppGoals ? 0 : 0.35;
  const mod = m.score.mod;
  state.players = state.players.map(p => {
    let minutes = starters.includes(p.id) ? 90 : benchIds.includes(p.id) ? 20 : 0;
    let rating = minutes ? Math.max(1, Math.min(5, 2.8 + resultBonus - (p.strength - 60) / 90 - (playerUnitScore(p, ['ST','LA','RA','OM'].includes(p.pos) ? 'attack' : ['IV','LV','RV','DM','TW'].includes(p.pos) ? 'defense' : 'control') - 60) / 120 - mod.total / 35 + ((stableHash(p.name + state.week) % 9) - 4) / 20)) : p.rating;
    const roundedRating = Math.round(rating * 10) / 10;
    const goals = ownEvents.filter(e => String(e.scorerId) === String(p.id)).length;
    const assists = ownEvents.filter(e => String(e.assistId) === String(p.id) && String(e.assistId) !== String(e.scorerId)).length;
    const oldSatisfaction = typeof p.satisfaction === 'number' ? p.satisfaction : 60;
    let satisfactionChange = minutes >= 70 ? 6 : minutes >= 20 ? 2 : -5;
    if (minutes && roundedRating <= 2.3) satisfactionChange += 2;
    if (minutes && roundedRating >= 3.6) satisfactionChange -= 2;
    const noPlayWeeks = minutes ? 0 : (p.noPlayWeeks || 0) + 1;
    if (noPlayWeeks >= 6) satisfactionChange -= 2;
    return { ...p, minutes, rating: roundedRating, satisfaction: clamp(oldSatisfaction + satisfactionChange, 0, 100), noPlayWeeks, seasonGoals: (p.seasonGoals||0)+goals, seasonAssists:(p.seasonAssists||0)+assists, seasonPoints:(p.seasonPoints||0)+goals+assists, seasonRatingSum:(p.seasonRatingSum||0)+(minutes?roundedRating:0), seasonRatingGames:(p.seasonRatingGames||0)+(minutes?1:0) };
  });
  m.events.filter(e=>e.team==='opp').forEach(e => {
    const id = `opp-${m.opponent}-${e.scorerName}`;
    let stat = state.externalPlayerStats.find(s=>s.id===id);
    if (!stat) { stat = { id, name:e.scorerName, club:m.opponent, goals:0, assists:0, points:0 }; state.externalPlayerStats.push(stat); }
    stat.goals += 1; stat.points += 1;
    if (e.assistName) {
      const aid = `opp-${m.opponent}-${e.assistName}`;
      let ast = state.externalPlayerStats.find(s=>s.id===aid);
      if (!ast) { ast = { id:aid, name:e.assistName, club:m.opponent, goals:0, assists:0, points:0 }; state.externalPlayerStats.push(ast); }
      ast.assists += 1; ast.points += 1;
    }
  });
}
function simulateOtherLeagueResults(opponent) {
  const clubs = CURRENT_TABLE.map(r=>r.club).filter(c=>c!==ownClubName() && c!==opponent);
  const results = [];
  for (let i=0; i<clubs.length; i+=2) {
    const home = clubs[i], away = clubs[i+1];
    if (!home || !away) continue;
    const hg = stableHash(home + state.week) % 4;
    const ag = stableHash(away + state.week + 'x') % 3;
    results.push({ home, away, hg, ag });
    const hr = CURRENT_TABLE.find(r=>r.club===home), ar = CURRENT_TABLE.find(r=>r.club===away);
    if (hr && ar) {
      hr.played++; ar.played++; hr.diff += hg-ag; ar.diff += ag-hg;
      if (hg>ag) hr.points+=3; else if (ag>hg) ar.points+=3; else {hr.points++; ar.points++;}
    }
  }
  return results;
}
function finishActiveMatch() {
  const m = state.activeMatch;
  if (!m || m.finishedApplied) return;
  const opponent = m.opponent;
  const ownRow = CURRENT_TABLE.find(r => r.own);
  const oppRow = CURRENT_TABLE.find(r => r.club === opponent) || CURRENT_TABLE.find(r => !r.own);
  const ownGoals = m.score.ownGoals, oppGoals = m.score.oppGoals;
  if (ownRow && oppRow) {
    ownRow.played += 1; oppRow.played += 1;
    ownRow.diff += ownGoals - oppGoals; oppRow.diff += oppGoals - ownGoals;
    if (ownGoals > oppGoals) ownRow.points += 3; else if (ownGoals < oppGoals) oppRow.points += 3; else { ownRow.points += 1; oppRow.points += 1; }
  }
  const other = simulateOtherLeagueResults(opponent);
  CURRENT_TABLE.sort((a,b)=>b.points-a.points||b.diff-a.diff).forEach((r,i)=>r.pos=i+1);
  updatePlayerSeasonStatsFromMatch();
  updateClubImageTrend();
  state.matchPlayedWeek = state.week;
  state.lastMatchReport = { opponent, score:`${ownGoals}:${oppGoals}`, ownGoals, oppGoals, tacticBonus:m.score.mod.total, skillSynergy:m.score.mod.skillSynergy, positionPenalty:m.score.positionPenalty, ownPower:m.score.ownPower, oppPower:m.score.oppPower, units:m.score.unit, text: ownGoals > oppGoals ? 'Sieg' : ownGoals === oppGoals ? 'Unentschieden' : 'Niederlage' };
  state.lastMatchdayResults = [{ home: ownClubName(), away: opponent, hg: ownGoals, ag: oppGoals }, ...other];
  m.finishedApplied = true;
}
function nextWeek() {
  const nextDatePreview = new Date(currentGameDate());
  nextDatePreview.setDate(nextDatePreview.getDate() + (7 - (state.dayOffset || 0)));
  const focus = state.autoTraining ? assistantTraining() : state.trainingFocus;
  state.trainingFocus = focus;
  state.week += 1;
  state.dayOffset = 0;
  state.tab = 'dashboard';
  state.activeMatch = null;
  progressConstruction();
  processScoutingJobs(7);
  pruneScoutedPlayerHistory();
  state.players = state.players.map(player => {
    const gain = calcDevelopment(player, focus);
    let progress = player.progress + gain;
    let updated = player;
    while (progress >= 100 && updated.strength < 100) { updated = improvePlayerSkills(updated, 1); progress -= 100; }
    return { ...updated, progress: Math.round(progress) };
  });
  developAcademyPlayers(focus);
  processContractYearEnd();
  maybeDiscoverYouthPlayer();
  if (finishSeasonIfNeeded(nextDatePreview)) { render(); return; }
  render();
}
function matchStatRows(stats) {
  return `<div class="financeGrid"><div><span>Ballbesitz</span><b>${stats.possession}% : ${100-stats.possession}%</b></div><div><span>Schüsse</span><b>${stats.shotsOwn} : ${stats.shotsOpp}</b></div><div><span>xG</span><b>${stats.xgOwn} : ${stats.xgOpp}</b></div><div><span>Spielstand</span><b>${stats.ownGoals} : ${stats.oppGoals}</b></div></div>`;
}
function halftimeSubControls() {
  const benchOptions = Object.values(state.bench||{}).filter(Boolean).map(id => {
    const p = state.players.find(x=>x.id===Number(id));
    return p ? `<option value="${p.id}">${p.name} · ${p.pos} · ${p.strength}</option>` : '';
  }).join('');
  if (!benchOptions) return '<div class="infoBox">Keine Bankspieler verfügbar.</div>';
  return lineupEntries().map(entry => `<label class="fieldLabel">${entry.slot.pos}: ${entry.player.name}<select onchange="liveSubstitute('${entry.slot.id}', this.value)"><option value="">kein Wechsel</option>${benchOptions}</select></label>`).join('');
}
function matchScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein aktives Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const scoreNow = m.phase === 'firstReady' ? '0:0' : m.phase === 'halftime' ? `${m.halftimeStats.ownGoals}:${m.halftimeStats.oppGoals}` : `${m.score.ownGoals}:${m.score.oppGoals}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('');
  if (m.phase === 'firstReady') return `<section class="panel matchPanel"><p class="eyebrow">Spielscreen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${scoreNow}</b><span>${formatGermanDate(nextMatchDate())}</span></div><button class="primary full" onclick="simulateFirstHalf()">1. Halbzeit simulieren</button></section>`;
  if (m.phase === 'halftime') return `<section class="panel matchPanel"><p class="eyebrow">Halbzeit</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${scoreNow}</b><span>Halbzeitpause</span></div>${matchStatRows(m.halftimeStats)}<h3>Minutenverlauf</h3><ol class="matchLog">${log}</ol><h3>Wechsel & Taktik</h3><div class="infoBox">Zur Halbzeit kannst du Spieler wechseln und die Taktik anpassen.</div><div class="subGrid">${halftimeSubControls()}</div>${tacticsView()}<button class="primary full" onclick="simulateSecondHalf()">2. Halbzeit starten</button></section>`;
  return `<section class="panel matchPanel"><p class="eyebrow">Abpfiff</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${m.score.ownGoals}:${m.score.oppGoals}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Minutenverlauf</h3><ol class="matchLog">${log}</ol><h3>Spieltag</h3><div class="leagueList">${state.lastMatchdayResults.map(r=>`<div class="league"><strong>${r.home} - ${r.away}</strong><span>${r.hg}:${r.ag}</span></div>`).join('')}</div><div class="modalActions"><button class="ghost full" onclick="goTo('season','table')">Zur Tabelle</button><button class="ghost full" onclick="goTo('season','playerStats')">Spielerstatistiken</button><button class="primary full" onclick="setTab('dashboard')">Zur Home-Seite</button></div></section>`;
}
function statPlayerRows(mode) {
  const own = state.players.map(p => ({ id:p.id, name:p.name, club:ownClubName(), goals:p.seasonGoals||0, assists:p.seasonAssists||0, points:(p.seasonGoals||0)+(p.seasonAssists||0), avg:p.seasonRatingGames ? Math.round((p.seasonRatingSum/p.seasonRatingGames)*10)/10 : 0, own:true }));
  const ext = (state.externalPlayerStats||[]).map(s => ({ ...s, avg:0, own:false }));
  let list = [...own, ...ext];
  if (mode === 'assists') list.sort((a,b)=>(b.assists||0)-(a.assists||0));
  else if (mode === 'points') list.sort((a,b)=>(b.points||0)-(a.points||0));
  else if (mode === 'ratings') list = own.filter(p=>p.avg).sort((a,b)=>a.avg-b.avg);
  else list.sort((a,b)=>(b.goals||0)-(a.goals||0));
  return list.slice(0,30).map((p,i)=>`<tr class="clickableRow" onclick="${p.own ? `openOwnPlayerProfile(${p.id})` : ''}"><td>${i+1}</td><td>${p.name}</td><td>${p.club}</td><td>${p.goals||0}</td><td>${p.assists||0}</td><td>${p.points||0}</td><td>${p.avg||'-'}</td></tr>`).join('');
}
function setPlayerStatsMode(mode) { state.playerStatsMode = mode; render(); }
function openOwnPlayerProfile(id) {
  const p = state.players.find(x=>x.id===Number(id));
  if (!p) return;
  state.playerProfile = { ...p, club: ownClubName(), leagueIndex: OWN_LEAGUE_INDEX };
  render();
}
function playerStatsView() {
  const mode = state.playerStatsMode || 'goals';
  return `<section class="panel"><p class="eyebrow">Saison · Spielerstatistiken</p><h2>Spielerstatistiken</h2><div class="chips"><button class="chip ${mode==='goals'?'selected':''}" onclick="setPlayerStatsMode('goals')">Torschützen</button><button class="chip ${mode==='assists'?'selected':''}" onclick="setPlayerStatsMode('assists')">Vorlagengeber</button><button class="chip ${mode==='points'?'selected':''}" onclick="setPlayerStatsMode('points')">Punktebeste</button><button class="chip ${mode==='ratings'?'selected':''}" onclick="setPlayerStatsMode('ratings')">Noten</button></div><div class="infoBox">Eigene Spieler sind antippbar und öffnen das Spielerprofil. Externe Spieler werden hier gesammelt, sobald sie in simulierten Spieltagen auftauchen.</div><div class="tableWrap"><table><thead><tr><th>#</th><th>Spieler</th><th>Verein</th><th>Tore</th><th>Vorlagen</th><th>Punkte</th><th>Ø Note</th></tr></thead><tbody>${statPlayerRows(mode)}</tbody></table></div></section>`;
}
function season() {
  const content = state.seasonSection === 'calendar' ? calendarView() : state.seasonSection === 'table' ? tableView() : state.seasonSection === 'playerStats' ? playerStatsView() : state.seasonSection === 'schedule' ? scheduleView() : state.seasonSection === 'world' ? worldView() : state.seasonSection === 'leagueTable' ? leagueTableView() : state.seasonSection === 'clubRoster' ? clubRosterView() : internationalView();
  return `<section class="teamSubnav"><div class="chips">${seasonSubButton('calendar', 'Kalender')}${seasonSubButton('table', 'Tabelle')}${seasonSubButton('playerStats', 'Spielerstatistiken')}${seasonSubButton('schedule', 'Spielplan')}${seasonSubButton('world', 'Ligen')}${seasonSubButton('international', 'Europa')}</div></section>${content}`;
}
function render() {
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); return; }
  const content = state.tab === 'dashboard' ? dashboard() : state.tab === 'team' ? team() : state.tab === 'market' ? market() : state.tab === 'scouting' ? scouting() : state.tab === 'club' ? club() : state.tab === 'environment' ? environment() : state.tab === 'match' ? matchScreen() : season();
  document.getElementById('app').innerHTML = `<div class="appShell">
    <header class="hero">
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b></p></div>
      <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
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
    ${matchDayModal()}
    ${youthDiscoveryModal()}
    ${playerProfileModal()}
  </div>`;
}


// ===== Version 35: Dynamischer Spielscreen, verlinkte Spieltagsvorschau, Ereignislog =====
function ownTopScorer() {
  const p = [...state.players].filter(x => (x.seasonGoals || 0) > 0).sort((a,b)=>(b.seasonGoals||0)-(a.seasonGoals||0))[0];
  return p || null;
}
function ownTopAssistant() {
  const p = [...state.players].filter(x => (x.seasonAssists || 0) > 0).sort((a,b)=>(b.seasonAssists||0)-(a.seasonAssists||0))[0];
  return p || null;
}
function externalTopStat(club, key) {
  const p = (state.externalPlayerStats || []).filter(x => x.club === club && (x[key] || 0) > 0).sort((a,b)=>(b[key]||0)-(a[key]||0))[0];
  return p || null;
}
function linkedOwnName(p) {
  if (!p) return '-';
  return `<button class="inlineLink" onclick="openOwnPlayerProfile(${p.id})">${p.name}</button>`;
}
function linkedExternalName(p, clubName, leagueIndex = OWN_LEAGUE_INDEX) {
  if (!p) return '-';
  return `<button class="inlineLink" onclick="openPlayerProfile('${p.id}', '${clubName}', ${leagueIndex})">${p.name}</button>`;
}
function linkedStatName(stat) {
  if (!stat) return '-';
  return `<button class="inlineLink" onclick="goTo('season','playerStats')">${stat.name}</button>`;
}
function openOwnSquadFromMatch() {
  state.tab = 'team';
  state.teamSection = 'general';
  state.matchDayModal = null;
  render();
}
function openOpponentSquadFromMatch(clubName) {
  state.matchDayModal = null;
  openClubRoster(clubName, OWN_LEAGUE_INDEX);
}
function makeSpecialMatchEvents(opponent) {
  const events = [];
  const starters = lineupPlayers();
  const opp = opponentRosterForMatch(opponent);
  const ownCandidate = starters[(stableHash('injp' + state.week) % Math.max(1, starters.length))] || starters[0];
  const ownRed = starters[(stableHash('redp' + state.week) % Math.max(1, starters.length))] || starters[1] || starters[0];
  const oppCard = opp[(stableHash('oppcardp' + state.week) % Math.max(1, opp.length))];
  const ownPenalty = starters.find(p => ['ST','LA','RA','OM'].includes(p.pos)) || starters[0];
  if (ownCandidate && stableHash('injury-own-' + state.week) % 8 === 0) {
    const minute = 15 + (stableHash('injmin' + state.week) % 55);
    events.push({ minute, team:'own', type:'injury', playerId:ownCandidate.id, playerName:ownCandidate.name, text:`${minute}. Min: Verletzung bei ${ownClubName()}: ${ownCandidate.name} muss behandelt werden.` });
  }
  if (ownRed && stableHash('red-own-' + state.week) % 10 === 0) {
    const minute = 25 + (stableHash('redmin' + state.week) % 50);
    events.push({ minute, team:'own', type:'red', playerId:ownRed.id, playerName:ownRed.name, text:`${minute}. Min: Rote Karte für ${ownRed.name}!` });
  }
  if (oppCard && stableHash('yellow-opp-' + state.week) % 3 === 0) {
    const minute = 12 + (stableHash('yellowmin' + state.week) % 70);
    events.push({ minute, team:'opp', type:'yellow', playerName:oppCard.name, text:`${minute}. Min: Gelbe Karte für ${oppCard.name} (${opponent}).` });
  }
  if (ownPenalty && stableHash('penmiss-own-' + state.week) % 9 === 0) {
    const minute = 20 + (stableHash('penmin' + state.week) % 55);
    events.push({ minute, team:'own', type:'penaltyMiss', playerId:ownPenalty.id, playerName:ownPenalty.name, text:`${minute}. Min: ${ownPenalty.name} verschießt einen Elfmeter!` });
  }
  return events;
}
function createGoalEvents(ownGoals, oppGoals, opponent) {
  const ownAttackers = lineupPlayers().filter(p => ['ST','LA','RA','OM','ZM'].includes(p.pos));
  const ownPool = ownAttackers.length ? ownAttackers : lineupPlayers();
  const oppPool = opponentRosterForMatch(opponent).filter(p => ['ST','LA','RA','OM','ZM'].includes(p.pos));
  const events = [];
  for (let i=0;i<ownGoals;i++) {
    const minute = 8 + ((stableHash('own'+state.week+i) % 82));
    const scorer = ownPool[i % Math.max(1, ownPool.length)];
    const assister = ownPool[(i + 2) % Math.max(1, ownPool.length)];
    events.push({ minute, team:'own', type:'goal', text:`${minute}. Min: Tor für ${ownClubName()}! ${scorer?.name || 'Spieler'} trifft.`, scorerId: scorer?.id, scorerName: scorer?.name, assistId: assister?.id, assistName: assister?.name });
  }
  for (let i=0;i<oppGoals;i++) {
    const minute = 10 + ((stableHash('opp'+state.week+i) % 80));
    const scorer = oppPool[i % Math.max(1, oppPool.length)];
    const assister = oppPool[(i + 1) % Math.max(1, oppPool.length)];
    events.push({ minute, team:'opp', type:'goal', text:`${minute}. Min: Tor für ${opponent}. ${scorer?.name || 'Gegner'} trifft.`, scorerName: scorer?.name, assistName: assister?.name, club: opponent });
  }
  return [...events, ...makeSpecialMatchEvents(opponent)].sort((a,b)=>a.minute-b.minute || (a.type === 'goal' ? -1 : 1));
}
function openMatchDayModal() {
  state.dayOffset = 5;
  const opponent = currentOpponentName();
  const ownPlayers = lineupPlayers().length ? lineupPlayers() : state.players.slice(0,11);
  const oppPlayers = opponentRosterForMatch(opponent);
  state.matchDayModal = {
    opponent,
    date: formatGermanDate(nextMatchDate()),
    ownStrength: Math.round(lineupStrength() || 0),
    oppStrength: opponentTeamStrength(opponent),
    ownBest: teamBestPlayer(ownPlayers),
    oppBest: teamBestPlayer(oppPlayers),
    ownValue: teamMostValuable(ownPlayers),
    oppValue: teamMostValuable(oppPlayers),
    ownScorer: ownTopScorer(),
    ownAssistant: ownTopAssistant(),
    oppScorer: externalTopStat(opponent, 'goals'),
    oppAssistant: externalTopStat(opponent, 'assists')
  };
  state.tab = 'dashboard';
  render();
}
function matchDayModal() {
  const m = state.matchDayModal;
  if (!m) return '';
  return `<div class="modalBackdrop" role="dialog" aria-modal="true">
    <div class="modalBox">
      <div class="modalHeader"><div><p class="eyebrow">${m.date}</p><h2>Spieltag</h2></div><span class="requiredBadge">Ligaspiel</span></div>
      <p class="modalIntro">Alle Spiele der Liga finden heute statt. Hier siehst du die Vorschau beider Teams.</p>
      <div class="matchPreviewGrid">
        <article class="teamPreview"><p class="eyebrow">Heimteam</p><h3>${ownClubName()}</h3><b>Gesamtstärke ${m.ownStrength}/100</b><span>Bester Spieler: ${linkedOwnName(m.ownBest)} (${m.ownBest?.strength || 0})</span><span>Teuerster Spieler: ${linkedOwnName(m.ownValue)} · ${euro(m.ownValue?.marketValue || 0)}</span><span>Bester Torschütze: ${linkedOwnName(m.ownScorer)}${m.ownScorer ? ` · ${m.ownScorer.seasonGoals||0} Tore` : ''}</span><span>Bester Vorlagengeber: ${linkedOwnName(m.ownAssistant)}${m.ownAssistant ? ` · ${m.ownAssistant.seasonAssists||0} Vorlagen` : ''}</span><button class="ghost full" onclick="openOwnSquadFromMatch()">Zum Kader</button></article>
        <article class="teamPreview"><p class="eyebrow">Auswärtsteam</p><h3>${m.opponent}</h3><b>Gesamtstärke ${m.oppStrength}/100</b><span>Bester Spieler: ${linkedExternalName(m.oppBest, m.opponent)} (${m.oppBest?.strength || 0})</span><span>Teuerster Spieler: ${linkedExternalName(m.oppValue, m.opponent)} · ${euro(m.oppValue?.marketValue || 0)}</span><span>Bester Torschütze: ${linkedStatName(m.oppScorer)}${m.oppScorer ? ` · ${m.oppScorer.goals||0} Tore` : ''}</span><span>Bester Vorlagengeber: ${linkedStatName(m.oppAssistant)}${m.oppAssistant ? ` · ${m.oppAssistant.assists||0} Vorlagen` : ''}</span><button class="ghost full" onclick="openOpponentSquadFromMatch('${m.opponent}')">Zum Kader</button></article>
      </div>
      <div class="modalActions"><button class="ghost full" onclick="state.matchDayModal=null;render()">Noch nicht</button><button class="primary full" onclick="startMatchScreen()">Weiter zum Spielscreen</button></div>
    </div>
  </div>`;
}
function startMatchScreen() {
  const opponent = state.matchDayModal?.opponent || currentOpponentName();
  const score = predictedMatchScore(opponent);
  const events = createGoalEvents(score.ownGoals, score.oppGoals, opponent);
  state.activeMatch = { opponent, score, events, phase:'firstReady', currentMinute:0, liveScore:{own:0, opp:0}, log:[], processedEventKeys:[], subs:[], halftimeStats: null, fullStats: null, interruption:null };
  state.matchDayModal = null;
  state.tab = 'match';
  render();
}
function stopMatchTimer() {
  if (window.hfmMatchTimer) { clearInterval(window.hfmMatchTimer); window.hfmMatchTimer = null; }
}
function eventKey(e) { return `${e.minute}-${e.type}-${e.team}-${e.playerId||e.scorerName||e.playerName||''}`; }
function processLiveMinuteEvents() {
  const m = state.activeMatch;
  if (!m) return false;
  const events = (m.events || []).filter(e => e.minute === m.currentMinute && !(m.processedEventKeys || []).includes(eventKey(e)));
  for (const e of events) {
    m.processedEventKeys.push(eventKey(e));
    m.log.push(e.text);
    if (e.type === 'goal') {
      if (e.team === 'own') m.liveScore.own += 1;
      else m.liveScore.opp += 1;
    }
    if (e.team === 'own' && (e.type === 'injury' || e.type === 'red')) {
      stopMatchTimer();
      m.phase = 'interrupted';
      m.interruption = { type:e.type, minute:e.minute, playerId:e.playerId, playerName:e.playerName, text:e.text, half: m.currentMinute <= 45 ? 1 : 2 };
      render();
      return true;
    }
  }
  return false;
}
function startLiveHalf(half) {
  const m = state.activeMatch;
  if (!m) return;
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!m.currentMinute || m.currentMinute < 1)) m.currentMinute = 0;
  if (half === 2 && m.currentMinute < 46) m.currentMinute = 45;
  m.phase = 'live';
  m.liveHalf = half;
  render();
  window.hfmMatchTimer = setInterval(() => {
    const match = state.activeMatch;
    if (!match || match.phase !== 'live') { stopMatchTimer(); return; }
    match.currentMinute += 1;
    if (processLiveMinuteEvents()) return;
    if (match.currentMinute >= endMinute) {
      stopMatchTimer();
      if (half === 1) {
        match.halftimeStats = matchStatsForHalf(45);
        match.phase = 'halftime';
      } else {
        match.fullStats = matchStatsForHalf(90);
        finishActiveMatch();
        match.phase = 'finished';
      }
    }
    render();
  }, 280);
}
function simulateFirstHalf() { startLiveHalf(1); }
function simulateSecondHalf() { startLiveHalf(2); }
function continueAfterInterruption() {
  if (!state.activeMatch) return;
  const half = state.activeMatch.currentMinute <= 45 ? 1 : 2;
  state.activeMatch.interruption = null;
  startLiveHalf(half);
}
function formationButtonsForMatch() {
  return Object.keys(FORMATIONS).map(f => `<button class="chip ${state.formation===f?'selected':''}" onclick="setFormation('${f}')">${f}</button>`).join('');
}
function halftimeChangeScreen() {
  return `<h3>Formation ändern</h3><div class="chips">${formationButtonsForMatch()}</div><h3>Wechsel</h3><div class="subGrid">${halftimeSubControls()}</div><h3>Taktik anpassen</h3>${tacticsView()}`;
}
function matchScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein aktives Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const finalScore = `${m.score.ownGoals}:${m.score.oppGoals}`;
  const scoreNow = m.phase === 'finished' ? finalScore : liveScore;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Noch keine besonderen Ereignisse.</li>';
  if (m.phase === 'firstReady') return `<section class="panel matchPanel"><p class="eyebrow">Spielscreen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>0:0</b><span>${formatGermanDate(nextMatchDate())}</span></div><div class="infoBox">Im Minutenverlauf erscheinen nur wichtige Ereignisse: Tore, Verletzungen, Karten und verschossene Elfmeter.</div><button class="primary full" onclick="simulateFirstHalf()">Spiel starten</button></section>`;
  if (m.phase === 'live') return `<section class="panel matchPanel"><p class="eyebrow">${m.liveHalf === 1 ? '1. Halbzeit' : '2. Halbzeit'}</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${scoreNow}</b><span>${m.currentMinute}. Minute läuft</span></div><h3>Minutenverlauf</h3><ol class="matchLog">${log}</ol></section>`;
  if (m.phase === 'interrupted') return `<section class="panel matchPanel"><p class="eyebrow">Spielunterbrechung · ${m.interruption?.minute}. Minute</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${scoreNow}</b><span>${m.interruption?.type === 'red' ? 'Rote Karte' : 'Verletzung'}</span></div><div class="infoBox">${m.interruption?.text}<br>Das Spiel ist gestoppt. Passe deine Aufstellung an und setze das Spiel danach fort.</div>${halftimeChangeScreen()}<button class="primary full" onclick="continueAfterInterruption()">Spiel fortsetzen</button></section>`;
  if (m.phase === 'halftime') return `<section class="panel matchPanel"><p class="eyebrow">Halbzeit</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>Halbzeitpause</span></div>${matchStatRows(m.halftimeStats)}<h3>Minutenverlauf</h3><ol class="matchLog">${log}</ol><div class="infoBox">Neuer Halbzeit-Screen: Formation, Wechsel und Taktik können jetzt angepasst werden.</div>${halftimeChangeScreen()}<button class="primary full" onclick="simulateSecondHalf()">2. Halbzeit starten</button></section>`;
  return `<section class="panel matchPanel"><p class="eyebrow">Abpfiff</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Minutenverlauf</h3><ol class="matchLog">${log}</ol><h3>Spieltag</h3><div class="leagueList">${state.lastMatchdayResults.map(r=>`<div class="league"><strong>${r.home} - ${r.away}</strong><span>${r.hg}:${r.ag}</span></div>`).join('')}</div><div class="modalActions"><button class="ghost full" onclick="goTo('season','table')">Zur Tabelle</button><button class="ghost full" onclick="goTo('season','playerStats')">Torschützen/Vorlagengeber</button><button class="ghost full" onclick="goTo('season','playerStats')">Spieltag-Statistiken</button><button class="primary full" onclick="setTab('dashboard')">Zur Home-Seite</button></div></section>`;
}

ensurePlayerContracts();
initV32Features();
ensurePlayerSkills();
initLineup();
render();

// ===== Version 36: Kaderlinks repariert & Optionen mit Simulationsgeschwindigkeit =====
function initV36Features() {
  state.options = state.options || { simulationSpeed: 'slow' };
}
function setSimulationSpeed(speed) {
  state.options = state.options || {};
  state.options.simulationSpeed = speed;
  render();
}
function simulationSpeedLabel() {
  const s = state.options?.simulationSpeed || 'slow';
  return s === 'normal' ? 'Normal' : s === 'fast' ? 'Schnell' : s === 'instant' ? 'Sofort' : 'Langsam';
}
function simulationIntervalMs() {
  const s = state.options?.simulationSpeed || 'slow';
  if (s === 'normal') return 120;
  if (s === 'fast') return 45;
  return 280;
}
function optionsView() {
  const speed = state.options?.simulationSpeed || 'slow';
  const speedButton = (id, title, desc) => `<button class="league clickableLeague ${speed === id ? 'selectedOption' : ''}" onclick="setSimulationSpeed('${id}')"><strong>${title}</strong><span>${desc}</span></button>`;
  return `<section class="panel"><p class="eyebrow">Optionen</p><h2>Spieleinstellungen</h2><div class="infoBox">Hier stellst du ein, wie schnell die Spielsimulation abläuft. Die aktuelle Einstellung ist <b>${simulationSpeedLabel()}</b>.</div><div class="leagueList">
    ${speedButton('slow', 'Langsam', 'Minuten laufen bewusst langsamer durch. Gut zum Mitfiebern.')}
    ${speedButton('normal', 'Normal', 'Deutlich schneller, aber der Spielverlauf bleibt sichtbar.')}
    ${speedButton('fast', 'Schnell', 'Sehr schnelle Minutenfolge für zügige Spiele.')}
    ${speedButton('instant', 'Sofort', 'Ein Klick bringt dich direkt zur Halbzeit bzw. danach zum Endstand.')}
  </div></section>`;
}
function navButton(id, icon, label) {
  return `<button class="${state.tab === id ? 'active' : ''}" onclick="setTab('${id}')"><b>${icon}</b><span>${label}</span></button>`;
}
function openOwnSquadFromMatch() {
  state.matchDayModal = null;
  state.viewedClub = { clubName: ownClubName(), leagueIndex: OWN_LEAGUE_INDEX, own: true };
  state.tab = 'season';
  state.seasonSection = 'clubRoster';
  render();
}
function openOpponentSquadFromMatch(clubName) {
  state.matchDayModal = null;
  state.viewedClub = { clubName, leagueIndex: OWN_LEAGUE_INDEX, own: false };
  state.tab = 'season';
  state.seasonSection = 'clubRoster';
  render();
}
function clubRosterView() {
  const viewed = state.viewedClub || { clubName: 'SV Nordheim', leagueIndex: OWN_LEAGUE_INDEX, own: false };
  const isOwn = viewed.own || viewed.clubName === ownClubName();
  const league = LEAGUES[viewed.leagueIndex] || LEAGUES[OWN_LEAGUE_INDEX];
  const roster = isOwn ? state.players : getClubRoster(viewed.clubName, viewed.leagueIndex);
  const known = isOwn || isClubScouted(viewed.clubName, viewed.leagueIndex);
  const players = roster.map(p => {
    const playerKnown = isOwn || known || isPlayerScouted(p.id);
    const action = isOwn ? `openOwnPlayerProfile(${p.id})` : `openPlayerProfile('${p.id}', '${viewed.clubName}', ${viewed.leagueIndex})`;
    return `<button class="player clickablePlayer" onclick="${action}"><div class="playerTop"><strong>${p.name}</strong><span>${positionText(p)} · ${p.age} Jahre</span></div><div class="meta">${playerKnown ? knownPlayerMeta(p) : unknownPlayerMeta()}</div></button>`;
  }).join('');
  const info = isOwn ? `${league.league} · ${league.country}. Das ist dein aktueller Profikader.` : `${league.league} · ${league.country}. Image: national ${getClubImage(viewed.clubName, viewed.leagueIndex).national}/100 · international ${getClubImage(viewed.clubName, viewed.leagueIndex).international}/100. ${known ? 'Dieser Kader ist gescoutet: alle Spielerwerte sind sichtbar.' : 'Dieser Kader ist noch nicht gescoutet: du siehst nur Name, Alter und Position.'}`;
  const scoutButton = (isOwn || known) ? '' : `<button class="primary full" ${scoutingJobStatusText('club', { clubName: viewed.clubName, leagueIndex: viewed.leagueIndex }) ? 'disabled' : ''} onclick="scoutClub('${viewed.clubName}', ${viewed.leagueIndex})">${scoutingJobStatusText('club', { clubName: viewed.clubName, leagueIndex: viewed.leagueIndex }) || `Diesen Verein scouten · ${euro(scoutClubCost(viewed.clubName, viewed.leagueIndex))}`}</button>`;
  return `<section class="panel"><p class="eyebrow">Verein · Kader</p><h2>${viewed.clubName}</h2><div class="infoBox">${info}</div>${scoutButton}<div class="playerList">${players}</div></section>`;
}
function runHalfInstant(half) {
  const m = state.activeMatch;
  if (!m) return;
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!m.currentMinute || m.currentMinute < 1)) m.currentMinute = 0;
  if (half === 2 && m.currentMinute < 46) m.currentMinute = 45;
  m.phase = 'live';
  m.liveHalf = half;
  while (m.currentMinute < endMinute) {
    m.currentMinute += 1;
    if (processLiveMinuteEvents()) return;
  }
  if (half === 1) {
    m.halftimeStats = matchStatsForHalf(45);
    m.phase = 'halftime';
  } else {
    m.fullStats = matchStatsForHalf(90);
    finishActiveMatch();
    m.phase = 'finished';
  }
  render();
}
function startLiveHalf(half) {
  const m = state.activeMatch;
  if (!m) return;
  if ((state.options?.simulationSpeed || 'slow') === 'instant') { runHalfInstant(half); return; }
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!m.currentMinute || m.currentMinute < 1)) m.currentMinute = 0;
  if (half === 2 && m.currentMinute < 46) m.currentMinute = 45;
  m.phase = 'live';
  m.liveHalf = half;
  render();
  window.hfmMatchTimer = setInterval(() => {
    const match = state.activeMatch;
    if (!match || match.phase !== 'live') { stopMatchTimer(); return; }
    match.currentMinute += 1;
    if (processLiveMinuteEvents()) return;
    if (match.currentMinute >= endMinute) {
      stopMatchTimer();
      if (half === 1) {
        match.halftimeStats = matchStatsForHalf(45);
        match.phase = 'halftime';
      } else {
        match.fullStats = matchStatsForHalf(90);
        finishActiveMatch();
        match.phase = 'finished';
      }
    }
    render();
  }, simulationIntervalMs());
}
function render() {
  initV36Features();
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); return; }
  const content = state.tab === 'dashboard' ? dashboard() : state.tab === 'team' ? team() : state.tab === 'market' ? market() : state.tab === 'scouting' ? scouting() : state.tab === 'club' ? club() : state.tab === 'environment' ? environment() : state.tab === 'match' ? matchScreen() : state.tab === 'options' ? optionsView() : season();
  document.getElementById('app').innerHTML = `<div class="appShell">
    <header class="hero">
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b></p></div>
      <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
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
      ${navButton('options', '⚙️', 'Optionen')}
    </nav>
    ${seasonEndModal()}
    ${seasonStartModal()}
    ${sponsorModal()}
    ${matchDayModal()}
    ${youthDiscoveryModal()}
    ${playerProfileModal()}
  </div>`;
}

initV36Features();


// ===== Version 37: getrennte Halbzeit-/Endmasken & jedes Spiel neu simuliert =====
function randomBetween(min, max) { return min + Math.random() * (max - min); }
function randomInt(min, max) { return Math.floor(randomBetween(min, max + 1)); }
function predictedMatchScore(opponent) {
  const oppRow = CURRENT_TABLE.find(r => r.club === opponent) || CURRENT_TABLE.find(r => !r.own);
  const mod = tacticModifier();
  const positionPenalty = lineupPenaltyCount() * 2;
  const unit = lineupUnitScores();
  const ownPower = lineupStrength() * 0.55 + unit.attack * 0.16 + unit.control * 0.13 + unit.defense * 0.16 + mod.total - positionPenalty + 3 + randomBetween(-5, 5);
  const oppPower = 55 + (oppRow?.points || 10) * 0.9 + randomBetween(-6, 6);
  const diff = ownPower - oppPower;
  const ownExpected = clamp(1.25 + diff / 18 + (unit.attack - 58) / 30 + mod.attack / 11 + randomBetween(-0.75, 0.9), 0.05, 4.7);
  const oppExpected = clamp(1.25 - diff / 20 - (unit.defense - 58) / 34 - mod.defense / 13 + Math.max(0, mod.risk) / 5 + randomBetween(-0.65, 0.95), 0.05, 4.6);
  const convert = x => Math.max(0, Math.min(6, Math.round(x + randomBetween(-0.55, 0.55))));
  return { ownGoals: convert(ownExpected), oppGoals: convert(oppExpected), ownPower: Math.round(ownPower), oppPower: Math.round(oppPower), mod, positionPenalty, unit };
}
function makeSpecialMatchEvents(opponent) {
  const events = [];
  const starters = lineupPlayers();
  const opp = opponentRosterForMatch(opponent);
  const ownCandidate = starters[randomInt(0, Math.max(0, starters.length - 1))] || starters[0];
  const ownRed = starters[randomInt(0, Math.max(0, starters.length - 1))] || starters[1] || starters[0];
  const oppCard = opp[randomInt(0, Math.max(0, opp.length - 1))];
  const ownPenalty = starters.find(p => ['ST','LA','RA','OM'].includes(p.pos)) || starters[0];
  if (ownCandidate && Math.random() < 0.08) {
    const minute = randomInt(15, 75);
    events.push({ minute, team:'own', type:'injury', playerId:ownCandidate.id, playerName:ownCandidate.name, text:`${minute}. Min: Verletzung bei ${ownClubName()}: ${ownCandidate.name} muss raus.` });
  }
  if (ownRed && Math.random() < 0.06) {
    const minute = randomInt(25, 82);
    events.push({ minute, team:'own', type:'red', playerId:ownRed.id, playerName:ownRed.name, text:`${minute}. Min: Rote Karte fuer ${ownRed.name}!` });
  }
  if (oppCard && Math.random() < 0.35) {
    const minute = randomInt(12, 84);
    events.push({ minute, team:'opp', type:'yellow', playerName:oppCard.name, text:`${minute}. Min: Gelbe Karte fuer ${oppCard.name} (${opponent}).` });
  }
  if (ownPenalty && Math.random() < 0.08) {
    const minute = randomInt(20, 78);
    events.push({ minute, team:'own', type:'penaltyMiss', playerId:ownPenalty.id, playerName:ownPenalty.name, text:`${minute}. Min: ${ownPenalty.name} verschiesst einen Elfmeter!` });
  }
  return events;
}
function createGoalEvents(ownGoals, oppGoals, opponent) {
  const ownAttackers = lineupPlayers().filter(p => ['ST','LA','RA','OM','ZM'].includes(p.pos));
  const ownPool = ownAttackers.length ? ownAttackers : lineupPlayers();
  const oppPoolRaw = opponentRosterForMatch(opponent);
  const oppPool = oppPoolRaw.filter(p => ['ST','LA','RA','OM','ZM'].includes(p.pos));
  const events = [];
  const used = new Set();
  const pickMinute = () => {
    let minute = randomInt(4, 90);
    let guard = 0;
    while (used.has(minute) && guard < 20) { minute = randomInt(4, 90); guard++; }
    used.add(minute);
    return minute;
  };
  for (let i=0;i<ownGoals;i++) {
    const minute = pickMinute();
    const scorer = ownPool[randomInt(0, Math.max(0, ownPool.length - 1))];
    const assister = ownPool[randomInt(0, Math.max(0, ownPool.length - 1))];
    events.push({ minute, team:'own', type:'goal', text:`${minute}. Min: Tor fuer ${ownClubName()}! ${scorer?.name || 'Spieler'} trifft.`, scorerId: scorer?.id, scorerName: scorer?.name, assistId: assister?.id, assistName: assister?.name });
  }
  for (let i=0;i<oppGoals;i++) {
    const minute = pickMinute();
    const pool = oppPool.length ? oppPool : oppPoolRaw;
    const scorer = pool[randomInt(0, Math.max(0, pool.length - 1))];
    const assister = pool[randomInt(0, Math.max(0, pool.length - 1))];
    events.push({ minute, team:'opp', type:'goal', text:`${minute}. Min: Tor fuer ${opponent}. ${scorer?.name || 'Gegner'} trifft.`, scorerName: scorer?.name, assistName: assister?.name, club: opponent });
  }
  return [...events, ...makeSpecialMatchEvents(opponent)].sort((a,b)=>a.minute-b.minute || (a.type === 'goal' ? -1 : 1));
}
function matchStatsForHalf(untilMinute=45) {
  const m = state.activeMatch;
  const ownGoals = (m.events || []).filter(e=>e.type==='goal' && e.team==='own' && e.minute<=untilMinute).length;
  const oppGoals = (m.events || []).filter(e=>e.type==='goal' && e.team==='opp' && e.minute<=untilMinute).length;
  const ownPower = m.score.ownPower;
  const oppPower = m.score.oppPower;
  const possession = clamp(50 + Math.round((ownPower - oppPower) / 3), 35, 65);
  const shotsOwn = Math.max(1, ownGoals * 3 + 3 + Math.round((ownPower - 55) / 12) + randomInt(-1, 2));
  const shotsOpp = Math.max(1, oppGoals * 3 + 3 + Math.round((oppPower - 55) / 12) + randomInt(-1, 2));
  return { ownGoals, oppGoals, possession, shotsOwn, shotsOpp, xgOwn: (shotsOwn * 0.12 + ownGoals * 0.25).toFixed(1), xgOpp: (shotsOpp * 0.12 + oppGoals * 0.25).toFixed(1) };
}
function simulateOtherLeagueResults(opponent) {
  const clubs = CURRENT_TABLE.map(r=>r.club).filter(c=>c!==ownClubName() && c!==opponent);
  const results = [];
  for (let i=0; i<clubs.length; i+=2) {
    const home = clubs[i], away = clubs[i+1];
    if (!home || !away) continue;
    const hg = randomInt(0, 4);
    const ag = randomInt(0, 3);
    results.push({ home, away, hg, ag });
    const hr = CURRENT_TABLE.find(r=>r.club===home), ar = CURRENT_TABLE.find(r=>r.club===away);
    if (hr && ar) {
      hr.played++; ar.played++; hr.diff += hg-ag; ar.diff += ag-hg;
      if (hg>ag) hr.points+=3; else if (ag>hg) ar.points+=3; else {hr.points++; ar.points++;}
    }
  }
  return results;
}
function updatePlayerSeasonStatsFromMatch() {
  const m = state.activeMatch;
  const ownEvents = (m.events || []).filter(e=>e.type==='goal' && e.team==='own');
  const starters = lineupEntries().map(e => e.player.id);
  const benchIds = Object.values(state.bench || {}).map(Number).filter(Boolean).slice(0,3);
  const resultBonus = m.score.ownGoals > m.score.oppGoals ? -0.35 : m.score.ownGoals === m.score.oppGoals ? 0 : 0.35;
  const mod = m.score.mod;
  state.players = state.players.map(p => {
    let minutes = starters.includes(p.id) ? 90 : benchIds.includes(p.id) ? 20 : 0;
    let rating = minutes ? Math.max(1, Math.min(5, 2.8 + resultBonus - (p.strength - 60) / 90 - (playerUnitScore(p, ['ST','LA','RA','OM'].includes(p.pos) ? 'attack' : ['IV','LV','RV','DM','TW'].includes(p.pos) ? 'defense' : 'control') - 60) / 120 - mod.total / 35 + randomBetween(-0.25, 0.25))) : p.rating;
    const roundedRating = Math.round(rating * 10) / 10;
    const goals = ownEvents.filter(e => String(e.scorerId) === String(p.id)).length;
    const assists = ownEvents.filter(e => String(e.assistId) === String(p.id) && String(e.assistId) !== String(e.scorerId)).length;
    const oldSatisfaction = typeof p.satisfaction === 'number' ? p.satisfaction : 60;
    let satisfactionChange = minutes >= 70 ? 6 : minutes >= 20 ? 2 : -5;
    if (minutes && roundedRating <= 2.3) satisfactionChange += 2;
    if (minutes && roundedRating >= 3.6) satisfactionChange -= 2;
    const noPlayWeeks = minutes ? 0 : (p.noPlayWeeks || 0) + 1;
    if (noPlayWeeks >= 6) satisfactionChange -= 2;
    return { ...p, minutes, rating: roundedRating, satisfaction: clamp(oldSatisfaction + satisfactionChange, 0, 100), noPlayWeeks, seasonGoals: (p.seasonGoals||0)+goals, seasonAssists:(p.seasonAssists||0)+assists, seasonPoints:(p.seasonPoints||0)+goals+assists, seasonRatingSum:(p.seasonRatingSum||0)+(minutes?roundedRating:0), seasonRatingGames:(p.seasonRatingGames||0)+(minutes?1:0) };
  });
  (m.events || []).filter(e=>e.type==='goal' && e.team==='opp').forEach(e => {
    const id = `opp-${m.opponent}-${e.scorerName}`;
    let stat = state.externalPlayerStats.find(s=>s.id===id);
    if (!stat) { stat = { id, name:e.scorerName, club:m.opponent, goals:0, assists:0, points:0 }; state.externalPlayerStats.push(stat); }
    stat.goals += 1; stat.points += 1;
    if (e.assistName) {
      const aid = `opp-${m.opponent}-${e.assistName}`;
      let ast = state.externalPlayerStats.find(s=>s.id===aid);
      if (!ast) { ast = { id:aid, name:e.assistName, club:m.opponent, goals:0, assists:0, points:0 }; state.externalPlayerStats.push(ast); }
      ast.assists += 1; ast.points += 1;
    }
  });
}
function startMatchScreen() {
  const opponent = state.matchDayModal?.opponent || currentOpponentName();
  const score = predictedMatchScore(opponent);
  const events = createGoalEvents(score.ownGoals, score.oppGoals, opponent);
  state.activeMatch = { opponent, score, events, phase:'firstReady', currentMinute:0, liveScore:{own:0, opp:0}, log:[], processedEventKeys:[], subs:[], halftimeStats: null, fullStats: null, interruption:null, createdAt: Date.now() };
  state.matchDayModal = null;
  state.tab = 'match';
  render();
}
function goToHalftimeScreen() { state.tab = 'matchHalftime'; render(); }
function goToMatchEndScreen() { state.tab = 'matchEnd'; render(); }
function openMatchdayStats() { state.tab = 'season'; state.seasonSection = 'matchdayStats'; render(); }
function runHalfInstant(half) {
  const m = state.activeMatch;
  if (!m) return;
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!m.currentMinute || m.currentMinute < 1)) m.currentMinute = 0;
  if (half === 2 && m.currentMinute < 46) m.currentMinute = 45;
  m.phase = 'live';
  m.liveHalf = half;
  state.tab = 'match';
  while (m.currentMinute < endMinute) {
    m.currentMinute += 1;
    if (processLiveMinuteEvents()) return;
  }
  if (half === 1) {
    m.halftimeStats = matchStatsForHalf(45);
    m.phase = 'halftime';
    state.tab = 'matchHalftime';
  } else {
    m.fullStats = matchStatsForHalf(90);
    finishActiveMatch();
    m.phase = 'finished';
    state.tab = 'matchEnd';
  }
  render();
}
function startLiveHalf(half) {
  const m = state.activeMatch;
  if (!m) return;
  if ((state.options?.simulationSpeed || 'slow') === 'instant') { runHalfInstant(half); return; }
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!m.currentMinute || m.currentMinute < 1)) m.currentMinute = 0;
  if (half === 2 && m.currentMinute < 46) m.currentMinute = 45;
  m.phase = 'live';
  m.liveHalf = half;
  state.tab = 'match';
  render();
  window.hfmMatchTimer = setInterval(() => {
    const match = state.activeMatch;
    if (!match || match.phase !== 'live') { stopMatchTimer(); return; }
    match.currentMinute += 1;
    if (processLiveMinuteEvents()) return;
    if (match.currentMinute >= endMinute) {
      stopMatchTimer();
      if (half === 1) {
        match.halftimeStats = matchStatsForHalf(45);
        match.phase = 'halftime';
        state.tab = 'matchHalftime';
      } else {
        match.fullStats = matchStatsForHalf(90);
        finishActiveMatch();
        match.phase = 'finished';
        state.tab = 'matchEnd';
      }
    }
    render();
  }, simulationIntervalMs());
}
function halftimeScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Keine Halbzeitdaten</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Noch keine besonderen Ereignisse.</li>';
  return `<section class="panel matchPanel"><p class="eyebrow">Eigener Halbzeit-Screen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>Halbzeitpause</span></div>${matchStatRows(m.halftimeStats)}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol><div class="infoBox">Hier kannst du in Ruhe Formation, Wechsel und Taktik anpassen. Danach geht es wieder in den Spielscreen.</div>${halftimeChangeScreen()}<button class="primary full" onclick="simulateSecondHalf()">2. Halbzeit starten</button></section>`;
}
function matchEndScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein abgeschlossenes Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const finalScore = `${m.score.ownGoals}:${m.score.oppGoals}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Keine besonderen Ereignisse.</li>';
  return `<section class="panel matchPanel"><p class="eyebrow">Spiel beendet</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol><div class="modalActions"><button class="ghost full" onclick="goTo('season','table')">Tabelle</button><button class="ghost full" onclick="goTo('season','playerStats')">Spielerstatistiken</button><button class="ghost full" onclick="openMatchdayStats()">Spieltagsstatistik</button><button class="primary full" onclick="setTab('dashboard')">Zur Home-Seite</button></div></section>`;
}
function matchdayStatsView() {
  const rows = (state.lastMatchdayResults || []).map(r => `<tr><td>${r.home}</td><td>${r.hg}:${r.ag}</td><td>${r.away}</td></tr>`).join('');
  return `<section class="panel"><p class="eyebrow">Saison · Spieltagsstatistik</p><h2>Alle Ergebnisse dieses Spieltags</h2><div class="infoBox">Alle Ligaspiele dieses Spieltags wurden am gleichen Tag simuliert.</div><div class="tableWrap"><table><thead><tr><th>Heim</th><th>Ergebnis</th><th>Auswaerts</th></tr></thead><tbody>${rows || '<tr><td colspan="3">Noch keine Spieltagsdaten vorhanden.</td></tr>'}</tbody></table></div></section>`;
}
function matchScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein aktives Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Noch keine besonderen Ereignisse.</li>';
  if (m.phase === 'firstReady') return `<section class="panel matchPanel"><p class="eyebrow">Spielscreen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>0:0</b><span>${formatGermanDate(nextMatchDate())}</span></div><div class="infoBox">Jedes Spiel wird beim Start neu berechnet. Gleiche Ergebnisse sind moeglich, aber nicht fest vorgegeben.</div><button class="primary full" onclick="simulateFirstHalf()">Spiel starten</button></section>`;
  if (m.phase === 'live') return `<section class="panel matchPanel"><p class="eyebrow">${m.liveHalf === 1 ? '1. Halbzeit' : '2. Halbzeit'}</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.currentMinute}. Minute laeuft</span></div><h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol></section>`;
  if (m.phase === 'interrupted') return `<section class="panel matchPanel"><p class="eyebrow">Spielunterbrechung · ${m.interruption?.minute}. Minute</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.interruption?.type === 'red' ? 'Rote Karte' : 'Verletzung'}</span></div><div class="infoBox">${m.interruption?.text}<br>Das Spiel ist gestoppt. Passe deine Aufstellung an und setze das Spiel danach fort.</div>${halftimeChangeScreen()}<button class="primary full" onclick="continueAfterInterruption()">Spiel fortsetzen</button></section>`;
  if (m.phase === 'halftime') return halftimeScreen();
  return matchEndScreen();
}
function season() {
  const content = state.seasonSection === 'calendar' ? calendarView() : state.seasonSection === 'table' ? tableView() : state.seasonSection === 'playerStats' ? playerStatsView() : state.seasonSection === 'matchdayStats' ? matchdayStatsView() : state.seasonSection === 'schedule' ? scheduleView() : state.seasonSection === 'world' ? worldView() : state.seasonSection === 'leagueTable' ? leagueTableView() : state.seasonSection === 'clubRoster' ? clubRosterView() : internationalView();
  return `<section class="teamSubnav"><div class="chips">${seasonSubButton('calendar', 'Kalender')}${seasonSubButton('table', 'Tabelle')}${seasonSubButton('playerStats', 'Spielerstatistiken')}${seasonSubButton('matchdayStats', 'Spieltagsstatistik')}${seasonSubButton('schedule', 'Spielplan')}${seasonSubButton('world', 'Ligen')}${seasonSubButton('international', 'Europa')}</div></section>${content}`;
}
function render() {
  initV36Features();
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); return; }
  // Halbzeit und Spielende sind eigene Screens. Falls die Simulation gerade
  // aus dem laufenden Spiel kommt, wird hier sauber auf den eigenen Screen umgeschaltet.
  if (state.activeMatch?.phase === 'halftime' && state.tab !== 'matchHalftime') state.tab = 'matchHalftime';
  if (state.activeMatch?.phase === 'finished' && state.tab !== 'matchEnd') state.tab = 'matchEnd';
  const content = state.tab === 'dashboard' ? dashboard() : state.tab === 'team' ? team() : state.tab === 'market' ? market() : state.tab === 'scouting' ? scouting() : state.tab === 'club' ? club() : state.tab === 'environment' ? environment() : state.tab === 'match' ? matchScreen() : state.tab === 'matchHalftime' ? halftimeScreen() : state.tab === 'matchEnd' ? matchEndScreen() : state.tab === 'options' ? optionsView() : season();
  document.getElementById('app').innerHTML = `<div class="appShell">
    <header class="hero">
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b></p></div>
      <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
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
      ${navButton('options', '⚙️', 'Optionen')}
    </nav>
    ${seasonEndModal()}
    ${seasonStartModal()}
    ${sponsorModal()}
    ${matchDayModal()}
    ${youthDiscoveryModal()}
    ${playerProfileModal()}
  </div>`;
}

// ===== Version 39: Halbzeit-Headerbutton und eigene Statistikfenster nach dem Spiel =====
function headerActionLabel() {
  const m = state.activeMatch;
  if (m?.phase === 'halftime' || state.tab === 'matchHalftime') return '2. Halbzeit starten';
  if (m?.phase === 'firstReady' || state.tab === 'match') return 'Spiel starten';
  if (m?.phase === 'live') return 'Spiel läuft';
  if (!isMatchPendingThisWeek()) return 'Zur nächsten KW.';
  const today = currentGameDate();
  const matchDate = nextMatchDate();
  if (sameDate(today, matchDate)) return 'Spiel starten';
  if (sameCalendarWeek(today, matchDate)) return 'Zum Spiel simulieren';
  return 'Zur nächsten KW.';
}
function headerAction() {
  const m = state.activeMatch;
  if (m?.phase === 'halftime' || state.tab === 'matchHalftime') { simulateSecondHalf(); return; }
  if (m?.phase === 'firstReady' || state.tab === 'match') { simulateFirstHalf(); return; }
  if (m?.phase === 'live') return;
  if (!isMatchPendingThisWeek()) { nextWeek(); return; }
  const today = currentGameDate();
  const matchDate = nextMatchDate();
  if (sameDate(today, matchDate) || sameCalendarWeek(today, matchDate)) openMatchDayModal();
  else advanceToNextCalendarWeek();
}
function halftimeScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Keine Halbzeitdaten</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Noch keine besonderen Ereignisse.</li>';
  return `<section class="panel matchPanel"><p class="eyebrow">Eigener Halbzeit-Screen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>Halbzeitpause</span></div>${matchStatRows(m.halftimeStats)}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol><div class="infoBox">Hier kannst du in Ruhe Formation, Wechsel und Taktik anpassen. Starte die zweite Halbzeit anschließend oben rechts über den Button <b>2. Halbzeit starten</b>.</div>${halftimeChangeScreen()}</section>`;
}
function openPostMatchWindow(type) {
  state.postMatchWindow = type;
  render();
}
function closePostMatchWindow() {
  state.postMatchWindow = null;
  render();
}
function postMatchWindowTitle(type) {
  if (type === 'table') return 'Tabelle';
  if (type === 'playerStats') return 'Spielerstatistiken';
  if (type === 'matchdayStats') return 'Spieltagsstatistik';
  return 'Übersicht';
}
function postMatchWindowContent(type) {
  if (type === 'table') return tableView();
  if (type === 'playerStats') return playerStatsView();
  if (type === 'matchdayStats') return matchdayStatsView();
  return '<section class="panel"><h2>Keine Daten</h2></section>';
}
function postMatchWindowModal() {
  const type = state.postMatchWindow;
  if (!type) return '';
  return `<div class="modalBackdrop" role="dialog" aria-modal="true"><div class="modalBox"><div class="modalHeader"><div><p class="eyebrow">Spielauswertung</p><h2>${postMatchWindowTitle(type)}</h2></div><button class="ghost closeButton" onclick="closePostMatchWindow()">Schließen</button></div><div class="modalIntro">Diese Übersicht ist ein eigenes Fenster und verändert nicht deinen aktuellen Spielscreen.</div><div class="embeddedPanel">${postMatchWindowContent(type)}</div></div></div>`;
}
function matchEndScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein abgeschlossenes Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const finalScore = `${m.score.ownGoals}:${m.score.oppGoals}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Keine besonderen Ereignisse.</li>';
  return `<section class="panel matchPanel"><p class="eyebrow">Spiel beendet</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol><div class="modalActions"><button class="ghost full" onclick="openPostMatchWindow('table')">Tabelle</button><button class="ghost full" onclick="openPostMatchWindow('playerStats')">Spielerstatistiken</button><button class="ghost full" onclick="openPostMatchWindow('matchdayStats')">Spieltagsstatistik</button><button class="primary full" onclick="setTab('dashboard')">Zur Home-Seite</button></div></section>`;
}
function render() {
  initV36Features();
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); return; }
  if (state.activeMatch?.phase === 'halftime' && state.tab !== 'matchHalftime') state.tab = 'matchHalftime';
  if (state.activeMatch?.phase === 'finished' && state.tab !== 'matchEnd') state.tab = 'matchEnd';
  const content = state.tab === 'dashboard' ? dashboard() : state.tab === 'team' ? team() : state.tab === 'market' ? market() : state.tab === 'scouting' ? scouting() : state.tab === 'club' ? club() : state.tab === 'environment' ? environment() : state.tab === 'match' ? matchScreen() : state.tab === 'matchHalftime' ? halftimeScreen() : state.tab === 'matchEnd' ? matchEndScreen() : state.tab === 'options' ? optionsView() : season();
  document.getElementById('app').innerHTML = `<div class="appShell">
    <header class="hero">
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b></p></div>
      <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
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
      ${navButton('options', '⚙️', 'Optionen')}
    </nav>
    ${seasonEndModal()}
    ${seasonStartModal()}
    ${sponsorModal()}
    ${matchDayModal()}
    ${postMatchWindowModal()}
    ${youthDiscoveryModal()}
    ${playerProfileModal()}
  </div>`;
}

// v40: Trainingsfortschritt-Abschluss als eigenes Popup
function ensureTrainingLevelUpQueue() {
  if (!Array.isArray(state.trainingLevelUps)) state.trainingLevelUps = [];
}
function applyWeeklyTrainingGrowthWithPopup(focus) {
  ensureTrainingLevelUpQueue();
  state.players = state.players.map(player => {
    const oldStrength = Number(player.strength || 0);
    const oldProgress = Number(player.progress || 0);
    const gain = calcDevelopment(player, focus);
    let progress = oldProgress + gain;
    let updated = player;
    while (progress >= 100 && updated.strength < 100) {
      updated = improvePlayerSkills(updated, 1);
      progress -= 100;
    }
    if (Number(updated.strength || 0) > oldStrength) {
      state.trainingLevelUps.push({
        id: updated.id,
        name: updated.name,
        position: positionText(updated),
        oldStrength,
        newStrength: updated.strength,
        oldProgress: Math.round(oldProgress),
        gain: Math.round(gain)
      });
    }
    return { ...updated, progress: Math.round(progress) };
  });
}
function closeTrainingLevelUpModal() {
  ensureTrainingLevelUpQueue();
  state.trainingLevelUps.shift();
  render();
}
function trainingLevelUpModal() {
  ensureTrainingLevelUpQueue();
  const item = state.trainingLevelUps[0];
  if (!item) return '';
  return `<div class="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="trainingLevelUpTitle">
    <div class="modalBox smallModal">
      <div class="modalHeader">
        <div><p class="eyebrow">Training abgeschlossen</p><h2 id="trainingLevelUpTitle">${item.name} erreicht die nächste Stufe</h2></div>
      </div>
      <p class="modalIntro">Der Spieler hat im Training 100 % Fortschritt erreicht und verbessert dadurch seine Gesamtstärke.</p>
      <div class="grid compact">
        <article class="card"><p>Alte Stärke</p><h2>${item.oldStrength}/100</h2><span>${item.position}</span></article>
        <article class="card"><p>Neue Stärke</p><h2>${item.newStrength}/100</h2><span>+${item.newStrength - item.oldStrength} Stärke</span></article>
        <article class="card"><p>Fortschritt</p><h2>100%</h2><span>vorher ${item.oldProgress}% · Woche +${item.gain}%</span></article>
      </div>
      <div class="modalActions">
        <button class="primary full" onclick="closeTrainingLevelUpModal()">Weiter</button>
      </div>
    </div>
  </div>`;
}
function nextWeek() {
  const nextDatePreview = new Date(currentGameDate());
  nextDatePreview.setDate(nextDatePreview.getDate() + (7 - (state.dayOffset || 0)));
  const focus = state.autoTraining ? assistantTraining() : state.trainingFocus;
  state.trainingFocus = focus;
  state.week += 1;
  state.dayOffset = 0;
  state.tab = 'dashboard';
  state.activeMatch = null;
  progressConstruction();
  processScoutingJobs(7);
  pruneScoutedPlayerHistory();
  applyWeeklyTrainingGrowthWithPopup(focus);
  developAcademyPlayers(focus);
  processContractYearEnd();
  maybeDiscoverYouthPlayer();
  if (finishSeasonIfNeeded(nextDatePreview)) { render(); return; }
  render();
}
function render() {
  initV36Features();
  ensureTrainingLevelUpQueue();
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); return; }
  if (state.activeMatch?.phase === 'halftime' && state.tab !== 'matchHalftime') state.tab = 'matchHalftime';
  if (state.activeMatch?.phase === 'finished' && state.tab !== 'matchEnd') state.tab = 'matchEnd';
  const content = state.tab === 'dashboard' ? dashboard() : state.tab === 'team' ? team() : state.tab === 'market' ? market() : state.tab === 'scouting' ? scouting() : state.tab === 'club' ? club() : state.tab === 'environment' ? environment() : state.tab === 'match' ? matchScreen() : state.tab === 'matchHalftime' ? halftimeScreen() : state.tab === 'matchEnd' ? matchEndScreen() : state.tab === 'options' ? optionsView() : season();
  document.getElementById('app').innerHTML = `<div class="appShell">
    <header class="hero">
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b></p></div>
      <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
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
      ${navButton('options', '⚙️', 'Optionen')}
    </nav>
    ${seasonEndModal()}
    ${seasonStartModal()}
    ${sponsorModal()}
    ${trainingLevelUpModal()}
    ${matchDayModal()}
    ${postMatchWindowModal()}
    ${youthDiscoveryModal()}
    ${playerProfileModal()}
  </div>`;
}


// ===== Version 41: bessere Spieltagsfenster, Fußballtabelle und Seitenwechsel-Effekt =====
function tableRecord(row) {
  const played = Number(row.played || 0);
  const points = Number(row.points || 0);
  let wins = Math.min(played, Math.floor(points / 3));
  let draws = Math.max(0, Math.min(played - wins, points - wins * 3));
  let losses = Math.max(0, played - wins - draws);
  while (wins + draws + losses > played && losses > 0) losses -= 1;
  const diff = Number(row.diff || 0);
  const goalsFor = Math.max(0, 8 + wins * 2 + draws + Math.max(diff, 0));
  const goalsAgainst = Math.max(0, goalsFor - diff);
  return { played, wins, draws, losses, goalsFor, goalsAgainst, diff, points };
}
function tableView() {
  const rows = CURRENT_TABLE.map(row => {
    const r = tableRecord(row);
    return `<tr class="${row.own ? 'ownClub' : ''} clickableRow" onclick="openClubRoster('${row.club}', 10)">
      <td>${row.pos}</td>
      <td class="clubNameCell">${row.club}</td>
      <td>${r.played}</td>
      <td>${r.wins}</td>
      <td>${r.draws}</td>
      <td>${r.losses}</td>
      <td>${r.goalsFor}:${r.goalsAgainst}</td>
      <td>${r.diff > 0 ? '+' : ''}${r.diff}</td>
      <td><b>${r.points}</b></td>
    </tr>`;
  }).join('');
  return `<section class="panel"><p class="eyebrow">Saison · Tabelle</p><h2>Aktuelle Ligatabelle</h2><div class="infoBox">Vereine sind antippbar. Öffne einen Verein, um den Kader und einzelne Spieler anzusehen.</div><div class="tableWrap footballTable"><table><thead><tr><th>#</th><th>Verein</th><th>Sp</th><th>S</th><th>U</th><th>N</th><th>Tore</th><th>TD</th><th>Pts</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
}
function matchdayStatsView() {
  const rows = (state.lastMatchdayResults || []).map(r => `<article class="resultCard ${r.home === ownClubName() || r.away === ownClubName() ? 'ownResult' : ''}">
    <span class="resultTeam homeTeam">${r.home}</span>
    <strong class="resultScore">${r.hg}:${r.ag}</strong>
    <span class="resultTeam awayTeam">${r.away}</span>
  </article>`).join('');
  return `<section class="panel"><p class="eyebrow">Saison · Spieltagsstatistik</p><h2>Alle Ergebnisse dieses Spieltags</h2><div class="infoBox">Alle Ligaspiele dieses Spieltags wurden am gleichen Tag simuliert.</div><div class="resultList">${rows || '<div class="infoBox">Noch keine Spieltagsdaten vorhanden.</div>'}</div></section>`;
}
function matchDayModal() {
  const m = state.matchDayModal;
  if (!m) return '';
  return `<div class="modalBackdrop matchdayBackdrop" role="dialog" aria-modal="true">
    <div class="modalBox matchdayModalBox">
      <div class="modalHeader"><div><p class="eyebrow">${m.date}</p><h2>Spieltag</h2></div><span class="requiredBadge">Ligaspiel</span></div>
      <p class="modalIntro">Alle Spiele der Liga finden heute statt. Hier siehst du die Vorschau beider Teams.</p>
      <div class="matchPreviewGrid">
        <article class="teamPreview"><p class="eyebrow">Heimteam</p><h3>${ownClubName()}</h3><b>Gesamtstärke ${m.ownStrength}/100</b><span>Bester Spieler: ${linkedOwnName(m.ownBest)} (${m.ownBest?.strength || 0})</span><span>Teuerster Spieler: ${linkedOwnName(m.ownValue)} · ${euro(m.ownValue?.marketValue || 0)}</span><span>Bester Torschütze: ${linkedStatName(m.ownScorer)}${m.ownScorer ? ` · ${m.ownScorer.goals||0} Tore` : ''}</span><span>Bester Vorlagengeber: ${linkedStatName(m.ownAssistant)}${m.ownAssistant ? ` · ${m.ownAssistant.assists||0} Vorlagen` : ''}</span><button class="ghost full" onclick="openOwnSquadFromMatch()">Zum Kader</button></article>
        <article class="teamPreview"><p class="eyebrow">Auswärtsteam</p><h3>${m.opponent}</h3><b>Gesamtstärke ${m.oppStrength}/100</b><span>Bester Spieler: ${linkedExternalName(m.oppBest, m.opponent)} (${m.oppBest?.strength || 0})</span><span>Teuerster Spieler: ${linkedExternalName(m.oppValue, m.opponent)} · ${euro(m.oppValue?.marketValue || 0)}</span><span>Bester Torschütze: ${linkedStatName(m.oppScorer)}${m.oppScorer ? ` · ${m.oppScorer.goals||0} Tore` : ''}</span><span>Bester Vorlagengeber: ${linkedStatName(m.oppAssistant)}${m.oppAssistant ? ` · ${m.oppAssistant.assists||0} Vorlagen` : ''}</span><button class="ghost full" onclick="openOpponentSquadFromMatch('${m.opponent}')">Zum Kader</button></article>
      </div>
      <div class="modalActions"><button class="ghost full" onclick="state.matchDayModal=null;render()">Noch nicht</button><button class="primary full startMatchPulse" onclick="startMatchScreen()">Weiter zum Spielscreen</button></div>
    </div>
  </div>`;
}
function isMatchTabForTheme() {
  return ['match','matchHalftime','matchEnd'].includes(state.tab) || !!state.matchDayModal || !!state.postMatchWindow;
}
function render() {
  initV36Features();
  ensureTrainingLevelUpQueue();
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); return; }
  if (state.activeMatch?.phase === 'halftime' && state.tab !== 'matchHalftime') state.tab = 'matchHalftime';
  if (state.activeMatch?.phase === 'finished' && state.tab !== 'matchEnd') state.tab = 'matchEnd';
  const content = state.tab === 'dashboard' ? dashboard() : state.tab === 'team' ? team() : state.tab === 'market' ? market() : state.tab === 'scouting' ? scouting() : state.tab === 'club' ? club() : state.tab === 'environment' ? environment() : state.tab === 'match' ? matchScreen() : state.tab === 'matchHalftime' ? halftimeScreen() : state.tab === 'matchEnd' ? matchEndScreen() : state.tab === 'options' ? optionsView() : season();
  const matchTheme = isMatchTabForTheme();
  const isLiveSimulation = state.activeMatch?.phase === 'live';
  document.getElementById('app').innerHTML = `<div class="appShell ${matchTheme ? 'matchdayShell' : ''} ${isLiveSimulation ? 'liveSimulationShell' : ''}">
    <header class="hero ${matchTheme ? 'matchHero' : ''}">
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b></p></div>
      <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
    </header>
    <main class="${isLiveSimulation ? 'noPageTransition' : 'pageTransition'} ${matchTheme ? 'matchMain' : ''} ${isLiveSimulation ? 'liveSimulationMain' : ''}">${content}</main>
    <nav class="bottomNav">
      ${navButton('dashboard', '⌂', 'Home')}
      ${navButton('team', '⚽', 'Team')}
      ${navButton('market', '↔', 'Markt')}
      ${navButton('scouting', '🔭', 'Scouting')}
      ${navButton('club', '▣', 'Verein')}
      ${navButton('environment', '🏟️', 'Stadion/Umfeld')}
      ${navButton('season', '🏆', 'Saison')}
      ${navButton('options', '⚙️', 'Optionen')}
    </nav>
    ${seasonEndModal()}
    ${seasonStartModal()}
    ${sponsorModal()}
    ${trainingLevelUpModal()}
    ${matchDayModal()}
    ${postMatchWindowModal()}
    ${youthDiscoveryModal()}
    ${playerProfileModal()}
  </div>`;
}


/* Version 43: Klarere optische Darstellung bei Verletzung und roter Karte */
function ensureMatchStatusStore() {
  if (state.activeMatch && !state.activeMatch.playerStatuses) state.activeMatch.playerStatuses = {};
}
function rememberMatchPlayerStatus(playerId, type, minute) {
  if (!state.activeMatch || !playerId) return;
  ensureMatchStatusStore();
  const key = String(playerId);
  const current = state.activeMatch.playerStatuses[key] || {};
  state.activeMatch.playerStatuses[key] = { ...current, [type]: true, minute: minute || state.activeMatch.currentMinute || 0 };
}
function getMatchPlayerStatus(playerId) {
  const map = state.activeMatch?.playerStatuses || {};
  return map[String(playerId)] || null;
}
function getMatchStatusBadges(playerId, variant = 'small') {
  const status = getMatchPlayerStatus(playerId);
  if (!status) return '';
  const cls = variant === 'big' ? 'matchStatusBadge big' : 'matchStatusBadge';
  const bits = [];
  if (status.red) bits.push(`<span class="${cls} red" title="Rote Karte">🟥</span>`);
  if (status.injury) bits.push(`<span class="${cls} injury" title="Verletzt">🩹</span>`);
  return bits.join('');
}
function matchStatusOverview() {
  const affected = lineupEntries().filter(entry => getMatchPlayerStatus(entry.player.id));
  if (!affected.length) return '';
  const rows = affected.map(entry => {
    const status = getMatchPlayerStatus(entry.player.id) || {};
    const label = status.red && status.injury ? 'Rote Karte · verletzt' : status.red ? 'Rote Karte' : 'Verletzt';
    return `<div class="statusOverviewRow"><span class="statusOverviewName">${entry.slot.pos}: ${entry.player.name}</span><span class="statusOverviewRight">${getMatchStatusBadges(entry.player.id, 'small')}<b>${label}</b></span></div>`;
  }).join('');
  return `<div class="matchStatusOverview"><p class="eyebrow">Auffällige Spieler</p>${rows}</div>`;
}
function interruptionVisualCard(interruption) {
  if (!interruption) return '';
  const icon = interruption.type === 'red' ? '🟥' : '🩹';
  const title = interruption.type === 'red' ? 'Rote Karte' : 'Verletzung';
  return `<div class="matchAlertCard ${interruption.type === 'red' ? 'redAlert' : 'injuryAlert'}">
    <div class="alertIcon">${icon}</div>
    <div>
      <p class="eyebrow">${title} · ${interruption.minute}. Minute</p>
      <h3>${interruption.playerName}</h3>
      <p>${interruption.text}</p>
    </div>
  </div>`;
}
function halftimeSubControls() {
  const benchOptions = Object.values(state.bench||{}).filter(Boolean).map(id => {
    const p = state.players.find(x => x.id === Number(id));
    return p ? `<option value="${p.id}">${p.name} · ${p.pos} · ${p.strength}</option>` : '';
  }).join('');
  if (!benchOptions) return '<div class="infoBox">Keine Bankspieler verfügbar.</div>';
  return lineupEntries().map(entry => {
    const statusBadges = getMatchStatusBadges(entry.player.id, 'small');
    return `<label class="fieldLabel matchFieldLabel"><span class="matchPlayerLabel">${entry.slot.pos}: ${entry.player.name} ${statusBadges}</span><select onchange="liveSubstitute('${entry.slot.id}', this.value)"><option value="">kein Wechsel</option>${benchOptions}</select></label>`;
  }).join('');
}
function processLiveMinuteEvents() {
  const m = state.activeMatch;
  if (!m) return false;
  ensureMatchStatusStore();
  const events = (m.events || []).filter(e => e.minute === m.currentMinute && !(m.processedEventKeys || []).includes(eventKey(e)));
  for (const e of events) {
    m.processedEventKeys.push(eventKey(e));
    m.log.push(e.text);
    if (e.type === 'goal') {
      if (e.team === 'own') m.liveScore.own += 1;
      else m.liveScore.opp += 1;
    }
    if (e.team === 'own' && (e.type === 'injury' || e.type === 'red')) {
      rememberMatchPlayerStatus(e.playerId, e.type, e.minute);
      stopMatchTimer();
      m.phase = 'interrupted';
      m.interruption = { type: e.type, minute: e.minute, playerId: e.playerId, playerName: e.playerName, text: e.text, half: m.currentMinute <= 45 ? 1 : 2 };
      render();
      return true;
    }
  }
  return false;
}
function halftimeScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Keine Halbzeitdaten</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Noch keine besonderen Ereignisse.</li>';
  return `<section class="panel matchPanel"><p class="eyebrow">Eigener Halbzeit-Screen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>Halbzeitpause</span></div>${matchStatRows(m.halftimeStats)}${matchStatusOverview()}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol><div class="infoBox">Hier kannst du in Ruhe Formation, Wechsel und Taktik anpassen. Starte die zweite Halbzeit anschließend oben rechts über den Button <b>2. Halbzeit starten</b>.</div>${halftimeChangeScreen()}</section>`;
}
function matchScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein aktives Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Noch keine besonderen Ereignisse.</li>';
  if (m.phase === 'firstReady') return `<section class="panel matchPanel"><p class="eyebrow">Spielscreen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>0:0</b><span>${formatGermanDate(nextMatchDate())}</span></div><div class="infoBox">Jedes Spiel wird beim Start neu berechnet. Gleiche Ergebnisse sind möglich, aber nicht fest vorgegeben.</div><button class="primary full" onclick="simulateFirstHalf()">Spiel starten</button></section>`;
  if (m.phase === 'live') return `<section class="panel matchPanel"><p class="eyebrow">${m.liveHalf === 1 ? '1. Halbzeit' : '2. Halbzeit'}</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.currentMinute}. Minute läuft</span></div><h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol></section>`;
  if (m.phase === 'interrupted') return `<section class="panel matchPanel"><p class="eyebrow">Spielunterbrechung · ${m.interruption?.minute}. Minute</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.interruption?.type === 'red' ? 'Rote Karte' : 'Verletzung'}</span></div>${interruptionVisualCard(m.interruption)}<div class="infoBox">Das Spiel ist gestoppt. Passe deine Aufstellung an und setze das Spiel danach fort.</div>${matchStatusOverview()}${halftimeChangeScreen()}<button class="primary full" onclick="continueAfterInterruption()">Spiel fortsetzen</button></section>`;
  if (m.phase === 'halftime') return halftimeScreen();
  return matchEndScreen();
}

/* Version 44: Buttontext, saubere Spielerlinks, Standardtempo Schnell und Halbzeit als eigenes Fenster */
function initV36Features() {
  if (!state.options) state.options = { simulationSpeed: 'fast' };
  if (!state.options.simulationSpeed) state.options.simulationSpeed = 'fast';
}
function halftimeScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Keine Halbzeitdaten</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Noch keine besonderen Ereignisse.</li>';
  return `<div class="halftimeWindowBackdrop"><section class="panel matchPanel halftimeWindow"><div class="modalHeader"><div><p class="eyebrow">Halbzeitpause</p><h2>${ownClubName()} - ${m.opponent}</h2></div><span class="requiredBadge">Eigener Screen</span></div><div class="scoreBoard"><b>${liveScore}</b><span>45. Minute</span></div>${matchStatRows(m.halftimeStats)}${matchStatusOverview()}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol><div class="infoBox">Dies ist das eigene Halbzeit-Fenster. Hier kannst du Formation, Wechsel und Taktik anpassen. Starte danach oben rechts mit <b>2. Halbzeit starten</b>.</div>${halftimeChangeScreen()}</section></div>`;
}
function matchDayModal() {
  const m = state.matchDayModal;
  if (!m) return '';
  return `<div class="modalBackdrop matchdayBackdrop" role="dialog" aria-modal="true">
    <div class="modalBox matchdayModalBox">
      <div class="modalHeader"><div><p class="eyebrow">${m.date}</p><h2>Spieltag</h2></div><span class="requiredBadge">Ligaspiel</span></div>
      <p class="modalIntro">Alle Spiele der Liga finden heute statt. Hier siehst du die Vorschau beider Teams.</p>
      <div class="matchPreviewGrid">
        <article class="teamPreview"><p class="eyebrow">Heimteam</p><h3>${ownClubName()}</h3><b>Gesamtstärke ${m.ownStrength}/100</b><span>Bester Spieler: ${linkedOwnName(m.ownBest)} (${m.ownBest?.strength || 0})</span><span>Teuerster Spieler: ${linkedOwnName(m.ownValue)} · ${euro(m.ownValue?.marketValue || 0)}</span><span>Bester Torschütze: ${linkedStatName(m.ownScorer)}${m.ownScorer ? ` · ${m.ownScorer.goals||0} Tore` : ''}</span><span>Bester Vorlagengeber: ${linkedStatName(m.ownAssistant)}${m.ownAssistant ? ` · ${m.ownAssistant.assists||0} Vorlagen` : ''}</span><button class="ghost full" onclick="openOwnSquadFromMatch()">Zum Kader</button></article>
        <article class="teamPreview"><p class="eyebrow">Auswärtsteam</p><h3>${m.opponent}</h3><b>Gesamtstärke ${m.oppStrength}/100</b><span>Bester Spieler: ${linkedExternalName(m.oppBest, m.opponent)} (${m.oppBest?.strength || 0})</span><span>Teuerster Spieler: ${linkedExternalName(m.oppValue, m.opponent)} · ${euro(m.oppValue?.marketValue || 0)}</span><span>Bester Torschütze: ${linkedStatName(m.oppScorer)}${m.oppScorer ? ` · ${m.oppScorer.goals||0} Tore` : ''}</span><span>Bester Vorlagengeber: ${linkedStatName(m.oppAssistant)}${m.oppAssistant ? ` · ${m.oppAssistant.assists||0} Vorlagen` : ''}</span><button class="ghost full" onclick="openOpponentSquadFromMatch('${m.opponent}')">Zum Kader</button></article>
      </div>
      <div class="modalActions"><button class="ghost full" onclick="state.matchDayModal=null;render()">Noch nicht</button><button class="primary full startMatchPulse" onclick="startMatchScreen()">Weiter zum Spiel</button></div>
    </div>
  </div>`;
}

/* Version 45: Korrekte Tabellenbasis ab Saisonstart */
function resetCurrentTableForSeason(clubName) {
  CURRENT_TABLE.forEach((row, index) => {
    row.pos = index + 1;
    row.played = 0;
    row.points = 0;
    row.diff = 0;
    row.wins = 0;
    row.draws = 0;
    row.losses = 0;
    row.goalsFor = 0;
    row.goalsAgainst = 0;
    row.own = false;
  });
  const ownRow = CURRENT_TABLE[6] || CURRENT_TABLE[0];
  if (ownRow) {
    ownRow.club = clubName || 'FC Beispielstadt';
    ownRow.own = true;
  }
  CURRENT_TABLE.sort((a, b) => a.pos - b.pos).forEach((r, i) => r.pos = i + 1);
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
  resetCurrentTableForSeason(clubName);
  state.scoutedLeagueIds = Array.from(new Set([...(state.scoutedLeagueIds || []), leagueIndex]));
  state.gameStarted = true;
  state.sponsor = null;
  state.lastMatchdayResults = [];
  render();
}
function tableRecord(row) {
  const played = Number(row.played || 0);
  const wins = Number(row.wins || 0);
  const draws = Number(row.draws || 0);
  const losses = Number(row.losses || Math.max(0, played - wins - draws));
  const goalsFor = Number(row.goalsFor || 0);
  const goalsAgainst = Number(row.goalsAgainst || 0);
  const diff = goalsFor - goalsAgainst;
  const points = Number(row.points || 0);
  return { played, wins, draws, losses, goalsFor, goalsAgainst, diff, points };
}
function sortCurrentTable() {
  CURRENT_TABLE.sort((a, b) =>
    (b.points || 0) - (a.points || 0) ||
    ((b.goalsFor || 0) - (b.goalsAgainst || 0)) - ((a.goalsFor || 0) - (a.goalsAgainst || 0)) ||
    (b.goalsFor || 0) - (a.goalsFor || 0) ||
    String(a.club).localeCompare(String(b.club))
  ).forEach((r, i) => {
    r.pos = i + 1;
    r.diff = (r.goalsFor || 0) - (r.goalsAgainst || 0);
  });
}
function applyResultToTable(home, away, hg, ag) {
  const hr = CURRENT_TABLE.find(r => r.club === home);
  const ar = CURRENT_TABLE.find(r => r.club === away);
  if (!hr || !ar) return;
  hr.played = (hr.played || 0) + 1;
  ar.played = (ar.played || 0) + 1;
  hr.goalsFor = (hr.goalsFor || 0) + hg;
  hr.goalsAgainst = (hr.goalsAgainst || 0) + ag;
  ar.goalsFor = (ar.goalsFor || 0) + ag;
  ar.goalsAgainst = (ar.goalsAgainst || 0) + hg;
  hr.diff = hr.goalsFor - hr.goalsAgainst;
  ar.diff = ar.goalsFor - ar.goalsAgainst;
  if (hg > ag) {
    hr.wins = (hr.wins || 0) + 1;
    ar.losses = (ar.losses || 0) + 1;
    hr.points = (hr.points || 0) + 3;
  } else if (ag > hg) {
    ar.wins = (ar.wins || 0) + 1;
    hr.losses = (hr.losses || 0) + 1;
    ar.points = (ar.points || 0) + 3;
  } else {
    hr.draws = (hr.draws || 0) + 1;
    ar.draws = (ar.draws || 0) + 1;
    hr.points = (hr.points || 0) + 1;
    ar.points = (ar.points || 0) + 1;
  }
}
function simulateOtherLeagueResults(opponent) {
  const clubs = CURRENT_TABLE.map(r => r.club).filter(c => c !== ownClubName() && c !== opponent);
  const results = [];
  for (let i = 0; i < clubs.length; i += 2) {
    const home = clubs[i], away = clubs[i + 1];
    if (!home || !away) continue;
    const hg = stableHash(home + state.week + state.dayOffset) % 4;
    const ag = stableHash(away + state.week + state.dayOffset + 'x') % 3;
    results.push({ home, away, hg, ag });
    applyResultToTable(home, away, hg, ag);
  }
  return results;
}
function finishActiveMatch() {
  const m = state.activeMatch;
  if (!m || m.finishedApplied) return;
  const opponent = m.opponent;
  const ownGoals = m.score.ownGoals, oppGoals = m.score.oppGoals;
  applyResultToTable(ownClubName(), opponent, ownGoals, oppGoals);
  const other = simulateOtherLeagueResults(opponent);
  sortCurrentTable();
  updatePlayerSeasonStatsFromMatch();
  updateClubImageTrend();
  state.matchPlayedWeek = state.week;
  state.lastMatchReport = { opponent, score:`${ownGoals}:${oppGoals}`, ownGoals, oppGoals, tacticBonus:m.score.mod.total, skillSynergy:m.score.mod.skillSynergy, positionPenalty:m.score.positionPenalty, ownPower:m.score.ownPower, oppPower:m.score.oppPower, units:m.score.unit, text: ownGoals > oppGoals ? 'Sieg' : ownGoals === oppGoals ? 'Unentschieden' : 'Niederlage' };
  state.lastMatchdayResults = [{ home: ownClubName(), away: opponent, hg: ownGoals, ag: oppGoals }, ...other];
  m.finishedApplied = true;
}

/* Version 46: Halbzeit-Unterpunkte fuer Formation und Taktik */
function setHalftimeEditSection(section) {
  state.halftimeEditSection = section;
  render();
}
function halftimeEditTabs() {
  const current = state.halftimeEditSection || 'formation';
  return `<div class="chips halftimeTabs">
    <button class="chip ${current === 'formation' ? 'selected' : ''}" onclick="setHalftimeEditSection('formation')">Formation</button>
    <button class="chip ${current === 'tactic' ? 'selected' : ''}" onclick="setHalftimeEditSection('tactic')">Taktik</button>
  </div>`;
}
function halftimeChangeScreen() {
  const current = state.halftimeEditSection || 'formation';
  if (current === 'tactic') {
    return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Taktik ändern</h3><div class="infoBox">Passe hier nur die Mannschaftstaktik für die zweite Halbzeit an. Die Formation bleibt unverändert.</div>${tacticsView()}</div>`;
  }
  return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Formation ändern</h3><div class="chips">${formationButtonsForMatch()}</div><h3>Wechsel</h3><div class="infoBox">Hier kannst du zur neuen Formation passende Wechsel vornehmen.</div><div class="subGrid">${halftimeSubControls()}</div></div>`;
}

/* Version 47: Spieltag beenden-Button im Endscreen */
function endMatchdayFromResult() {
  stopMatchTimer();
  state.postMatchWindow = null;
  state.matchDayModal = false;
  state.activeMatch = null;
  state.tab = 'dashboard';
  render();
}

function matchEndScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein abgeschlossenes Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const goals = hfmV64MatchScore(m);
  const finalScore = `${goals.own}:${goals.opp}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Keine besonderen Ereignisse.</li>';
  return `<section class="panel matchPanel"><p class="eyebrow">Spiel beendet</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol><div class="modalActions"><button class="ghost full" onclick="openPostMatchWindow('table')">Tabelle</button><button class="ghost full" onclick="openPostMatchWindow('playerStats')">Spielerstatistiken</button><button class="ghost full" onclick="openPostMatchWindow('matchdayStats')">Spieltagsstatistik</button><button class="primary full" onclick="endMatchdayFromResult()">Spieltag beenden</button></div></section>`;
}

/* Version 48: Halbzeituebersicht ohne eingeblendete Formation/Taktik */
function setHalftimeEditSection(section) {
  state.halftimeEditSection = section;
  render();
}
function halftimeEditTabs() {
  const current = state.halftimeEditSection || 'overview';
  return `<div class="chips halftimeTabs">
    <button class="chip ${current === 'formation' ? 'selected' : ''}" onclick="setHalftimeEditSection('formation')">Formation</button>
    <button class="chip ${current === 'tactic' ? 'selected' : ''}" onclick="setHalftimeEditSection('tactic')">Taktik</button>
  </div>`;
}
function halftimeChangeScreen() {
  const current = state.halftimeEditSection || 'overview';
  if (current === 'tactic') {
    return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Taktik ändern</h3><div class="infoBox">Passe hier nur die Mannschaftstaktik für die zweite Halbzeit an. Die Formation bleibt unverändert.</div>${tacticsView()}</div>`;
  }
  if (current === 'formation') {
    return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Formation ändern</h3><div class="chips">${formationButtonsForMatch()}</div><h3>Wechsel</h3><div class="infoBox">Hier kannst du zur neuen Formation passende Wechsel vornehmen.</div><div class="subGrid">${halftimeSubControls()}</div></div>`;
  }
  return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="infoBox">Wähle oben <b>Formation</b> oder <b>Taktik</b>, um gezielt nur diesen Bereich zu öffnen. In der allgemeinen Halbzeitübersicht werden diese Einstellungen nicht mehr direkt angezeigt.</div>`;
}
function halftimeScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Keine Halbzeitdaten</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Noch keine besonderen Ereignisse.</li>';
  return `<div class="halftimeWindowBackdrop"><section class="panel matchPanel halftimeWindow"><div class="modalHeader"><div><p class="eyebrow">Halbzeitpause</p><h2>${ownClubName()} - ${m.opponent}</h2></div><span class="requiredBadge">Eigener Screen</span></div><div class="scoreBoard"><b>${liveScore}</b><span>45. Minute</span></div>${matchStatRows(m.halftimeStats)}${matchStatusOverview()}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol><div class="infoBox">Dies ist das eigene Halbzeit-Fenster. Formation und Taktik findest du nur noch über die beiden Auswahlpunkte darunter. Starte danach oben rechts mit <b>2. Halbzeit starten</b>.</div>${halftimeChangeScreen()}</section></div>`;
}


/* Version 50: Visuelle Formation auch in der Halbzeitansicht */
function halftimeFormationPitch() {
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    return `<div class="fieldPlayer halftimeFieldPlayer ${fit.className}" style="left:${slot.x}%; top:${slot.y}%;" aria-label="${slot.pos}: ${selectedPlayer ? selectedPlayer.name : 'frei'}">
      <span class="fieldPos">${slot.pos}</span>
      <strong>${name}</strong>
      <small>${selectedPlayer ? eff : '+'}</small>
    </div>`;
  }).join('');
  return `<div class="lineupSummary halftimeLineupSummary">
      <span>Formation: <b>${state.formation}</b></span>
      <span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span>
      <span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span>
    </div>
    <div class="visualPitch halftimePitch" role="group" aria-label="Visuelle Formation in der Halbzeit">
      <div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>
      ${markers}
    </div>`;
}
function halftimeChangeScreen() {
  const current = state.halftimeEditSection || 'overview';
  if (current === 'tactic') {
    return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Taktik ändern</h3><div class="infoBox">Passe hier nur die Mannschaftstaktik für die zweite Halbzeit an. Die Formation bleibt unverändert.</div>${tacticsView()}</div>`;
  }
  if (current === 'formation') {
    return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Formation ändern</h3><div class="infoBox">Hier siehst du auch die visuelle Formation deiner aktuellen Halbzeit-Aufstellung.</div><div class="chips">${formationButtonsForMatch()}</div>${halftimeFormationPitch()}<h3>Wechsel</h3><div class="infoBox">Hier kannst du zur neuen Formation passende Wechsel vornehmen.</div><div class="subGrid">${halftimeSubControls()}</div></div>`;
  }
  return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="infoBox">Wähle oben <b>Formation</b> oder <b>Taktik</b>, um gezielt nur diesen Bereich zu öffnen. In der allgemeinen Halbzeitübersicht werden diese Einstellungen nicht mehr direkt angezeigt.</div>`;
}

/* Version 52: Halbzeitwechsel repariert und 5-Wechsel-Regel */
function usedSubstitutionsCount() {
  const m = state.activeMatch;
  if (!m) return 0;
  if (typeof m.subCount !== 'number') m.subCount = Array.isArray(m.subs) ? m.subs.length : 0;
  return m.subCount;
}
function remainingSubstitutionsCount() {
  return Math.max(0, 5 - usedSubstitutionsCount());
}
function liveSubstitute(slotId, playerId) {
  if (!slotId || !playerId) return;
  const incomingId = Number(playerId);
  const incoming = state.players.find(p => p.id === incomingId);
  if (!incoming) return;
  if (!state.activeMatch) state.activeMatch = { subs: [], subCount: 0 };
  if (!Array.isArray(state.activeMatch.subs)) state.activeMatch.subs = [];
  if (typeof state.activeMatch.subCount !== 'number') state.activeMatch.subCount = state.activeMatch.subs.length || 0;
  const oldId = Number(state.lineup[slotId] || 0);
  if (oldId === incomingId) return;
  if (state.activeMatch.subCount >= 5) {
    alert('Du hast bereits 5 Auswechslungen vorgenommen. Weitere Wechsel sind in diesem Spiel nicht möglich.');
    render();
    return;
  }
  const benchSlot = Object.keys(state.bench || {}).find(k => Number(state.bench[k]) === incomingId);
  if (!benchSlot) {
    alert('Dieser Spieler sitzt nicht auf der Bank und kann deshalb nicht eingewechselt werden.');
    render();
    return;
  }
  Object.keys(state.lineup || {}).forEach(key => {
    if (key !== slotId && Number(state.lineup[key]) === incomingId) state.lineup[key] = null;
  });
  state.lineup[slotId] = incomingId;
  state.bench[benchSlot] = oldId || null;
  state.activeMatch.subCount += 1;
  const outgoing = state.players.find(p => p.id === oldId);
  state.activeMatch.subs.push(`${state.activeMatch.subCount}. Wechsel: ${incoming.name} kommt${outgoing ? ` für ${outgoing.name}` : ''}.`);
  render();
}
function halftimeSubControls() {
  const remaining = remainingSubstitutionsCount();
  const benchPlayers = Object.values(state.bench || {}).filter(Boolean).map(id => state.players.find(x => x.id === Number(id))).filter(Boolean);
  if (!benchPlayers.length) return '<div class="infoBox">Keine Bankspieler verfügbar.</div>';
  const usedInfo = `<div class="infoBox substitutionInfo"><b>Auswechslungen:</b> ${usedSubstitutionsCount()}/5 genutzt · ${remaining} Wechsel verfügbar.</div>`;
  if (remaining <= 0) return usedInfo + '<div class="infoBox">Du hast dein Wechselkontingent von 5 Auswechslungen bereits ausgeschöpft.</div>';
  const controls = lineupEntries().map(entry => {
    const statusBadges = typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(entry.player.id, 'small') : '';
    const benchOptions = benchPlayers.map(p => `<option value="${p.id}">${p.name} · ${p.pos} · Stärke ${p.strength}</option>`).join('');
    return `<label class="fieldLabel matchFieldLabel"><span class="matchPlayerLabel">${entry.slot.pos}: ${entry.player.name} ${statusBadges}</span><select onchange="liveSubstitute('${entry.slot.id}', this.value)"><option value="">kein Wechsel</option>${benchOptions}</select></label>`;
  }).join('');
  return usedInfo + controls;
}
function halftimeFormationPitch() {
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    const statusBadges = selectedPlayer && typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(selectedPlayer.id, 'small') : '';
    return `<div class="fieldPlayer halftimeFieldPlayer ${fit.className}" style="left:${slot.x}%; top:${slot.y}%;" aria-label="${slot.pos}: ${selectedPlayer ? selectedPlayer.name : 'frei'}">
      <span class="fieldPos">${slot.pos}</span>
      <strong>${name}</strong>
      <small>${selectedPlayer ? eff : '+'}</small>
      ${statusBadges ? `<span class="fieldStatusBadges">${statusBadges}</span>` : ''}
    </div>`;
  }).join('');
  return `<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>${state.formation}</b></span><span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span><span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span><span>Wechsel: <b>${usedSubstitutionsCount()}/5</b></span></div><div class="visualPitch halftimePitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>${markers}</div>`;
}
function halftimeChangeScreen() {
  const current = state.halftimeEditSection || 'overview';
  if (current === 'tactic') {
    return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Taktik ändern</h3><div class="infoBox">Passe hier nur die Mannschaftstaktik für die zweite Halbzeit an. Die Formation bleibt unverändert.</div>${tacticsView()}</div>`;
  }
  if (current === 'formation') {
    return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Formation ändern</h3><div class="infoBox">Hier siehst du die visuelle Formation deiner aktuellen Halbzeit-Aufstellung. Über die Wechsel-Felder darunter kannst du Spieler wirklich ein- und auswechseln.</div><div class="chips">${formationButtonsForMatch()}</div>${halftimeFormationPitch()}<h3>Wechsel</h3><div class="subGrid">${halftimeSubControls()}</div></div>`;
  }
  return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="infoBox">Wähle oben <b>Formation</b> oder <b>Taktik</b>, um gezielt nur diesen Bereich zu öffnen. Es sind maximal <b>5 Auswechslungen</b> pro Spiel möglich.</div>`;
}

/* Version 53: Eventbasierte Match-Engine mit positionsgewichteten Noten, Moral, Form, Entwicklung und Marktwert */
function ratingPositionGroup(player) {
  const pos = (player?.pos || '').toUpperCase();
  if (pos === 'TW') return 'keeper';
  if (['IV','LV','RV'].includes(pos)) return 'defense';
  if (['DM','ZM','OM','LM','RM'].includes(pos)) return 'midfield';
  return 'attack';
}
const MATCH_EVENT_RATING_WEIGHTS = {
  goal: { base: 1.15, attack: 1.25, midfield: 0.95, defense: 0.8, keeper: 0.4 },
  assist: { base: 0.75, attack: 0.95, midfield: 1.15, defense: 0.7, keeper: 0.25 },
  keyPass: { base: 0.24, attack: 0.85, midfield: 1.35, defense: 0.7, keeper: 0.2 },
  bigChanceCreated: { base: 0.35, attack: 1.05, midfield: 1.25, defense: 0.6, keeper: 0.2 },
  successfulTackle: { base: 0.24, attack: 0.45, midfield: 1.0, defense: 1.45, keeper: 0.35 },
  interception: { base: 0.22, attack: 0.45, midfield: 1.05, defense: 1.45, keeper: 0.4 },
  aerialWon: { base: 0.16, attack: 0.9, midfield: 0.8, defense: 1.25, keeper: 0.55 },
  save: { base: 0.45, attack: 0.1, midfield: 0.1, defense: 0.15, keeper: 1.4 },
  penaltySaved: { base: 1.0, attack: 0.1, midfield: 0.1, defense: 0.2, keeper: 1.6 },
  passAccuracy: { base: 0.08, attack: 0.75, midfield: 1.25, defense: 0.9, keeper: 0.55 },
  turnover: { base: -0.18, attack: 0.9, midfield: 1.15, defense: 1.35, keeper: 1.55 },
  badPass: { base: -0.13, attack: 0.8, midfield: 1.1, defense: 1.2, keeper: 1.35 },
  missedBigChance: { base: -0.55, attack: 1.25, midfield: 0.75, defense: 0.5, keeper: 0.1 },
  yellow: { base: -0.32, attack: 0.8, midfield: 1.0, defense: 1.1, keeper: 0.8 },
  red: { base: -1.45, attack: 1.0, midfield: 1.0, defense: 1.05, keeper: 1.1 },
  penaltyMissed: { base: -0.85, attack: 1.15, midfield: 1.0, defense: 0.7, keeper: 0.2 },
  foulPenalty: { base: -0.9, attack: 0.6, midfield: 0.9, defense: 1.25, keeper: 1.35 },
  concededError: { base: -0.75, attack: 0.3, midfield: 0.75, defense: 1.45, keeper: 1.55 },
  cleanSheet: { base: 0.45, attack: 0.15, midfield: 0.45, defense: 1.25, keeper: 1.45 },
  winBonus: { base: 0.16, attack: 1, midfield: 1, defense: 1, keeper: 1 },
  underdogBonus: { base: 0.18, attack: 0.8, midfield: 1, defense: 1.2, keeper: 1.3 }
};
function clampRating10(value) { return Math.max(1, Math.min(10, value)); }
function score10ToNote5(score) {
  return Math.round(Math.max(1, Math.min(5, 6 - score / 2)) * 10) / 10;
}
function applyRatingEventToRecord(record, player, eventName, intensity = 1, reason = '') {
  if (!record || !player) return;
  const group = ratingPositionGroup(player);
  const cfg = MATCH_EVENT_RATING_WEIGHTS[eventName] || { base: 0 };
  const mult = typeof cfg[group] === 'number' ? cfg[group] : 1;
  const delta = cfg.base * mult * intensity;
  record.score10 = clampRating10((record.score10 || 6.2) + delta);
  record.events[eventName] = (record.events[eventName] || 0) + 1;
  if (reason) record.reasons.push(reason);
}
function ensureMatchRatingRecord(match, player, role = 'Starter') {
  if (!match.ratingRecords) match.ratingRecords = {};
  if (!player) return null;
  const id = String(player.id);
  if (!match.ratingRecords[id]) {
    const morale = typeof player.satisfaction === 'number' ? player.satisfaction : 60;
    const history = Array.isArray(player.matchRatingHistory) ? player.matchRatingHistory.slice(-3) : [];
    const recentAvg = history.length ? history.reduce((a,b)=>a+b,0) / history.length : 3.0;
    let formBonus = recentAvg <= 2.3 ? 0.22 : recentAvg >= 3.8 ? -0.22 : 0;
    let moraleBonus = morale >= 75 ? 0.16 : morale <= 40 ? -0.22 : 0;
    match.ratingRecords[id] = {
      playerId: player.id,
      name: player.name,
      pos: player.pos,
      role,
      minutes: role === 'Starter' ? 90 : 0,
      score10: clampRating10(6.2 + formBonus + moraleBonus),
      events: {},
      reasons: [],
      note5: 3.0
    };
  }
  return match.ratingRecords[id];
}
function playerSkill(player, skill, fallback = 55) {
  return Number(player?.skills?.[skill] ?? player?.[skill] ?? fallback);
}
function duelValue(player, skills, randomSpread = 0.45) {
  const avg = skills.reduce((sum, s) => sum + playerSkill(player, s, player?.strength || 55), 0) / Math.max(1, skills.length);
  const morale = typeof player?.satisfaction === 'number' ? player.satisfaction : 60;
  const formHistory = Array.isArray(player?.matchRatingHistory) ? player.matchRatingHistory.slice(-3) : [];
  const formAvg = formHistory.length ? formHistory.reduce((a,b)=>a+b,0) / formHistory.length : 3.0;
  const formMod = formAvg <= 2.3 ? 1.05 : formAvg >= 3.8 ? 0.95 : 1;
  const moraleMod = morale >= 75 ? 1.03 : morale <= 40 ? 0.96 : 1;
  return avg * formMod * moraleMod * randomBetween(1 - randomSpread, 1 + randomSpread);
}
function pickByPosition(players, positions, fallbackGroup = null) {
  const filtered = players.filter(p => positions.includes(p.pos));
  if (filtered.length) return filtered[randomInt(0, filtered.length - 1)];
  if (fallbackGroup) {
    const byGroup = players.filter(p => ratingPositionGroup(p) === fallbackGroup);
    if (byGroup.length) return byGroup[randomInt(0, byGroup.length - 1)];
  }
  return players[randomInt(0, Math.max(0, players.length - 1))];
}
function teamProfileForMatch(players, isOwn = false) {
  const roster = players.length ? players : state.players.slice(0, 11);
  const attackPlayers = roster.filter(p => ['ST','LA','RA','OM','LM','RM'].includes(p.pos));
  const midPlayers = roster.filter(p => ['DM','ZM','OM','LM','RM'].includes(p.pos));
  const defPlayers = roster.filter(p => ['TW','IV','LV','RV','DM'].includes(p.pos));
  const avg = (list, unit) => Math.round(list.reduce((s,p)=>s+playerUnitScore(p, unit),0) / Math.max(1, list.length));
  const morale = roster.reduce((s,p)=>s+(typeof p.satisfaction === 'number' ? p.satisfaction : 60),0) / Math.max(1, roster.length);
  const formNotes = roster.flatMap(p => Array.isArray(p.matchRatingHistory) ? p.matchRatingHistory.slice(-3) : []);
  const avgNote = formNotes.length ? formNotes.reduce((a,b)=>a+b,0)/formNotes.length : 3.0;
  const chemistry = morale >= 75 ? 1.05 : morale <= 40 ? 0.95 : 1;
  const form = avgNote <= 2.3 ? 1.05 : avgNote >= 3.8 ? 0.95 : 1;
  const tactic = isOwn ? tacticModifiers() : { attack: 0, defense: 0, control: 0, risk: 0, total: 0, skillSynergy: 0 };
  return {
    roster,
    attack: Math.max(35, avg(attackPlayers.length ? attackPlayers : roster, 'attack') + (tactic.attack || 0) + (tactic.skillSynergy || 0)),
    defense: Math.max(35, avg(defPlayers.length ? defPlayers : roster, 'defense') + (tactic.defense || 0)),
    control: Math.max(35, avg(midPlayers.length ? midPlayers : roster, 'control') + (tactic.control || 0)),
    morale,
    chemistry,
    form,
    tactic,
    power: 0
  };
}
function createOpponentLineup(opponent) {
  const roster = getClubRoster(opponent, OWN_LEAGUE_INDEX).slice(0, 15);
  const wanted = FORMATIONS['4-4-2'];
  const selected = [];
  wanted.forEach(pos => {
    const direct = roster.find(p => !selected.includes(p) && (p.pos === pos || (p.alt||[]).includes(pos)));
    if (direct) selected.push(direct);
    else {
      const any = roster.find(p => !selected.includes(p));
      if (any) selected.push(any);
    }
  });
  return selected.length ? selected : roster.slice(0,11);
}
function preMatchSetup(opponent) {
  const ownPlayers = lineupPlayers().length ? lineupPlayers() : state.players.slice(0, 11);
  const oppPlayers = createOpponentLineup(opponent);
  const own = teamProfileForMatch(ownPlayers, true);
  const opp = teamProfileForMatch(oppPlayers, false);
  own.power = (own.attack * .38 + own.control * .26 + own.defense * .22) * own.chemistry * own.form * 1.05;
  opp.power = (opp.attack * .38 + opp.control * .26 + opp.defense * .22) * opp.chemistry * opp.form;
  const expectation = own.power / Math.max(1, own.power + opp.power);
  return { own, opp, ownPlayers, oppPlayers, expectation };
}
function getRatingRecordsArray(match) {
  return Object.values(match?.ratingRecords || {}).map(r => ({ ...r, note5: score10ToNote5(r.score10 || 6.2) })).sort((a,b)=>a.note5-b.note5);
}
function generateMatchEvents(opponent) {
  const setup = preMatchSetup(opponent);
  const events = [];
  const m = { ratingRecords: {}, ownPlayers: setup.ownPlayers, oppPlayers: setup.oppPlayers, setup };
  setup.ownPlayers.forEach(p => ensureMatchRatingRecord(m, p, 'Starter'));
  const chanceBase = 0.105;
  let ownGoals = 0, oppGoals = 0, ownShots = 0, oppShots = 0;
  for (let minute = 1; minute <= 90; minute++) {
    const late = minute >= 75;
    const scoreState = ownGoals - oppGoals;
    const oppChasing = late && scoreState > 0 ? 1.18 : 1;
    const ownChasing = late && scoreState < 0 ? 1.14 : 1;
    const eventChance = chanceBase + Math.abs(setup.own.power - setup.opp.power) / 1100;
    // Passive phases: passing, pressure, defensive work, with position weighting.
    if (minute % 7 === 0) {
      const mid = pickByPosition(setup.ownPlayers, ['DM','ZM','OM','LM','RM'], 'midfield');
      const rec = ensureMatchRatingRecord(m, mid);
      applyRatingEventToRecord(rec, mid, randomBetween(0,1) > .18 ? 'passAccuracy' : 'badPass', 1, 'Passspiel im Aufbau');
    }
    if (minute % 9 === 0 && scoreState >= 0) {
      setup.ownPlayers.filter(p => ['TW','IV','LV','RV','DM'].includes(p.pos)).forEach(p => applyRatingEventToRecord(ensureMatchRatingRecord(m,p), p, 'interception', .28, 'Defensive Stabilität'));
    }
    if (Math.random() > eventChance) continue;
    const ownSceneWeight = setup.own.power * ownChasing;
    const oppSceneWeight = setup.opp.power * oppChasing;
    const ownScene = Math.random() < ownSceneWeight / (ownSceneWeight + oppSceneWeight);
    if (ownScene) {
      const creator = pickByPosition(setup.ownPlayers, ['OM','ZM','LM','RM','LA','RA'], 'midfield');
      const attacker = pickByPosition(setup.ownPlayers, ['ST','LA','RA','OM'], 'attack');
      const duelA = duelValue(creator, ['passspiel','uebersicht','technik']);
      const duelB = (setup.opp.defense || 60) * randomBetween(.65,1.35);
      if (duelA > duelB) {
        applyRatingEventToRecord(ensureMatchRatingRecord(m, creator), creator, 'keyPass', 1, 'Schlüsselpass');
        if (Math.random() < .16) applyRatingEventToRecord(ensureMatchRatingRecord(m, creator), creator, 'bigChanceCreated', 1, 'Großchance kreiert');
        const shotDuel = duelValue(attacker, ['abschluss','torriecher','technik'], .50);
        const keeperDuel = setup.opp.defense * randomBetween(.55,1.48);
        ownShots++;
        if (Math.random() < .035) {
          events.push({ type:'missed_penalty', minute, team:'own', playerId:attacker.id, playerName:attacker.name, text:`${minute}. Min: ${attacker.name} verschießt einen Elfmeter!` });
          applyRatingEventToRecord(ensureMatchRatingRecord(m, attacker), attacker, 'penaltyMissed', 1, 'Elfmeter verschossen');
        } else if (shotDuel > keeperDuel + 7) {
          ownGoals++;
          applyRatingEventToRecord(ensureMatchRatingRecord(m, attacker), attacker, 'goal', Math.abs(ownGoals - oppGoals) <= 1 ? 1.15 : .85, 'Tor erzielt');
          if (creator && creator.id !== attacker.id) applyRatingEventToRecord(ensureMatchRatingRecord(m, creator), creator, 'assist', 1, 'Torvorlage');
          events.push({ type:'goal', minute, team:'own', scorerId:attacker.id, scorerName:attacker.name, assistId:creator?.id, assistName:creator?.name, text:`${minute}. Min: Tor fuer ${ownClubName()}! ${attacker.name} trifft.` });
        } else {
          applyRatingEventToRecord(ensureMatchRatingRecord(m, attacker), attacker, Math.random() < .34 ? 'missedBigChance' : 'keyPass', .55, 'Abschlussaktion');
        }
      } else {
        applyRatingEventToRecord(ensureMatchRatingRecord(m, creator), creator, 'turnover', .75, 'Ballverlust im Angriff');
      }
    } else {
      const ownDefender = pickByPosition(setup.ownPlayers, ['IV','LV','RV','DM'], 'defense');
      const ownKeeper = pickByPosition(setup.ownPlayers, ['TW'], 'keeper');
      const oppCreator = pickByPosition(setup.oppPlayers, ['OM','ZM','LM','RM','LA','RA'], 'midfield');
      const oppAttacker = pickByPosition(setup.oppPlayers, ['ST','LA','RA','OM'], 'attack');
      const midDuelOwn = duelValue(ownDefender, ['antizipation','stellungsspiel','zweikampf'], .46);
      const midDuelOpp = duelValue(oppCreator, ['passspiel','uebersicht','technik'], .50);
      if (midDuelOwn > midDuelOpp) {
        applyRatingEventToRecord(ensureMatchRatingRecord(m, ownDefender), ownDefender, Math.random() < .5 ? 'successfulTackle' : 'interception', 1, 'Chance abgefangen');
      } else {
        oppShots++;
        const shotDuel = duelValue(oppAttacker, ['abschluss','torriecher','technik'], .50);
        const saveDuel = duelValue(ownKeeper, ['reflexe','handling','sprungkraft'], .52);
        if (Math.random() < .03) {
          events.push({ type:'missed_penalty', minute, team:'opp', playerName:oppAttacker.name, text:`${minute}. Min: ${oppAttacker.name} verschießt einen Elfmeter fuer ${opponent}.` });
          applyRatingEventToRecord(ensureMatchRatingRecord(m, ownKeeper), ownKeeper, 'penaltySaved', .7, 'Elfmeter entschärft');
        } else if (shotDuel > saveDuel + 6) {
          oppGoals++;
          applyRatingEventToRecord(ensureMatchRatingRecord(m, ownKeeper), ownKeeper, 'concededError', .55, 'Gegentor kassiert');
          applyRatingEventToRecord(ensureMatchRatingRecord(m, ownDefender), ownDefender, 'concededError', .5, 'Stellungsfehler vor Gegentor');
          events.push({ type:'goal', minute, team:'opp', scorerName:oppAttacker.name, assistName:oppCreator?.name, text:`${minute}. Min: Tor fuer ${opponent}! ${oppAttacker.name} trifft.` });
        } else {
          applyRatingEventToRecord(ensureMatchRatingRecord(m, ownKeeper), ownKeeper, 'save', 1, 'Parade');
          if (Math.random() < .35) applyRatingEventToRecord(ensureMatchRatingRecord(m, ownDefender), ownDefender, 'successfulTackle', .5, 'Nachsetzen in der Defensive');
        }
      }
    }
    if (Math.random() < 0.018) {
      const p = pickByPosition(setup.ownPlayers, ['IV','DM','ZM','LV','RV','ST'], null);
      applyRatingEventToRecord(ensureMatchRatingRecord(m,p), p, 'yellow', 1, 'Gelbe Karte');
      events.push({ type:'yellow', minute, team:'own', playerId:p.id, playerName:p.name, text:`${minute}. Min: Gelbe Karte fuer ${p.name}.` });
    }
    if (Math.random() < 0.0035) {
      const p = pickByPosition(setup.ownPlayers, ['IV','DM','LV','RV','ZM'], null);
      applyRatingEventToRecord(ensureMatchRatingRecord(m,p), p, 'red', 1, 'Rote Karte');
      events.push({ type:'red', minute, team:'own', playerId:p.id, playerName:p.name, text:`${minute}. Min: Rote Karte fuer ${p.name}!` });
    }
    if (Math.random() < 0.0045) {
      const p = setup.ownPlayers[randomInt(0, setup.ownPlayers.length - 1)];
      events.push({ type:'injury', minute, team:'own', playerId:p.id, playerName:p.name, text:`${minute}. Min: ${p.name} verletzt sich und muss behandelt werden.` });
    }
  }
  // Passive result/context bonuses and expectation correction.
  const won = ownGoals > oppGoals, draw = ownGoals === oppGoals;
  const clean = oppGoals === 0;
  const underdog = setup.expectation < .42;
  setup.ownPlayers.forEach(p => {
    const rec = ensureMatchRatingRecord(m, p);
    if (won) applyRatingEventToRecord(rec, p, 'winBonus', ratingPositionGroup(p) === 'attack' ? 1.1 : .9, 'Team-Erfolg');
    if (draw && underdog) applyRatingEventToRecord(rec, p, 'underdogBonus', 1, 'Über Erwartung gespielt');
    if (clean && ['keeper','defense'].includes(ratingPositionGroup(p))) applyRatingEventToRecord(rec, p, 'cleanSheet', 1, 'Zu Null gespielt');
    if (!won && !draw && !underdog) rec.score10 = clampRating10(rec.score10 - .12);
    rec.note5 = score10ToNote5(rec.score10);
  });
  events.sort((a,b)=>a.minute-b.minute || String(a.type).localeCompare(String(b.type))).forEach((e,i)=>e.id = `${e.minute}-${e.type}-${i}-${e.playerId||e.scorerId||e.scorerName||''}`);
  return { events, ownGoals, oppGoals, ownShots, oppShots, setup, ratingRecords: m.ratingRecords };
}
function predictedMatchScore(opponent) {
  const plan = generateMatchEvents(opponent);
  return { ownGoals: plan.ownGoals, oppGoals: plan.oppGoals, mod: tacticModifiers(), positionPenalty: lineupPenaltyCount()*2, ownPower: Math.round(plan.setup.own.power), oppPower: Math.round(plan.setup.opp.power), unit: lineupUnitScores(), generatedPlan: plan };
}
function createGoalEvents(ownGoals, oppGoals, opponent) {
  const score = arguments[3];
  if (score?.generatedPlan?.events) return score.generatedPlan.events;
  return [];
}
function startMatchScreen() {
  const opponent = state.matchDayModal?.opponent || currentOpponentName();
  const score = predictedMatchScore(opponent);
  const events = score.generatedPlan.events || [];
  const plan = score.generatedPlan;
  state.activeMatch = {
    opponent,
    score,
    events,
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
    createdAt: Date.now(),
    ratingRecords: plan.ratingRecords || {},
    engineSetup: plan.setup,
    engineSummary: { ownShots: plan.ownShots, oppShots: plan.oppShots, expectation: plan.setup.expectation }
  };
  state.matchDayModal = null;
  state.halftimeEditSection = 'overview';
  state.tab = 'match';
  render();
}
function processLiveMinuteEvents() {
  const m = state.activeMatch;
  if (!m) return false;
  ensureMatchStatusStore();
  const events = (m.events || []).filter(e => e.minute === m.currentMinute && !(m.processedEventKeys || []).includes(eventKey(e)));
  for (const e of events) {
    m.processedEventKeys.push(eventKey(e));
    if (['goal','injury','red','yellow','missed_penalty'].includes(e.type)) m.log.push(e.text);
    if (e.type === 'goal') {
      if (e.team === 'own') m.liveScore.own += 1;
      else m.liveScore.opp += 1;
    }
    if (e.team === 'own' && (e.type === 'injury' || e.type === 'red')) {
      rememberMatchPlayerStatus(e.playerId, e.type, e.minute);
      stopMatchTimer();
      m.phase = 'interrupted';
      m.interruption = { type:e.type, minute:e.minute, playerId:e.playerId, playerName:e.playerName, text:e.text, half: m.currentMinute <= 45 ? 1 : 2 };
      render();
      return true;
    }
  }
  return false;
}
function matchStatsForHalf(untilMinute=45) {
  const m = state.activeMatch;
  const ownGoals = (m.events || []).filter(e=>e.type==='goal' && e.team==='own' && e.minute<=untilMinute).length;
  const oppGoals = (m.events || []).filter(e=>e.type==='goal' && e.team==='opp' && e.minute<=untilMinute).length;
  const expectedOwnShots = Math.max(1, Math.round((m.engineSummary?.ownShots || 6) * untilMinute / 90));
  const expectedOppShots = Math.max(1, Math.round((m.engineSummary?.oppShots || 5) * untilMinute / 90));
  const possession = Math.round(Math.max(38, Math.min(64, 50 + ((m.score?.ownPower || 60) - (m.score?.oppPower || 60))/6 + (tacticModifiers().control || 0))));
  return {
    ownGoals,
    oppGoals,
    possession,
    shotsOwn: expectedOwnShots,
    shotsOpp: expectedOppShots,
    xgOwn: (expectedOwnShots * 0.12 + ownGoals * 0.25).toFixed(1),
    xgOpp: (expectedOppShots * 0.12 + oppGoals * 0.25).toFixed(1)
  };
}
function calculatePostMatchPlayerChanges(player, note, record, minutes) {
  const history = Array.isArray(player.matchRatingHistory) ? [...player.matchRatingHistory, note].slice(-10) : [note];
  const last3 = history.slice(-3);
  const avg3 = last3.reduce((a,b)=>a+b,0) / Math.max(1,last3.length);
  const badStreak = last3.length >= 3 && last3.every(n => n >= 4.0);
  const topStreak = last3.length >= 3 && last3.every(n => n <= 2.2);
  let form = avg3 <= 2.3 ? 'Hoch' : avg3 >= 3.8 ? 'Tief' : 'Normal';
  let morale = typeof player.satisfaction === 'number' ? player.satisfaction : 60;
  if (note <= 1.8) morale += 10;
  else if (note <= 2.4) morale += 7;
  else if (note <= 3.1) morale += 2;
  else if (note >= 4.2) morale -= 9;
  else if (note >= 3.7) morale -= 5;
  if (badStreak) { morale -= 8; form = 'Frustriert'; }
  if (topStreak) morale += 6;
  const ageFactor = player.age < 21 ? 1.35 : player.age < 24 ? 1.18 : player.age < 29 ? 0.8 : 0.42;
  const talentFactor = [0, .75, .9, 1.05, 1.25, 1.5][player.talent || 3] || 1;
  const noteFactor = note <= 1.8 ? 2.2 : note <= 2.5 ? 1.55 : note <= 3.2 ? .9 : note <= 4.0 ? .35 : .12;
  const xpGain = Math.round((minutes ? 5 : 0) * ageFactor * talentFactor * noteFactor);
  let progress = Math.max(0, (player.progress || 0) + xpGain);
  let strength = player.strength || 50;
  let levelUps = 0;
  while (progress >= 100 && strength < 100) { progress -= 100; strength += 1; levelUps += 1; }
  const avgSeasonNote = history.reduce((a,b)=>a+b,0) / Math.max(1, history.length);
  const marketMultiplier = Math.max(0.88, Math.min(1.25, 1 + (3.0 - avgSeasonNote) * 0.08));
  const newMarketValue = Math.round((player.marketValue || 1000000) * marketMultiplier / 10000) * 10000;
  return { history, form, morale: clamp(Math.round(morale), 0, 100), progress, strength, levelUps, xpGain, newMarketValue };
}
function updatePlayerSeasonStatsFromMatch() {
  const m = state.activeMatch;
  if (!m) return;
  const records = m.ratingRecords || {};
  const ownGoalEvents = (m.events || []).filter(e => e.type === 'goal' && e.team === 'own');
  const ownAssistEvents = ownGoalEvents.filter(e => e.assistId);
  const starters = lineupEntries().map(e => e.player.id);
  const subbedIn = (m.subs || []).map(line => {
    const match = String(line).match(/Wechsel:\s(.+?)\skommt/);
    return match ? match[1] : null;
  }).filter(Boolean);
  state.players = state.players.map(p => {
    const rec = records[String(p.id)];
    let minutes = starters.includes(p.id) ? 90 : 0;
    if (rec) minutes = rec.minutes || minutes || 20;
    const note = rec ? score10ToNote5(rec.score10) : (minutes ? 3.2 : p.rating || 3.0);
    const goals = ownGoalEvents.filter(e => String(e.scorerId) === String(p.id)).length;
    const assists = ownAssistEvents.filter(e => String(e.assistId) === String(p.id)).length;
    const changes = calculatePostMatchPlayerChanges(p, note, rec, minutes);
    return {
      ...p,
      minutes,
      rating: note,
      lastRating: note,
      matchRatingHistory: changes.history,
      form: changes.form,
      satisfaction: changes.morale,
      progress: changes.progress,
      strength: changes.strength,
      marketValue: changes.newMarketValue,
      xpLastMatch: changes.xpGain,
      seasonGoals: (p.seasonGoals||0)+goals,
      seasonAssists:(p.seasonAssists||0)+assists,
      seasonPoints:(p.seasonPoints||0)+goals+assists,
      seasonRatingSum:(p.seasonRatingSum||0)+note,
      seasonRatingGames:(p.seasonRatingGames||0)+(minutes?1:0),
      noPlayWeeks: minutes ? 0 : (p.noPlayWeeks || 0) + 1
    };
  });
  (m.events || []).filter(e=>e.type==='goal' && e.team==='opp').forEach(e => {
    const id = `opp-${m.opponent}-${e.scorerName}`;
    let stat = state.externalPlayerStats.find(s=>s.id===id);
    if (!stat) { stat = { id, name:e.scorerName, club:m.opponent, goals:0, assists:0, points:0 }; state.externalPlayerStats.push(stat); }
    stat.goals += 1; stat.points += 1;
    if (e.assistName) {
      const aid = `opp-${m.opponent}-${e.assistName}`;
      let ast = state.externalPlayerStats.find(s=>s.id===aid);
      if (!ast) { ast = { id:aid, name:e.assistName, club:m.opponent, goals:0, assists:0, points:0 }; state.externalPlayerStats.push(ast); }
      ast.assists += 1; ast.points += 1;
    }
  });
}
function matchRatingTable() {
  const m = state.activeMatch;
  if (!m) return '';
  const rows = getRatingRecordsArray(m).map(r => {
    const e = r.events || {};
    const impact = [
      e.goal ? `${e.goal} Tor${e.goal>1?'e':''}` : '',
      e.assist ? `${e.assist} Vorlage${e.assist>1?'n':''}` : '',
      e.keyPass ? `${e.keyPass} Key Pass` : '',
      e.successfulTackle ? `${e.successfulTackle} Tackling` : '',
      e.interception ? `${e.interception} abgefangen` : '',
      e.save ? `${e.save} Parade${e.save>1?'n':''}` : '',
      e.red ? 'Rot' : '',
      e.yellow ? 'Gelb' : ''
    ].filter(Boolean).join(' · ') || 'solide Grundbewertung';
    return `<tr><td>${r.name}</td><td>${r.pos}</td><td><b>${r.note5.toFixed(1)}</b></td><td>${impact}</td></tr>`;
  }).join('');
  return `<h3>Spielernoten</h3><div class="infoBox">Noten laufen von <b>1 bis 5</b>. 1 ist sehr stark, 5 ist schwach. Die Berechnung nutzt Tore, Vorlagen, Fehler, defensive Aktionen, Passspiel, Karten, Spielkontext und Positionsgewichtung.</div><div class="tableWrap ratingTable"><table><thead><tr><th>Spieler</th><th>Pos.</th><th>Note</th><th>Bewertungsgrundlage</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function finishActiveMatch() {
  const m = state.activeMatch;
  if (!m || m.finishedApplied) return;
  const opponent = m.opponent;
  const ownGoals = m.score.ownGoals, oppGoals = m.score.oppGoals;
  applyResultToTable(ownClubName(), opponent, ownGoals, oppGoals);
  const other = simulateOtherLeagueResults(opponent);
  sortCurrentTable();
  updatePlayerSeasonStatsFromMatch();
  updateClubImageTrend();
  state.matchPlayedWeek = state.week;
  state.lastMatchReport = { opponent, score:`${ownGoals}:${oppGoals}`, ownGoals, oppGoals, tacticBonus:m.score.mod.total, skillSynergy:m.score.mod.skillSynergy, positionPenalty:m.score.positionPenalty, ownPower:m.score.ownPower, oppPower:m.score.oppPower, units:m.score.unit, text: ownGoals > oppGoals ? 'Sieg' : ownGoals === oppGoals ? 'Unentschieden' : 'Niederlage' };
  state.lastMatchdayResults = [{ home: ownClubName(), away: opponent, hg: ownGoals, ag: oppGoals }, ...other];
  m.finishedApplied = true;
}
function matchEndScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein abgeschlossenes Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const finalScore = `${m.liveScore?.own ?? m.score?.ownGoals ?? 0}:${m.liveScore?.opp ?? m.score?.oppGoals ?? 0}`;
  const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Keine besonderen Ereignisse.</li>';
  return `<section class="panel matchPanel"><p class="eyebrow">Spiel beendet</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol>${matchRatingTable()}<div class="modalActions"><button class="ghost full" onclick="openPostMatchWindow('table')">Tabelle</button><button class="ghost full" onclick="openPostMatchWindow('playerStats')">Spielerstatistiken</button><button class="ghost full" onclick="openPostMatchWindow('matchdayStats')">Spieltagsstatistik</button><button class="primary full" onclick="endMatchdayFromResult()">Spieltag beenden</button></div></section>`;
}

/* Version 54: Kondition, Verletzungsrisiko, CA/PA-Progression und Fitness-Match-Engine */
function initAdvancedFitnessProgression() {
  state.players = (state.players || []).map(p => {
    const skills = p.skills || generateSkillsForPlayer(p);
    const stamina = skills.stamina || p.stamina || randomInt(50, 86);
    const injuryProne = typeof p.injuryProne === 'number' ? p.injuryProne : clamp(35 + (stableHash(p.name + 'inj') % 45) - Math.floor(stamina / 8), 8, 88);
    const ca = typeof p.ca === 'number' ? p.ca : Math.round((p.strength || 50) * 2);
    const paMin = typeof p.paMin === 'number' ? p.paMin : clamp(ca + (p.talent || 3) * 8, ca + 3, 198);
    const paMax = typeof p.paMax === 'number' ? p.paMax : clamp(paMin + 10 + (p.talent || 3) * 8, paMin, 200);
    const pa = typeof p.pa === 'number' ? p.pa : randomInt(paMin, paMax);
    return { ...p, skills, stamina, injuryProne, ca, paMin, paMax, pa, fitness: typeof p.fitness === 'number' ? p.fitness : 100, injury: p.injury || null };
  });
}
function roleIntensity(pos) {
  return ({ TW:0.62, IV:0.82, LV:1.08, RV:1.08, DM:1.02, ZM:1.12, OM:1.08, LM:1.16, RM:1.16, LA:1.22, RA:1.22, ST:1.02 })[pos] || 1;
}
function tacticIntensity() {
  const pressing = ({ niedrig:0.84, normal:1.0, hoch:1.22 })[state.tactics?.pressing] || 1;
  const tempo = ({ langsam:0.9, normal:1.0, schnell:1.14 })[state.tactics?.tempo] || 1;
  const risk = ({ sicher:0.92, ausgewogen:1.0, mutig:1.1 })[state.tactics?.risk] || 1;
  return pressing * tempo * risk;
}
function fatigueAttributeFactor(fitness) {
  if (fitness >= 75) return 1;
  if (fitness >= 60) return .94;
  if (fitness >= 45) return .86;
  if (fitness >= 30) return .75;
  return .62;
}
function updateMatchFitnessForMinute(match) {
  const intensity = tacticIntensity();
  if (!match.playerFitness) match.playerFitness = {};
  lineupEntries().forEach(entry => {
    const p = entry.player;
    const id = String(p.id);
    const current = typeof match.playerFitness[id] === 'number' ? match.playerFitness[id] : 100;
    const stamina = p.skills?.stamina || p.stamina || 60;
    const staminaModifier = 1 - stamina / 210;
    const loss = 0.35 * staminaModifier * intensity * roleIntensity(entry.slot.pos);
    match.playerFitness[id] = clamp(Math.round((current - loss) * 10) / 10, 0, 100);
  });
}
function fatigueInjuryRiskForPlayer(player, currentFitness) {
  let fatigueFactor = 1;
  if (currentFitness < 70) fatigueFactor = 2;
  if (currentFitness < 50) fatigueFactor = 5;
  if (currentFitness < 35) fatigueFactor = 12;
  const prone = player.injuryProne || 45;
  return 0.001 * fatigueFactor * (prone / 50);
}
function weightedInjuryType(cause) {
  const roll = Math.random();
  if (cause === 'foul') {
    if (roll < .70) return { name:'Prellung / Pferdekuss', days: randomInt(1,3), severity:'leicht' };
    if (roll < .95) return { name:'Bänderriss Knöchel', days: randomInt(28,42), severity:'mittel' };
    return { name:'Knochenbruch', days: randomInt(90,180), severity:'schwer' };
  }
  if (roll < .60) return { name:'Muskelverhärtung', days: randomInt(2,5), severity:'leicht' };
  if (roll < .95) return { name:'Muskelfaserriss', days: randomInt(14,28), severity:'mittel' };
  return { name:'Kreuzbandriss', days: randomInt(180,270), severity:'schwer' };
}
function triggerAdvancedInjury(match, player, cause, minute) {
  if (!match || !player) return null;
  const injury = weightedInjuryType(cause);
  if (!match.injuries) match.injuries = [];
  match.injuries.push({ playerId: player.id, playerName: player.name, cause, minute, ...injury });
  return { type:'injury', minute, team:'own', playerId:player.id, playerName:player.name, injury, text:`${minute}. Min: ${player.name} verletzt sich (${injury.name}, ca. ${injury.days} Tage).` };
}
function checkFatigueInjuries(match) {
  if (!match || match.currentMinute % 10 !== 0) return null;
  const candidates = lineupEntries().map(e => e.player).filter(p => !match.injuries?.some(i => i.playerId === p.id));
  for (const p of candidates) {
    const f = match.playerFitness?.[String(p.id)] ?? 100;
    if (Math.random() < fatigueInjuryRiskForPlayer(p, f)) return triggerAdvancedInjury(match, p, 'fatigue', match.currentMinute);
  }
  return null;
}
function fitnessAdjustedPlayerScore(player, unit, fitness) {
  return Math.round(playerUnitScore(player, unit) * fatigueAttributeFactor(fitness));
}
function monthlyAgeDevelopmentFactor(age) {
  if (age <= 21) return 1.45;
  if (age <= 24) return 1.18;
  if (age <= 28) return .92;
  if (age <= 31) return .35;
  return -.45;
}
function distributeXPToSkills(player, xp, preferredUnit) {
  if (!player.skills) player.skills = generateSkillsForPlayer(player);
  const relevant = POSITION_WEIGHTS[player.pos] || POSITION_WEIGHTS.ZM;
  const keys = Object.keys(relevant).sort((a,b)=>relevant[b]-relevant[a]).slice(0,5);
  const gain = Math.max(0, xp / 28);
  keys.forEach(k => { player.skills[k] = clamp(Math.round((player.skills[k] + gain * (relevant[k] || 1)) * 10) / 10, 1, 100); });
  player.strength = overallForPosition(player, player.pos);
  return player;
}
function applyDynamicPotential(player, note) {
  const hist = Array.isArray(player.matchRatingHistory) ? player.matchRatingHistory : [];
  const avg = hist.length ? hist.reduce((a,b)=>a+b,0)/hist.length : note;
  let pa = player.pa || (player.strength || 50) * 2 + (player.talent || 3) * 10;
  if (player.age <= 20 && avg <= 2.2 && (player.satisfaction || 60) >= 75) pa += 2;
  if (player.age <= 22 && avg >= 4.0 && (player.satisfaction || 60) <= 45) pa -= 2;
  return clamp(Math.round(pa), player.ca || 1, 200);
}
function calculatePostMatchPlayerChanges(player, note, rec, minutes) {
  const history = Array.isArray(player.matchRatingHistory) ? [...player.matchRatingHistory, note].slice(-10) : [note];
  const last3 = history.slice(-3);
  const avg3 = last3.reduce((a,b)=>a+b,0) / Math.max(1,last3.length);
  const badStreak = last3.length >= 3 && last3.every(n => n >= 4.0);
  const topStreak = last3.length >= 3 && last3.every(n => n <= 2.2);
  let form = avg3 <= 2.3 ? 'Hoch' : avg3 >= 3.8 ? 'Tief' : 'Normal';
  let morale = typeof player.satisfaction === 'number' ? player.satisfaction : 60;
  if (note <= 1.8) morale += 10; else if (note <= 2.4) morale += 7; else if (note <= 3.1) morale += 2; else if (note >= 4.2) morale -= 9; else if (note >= 3.7) morale -= 5;
  if (badStreak) { morale -= 8; form = 'Frustriert'; }
  if (topStreak) morale += 6;
  const ageFactor = monthlyAgeDevelopmentFactor(player.age);
  const talentFactor = [0, .75, .9, 1.05, 1.25, 1.5][player.talent || 3] || 1;
  const noteFactor = note <= 1.8 ? 2.2 : note <= 2.5 ? 1.55 : note <= 3.2 ? .9 : note <= 4.0 ? .35 : .12;
  const practiceXP = minutes ? (5 + minutes / 18) : 0;
  const xpGain = Math.round(practiceXP * Math.max(.1, ageFactor) * talentFactor * noteFactor);
  let progress = Math.max(0, (player.progress || 0) + xpGain);
  let clone = { ...player, progress, satisfaction: clamp(Math.round(morale), 0, 100), matchRatingHistory: history };
  if (ageFactor < 0) {
    const physicalLoss = Math.abs(ageFactor) * (note >= 3.5 ? .9 : .35);
    ['speed','stamina'].forEach(k => { if (clone.skills?.[k]) clone.skills[k] = clamp(Math.round((clone.skills[k] - physicalLoss) * 10) / 10, 1, 100); });
    ['positioning','anticipation'].forEach(k => { if (clone.skills?.[k]) clone.skills[k] = clamp(Math.round((clone.skills[k] + .08) * 10) / 10, 1, 100); });
  } else {
    clone = distributeXPToSkills(clone, xpGain, ratingPositionGroup(player));
  }
  let strength = overallForPosition(clone, clone.pos);
  let levelUps = 0;
  while (progress >= 100 && strength < 100 && (clone.ca || strength * 2) < (clone.pa || 200)) { progress -= 100; strength += 1; levelUps += 1; }
  const ca = clamp(Math.round(strength * 2), 1, 200);
  const pa = applyDynamicPotential({ ...clone, ca }, note);
  const avgSeasonNote = history.reduce((a,b)=>a+b,0) / Math.max(1, history.length);
  const marketMultiplier = Math.max(0.82, Math.min(1.35, 1 + (3.0 - avgSeasonNote) * 0.1));
  const newMarketValue = Math.round((player.marketValue || 1000000) * marketMultiplier / 10000) * 10000;
  return { history, form, morale: clamp(Math.round(morale), 0, 100), progress, strength, levelUps, xpGain, newMarketValue, skills: clone.skills, ca, pa };
}
function startMatchScreen() {
  initAdvancedFitnessProgression();
  const opponent = state.matchDayModal?.opponent || currentOpponentName();
  const plan = simulateEventBasedMatchPlan(opponent);
  state.activeMatch = {
    opponent,
    score: { ownGoals: plan.ownGoals, oppGoals: plan.oppGoals, mod: tacticModifier(), positionPenalty: lineupPenaltyCount() * 2, ownPower: plan.setup.own.attack, oppPower: plan.setup.opp.attack, unit: lineupUnitScores() },
    events: plan.events,
    phase:'firstReady', currentMinute:0, liveScore:{own:0, opp:0}, log:[], processedEventKeys:[], subs:[], halftimeStats:null, fullStats:null, interruption:null, createdAt:Date.now(), ratingRecords:plan.ratingRecords || {}, playerFitness:{}, injuries:[]
  };
  lineupEntries().forEach(e => { state.activeMatch.playerFitness[String(e.player.id)] = 100; });
  state.matchDayModal = null; state.tab = 'match'; render();
}
function processLiveMinuteEvents() {
  const m = state.activeMatch; if (!m) return false;
  ensureMatchStatusStore(); updateMatchFitnessForMinute(m);
  const fatigueInjury = checkFatigueInjuries(m);
  if (fatigueInjury) m.events.push(fatigueInjury);
  const events = (m.events || []).filter(e => e.minute === m.currentMinute && !(m.processedEventKeys || []).includes(eventKey(e)));
  for (const e of events) {
    m.processedEventKeys.push(eventKey(e));
    if (['goal','injury','red','yellow','missed_penalty'].includes(e.type)) m.log.push(e.text);
    if (e.type === 'goal') { if (e.team === 'own') m.liveScore.own += 1; else m.liveScore.opp += 1; }
    if (e.team === 'own' && (e.type === 'injury' || e.type === 'red')) {
      if (e.type === 'injury') {
        const p = state.players.find(x => String(x.id) === String(e.playerId));
        const inj = e.injury || weightedInjuryType('foul');
        if (p) p.injury = { name: inj.name, days: inj.days, cause: e.cause || 'Spiel', sinceWeek: state.week };
      }
      rememberMatchPlayerStatus(e.playerId, e.type, e.minute); stopMatchTimer(); m.phase = 'interrupted';
      m.interruption = { type:e.type, minute:e.minute, playerId:e.playerId, playerName:e.playerName, text:e.text, half:m.currentMinute <= 45 ? 1 : 2 };
      render(); return true;
    }
  }
  return false;
}
function updatePlayerSeasonStatsFromMatch() {
  const m = state.activeMatch; if (!m) return;
  const records = m.ratingRecords || {}; const ownGoalEvents = (m.events || []).filter(e => e.type === 'goal' && e.team === 'own'); const ownAssistEvents = ownGoalEvents.filter(e => e.assistId); const starters = lineupEntries().map(e => e.player.id);
  state.players = state.players.map(p => {
    const rec = records[String(p.id)]; let minutes = starters.includes(p.id) ? 90 : 0; if (rec) minutes = rec.minutes || minutes || 20;
    const note = rec ? score10ToNote5(rec.score10) : (minutes ? 3.2 : p.rating || 3.0);
    const goals = ownGoalEvents.filter(e => String(e.scorerId) === String(p.id)).length; const assists = ownAssistEvents.filter(e => String(e.assistId) === String(p.id)).length;
    const changes = calculatePostMatchPlayerChanges(p, note, rec, minutes); const id = String(p.id); const fitnessAfter = m.playerFitness?.[id];
    return { ...p, skills: changes.skills || p.skills, ca: changes.ca, pa: changes.pa, minutes, rating: note, lastRating: note, matchRatingHistory: changes.history, form: changes.form, satisfaction: changes.morale, progress: changes.progress, strength: changes.strength, marketValue: changes.newMarketValue, xpLastMatch: changes.xpGain, fitness: typeof fitnessAfter === 'number' ? Math.round(fitnessAfter) : p.fitness, seasonGoals:(p.seasonGoals||0)+goals, seasonAssists:(p.seasonAssists||0)+assists, seasonPoints:(p.seasonPoints||0)+goals+assists, seasonRatingSum:(p.seasonRatingSum||0)+note, seasonRatingGames:(p.seasonRatingGames||0)+(minutes?1:0), noPlayWeeks: minutes ? 0 : (p.noPlayWeeks || 0) + 1 };
  });
  (m.events || []).filter(e=>e.type==='goal' && e.team==='opp').forEach(e => { const id = `opp-${m.opponent}-${e.scorerName}`; let stat = state.externalPlayerStats.find(s=>s.id===id); if (!stat) { stat = { id, name:e.scorerName, club:m.opponent, goals:0, assists:0, points:0 }; state.externalPlayerStats.push(stat); } stat.goals += 1; stat.points += 1; if (e.assistName) { const aid = `opp-${m.opponent}-${e.assistName}`; let ast = state.externalPlayerStats.find(s=>s.id===aid); if (!ast) { ast = { id:aid, name:e.assistName, club:m.opponent, goals:0, assists:0, points:0 }; state.externalPlayerStats.push(ast); } ast.assists += 1; ast.points += 1; } });
}
function matchFitnessTable() {
  const m = state.activeMatch; if (!m?.playerFitness) return '';
  const rows = lineupEntries().map(e => { const f = m.playerFitness[String(e.player.id)]; return `<tr><td>${e.player.name}</td><td>${e.slot.pos}</td><td>${typeof f === 'number' ? Math.round(f) + '%' : '-'}</td><td>${f < 45 ? 'Akute Verletzungsgefahr' : f < 60 ? 'müde' : f < 75 ? 'belastet' : 'fit'}</td></tr>`; }).join('');
  return `<h3>Kondition & Verletzungsrisiko</h3><div class="infoBox">Kondition sinkt je nach Ausdauer, Position, Pressing, Tempo und Risiko. Unter 70%, 50% und 35% steigen Leistungsabfall und Verletzungsrisiko deutlich.</div><div class="tableWrap"><table><thead><tr><th>Spieler</th><th>Pos.</th><th>Restfitness</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function matchEndScreen() {
  const m = state.activeMatch; if (!m) return `<section class="panel"><h2>Kein abgeschlossenes Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const finalScore = `${m.liveScore?.own ?? m.score?.ownGoals ?? 0}:${m.liveScore?.opp ?? m.score?.oppGoals ?? 0}`; const log = (m.log || []).map(line => `<li>${line}</li>`).join('') || '<li>Keine besonderen Ereignisse.</li>';
  return `<section class="panel matchPanel"><p class="eyebrow">Spiel beendet</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Wichtige Ereignisse</h3><ol class="matchLog">${log}</ol>${matchRatingTable()}<div class="modalActions"><button class="ghost full" onclick="openPostMatchWindow('table')">Tabelle</button><button class="ghost full" onclick="openPostMatchWindow('playerStats')">Spielerstatistiken</button><button class="ghost full" onclick="openPostMatchWindow('matchdayStats')">Spieltagsstatistik</button><button class="primary full" onclick="endMatchdayFromResult()">Spieltag beenden</button></div></section>`;
}

/* Version 55: Drag & Drop fuer Aufstellung und Halbzeitwechsel */
function squadDragStart(event, sourceType, sourceSlotId) {
  state.dragSquadSource = { type: sourceType, slotId: sourceSlotId };
  try {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', JSON.stringify(state.dragSquadSource));
  } catch (err) {}
}
function squadDragOver(event) {
  event.preventDefault();
  try { event.dataTransfer.dropEffect = 'move'; } catch (err) {}
}
function readSquadDragSource(event) {
  try {
    const raw = event.dataTransfer.getData('text/plain');
    if (raw) return JSON.parse(raw);
  } catch (err) {}
  return state.dragSquadSource || null;
}
function playerIdInSquadSlot(type, slotId) {
  return Number((type === 'lineup' ? state.lineup?.[slotId] : state.bench?.[slotId]) || 0);
}
function setSquadSlot(type, slotId, playerId) {
  if (type === 'lineup') state.lineup[slotId] = playerId || null;
  else {
    if (!state.bench) state.bench = {};
    state.bench[slotId] = playerId || null;
  }
}
function cleanupSquadDuplicates() {
  const seen = new Set();
  Object.keys(state.lineup || {}).forEach(k => {
    const id = Number(state.lineup[k] || 0);
    if (!id) return;
    if (seen.has(id)) state.lineup[k] = null;
    else seen.add(id);
  });
  Object.keys(state.bench || {}).forEach(k => {
    const id = Number(state.bench[k] || 0);
    if (!id) return;
    if (seen.has(id)) state.bench[k] = null;
    else seen.add(id);
  });
}
function isLiveMatchSquadEdit() {
  return !!state.activeMatch && ['firstReady','halftime','interrupted'].includes(state.activeMatch.phase);
}
function dropSquadPlayer(event, targetType, targetSlotId) {
  event.preventDefault();
  const source = readSquadDragSource(event);
  state.dragSquadSource = null;
  if (!source || !source.type || !source.slotId) return;
  if (source.type === targetType && source.slotId === targetSlotId) return;
  const sourceId = playerIdInSquadSlot(source.type, source.slotId);
  const targetId = playerIdInSquadSlot(targetType, targetSlotId);
  if (!sourceId) return;

  if (isLiveMatchSquadEdit()) {
    if (source.type === 'bench' && targetType === 'lineup') {
      liveSubstitute(targetSlotId, sourceId);
      return;
    }
    if (source.type === 'lineup' && targetType === 'bench') {
      if (!targetId) {
        alert('Während des Spiels kannst du einen Startelfspieler nur durch einen Bankspieler ersetzen. Ziehe dafür einen Bankspieler auf seine Position.');
        render();
        return;
      }
      liveSubstitute(source.slotId, targetId);
      return;
    }
  }

  setSquadSlot(source.type, source.slotId, targetId || null);
  setSquadSlot(targetType, targetSlotId, sourceId);
  cleanupSquadDuplicates();
  render();
}
function dragAttrs(type, slotId) {
  return `draggable="true" ondragstart="squadDragStart(event,'${type}','${slotId}')" ondragover="squadDragOver(event)" ondrop="dropSquadPlayer(event,'${type}','${slotId}')"`;
}
function lineup() {
  const formationButtons = Object.keys(FORMATIONS).map(f => `<button class="chip ${state.formation === f ? 'selected' : ''}" onclick="setFormation('${f}')">${f}</button>`).join('');
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
      <div class="strengthLine"><span>Basis: <b>${selectedPlayer ? selectedPlayer.strength : '-'}</b></span><span>Auf ${slot.pos}: <b>${selectedPlayer ? eff : '-'}</b></span>${loss > 0 ? `<span class="loss">-${loss}</span>` : selectedPlayer ? `<span class="bonus">optimal</span>` : ''}</div>
    </button>`;
  }).join('');
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    return `<button class="fieldPlayer draggablePlayer ${fit.className}" ${dragAttrs('lineup', slot.id)} style="left:${slot.x}%; top:${slot.y}%;" onclick="openLineupSlot('${slot.id}')" aria-label="${slot.pos} bearbeiten">
      <span class="fieldPos">${slot.pos}</span><strong>${name}</strong><small>${selectedPlayer ? eff : '+'}</small>
    </button>`;
  }).join('');
  const benchCards = benchSlots().map(slot => {
    const player = state.players.find(p => p.id === Number((state.bench || {})[slot.id]));
    return `<button class="benchCard draggableBench" ${dragAttrs('bench', slot.id)} onclick="openBenchSlot('${slot.id}')">
      <span class="benchNumber">Bank ${slot.index + 1}</span>
      <strong>${player ? player.name : 'Spieler wählen'}</strong>
      <small>${player ? `${positionText(player)} · Stärke ${player.strength} · ${stars(player.talent)}` : 'Antippen oder Spieler hierher ziehen'}</small>
    </button>`;
  }).join('');
  const modal = lineupSlotModal() + benchSlotModal();
  return `<section class="panel"><p class="eyebrow">Team · Aufstellung</p><h2>Formation wählen & Spieler platzieren</h2><div class="chips">${formationButtons}</div><div class="infoBox">Du kannst Spieler jetzt per Drag & Drop zwischen Spielfeldpositionen und Ersatzbank verschieben. Antippen funktioniert weiterhin wie bisher.</div><div class="lineupSummary"><span>Formation: <b>${state.formation}</b></span><span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span><span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span></div><div class="visualPitch" role="group" aria-label="Visuelle Aufstellung"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>${markers}</div><h3>Ersatzbank</h3><div class="benchGrid">${benchCards}</div><h3>Positionsdetails</h3><div class="pitch detailPitch">${detailCards}</div>${modal}</section>`;
}
function halftimeBenchDragGrid() {
  const cards = benchSlots().map(slot => {
    const player = state.players.find(p => p.id === Number((state.bench || {})[slot.id]));
    return `<button class="benchCard draggableBench halftimeBenchCard" ${dragAttrs('bench', slot.id)} onclick="openBenchSlot('${slot.id}')"><span class="benchNumber">Bank ${slot.index + 1}</span><strong>${player ? player.name : 'frei'}</strong><small>${player ? `${positionText(player)} · Stärke ${player.strength}` : 'frei'}</small></button>`;
  }).join('');
  return `<h3>Ersatzbank</h3><div class="infoBox">Ziehe einen Bankspieler direkt auf eine Position im Feld. Das zählt als Auswechslung. Maximal 5 Wechsel pro Spiel.</div><div class="benchGrid halftimeBenchGrid">${cards}</div>`;
}
function halftimeFormationPitch() {
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    const statusBadges = selectedPlayer && typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(selectedPlayer.id, 'small') : '';
    return `<div class="fieldPlayer halftimeFieldPlayer draggablePlayer ${fit.className}" ${dragAttrs('lineup', slot.id)} style="left:${slot.x}%; top:${slot.y}%;" aria-label="${slot.pos}: ${selectedPlayer ? selectedPlayer.name : 'frei'}"><span class="fieldPos">${slot.pos}</span><strong>${name}</strong><small>${selectedPlayer ? eff : '+'}</small>${statusBadges ? `<span class="fieldStatusBadges">${statusBadges}</span>` : ''}</div>`;
  }).join('');
  return `<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>${state.formation}</b></span><span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span><span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span><span>Wechsel: <b>${usedSubstitutionsCount()}/5</b></span></div><div class="visualPitch halftimePitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>${markers}</div>`;
}
function halftimeSubControls() {
  const remaining = remainingSubstitutionsCount();
  const benchPlayers = Object.values(state.bench || {}).filter(Boolean).map(id => state.players.find(x => x.id === Number(id))).filter(Boolean);
  const usedInfo = `<div class="infoBox substitutionInfo"><b>Auswechslungen:</b> ${usedSubstitutionsCount()}/5 genutzt · ${remaining} Wechsel verfügbar.</div>`;
  if (!benchPlayers.length) return usedInfo + '<div class="infoBox">Keine Bankspieler verfügbar.</div>';
  if (remaining <= 0) return usedInfo + '<div class="infoBox">Du hast dein Wechselkontingent von 5 Auswechslungen bereits ausgeschöpft.</div>';
  const benchOptions = benchPlayers.map(p => `<option value="${p.id}">${p.name} · ${p.pos} · Stärke ${p.strength}</option>`).join('');
  const controls = lineupEntries().map(entry => {
    const statusBadges = typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(entry.player.id, 'small') : '';
    return `<label class="fieldLabel matchFieldLabel"><span class="matchPlayerLabel">${entry.slot.pos}: ${entry.player.name} ${statusBadges}</span><select onchange="liveSubstitute('${entry.slot.id}', this.value)"><option value="">kein Wechsel</option>${benchOptions}</select></label>`;
  }).join('');
  return usedInfo + halftimeBenchDragGrid() + '<h3>Klassische Wechsel-Auswahl</h3>' + controls;
}
function halftimeChangeScreen() {
  const current = state.halftimeEditSection || 'overview';
  if (current === 'tactic') return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Taktik ändern</h3><div class="infoBox">Passe hier nur die Mannschaftstaktik für die zweite Halbzeit an. Die Formation bleibt unverändert.</div>${tacticsView()}</div>`;
  if (current === 'formation') return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Formation ändern</h3><div class="infoBox">Du kannst in der Halbzeit Spieler per Drag & Drop direkt vom Feld auf die Bank oder von der Bank auf eine Position ziehen. Ein Bankspieler auf eine Feldposition zählt als Auswechslung.</div><div class="chips">${formationButtonsForMatch()}</div>${halftimeFormationPitch()}<h3>Wechsel</h3><div class="subGrid">${halftimeSubControls()}</div></div>`;
  return `<h3>Halbzeit-Anpassung</h3>${halftimeEditTabs()}<div class="infoBox">Wähle oben <b>Formation</b> oder <b>Taktik</b>, um gezielt nur diesen Bereich zu öffnen. In der Formation kannst du Spieler auch per Drag & Drop wechseln. Maximal <b>5 Auswechslungen</b> pro Spiel.</div>`;
}

/* Version 57: Fix fuer Button "Weiter zum Spiel" */
function simulateEventBasedMatchPlan(opponent) {
  if (typeof generateMatchEvents === 'function') return generateMatchEvents(opponent);
  const score = predictedMatchScore(opponent);
  return score.generatedPlan || { events: createGoalEvents(score.ownGoals, score.oppGoals, opponent, score), ownGoals: score.ownGoals, oppGoals: score.oppGoals, ownShots: 0, oppShots: 0, setup: preMatchSetup(opponent), ratingRecords: {} };
}

function startMatchScreen() {
  try {
    if (typeof initAdvancedFitnessProgression === 'function') initAdvancedFitnessProgression();
    const opponent = state.matchDayModal?.opponent || currentOpponentName();
    const plan = simulateEventBasedMatchPlan(opponent);
    const setup = plan.setup || preMatchSetup(opponent);
    state.activeMatch = {
      opponent,
      score: {
        ownGoals: plan.ownGoals || 0,
        oppGoals: plan.oppGoals || 0,
        mod: typeof tacticModifier === 'function' ? tacticModifier() : tacticModifiers(),
        positionPenalty: lineupPenaltyCount() * 2,
        ownPower: Math.round(setup?.own?.power || setup?.own?.attack || lineupStrength() || 0),
        oppPower: Math.round(setup?.opp?.power || setup?.opp?.attack || 0),
        unit: lineupUnitScores()
      },
      events: plan.events || [],
      phase: 'firstReady',
      currentMinute: 0,
      liveScore: { own: 0, opp: 0 },
      log: [],
      processedEventKeys: [],
      subs: [],
      subCount: 0,
      halftimeStats: null,
      fullStats: null,
      interruption: null,
      createdAt: Date.now(),
      ratingRecords: plan.ratingRecords || {},
      engineSetup: setup,
      engineSummary: {
        ownShots: plan.ownShots || 0,
        oppShots: plan.oppShots || 0,
        expectation: setup?.expectation || 0.5
      },
      playerFitness: {},
      injuries: []
    };
    lineupEntries().forEach(e => { state.activeMatch.playerFitness[String(e.player.id)] = 100; });
    state.matchDayModal = null;
    state.halftimeEditSection = 'overview';
    state.tab = 'match';
    render();
  } catch (err) {
    console.error('StartMatchScreen Fehler:', err);
    alert('Das Spiel konnte nicht gestartet werden. Ich habe den Fehler abgefangen: ' + (err?.message || err));
  }
}

/* Version 58: Fallback fuer alte/neue Taktik-Funktionsnamen */
function tacticModifiers() {
  if (typeof tacticModifier === 'function') return tacticModifier();
  return { attack: 0, defense: 0, control: 0, risk: 0, total: 0, skillSynergy: 0 };
}

/* Version 59: Ereignisse ohne Nummerierung, Anti-Haenger-Schutz, Spiel speichern/laden */
function finishCurrentLiveHalfSafely(reason) {
  const m = state.activeMatch;
  if (!m) return;
  const half = m.liveHalf || (m.currentMinute <= 45 ? 1 : 2);
  const endMinute = half === 1 ? 45 : 90;
  stopMatchTimer();
  m.currentMinute = endMinute;
  if (half === 1) {
    m.halftimeStats = m.halftimeStats || matchStatsForHalf(45);
    m.phase = 'halftime';
    state.tab = 'matchHalftime';
  } else {
    m.fullStats = m.fullStats || matchStatsForHalf(90);
    if (!m.finishedApplied) finishActiveMatch();
    m.phase = 'finished';
    state.tab = 'matchEnd';
  }
  if (reason && !m.safetyNotes) m.safetyNotes = [];
  if (reason) m.safetyNotes.push(reason);
  render();
}

function startLiveHalf(half) {
  const m = state.activeMatch;
  if (!m) return;
  if ((state.options?.simulationSpeed || 'slow') === 'instant') { runHalfInstant(half); return; }
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!m.currentMinute || m.currentMinute < 1)) m.currentMinute = 0;
  if (half === 2 && m.currentMinute < 46) m.currentMinute = 45;
  m.phase = 'live';
  m.liveHalf = half;
  m.liveStartedAt = Date.now();
  m.liveTickGuard = 0;
  m.lastTickAt = Date.now();
  state.tab = 'match';
  render();
  window.hfmMatchTimer = setInterval(() => {
    const match = state.activeMatch;
    if (!match || match.phase !== 'live') { stopMatchTimer(); return; }
    match.liveTickGuard = (match.liveTickGuard || 0) + 1;
    match.lastTickAt = Date.now();
    if (match.liveTickGuard > 140) {
      finishCurrentLiveHalfSafely('Sicherheitsabschluss: Simulation hing zu lange in einer Halbzeit.');
      return;
    }
    match.currentMinute += 1;
    if (processLiveMinuteEvents()) return;
    if (match.currentMinute >= endMinute || (half === 2 && match.currentMinute >= 90)) {
      finishCurrentLiveHalfSafely(null);
      return;
    }
    render();
  }, Math.max(20, simulationIntervalMs()));
}

function emergencyFinishMatch() {
  if (!state.activeMatch) return;
  finishCurrentLiveHalfSafely('Manueller Sicherheitsabschluss durch Manager.');
}

function importantEventList(lines) {
  const items = (lines && lines.length ? lines : ['Keine besonderen Ereignisse.']);
  return `<div class="matchLog cleanMatchLog">${items.map(line => `<div class="matchLogItem">${line}</div>`).join('')}</div>`;
}

function matchScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein aktives Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const events = (m.log || []);
  if (m.phase === 'firstReady') return `<section class="panel matchPanel"><p class="eyebrow">Spielscreen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>0:0</b><span>${formatGermanDate(nextMatchDate())}</span></div><div class="infoBox">Jedes Spiel wird beim Start neu berechnet. Gleiche Ergebnisse sind möglich, aber nicht fest vorgegeben.</div><button class="primary full" onclick="simulateFirstHalf()">Spiel starten</button></section>`;
  if (m.phase === 'live') return `<section class="panel matchPanel"><p class="eyebrow">${m.liveHalf === 1 ? '1. Halbzeit' : '2. Halbzeit'}</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.currentMinute}. Minute läuft</span></div><h3>Wichtige Ereignisse</h3>${importantEventList(events)}<button class="ghost full" onclick="emergencyFinishMatch()">Spiel sicher abschließen</button></section>`;
  if (m.phase === 'interrupted') return `<section class="panel matchPanel"><p class="eyebrow">Spielunterbrechung · ${m.interruption?.minute}. Minute</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.interruption?.type === 'red' ? 'Rote Karte' : 'Verletzung'}</span></div>${interruptionVisualCard(m.interruption)}<div class="infoBox">Das Spiel ist gestoppt. Passe deine Aufstellung an und setze das Spiel danach fort.</div>${matchStatusOverview()}${halftimeChangeScreen()}<button class="primary full" onclick="continueAfterInterruption()">Spiel fortsetzen</button></section>`;
  if (m.phase === 'halftime') return halftimeScreen();
  return matchEndScreen();
}

function halftimeScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Keine Halbzeitdaten</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  return `<div class="halftimeWindowBackdrop"><section class="panel matchPanel halftimeWindow"><div class="modalHeader"><div><p class="eyebrow">Halbzeitpause</p><h2>${ownClubName()} - ${m.opponent}</h2></div><span class="requiredBadge">Eigener Screen</span></div><div class="scoreBoard"><b>${liveScore}</b><span>45. Minute</span></div>${matchStatRows(m.halftimeStats)}${matchStatusOverview()}<h3>Wichtige Ereignisse</h3>${importantEventList(m.log || [])}<div class="infoBox">Dies ist das eigene Halbzeit-Fenster. Formation und Taktik findest du nur noch über die beiden Auswahlpunkte darunter. Starte danach oben rechts mit <b>2. Halbzeit starten</b>.</div>${halftimeChangeScreen()}</section></div>`;
}

function matchEndScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein abgeschlossenes Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const finalScore = `${m.liveScore?.own ?? m.score?.ownGoals ?? 0}:${m.liveScore?.opp ?? m.score?.oppGoals ?? 0}`;
  const safety = (m.safetyNotes || []).length ? `<div class="infoBox">${m.safetyNotes[m.safetyNotes.length - 1]}</div>` : '';
  return `<section class="panel matchPanel"><p class="eyebrow">Spiel beendet</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Wichtige Ereignisse</h3>${importantEventList(m.log || [])}${safety}${matchRatingTable()}<div class="modalActions"><button class="ghost full" onclick="openPostMatchWindow('table')">Tabelle</button><button class="ghost full" onclick="openPostMatchWindow('playerStats')">Spielerstatistiken</button><button class="ghost full" onclick="openPostMatchWindow('matchdayStats')">Spieltagsstatistik</button><button class="primary full" onclick="endMatchdayFromResult()">Spieltag beenden</button></div></section>`;
}

const HFM_SAVE_KEY = 'hfm_browser_save_v1';
function saveGame() {
  try {
    stopMatchTimer();
    const payload = { savedAt: new Date().toISOString(), state };
    localStorage.setItem(HFM_SAVE_KEY, JSON.stringify(payload));
    alert('Spielstand gespeichert.');
  } catch (err) {
    alert('Speichern fehlgeschlagen: ' + (err?.message || err));
  }
}
function loadGame() {
  try {
    const raw = localStorage.getItem(HFM_SAVE_KEY);
    if (!raw) { alert('Kein gespeicherter Spielstand gefunden.'); return; }
    const payload = JSON.parse(raw);
    if (!payload || !payload.state) { alert('Der gespeicherte Spielstand ist ungültig.'); return; }
    stopMatchTimer();
    Object.keys(state).forEach(k => delete state[k]);
    Object.assign(state, payload.state);
    if (state.activeMatch && state.activeMatch.phase === 'live') {
      state.activeMatch.phase = state.activeMatch.currentMinute >= 45 && state.activeMatch.liveHalf === 1 ? 'halftime' : 'firstReady';
      state.tab = state.activeMatch.phase === 'halftime' ? 'matchHalftime' : 'match';
    }
    alert('Spielstand geladen.');
    render();
  } catch (err) {
    alert('Laden fehlgeschlagen: ' + (err?.message || err));
  }
}
function deleteSaveGame() {
  localStorage.removeItem(HFM_SAVE_KEY);
  alert('Gespeicherter Spielstand gelöscht.');
}
function saveInfoText() {
  try {
    const raw = localStorage.getItem(HFM_SAVE_KEY);
    if (!raw) return 'Noch kein Spielstand gespeichert.';
    const payload = JSON.parse(raw);
    return `Letzter Speicherstand: ${new Date(payload.savedAt).toLocaleString('de-AT')}`;
  } catch (err) { return 'Speicherstand konnte nicht gelesen werden.'; }
}
function optionsView() {
  const speed = state.options?.simulationSpeed || 'slow';
  const speedButton = (id, title, desc) => `<button class="league clickableLeague ${speed === id ? 'selectedOption' : ''}" onclick="setSimulationSpeed('${id}')"><strong>${title}</strong><span>${desc}</span></button>`;
  return `<section class="panel"><p class="eyebrow">Optionen</p><h2>Spieleinstellungen</h2><div class="infoBox">Hier stellst du ein, wie schnell die Spielsimulation abläuft. Die aktuelle Einstellung ist <b>${simulationSpeedLabel()}</b>.</div><div class="leagueList">${speedButton('slow', 'Langsam', 'Minuten laufen bewusst langsamer durch. Gut zum Mitfiebern.')}${speedButton('normal', 'Normal', 'Deutlich schneller, aber der Spielverlauf bleibt sichtbar.')}${speedButton('fast', 'Schnell', 'Sehr schnelle Minutenfolge für zügige Spiele.')}${speedButton('instant', 'Sofort', 'Ein Klick bringt dich direkt zur Halbzeit bzw. danach zum Endstand.')}</div><h3>Spielstand</h3><div class="infoBox">${saveInfoText()}</div><div class="modalActions"><button class="primary full" onclick="saveGame()">Spiel speichern</button><button class="ghost full" onclick="loadGame()">Spiel laden</button><button class="ghost full" onclick="deleteSaveGame()">Speicherstand löschen</button></div></section>`;
}

/* Version 60: Live-Spiel darf nicht bei Minute 89 haengen bleiben */
function processRemainingEventsUntil(endMinute) {
  const m = state.activeMatch;
  if (!m) return;
  if (!m.processedEventKeys) m.processedEventKeys = [];
  const startMinute = Math.max(0, Number(m.currentMinute || 0));
  const remaining = (m.events || []).filter(e => e.minute > startMinute && e.minute <= endMinute && !m.processedEventKeys.includes(eventKey(e)));
  remaining.sort((a,b) => (a.minute || 0) - (b.minute || 0));
  for (const e of remaining) {
    m.processedEventKeys.push(eventKey(e));
    if (e.text) m.log.push(e.text);
    if (e.type === 'goal') {
      if (e.team === 'own') m.liveScore.own += 1;
      else m.liveScore.opp += 1;
    }
  }
}

function finishCurrentLiveHalfSafely(reason) {
  const m = state.activeMatch;
  if (!m) return;
  const half = m.liveHalf || (m.currentMinute <= 45 ? 1 : 2);
  const endMinute = half === 1 ? 45 : 90;
  stopMatchTimer();
  processRemainingEventsUntil(endMinute);
  m.currentMinute = endMinute;
  if (half === 1) {
    m.halftimeStats = m.halftimeStats || matchStatsForHalf(45);
    m.phase = 'halftime';
    state.tab = 'matchHalftime';
  } else {
    m.fullStats = m.fullStats || matchStatsForHalf(90);
    if (!m.finishedApplied) finishActiveMatch();
    m.phase = 'finished';
    state.tab = 'matchEnd';
  }
  if (reason && !m.safetyNotes) m.safetyNotes = [];
  if (reason) m.safetyNotes.push(reason);
  render();
}

function startLiveHalf(half) {
  const m = state.activeMatch;
  if (!m) return;
  if ((state.options?.simulationSpeed || 'slow') === 'instant') { runHalfInstant(half); return; }
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!m.currentMinute || m.currentMinute < 1)) m.currentMinute = 0;
  if (half === 2 && m.currentMinute < 46) m.currentMinute = 45;
  m.phase = 'live';
  m.liveHalf = half;
  m.liveStartedAt = Date.now();
  m.liveTickGuard = 0;
  m.lastTickAt = Date.now();
  state.tab = 'match';
  render();
  window.hfmMatchTimer = setInterval(() => {
    const match = state.activeMatch;
    if (!match || match.phase !== 'live') { stopMatchTimer(); return; }
    match.liveTickGuard = (match.liveTickGuard || 0) + 1;
    match.lastTickAt = Date.now();
    if (match.liveTickGuard > 130) {
      finishCurrentLiveHalfSafely('Automatischer Abschluss: Die Live-Simulation hat zu lange gebraucht.');
      return;
    }
    match.currentMinute += 1;
    processLiveMinuteEvents();
    if (match.phase !== 'live') return;
    if (match.currentMinute >= endMinute || (half === 2 && match.currentMinute >= 89)) {
      finishCurrentLiveHalfSafely(null);
      return;
    }
    render();
  }, Math.max(20, simulationIntervalMs()));
}

function matchScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein aktives Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const events = (m.log || []);
  if (m.phase === 'firstReady') return `<section class="panel matchPanel"><p class="eyebrow">Spielscreen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>0:0</b><span>${formatGermanDate(nextMatchDate())}</span></div><div class="infoBox">Jedes Spiel wird beim Start neu berechnet. Gleiche Ergebnisse sind möglich, aber nicht fest vorgegeben.</div><button class="primary full" onclick="simulateFirstHalf()">Spiel starten</button></section>`;
  if (m.phase === 'live') {
    if (m.liveHalf === 2 && Number(m.currentMinute || 0) >= 89) {
      setTimeout(() => finishCurrentLiveHalfSafely(null), 0);
    }
    return `<section class="panel matchPanel"><p class="eyebrow">${m.liveHalf === 1 ? '1. Halbzeit' : '2. Halbzeit'}</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.currentMinute}. Minute läuft</span></div><h3>Wichtige Ereignisse</h3>${importantEventList(events)}<button class="ghost full" onclick="emergencyFinishMatch()">Spiel abschließen</button></section>`;
  }
  if (m.phase === 'interrupted') return `<section class="panel matchPanel"><p class="eyebrow">Spielunterbrechung · ${m.interruption?.minute}. Minute</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.interruption?.type === 'red' ? 'Rote Karte' : 'Verletzung'}</span></div>${interruptionVisualCard(m.interruption)}<div class="infoBox">Das Spiel ist gestoppt. Passe deine Aufstellung an und setze das Spiel danach fort.</div>${matchStatusOverview()}${halftimeChangeScreen()}<button class="primary full" onclick="continueAfterInterruption()">Spiel fortsetzen</button></section>`;
  if (m.phase === 'halftime') return halftimeScreen();
  return matchEndScreen();
}

/* Version 61: echter harter Spielabschluss gegen Live-Haenger am Spielende */
function forceFinishMatchEnd(reason) {
  const m = state.activeMatch;
  if (!m) return '';
  stopMatchTimer();
  try { processRemainingEventsUntil(90); } catch (err) { console.warn('Restereignisse konnten nicht verarbeitet werden:', err); }
  m.currentMinute = 90;
  m.liveHalf = 2;
  m.fullStats = m.fullStats || matchStatsForHalf(90);
  if (!m.finishedApplied) {
    try { finishActiveMatch(); } catch (err) { console.warn('finishActiveMatch Fehler abgefangen:', err); }
    m.finishedApplied = true;
  }
  m.phase = 'finished';
  state.tab = 'matchEnd';
  if (reason) {
    if (!m.safetyNotes) m.safetyNotes = [];
    m.safetyNotes.push(reason);
  }
  return matchEndScreen();
}

function finishCurrentLiveHalfSafely(reason) {
  const m = state.activeMatch;
  if (!m) return;
  const half = m.liveHalf || (m.currentMinute <= 45 ? 1 : 2);
  if (half === 2) {
    forceFinishMatchEnd(reason || null);
    render();
    return;
  }
  stopMatchTimer();
  try { processRemainingEventsUntil(45); } catch (err) { console.warn('Restereignisse HZ1 konnten nicht verarbeitet werden:', err); }
  m.currentMinute = 45;
  m.halftimeStats = m.halftimeStats || matchStatsForHalf(45);
  m.phase = 'halftime';
  state.tab = 'matchHalftime';
  if (reason) {
    if (!m.safetyNotes) m.safetyNotes = [];
    m.safetyNotes.push(reason);
  }
  render();
}

function startLiveHalf(half) {
  const m = state.activeMatch;
  if (!m) return;
  if ((state.options?.simulationSpeed || 'slow') === 'instant') { runHalfInstant(half); return; }
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!m.currentMinute || m.currentMinute < 1)) m.currentMinute = 0;
  if (half === 2 && m.currentMinute < 46) m.currentMinute = 45;
  m.phase = 'live';
  m.liveHalf = half;
  m.liveStartedAt = Date.now();
  m.liveTickGuard = 0;
  m.lastTickAt = Date.now();
  state.tab = 'match';
  render();
  window.hfmMatchTimer = setInterval(() => {
    try {
      const match = state.activeMatch;
      if (!match || match.phase !== 'live') { stopMatchTimer(); return; }
      match.liveTickGuard = (match.liveTickGuard || 0) + 1;
      match.lastTickAt = Date.now();
      if (match.liveTickGuard > 110) {
        finishCurrentLiveHalfSafely('Automatischer Abschluss: Die Live-Simulation hat zu lange gebraucht.');
        return;
      }
      match.currentMinute += 1;
      try { processLiveMinuteEvents(); } catch (err) { console.warn('Minutenereignis Fehler abgefangen:', err); }
      if (match.phase !== 'live') return;
      if (half === 2 && match.currentMinute >= 88) {
        forceFinishMatchEnd(null);
        render();
        return;
      }
      if (match.currentMinute >= endMinute) {
        finishCurrentLiveHalfSafely(null);
        return;
      }
      render();
    } catch (err) {
      console.error('Live-Timer Fehler abgefangen:', err);
      finishCurrentLiveHalfSafely('Automatischer Abschluss: Ein Live-Timer-Fehler wurde abgefangen.');
    }
  }, Math.max(20, simulationIntervalMs()));
}

function matchScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein aktives Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  if (m.phase === 'live' && m.liveHalf === 2 && Number(m.currentMinute || 0) >= 88) {
    return forceFinishMatchEnd(null);
  }
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  const events = (m.log || []);
  if (m.phase === 'firstReady') return `<section class="panel matchPanel"><p class="eyebrow">Spielscreen</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>0:0</b><span>${formatGermanDate(nextMatchDate())}</span></div><div class="infoBox">Jedes Spiel wird beim Start neu berechnet. Gleiche Ergebnisse sind möglich, aber nicht fest vorgegeben.</div><button class="primary full" onclick="simulateFirstHalf()">Spiel starten</button></section>`;
  if (m.phase === 'live') return `<section class="panel matchPanel"><p class="eyebrow">${m.liveHalf === 1 ? '1. Halbzeit' : '2. Halbzeit'}</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.currentMinute}. Minute läuft</span></div><h3>Wichtige Ereignisse</h3>${importantEventList(events)}<button class="ghost full" onclick="emergencyFinishMatch()">Spiel abschließen</button></section>`;
  if (m.phase === 'interrupted') return `<section class="panel matchPanel"><p class="eyebrow">Spielunterbrechung · ${m.interruption?.minute}. Minute</p><h2>${ownClubName()} - ${m.opponent}</h2><div class="scoreBoard"><b>${liveScore}</b><span>${m.interruption?.type === 'red' ? 'Rote Karte' : 'Verletzung'}</span></div>${interruptionVisualCard(m.interruption)}<div class="infoBox">Das Spiel ist gestoppt. Passe deine Aufstellung an und setze das Spiel danach fort.</div>${matchStatusOverview()}${halftimeChangeScreen()}<button class="primary full" onclick="continueAfterInterruption()">Spiel fortsetzen</button></section>`;
  if (m.phase === 'halftime') return halftimeScreen();
  return matchEndScreen();
}

/* Version 63: Endscreen ohne Kondition-/Verletzungsrisiko-Block */
function postMatchTopActions() {
  return `<div class="modalActions endScreenTopActions"><button class="ghost full" onclick="openPostMatchWindow('table')">Tabelle</button><button class="ghost full" onclick="openPostMatchWindow('playerStats')">Spielerstatistiken</button><button class="ghost full" onclick="openPostMatchWindow('matchdayStats')">Spieltagsstatistik</button><button class="primary full" onclick="endMatchdayFromResult()">Spieltag beenden</button></div>`;
}

function matchRatingTable() {
  const m = state.activeMatch;
  if (!m) return '';
  const rows = getRatingRecordsArray(m).map(r => `<tr><td>${r.name}</td><td>${r.pos}</td><td><b>${r.note5.toFixed(1)}</b></td></tr>`).join('');
  return `<h3>Spielernoten</h3><div class="tableWrap ratingTable compactRatingTable"><table><thead><tr><th>Spieler</th><th>Position</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function matchEndScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein abgeschlossenes Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  const finalScore = `${m.liveScore?.own ?? m.score?.ownGoals ?? 0}:${m.liveScore?.opp ?? m.score?.oppGoals ?? 0}`;
  return `<section class="panel matchPanel"><p class="eyebrow">Spiel beendet</p><h2>${ownClubName()} - ${m.opponent}</h2>${postMatchTopActions()}<div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Wichtige Ereignisse</h3>${importantEventList(m.log || [])}${matchRatingTable()}</section>`;
}


/* Version 64: Mathematischer Post-Match-Filter fuer realistischere Spielernoten */
var HFM_V64_RATING_WEIGHTS = {
  goal: { base: 1.50, attack: 1.08, midfield: 0.88, defense: 0.68, keeper: 0.22 },
  assist: { base: 0.80, attack: 0.98, midfield: 1.16, defense: 0.75, keeper: 0.20 },
  keyPass: { base: 0.40, attack: 0.96, midfield: 1.22, defense: 0.70, keeper: 0.15 },
  bigChanceCreated: { base: 0.45, attack: 1.00, midfield: 1.15, defense: 0.60, keeper: 0.15 },
  successfulTackle: { base: 0.22, attack: 0.55, midfield: 1.05, defense: 1.60, keeper: 0.35 },
  interception: { base: 0.20, attack: 0.50, midfield: 1.10, defense: 1.55, keeper: 0.45 },
  aerialWon: { base: 0.14, attack: 0.90, midfield: 0.85, defense: 1.30, keeper: 0.55 },
  save: { base: 0.45, attack: 0.05, midfield: 0.05, defense: 0.15, keeper: 1.60 },
  penaltySaved: { base: 1.20, attack: 0.05, midfield: 0.05, defense: 0.20, keeper: 1.50 },
  passAccuracy: { base: 0.08, attack: 0.75, midfield: 1.25, defense: 0.90, keeper: 0.45 },
  turnover: { base: -0.14, attack: 0.85, midfield: 1.15, defense: 1.35, keeper: 1.55 },
  badPass: { base: -0.11, attack: 0.75, midfield: 1.10, defense: 1.25, keeper: 1.45 },
  missedBigChance: { base: -0.65, attack: 1.30, midfield: 0.80, defense: 0.45, keeper: 0.10 },
  yellow: { base: -0.50, attack: 0.85, midfield: 1.00, defense: 1.10, keeper: 0.85 },
  red: { base: -2.10, attack: 1.00, midfield: 1.00, defense: 1.05, keeper: 1.10 },
  penaltyMissed: { base: -1.00, attack: 1.15, midfield: 1.00, defense: 0.70, keeper: 0.10 },
  foulPenalty: { base: -1.20, attack: 0.65, midfield: 0.95, defense: 1.25, keeper: 1.35 },
  concededError: { base: -1.50, attack: 0.25, midfield: 0.65, defense: 1.15, keeper: 1.20 },
  cleanSheet: { base: 0.00, attack: 0.00, midfield: 0.00, defense: 0.00, keeper: 0.00 },
  winBonus: { base: 0.00, attack: 0.00, midfield: 0.00, defense: 0.00, keeper: 0.00 },
  underdogBonus: { base: 0.00, attack: 0.00, midfield: 0.00, defense: 0.00, keeper: 0.00 }
};

function hfmV64ClampNumber(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}
function hfmV64RoundOne(value) {
  return Math.round(Number(value || 0) * 10) / 10;
}
function ratingPositionGroup(player) {
  const pos = (player?.pos || '').toUpperCase();
  if (pos === 'TW') return 'keeper';
  if (['IV','LV','RV'].includes(pos)) return 'defense';
  if (['DM','ZM','OM','LM','RM'].includes(pos)) return 'midfield';
  return 'attack';
}
function clampRating10(value) {
  return hfmV64ClampNumber(value, 1, 10);
}
function score10ToNote5(score) {
  const safeScore = clampRating10(score);
  return hfmV64RoundOne(hfmV64ClampNumber(6 - safeScore / 2, 1, 5));
}
function hfmV64RecordPlayer(record) {
  const fromSquad = (state.players || []).find(p => String(p.id) === String(record?.playerId));
  if (fromSquad) return fromSquad;
  return { id: record?.playerId, name: record?.name || 'Spieler', pos: record?.pos || 'ZM', strength: 55 };
}
function hfmV64PositionCap(group) {
  if (group === 'keeper') return { min: -3.30, max: 3.00 };
  if (group === 'defense') return { min: -3.10, max: 3.05 };
  if (group === 'midfield') return { min: -2.90, max: 3.10 };
  return { min: -3.00, max: 3.25 };
}
function hfmV64EventDelta(player, eventName, intensity) {
  const group = ratingPositionGroup(player);
  const table = HFM_V64_RATING_WEIGHTS || {};
  const cfg = table[eventName] || { base: 0 };
  const mult = typeof cfg[group] === 'number' ? cfg[group] : 1;
  const value = Number(intensity);
  const safeIntensity = Number.isFinite(value) ? value : 1;
  return (cfg.base || 0) * mult * safeIntensity;
}
function ensureMatchRatingRecord(match, player, role = 'Starter') {
  if (!match || !player) return null;
  if (!match.ratingRecords) match.ratingRecords = {};
  const id = String(player.id);
  if (!match.ratingRecords[id]) {
    match.ratingRecords[id] = {
      playerId: player.id,
      name: player.name,
      pos: player.pos,
      role,
      minutes: role === 'Starter' ? 90 : 0,
      baseScore10: 6.0,
      matchPoints: 0,
      score10: 6.0,
      finalScore10: 6.0,
      events: {},
      eventIntensity: {},
      eventPoints: {},
      reasons: [],
      note5: 3.0,
      ratingVersion: 64
    };
  } else {
    const rec = match.ratingRecords[id];
    rec.playerId = rec.playerId ?? player.id;
    rec.name = rec.name || player.name;
    rec.pos = rec.pos || player.pos;
    rec.role = rec.role || role;
    if (typeof rec.baseScore10 !== 'number') rec.baseScore10 = 6.0;
    if (typeof rec.matchPoints !== 'number') rec.matchPoints = Number(rec.score10 || 6.0) - rec.baseScore10;
    if (!rec.events) rec.events = {};
    if (!rec.eventIntensity) rec.eventIntensity = {};
    if (!rec.eventPoints) rec.eventPoints = {};
    if (!Array.isArray(rec.reasons)) rec.reasons = [];
  }
  return match.ratingRecords[id];
}
function applyRatingEventToRecord(record, player, eventName, intensity = 1, reason = '') {
  if (!record || !player || !eventName) return;
  if (!record.events) record.events = {};
  if (!record.eventIntensity) record.eventIntensity = {};
  if (!record.eventPoints) record.eventPoints = {};
  if (!Array.isArray(record.reasons)) record.reasons = [];
  if (typeof record.baseScore10 !== 'number') record.baseScore10 = 6.0;
  if (typeof record.matchPoints !== 'number') record.matchPoints = Number(record.score10 || 6.0) - record.baseScore10;
  const safeIntensity = Number.isFinite(Number(intensity)) ? Number(intensity) : 1;
  const delta = hfmV64EventDelta(player, eventName, safeIntensity);
  record.events[eventName] = (record.events[eventName] || 0) + 1;
  record.eventIntensity[eventName] = (record.eventIntensity[eventName] || 0) + safeIntensity;
  record.eventPoints[eventName] = (record.eventPoints[eventName] || 0) + delta;
  record.matchPoints = (Number(record.matchPoints) || 0) + delta;
  record.score10 = clampRating10(6.0 + record.matchPoints);
  record.finalScore10 = record.score10;
  record.note5 = score10ToNote5(record.score10);
  record.ratingVersion = 64;
  if (reason) record.reasons.push(reason);
}
function hfmV64MatchScore(match) {
  const live = match?.liveScore || {};
  const score = match?.score || {};
  const eventOwn = (match?.events || []).filter(e => e.type === 'goal' && e.team === 'own').length;
  const eventOpp = (match?.events || []).filter(e => e.type === 'goal' && e.team === 'opp').length;
  const own = Number.isFinite(Number(score.ownGoals)) ? Number(score.ownGoals) : Number(live.own ?? eventOwn ?? 0);
  const opp = Number.isFinite(Number(score.oppGoals)) ? Number(score.oppGoals) : Number(live.opp ?? eventOpp ?? 0);
  return { own, opp, diff: own - opp };
}
function hfmV64Stats(match) {
  const stats = match?.fullStats || (typeof matchStatsForHalf === 'function' && state.activeMatch === match ? matchStatsForHalf(90) : null) || {};
  return {
    shotsOwn: Number(stats.shotsOwn || match?.engineSummary?.ownShots || 0),
    shotsOpp: Number(stats.shotsOpp || match?.engineSummary?.oppShots || 0),
    possession: Number(stats.possession || 50)
  };
}
function hfmV64ContextModifier(match, record, player, score10BeforeMinutes) {
  const group = ratingPositionGroup(player);
  const pos = String(player?.pos || record?.pos || '').toUpperCase();
  const e = record.events || {};
  const score = hfmV64MatchScore(match);
  const stats = hfmV64Stats(match);
  const expectation = hfmV64ClampNumber(match?.engineSummary?.expectation ?? match?.engineSetup?.expectation ?? 0.5, 0.05, 0.95);
  const lossMargin = Math.max(0, -score.diff);
  const winMargin = Math.max(0, score.diff);
  let context = 0;

  if (lossMargin > 0) {
    context -= 0.55 + Math.min(0.90, (lossMargin - 1) * 0.32);
  } else if (winMargin > 0) {
    context += 0.22 + Math.min(0.40, (winMargin - 1) * 0.16);
  } else if (expectation < 0.43) {
    context += 0.18;
  } else if (expectation > 0.60) {
    context -= 0.14;
  }

  if (lossMargin > 0 && expectation >= 0.58) context -= expectation >= 0.66 ? 0.48 : 0.28;
  if (lossMargin === 1 && expectation < 0.42) context += 0.30;
  if (lossMargin === 2 && expectation < 0.38) context += 0.12;
  if (score.diff === 0 && expectation < 0.42) context += 0.28;
  if (winMargin > 0 && expectation < 0.46) context += 0.22;

  if (score.own === 0) {
    if (group === 'attack') context -= pos === 'ST' ? 0.45 : 0.34;
    if (group === 'midfield') context -= 0.18;
  }

  if (score.opp === 0) {
    if (group === 'keeper' || group === 'defense') context += 0.36;
    else if (group === 'midfield') context += 0.10;
  } else {
    if (group === 'keeper' || group === 'defense') context -= Math.min(1.05, score.opp * 0.26 + (lossMargin ? 0.12 : 0));
    else if (group === 'midfield') context -= Math.min(0.45, score.opp * 0.09);
  }

  const offensiveImpact = (e.goal || 0) + (e.assist || 0) + (e.keyPass || 0) + (e.bigChanceCreated || 0);
  if (group === 'attack' && offensiveImpact <= 0) context -= pos === 'ST' ? 0.42 : 0.30;
  if (group === 'midfield' && offensiveImpact <= 0 && score.own === 0) context -= 0.12;
  if (group === 'defense' && score.opp > 0 && ((e.successfulTackle || 0) + (e.interception || 0)) <= 0) context -= 0.16;
  if (group === 'keeper' && score.opp >= 2 && (e.save || 0) <= 1) context -= 0.20;

  if (lossMargin > 0 && stats.shotsOpp > stats.shotsOwn) context -= Math.min(0.38, (stats.shotsOpp - stats.shotsOwn) * 0.055);
  if (lossMargin > 0 && group === 'attack' && stats.shotsOwn <= 4) context -= 0.18;
  if (lossMargin > 0 && group === 'keeper' && (e.save || 0) >= 4) context += 0.18;

  if ((e.red || 0) > 0) context -= 0.35;
  if ((e.yellow || 0) > 0 && lossMargin > 0) context -= 0.10;
  if (score10BeforeMinutes >= 8.4 && lossMargin > 0 && ((e.goal || 0) || (e.assist || 0) || (e.save || 0))) context += 0.12;
  return context;
}
function hfmV64MinuteFactor(record) {
  const minutes = hfmV64ClampNumber(record.minutes ?? 90, 0, 90);
  const e = record.events || {};
  const decisive = (e.goal || 0) + (e.assist || 0) + (e.red || 0) + (e.penaltySaved || 0) + (e.penaltyMissed || 0);
  if (minutes >= 75) return 1.00;
  if (minutes >= 60) return 0.92;
  if (minutes >= 30) return decisive ? 0.88 : 0.72;
  if (minutes >= 15) return decisive ? 0.78 : 0.55;
  if (minutes > 0) return decisive ? 0.65 : 0.35;
  return 0;
}
function hfmV64CalculateFinalScore10(match, record) {
  const player = hfmV64RecordPlayer(record);
  const group = ratingPositionGroup(player);
  const cap = hfmV64PositionCap(group);
  let rawPoints = Number(record.matchPoints);
  if (!Number.isFinite(rawPoints)) rawPoints = Number(record.score10 || 6.0) - 6.0;
  rawPoints = hfmV64ClampNumber(rawPoints, cap.min, cap.max);
  const scoreBeforeContext = 6.0 + rawPoints;
  const context = hfmV64ContextModifier(match, record, player, scoreBeforeContext);
  let score = scoreBeforeContext + context;
  const factor = hfmV64MinuteFactor(record);
  score = 6.0 + (score - 6.0) * factor;
  return hfmV64RoundOne(clampRating10(score));
}
function finalizeMatchRatings(match) {
  if (!match || match.ratingsFinalizedV64) return;
  if (!match.ratingRecords) match.ratingRecords = {};
  const setupPlayers = match.engineSetup?.ownPlayers || [];
  if (Array.isArray(setupPlayers)) setupPlayers.forEach(p => ensureMatchRatingRecord(match, p, 'Starter'));
  Object.values(match.ratingRecords).forEach(record => {
    const score10 = hfmV64CalculateFinalScore10(match, record);
    record.finalScore10 = score10;
    record.score10 = score10;
    record.note5 = score10ToNote5(score10);
    record.finalNote = record.note5;
    record.ratingVersion = 64;
  });
  match.ratingsFinalizedV64 = true;
}
function getRatingRecordsArray(match) {
  if (!match) return [];
  finalizeMatchRatings(match);
  return Object.values(match.ratingRecords || {})
    .filter(r => hfmV64ClampNumber(r.minutes ?? 90, 0, 90) > 0)
    .map(r => ({ ...r, note5: Number.isFinite(Number(r.note5)) ? Number(r.note5) : score10ToNote5(r.score10 || 6.0) }))
    .sort((a, b) => a.note5 - b.note5 || String(a.name).localeCompare(String(b.name)));
}
function liveSubstitute(slotId, playerId) {
  if (!slotId || !playerId) return;
  const incomingId = Number(playerId);
  const incoming = (state.players || []).find(p => p.id === incomingId);
  if (!incoming) return;
  if (!state.activeMatch) state.activeMatch = { subs: [], subCount: 0, ratingRecords: {} };
  const m = state.activeMatch;
  if (!Array.isArray(m.subs)) m.subs = [];
  if (typeof m.subCount !== 'number') m.subCount = m.subs.length || 0;
  if (!m.ratingRecords) m.ratingRecords = {};
  const oldId = Number(state.lineup?.[slotId] || 0);
  if (oldId === incomingId) return;
  if (m.subCount >= 5) {
    alert('Du hast bereits 5 Auswechslungen vorgenommen. Weitere Wechsel sind in diesem Spiel nicht moeglich.');
    render();
    return;
  }
  const benchSlot = Object.keys(state.bench || {}).find(k => Number(state.bench[k]) === incomingId);
  if (!benchSlot) {
    alert('Dieser Spieler sitzt nicht auf der Bank und kann deshalb nicht eingewechselt werden.');
    render();
    return;
  }
  const currentMinute = hfmV64ClampNumber(m.currentMinute || (m.phase === 'halftime' ? 45 : 0), 0, 90);
  const outgoing = (state.players || []).find(p => p.id === oldId);
  if (outgoing) {
    const outRec = ensureMatchRatingRecord(m, outgoing, 'Starter');
    const startedAt = Number.isFinite(Number(outRec.subbedInAt)) ? Number(outRec.subbedInAt) : 0;
    outRec.minutes = hfmV64ClampNumber(currentMinute - startedAt, 0, 90);
    outRec.subbedOutAt = currentMinute;
  }
  const inRec = ensureMatchRatingRecord(m, incoming, 'Einwechselspieler');
  inRec.role = 'Einwechselspieler';
  inRec.subbedInAt = currentMinute;
  inRec.minutes = hfmV64ClampNumber(90 - currentMinute, 0, 90);
  Object.keys(state.lineup || {}).forEach(key => {
    if (key !== slotId && Number(state.lineup[key]) === incomingId) state.lineup[key] = null;
  });
  state.lineup[slotId] = incomingId;
  state.bench[benchSlot] = oldId || null;
  m.subCount += 1;
  m.subs.push(`${m.subCount}. Wechsel: ${incoming.name} kommt${outgoing ? ` fuer ${outgoing.name}` : ''}.`);
  render();
}
function updatePlayerSeasonStatsFromMatch() {
  const m = state.activeMatch;
  if (!m) return;
  state.externalPlayerStats = state.externalPlayerStats || [];
  finalizeMatchRatings(m);
  const records = m.ratingRecords || {};
  const ownGoalEvents = (m.events || []).filter(e => e.type === 'goal' && e.team === 'own');
  const ownAssistEvents = ownGoalEvents.filter(e => e.assistId);
  const currentStarters = lineupEntries().map(e => e.player.id);
  state.players = state.players.map(p => {
    const rec = records[String(p.id)];
    let minutes = rec ? hfmV64ClampNumber(rec.minutes ?? 90, 0, 90) : (currentStarters.includes(p.id) ? 90 : 0);
    const note = rec ? (Number.isFinite(Number(rec.note5)) ? Number(rec.note5) : score10ToNote5(rec.score10 || 6.0)) : (minutes ? 3.2 : p.rating || 3.0);
    const goals = ownGoalEvents.filter(e => String(e.scorerId) === String(p.id)).length;
    const assists = ownAssistEvents.filter(e => String(e.assistId) === String(p.id)).length;
    const changes = calculatePostMatchPlayerChanges(p, note, rec, minutes);
    const id = String(p.id);
    const fitnessAfter = m.playerFitness?.[id];
    return {
      ...p,
      skills: changes.skills || p.skills,
      ca: changes.ca,
      pa: changes.pa,
      minutes: Math.round(minutes),
      rating: note,
      lastRating: note,
      matchRatingHistory: changes.history,
      form: changes.form,
      satisfaction: changes.morale,
      progress: changes.progress,
      strength: changes.strength,
      marketValue: changes.newMarketValue,
      xpLastMatch: changes.xpGain,
      fitness: typeof fitnessAfter === 'number' ? Math.round(fitnessAfter) : p.fitness,
      seasonGoals: (p.seasonGoals || 0) + goals,
      seasonAssists: (p.seasonAssists || 0) + assists,
      seasonPoints: (p.seasonPoints || 0) + goals + assists,
      seasonRatingSum: (p.seasonRatingSum || 0) + (minutes ? note : 0),
      seasonRatingGames: (p.seasonRatingGames || 0) + (minutes ? 1 : 0),
      noPlayWeeks: minutes ? 0 : (p.noPlayWeeks || 0) + 1
    };
  });
  (m.events || []).filter(e => e.type === 'goal' && e.team === 'opp').forEach(e => {
    const id = `opp-${m.opponent}-${e.scorerName}`;
    let stat = state.externalPlayerStats.find(s => s.id === id);
    if (!stat) {
      stat = { id, name: e.scorerName, club: m.opponent, goals: 0, assists: 0, points: 0 };
      state.externalPlayerStats.push(stat);
    }
    stat.goals += 1;
    stat.points += 1;
    if (e.assistName) {
      const aid = `opp-${m.opponent}-${e.assistName}`;
      let ast = state.externalPlayerStats.find(s => s.id === aid);
      if (!ast) {
        ast = { id: aid, name: e.assistName, club: m.opponent, goals: 0, assists: 0, points: 0 };
        state.externalPlayerStats.push(ast);
      }
      ast.assists += 1;
      ast.points += 1;
    }
  });
}
function finishActiveMatch() {
  const m = state.activeMatch;
  if (!m || m.finishedApplied) return;
  finalizeMatchRatings(m);
  const opponent = m.opponent;
  const goals = hfmV64MatchScore(m);
  applyResultToTable(ownClubName(), opponent, goals.own, goals.opp);
  const other = simulateOtherLeagueResults(opponent);
  sortCurrentTable();
  updatePlayerSeasonStatsFromMatch();
  updateClubImageTrend();
  state.matchPlayedWeek = state.week;
  state.lastMatchReport = {
    opponent,
    score: `${goals.own}:${goals.opp}`,
    ownGoals: goals.own,
    oppGoals: goals.opp,
    tacticBonus: m.score?.mod?.total || 0,
    skillSynergy: m.score?.mod?.skillSynergy || 0,
    positionPenalty: m.score?.positionPenalty || 0,
    ownPower: m.score?.ownPower || 0,
    oppPower: m.score?.oppPower || 0,
    units: m.score?.unit || lineupUnitScores(),
    text: goals.own > goals.opp ? 'Sieg' : goals.own === goals.opp ? 'Unentschieden' : 'Niederlage'
  };
  state.lastMatchdayResults = [{ home: ownClubName(), away: opponent, hg: goals.own, ag: goals.opp }, ...other];
  m.finishedApplied = true;
}
function matchRatingTable() {
  const m = state.activeMatch;
  if (!m) return '';
  const rows = getRatingRecordsArray(m).map(r => `<tr><td>${r.name}</td><td>${r.pos}</td><td><b>${Number(r.note5).toFixed(1)}</b></td></tr>`).join('');
  return `<h3>Spielernoten</h3><div class="tableWrap ratingTable compactRatingTable"><table><thead><tr><th>Spieler</th><th>Position</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function matchEndScreen() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Kein abgeschlossenes Spiel</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  if (!m.ratingsFinalizedV64 && m.phase === 'finished') finalizeMatchRatings(m);
  const goals = hfmV64MatchScore(m);
  const finalScore = `${goals.own}:${goals.opp}`;
  return `<section class="panel matchPanel"><p class="eyebrow">Spiel beendet</p><h2>${ownClubName()} - ${m.opponent}</h2>${postMatchTopActions()}<div class="scoreBoard"><b>${finalScore}</b><span>Endergebnis</span></div>${matchStatRows(m.fullStats)}<h3>Wichtige Ereignisse</h3>${importantEventList(m.log || [])}${matchRatingTable()}</section>`;
}

/* Version 64: Kompatibilitaets-Aliase und Skill-XP-Fix */
function generateSkillsForPlayer(player) {
  return generateSkillSet(player);
}
function overallForPosition(player, pos) {
  return positionOverall(player, pos || player?.pos);
}
function distributeXPToSkills(player, xp, preferredUnit) {
  if (!player.skills) player.skills = generateSkillsForPlayer(player);
  const byPosition = POSITION_SKILL_WEIGHTS[player.pos] || POSITION_SKILL_WEIGHTS.ZM || {};
  const byUnit = UNIT_SKILL_WEIGHTS[preferredUnit] || {};
  const relevant = Object.keys(byPosition).length ? byPosition : byUnit;
  const keys = Object.keys(relevant).sort((a,b) => relevant[b] - relevant[a]).slice(0, 5);
  const gain = Math.max(0, Number(xp || 0) / 28);
  keys.forEach(k => {
    const current = Number(player.skills[k] ?? player.strength ?? 50);
    player.skills[k] = clamp(Math.round((current + gain * (relevant[k] || 1)) * 10) / 10, 1, 100);
  });
  player.strength = overallForPosition(player, player.pos);
  return player;
}
/* Version 65: KI-Transferlogik mit Bedarf, Scouting-Filter, Philosophie und Gehaltsstruktur */
const HFM_V65_FREE_AGENT = 'Abl\u00f6sefrei';
const HFM_V65_POSITION_TARGETS = { TW: 2, LV: 2, IV: 4, RV: 2, DM: 2, ZM: 3, OM: 2, LM: 2, RM: 2, LA: 2, RA: 2, ST: 3 };
const HFM_V65_WAGE_LIMITS = { key: 0.15, starter: 0.08, rotation: 0.045, backup: 0.03 };

function hfmV65ClampFloat(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}
function hfmV65Round1(value) { return Math.round(Number(value || 0) * 10) / 10; }
function hfmV65RoundMoney(value) { return Math.max(0, Math.round(Number(value || 0) / 10000) * 10000); }
function hfmV65ClubKey(clubName, leagueIndex) { return `${Number(leagueIndex)}:${clubName}`; }
function hfmV65SafeRosterKey(clubName, leagueIndex) { return `${Number(leagueIndex)}:${clubName}`; }
function hfmV65IsOwnClub(clubName, leagueIndex) {
  return Number(leagueIndex) === Number(state.startLeagueIndex ?? OWN_LEAGUE_INDEX) && String(clubName) === String(ownClubName());
}
function hfmV65EnsureAiTransferSystem() {
  if (!Array.isArray(state.aiTransferLog)) state.aiTransferLog = [];
  if (!Array.isArray(state.aiLatestTransferPlans)) state.aiLatestTransferPlans = [];
  if (!Array.isArray(state.aiTransferProcessedWeeks)) state.aiTransferProcessedWeeks = [];
  if (!state.aiClubFinance || typeof state.aiClubFinance !== 'object') state.aiClubFinance = {};
  if (!state.aiTransferSettings || typeof state.aiTransferSettings !== 'object') {
    state.aiTransferSettings = { maxDealsPerAutoWeek: 4, minSquadSize: 22, maxSquadSize: 26 };
  }
}
function hfmV65CurrentWindowKey(date = currentGameDate()) {
  const month = date.getMonth();
  if (month === 6 || month === 7) return `${seasonLabel()}:summer`;
  if (month === 0) return `${seasonLabel()}:winter`;
  return `${seasonLabel()}:closed`;
}
function hfmV65IsTransferWindow(date = currentGameDate()) {
  const month = date.getMonth();
  return month === 6 || month === 7 || month === 0;
}
function hfmV65WindowLabel(date = currentGameDate()) {
  const month = date.getMonth();
  if (month === 6 || month === 7) return 'Sommerfenster';
  if (month === 0) return 'Winterfenster';
  return 'ausserhalb des Transferfensters';
}
function hfmV65LeagueBudgetMultiplier(leagueIndex) {
  const tier = LEAGUES[Number(leagueIndex)]?.tier || 'Mittel';
  if (tier === 'Topliga') return 2.1;
  if (tier === 'Stark') return 1.45;
  if (tier === 'Spezialliga') return 1.25;
  return 1.0;
}
function hfmV65ClubReputation(clubName, leagueIndex) {
  if (hfmV65IsOwnClub(clubName, leagueIndex)) return ownCombinedImage();
  return combinedImage(getClubImage(clubName, Number(leagueIndex)));
}
function hfmV65ClubPhilosophy(clubName, leagueIndex) {
  const rep = hfmV65ClubReputation(clubName, leagueIndex);
  const hash = stableHash(`${clubName}-${leagueIndex}-philosophy`);
  if (rep >= 78 && hash % 5 <= 1) return 'galacticos';
  if (hash % 7 === 0 || /Academia|Ajax|Dortmund|Talblick/i.test(clubName)) return 'youth';
  if (hash % 5 === 0 || /Union|Sporting|M\u00fchlbach|Nordheim/i.test(clubName)) return 'moneyball';
  if (hash % 4 === 0) return 'balanced';
  return 'pragmatic';
}
function hfmV65PhilosophyLabel(id) {
  const labels = {
    youth: 'Jugendwahn',
    galacticos: 'Galacticos',
    moneyball: 'Moneyball',
    balanced: 'Ausgewogen',
    pragmatic: 'Pragmatisch'
  };
  return labels[id] || 'Ausgewogen';
}
function hfmV65ClubSalaryLoad(clubName, leagueIndex) {
  const roster = getClubRoster(clubName, Number(leagueIndex));
  return roster.reduce((sum, p) => sum + Number(p.salary || 0), 0);
}
function hfmV65EnsureAiClubFinance(clubName, leagueIndex) {
  hfmV65EnsureAiTransferSystem();
  const key = hfmV65ClubKey(clubName, leagueIndex);
  const season = seasonLabel();
  const rep = hfmV65ClubReputation(clubName, leagueIndex);
  const mult = hfmV65LeagueBudgetMultiplier(leagueIndex);
  const salaryLoad = hfmV65ClubSalaryLoad(clubName, leagueIndex);
  const calculatedBudget = hfmV65RoundMoney((260000 + rep * rep * 820) * mult + (stableHash(key + season) % 480000));
  const calculatedWageBudget = Math.round(Math.max(salaryLoad * 1.18, calculatedBudget * 0.18 + rep * 9000) / 1000) * 1000;
  const old = state.aiClubFinance[key];
  if (!old || old.season !== season) {
    state.aiClubFinance[key] = {
      season,
      budget: calculatedBudget,
      remainingBudget: calculatedBudget,
      wageBudget: calculatedWageBudget,
      spent: 0
    };
  } else {
    old.budget = Math.max(Number(old.budget || 0), calculatedBudget);
    old.remainingBudget = Math.max(0, Number(old.remainingBudget || 0));
    old.wageBudget = Math.max(Number(old.wageBudget || 0), calculatedWageBudget);
  }
  return state.aiClubFinance[key];
}
function hfmV65NormalizeExternalPlayer(player, clubName, leagueIndex) {
  const clone = ensurePlayerSkillProfile({
    ...player,
    club: clubName,
    leagueIndex: Number(leagueIndex),
    salary: Number(player.salary || Math.round(((player.strength || 50) * 820 + (player.talent || 2) * 2200) / 1000) * 1000),
    marketValue: Number(player.marketValue || hfmV65RoundMoney(((player.strength || 50) ** 2) * 950 + (player.talent || 2) * 85000)),
    contractYears: Math.max(1, Math.min(5, Number(player.contractYears || 2)))
  });
  return clone;
}
function hfmV65EnsureAiRosterDepth(clubName, leagueIndex, minSize = 22) {
  const key = hfmV65SafeRosterKey(clubName, leagueIndex);
  if (!state.clubRosterCache[key]) return;
  let roster = state.clubRosterCache[key];
  for (let i = 0; i < roster.length; i += 1) roster[i] = hfmV65NormalizeExternalPlayer(roster[i], clubName, leagueIndex);
  let index = roster.length;
  while (roster.length < minSize) {
    const player = hfmV65NormalizeExternalPlayer(makeExternalPlayer(clubName, index, Number(leagueIndex)), clubName, leagueIndex);
    player.squadFiller = true;
    roster.push(player);
    index += 1;
  }
  state.clubRosterCache[key] = roster;
}
function hfmV65PositionCa(player, pos) {
  if (!player) return 0;
  const value = typeof overallForPosition === 'function' ? overallForPosition(player, pos || player.pos) : positionOverall(player, pos || player.pos);
  return Number(value || player.strength || 0);
}
function hfmV65PositionFitScore(player, pos) {
  if (!player) return 0;
  if (player.pos === pos) return 1;
  if ((player.secondary || []).includes(pos)) return 0.86;
  return 0;
}
function hfmV65AverageRating10(player) {
  if (Number.isFinite(Number(player.avgRating10))) return hfmV65Round1(player.avgRating10);
  if (Number(player.seasonRatingGames || 0) > 0) {
    const note5 = Number(player.seasonRatingSum || 0) / Math.max(1, Number(player.seasonRatingGames || 0));
    return hfmV65Round1(hfmV65ClampFloat(10.8 - note5 * 1.35, 4.8, 8.9));
  }
  const seed = stableHash(`${player.id || player.name}-${player.club || ''}-${seasonLabel()}-avg`);
  const noise = ((seed % 101) - 50) / 100;
  let rating = 5.55 + Number(player.strength || 50) / 100 * 1.62 + (Number(player.talent || 3) - 3) * 0.13 + noise;
  if (Number(player.age || 25) <= 22 && Number(player.talent || 3) >= 4) rating += 0.14;
  if (player.aiListed || player.transferListedByAi) rating -= 0.08;
  return hfmV65Round1(hfmV65ClampFloat(rating, 5.1, 8.7));
}
function hfmV65SquadAverage(roster) {
  return Math.round(roster.reduce((sum, p) => sum + Number(p.strength || 0), 0) / Math.max(1, roster.length));
}
function hfmV65TargetPositionScore(clubName, leagueIndex, pos) {
  const rep = hfmV65ClubReputation(clubName, leagueIndex);
  const tier = LEAGUES[Number(leagueIndex)]?.tier || 'Mittel';
  const tierBoost = tier === 'Topliga' ? 4 : tier === 'Stark' ? 2 : 0;
  const starterTarget = 46 + rep * 0.38 + tierBoost + (pos === 'TW' ? 1 : 0);
  return starterTarget + Math.max(42, starterTarget - 8) * 0.5;
}
function hfmV65RankPlayersForPosition(roster, pos) {
  return roster
    .map(player => ({ player, fit: hfmV65PositionFitScore(player, pos), ca: hfmV65PositionCa(player, pos) * hfmV65PositionFitScore(player, pos) }))
    .filter(entry => entry.fit > 0)
    .sort((a, b) => b.ca - a.ca);
}
function hfmV65AnalyzePosition(clubName, leagueIndex, roster, pos) {
  const ranked = hfmV65RankPlayersForPosition(roster, pos);
  const best = ranked[0]?.player || null;
  const backup = ranked[1]?.player || null;
  const bestCa = ranked[0]?.ca || 0;
  const backupCa = ranked[1]?.ca || 0;
  const score = bestCa + backupCa * 0.5;
  const target = hfmV65TargetPositionScore(clubName, leagueIndex, pos);
  const desired = HFM_V65_POSITION_TARGETS[pos] || 2;
  const count = ranked.length;
  let urgency = 0.72 + (target - score) / 44;
  if (count < desired) urgency += (desired - count) * 0.22;
  if (best && Number(best.age || 0) >= 33) urgency += 0.26;
  else if (best && Number(best.age || 0) >= 31) urgency += 0.12;
  if (backup && Number(backup.contractYears || 2) <= 1) urgency += 0.13;
  if (best && Number(best.contractYears || 2) <= 1) urgency += 0.18;
  if (!best) urgency += 0.55;
  urgency = hfmV65Round1(hfmV65ClampFloat(urgency, 0.35, 2.0));
  const level = urgency >= 1.35 ? 'Dringend' : urgency >= 1.05 ? 'Medium' : 'Keine Prioritaet';
  return { pos, score: Math.round(score), target: Math.round(target), urgency, level, count, desired, best, backup };
}
function hfmV65AnalyzeClubNeeds(clubName, leagueIndex) {
  const roster = getClubRoster(clubName, Number(leagueIndex));
  const positions = Object.keys(HFM_V65_POSITION_TARGETS);
  return positions.map(pos => hfmV65AnalyzePosition(clubName, leagueIndex, roster, pos)).sort((a, b) => b.urgency - a.urgency || a.score - b.score);
}
function hfmV65ApplyAiSquadCleanup(clubName, leagueIndex) {
  if (hfmV65IsOwnClub(clubName, leagueIndex)) return [];
  const roster = getClubRoster(clubName, Number(leagueIndex));
  const avg = hfmV65SquadAverage(roster);
  const outgoing = [];
  roster.forEach(player => {
    const avgRating = hfmV65AverageRating10(player);
    const surplus = roster.length > 25 && (Number(player.strength || 0) < avg - 5 || avgRating < 6.4 || Number(player.age || 25) >= 31);
    const contractCase = Number(player.contractYears || 2) <= 1 && (Number(player.age || 25) >= 29 || Number(player.strength || 0) < avg - 3);
    const overloaded = roster.length > 26 && Number(player.strength || 0) < avg;
    if (surplus || contractCase || overloaded) {
      player.aiListed = true;
      player.transferListedByAi = true;
      player.aiTransferReason = surplus ? 'Kader-Saeuberung' : contractCase ? 'kurze Vertragslaufzeit' : 'Kader zu gross';
      outgoing.push(player);
    }
  });
  return outgoing;
}
function hfmV65BuildClubPlan(clubName, leagueIndex) {
  const roster = getClubRoster(clubName, Number(leagueIndex));
  hfmV65ApplyAiSquadCleanup(clubName, leagueIndex);
  const finance = hfmV65EnsureAiClubFinance(clubName, leagueIndex);
  const philosophy = hfmV65ClubPhilosophy(clubName, leagueIndex);
  const needs = hfmV65AnalyzeClubNeeds(clubName, leagueIndex);
  const priority = needs[0] || null;
  return {
    club: clubName,
    leagueIndex: Number(leagueIndex),
    key: hfmV65ClubKey(clubName, leagueIndex),
    philosophy,
    finance,
    rosterSize: roster.length,
    squadAverage: hfmV65SquadAverage(roster),
    needs,
    priority
  };
}
function hfmV65CandidateFitsNeed(player, pos) {
  return player && (player.pos === pos || (player.secondary || []).includes(pos));
}
function hfmV65TransferCandidatePool(maxPlayers = 3600) {
  const players = [];
  const seen = new Set();
  const preferredLeagues = new Set([OWN_LEAGUE_INDEX, Number(state.startLeagueIndex || OWN_LEAGUE_INDEX), 0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16]);
  const leagueOrder = LEAGUES.map((_, i) => i).sort((a, b) => (preferredLeagues.has(b) ? 1 : 0) - (preferredLeagues.has(a) ? 1 : 0) || a - b);
  leagueOrder.forEach(leagueIndex => {
    if (players.length >= maxPlayers) return;
    makeLeagueClubs(leagueIndex).forEach(club => {
      if (players.length >= maxPlayers) return;
      if (hfmV65IsOwnClub(club, leagueIndex)) return;
      getClubRoster(club, leagueIndex).forEach(player => {
        const id = String(player.id);
        if (seen.has(id) || players.length >= maxPlayers) return;
        seen.add(id);
        players.push({ ...player, club, leagueIndex: Number(leagueIndex), freeAgent: false });
      });
    });
  });
  (state.transferFreeAgents || []).forEach(player => {
    const id = String(player.id);
    if (!seen.has(id)) {
      seen.add(id);
      players.push({ ...player, club: HFM_V65_FREE_AGENT, leagueIndex: OWN_LEAGUE_INDEX, freeAgent: true });
    }
  });
  return players;
}
function hfmV65RoleForCandidate(plan, ca, need) {
  if (ca >= plan.squadAverage + 7 || Number(need.urgency || 1) >= 1.6) return 'key';
  if (ca >= plan.squadAverage - 1 || Number(need.urgency || 1) >= 1.25) return 'starter';
  if (ca >= plan.squadAverage - 6) return 'rotation';
  return 'backup';
}
function hfmV65SellingMinimum(player, buyerClub, buyerLeagueIndex, need) {
  if (player.freeAgent) return 0;
  if (player.aiListed || player.transferListedByAi || isTransferListed(player)) return transferListPrice(player);
  const sourceRoster = getClubRoster(player.club, Number(player.leagueIndex));
  if (sourceRoster.length <= 22 && Number(player.contractYears || 2) > 1 && Number(player.age || 25) < 31) return Number(player.marketValue || 0) * 1.55;
  const buyerRep = hfmV65ClubReputation(buyerClub, buyerLeagueIndex);
  const sellerRep = hfmV65ClubReputation(player.club, Number(player.leagueIndex));
  let factor = 0.96 + Number(player.contractYears || 2) * 0.08 + Math.max(-10, sellerRep - buyerRep) * 0.006;
  if (Number(need.urgency || 1) >= 1.45) factor += 0.05;
  return hfmV65RoundMoney(Number(player.marketValue || 0) * hfmV65ClampFloat(factor, 0.86, 1.48));
}
function hfmV65BuildOffer(plan, player, ca, avgRating) {
  const need = plan.priority;
  const finance = plan.finance;
  const marketValue = Number(player.marketValue || 0);
  const salary = Number(player.salary || Math.round(((player.strength || 50) * 820 + (player.talent || 2) * 2200) / 1000) * 1000);
  const role = hfmV65RoleForCandidate(plan, ca, need);
  const roleLimit = HFM_V65_WAGE_LIMITS[role] || HFM_V65_WAGE_LIMITS.rotation;
  const currentWageLoad = hfmV65ClubSalaryLoad(plan.club, plan.leagueIndex);
  const remainingWage = Math.max(0, Number(finance.wageBudget || 0) - currentWageLoad);
  const individualWageLimit = Number(finance.wageBudget || 0) * roleLimit;
  if (salary > individualWageLimit) return { accepted: false, reason: 'Gehaltsstruktur', role, salary, maxSalary: individualWageLimit };
  if (salary > remainingWage && remainingWage > 0) return { accepted: false, reason: 'Gehaltsbudget', role, salary, maxSalary: remainingWage };
  let factor = 0.86 + (Number(need.urgency || 1) - 1) * 0.22;
  if (avgRating >= 7.1 && Number(player.age || 25) < 24) factor += 0.13;
  if (plan.philosophy === 'galacticos') factor += 0.17;
  if (plan.philosophy === 'moneyball' && avgRating >= 7.0) factor += 0.04;
  if (Number(player.contractYears || 2) <= 1) factor -= 0.08;
  if (player.aiListed || player.transferListedByAi || player.freeAgent) factor -= 0.10;
  let fee = player.freeAgent ? 0 : hfmV65RoundMoney(marketValue * hfmV65ClampFloat(factor, 0.68, 1.55));
  const handgeld = player.freeAgent ? hfmV65RoundMoney(salary * 2) : 0;
  const asking = hfmV65SellingMinimum(player, plan.club, plan.leagueIndex, need);
  const topCap = Number(finance.remainingBudget || 0) * (Number(need.urgency || 1) >= 1.55 ? 0.86 : 0.70);
  if (!player.freeAgent && fee < asking) {
    if (asking <= topCap && (Number(need.urgency || 1) >= 1.24 || avgRating >= 7.1)) fee = asking;
    else return { accepted: false, reason: 'Forderung zu hoch', role, salary, fee, asking };
  }
  const totalCost = fee + handgeld;
  if (totalCost > Number(finance.remainingBudget || 0)) return { accepted: false, reason: 'Budget', role, salary, fee, handgeld, totalCost };
  if (totalCost > topCap && Number(need.urgency || 1) < 1.55) return { accepted: false, reason: 'Toptransfer-Limit', role, salary, fee, handgeld, totalCost };
  return { accepted: true, role, salary, fee, handgeld, totalCost, asking };
}
function hfmV65CandidateInterest(plan, player) {
  const need = plan.priority;
  if (!need || !hfmV65CandidateFitsNeed(player, need.pos)) return null;
  if (hfmV65IsOwnClub(player.club, player.leagueIndex)) return null;
  if (String(player.club) === String(plan.club) && Number(player.leagueIndex) === Number(plan.leagueIndex)) return null;
  const buyerRep = hfmV65ClubReputation(plan.club, plan.leagueIndex);
  const sourceRep = player.freeAgent ? 0 : hfmV65ClubReputation(player.club, Number(player.leagueIndex));
  const allowance = plan.philosophy === 'galacticos' ? 35 : plan.philosophy === 'youth' ? 17 : 12;
  if (!player.freeAgent && sourceRep > buyerRep + allowance) return null;
  const ca = hfmV65PositionCa(player, need.pos);
  if (ca < Math.max(42, plan.squadAverage - 12) && Number(player.talent || 3) < 4) return null;
  const marketValue = Number(player.marketValue || 0);
  const finance = plan.finance;
  if (marketValue > Number(finance.remainingBudget || 0) * 0.9 && !player.freeAgent) return null;
  const avgRating = hfmV65AverageRating10(player);
  const offer = hfmV65BuildOffer(plan, player, ca, avgRating);
  if (!offer.accepted) return null;
  const age = Number(player.age || 25);
  let score = ca * 0.55 + avgRating * 12 + Number(need.urgency || 1) * 17;
  if (avgRating > 7.1 && age < 24) score += 25;
  if (plan.philosophy === 'youth') score *= age <= 21 ? 1.5 : age <= 24 ? 1.18 : age >= 30 ? 0.25 : 0.82;
  if (plan.philosophy === 'galacticos') score += hfmV65ClubReputation(player.club, Number(player.leagueIndex)) * 0.28 + ca * 0.2;
  if (plan.philosophy === 'moneyball') {
    const valueMillion = Math.max(0.25, marketValue / 1000000);
    score += (avgRating - 6.2) * 14 + Math.max(-8, 10 / valueMillion);
  }
  if (Number(player.contractYears || 2) <= 1 || player.aiListed || player.transferListedByAi || player.freeAgent) score += 8;
  if (age >= 32 && plan.philosophy !== 'galacticos') score -= 10;
  const reason = avgRating > 7.1 && age < 24
    ? 'U24-Ueberflieger mit starker Durchschnittsnote'
    : player.aiListed || player.transferListedByAi
      ? 'Transferliste passt zum Kaderbedarf'
      : plan.philosophy === 'moneyball'
        ? 'gutes Preis-Leistungs-Profil'
        : plan.philosophy === 'youth' && age <= 21
          ? 'junges Entwicklungsprofil'
          : 'beste Kombination aus Staerke, Bedarf und Budget';
  return { player, ca, avgRating, score: Math.round(score), offer, reason };
}
function hfmV65FindBestCandidate(plan, pool) {
  if (!plan.priority || Number(plan.priority.urgency || 0) < 0.9) return null;
  let best = null;
  for (const player of pool) {
    const interest = hfmV65CandidateInterest(plan, player);
    if (!interest) continue;
    if (!best || interest.score > best.score) best = interest;
  }
  return best;
}
function hfmV65RemoveFromSourceRoster(player) {
  if (player.freeAgent || String(player.club) === HFM_V65_FREE_AGENT) {
    state.transferFreeAgents = (state.transferFreeAgents || []).filter(p => String(p.id) !== String(player.id));
    return;
  }
  const key = hfmV65ClubKey(player.club, Number(player.leagueIndex));
  if (!state.clubRosterCache[key]) getClubRoster(player.club, Number(player.leagueIndex));
  state.clubRosterCache[key] = (state.clubRosterCache[key] || []).filter(p => String(p.id) !== String(player.id));
}
function hfmV65CommitTransfer(plan, interest) {
  const player = interest.player;
  const offer = interest.offer;
  hfmV65RemoveFromSourceRoster(player);
  const buyerRoster = getClubRoster(plan.club, plan.leagueIndex);
  const incoming = hfmV65NormalizeExternalPlayer({
    ...player,
    club: plan.club,
    leagueIndex: plan.leagueIndex,
    contractYears: Math.max(2, Math.min(5, 3 + (stableHash(`${player.id}-${plan.club}`) % 3))),
    aiListed: false,
    transferListedByAi: false,
    aiTransferReason: null,
    previousClub: player.club,
    lastTransferFee: offer.fee,
    avgRating10: interest.avgRating
  }, plan.club, plan.leagueIndex);
  buyerRoster.push(incoming);
  plan.finance.remainingBudget = Math.max(0, Number(plan.finance.remainingBudget || 0) - Number(offer.totalCost || 0));
  plan.finance.spent = Number(plan.finance.spent || 0) + Number(offer.totalCost || 0);
  hfmV65ApplyAiSquadCleanup(plan.club, plan.leagueIndex);
  const logEntry = {
    id: `${Date.now()}-${stableHash(`${player.id}-${plan.club}-${state.week}`)}`,
    week: state.week,
    date: formatGermanDate(currentGameDate()),
    buyer: plan.club,
    buyerLeagueIndex: plan.leagueIndex,
    seller: player.freeAgent ? HFM_V65_FREE_AGENT : player.club,
    sellerLeagueIndex: Number(player.leagueIndex),
    player: player.name,
    pos: player.pos,
    age: player.age,
    fee: offer.fee,
    handgeld: offer.handgeld || 0,
    salary: offer.salary,
    role: offer.role,
    needPos: plan.priority.pos,
    urgency: plan.priority.urgency,
    philosophy: plan.philosophy,
    avgRating10: interest.avgRating,
    interestScore: interest.score,
    reason: interest.reason
  };
  state.aiTransferLog.unshift(logEntry);
  state.aiTransferLog = state.aiTransferLog.slice(0, 80);
  return logEntry;
}
function hfmV65AiClubUniverse(limit = 12) {
  const all = [];
  LEAGUES.forEach((league, leagueIndex) => {
    makeLeagueClubs(leagueIndex).forEach(club => {
      if (hfmV65IsOwnClub(club, leagueIndex)) return;
      const rep = hfmV65ClubReputation(club, leagueIndex);
      const ownLeagueBoost = Number(leagueIndex) === Number(state.startLeagueIndex || OWN_LEAGUE_INDEX) ? 60 : 0;
      const hashNoise = stableHash(`${club}-${leagueIndex}-${state.week}-${seasonLabel()}`) % 100;
      all.push({ club, leagueIndex: Number(leagueIndex), score: ownLeagueBoost + rep + hashNoise / 8 });
    });
  });
  return all.sort((a, b) => b.score - a.score).slice(0, limit);
}
function hfmV65SummarizePlan(plan) {
  const p = plan.priority || {};
  return {
    club: plan.club,
    leagueIndex: plan.leagueIndex,
    philosophy: plan.philosophy,
    rosterSize: plan.rosterSize,
    budget: plan.finance.remainingBudget,
    pos: p.pos || '-',
    urgency: p.urgency || 0,
    level: p.level || 'Keine Prioritaet',
    score: p.score || 0,
    target: p.target || 0,
    best: p.best ? `${p.best.name} (${p.best.strength})` : '-'
  };
}
function hfmV65RunWeeklyAiTransfers(force = false, maxDeals = null) {
  hfmV65EnsureAiTransferSystem();
  const now = currentGameDate();
  const isWindow = hfmV65IsTransferWindow(now);
  if (!force && !isWindow) {
    state.aiTransferLastRun = { date: formatGermanDate(now), window: hfmV65WindowLabel(now), deals: 0, skipped: true };
    return [];
  }
  const tickKey = `${seasonLabel()}:${state.week}:${force ? 'manual' : 'auto'}`;
  if (!force && state.aiTransferProcessedWeeks.includes(tickKey)) return [];
  if (!force) state.aiTransferProcessedWeeks.push(tickKey);
  state.aiTransferProcessedWeeks = state.aiTransferProcessedWeeks.slice(-80);
  const dealsTarget = Number(maxDeals || state.aiTransferSettings?.maxDealsPerAutoWeek || 4);
  const clubs = hfmV65AiClubUniverse(force ? 20 : 12);
  const pool = hfmV65TransferCandidatePool(force ? 4200 : 3200);
  const plans = [];
  const deals = [];
  for (const item of clubs) {
    const plan = hfmV65BuildClubPlan(item.club, item.leagueIndex);
    plans.push(hfmV65SummarizePlan(plan));
    if (deals.length >= dealsTarget) continue;
    if (Number(plan.rosterSize || 0) >= Number(state.aiTransferSettings?.maxSquadSize || 26)) continue;
    if (!plan.priority || Number(plan.priority.urgency || 0) < (force ? 0.95 : 1.08)) continue;
    const candidate = hfmV65FindBestCandidate(plan, pool);
    if (!candidate) continue;
    const deal = hfmV65CommitTransfer(plan, candidate);
    if (deal) deals.push(deal);
  }
  state.aiLatestTransferPlans = plans.slice(0, 16);
  state.aiTransferLastRun = { date: formatGermanDate(now), window: hfmV65WindowLabel(now), deals: deals.length, forced: !!force };
  return deals;
}
function hfmV65ManualAiTransferRound() {
  const deals = hfmV65RunWeeklyAiTransfers(true, 5);
  alert(deals.length ? `${deals.length} KI-Transfer(s) wurden durchgefuehrt.` : 'Keine sinnvollen KI-Transfers gefunden. Budgets, Bedarf oder Gehaltsstruktur haben alle Kandidaten blockiert.');
  render();
}
function hfmV65PlanRows() {
  hfmV65EnsureAiTransferSystem();
  const plans = (state.aiLatestTransferPlans && state.aiLatestTransferPlans.length)
    ? state.aiLatestTransferPlans
    : hfmV65AiClubUniverse(10).map(item => hfmV65SummarizePlan(hfmV65BuildClubPlan(item.club, item.leagueIndex)));
  return plans.map(p => `<tr><td><strong>${p.club}</strong><br><small>${LEAGUES[p.leagueIndex]?.league || ''}</small></td><td>${hfmV65PhilosophyLabel(p.philosophy)}</td><td><b>${p.pos}</b><br><small>${p.level}</small></td><td>${Number(p.urgency || 0).toFixed(1)}</td><td>${p.score}/${p.target}</td><td>${euro(Number(p.budget || 0))}</td></tr>`).join('');
}
function hfmV65TransferLogRows(limit = 20) {
  const log = (state.aiTransferLog || []).slice(0, limit);
  if (!log.length) return '<div class="infoBox">Noch keine KI-Transfers im Log. Automatisch laufen sie im Sommer- und Winterfenster. Fuer den Prototyp kannst du unten einen Testlauf starten.</div>';
  return log.map(entry => {
    const feeText = Number(entry.fee || 0) > 0 ? euro(entry.fee) : (Number(entry.handgeld || 0) > 0 ? `Handgeld ${euro(entry.handgeld)}` : 'abloesefrei');
    return `<div class="league"><strong>${entry.player} zu ${entry.buyer}</strong><span>${entry.seller} &rarr; ${entry.buyer} · ${entry.pos}, ${entry.age} J. · ${feeText}</span><span>${hfmV65PhilosophyLabel(entry.philosophy)} · Bedarf ${entry.needPos} (${Number(entry.urgency || 0).toFixed(1)}) · Ø-Note ${Number(entry.avgRating10 || 0).toFixed(1)} · ${entry.reason}</span></div>`;
  }).join('');
}
function aiTransfersView() {
  hfmV65EnsureAiTransferSystem();
  const last = state.aiTransferLastRun;
  const status = last
    ? `Letzter Lauf: ${last.date} · ${last.window} · ${last.deals || 0} Transfer(s)${last.forced ? ' · Testlauf' : ''}`
    : `Status: ${hfmV65WindowLabel(currentGameDate())}`;
  return `<section class="panel widePanel"><p class="eyebrow">Markt · KI-Transfers</p><h2>Virtuelle Sportdirektoren</h2><div class="infoBox">KI-Vereine kaufen nicht mehr zufaellig. Jeder Verein prueft zuerst den Kader, berechnet Positionsbedarf, filtert Kandidaten nach Reputation, Budget, Durchschnittsnote und Philosophie und blockiert Transfers, die Abl&ouml;se oder Gehaltsstruktur sprengen.</div><div class="grid compact">${card('🧠', 'Analyse', 'Bedarf je Position', 'bester Spieler + Backup-Faktor')}${card('🔎', 'Filter', 'CA + Ø-Note', 'Moneyball, Alter, Reputation')}${card('💶', 'Finanzen', 'Budget + Gehalt', 'Toptransfer- und Wage-Sperre')}${card('🧹', 'Kaderpflege', '22-26 Spieler', 'ueberzaehlige Spieler auf Liste')}</div><div class="infoBox">${status}</div><div class="playerActions"><button class="primary full" onclick="hfmV65ManualAiTransferRound()">KI-Transfer-Testrunde ausfuehren</button></div><h3>Aktuelle Prioritaeten</h3><div class="tableWrap"><table><thead><tr><th>Verein</th><th>Philosophie</th><th>Bedarf</th><th>Dringl.</th><th>Score</th><th>Budget</th></tr></thead><tbody>${hfmV65PlanRows()}</tbody></table></div><h3>Transferlog</h3><div class="leagueList">${hfmV65TransferLogRows()}</div></section>`;
}

const hfmV65GetClubRosterBase = getClubRoster;
getClubRoster = function(clubName, leagueIndex = 10) {
  const roster = hfmV65GetClubRosterBase(clubName, Number(leagueIndex));
  hfmV65EnsureAiRosterDepth(clubName, Number(leagueIndex), state.aiTransferSettings?.minSquadSize || 22);
  return state.clubRosterCache[hfmV65SafeRosterKey(clubName, Number(leagueIndex))] || roster;
};

const hfmV65IsTransferListedBase = isTransferListed;
isTransferListed = function(player) {
  if (player?.aiListed || player?.transferListedByAi) return true;
  return hfmV65IsTransferListedBase(player);
};
const hfmV65TransferListReasonBase = transferListReason;
transferListReason = function(player) {
  if (player?.aiTransferReason) return player.aiTransferReason;
  return hfmV65TransferListReasonBase(player);
};
const hfmV65TransferListPriceBase = transferListPrice;
transferListPrice = function(player) {
  if (player?.aiListed || player?.transferListedByAi) {
    const base = Number(player.marketValue || 150000);
    const factor = Number(player.contractYears || 2) <= 1 ? 0.72 : 0.84;
    return Math.max(25000, hfmV65RoundMoney(base * factor));
  }
  return hfmV65TransferListPriceBase(player);
};

const hfmV65MarketOverviewBase = marketOverview;
marketOverview = function() {
  hfmV65EnsureAiTransferSystem();
  const tlCount = transferListedPlayers().length;
  const aiDeals = (state.aiTransferLog || []).length;
  return `<section class="panel"><p class="eyebrow">Transfermarkt</p><h2>Transfers, Suche, Leihen und KI-Markt</h2><div class="grid compact">${card('📋', 'Transferliste', `${tlCount} Spieler`, 'leichter und oft guenstiger kaufbar', "setMarketSection('transferlist')")}${card('🔎', 'Spielersuche', 'Filter bereit', 'alle Vereine und Ligen durchsuchen', "setMarketSection('search')")}${card('⭐', 'Beobachtungsliste', `${state.watchlist.length} Spieler`, 'gespeicherte Kandidaten', "setMarketSection('watchlist')")}${card('🔁', 'Leihen', `${state.players.filter(p => p.loan === 'verliehen').length} verliehen`, 'geliehene und verliehene Spieler', "setMarketSection('loans')")}${card('🧠', 'KI-Transfers', `${aiDeals} Logeintraege`, 'Bedarf, Philosophie und Budget', "setMarketSection('aiTransfers')")}</div></section>`;
};
market = function() {
  const content = state.marketSection === 'transferlist' ? transferListView()
    : state.marketSection === 'search' ? playerSearchView()
      : state.marketSection === 'watchlist' ? watchlistView()
        : state.marketSection === 'loans' ? loansView()
          : state.marketSection === 'aiTransfers' ? aiTransfersView()
            : marketOverview();
  return `<section class="teamSubnav"><div class="chips">${marketSubButton('overview', 'Uebersicht')}${marketSubButton('transferlist', 'Transferliste')}${marketSubButton('search', 'Spielersuche')}${marketSubButton('watchlist', 'Beobachtungsliste')}${marketSubButton('loans', 'Leihen')}${marketSubButton('aiTransfers', 'KI-Transfers')}</div></section>${content}`;
};

const hfmV65InitBase = initV36Features;
initV36Features = function() {
  hfmV65InitBase();
  hfmV65EnsureAiTransferSystem();
};
const hfmV65NextWeekBase = nextWeek;
nextWeek = function() {
  const beforeWeek = state.week;
  hfmV65NextWeekBase();
  if (!state.gameStarted || state.seasonEndModal || state.activeMatch) return;
  if (state.week === beforeWeek) return;
  const deals = hfmV65RunWeeklyAiTransfers(false);
  if (deals.length) render();
};
const hfmV65StartGameBase = startGame;
startGame = function() {
  hfmV65StartGameBase();
  hfmV65EnsureAiTransferSystem();
};
const hfmV65LoadGameBase = loadGame;
loadGame = function() {
  hfmV65LoadGameBase();
  hfmV65EnsureAiTransferSystem();
};

hfmV65EnsureAiTransferSystem();


/* Version 66: feste Startseite mit dauerhaftem Rasenbild */
const HFM_V66_START_IMAGE = 'assets/startseite-rasen.jpg';

function hfmV66EnsureStartState() {
  if (!state.startPageMode) state.startPageMode = 'home';
  if (!state.startSetup || typeof state.startSetup !== 'object') {
    state.startSetup = { managerName: '', managerAge: 35, managerCountry: 'Österreich', leagueIndex: 10, clubName: 'FC Beispielstadt' };
  }
  if (state.startSetup.leagueIndex === undefined || state.startSetup.leagueIndex === null) state.startSetup.leagueIndex = Number(state.startLeagueIndex || 10);
  if (!state.startSetup.clubName) state.startSetup.clubName = makeLeagueClubs(Number(state.startSetup.leagueIndex))[0] || 'FC Beispielstadt';
  if (!state.startSetup.managerAge) state.startSetup.managerAge = 35;
  if (!state.startSetup.managerCountry) state.startSetup.managerCountry = 'Österreich';
}
function hfmV66RememberStartInputs() {
  hfmV66EnsureStartState();
  const name = document.getElementById('managerName');
  const age = document.getElementById('managerAge');
  const country = document.getElementById('managerCountry');
  const league = document.getElementById('startLeague');
  const club = document.getElementById('startClub');
  if (name) state.startSetup.managerName = String(name.value || '').trim();
  if (age) state.startSetup.managerAge = Number(age.value || 35);
  if (country) state.startSetup.managerCountry = String(country.value || '').trim() || 'Österreich';
  if (league) state.startSetup.leagueIndex = Number(league.value || state.startSetup.leagueIndex || 10);
  if (club) state.startSetup.clubName = String(club.value || state.startSetup.clubName || '').trim();
}
function hfmV66SaveInfoText() {
  try {
    if (typeof saveInfoText === 'function') return saveInfoText();
  } catch (err) {}
  return 'Noch kein Spielstand gespeichert.';
}
function hfmV66OpenSetup() {
  hfmV66EnsureStartState();
  state.startPageMode = 'setup';
  render();
}
function hfmV66OpenStartHome() {
  hfmV66RememberStartInputs();
  state.startPageMode = 'home';
  render();
}
function hfmV66LoadSaveFromStart() {
  if (typeof loadGame === 'function') loadGame();
}
function hfmV66StartHomeScreen() {
  return `<div class="appShell startShell startLandingPage">
    <main class="startLanding">
      <section class="startLandingVisual" aria-label="Startseite">
        <img src="${HFM_V66_START_IMAGE}" alt="Fußballrasen als Startseitenbild">
        <div class="startLandingShade">
          <div>
            <p class="eyebrow">Handy-Fußballmanager</p>
            <h1 class="startLandingTitle">Deine Karriere beginnt hier.</h1>
            <p class="startLandingText">Starte eine neue Managerlaufbahn, wähle Liga und Verein und führe deinen Klub durch Transfers, Training, Spieltage und Finanzen.</p>
          </div>
          <div class="startLandingActions">
            <button class="primary full" onclick="hfmV66OpenSetup()">Neues Spiel beginnen</button>
            <button class="ghost full" onclick="hfmV66LoadSaveFromStart()">Spielstand laden</button>
          </div>
          <p class="startLandingText startSaveHint">${hfmV66SaveInfoText()}</p>
        </div>
      </section>
    </main>
  </div>`;
}
function hfmV66StartSetupScreen() {
  hfmV66EnsureStartState();
  const league = LEAGUES[Number(state.startSetup.leagueIndex)] || LEAGUES[10];
  return `<div class="appShell startShell startSetupPage">
    <section class="startSetupVisual" aria-label="Managerstart">
      <img src="${HFM_V66_START_IMAGE}" alt="Fußballrasen als Startseitenbild">
      <div class="startSetupShade">
        <div>
          <p class="eyebrow">Neues Spiel</p>
          <h1>Managerprofil erstellen</h1>
          <p class="startSetupText">Lege deine Managerdaten fest und wähle danach Startliga und Verein. Das Rasenbild bleibt das feste Startseitenbild.</p>
        </div>
        <button class="ghost startHomeButton" onclick="hfmV66OpenStartHome()">Zur Startseite</button>
      </div>
    </section>
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

const hfmV66SetStartLeagueBase = setStartLeague;
setStartLeague = function(value) {
  hfmV66RememberStartInputs();
  state.startPageMode = 'setup';
  hfmV66SetStartLeagueBase(value);
};
const hfmV66StartScreenBase = startScreen;
startScreen = function() {
  hfmV66EnsureStartState();
  return state.startPageMode === 'setup' ? hfmV66StartSetupScreen() : hfmV66StartHomeScreen();
};
const hfmV66StartGameBase = startGame;
startGame = function() {
  hfmV66RememberStartInputs();
  hfmV66StartGameBase();
  if (state.gameStarted) state.startPageMode = 'home';
};

try {
  if (typeof Image !== 'undefined') {
    const hfmV66PreloadImage = new Image();
    hfmV66PreloadImage.src = HFM_V66_START_IMAGE;
  }
} catch (err) {}

/* Version 67: Startseite ohne Funktionskacheln; Kacheln erst im Spiel-Dashboard */

hfmV66EnsureStartState();
render();
/* Version 68: echte Vereins-/Liganamen, Newscenter und fokussierte Halbzeit-Tabs */
const HFM_V68_REAL_LEAGUE_DATA = {
  0: { country: "England", league: "Premier League", clubs: ["Liverpool FC", "Arsenal FC", "Manchester City", "Chelsea FC", "Newcastle United", "Aston Villa", "Nottingham Forest", "Brighton & Hove Albion", "AFC Bournemouth", "Brentford FC", "Fulham FC", "Crystal Palace", "Everton FC", "West Ham United", "Manchester United", "Wolverhampton Wanderers", "Tottenham Hotspur", "Leeds United", "Burnley FC", "Sunderland AFC"] },
  1: { country: "Spanien", league: "LaLiga EA SPORTS", clubs: ["FC Barcelona", "Real Madrid", "Atlético Madrid", "Athletic Club", "Villarreal CF", "Real Betis", "RC Celta", "Rayo Vallecano", "CA Osasuna", "RCD Mallorca", "Real Sociedad", "Valencia CF", "Sevilla FC", "Getafe CF", "RCD Espanyol", "Deportivo Alavés", "Girona FC", "Levante UD", "Elche CF", "Real Oviedo"] },
  2: { country: "Italien", league: "Serie A", clubs: ["SSC Napoli", "Inter Mailand", "Atalanta BC", "Juventus", "Bologna FC", "AS Roma", "AC Fiorentina", "Lazio Rom", "AC Milan", "Como 1907", "Torino FC", "Udinese Calcio", "Genoa CFC", "Hellas Verona", "Cagliari Calcio", "Parma Calcio", "US Lecce", "US Sassuolo", "Pisa SC", "US Cremonese"] },
  3: { country: "Deutschland", league: "Bundesliga", clubs: ["FC Bayern München", "Borussia Dortmund", "RB Leipzig", "VfB Stuttgart", "TSG Hoffenheim", "Bayer 04 Leverkusen", "SC Freiburg", "Eintracht Frankfurt", "FC Augsburg", "1. FSV Mainz 05", "1. FC Union Berlin", "Borussia Mönchengladbach", "Hamburger SV", "1. FC Köln", "SV Werder Bremen", "VfL Wolfsburg", "1. FC Heidenheim 1846", "FC St. Pauli"] },
  4: { country: "Frankreich", league: "Ligue 1", clubs: ["Paris Saint-Germain", "Olympique Marseille", "AS Monaco", "OGC Nice", "LOSC Lille", "Olympique Lyon", "RC Strasbourg", "RC Lens", "Stade Brestois 29", "Toulouse FC", "AJ Auxerre", "Stade Rennais", "FC Nantes", "Angers SCO", "Le Havre AC", "FC Lorient", "Paris FC", "FC Metz"] },
  5: { country: "Portugal", league: "Liga Portugal Betclic", clubs: ["Sporting CP", "SL Benfica", "FC Porto", "SC Braga", "Vitória SC", "Santa Clara", "FC Famalicão", "Moreirense FC", "Estoril Praia", "Casa Pia AC", "Rio Ave FC", "FC Arouca", "Gil Vicente FC", "CD Nacional", "AVS Futebol SAD", "CD Tondela", "FC Alverca", "Estrela da Amadora"] },
  6: { country: "Niederlande", league: "Eredivisie", clubs: ["PSV Eindhoven", "Ajax Amsterdam", "Feyenoord Rotterdam", "FC Utrecht", "AZ Alkmaar", "FC Twente", "Go Ahead Eagles", "FC Groningen", "SC Heerenveen", "NEC Nijmegen", "Fortuna Sittard", "Sparta Rotterdam", "PEC Zwolle", "Heracles Almelo", "NAC Breda", "Telstar", "FC Volendam", "Excelsior Rotterdam"] },
  7: { country: "Belgien", league: "Jupiler Pro League", clubs: ["Club Brugge", "Union Saint-Gilloise", "RSC Anderlecht", "KRC Genk", "Royal Antwerp FC", "KAA Gent", "Standard Lüttich", "Sporting Charleroi", "OH Leuven", "KVC Westerlo", "KV Mechelen", "Cercle Brugge", "Sint-Truidense VV", "FCV Dender", "Zulte Waregem", "RAAL La Louvière"] },
  8: { country: "Türkei", league: "Trendyol Süper Lig", clubs: ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor", "İstanbul Başakşehir", "Eyüpspor", "Göztepe", "Kasımpaşa", "Konyaspor", "Sivasspor", "Antalyaspor", "Alanyaspor", "Kayserispor", "Çaykur Rizespor", "Samsunspor", "Gaziantep FK", "Gençlerbirliği", "Kocaelispor"] },
  9: { country: "Schottland", league: "Scottish Premiership", clubs: ["Celtic FC", "Rangers FC", "Aberdeen FC", "Hibernian FC", "Dundee United", "St Mirren", "Heart of Midlothian", "Motherwell FC", "Kilmarnock FC", "Dundee FC", "Falkirk FC", "Livingston FC"] },
  10: { country: "Österreich", league: "ADMIRAL Bundesliga", clubs: ["SK Sturm Graz", "FC Red Bull Salzburg", "FK Austria Wien", "Wolfsberger AC", "SK Rapid Wien", "FC Blau-Weiß Linz", "LASK", "TSV Hartberg", "WSG Tirol", "Grazer AK 1902", "SCR Altach", "SV Ried"] },
  11: { country: "Schweiz", league: "Super League", clubs: ["FC Basel", "BSC Young Boys", "Servette FC", "FC Luzern", "FC Lugano", "FC Lausanne-Sport", "FC St. Gallen", "FC Zürich", "Grasshopper Club Zürich", "FC Winterthur", "FC Sion", "FC Thun"] },
  12: { country: "Dänemark", league: "3F Superliga", clubs: ["FC København", "FC Midtjylland", "Brøndby IF", "AGF Aarhus", "FC Nordsjælland", "Randers FC", "Silkeborg IF", "Viborg FF", "Sønderjyske", "Vejle BK", "Odense BK", "FC Fredericia"] },
  13: { country: "Griechenland", league: "Stoiximan Super League", clubs: ["Olympiacos", "Panathinaikos", "AEK Athen", "PAOK Thessaloniki", "Aris Thessaloniki", "Asteras Tripolis", "OFI Kreta", "Atromitos Athen", "Panetolikos", "Volos NFC", "Levadiakos", "Panserraikos", "AE Kifisia", "AEL"] },
  14: { country: "Tschechien", league: "Chance Liga", clubs: ["Slavia Prag", "Sparta Prag", "Viktoria Plzeň", "Baník Ostrava", "Sigma Olomouc", "FK Jablonec", "FC Hradec Králové", "Bohemians 1905", "1. FC Slovácko", "FK Teplice", "Slovan Liberec", "FK Mladá Boleslav", "MFK Karviná", "FK Pardubice", "FC Zlín", "Dukla Prag"] },
  15: { country: "USA/Kanada", league: "Major League Soccer", clubs: ["Inter Miami CF", "Atlanta United", "Charlotte FC", "Chicago Fire", "FC Cincinnati", "Columbus Crew", "D.C. United", "CF Montréal", "Nashville SC", "New England Revolution", "New York City FC", "New York Red Bulls", "Orlando City SC", "Philadelphia Union", "Toronto FC", "Austin FC", "Colorado Rapids", "FC Dallas", "Houston Dynamo", "LA Galaxy", "Los Angeles FC", "Minnesota United", "Portland Timbers", "Real Salt Lake", "San Diego FC", "San Jose Earthquakes", "Seattle Sounders", "Sporting Kansas City", "St. Louis CITY SC", "Vancouver Whitecaps"] },
  16: { country: "Brasilien", league: "Campeonato Brasileiro Série A", clubs: ["Flamengo", "Palmeiras", "Corinthians", "São Paulo", "Santos", "Vasco da Gama", "Botafogo", "Fluminense", "Atlético Mineiro", "Cruzeiro", "Grêmio", "Internacional", "Bahia", "Fortaleza", "Ceará", "Sport Recife", "Vitória", "Juventude", "Mirassol", "Red Bull Bragantino"] },
  17: { country: "Deutschland", league: "2. Bundesliga", clubs: ["Hertha BSC", "DSC Arminia Bielefeld", "VfL Bochum 1848", "Eintracht Braunschweig", "SV Darmstadt 98", "SG Dynamo Dresden", "SV Elversberg", "SpVgg Greuther Fürth", "Hannover 96", "1. FC Kaiserslautern", "Karlsruher SC", "Holstein Kiel", "1. FC Magdeburg", "1. FC Nürnberg", "SC Paderborn 07", "SC Preußen Münster", "FC Schalke 04", "Fortuna Düsseldorf"] }
};

const HFM_V68_NEWS_TEMPLATES = {
  WELCOME_TITLE: "Willkommen bei {CLUB_NAME}",
  WELCOME_BODY: "Deine Arbeit bei {CLUB_NAME} beginnt. Das Newscenter sammelt ab jetzt persönliche Nachrichten, Welt-News, Transfermeldungen und Spielberichte an einem Ort.",
  SQUAD_BRIEFING_TITLE: "Kaderbericht: {CLUB_NAME}",
  SQUAD_BRIEFING_BODY: "Der Sportdirektor meldet {SQUAD_SIZE} Profis im Kader. Aktuelle Formation: {FORMATION}. Achte auf Fitness, Moral und Positionsprobleme vor dem nächsten Spiel.",
  WORLD_READY_TITLE: "Ligawelt aktualisiert",
  WORLD_READY_BODY: "Die spielbare Welt nutzt jetzt echte Liga- und Vereinsnamen. Besonders relevante Transfers und Ergebnisse erscheinen als Welt-News.",
  MATCH_RESULT_TITLE: "Spielbericht: {CLUB_NAME} {RESULT_WORD} gegen {OPPONENT}",
  MATCH_RESULT_BODY: "Endstand: {SCORE}. {SUMMARY} Die Spielernoten wurden gespeichert und beeinflussen Form, Entwicklung und Marktwerte.",
  AI_TRANSFER_TITLE: "Transfermeldung: {PLAYER_NAME} zu {BUYER}",
  AI_TRANSFER_BODY: "{BUYER} verpflichtet {PLAYER_NAME} von {SELLER}. Ablöse: {FEE}. Grund der KI: {REASON}.",
  TRANSFER_OFFER_TITLE: "Transferangebot für {PLAYER_NAME}",
  TRANSFER_OFFER_BODY: "{BUYER} bietet {FEE} für {PLAYER_NAME}. Diese Nachricht benötigt eine Entscheidung, bevor die Kalender-Simulation weiterläuft.",
  TRANSFER_ACCEPTED_TITLE: "Transfer bestätigt: {PLAYER_NAME}",
  TRANSFER_ACCEPTED_BODY: "{PLAYER_NAME} wechselt zu {BUYER}. Dein Verein erhält {FEE}. Der Kaderplatz ist frei, das Budget wurde angepasst.",
  TRANSFER_REJECTED_TITLE: "Transferangebot abgelehnt",
  TRANSFER_REJECTED_BODY: "Das Angebot von {BUYER} für {PLAYER_NAME} wurde abgelehnt. Der Spieler bleibt im Kader.",
  TRANSFER_NEGOTIATE_BODY: "{BUYER} hat nachgelegt. Neues Angebot: {FEE}. Entscheide jetzt über Annahme oder Ablehnung.",
  YOUTH_TITLE: "Jugendzentrum entdeckt Talent",
  YOUTH_BODY: "{PLAYER_NAME} wurde in die Jugend aufgenommen. Position: {POSITION}, Talent: {TALENT}.",
  FINANCE_TITLE: "Finanzbericht",
  FINANCE_BODY: "Kontostand: {MONEY}. Behalte Gehälter, Ausbaukosten und Sponsorenboni im Blick."
};

function hfmV68ApplyRealLeagueNames() {
  Object.keys(HFM_V68_REAL_LEAGUE_DATA).forEach(key => {
    const idx = Number(key);
    const data = HFM_V68_REAL_LEAGUE_DATA[idx];
    if (!LEAGUES[idx]) {
      LEAGUES[idx] = { region: idx === 16 ? "Südamerika" : "Europa", country: data.country, league: data.league, tier: idx === 17 ? "Stark" : "Topliga", clubs: data.clubs.length };
    } else {
      LEAGUES[idx].country = data.country;
      LEAGUES[idx].league = data.league;
      LEAGUES[idx].clubs = data.clubs.length;
      if (idx === 16) LEAGUES[idx].region = "Südamerika";
      if (idx === 17) LEAGUES[idx].region = "Europa";
    }
  });
}

function hfmV68RealClubs(leagueIndex) {
  const data = HFM_V68_REAL_LEAGUE_DATA[Number(leagueIndex)];
  return data ? data.clubs.slice() : null;
}

const hfmV68MakeLeagueClubsBase = makeLeagueClubs;
makeLeagueClubs = function(leagueIndex) {
  const real = hfmV68RealClubs(Number(leagueIndex));
  if (real) return real;
  return hfmV68MakeLeagueClubsBase(Number(leagueIndex));
};

function hfmV68DefaultClubForLeague(leagueIndex) {
  const clubs = makeLeagueClubs(Number(leagueIndex));
  return clubs[0] || "FC Red Bull Salzburg";
}

function hfmV68NormalizeStartSetup() {
  hfmV68ApplyRealLeagueNames();
  if (!state.startSetup || typeof state.startSetup !== "object") state.startSetup = {};
  if (state.startSetup.leagueIndex === undefined || state.startSetup.leagueIndex === null) state.startSetup.leagueIndex = 10;
  const clubs = makeLeagueClubs(Number(state.startSetup.leagueIndex));
  if (!clubs.includes(state.startSetup.clubName)) state.startSetup.clubName = clubs[0] || "FC Red Bull Salzburg";
  if (!state.clubName || state.clubName === "FC Beispielstadt") state.clubName = state.startSetup.clubName;
}

function hfmV68BuildTableRowsForLeague(leagueIndex, ownClubNameValue) {
  const clubsRaw = makeLeagueClubs(Number(leagueIndex));
  const clubs = clubsRaw.slice();
  if (ownClubNameValue && !clubs.includes(ownClubNameValue) && clubs.length) clubs[Math.min(6, clubs.length - 1)] = ownClubNameValue;
  const basePoints = clubs.length >= 18 ? 42 : clubs.length >= 16 ? 36 : 30;
  return clubs.map((club, i) => {
    const seed = stableHash(`${club}-${leagueIndex}-v68`);
    const played = 7;
    const points = Math.max(2, basePoints - i * 2 + seededNumber(seed, -2, 2));
    const diff = Math.round((points - basePoints / 2) / 2) + seededNumber(seed + 17, -2, 2);
    return { pos: i + 1, club, played, points, diff, own: club === ownClubNameValue };
  }).sort((a, b) => b.points - a.points || b.diff - a.diff).map((row, index) => ({ ...row, pos: index + 1 }));
}

function hfmV68ApplyCurrentLeagueTable(force = false) {
  const leagueIndex = Number(state.startLeagueIndex ?? state.startSetup?.leagueIndex ?? 10);
  const realClubs = makeLeagueClubs(leagueIndex);
  const currentNames = CURRENT_TABLE.map(r => r.club);
  const hasFictional = currentNames.some(name => /Beispielstadt|Bergheim|Hainstadt|Altbrunn|Nordheim|Südstadt|Donaupark|Talblick|Mühlbach|Kronau/.test(String(name)));
  if (!force && state.realClubNamesAppliedV68 && !hasFictional) return;
  const own = state.clubName && state.clubName !== "FC Beispielstadt" ? state.clubName : (realClubs[0] || "FC Red Bull Salzburg");
  state.clubName = own;
  const rows = hfmV68BuildTableRowsForLeague(leagueIndex, own);
  if (!rows.some(r => r.own) && rows.length) rows[Math.min(6, rows.length - 1)].own = true;
  CURRENT_TABLE.splice(0, CURRENT_TABLE.length, ...rows);
  state.realClubNamesAppliedV68 = true;
  state.realCurrentLeagueIndexV68 = leagueIndex;
  state.leagueTableCache = {};
}

const hfmV68GetLeagueTableBase = getLeagueTable;
getLeagueTable = function(leagueIndex) {
  const idx = Number(leagueIndex);
  if (state.gameStarted && idx === Number(state.startLeagueIndex ?? 10)) return CURRENT_TABLE.map(r => ({ ...r, leagueIndex: idx }));
  const real = hfmV68RealClubs(idx);
  if (!real) return hfmV68GetLeagueTableBase(idx);
  const cacheKey = `v68:${idx}`;
  state.leagueTableCache = state.leagueTableCache || {};
  if (!state.leagueTableCache[cacheKey]) {
    state.leagueTableCache[cacheKey] = hfmV68BuildTableRowsForLeague(idx, null).map(r => ({ ...r, leagueIndex: idx, own: false }));
  }
  return state.leagueTableCache[cacheKey];
};

worldView = function() {
  const leagues = LEAGUES.map((l, index) => `<button class="league clickableLeague" onclick="openLeagueTable(${index})"><strong>${l.league}</strong><span>${l.country} · ${l.region} · ${l.clubs} Vereine · ${l.tier}</span></button>`).join("");
  return `<section class="panel"><p class="eyebrow">Spielbare Welt</p><h2>Echte Liga- und Vereinsnamen</h2><div class="infoBox">Die Tabellen und KI-Transferlogik verwenden jetzt echte Vereinsnamen. Tippe auf eine Liga, um ihre aktuelle Tabelle zu öffnen.</div><div class="leagueList">${leagues}</div></section>`;
};

function hfmV68Html(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[ch]));
}
function hfmV68IsoDate(date) {
  const d = date instanceof Date ? date : currentGameDate();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function hfmV68EnsureNewsState() {
  if (!Array.isArray(state.newsItems)) state.newsItems = [];
  if (!state.newsFilter) state.newsFilter = "inbox";
  if (!state.newsSequence) state.newsSequence = 1;
}
function hfmV68FillTemplate(key, data = {}) {
  const template = HFM_V68_NEWS_TEMPLATES[key] || key || "";
  return template.replace(/\{([A-Z0-9_]+)\}/g, (_, token) => hfmV68Html(data[token] ?? ""));
}
function hfmV68CategoryLabel(category) {
  const labels = { TRANSFER: "Transfer", INJURY: "Verletzung", FINANCE: "Finanzen", MATCH: "Spiel", SCOUTING: "Scouting", CLUB: "Verein", MEDIA: "Medien", SYSTEM: "System", YOUTH: "Jugend" };
  return labels[category] || category || "Info";
}
function hfmV68PriorityLabel(priority) {
  if (Number(priority) === 1) return "Kritisch";
  if (Number(priority) === 2) return "Wichtig";
  return "Info";
}
function hfmV68AddNews(input) {
  hfmV68EnsureNewsState();
  if (input.uniqueKey && state.newsItems.some(n => n.uniqueKey === input.uniqueKey)) return null;
  const date = input.timestamp || hfmV68IsoDate(currentGameDate());
  const seq = String(state.newsSequence++).padStart(3, "0");
  const news = {
    id: input.id || `news_${date.replace(/-/g, "_")}_${seq}`,
    timestamp: date,
    category: input.category || "SYSTEM",
    priority: Number(input.priority || 3),
    sender_id: input.sender_id || "system",
    subject_ids: input.subject_ids || [],
    title_template: input.title_template || "WELCOME_TITLE",
    body_template: input.body_template || "WELCOME_BODY",
    requires_action: !!input.requires_action,
    action_type: input.action_type || null,
    scope: input.scope || "inbox",
    read: !!input.read,
    resolved: !!input.resolved,
    data: input.data || {},
    uniqueKey: input.uniqueKey || null
  };
  state.newsItems.unshift(news);
  state.newsItems = state.newsItems.slice(0, 160);
  return news;
}
function hfmV68NewsTitle(news) { return hfmV68FillTemplate(news.title_template, news.data); }
function hfmV68NewsBody(news) { return hfmV68FillTemplate(news.body_template, news.data); }
function hfmV68UnreadNews(scope = null) {
  hfmV68EnsureNewsState();
  return state.newsItems.filter(n => !n.read && (!scope || n.scope === scope));
}
function hfmV68NewsUnreadCount(scope = null) { return hfmV68UnreadNews(scope).length; }
function hfmV68ActionNews() {
  hfmV68EnsureNewsState();
  return state.newsItems.filter(n => n.requires_action && !n.resolved);
}
function hfmV68BlockingNews() {
  return hfmV68ActionNews().find(n => Number(n.priority) <= 1) || null;
}
function hfmV68SeedInitialNews() {
  hfmV68EnsureNewsState();
  if (!state.gameStarted || state.newsSeededV68) return;
  hfmV68AddNews({
    category: "CLUB", priority: 2, scope: "inbox", sender_id: "board", uniqueKey: `welcome-${seasonLabel()}-${ownClubName()}`,
    title_template: "WELCOME_TITLE", body_template: "WELCOME_BODY", data: { CLUB_NAME: ownClubName() }
  });
  hfmV68AddNews({
    category: "CLUB", priority: 3, scope: "inbox", sender_id: "sporting_director", uniqueKey: `squad-${seasonLabel()}-${ownClubName()}`,
    title_template: "SQUAD_BRIEFING_TITLE", body_template: "SQUAD_BRIEFING_BODY", data: { CLUB_NAME: ownClubName(), SQUAD_SIZE: (state.players || []).length, FORMATION: state.formation || "4-4-2" }
  });
  hfmV68AddNews({
    category: "SYSTEM", priority: 3, scope: "world", sender_id: "league_world", uniqueKey: `real-world-${seasonLabel()}`,
    title_template: "WORLD_READY_TITLE", body_template: "WORLD_READY_BODY", data: {}
  });
  state.newsSeededV68 = true;
}
function hfmV68OpenNewsItem(id) {
  hfmV68EnsureNewsState();
  const item = state.newsItems.find(n => n.id === id);
  if (item) item.read = true;
  state.newsSelectedId = id;
  render();
}
function setNewsFilter(filter) {
  hfmV68EnsureNewsState();
  state.newsFilter = filter || "inbox";
  state.newsSelectedId = null;
  render();
}
function hfmV68MarkAllNewsRead() {
  hfmV68EnsureNewsState();
  state.newsItems.forEach(n => n.read = true);
  render();
}
function hfmV68GoFromNews(target, section) {
  if (section && typeof goTo === "function") goTo(target, section);
  else setTab(target);
}
function hfmV68ResolveNewsAction(id, action) {
  hfmV68EnsureNewsState();
  const news = state.newsItems.find(n => n.id === id);
  if (!news || news.resolved) return;
  news.read = true;
  if (news.action_type === "TRANSFER_OFFER") {
    const playerId = news.data.PLAYER_ID;
    const player = (state.players || []).find(p => String(p.id) === String(playerId));
    const fee = Number(news.data.FEE_VALUE || 0);
    if (action === "accept" && player) {
      state.players = state.players.filter(p => String(p.id) !== String(playerId));
      Object.keys(state.lineup || {}).forEach(slot => { if (String(state.lineup[slot]) === String(playerId)) state.lineup[slot] = null; });
      Object.keys(state.bench || {}).forEach(slot => { if (String(state.bench[slot]) === String(playerId)) state.bench[slot] = null; });
      state.money = Number(state.money || 0) + fee;
      state.finance.incomeTransfers = Number(state.finance.incomeTransfers || 0) + fee;
      news.resolved = true;
      news.requires_action = false;
      hfmV68AddNews({ category: "TRANSFER", priority: 2, scope: "inbox", sender_id: news.data.BUYER || "club", uniqueKey: `accepted-${news.id}`, title_template: "TRANSFER_ACCEPTED_TITLE", body_template: "TRANSFER_ACCEPTED_BODY", data: { PLAYER_NAME: player.name, BUYER: news.data.BUYER, FEE: news.data.FEE } });
    } else if (action === "negotiate" && !news.data.NEGOTIATED) {
      const improved = Math.round(fee * 1.12 / 10000) * 10000;
      news.data.FEE_VALUE = improved;
      news.data.FEE = euro(improved);
      news.data.NEGOTIATED = true;
      news.body_template = "TRANSFER_NEGOTIATE_BODY";
      news.read = false;
    } else {
      news.resolved = true;
      news.requires_action = false;
      hfmV68AddNews({ category: "TRANSFER", priority: 3, scope: "inbox", sender_id: news.data.BUYER || "club", uniqueKey: `rejected-${news.id}`, title_template: "TRANSFER_REJECTED_TITLE", body_template: "TRANSFER_REJECTED_BODY", data: { PLAYER_NAME: news.data.PLAYER_NAME, BUYER: news.data.BUYER } });
    }
  } else {
    news.resolved = true;
    news.requires_action = false;
  }
  render();
}
function hfmV68NewsActionButtons(news) {
  if (!news.requires_action || news.resolved) return "";
  if (news.action_type === "TRANSFER_OFFER") {
    const negotiateDisabled = news.data?.NEGOTIATED ? "disabled" : "";
    return `<div class="modalActions newsActions"><button class="primary full" onclick="hfmV68ResolveNewsAction('${news.id}','accept')">Annehmen</button><button class="ghost full" ${negotiateDisabled} onclick="hfmV68ResolveNewsAction('${news.id}','negotiate')">Nachverhandeln</button><button class="ghost full" onclick="hfmV68ResolveNewsAction('${news.id}','reject')">Ablehnen</button></div>`;
  }
  return `<div class="modalActions newsActions"><button class="primary full" onclick="hfmV68ResolveNewsAction('${news.id}','ok')">Erledigt</button></div>`;
}
function hfmV68NewsItemsForFilter() {
  hfmV68EnsureNewsState();
  const filter = state.newsFilter || "inbox";
  if (filter === "unread") return state.newsItems.filter(n => !n.read);
  if (filter === "action") return state.newsItems.filter(n => n.requires_action && !n.resolved);
  if (filter === "world") return state.newsItems.filter(n => n.scope === "world");
  if (filter === "all") return state.newsItems;
  return state.newsItems.filter(n => n.scope !== "world");
}
function newscenter() {
  hfmV68EnsureNewsState();
  const unread = hfmV68NewsUnreadCount();
  const unreadInbox = hfmV68NewsUnreadCount("inbox");
  const unreadWorld = hfmV68NewsUnreadCount("world");
  const actions = hfmV68ActionNews().length;
  const filter = state.newsFilter || "inbox";
  const chip = (id, label, count = 0) => `<button class="chip ${filter === id ? 'selected' : ''}" onclick="setNewsFilter('${id}')">${label}${count ? ` <span class="chipBadge">${count}</span>` : ''}</button>`;
  const items = hfmV68NewsItemsForFilter();
  const selected = state.newsItems.find(n => n.id === state.newsSelectedId) || items[0] || null;
  const rows = items.map(n => {
    const cls = `${!n.read ? "unread" : ""} ${n.requires_action && !n.resolved ? "needsAction" : ""}`;
    return `<button class="newsItem ${cls}" onclick="hfmV68OpenNewsItem('${n.id}')"><span class="newsMeta"><b>${hfmV68CategoryLabel(n.category)}</b><em>${hfmV68PriorityLabel(n.priority)}</em></span><strong>${hfmV68NewsTitle(n)}</strong><small>${n.timestamp}${n.requires_action && !n.resolved ? ' · Entscheidung offen' : n.read ? ' · gelesen' : ' · ungelesen'}</small></button>`;
  }).join("");
  const detail = selected ? `<article class="newsDetail ${!selected.read ? 'unread' : ''}"><div class="newsDetailHeader"><div><p class="eyebrow">${hfmV68CategoryLabel(selected.category)} · ${hfmV68PriorityLabel(selected.priority)}</p><h2>${hfmV68NewsTitle(selected)}</h2></div>${!selected.read ? '<span class="unreadPill">Ungelesen</span>' : ''}${selected.requires_action && !selected.resolved ? '<span class="requiredBadge">Aktion</span>' : ''}</div><p class="hint">${selected.timestamp} · Absender: ${hfmV68Html(selected.sender_id)}</p><div class="infoBox newsBody">${hfmV68NewsBody(selected)}</div>${hfmV68NewsActionButtons(selected)}<div class="modalActions"><button class="ghost full" onclick="hfmV68GoFromNews('team','lineup')">Zur Aufstellung</button><button class="ghost full" onclick="hfmV68GoFromNews('market')">Zum Markt</button></div></article>` : `<article class="newsDetail"><h2>Keine Nachrichten</h2><div class="infoBox">Aktuell gibt es in diesem Filter keine Meldungen.</div></article>`;
  return `<section class="panel newsCenterPanel"><p class="eyebrow">Newscenter</p><h2>Posteingang & Welt-News</h2><div class="grid compact newsSummaryGrid">${card('📰', 'Ungelesen', `${unread}`, 'neue Meldungen')}${card('📥', 'Inbox', `${unreadInbox}`, 'direkt dein Verein')}${card('🌍', 'Welt-News', `${unreadWorld}`, 'wichtige KI-Welt')}${card('⚠️', 'Entscheidungen', `${actions}`, 'blockieren ggf. den Kalender')}</div><div class="chips newsTabs">${chip('inbox','Inbox', unreadInbox)}${chip('world','Welt-News', unreadWorld)}${chip('unread','Ungelesen', unread)}${chip('action','Aktionen', actions)}${chip('all','Alle')}</div><div class="newsToolbar"><button class="ghost" onclick="hfmV68MarkAllNewsRead()">Alle als gelesen markieren</button></div><div class="newsLayout"><div class="newsList">${rows || '<div class="infoBox">Keine Nachrichten in diesem Bereich.</div>'}</div>${detail}</div></section>`;
}
function hfmV68StopForBlockingNews(news) {
  state.tab = "news";
  state.newsFilter = "action";
  state.newsSelectedId = news.id;
  alert("Im Newscenter wartet eine wichtige Entscheidung. Bitte zuerst bearbeiten.");
  render();
}
function hfmV68GenerateMatchNews(match) {
  if (!match || match.newsGeneratedV68) return;
  const goals = typeof hfmV64MatchScore === "function" ? hfmV64MatchScore(match) : { own: match.score?.ownGoals || 0, opp: match.score?.oppGoals || 0 };
  const resultWord = goals.own > goals.opp ? "gewinnt" : goals.own === goals.opp ? "spielt remis" : "verliert";
  const summary = goals.own > goals.opp ? "Die Mannschaft nimmt positive Stimmung aus dem Spiel mit." : goals.own === goals.opp ? "Ein ausgeglichenes Spiel mit gemischten Reaktionen." : "Die Niederlage erzeugt Druck auf Training, Taktik und Moral.";
  hfmV68AddNews({ category: "MATCH", priority: goals.own < goals.opp ? 2 : 3, scope: "inbox", sender_id: "match_engine", uniqueKey: `match-${seasonLabel()}-${state.week}-${match.opponent}-${goals.own}-${goals.opp}`, title_template: "MATCH_RESULT_TITLE", body_template: "MATCH_RESULT_BODY", data: { CLUB_NAME: ownClubName(), RESULT_WORD: resultWord, OPPONENT: match.opponent, SCORE: `${goals.own}:${goals.opp}`, SUMMARY: summary } });
  match.newsGeneratedV68 = true;
}
function hfmV68GenerateAiTransferNews(log) {
  if (!log) return;
  const fee = Number(log.fee || 0);
  if (fee < 250000 && Number(log.avgRating10 || 0) < 7.1) return;
  hfmV68AddNews({ category: "TRANSFER", priority: fee >= 3000000 ? 2 : 3, scope: "world", sender_id: "transfer_wire", uniqueKey: `ai-transfer-${log.id}`, title_template: "AI_TRANSFER_TITLE", body_template: "AI_TRANSFER_BODY", data: { PLAYER_NAME: log.player, BUYER: log.buyer, SELLER: log.seller, FEE: euro(fee), REASON: log.reason || "Kaderbedarf" } });
}
function hfmV68EstimatedPlayerValue(player) {
  const strength = Number(player?.strength || 50);
  const talent = Number(player?.talent || 3);
  const age = Number(player?.age || 25);
  return Number(player?.marketValue || Math.round((strength * strength * 950 + talent * 85000 + Math.max(0, 26 - age) * 42000) / 10000) * 10000);
}
function hfmV68MaybeGenerateTransferOffer() {
  if (!state.gameStarted || hfmV68BlockingNews()) return;
  const date = currentGameDate();
  const month = date.getMonth();
  if (![0, 5, 6, 7].includes(month)) return;
  if (state.lastTransferOfferWeekV68 === state.week || state.week % 4 !== 0) return;
  const candidates = (state.players || []).filter(p => p.loan !== "verliehen" && Number(p.age || 25) <= 30 && Number(p.strength || 0) >= 58);
  if (!candidates.length) return;
  const player = candidates.sort((a, b) => (hfmV68EstimatedPlayerValue(b) + Number(b.strength || 0) * 10000) - (hfmV68EstimatedPlayerValue(a) + Number(a.strength || 0) * 10000))[0];
  const buyerLeague = Number(state.startLeagueIndex || 10) === 3 ? 0 : 3;
  const buyer = (makeLeagueClubs(buyerLeague) || [])[stableHash(`${player.id}-${state.week}`) % makeLeagueClubs(buyerLeague).length] || "Bayer 04 Leverkusen";
  const feeValue = Math.round(hfmV68EstimatedPlayerValue(player) * 1.08 / 10000) * 10000;
  hfmV68AddNews({ category: "TRANSFER", priority: 1, scope: "inbox", sender_id: buyer, subject_ids: [player.id, buyer], requires_action: true, action_type: "TRANSFER_OFFER", uniqueKey: `offer-${seasonLabel()}-${state.week}-${player.id}`, title_template: "TRANSFER_OFFER_TITLE", body_template: "TRANSFER_OFFER_BODY", data: { PLAYER_ID: player.id, PLAYER_NAME: player.name, BUYER: buyer, FEE: euro(feeValue), FEE_VALUE: feeValue } });
  state.lastTransferOfferWeekV68 = state.week;
}

const hfmV68DashboardBase = dashboard;
dashboard = function() {
  hfmV68EnsureNewsState();
  const row = CURRENT_TABLE.find(r => r.own) || CURRENT_TABLE.find(r => r.club === ownClubName()) || { pos: "-", points: 0 };
  const unread = hfmV68NewsUnreadCount();
  const actions = hfmV68ActionNews().length;
  const latest = state.newsItems[0] ? hfmV68NewsTitle(state.newsItems[0]).replace(/<[^>]+>/g, "") : "keine neuen Meldungen";
  return `<section class="grid">
    ${card('💶', 'Finanzen', euro(state.money), state.sponsor ? `Sponsor: ${state.sponsor.name}` : 'Sponsor noch wählen', "goTo('club','finances')")}
    ${card('📰', 'Newscenter', unread ? `${unread} ungelesen` : 'Alles gelesen', actions ? `${actions} Entscheidung(en) offen` : latest, "setTab('news')")}
    ${card('📅', 'Nächstes Spiel', `${ownClubName()} - ${currentOpponentName()}`, `${formatGermanDate(nextMatchDate())} · Heimspiel`, "goTo('season','schedule')")}
    ${card('📆', 'Aktuelles Datum', formatGermanDate(currentGameDate()), 'heutiger Spieltag im Kalender', "goTo('season','calendar')")}
    ${card('🏆', 'Tabelle', `Platz ${row.pos}`, `${row.points || 0} Punkte`, "goTo('season','table')")}
    ${card('⚽', 'Aufstellung', `${state.formation} · Ø ${lineupStrength()}`, `${lineupPenaltyCount()} Positionsprobleme`, "goTo('team','lineup')")}
  </section>`;
};

const hfmV68NavButtonBase = navButton;
navButton = function(id, icon, label) {
  const unread = id === "news" ? hfmV68NewsUnreadCount() : 0;
  const actionCount = id === "news" ? hfmV68ActionNews().length : 0;
  const badge = unread ? `<em class="navBadge ${actionCount ? 'urgent' : ''}">${unread > 9 ? '9+' : unread}</em>` : "";
  return `<button class="${state.tab === id ? 'active' : ''}" onclick="setTab('${id}')"><b>${icon}</b><span>${label}</span>${badge}</button>`;
};

const hfmV68SetHalftimeBase = setHalftimeEditSection;
setHalftimeEditSection = function(section) {
  const allowed = ["report", "formation", "tactic"];
  state.halftimeEditSection = allowed.includes(section) ? section : "report";
  render();
};

halftimeEditTabs = function() {
  const current = ["report", "formation", "tactic"].includes(state.halftimeEditSection) ? state.halftimeEditSection : "report";
  return `<div class="chips halftimeTabs"><button class="chip ${current === 'report' ? 'selected' : ''}" onclick="setHalftimeEditSection('report')">Spielbericht</button><button class="chip ${current === 'formation' ? 'selected' : ''}" onclick="setHalftimeEditSection('formation')">Formation</button><button class="chip ${current === 'tactic' ? 'selected' : ''}" onclick="setHalftimeEditSection('tactic')">Taktik</button></div>`;
};

halftimeChangeScreen = function() {
  const current = ["report", "formation", "tactic"].includes(state.halftimeEditSection) ? state.halftimeEditSection : "report";
  const m = state.activeMatch;
  if (current === "report") return `<h3>Halbzeit-Menü</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Spielbericht</h3>${m ? matchStatRows(m.halftimeStats) : ""}${matchStatusOverview()}<h3>Wichtige Ereignisse</h3>${importantEventList(m?.log || [])}</div>`;
  if (current === "tactic") return `<h3>Halbzeit-Menü</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Taktik ändern</h3><div class="infoBox">Hier ist bewusst nur die Taktik sichtbar. Der Spielbericht bleibt im eigenen Punkt links daneben.</div>${tacticsView()}</div>`;
  return `<h3>Halbzeit-Menü</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Formation ändern</h3><div class="infoBox">Hier ist bewusst nur die Formation mit Wechseln sichtbar. Der Spielbericht bleibt im eigenen Punkt links daneben.</div><div class="chips">${formationButtonsForMatch()}</div>${halftimeFormationPitch()}<h3>Wechsel</h3><div class="subGrid">${halftimeSubControls()}</div></div>`;
};

halftimeScreen = function() {
  const m = state.activeMatch;
  if (!m) return `<section class="panel"><h2>Keine Halbzeitdaten</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  if (!["report", "formation", "tactic"].includes(state.halftimeEditSection)) state.halftimeEditSection = "report";
  const liveScore = `${m.liveScore?.own || 0}:${m.liveScore?.opp || 0}`;
  return `<div class="halftimeWindowBackdrop"><section class="panel matchPanel halftimeWindow"><div class="modalHeader"><div><p class="eyebrow">Halbzeitpause</p><h2>${ownClubName()} - ${m.opponent}</h2></div><span class="requiredBadge">Eigener Screen</span></div><div class="scoreBoard"><b>${liveScore}</b><span>45. Minute</span></div>${halftimeChangeScreen()}</section></div>`;
};

const hfmV68FinishCurrentLiveHalfSafelyBase = typeof finishCurrentLiveHalfSafely === "function" ? finishCurrentLiveHalfSafely : null;
if (hfmV68FinishCurrentLiveHalfSafelyBase) {
  finishCurrentLiveHalfSafely = function(reason) {
    const result = hfmV68FinishCurrentLiveHalfSafelyBase(reason);
    if (state.activeMatch?.phase === "halftime") {
      state.halftimeEditSection = "report";
      render();
    }
    return result;
  };
}
const hfmV68RunHalfInstantBase = typeof runHalfInstant === "function" ? runHalfInstant : null;
if (hfmV68RunHalfInstantBase) {
  runHalfInstant = function(half) {
    const result = hfmV68RunHalfInstantBase(half);
    if (half === 1 && state.activeMatch?.phase === "halftime") {
      state.halftimeEditSection = "report";
      render();
    }
    return result;
  };
}

const hfmV68FinishActiveMatchBase = finishActiveMatch;
finishActiveMatch = function() {
  const m = state.activeMatch;
  const result = hfmV68FinishActiveMatchBase();
  if (m && m.finishedApplied) hfmV68GenerateMatchNews(m);
  return result;
};

if (typeof hfmV65CommitTransfer === "function") {
  const hfmV68AiCommitBase = hfmV65CommitTransfer;
  hfmV65CommitTransfer = function(plan, interest) {
    const log = hfmV68AiCommitBase(plan, interest);
    hfmV68GenerateAiTransferNews(log);
    return log;
  };
}

const hfmV68HeaderActionBase = headerAction;
headerAction = function() {
  hfmV68EnsureNewsState();
  const blocker = hfmV68BlockingNews();
  if (blocker) return hfmV68StopForBlockingNews(blocker);
  return hfmV68HeaderActionBase();
};

const hfmV68NextWeekBase = nextWeek;
nextWeek = function() {
  hfmV68EnsureNewsState();
  const blocker = hfmV68BlockingNews();
  if (blocker) return hfmV68StopForBlockingNews(blocker);
  const beforeWeek = state.week;
  const beforeNews = state.newsItems.length;
  const result = hfmV68NextWeekBase();
  if (state.gameStarted && state.week !== beforeWeek) {
    hfmV68MaybeGenerateTransferOffer();
    if ((state.week || 0) % 4 === 0) {
      hfmV68AddNews({ category: "FINANCE", priority: 3, scope: "inbox", sender_id: "finance", uniqueKey: `finance-${seasonLabel()}-${state.week}`, title_template: "FINANCE_TITLE", body_template: "FINANCE_BODY", data: { MONEY: euro(state.money || 0) } });
    }
  }
  if (state.newsItems.length !== beforeNews) render();
  return result;
};

const hfmV68StartGameBase = startGame;
startGame = function() {
  hfmV68NormalizeStartSetup();
  const result = hfmV68StartGameBase();
  if (state.gameStarted) {
    hfmV68ApplyCurrentLeagueTable(true);
    hfmV68SeedInitialNews();
    render();
  }
  return result;
};

const hfmV68LoadGameBase = loadGame;
loadGame = function() {
  const result = hfmV68LoadGameBase();
  hfmV68ApplyRealLeagueNames();
  hfmV68EnsureNewsState();
  if (state.gameStarted) {
    hfmV68ApplyCurrentLeagueTable(false);
    hfmV68SeedInitialNews();
  }
  render();
  return result;
};

const hfmV68RenderBase = render;
render = function() {
  hfmV68ApplyRealLeagueNames();
  hfmV68EnsureNewsState();
  hfmV68NormalizeStartSetup();
  if (state.gameStarted) {
    hfmV68ApplyCurrentLeagueTable(false);
    hfmV68SeedInitialNews();
  }
  initV36Features();
  ensureTrainingLevelUpQueue();
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); return; }
  if (state.activeMatch?.phase === 'halftime' && state.tab !== 'matchHalftime') state.tab = 'matchHalftime';
  if (state.activeMatch?.phase === 'finished' && state.tab !== 'matchEnd') state.tab = 'matchEnd';
  const content = state.tab === 'dashboard' ? dashboard()
    : state.tab === 'news' ? newscenter()
      : state.tab === 'team' ? team()
        : state.tab === 'market' ? market()
          : state.tab === 'scouting' ? scouting()
            : state.tab === 'club' ? club()
              : state.tab === 'environment' ? environment()
                : state.tab === 'match' ? matchScreen()
                  : state.tab === 'matchHalftime' ? halftimeScreen()
                    : state.tab === 'matchEnd' ? matchEndScreen()
                      : state.tab === 'options' ? optionsView()
                        : season();
  const matchTheme = isMatchTabForTheme();
  const isLiveSimulation = state.activeMatch?.phase === 'live';
  const unread = hfmV68NewsUnreadCount();
  const actionNews = hfmV68ActionNews().length;
  const newsLine = unread ? `<br>News: <b>${unread} ungelesen${actionNews ? ` · ${actionNews} offen` : ''}</b>` : '';
  document.getElementById('app').innerHTML = `<div class="appShell ${matchTheme ? 'matchdayShell' : ''} ${isLiveSimulation ? 'liveSimulationShell' : ''}">
    <header class="hero ${matchTheme ? 'matchHero' : ''}">
      <div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b>${newsLine}</p></div>
      <button class="primary" onclick="headerAction()">${headerActionLabel()}</button>
    </header>
    <main class="${isLiveSimulation ? 'noPageTransition' : 'pageTransition'} ${matchTheme ? 'matchMain' : ''} ${isLiveSimulation ? 'liveSimulationMain' : ''}">${content}</main>
    <nav class="bottomNav">
      ${navButton('dashboard', '⌂', 'Home')}
      ${navButton('news', '📰', 'Newscenter')}
      ${navButton('team', '⚽', 'Team')}
      ${navButton('market', '↔', 'Markt')}
      ${navButton('scouting', '🔭', 'Scouting')}
      ${navButton('club', '▣', 'Verein')}
      ${navButton('environment', '🏟️', 'Stadion')}
      ${navButton('season', '🏆', 'Saison')}
      ${navButton('options', '⚙️', 'Optionen')}
    </nav>
    ${seasonEndModal()}
    ${seasonStartModal()}
    ${sponsorModal()}
    ${trainingLevelUpModal()}
    ${matchDayModal()}
    ${postMatchWindowModal()}
    ${youthDiscoveryModal()}
    ${playerProfileModal()}
  </div>`;
};


hfmV68ApplyRealLeagueNames();
hfmV68NormalizeStartSetup();
hfmV68EnsureNewsState();
if (state.gameStarted) {
  hfmV68ApplyCurrentLeagueTable(false);
  hfmV68SeedInitialNews();
}
render();

/* Version 70: Wochensimulation mit Kalenderfenster und Priority-Interrupt-News */
Object.assign(HFM_V68_NEWS_TEMPLATES, {
  INJURY_CRITICAL_TITLE: "Schwere Trainingsverletzung: {PLAYER_NAME}",
  INJURY_CRITICAL_BODY: "{PLAYER_NAME} hat sich im Training verletzt ({INJURY_NAME}, ca. {DAYS} Tage Ausfall). Die Wochensimulation wurde angehalten, damit du Aufstellung, Training oder Transferplanung anpassen kannst.",
  FINANCE_ULTIMATUM_TITLE: "Vorstand fordert Finanzreaktion",
  FINANCE_ULTIMATUM_BODY: "Der Kontostand liegt bei {MONEY}. Der Vorstand verlangt eine sofortige Reaktion, bevor die Kalender-Simulation weiterlaufen kann.",
  PREMATCH_TRAINING_TITLE: "Co-Trainer warnt vor dem Spiel",
  PREMATCH_TRAINING_BODY: "{PLAYER_NAME} wirkt vor dem nächsten Spiel angeschlagen. Fitness: {FITNESS}. Die Meldung wurde als Info im Newscenter abgelegt; die Wochensimulation laeuft weiter.",
  SCOUTING_INTERRUPT_TITLE: "Scoutingbericht bereit",
  SCOUTING_INTERRUPT_BODY: "Der Scout meldet einen wichtigen Bericht zu {TARGET}. Das Spiel stoppt kurz, damit du den Bericht vor der KI-Konkurrenz prüfen kannst.",
  CONTRACT_DEADLINE_TITLE: "Berater fordert Entscheidung: {PLAYER_NAME}",
  CONTRACT_DEADLINE_BODY: "Der Berater von {PLAYER_NAME} erwartet eine Entscheidung zur Vertragszukunft. Vertrag: {CONTRACT}. Zufriedenheit: {SATISFACTION}. Die Simulation wurde gestoppt, damit du die Verhandlung nicht verpasst.",
  MONTHLY_FINANCE_TITLE: "Monatsblick Finanzen",
  MONTHLY_FINANCE_BODY: "Monatswechsel im Kalender. Aktueller Kontostand: {MONEY}. Sponsoren, Gehälter, Ausbaukosten und Transferbudget wurden im Newscenter protokolliert."
});

var hfmV70WeekTimer = null;

function hfmV70EnsureState() {
  hfmV68EnsureNewsState();
  if (!state.weekSimulationSettings || typeof state.weekSimulationSettings !== "object") {
    state.weekSimulationSettings = { stopForSoftInterrupts: true };
  }
  if (state.weekSimulation && typeof state.weekSimulation !== "object") state.weekSimulation = null;
}

function hfmV70AddDays(date, amount) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + Number(amount || 0));
  return d;
}

function hfmV70Iso(date) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function hfmV70DateFromIso(iso) {
  const parts = String(iso || "").split("-").map(Number);
  return new Date(parts[0] || 2026, (parts[1] || 1) - 1, parts[2] || 1);
}

function hfmV70DayShort(date) {
  return ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][date.getDay()];
}

function hfmV70DayLong(date) {
  return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][date.getDay()];
}

function hfmV70MonthShort(date) {
  return ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"][date.getMonth()];
}

function hfmV70Plain(value) {
  return String(value ?? "").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#039;/g, "'");
}

function hfmV70SimulationSpeed() {
  const setting = state.options?.calendarSimulationSpeed || state.options?.simulationSpeed || "normal";
  if (setting === "fast") return 260;
  if (setting === "instant") return 120;
  if (setting === "slow") return 720;
  return 460;
}

function hfmV70DaysToNextCalendarWeek() {
  return Math.max(1, 7 - Number(state.dayOffset || 0));
}

function hfmV70DaysToMatchWeek() {
  const today = currentGameDate();
  const matchDate = nextMatchDate();
  let target = isoWeekStart(matchDate);
  let diff = daysBetweenDates(today, target);
  if (diff <= 0) diff = Math.max(1, daysBetweenDates(today, matchDate));
  return Math.max(1, diff);
}

function hfmV70BuildSimulationDays(count) {
  const start = currentGameDate();
  const days = [];
  for (let i = 1; i <= count; i++) {
    const d = hfmV70AddDays(start, i);
    days.push({
      iso: hfmV70Iso(d),
      day: hfmV70DayShort(d),
      longDay: hfmV70DayLong(d),
      date: String(d.getDate()).padStart(2, "0"),
      month: hfmV70MonthShort(d),
      label: `${hfmV70DayLong(d)}, ${formatGermanDate(d)}`,
      events: []
    });
  }
  return days;
}

function hfmV70WeekStatusText() {
  const sim = state.weekSimulation;
  if (!sim) return "";
  if (sim.paused) return "Angehalten";
  if (sim.finalizing) return "Woche wird abgeschlossen";
  return "Läuft";
}

function hfmV70CurrentInterruptNews() {
  const sim = state.weekSimulation;
  if (!sim?.interruptNewsId) return null;
  return (state.newsItems || []).find(n => n.id === sim.interruptNewsId) || null;
}

function hfmV70IsNewsStillOpen(news) {
  return !!(news && news.requires_action && !news.resolved);
}

function hfmV70ScheduleWeekTick(delay) {
  window.clearTimeout(hfmV70WeekTimer);
  const sim = state.weekSimulation;
  if (!sim?.active || sim.paused || sim.hidden) return;
  hfmV70WeekTimer = window.setTimeout(hfmV70WeekTick, delay ?? hfmV70SimulationSpeed());
}

function hfmV70BeginWeekSimulation(mode = "week") {
  hfmV70EnsureState();
  if (!state.gameStarted) return;
  if (state.weekSimulation?.active) return;
  const blocker = hfmV68BlockingNews();
  if (blocker) { hfmV70OpenBlockingNews(blocker); return; }
  const daysCount = mode === "advance" ? hfmV70DaysToMatchWeek() : hfmV70DaysToNextCalendarWeek();
  const days = hfmV70BuildSimulationDays(daysCount);
  state.weekSimulation = {
    active: true,
    paused: false,
    hidden: false,
    finalizing: false,
    mode,
    startedWeek: state.week,
    startedDayOffset: Number(state.dayOffset || 0),
    startedDate: hfmV70Iso(currentGameDate()),
    currentIndex: -1,
    progress: 0,
    days,
    log: [],
    interruptNewsId: null,
    message: mode === "advance" ? "Der Kalender läuft bis zum nächsten Spieltermin." : "Die neue Kalenderwoche wird Tag für Tag berechnet."
  };
  render();
  hfmV70ScheduleWeekTick(320);
}

function hfmV70PushSimulationLog(text) {
  const sim = state.weekSimulation;
  if (!sim) return;
  sim.log = sim.log || [];
  sim.log.unshift(text);
  sim.log = sim.log.slice(0, 8);
}

function hfmV70RoutineDayText(day, index) {
  const variants = [
    "Training und Regeneration verarbeitet.",
    "Kaderstatus, Fitness und Moral geprüft.",
    "Scouting, Markt und Vereinsumfeld aktualisiert.",
    "Keine kritischen Ereignisse gemeldet."
  ];
  return variants[(stableHash(`${day.iso}-${index}-${ownClubName()}`) % variants.length)];
}

function hfmV70MaybeFinanceUltimatum(day) {
  const money = Number(state.money || 0);
  if (money >= -100000) return null;
  const key = `finance-ultimatum-${seasonLabel()}-${state.week}`;
  if (state.lastFinanceUltimatumKeyV70 === key) return null;
  state.lastFinanceUltimatumKeyV70 = key;
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "FINANCE",
    priority: 1,
    scope: "inbox",
    sender_id: "board",
    subject_ids: [ownClubName()],
    requires_action: true,
    action_type: "FINANCE_ULTIMATUM",
    uniqueKey: key,
    title_template: "FINANCE_ULTIMATUM_TITLE",
    body_template: "FINANCE_ULTIMATUM_BODY",
    data: { MONEY: euro(money) }
  });
}

function hfmV70TransferWindowOpen(date) {
  return [0, 5, 6, 7].includes(date.getMonth());
}

function hfmV70MaybeTransferOffer(day, index) {
  const date = hfmV70DateFromIso(day.iso);
  if (!hfmV70TransferWindowOpen(date)) return null;
  const key = `offer-v70-${seasonLabel()}-${state.week}`;
  if (state.lastTransferOfferKeyV70 === key || state.lastTransferOfferWeekV68 === state.week) return null;
  const seed = stableHash(`${key}-${day.iso}-${ownClubName()}`);
  const shouldOffer = (state.week % 4 === 0 && index >= 1) || (seed % 100 < 7);
  if (!shouldOffer) return null;
  const candidates = (state.players || [])
    .filter(p => p.loan !== "verliehen" && !p.injury && Number(p.age || 25) <= 30 && Number(p.strength || 0) >= 58)
    .sort((a, b) => (hfmV68EstimatedPlayerValue(b) + Number(b.strength || 0) * 10000) - (hfmV68EstimatedPlayerValue(a) + Number(a.strength || 0) * 10000));
  if (!candidates.length) return null;
  const player = candidates[seed % candidates.length];
  const buyerLeague = Number(state.startLeagueIndex || 10) === 3 ? 0 : 3;
  const buyers = makeLeagueClubs(buyerLeague) || [];
  const buyer = buyers[(seed + 7) % Math.max(1, buyers.length)] || "Bayer 04 Leverkusen";
  const feeValue = Math.round(hfmV68EstimatedPlayerValue(player) * (1.05 + (seed % 18) / 100) / 10000) * 10000;
  state.lastTransferOfferKeyV70 = key;
  state.lastTransferOfferWeekV68 = state.week;
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "TRANSFER",
    priority: 1,
    scope: "inbox",
    sender_id: buyer,
    subject_ids: [player.id, buyer],
    requires_action: true,
    action_type: "TRANSFER_OFFER",
    uniqueKey: key,
    title_template: "TRANSFER_OFFER_TITLE",
    body_template: "TRANSFER_OFFER_BODY",
    data: { PLAYER_ID: player.id, PLAYER_NAME: player.name, BUYER: buyer, FEE: euro(feeValue), FEE_VALUE: feeValue }
  });
}

function hfmV70TrainingInjuryPool() {
  const lineupIds = new Set(Object.values(state.lineup || {}).filter(Boolean).map(String));
  const base = (state.players || []).filter(p => !p.injury && p.loan !== "verliehen");
  return base.sort((a, b) => {
    const aKey = (lineupIds.has(String(a.id)) ? 30 : 0) + Number(a.strength || 0) + Number(a.minutes || 0) / 10;
    const bKey = (lineupIds.has(String(b.id)) ? 30 : 0) + Number(b.strength || 0) + Number(b.minutes || 0) / 10;
    return bKey - aKey;
  });
}

function hfmV70MaybeTrainingInjury(day, index) {
  const key = `training-injury-${seasonLabel()}-${state.week}`;
  if (state.lastTrainingInjuryKeyV70 === key) return null;
  const seed = stableHash(`${key}-${day.iso}-${state.trainingFocus}-${ownClubName()}`);
  const intense = ["Fitness", "Taktik", "Angriff"].includes(state.trainingFocus);
  const shouldInjure = (state.week % 10 === 0 && index === 2) || (intense && seed % 100 < 5) || (seed % 100 < 2);
  if (!shouldInjure) return null;
  const pool = hfmV70TrainingInjuryPool();
  if (!pool.length) return null;
  const player = pool[seed % Math.min(5, pool.length)];
  const injuries = [
    { name: "Muskelfaserriss", days: 35 },
    { name: "Bänderverletzung", days: 49 },
    { name: "Knieprellung", days: 24 },
    { name: "Sehnenreizung", days: 30 }
  ];
  const injury = injuries[seed % injuries.length];
  player.injury = { name: injury.name, days: injury.days, cause: "Training", sinceWeek: state.week };
  player.fitness = Math.max(35, Number(player.fitness || 100) - 25);
  state.lastTrainingInjuryKeyV70 = key;
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "INJURY",
    priority: 1,
    scope: "inbox",
    sender_id: "medical_department",
    subject_ids: [player.id],
    requires_action: true,
    action_type: "INJURY_RESPONSE",
    uniqueKey: key,
    title_template: "INJURY_CRITICAL_TITLE",
    body_template: "INJURY_CRITICAL_BODY",
    data: { PLAYER_ID: player.id, PLAYER_NAME: player.name, INJURY_NAME: injury.name, DAYS: injury.days }
  });
}

function hfmV70MaybeContractDeadline(day, index) {
  const date = hfmV70DateFromIso(day.iso);
  if (![1, 3, 5].includes(date.getDay())) return null;
  const key = `contract-deadline-${seasonLabel()}-${state.week}`;
  if (state.lastContractDeadlineKeyV70 === key) return null;
  const candidates = (state.players || [])
    .filter(p => p.loan !== "verliehen" && !p.injury && Number(p.contractYears || 0) <= 1)
    .sort((a, b) => {
      const aScore = Number(a.strength || 0) + (100 - playerSatisfaction(a)) / 2 + Math.max(0, 25 - Number(a.age || 25));
      const bScore = Number(b.strength || 0) + (100 - playerSatisfaction(b)) / 2 + Math.max(0, 25 - Number(b.age || 25));
      return bScore - aScore;
    });
  if (!candidates.length) return null;
  const seed = stableHash(`${key}-${day.iso}-${ownClubName()}`);
  const shouldInterrupt = (state.week % 9 === 0 && index >= 2) || (seed % 100 < 6);
  if (!shouldInterrupt) return null;
  const player = candidates[seed % Math.min(4, candidates.length)];
  state.lastContractDeadlineKeyV70 = key;
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "CONTRACT",
    priority: 1,
    scope: "inbox",
    sender_id: "player_agent",
    subject_ids: [player.id],
    requires_action: true,
    action_type: "CONTRACT_DEADLINE",
    uniqueKey: key,
    title_template: "CONTRACT_DEADLINE_TITLE",
    body_template: "CONTRACT_DEADLINE_BODY",
    data: {
      PLAYER_ID: player.id,
      PLAYER_NAME: player.name,
      CONTRACT: `${Number(player.contractYears || 0)} Jahr(e)`,
      SATISFACTION: `${playerSatisfaction(player)}/100`
    }
  });
}

function hfmV70MaybeScoutingInterrupt(day, index) {
  if (!state.weekSimulationSettings?.stopForSoftInterrupts) return null;
  const jobs = state.scoutingJobs || [];
  const due = jobs.find(job => Number(job.remainingDays || 0) <= index + 1);
  if (!due) return null;
  const key = `scouting-soft-${seasonLabel()}-${state.week}-${due.key}`;
  if (state.lastScoutingSoftKeyV70 === key || (state.newsItems || []).some(n => n.uniqueKey === key)) return null;
  state.lastScoutingSoftKeyV70 = key;
  const target = due.clubName || LEAGUES[due.leagueIndex]?.league || "einem Zielspieler";
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "SCOUTING",
    priority: 2,
    scope: "inbox",
    sender_id: "chief_scout",
    subject_ids: [due.key],
    requires_action: true,
    action_type: "SCOUTING_REPORT",
    uniqueKey: key,
    title_template: "SCOUTING_INTERRUPT_TITLE",
    body_template: "SCOUTING_INTERRUPT_BODY",
    data: { TARGET: target }
  });
}

function hfmV70MaybePrematchTrainingWarning(day) {
  if (!state.weekSimulationSettings?.stopForSoftInterrupts) return null;
  const date = hfmV70DateFromIso(day.iso);
  if (date.getDay() !== 5) return null;
  const key = `prematch-training-${seasonLabel()}-${state.week}`;
  if (state.lastPrematchTrainingWarningKeyV70 === key) return null;
  const seed = stableHash(`${key}-${ownClubName()}-${state.trainingFocus}`);
  const shouldWarn = (state.week % 3 === 0) || (seed % 100 < 28);
  if (!shouldWarn) return null;
  const candidates = (state.players || []).filter(p => !p.injury && p.loan !== "verliehen");
  if (!candidates.length) return null;
  const player = candidates.sort((a, b) => {
    const af = Number(a.fitness ?? 100) - Number(a.minutes || 0) / 2 - Number(a.strength || 0) / 5;
    const bf = Number(b.fitness ?? 100) - Number(b.minutes || 0) / 2 - Number(b.strength || 0) / 5;
    return af - bf;
  })[0];
  const fitness = Math.max(42, Math.round(Number(player.fitness ?? 100) - 8 - (seed % 15)));
  player.fitness = Math.min(Number(player.fitness ?? 100), fitness);
  state.lastPrematchTrainingWarningKeyV70 = key;
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "MATCH",
    priority: 2,
    scope: "inbox",
    sender_id: "assistant_coach",
    subject_ids: [player.id],
    requires_action: true,
    action_type: "PREMATCH_TRAINING",
    uniqueKey: key,
    title_template: "PREMATCH_TRAINING_TITLE",
    body_template: "PREMATCH_TRAINING_BODY",
    data: { PLAYER_ID: player.id, PLAYER_NAME: player.name, FITNESS: `${fitness}%` }
  });
}

function hfmV70MaybeMonthlyFinanceNews(day) {
  const date = hfmV70DateFromIso(day.iso);
  if (date.getDate() !== 1) return null;
  const key = `monthly-finance-${seasonLabel()}-${date.getFullYear()}-${date.getMonth()}`;
  if ((state.newsItems || []).some(n => n.uniqueKey === key)) return null;
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "FINANCE",
    priority: 3,
    scope: "inbox",
    sender_id: "finance",
    uniqueKey: key,
    title_template: "MONTHLY_FINANCE_TITLE",
    body_template: "MONTHLY_FINANCE_BODY",
    data: { MONEY: euro(Number(state.money || 0)) }
  });
}

function hfmV70GenerateDailyEvents(day, index) {
  const hardExisting = hfmV68BlockingNews();
  if (hardExisting) return hardExisting;
  const finance = hfmV70MaybeFinanceUltimatum(day, index);
  if (finance) return finance;
  const transfer = hfmV70MaybeTransferOffer(day, index);
  if (transfer) return transfer;
  const injury = hfmV70MaybeTrainingInjury(day, index);
  if (injury) return injury;
  const contract = hfmV70MaybeContractDeadline(day, index);
  if (contract) return contract;
  const scouting = hfmV70MaybeScoutingInterrupt(day, index);
  if (scouting) return scouting;
  const training = hfmV70MaybePrematchTrainingWarning(day, index);
  if (training) return training;
  const financeInfo = hfmV70MaybeMonthlyFinanceNews(day);
  if (financeInfo) day.events.push("Finanzbericht im Newscenter abgelegt.");
  return null;
}

function hfmV70PauseForInterrupt(news) {
  const sim = state.weekSimulation;
  if (!sim) return;
  sim.paused = true;
  sim.hidden = false;
  sim.interruptNewsId = news?.id || null;
  sim.message = news ? `Simulation angehalten: ${hfmV70Plain(hfmV68NewsTitle(news))}` : "Simulation angehalten.";
  if (news) {
    news.read = false;
    const currentDay = sim.days[sim.currentIndex];
    if (currentDay) currentDay.events.push(hfmV70Plain(hfmV68NewsTitle(news)));
    hfmV70PushSimulationLog(`Stop: ${hfmV70Plain(hfmV68NewsTitle(news))}`);
  }
  window.clearTimeout(hfmV70WeekTimer);
  render();
}

function hfmV70WeekTick() {
  const sim = state.weekSimulation;
  if (!sim?.active || sim.paused || sim.hidden) return;
  const blocker = hfmV68BlockingNews();
  if (blocker) { hfmV70PauseForInterrupt(blocker); return; }
  const nextIndex = Number(sim.currentIndex ?? -1) + 1;
  if (nextIndex >= (sim.days || []).length) { hfmV70FinishWeekSimulation(); return; }
  sim.currentIndex = nextIndex;
  sim.progress = Math.round(((nextIndex + 1) / Math.max(1, sim.days.length)) * 100);
  const day = sim.days[nextIndex];
  sim.message = `${day.label} wird berechnet...`;
  const interrupt = hfmV70GenerateDailyEvents(day, nextIndex);
  if (interrupt) { hfmV70PauseForInterrupt(interrupt); return; }
  if (!day.events.length) day.events.push(hfmV70RoutineDayText(day, nextIndex));
  hfmV70PushSimulationLog(`${day.day}, ${day.date}. ${day.month}: ${day.events[day.events.length - 1]}`);
  render();
  hfmV70ScheduleWeekTick();
}

function hfmV70FinishWeekSimulation() {
  const sim = state.weekSimulation;
  if (!sim?.active) return;
  window.clearTimeout(hfmV70WeekTimer);
  sim.finalizing = true;
  sim.paused = false;
  sim.progress = 100;
  sim.message = sim.mode === "advance" ? "Kalenderposition wird gesetzt..." : "Wochenabschluss wird verbucht...";
  render();
  window.setTimeout(() => {
    const stored = state.weekSimulation;
    if (!stored?.active) return;
    const mode = stored.mode;
    const beforeWeek = state.week;
    state.weekSimulation = null;
    if (mode === "advance") {
      hfmV70AdvanceToNextCalendarWeekBase();
    } else {
      if (typeof hfmV68NextWeekBase === "function") hfmV68NextWeekBase();
      else hfmV70ImmediateNextWeekBase();
      if (state.gameStarted && state.week !== beforeWeek && (state.week || 0) % 4 === 0) {
        hfmV68AddNews({
          category: "FINANCE",
          priority: 3,
          scope: "inbox",
          sender_id: "finance",
          uniqueKey: `finance-v70-${seasonLabel()}-${state.week}`,
          title_template: "FINANCE_TITLE",
          body_template: "FINANCE_BODY",
          data: { MONEY: euro(state.money || 0) }
        });
      }
    }
    render();
  }, 520);
}

function hfmV70ResumeWeekSimulation() {
  const sim = state.weekSimulation;
  if (!sim?.active) return;
  const news = hfmV70CurrentInterruptNews();
  if (hfmV70IsNewsStillOpen(news)) {
    hfmV70DecideLater(news.id);
    return;
  }
  sim.paused = false;
  sim.hidden = false;
  sim.interruptNewsId = null;
  sim.message = "Die Kalendersimulation wird fortgesetzt.";
  render();
  hfmV70ScheduleWeekTick(280);
}

function hfmV70DecideLater(id) {
  const news = (state.newsItems || []).find(n => n.id === id);
  if (news) {
    news.read = true;
    state.newsSelectedId = id;
    state.newsFilter = "action";
  }
  if (state.weekSimulation) {
    state.weekSimulation.paused = true;
    state.weekSimulation.hidden = true;
    state.weekSimulation.interruptNewsId = id;
  }
  state.tab = "news";
  render();
}

function hfmV70OpenBlockingNews(news) {
  if (!news) return;
  news.read = false;
  state.newsSelectedId = news.id;
  state.newsFilter = "action";
  state.tab = "news";
  state.newsInterruptModalIdV70 = news.id;
  render();
}

function hfmV70CloseCriticalNewsModal() {
  state.newsInterruptModalIdV70 = null;
  render();
}

function hfmV70HidePausedSimulation(id) {
  if (state.weekSimulation?.active) {
    state.weekSimulation.paused = true;
    state.weekSimulation.hidden = true;
    state.weekSimulation.interruptNewsId = id;
  }
}

function hfmV70ResolveUtilityNews(id, action) {
  const news = (state.newsItems || []).find(n => n.id === id);
  if (!news) return;
  news.read = true;
  if (action === "regeneration") state.trainingFocus = "Regeneration";
  if (action === "lineup") {
    news.resolved = true;
    news.requires_action = false;
    hfmV70HidePausedSimulation(id);
    state.tab = "team";
    state.teamSection = "lineup";
    render();
    return;
  }
  if (action === "market") {
    news.resolved = true;
    news.requires_action = false;
    hfmV70HidePausedSimulation(id);
    state.tab = "market";
    state.marketSection = "search";
    render();
    return;
  }
  if (action === "scouting") {
    news.resolved = true;
    news.requires_action = false;
    hfmV70HidePausedSimulation(id);
    state.tab = "scouting";
    state.scoutingSection = "reports";
    render();
    return;
  }
  if (action === "finances") {
    news.resolved = true;
    news.requires_action = false;
    hfmV70HidePausedSimulation(id);
    goTo("club", "finances");
    return;
  }
  if (action === "contracts") {
    news.resolved = true;
    news.requires_action = false;
    hfmV70HidePausedSimulation(id);
    goTo("team", "contracts");
    return;
  }
  news.resolved = true;
  news.requires_action = false;
  render();
}

const hfmV70NewsActionButtonsBase = hfmV68NewsActionButtons;
hfmV68NewsActionButtons = function(news) {
  if (!news?.requires_action || news.resolved) return "";
  if (news.action_type === "INJURY_RESPONSE") {
    return `<div class="modalActions newsActions"><button class="primary full" onclick="hfmV70ResolveUtilityNews('${news.id}','lineup')">Aufstellung prüfen</button><button class="ghost full" onclick="hfmV70ResolveUtilityNews('${news.id}','regeneration')">Training auf Regeneration</button><button class="ghost full" onclick="hfmV70ResolveUtilityNews('${news.id}','market')">Ersatz im Markt suchen</button></div>`;
  }
  if (news.action_type === "PREMATCH_TRAINING") {
    return `<div class="modalActions newsActions"><button class="primary full" onclick="hfmV70ResolveUtilityNews('${news.id}','lineup')">Startelf anpassen</button><button class="ghost full" onclick="hfmV70ResolveUtilityNews('${news.id}','regeneration')">Regeneration einstellen</button><button class="ghost full" onclick="hfmV70ResolveUtilityNews('${news.id}','ok')">Trotzdem weiter</button></div>`;
  }
  if (news.action_type === "SCOUTING_REPORT") {
    return `<div class="modalActions newsActions"><button class="primary full" onclick="hfmV70ResolveUtilityNews('${news.id}','scouting')">Zum Scoutingbericht</button><button class="ghost full" onclick="hfmV70ResolveUtilityNews('${news.id}','ok')">Gelesen</button></div>`;
  }
  if (news.action_type === "FINANCE_ULTIMATUM") {
    return `<div class="modalActions newsActions"><button class="primary full" onclick="hfmV70ResolveUtilityNews('${news.id}','finances')">Finanzen öffnen</button><button class="ghost full" onclick="hfmV70ResolveUtilityNews('${news.id}','market')">Spieler verkaufen prüfen</button></div>`;
  }
  if (news.action_type === "CONTRACT_DEADLINE") {
    return `<div class="modalActions newsActions"><button class="primary full" onclick="hfmV70ResolveUtilityNews('${news.id}','contracts')">Vertragsansicht öffnen</button><button class="ghost full" onclick="hfmV72OpenBudgetFromContractNews('${news.id}')">Budget prüfen</button></div>`;
  }
  return hfmV70NewsActionButtonsBase(news);
};

function hfmV70WeekSimulationModal() {
  const sim = state.weekSimulation;
  if (!sim?.active || sim.hidden) return "";
  const idx = Number(sim.currentIndex ?? -1);
  const currentDay = sim.days?.[Math.max(0, idx)] || sim.days?.[0];
  const news = hfmV70CurrentInterruptNews();
  const openNews = hfmV70IsNewsStillOpen(news);
  const dayCards = (sim.days || []).map((day, i) => {
    const cls = i < idx ? "done" : i === idx ? "current" : "pending";
    const eventLine = (day.events || []).slice(-1)[0] || (i < idx ? "berechnet" : "wartet");
    return `<div class="simCalendarDay ${cls}"><b>${day.day}</b><strong>${day.date}</strong><span>${day.month}</span><em>${hfmV68Html(eventLine)}</em></div>`;
  }).join("");
  let interruptBox = "";
  if (news) {
    interruptBox = `<div class="weekInterruptCard ${Number(news.priority) === 1 ? 'critical' : 'soft'}"><p class="eyebrow">${Number(news.priority) === 1 ? 'Kritischer Interrupt' : 'Soft-Interrupt'}</p><h3>${hfmV68NewsTitle(news)}</h3><div class="infoBox newsBody">${hfmV68NewsBody(news)}</div>${hfmV68NewsActionButtons(news)}<div class="modalActions"><button class="ghost full" onclick="hfmV70DecideLater('${news.id}')">Später im Newscenter entscheiden</button>${!openNews ? '<button class="primary full" onclick="hfmV70ResumeWeekSimulation()">Simulation fortsetzen</button>' : ''}</div></div>`;
  } else if (sim.paused) {
    interruptBox = `<div class="weekInterruptCard"><h3>Simulation angehalten</h3><div class="infoBox">Es gibt keine offene Pflichtnachricht mehr. Du kannst die Wochensimulation fortsetzen.</div><button class="primary full" onclick="hfmV70ResumeWeekSimulation()">Simulation fortsetzen</button></div>`;
  }
  return `<div class="modalBackdrop weekSimulationBackdrop" role="dialog" aria-modal="true"><div class="modalBox weekSimulationBox"><div class="modalHeader"><div><p class="eyebrow">${sim.mode === 'advance' ? 'Kalender' : 'Wochensimulation'} · ${hfmV70WeekStatusText()}</p><h2>${sim.mode === 'advance' ? 'Kalender läuft zum Spieltag' : 'Woche wird simuliert'}</h2></div><span class="requiredBadge">${Math.round(sim.progress || 0)}%</span></div><p class="modalIntro">${hfmV68Html(sim.message || '')}</p><div class="weekFlipFocus"><span>${currentDay ? currentDay.longDay : 'Kalender'}</span><strong>${currentDay ? `${currentDay.date}. ${currentDay.month}` : '--'}</strong><em>${currentDay ? currentDay.iso : ''}</em></div><div class="bar weekProgress"><div style="width:${Math.max(2, Number(sim.progress || 0))}%"></div></div><div class="simCalendarGrid">${dayCards}</div>${interruptBox}</div></div>`;
}

function hfmV70PausedBanner() {
  const sim = state.weekSimulation;
  if (!sim?.active || !sim.hidden) return "";
  const news = hfmV70CurrentInterruptNews();
  const stillOpen = hfmV70IsNewsStillOpen(news);
  return `<div class="simulationResumeBanner"><div><b>Kalendersimulation angehalten</b><span>${news ? hfmV70Plain(hfmV68NewsTitle(news)) : 'Offene Unterbrechung'}</span></div><div><button class="ghost" onclick="setTab('news')">Newscenter</button><button class="primary" ${stillOpen ? 'disabled' : ''} onclick="hfmV70ResumeWeekSimulation()">Fortsetzen</button></div></div>`;
}

function hfmV70CriticalNewsModal() {
  const id = state.newsInterruptModalIdV70;
  if (!id) return "";
  const news = (state.newsItems || []).find(n => n.id === id);
  if (!news || !hfmV70IsNewsStillOpen(news)) return "";
  return `<div class="modalBackdrop weekSimulationBackdrop" role="dialog" aria-modal="true"><div class="modalBox smallModal"><div class="modalHeader"><div><p class="eyebrow">Wichtige Nachricht</p><h2>${hfmV68NewsTitle(news)}</h2></div><span class="requiredBadge">Aktion</span></div><div class="infoBox newsBody">${hfmV68NewsBody(news)}</div>${hfmV68NewsActionButtons(news)}<div class="modalActions"><button class="ghost full" onclick="hfmV70CloseCriticalNewsModal()">Im Newscenter ansehen</button></div></div></div>`;
}

function hfmV70InjectWeekSimulationUi() {
  const app = document.getElementById("app");
  if (!app) return;
  const html = hfmV70WeekSimulationModal() + hfmV70CriticalNewsModal() + hfmV70PausedBanner();
  if (html) app.insertAdjacentHTML("beforeend", html);
}

const hfmV70HeaderActionLabelBase = headerActionLabel;
headerActionLabel = function() {
  const sim = state.weekSimulation;
  if (sim?.active) {
    if (sim.paused) {
      const news = hfmV70CurrentInterruptNews();
      return hfmV70IsNewsStillOpen(news) ? "News beantworten" : "Simulation fortsetzen";
    }
    return "Simulation läuft";
  }
  const blocker = hfmV68BlockingNews();
  if (blocker) return "News beantworten";
  return hfmV70HeaderActionLabelBase();
};

const hfmV70HeaderActionBase = headerAction;
headerAction = function() {
  hfmV70EnsureState();
  const sim = state.weekSimulation;
  if (sim?.active) {
    if (sim.paused) return hfmV70ResumeWeekSimulation();
    return;
  }
  const blocker = hfmV68BlockingNews();
  if (blocker) { hfmV70OpenBlockingNews(blocker); return; }
  return hfmV70HeaderActionBase();
};

const hfmV70ImmediateNextWeekBase = nextWeek;
nextWeek = function() {
  hfmV70EnsureState();
  if (state.weekSimulation?.active) return;
  const blocker = hfmV68BlockingNews();
  if (blocker) { hfmV70OpenBlockingNews(blocker); return; }
  if (!state.gameStarted || state.activeMatch || state.seasonEndModal || state.seasonStartModal || !state.sponsor) {
    return hfmV70ImmediateNextWeekBase();
  }
  return hfmV70BeginWeekSimulation("week");
};

const hfmV70AdvanceToNextCalendarWeekBase = advanceToNextCalendarWeek;
advanceToNextCalendarWeek = function() {
  hfmV70EnsureState();
  if (state.weekSimulation?.active) return;
  const blocker = hfmV68BlockingNews();
  if (blocker) { hfmV70OpenBlockingNews(blocker); return; }
  return hfmV70BeginWeekSimulation("advance");
};

hfmV68StopForBlockingNews = function(news) {
  if (state.weekSimulation?.active) hfmV70PauseForInterrupt(news);
  else hfmV70OpenBlockingNews(news);
};

function hfmV70ToggleSoftInterrupts() {
  hfmV70EnsureState();
  state.weekSimulationSettings.stopForSoftInterrupts = !state.weekSimulationSettings.stopForSoftInterrupts;
  render();
}

const hfmV70OptionsViewBase = optionsView;
optionsView = function() {
  hfmV70EnsureState();
  const html = hfmV70OptionsViewBase();
  const enabled = state.weekSimulationSettings.stopForSoftInterrupts !== false;
  const insert = `<h3>News-Unterbrechungen</h3><div class="infoBox">Kritische Nachrichten stoppen den Kalender immer. Optionale Soft-Interrupts halten die Simulation nur noch bei wichtigen Scoutingberichten an. Co-Trainer-Hinweise vor dem Spiel landen als normale Info im Newscenter.</div><div class="modalActions"><button class="${enabled ? 'primary' : 'ghost'} full" onclick="hfmV70ToggleSoftInterrupts()">Soft-Interrupts: ${enabled ? 'Ein' : 'Aus'}</button></div>`;
  return html.replace("</section>", `${insert}</section>`);
};

const hfmV70ResolveNewsActionBase = hfmV68ResolveNewsAction;
hfmV68ResolveNewsAction = function(id, action) {
  hfmV70ResolveNewsActionBase(id, action);
  const sim = state.weekSimulation;
  const news = (state.newsItems || []).find(n => n.id === id);
  if (sim?.active && sim.interruptNewsId === id && !hfmV70IsNewsStillOpen(news)) {
    sim.hidden = false;
    sim.paused = true;
  }
};

const hfmV70LoadGameBase = loadGame;
loadGame = function() {
  const result = hfmV70LoadGameBase();
  if (state.weekSimulation?.active) {
    state.weekSimulation.paused = true;
    state.weekSimulation.hidden = true;
    state.weekSimulation.message = "Geladene Kalendersimulation wurde sicher angehalten.";
  }
  render();
  return result;
};

const hfmV70RenderBase = render;
render = function() {
  hfmV70EnsureState();
  hfmV70RenderBase();
  hfmV70InjectWeekSimulationUi();
};

hfmV70EnsureState();
render();

/* Version 71: Trainingsverletzungen ohne Simulationsstop, Halbzeitnoten, farbige Noten und optionale Taktikstopps */
Object.assign(HFM_V68_NEWS_TEMPLATES, {
  INJURY_CRITICAL_TITLE: "Trainingsverletzung: {PLAYER_NAME}",
  INJURY_CRITICAL_BODY: "{PLAYER_NAME} hat sich im Training verletzt ({INJURY_NAME}, ca. {DAYS} Tage Ausfall). Die Meldung wurde im Newscenter notiert. Die Wochensimulation laeuft weiter; du kannst Aufstellung, Training oder Transferplanung spaeter anpassen."
});

function hfmV71EnsureSettings() {
  if (!state.options || typeof state.options !== "object") state.options = {};
  if (!state.options.matchStopMode) state.options.matchStopMode = "halftime";
  if (!state.weekSimulationSettings || typeof state.weekSimulationSettings !== "object") {
    state.weekSimulationSettings = { stopForSoftInterrupts: true };
  }
}

function hfmV71IsTrainingInjuryNews(news) {
  return !!news && news.category === "INJURY" && (news.sender_id === "medical_department" || news.action_type === "INJURY_RESPONSE" || news.action_type === "INJURY_INFO");
}

function hfmV71NormalizeTrainingInjuryNews() {
  hfmV71EnsureSettings();
  let demotedId = null;
  (state.newsItems || []).forEach(news => {
    if (!hfmV71IsTrainingInjuryNews(news)) return;
    if (news.requires_action || Number(news.priority || 3) <= 1 || news.action_type === "INJURY_RESPONSE") {
      news.priority = Math.max(3, Number(news.priority || 3));
      news.requires_action = false;
      news.resolved = true;
      news.action_type = "INJURY_INFO";
      news.title_template = "INJURY_CRITICAL_TITLE";
      news.body_template = "INJURY_CRITICAL_BODY";
      demotedId = news.id;
    }
  });
  const sim = state.weekSimulation;
  if (demotedId && sim && sim.active && sim.interruptNewsId === demotedId) {
    sim.interruptNewsId = null;
    sim.paused = false;
    sim.hidden = false;
    sim.message = "Trainingsverletzung wurde als News abgelegt. Die Kalendersimulation laeuft weiter.";
    if (typeof hfmV70ScheduleWeekTick === "function") window.setTimeout(() => hfmV70ScheduleWeekTick(220), 0);
  }
  if (state.newsInterruptModalIdV70 && (state.newsItems || []).some(n => n.id === state.newsInterruptModalIdV70 && hfmV71IsTrainingInjuryNews(n))) {
    state.newsInterruptModalIdV70 = null;
  }
}

hfmV68BlockingNews = function() {
  hfmV71NormalizeTrainingInjuryNews();
  return (state.newsItems || []).find(n => n.requires_action && !n.resolved && !hfmV71IsTrainingInjuryNews(n) && Number(n.priority) <= 1) || null;
};

hfmV70MaybeTrainingInjury = function(day, index) {
  const key = `training-injury-${seasonLabel()}-${state.week}`;
  if (state.lastTrainingInjuryKeyV70 === key) return null;
  const seed = stableHash(`${key}-${day.iso}-${state.trainingFocus}-${ownClubName()}`);
  const intense = ["Fitness", "Taktik", "Angriff"].includes(state.trainingFocus);
  const shouldInjure = (state.week % 10 === 0 && index === 2) || (intense && seed % 100 < 5) || (seed % 100 < 2);
  if (!shouldInjure) return null;
  const pool = hfmV70TrainingInjuryPool();
  if (!pool.length) return null;
  const player = pool[seed % Math.min(5, pool.length)];
  const injuries = [
    { name: "Muskelfaserriss", days: 35 },
    { name: "Baenderverletzung", days: 49 },
    { name: "Knieprellung", days: 24 },
    { name: "Sehnenreizung", days: 30 }
  ];
  const injury = injuries[seed % injuries.length];
  player.injury = { name: injury.name, days: injury.days, cause: "Training", sinceWeek: state.week };
  player.fitness = Math.max(35, Number(player.fitness || 100) - 25);
  state.lastTrainingInjuryKeyV70 = key;
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "INJURY",
    priority: 3,
    scope: "inbox",
    sender_id: "medical_department",
    subject_ids: [player.id],
    requires_action: false,
    action_type: "INJURY_INFO",
    resolved: true,
    uniqueKey: key,
    title_template: "INJURY_CRITICAL_TITLE",
    body_template: "INJURY_CRITICAL_BODY",
    data: { PLAYER_ID: player.id, PLAYER_NAME: player.name, INJURY_NAME: injury.name, DAYS: injury.days }
  });
};

hfmV70GenerateDailyEvents = function(day, index) {
  if (!Array.isArray(day.events)) day.events = [];
  const hardExisting = hfmV68BlockingNews();
  if (hardExisting) return hardExisting;
  const finance = hfmV70MaybeFinanceUltimatum(day, index);
  if (finance) return finance;
  const transfer = hfmV70MaybeTransferOffer(day, index);
  if (transfer) return transfer;
  const injury = hfmV70MaybeTrainingInjury(day, index);
  if (injury) day.events.push(`Trainingsverletzung: ${hfmV70Plain(hfmV68NewsTitle(injury))}`);
  const contract = hfmV70MaybeContractDeadline(day, index);
  if (contract) return contract;
  const scouting = hfmV70MaybeScoutingInterrupt(day, index);
  if (scouting) return scouting;
  const training = hfmV70MaybePrematchTrainingWarning(day, index);
  if (training) return training;
  const financeInfo = hfmV70MaybeMonthlyFinanceNews(day);
  if (financeInfo) day.events.push("Finanzbericht im Newscenter abgelegt.");
  return null;
};

function hfmV71SetMatchStopMode(mode) {
  hfmV71EnsureSettings();
  state.options.matchStopMode = mode === "extra" ? "extra" : "halftime";
  render();
}

function hfmV71MatchStopModeLabel() {
  hfmV71EnsureSettings();
  return state.options.matchStopMode === "extra" ? "35., 45. und 75. Minute" : "nur zur Halbzeit";
}

function hfmV71TacticalStopMinutes() {
  hfmV71EnsureSettings();
  return state.options.matchStopMode === "extra" ? [35, 75] : [];
}

function hfmV71IsTacticalStopMinute(match, minute, half) {
  if (!match || match.phase !== "live") return false;
  const stopMinute = Number(minute || 0);
  if (!hfmV71TacticalStopMinutes().includes(stopMinute)) return false;
  if (half === 1 && stopMinute >= 45) return false;
  if (half === 2 && stopMinute <= 45) return false;
  match.tacticalStopsDone = match.tacticalStopsDone || {};
  return !match.tacticalStopsDone[String(stopMinute)];
}

function hfmV71PauseForTacticalStop(match, minute, half) {
  if (!match) return;
  stopMatchTimer();
  match.tacticalStopsDone = match.tacticalStopsDone || {};
  match.tacticalStopsDone[String(minute)] = true;
  match.phase = "tacticalStop";
  match.liveHalf = half || (Number(minute) < 45 ? 1 : 2);
  match.currentMinute = Number(minute || match.currentMinute || 0);
  match.tacticalStop = { minute: match.currentMinute, half: match.liveHalf, createdAt: Date.now() };
  state.halftimeEditSection = "report";
  state.tab = "match";
  render();
}

function continueAfterTacticalStop() {
  const match = state.activeMatch;
  if (!match) return;
  const half = (match.tacticalStop && match.tacticalStop.half) || match.liveHalf || (Number(match.currentMinute || 0) < 45 ? 1 : 2);
  match.tacticalStop = null;
  match.phase = "live";
  startLiveHalf(half);
}

runHalfInstant = function(half) {
  const match = state.activeMatch;
  if (!match) return;
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!match.currentMinute || match.currentMinute < 1)) match.currentMinute = 0;
  if (half === 2 && match.currentMinute < 46) match.currentMinute = 45;
  match.phase = "live";
  match.liveHalf = half;
  state.tab = "match";
  while (match.currentMinute < endMinute) {
    match.currentMinute += 1;
    if (processLiveMinuteEvents()) return;
    if (match.phase !== "live") return;
    if (hfmV71IsTacticalStopMinute(match, match.currentMinute, half)) {
      hfmV71PauseForTacticalStop(match, match.currentMinute, half);
      return;
    }
  }
  if (half === 1) {
    match.halftimeStats = matchStatsForHalf(45);
    match.phase = "halftime";
    state.halftimeEditSection = "report";
    state.tab = "matchHalftime";
  } else {
    match.fullStats = matchStatsForHalf(90);
    finishActiveMatch();
    match.phase = "finished";
    state.tab = "matchEnd";
  }
  render();
};

startLiveHalf = function(half) {
  const match = state.activeMatch;
  if (!match) return;
  if ((state.options && state.options.simulationSpeed || "slow") === "instant") {
    runHalfInstant(half);
    return;
  }
  stopMatchTimer();
  const endMinute = half === 1 ? 45 : 90;
  if (half === 1 && (!match.currentMinute || match.currentMinute < 1)) match.currentMinute = 0;
  if (half === 2 && match.currentMinute < 46) match.currentMinute = 45;
  match.phase = "live";
  match.liveHalf = half;
  match.liveStartedAt = Date.now();
  match.liveTickGuard = 0;
  match.lastTickAt = Date.now();
  state.tab = "match";
  render();
  window.hfmMatchTimer = setInterval(() => {
    try {
      const m = state.activeMatch;
      if (!m || m.phase !== "live") {
        stopMatchTimer();
        return;
      }
      m.liveTickGuard = (m.liveTickGuard || 0) + 1;
      m.lastTickAt = Date.now();
      if (m.liveTickGuard > 130) {
        finishCurrentLiveHalfSafely("Automatischer Abschluss: Die Live-Simulation hat zu lange gebraucht.");
        return;
      }
      m.currentMinute += 1;
      try { processLiveMinuteEvents(); } catch (err) { console.warn("Minutenereignis Fehler abgefangen:", err); }
      if (m.phase !== "live") return;
      if (hfmV71IsTacticalStopMinute(m, m.currentMinute, half)) {
        hfmV71PauseForTacticalStop(m, m.currentMinute, half);
        return;
      }
      if (half === 2 && m.currentMinute >= 88) {
        forceFinishMatchEnd(null);
        render();
        return;
      }
      if (m.currentMinute >= endMinute) {
        finishCurrentLiveHalfSafely(null);
        return;
      }
      render();
    } catch (err) {
      console.error("Live-Timer Fehler abgefangen:", err);
      finishCurrentLiveHalfSafely("Automatischer Abschluss: Ein Live-Timer-Fehler wurde abgefangen.");
    }
  }, Math.max(20, simulationIntervalMs()));
};

function hfmV71FormatNote(note) {
  const safe = Math.max(1, Math.min(5, Number(note || 3)));
  return safe.toFixed(1).replace(".", ",");
}

function hfmV71NoteColor(note) {
  const n = Math.max(1, Math.min(5, Number(note || 3)));
  const t = (n - 1) / 4;
  const hue = Math.round(138 - 138 * t);
  const light = Math.round(50 + 8 * t);
  return `hsl(${hue}, 84%, ${light}%)`;
}

function hfmV71RatingHtml(note) {
  const safe = Math.max(1, Math.min(5, Number(note || 3)));
  return `<b class="ratingNumber" style="color:${hfmV71NoteColor(safe)}">${hfmV71FormatNote(safe)}</b>`;
}

function hfmV71ScoreAtMinute(match, untilMinute) {
  const goals = (match && match.events || []).filter(e => e.type === "goal" && Number(e.minute || 0) <= untilMinute);
  return { own: goals.filter(e => e.team === "own").length, opp: goals.filter(e => e.team === "opp").length };
}

function hfmV71VisibleEventBonus(match, player, untilMinute) {
  if (!match || !player) return 0;
  const events = (match.events || []).filter(e => Number(e.minute || 0) <= untilMinute);
  let bonus = 0;
  for (const e of events) {
    if (e.type === "goal" && e.team === "own" && String(e.scorerId) === String(player.id)) bonus += hfmV64EventDelta(player, "goal", 1.12) * 0.72;
    if (e.type === "goal" && e.team === "own" && String(e.assistId) === String(player.id)) bonus += hfmV64EventDelta(player, "assist", 1) * 0.68;
    if (e.type === "yellow" && String(e.playerId) === String(player.id)) bonus += hfmV64EventDelta(player, "yellow", 1) * 0.75;
    if (e.type === "red" && String(e.playerId) === String(player.id)) bonus += hfmV64EventDelta(player, "red", 1) * 0.90;
    if (e.type === "missed_penalty" && e.team === "own" && String(e.playerId) === String(player.id)) bonus += hfmV64EventDelta(player, "penaltyMissed", 1) * 0.85;
  }
  return bonus;
}

function hfmV71LiveContext(match, player, untilMinute) {
  const group = ratingPositionGroup(player);
  const score = hfmV71ScoreAtMinute(match, untilMinute);
  const diff = score.own - score.opp;
  let context = 0;
  if (diff < 0) context -= 0.25 + Math.min(0.55, Math.abs(diff) * 0.16);
  if (diff > 0) context += 0.14 + Math.min(0.22, diff * 0.07);
  if (score.own === 0 && group === "attack") context -= 0.18;
  if (score.own === 0 && group === "midfield") context -= 0.08;
  if (score.opp > 0 && (group === "keeper" || group === "defense")) context -= Math.min(0.42, score.opp * 0.16);
  if (score.opp === 0 && (group === "keeper" || group === "defense")) context += 0.14;
  return context;
}

function hfmV71MinutesForRecordUntil(record, untilMinute) {
  const start = Number.isFinite(Number(record && record.subbedInAt)) ? Number(record.subbedInAt) : 0;
  const end = Number.isFinite(Number(record && record.subbedOutAt)) ? Math.min(Number(record.subbedOutAt), untilMinute) : untilMinute;
  return Math.max(0, Math.min(untilMinute, end) - Math.max(0, start));
}

function hfmV71LiveRatingRecords(untilMinute = 45) {
  const match = state.activeMatch;
  if (!match) return [];
  if (!match.ratingRecords) match.ratingRecords = {};
  const currentIds = new Set(lineupEntries().map(e => String(e.player.id)));
  lineupEntries().forEach(entry => ensureMatchRatingRecord(match, entry.player, "Starter"));
  return Object.values(match.ratingRecords).map(record => {
    const player = hfmV64RecordPlayer(record);
    const minutes = hfmV71MinutesForRecordUntil(record, untilMinute);
    const wasOnPitch = minutes > 0 || currentIds.has(String(record.playerId));
    if (!wasOnPitch) return null;
    const timeFactor = Math.max(0.20, Math.min(1, untilMinute / 90));
    let points = Number(record.matchPoints || 0) * timeFactor;
    points += hfmV71VisibleEventBonus(match, player, untilMinute);
    let score10 = 6.0 + points + hfmV71LiveContext(match, player, untilMinute);
    const minuteFactor = minutes >= 30 ? 1 : minutes > 0 ? 0.72 : 0.55;
    score10 = 6.0 + (score10 - 6.0) * minuteFactor;
    const note5 = score10ToNote5(clampRating10(score10));
    return { ...record, name: record.name, pos: record.pos, minutes, note5 };
  }).filter(Boolean).sort((a, b) => a.note5 - b.note5 || String(a.name).localeCompare(String(b.name)));
}

function hfmV71LiveRatingTable(untilMinute = 45, title = "Benotung deiner Spieler") {
  const rows = hfmV71LiveRatingRecords(untilMinute).map(r => `<tr><td>${hfmV68Html(r.name)}</td><td>${hfmV68Html(r.pos)}</td><td>${hfmV71RatingHtml(r.note5)}</td></tr>`).join("");
  return `<h3>${title}</h3><div class="tableWrap ratingTable compactRatingTable liveRatingTable"><table><thead><tr><th>Spieler</th><th>Position</th><th>Note</th></tr></thead><tbody>${rows || '<tr><td colspan="3">Noch keine Einsatzdaten.</td></tr>'}</tbody></table></div>`;
}

matchRatingTable = function() {
  const match = state.activeMatch;
  if (!match) return "";
  const rows = getRatingRecordsArray(match).map(r => `<tr><td>${hfmV68Html(r.name)}</td><td>${hfmV68Html(r.pos)}</td><td>${hfmV71RatingHtml(r.note5)}</td></tr>`).join("");
  return `<h3>Spielernoten</h3><div class="tableWrap ratingTable compactRatingTable"><table><thead><tr><th>Spieler</th><th>Position</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table></div>`;
};

halftimeChangeScreen = function() {
  const current = ["report", "formation", "tactic"].includes(state.halftimeEditSection) ? state.halftimeEditSection : "report";
  const match = state.activeMatch;
  const minute = match && match.phase === "tacticalStop" ? Number(match.currentMinute || match.tacticalStop && match.tacticalStop.minute || 0) : 45;
  const menuTitle = match && match.phase === "tacticalStop" ? `Taktikstopp · ${minute}. Minute` : "Halbzeit-Menue";
  const reportTitle = match && match.phase === "tacticalStop" ? `Spielbericht bis zur ${minute}. Minute` : "Spielbericht zur Halbzeit";
  if (current === "report") {
    return `<h3>${menuTitle}</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>${reportTitle}</h3>${match ? matchStatRows(matchStatsForHalf(minute)) : ""}${matchStatusOverview()}${hfmV71LiveRatingTable(minute, match && match.phase === "tacticalStop" ? "Aktuelle Spielernoten" : "Benotung 1. Halbzeit")}<h3>Wichtige Ereignisse</h3>${importantEventList(match && match.log || [])}</div>`;
  }
  if (current === "tactic") {
    return `<h3>${menuTitle}</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Taktik aendern</h3><div class="infoBox">Hier ist bewusst nur die Taktik sichtbar. Spielbericht, Ereignisse und Noten bleiben im eigenen Punkt links daneben.</div>${tacticsView()}</div>`;
  }
  return `<h3>${menuTitle}</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Formation aendern</h3><div class="infoBox">Hier ist bewusst nur die Formation mit Wechseln sichtbar. Spielbericht, Ereignisse und Noten bleiben im eigenen Punkt links daneben.</div><div class="chips">${formationButtonsForMatch()}</div>${halftimeFormationPitch()}<h3>Wechsel</h3><div class="subGrid">${halftimeSubControls()}</div></div>`;
};

halftimeScreen = function() {
  const match = state.activeMatch;
  if (!match) return `<section class="panel"><h2>Keine Halbzeitdaten</h2><button class="primary" onclick="setTab('dashboard')">Zur Home-Seite</button></section>`;
  if (!["report", "formation", "tactic"].includes(state.halftimeEditSection)) state.halftimeEditSection = "report";
  const liveScore = `${match.liveScore && match.liveScore.own || 0}:${match.liveScore && match.liveScore.opp || 0}`;
  return `<div class="halftimeWindowBackdrop"><section class="panel matchPanel halftimeWindow"><div class="modalHeader"><div><p class="eyebrow">Halbzeitpause</p><h2>${ownClubName()} - ${match.opponent}</h2></div><span class="requiredBadge">Analyse & Anpassung</span></div><div class="scoreBoard"><b>${liveScore}</b><span>45. Minute</span></div>${halftimeChangeScreen()}</section></div>`;
};

function hfmV71TacticalStopScreen() {
  const match = state.activeMatch;
  if (!match) return `<section class="panel"><h2>Kein aktives Spiel</h2></section>`;
  if (!["report", "formation", "tactic"].includes(state.halftimeEditSection)) state.halftimeEditSection = "report";
  const liveScore = `${match.liveScore && match.liveScore.own || 0}:${match.liveScore && match.liveScore.opp || 0}`;
  const minute = Number(match.currentMinute || match.tacticalStop && match.tacticalStop.minute || 0);
  return `<div class="halftimeWindowBackdrop"><section class="panel matchPanel halftimeWindow"><div class="modalHeader"><div><p class="eyebrow">Automatischer Spielstopp</p><h2>${ownClubName()} - ${match.opponent}</h2></div><span class="requiredBadge">${minute}. Minute</span></div><div class="scoreBoard"><b>${liveScore}</b><span>Taktik/Formation moeglich</span></div>${halftimeChangeScreen()}<button class="primary full" onclick="continueAfterTacticalStop()">Spiel fortsetzen</button></section></div>`;
}

var hfmV71MatchScreenBase = matchScreen;
matchScreen = function() {
  const match = state.activeMatch;
  if (match && match.phase === "tacticalStop") return hfmV71TacticalStopScreen();
  return hfmV71MatchScreenBase();
};

var hfmV71HeaderActionLabelBase = headerActionLabel;
headerActionLabel = function() {
  if (state.activeMatch && state.activeMatch.phase === "tacticalStop") return "Spiel fortsetzen";
  return hfmV71HeaderActionLabelBase();
};

var hfmV71HeaderActionBase = headerAction;
headerAction = function() {
  if (state.activeMatch && state.activeMatch.phase === "tacticalStop") {
    continueAfterTacticalStop();
    return;
  }
  return hfmV71HeaderActionBase();
};

var hfmV71OptionsViewBase = optionsView;
optionsView = function() {
  hfmV71EnsureSettings();
  const html = hfmV71OptionsViewBase();
  const mode = state.options.matchStopMode || "halftime";
  const button = (id, title, desc) => `<button class="league clickableLeague ${mode === id ? 'selectedOption' : ''}" onclick="hfmV71SetMatchStopMode('${id}')"><strong>${title}</strong><span>${desc}</span></button>`;
  const insert = `<h3>Automatische Spielstopps</h3><div class="infoBox">Aktuell stoppt das Spiel <b>${hfmV71MatchStopModeLabel()}</b>. Beim erweiterten Modus kannst du in der 35. und 75. Minute zusaetzlich Formation, Wechsel und Taktik anpassen.</div><div class="leagueList matchStopOptionList">${button('halftime', 'Standard', 'Das Spiel stoppt nur zur Halbzeitpause in der 45. Minute.')}${button('extra', 'Erweitert', 'Zusaetzliche Stopps in der 35. und 75. Minute plus Halbzeit.')}</div>`;
  return html.replace("</section>", `${insert}</section>`);
};

var hfmV71RenderBase = render;
render = function() {
  hfmV71EnsureSettings();
  hfmV71NormalizeTrainingInjuryNews();
  hfmV71RenderBase();
};

hfmV71EnsureSettings();
hfmV71NormalizeTrainingInjuryNews();
render();


/* Version 72: Direkte Vertragsentscheidung in kritischen News */
Object.assign(HFM_V68_NEWS_TEMPLATES, {
  CONTRACT_DEADLINE_BODY: "Der Berater von {PLAYER_NAME} erwartet eine Entscheidung zur Vertragszukunft. Vertrag: {CONTRACT}. Zufriedenheit: {SATISFACTION}. Wähle direkt: Vertrag verlängern oder Abbrechen.",
  CONTRACT_RENEWED_TITLE: "Vertrag verlängert: {PLAYER_NAME}",
  CONTRACT_RENEWED_BODY: "{PLAYER_NAME} hat den neuen Vertrag angenommen. Restlaufzeit: {YEARS} Jahr(e), neues Monatsgehalt: {SALARY}.",
  CONTRACT_CANCELLED_TITLE: "Vertragsgespräch abgebrochen: {PLAYER_NAME}",
  CONTRACT_CANCELLED_BODY: "Du hast die sofortige Vertragsentscheidung bei {PLAYER_NAME} abgebrochen. Der laufende Vertrag bleibt unveraendert; du kannst spaeter in der Vertragsansicht erneut handeln.",
  CONTRACT_UNAVAILABLE_TITLE: "Verlängerung nicht möglich: {PLAYER_NAME}",
  CONTRACT_UNAVAILABLE_BODY: "Die direkte Vertragsverlängerung mit {PLAYER_NAME} konnte nicht gestartet werden: {REASON}.",
  CONTRACT_FAILED_TITLE: "Verhandlung gescheitert: {PLAYER_NAME}",
  CONTRACT_FAILED_BODY: "Die Vertragsverhandlung mit {PLAYER_NAME} ist ohne Einigung beendet. Neue Gespräche sind vorerst blockiert."
});

var hfmV72CategoryLabelBase = hfmV68CategoryLabel;
hfmV68CategoryLabel = function(category) {
  if (category === "CONTRACT") return "Vertrag";
  return hfmV72CategoryLabelBase(category);
};

function hfmV72FindNews(id) {
  hfmV68EnsureNewsState();
  return (state.newsItems || []).find(n => String(n.id) === String(id)) || null;
}

function hfmV72FindPlayerByNews(news) {
  const id = news && news.data && news.data.PLAYER_ID;
  if (id == null) return null;
  return (state.players || []).find(p => String(p.id) === String(id)) || null;
}

function hfmV72FindContractDeadlineNewsForPlayer(playerId) {
  return (state.newsItems || []).find(n => n.action_type === "CONTRACT_DEADLINE" && n.requires_action && !n.resolved && String(n.data && n.data.PLAYER_ID) === String(playerId)) || null;
}

function hfmV72SetPausedSimulationForNews(id) {
  if (state.weekSimulation && state.weekSimulation.active) {
    state.weekSimulation.paused = true;
    state.weekSimulation.hidden = true;
    state.weekSimulation.interruptNewsId = id;
  }
  if (state.newsInterruptModalIdV70 === id) state.newsInterruptModalIdV70 = null;
}

function hfmV72ResolveContractDeadline(news, outcome, player, extraData) {
  if (!news) return;
  news.read = true;
  news.resolved = true;
  news.requires_action = false;
  if (state.newsInterruptModalIdV70 === news.id) state.newsInterruptModalIdV70 = null;
  if (state.weekSimulation && state.weekSimulation.interruptNewsId === news.id) {
    state.weekSimulation.paused = true;
    state.weekSimulation.interruptNewsId = null;
    state.weekSimulation.message = "Die Vertragsentscheidung wurde bearbeitet. Du kannst die Kalendersimulation fortsetzen.";
  }
  const name = player && player.name || news.data && news.data.PLAYER_NAME || "Spieler";
  if (outcome === "renewed") {
    hfmV68AddNews({
      category: "CONTRACT",
      priority: 2,
      scope: "inbox",
      sender_id: "player_agent",
      uniqueKey: `contract-renewed-${news.id}`,
      title_template: "CONTRACT_RENEWED_TITLE",
      body_template: "CONTRACT_RENEWED_BODY",
      data: { PLAYER_NAME: name, YEARS: Number(player && player.contractYears || extraData && extraData.YEARS || 0), SALARY: euro(Number(player && player.salary || extraData && extraData.SALARY_VALUE || 0)) }
    });
  } else if (outcome === "cancelled") {
    hfmV68AddNews({
      category: "CONTRACT",
      priority: 3,
      scope: "inbox",
      sender_id: "player_agent",
      uniqueKey: `contract-cancelled-${news.id}`,
      title_template: "CONTRACT_CANCELLED_TITLE",
      body_template: "CONTRACT_CANCELLED_BODY",
      data: { PLAYER_NAME: name }
    });
  } else if (outcome === "unavailable") {
    hfmV68AddNews({
      category: "CONTRACT",
      priority: 3,
      scope: "inbox",
      sender_id: "player_agent",
      uniqueKey: `contract-unavailable-${news.id}`,
      title_template: "CONTRACT_UNAVAILABLE_TITLE",
      body_template: "CONTRACT_UNAVAILABLE_BODY",
      data: { PLAYER_NAME: name, REASON: extraData && extraData.REASON || "nicht verhandlungsbereit" }
    });
  } else if (outcome === "failed") {
    hfmV68AddNews({
      category: "CONTRACT",
      priority: 3,
      scope: "inbox",
      sender_id: "player_agent",
      uniqueKey: `contract-failed-${news.id}`,
      title_template: "CONTRACT_FAILED_TITLE",
      body_template: "CONTRACT_FAILED_BODY",
      data: { PLAYER_NAME: name }
    });
  }
}

function hfmV72StartContractFromNews(id) {
  const news = hfmV72FindNews(id);
  if (!news || news.resolved || news.action_type !== "CONTRACT_DEADLINE") return;
  news.read = true;
  const player = hfmV72FindPlayerByNews(news);
  if (!player) {
    hfmV72ResolveContractDeadline(news, "unavailable", null, { REASON: "Spieler nicht mehr im Kader" });
    render();
    return;
  }
  const willingness = contractWillingness(player);
  if (!willingness.ok) {
    hfmV72ResolveContractDeadline(news, "unavailable", player, { REASON: willingness.reason });
    alert(`${player.name} will aktuell nicht verlängern: ${willingness.reason}.`);
    render();
    return;
  }
  hfmV72SetPausedSimulationForNews(news.id);
  state.pendingContractDeadlineNewsIdV72 = news.id;
  state.newsSelectedId = news.id;
  state.newsFilter = "action";
  state.tab = "team";
  state.teamSection = "contracts";
  const demand = contractDemand(player);
  state.contractNegotiation = {
    playerId: player.id,
    round: 1,
    patience: Math.max(1, Math.min(3, Math.ceil(playerSatisfaction(player) / 35))),
    sourceNewsId: news.id
  };
  state.contractOffer = { years: demand.years, salary: demand.salary, bonus: demand.bonus };
  render();
}



function hfmV72OpenBudgetFromContractNews(id) {
  const news = hfmV72FindNews(id);
  if (!news || news.resolved) return;
  news.read = true;
  hfmV72SetPausedSimulationForNews(news.id);
  goTo("club", "finances");
}

function hfmV72CancelContractFromNews(id) {
  const news = hfmV72FindNews(id);
  if (!news || news.resolved) return;
  news.read = true;
  const player = hfmV72FindPlayerByNews(news);
  hfmV72ResolveContractDeadline(news, "cancelled", player, null);
  if (state.contractNegotiation && String(state.contractNegotiation.sourceNewsId) === String(news.id)) {
    state.contractNegotiation = null;
  }
  render();
}

var hfmV72SubmitContractOfferBase = submitContractOffer;
submitContractOffer = function() {
  const beforeNeg = state.contractNegotiation ? { ...state.contractNegotiation } : null;
  const playerId = beforeNeg && beforeNeg.playerId;
  const sourceNewsId = beforeNeg && beforeNeg.sourceNewsId || state.pendingContractDeadlineNewsIdV72;
  const playerBefore = (state.players || []).find(p => String(p.id) === String(playerId));
  const beforeYears = Number(playerBefore && playerBefore.contractYears || 0);
  const beforeSalary = Number(playerBefore && playerBefore.salary || 0);
  const beforeSatisfaction = Number(playerBefore && playerBefore.satisfaction || 0);
  hfmV72SubmitContractOfferBase();
  if (!playerId) return;
  const playerAfter = (state.players || []).find(p => String(p.id) === String(playerId));
  const news = sourceNewsId ? hfmV72FindNews(sourceNewsId) : hfmV72FindContractDeadlineNewsForPlayer(playerId);
  if (!news || news.resolved || news.action_type !== "CONTRACT_DEADLINE") return;
  const negotiationStillOpen = state.contractNegotiation && String(state.contractNegotiation.playerId) === String(playerId);
  if (negotiationStillOpen) return;
  const afterYears = Number(playerAfter && playerAfter.contractYears || 0);
  const afterSalary = Number(playerAfter && playerAfter.salary || 0);
  const afterSatisfaction = Number(playerAfter && playerAfter.satisfaction || 0);
  const acceptedExtension = playerAfter && (afterYears > beforeYears || afterSalary !== beforeSalary || afterSatisfaction > beforeSatisfaction);
  if (acceptedExtension) {
    hfmV72ResolveContractDeadline(news, "renewed", playerAfter, null);
    state.pendingContractDeadlineNewsIdV72 = null;
    render();
    return;
  }
  if (playerAfter && Number(playerAfter.negotiationLockUntil || 0) > Number(state.week || 0)) {
    hfmV72ResolveContractDeadline(news, "failed", playerAfter, null);
    state.pendingContractDeadlineNewsIdV72 = null;
    render();
  }
};

var hfmV72NewsActionButtonsBase = hfmV68NewsActionButtons;
hfmV68NewsActionButtons = function(news) {
  if (!news || !news.requires_action || news.resolved) return "";
  if (news.action_type === "CONTRACT_DEADLINE") {
    return `<div class="modalActions newsActions"><button class="primary full" onclick="hfmV72StartContractFromNews('${news.id}')">Vertrag verlängern</button><button class="ghost full" onclick="hfmV72CancelContractFromNews('${news.id}')">Abbrechen</button></div>`;
  }
  return hfmV72NewsActionButtonsBase(news);
};

render();

/* Version 73: Spielmusik mit Dauerschleife und Options-Schalter */
const HFM_V73_MUSIC_TRACKS = [
  { title: "Hard-Fi - Cash Machine", src: "assets/music/hard-fi-cash-machine.mp3" },
  { title: "Running Out of Things to Say", src: "assets/music/running-out-of-things-to-say.mp3" },
  { title: "Stereophonics - Dakota", src: "assets/music/stereophonics-dakota.mp3" },
  { title: "The Rakes - Retreat", src: "assets/music/the-rakes-retreat.mp3" }
];
const HFM_V73_MUSIC_STORAGE_KEY = "hfm_browser_music_enabled_v73";
let hfmV73MusicAudio = null;
let hfmV73MusicTrackIndex = 0;
let hfmV73MusicUnlockBound = false;
let hfmV73MusicBlocked = false;
let hfmV73MusicLastError = "";

function hfmV73AudioSupported() {
  return typeof Audio !== "undefined" && typeof window !== "undefined" && typeof document !== "undefined";
}

function hfmV73StoredMusicPreference() {
  try {
    const raw = localStorage.getItem(HFM_V73_MUSIC_STORAGE_KEY);
    if (raw === "true") return true;
    if (raw === "false") return false;
  } catch (err) {}
  return true;
}

function hfmV73RememberMusicPreference() {
  try {
    localStorage.setItem(HFM_V73_MUSIC_STORAGE_KEY, String(state.options && state.options.musicEnabled !== false));
  } catch (err) {}
}

function hfmV73EnsureMusicSettings() {
  if (!state.options || typeof state.options !== "object") state.options = {};
  if (typeof state.options.musicEnabled !== "boolean") {
    state.options.musicEnabled = hfmV73StoredMusicPreference();
  } else {
    hfmV73RememberMusicPreference();
  }
  if (typeof state.options.musicVolume !== "number") state.options.musicVolume = 0.38;
}

function hfmV73CurrentTrack() {
  if (!HFM_V73_MUSIC_TRACKS.length) return null;
  const safeIndex = ((hfmV73MusicTrackIndex % HFM_V73_MUSIC_TRACKS.length) + HFM_V73_MUSIC_TRACKS.length) % HFM_V73_MUSIC_TRACKS.length;
  hfmV73MusicTrackIndex = safeIndex;
  return HFM_V73_MUSIC_TRACKS[safeIndex];
}

function hfmV73CreateAudio() {
  if (!hfmV73AudioSupported()) return null;
  if (hfmV73MusicAudio) return hfmV73MusicAudio;
  hfmV73MusicAudio = new Audio();
  hfmV73MusicAudio.preload = "auto";
  hfmV73MusicAudio.volume = Math.max(0, Math.min(1, Number(state.options && state.options.musicVolume || 0.38)));
  hfmV73MusicAudio.addEventListener("ended", hfmV73NextMusicTrack);
  hfmV73MusicAudio.addEventListener("error", function() {
    hfmV73MusicLastError = "Der aktuelle Musiktitel konnte nicht geladen werden.";
    hfmV73NextMusicTrack();
  });
  return hfmV73MusicAudio;
}

function hfmV73LoadMusicTrack(index) {
  const audio = hfmV73CreateAudio();
  const track = HFM_V73_MUSIC_TRACKS[index];
  if (!audio || !track) return null;
  hfmV73MusicTrackIndex = index;
  if (!audio.dataset || audio.dataset.trackIndex !== String(index)) {
    audio.src = track.src;
    if (audio.dataset) audio.dataset.trackIndex = String(index);
    try { audio.load(); } catch (err) {}
  }
  return track;
}

function hfmV73BindMusicUnlock() {
  if (!hfmV73AudioSupported() || hfmV73MusicUnlockBound) return;
  hfmV73MusicUnlockBound = true;
  const unlock = function() {
    if (state.options && state.options.musicEnabled === false) return;
    hfmV73PlayMusic("gesture");
  };
  ["pointerdown", "touchstart", "click", "keydown"].forEach(function(eventName) {
    document.addEventListener(eventName, unlock, { passive: true });
  });
}

function hfmV73PlayMusic(source) {
  hfmV73EnsureMusicSettings();
  if (state.options.musicEnabled === false) {
    hfmV73StopMusic(false);
    return;
  }
  const audio = hfmV73CreateAudio();
  if (!audio) return;
  audio.volume = Math.max(0, Math.min(1, Number(state.options.musicVolume || 0.38)));
  if (!audio.src || !audio.dataset || audio.dataset.trackIndex === undefined) hfmV73LoadMusicTrack(hfmV73MusicTrackIndex);
  if (!audio.paused && !audio.ended) return;
  try {
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.then(function() {
        hfmV73MusicBlocked = false;
        hfmV73MusicLastError = "";
      }).catch(function(err) {
        hfmV73MusicBlocked = true;
        hfmV73MusicLastError = err && err.message ? err.message : "Autoplay wurde vom Browser blockiert.";
        hfmV73BindMusicUnlock();
      });
    }
  } catch (err) {
    hfmV73MusicBlocked = true;
    hfmV73MusicLastError = err && err.message ? err.message : "Autoplay wurde vom Browser blockiert.";
    hfmV73BindMusicUnlock();
  }
}

function hfmV73StopMusic(resetTime) {
  if (!hfmV73MusicAudio) return;
  try {
    hfmV73MusicAudio.pause();
    if (resetTime) hfmV73MusicAudio.currentTime = 0;
  } catch (err) {}
}

function hfmV73NextMusicTrack() {
  if (!HFM_V73_MUSIC_TRACKS.length) return;
  hfmV73MusicTrackIndex = (hfmV73MusicTrackIndex + 1) % HFM_V73_MUSIC_TRACKS.length;
  hfmV73LoadMusicTrack(hfmV73MusicTrackIndex);
  if (state.options && state.options.musicEnabled !== false) hfmV73PlayMusic("next");
}

function hfmV73ToggleMusic() {
  hfmV73EnsureMusicSettings();
  state.options.musicEnabled = state.options.musicEnabled === false;
  hfmV73RememberMusicPreference();
  if (state.options.musicEnabled) hfmV73PlayMusic("toggle");
  else hfmV73StopMusic(false);
  render();
}

function hfmV73SetMusicVolume(value) {
  hfmV73EnsureMusicSettings();
  const volume = Math.max(0, Math.min(1, Number(value) / 100));
  state.options.musicVolume = volume;
  if (hfmV73MusicAudio) hfmV73MusicAudio.volume = volume;
  hfmV73RememberMusicPreference();
  render();
}

function hfmV73MusicStatusText() {
  hfmV73EnsureMusicSettings();
  if (state.options.musicEnabled === false) return "Ausgeschaltet";
  if (hfmV73MusicBlocked) return "Wartet auf ersten Tipp";
  if (hfmV73MusicAudio && !hfmV73MusicAudio.paused) return "Laeuft";
  return "Bereit";
}

function hfmV73MusicOptionsPanel() {
  hfmV73EnsureMusicSettings();
  const enabled = state.options.musicEnabled !== false;
  const current = hfmV73CurrentTrack();
  const volume = Math.round(Number(state.options.musicVolume || 0.38) * 100);
  const tracks = HFM_V73_MUSIC_TRACKS.map(function(track, index) {
    return `<span class="musicTrack ${index === hfmV73MusicTrackIndex ? 'isCurrent' : ''}">${index + 1}. ${track.title}</span>`;
  }).join("");
  const blockedHint = hfmV73MusicBlocked && enabled ? `<div class="hint musicHint">Falls dein Handy den Autostart blockiert, startet die Musik beim naechsten Antippen automatisch.</div>` : "";
  return `<h3>Spielmusik</h3><div class="infoBox musicOptionBox"><b>Status:</b> ${hfmV73MusicStatusText()}<br><b>Aktueller Titel:</b> ${current ? current.title : 'keiner'}<br>Die hochgeladenen Songs laufen als Playlist dauerhaft im Hintergrund weiter.</div><div class="musicTrackList">${tracks}</div>${blockedHint}<div class="modalActions musicActions"><button class="${enabled ? 'primary' : 'ghost'} full" onclick="hfmV73ToggleMusic()">Musik: ${enabled ? 'Ein' : 'Aus'}</button><button class="ghost full" onclick="hfmV73NextMusicTrack()">Naechster Song</button></div><label class="fieldLabel musicVolumeLabel">Lautstaerke<input type="range" min="0" max="100" value="${volume}" oninput="hfmV73SetMusicVolume(this.value)"></label>`;
}

const hfmV73OptionsViewBase = optionsView;
optionsView = function() {
  hfmV73EnsureMusicSettings();
  const html = hfmV73OptionsViewBase();
  return html.replace("</section>", `${hfmV73MusicOptionsPanel()}</section>`);
};

const hfmV73StartGameBase = startGame;
startGame = function() {
  hfmV73EnsureMusicSettings();
  hfmV73PlayMusic("startGame");
  return hfmV73StartGameBase();
};

const hfmV73LoadGameBase = loadGame;
loadGame = function() {
  const result = hfmV73LoadGameBase();
  hfmV73EnsureMusicSettings();
  if (state.options.musicEnabled === false) hfmV73StopMusic(false);
  else hfmV73PlayMusic("loadGame");
  return result;
};

const hfmV73RenderBase = render;
render = function() {
  hfmV73EnsureMusicSettings();
  hfmV73RenderBase();
  if (state.options.musicEnabled === false) hfmV73StopMusic(false);
  else hfmV73PlayMusic("render");
};

hfmV73EnsureMusicSettings();
hfmV73BindMusicUnlock();
hfmV73PlayMusic("boot");
render();

/* Version 74: Sponsorwahl erscheint erst nach einer simulierten Woche */
function hfmV74SponsorDayKey() {
  try { return currentDayIndex(); } catch (err) { return 0; }
}

function hfmV74EnsureSponsorTiming() {
  state.sponsorTiming = state.sponsorTiming && typeof state.sponsorTiming === 'object' ? state.sponsorTiming : {};
  if (!state.gameStarted) return;
  if (state.sponsor) {
    state.sponsorTiming.availableFromDay = null;
    state.sponsorTiming.createdForSeason = state.seasonStartYear || 2026;
    return;
  }
  if (state.sponsorTiming.createdForSeason !== (state.seasonStartYear || 2026)) {
    state.sponsorTiming.availableFromDay = hfmV74SponsorDayKey() + 7;
    state.sponsorTiming.createdForSeason = state.seasonStartYear || 2026;
  }
  if (typeof state.sponsorTiming.availableFromDay !== 'number') {
    state.sponsorTiming.availableFromDay = hfmV74SponsorDayKey() + 7;
  }
}

function hfmV74SponsorIsAvailable() {
  hfmV74EnsureSponsorTiming();
  if (!state.gameStarted || state.sponsor) return false;
  return hfmV74SponsorDayKey() >= Number(state.sponsorTiming.availableFromDay || 0);
}

function hfmV74SponsorWaitText() {
  hfmV74EnsureSponsorTiming();
  const remaining = Math.max(1, Number(state.sponsorTiming.availableFromDay || 0) - hfmV74SponsorDayKey());
  const days = remaining === 1 ? '1 Tag' : `${remaining} Tage`;
  return `Die Sponsorengespräche starten erst nach der ersten simulierten Woche. Noch ${days} bis zur Sponsorwahl.`;
}

const hfmV74SponsorModalBase = sponsorModal;
sponsorModal = function() {
  hfmV74EnsureSponsorTiming();
  if (!hfmV74SponsorIsAvailable()) return '';
  return hfmV74SponsorModalBase();
};

const hfmV74SponsorChoiceBase = sponsorChoice;
sponsorChoice = function() {
  hfmV74EnsureSponsorTiming();
  if (!state.sponsor && !hfmV74SponsorIsAvailable()) {
    return `<div class="infoBox"><b>Sponsorwahl noch nicht verfügbar:</b> ${hfmV74SponsorWaitText()} Bis dahin kannst du Kader, Training, Markt und Verein vorbereiten.</div>`;
  }
  return hfmV74SponsorChoiceBase();
};

const hfmV74SelectSponsorBase = selectSponsor;
selectSponsor = function(id) {
  hfmV74EnsureSponsorTiming();
  if (!state.sponsor && !hfmV74SponsorIsAvailable()) {
    alert('Die Sponsorwahl ist erst nach der ersten simulierten Woche verfügbar.');
    render();
    return;
  }
  return hfmV74SelectSponsorBase(id);
};

const hfmV74StartGameBase = startGame;
startGame = function() {
  state.sponsorTiming = state.sponsorTiming && typeof state.sponsorTiming === 'object' ? state.sponsorTiming : {};
  state.sponsorTiming.availableFromDay = hfmV74SponsorDayKey() + 7;
  state.sponsorTiming.createdForSeason = state.seasonStartYear || 2026;
  return hfmV74StartGameBase();
};

const hfmV74NextWeekBase = nextWeek;
nextWeek = function() {
  hfmV74EnsureSponsorTiming();
  if (state.gameStarted && !state.sponsor && !state.activeMatch && !state.seasonEndModal && !state.seasonStartModal) {
    if (!hfmV74SponsorIsAvailable()) {
      if (typeof hfmV70BeginWeekSimulation === 'function' && !state.weekSimulation?.active) {
        return hfmV70BeginWeekSimulation('week');
      }
    } else {
      render();
      return;
    }
  }
  return hfmV74NextWeekBase();
};

const hfmV74LoadGameBase = loadGame;
loadGame = function() {
  const result = hfmV74LoadGameBase();
  hfmV74EnsureSponsorTiming();
  return result;
};

hfmV74EnsureSponsorTiming();
render();


/* Version 75: Co-Trainer-Hinweise vor dem Spiel nur noch als Newscenter-Info, kein Simulationsstop */
Object.assign(HFM_V68_NEWS_TEMPLATES, {
  PREMATCH_TRAINING_TITLE: "Co-Trainer-Hinweis vor dem Spiel",
  PREMATCH_TRAINING_BODY: "{PLAYER_NAME} wirkt vor dem nächsten Spiel angeschlagen. Fitness: {FITNESS}. Die Meldung wurde nur als Information im Newscenter abgelegt; die Wochensimulation laeuft weiter."
});

function hfmV75IsPrematchTrainingNews(news) {
  return !!news && (news.action_type === "PREMATCH_TRAINING" || news.action_type === "PREMATCH_INFO" || news.sender_id === "assistant_coach");
}

function hfmV75NormalizePrematchTrainingNews() {
  let demotedId = null;
  (state.newsItems || []).forEach(news => {
    if (!hfmV75IsPrematchTrainingNews(news)) return;
    if (news.requires_action || Number(news.priority || 3) <= 2 || news.action_type === "PREMATCH_TRAINING") {
      news.priority = 3;
      news.requires_action = false;
      news.resolved = true;
      news.action_type = "PREMATCH_INFO";
      news.title_template = "PREMATCH_TRAINING_TITLE";
      news.body_template = "PREMATCH_TRAINING_BODY";
      demotedId = news.id;
    }
  });
  const sim = state.weekSimulation;
  if (demotedId && sim && sim.active && sim.interruptNewsId === demotedId) {
    sim.interruptNewsId = null;
    sim.paused = false;
    sim.hidden = false;
    sim.message = "Co-Trainer-Hinweis wurde als News abgelegt. Die Kalendersimulation laeuft weiter.";
    if (typeof hfmV70ScheduleWeekTick === "function") window.setTimeout(() => hfmV70ScheduleWeekTick(220), 0);
  }
  if (state.newsInterruptModalIdV70 && (state.newsItems || []).some(n => n.id === state.newsInterruptModalIdV70 && hfmV75IsPrematchTrainingNews(n))) {
    state.newsInterruptModalIdV70 = null;
  }
}

const hfmV75BlockingNewsBase = hfmV68BlockingNews;
hfmV68BlockingNews = function() {
  hfmV75NormalizePrematchTrainingNews();
  const blocker = typeof hfmV75BlockingNewsBase === "function" ? hfmV75BlockingNewsBase() : null;
  return hfmV75IsPrematchTrainingNews(blocker) ? null : blocker;
};

hfmV70MaybePrematchTrainingWarning = function(day) {
  const date = hfmV70DateFromIso(day.iso);
  if (date.getDay() !== 5) return null;
  const key = `prematch-training-${seasonLabel()}-${state.week}`;
  if (state.lastPrematchTrainingWarningKeyV70 === key) return null;
  const seed = stableHash(`${key}-${ownClubName()}-${state.trainingFocus}`);
  const shouldWarn = (state.week % 3 === 0) || (seed % 100 < 28);
  if (!shouldWarn) return null;
  const candidates = (state.players || []).filter(p => !p.injury && p.loan !== "verliehen");
  if (!candidates.length) return null;
  const player = candidates.sort((a, b) => {
    const af = Number(a.fitness ?? 100) - Number(a.minutes || 0) / 2 - Number(a.strength || 0) / 5;
    const bf = Number(b.fitness ?? 100) - Number(b.minutes || 0) / 2 - Number(b.strength || 0) / 5;
    return af - bf;
  })[0];
  const fitness = Math.max(42, Math.round(Number(player.fitness ?? 100) - 8 - (seed % 15)));
  player.fitness = Math.min(Number(player.fitness ?? 100), fitness);
  state.lastPrematchTrainingWarningKeyV70 = key;
  return hfmV68AddNews({
    timestamp: day.iso,
    category: "MATCH",
    priority: 3,
    scope: "inbox",
    sender_id: "assistant_coach",
    subject_ids: [player.id],
    requires_action: false,
    action_type: "PREMATCH_INFO",
    resolved: true,
    uniqueKey: key,
    title_template: "PREMATCH_TRAINING_TITLE",
    body_template: "PREMATCH_TRAINING_BODY",
    data: { PLAYER_ID: player.id, PLAYER_NAME: player.name, FITNESS: `${fitness}%` }
  });
};

hfmV70GenerateDailyEvents = function(day, index) {
  if (!Array.isArray(day.events)) day.events = [];
  hfmV75NormalizePrematchTrainingNews();
  const hardExisting = hfmV68BlockingNews();
  if (hardExisting) return hardExisting;
  const finance = hfmV70MaybeFinanceUltimatum(day, index);
  if (finance) return finance;
  const transfer = hfmV70MaybeTransferOffer(day, index);
  if (transfer) return transfer;
  const injury = hfmV70MaybeTrainingInjury(day, index);
  if (injury) day.events.push(`Trainingsverletzung: ${hfmV70Plain(hfmV68NewsTitle(injury))}`);
  const contract = hfmV70MaybeContractDeadline(day, index);
  if (contract) return contract;
  const scouting = hfmV70MaybeScoutingInterrupt(day, index);
  if (scouting) return scouting;
  const training = hfmV70MaybePrematchTrainingWarning(day, index);
  if (training) day.events.push(`Co-Trainer-Hinweis im Newscenter abgelegt: ${hfmV70Plain(hfmV68NewsTitle(training))}`);
  const financeInfo = hfmV70MaybeMonthlyFinanceNews(day);
  if (financeInfo) day.events.push("Finanzbericht im Newscenter abgelegt.");
  return null;
};

const hfmV75RenderBase = render;
render = function() {
  if (state.gameStarted) hfmV75NormalizePrematchTrainingNews();
  return hfmV75RenderBase();
};

hfmV75NormalizePrematchTrainingNews();
render();

/* Version 76: Fokusmodus waehrend laufender Spielsimulation */
function hfmV76IsMatchFocusActive() {
  return !!(state && state.gameStarted && state.activeMatch && ['firstReady', 'live', 'halftime', 'finished'].includes(state.activeMatch.phase));
}

function hfmV76ApplyMatchFocusMode() {
  const shell = document.querySelector('.appShell');
  if (!shell) return;
  if (hfmV76IsMatchFocusActive()) {
    shell.classList.add('matchFocusMode');
    document.body.classList.add('matchFocusModeActive');
  } else {
    shell.classList.remove('matchFocusMode');
    document.body.classList.remove('matchFocusModeActive');
  }
}

const hfmV76RenderBase = render;
render = function() {
  const result = hfmV76RenderBase();
  hfmV76ApplyMatchFocusMode();
  return result;
};

const hfmV76EndMatchdayFromResultBase = endMatchdayFromResult;
endMatchdayFromResult = function() {
  const result = hfmV76EndMatchdayFromResultBase();
  hfmV76ApplyMatchFocusMode();
  return result;
};

hfmV76ApplyMatchFocusMode();
render();

/* Version 77: News-Detail ohne Seitensprung, frei sortierbare Tabs, freie Positionsverschiebung und UI-Aufräumung */
const HFM_V77_NAV_DEFAULT = ['dashboard','news','team','market','scouting','club','environment','season','options'];
const HFM_V77_NAV_META = {
  dashboard: ['⌂', 'Home'],
  news: ['📰', 'Newscenter'],
  team: ['⚽', 'Team'],
  market: ['↔', 'Transfers'],
  scouting: ['🔭', 'Scouting'],
  club: ['▣', 'Verein'],
  environment: ['🏟️', 'Stadion'],
  season: ['🏆', 'Saison'],
  options: ['⚙️', 'Optionen']
};

function hfmV77SilentSave() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(HFM_SAVE_KEY, JSON.stringify({ savedAt: new Date().toISOString(), state }));
    }
  } catch (err) {}
}
function hfmV77EnsureNavOrder() {
  if (!Array.isArray(state.navOrder)) state.navOrder = HFM_V77_NAV_DEFAULT.slice();
  const known = new Set(HFM_V77_NAV_DEFAULT);
  state.navOrder = state.navOrder.filter(id => known.has(id));
  HFM_V77_NAV_DEFAULT.forEach(id => { if (!state.navOrder.includes(id)) state.navOrder.push(id); });
}
function hfmV77NavHtml() {
  hfmV77EnsureNavOrder();
  return state.navOrder.map(id => {
    const meta = HFM_V77_NAV_META[id] || [id, id];
    return navButton(id, meta[0], meta[1]);
  }).join('');
}
const hfmV77NavButtonBase = navButton;
navButton = function(id, icon, label) {
  const fixedLabel = id === 'market' ? 'Transfers' : label;
  const html = hfmV77NavButtonBase(id, icon, fixedLabel);
  return html.replace('<button ', `<button data-nav-id="${id}" `);
};
function hfmV77ApplyNavOrderDom() {
  const nav = document.querySelector('.bottomNav');
  if (!nav) return;
  hfmV77EnsureNavOrder();
  const byId = new Map(Array.from(nav.querySelectorAll('[data-nav-id]')).map(btn => [btn.dataset.navId, btn]));
  state.navOrder.forEach(id => { const btn = byId.get(id); if (btn) nav.appendChild(btn); });
  hfmV77EnableNavDrag(nav);
}
function hfmV77EnableNavDrag(nav) {
  if (!nav || nav.dataset.v77DragReady === '1') return;
  nav.dataset.v77DragReady = '1';
  let holdTimer = null;
  let dragged = null;
  let startX = 0;
  const clearHold = () => { if (holdTimer) clearTimeout(holdTimer); holdTimer = null; };
  nav.addEventListener('pointerdown', ev => {
    const btn = ev.target.closest('[data-nav-id]');
    if (!btn) return;
    startX = ev.clientX;
    clearHold();
    holdTimer = setTimeout(() => {
      dragged = btn;
      btn.dataset.draggingNav = '1';
      btn.classList.add('draggingNavTab');
      if (btn.setPointerCapture) btn.setPointerCapture(ev.pointerId);
    }, 420);
  });
  nav.addEventListener('pointermove', ev => {
    if (!dragged) return;
    ev.preventDefault();
    const buttons = Array.from(nav.querySelectorAll('[data-nav-id]')).filter(btn => btn !== dragged);
    const target = buttons.find(btn => ev.clientX < btn.getBoundingClientRect().left + btn.offsetWidth / 2);
    if (target) nav.insertBefore(dragged, target); else nav.appendChild(dragged);
  });
  const finish = ev => {
    clearHold();
    if (!dragged) return;
    const moved = Math.abs(ev.clientX - startX) > 8;
    state.navOrder = Array.from(nav.querySelectorAll('[data-nav-id]')).map(btn => btn.dataset.navId);
    dragged.classList.remove('draggingNavTab');
    dragged.removeAttribute('data-dragging-nav');
    if (moved) {
      ev.preventDefault();
      ev.stopPropagation();
      setTimeout(() => { window.__hfmV77SuppressNavClick = false; }, 80);
      window.__hfmV77SuppressNavClick = true;
    }
    dragged = null;
    hfmV77SilentSave();
  };
  nav.addEventListener('pointerup', finish, true);
  nav.addEventListener('pointercancel', finish, true);
  nav.addEventListener('click', ev => {
    const btn = ev.target.closest('[data-nav-id]');
    if (!btn) return;
    if (window.__hfmV77SuppressNavClick || btn.dataset.draggingNav === '1') {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, true);
}

function hfmV77SetNewsDetailHtml(id) {
  hfmV68EnsureNewsState();
  const item = state.newsItems.find(n => n.id === id);
  if (!item) return false;
  item.read = true;
  state.newsSelectedId = id;
  const items = hfmV68NewsItemsForFilter();
  const selected = item;
  const detail = document.querySelector('.newsDetail');
  if (!detail) return false;
  detail.className = `newsDetail ${!selected.read ? 'unread' : ''}`;
  detail.innerHTML = `<div class="newsDetailHeader"><div><p class="eyebrow">${hfmV68CategoryLabel(selected.category)} · ${hfmV68PriorityLabel(selected.priority)}</p><h2>${hfmV68NewsTitle(selected)}</h2></div>${!selected.read ? '<span class="unreadPill">Ungelesen</span>' : ''}${selected.requires_action && !selected.resolved ? '<span class="requiredBadge">Aktion</span>' : ''}</div><p class="hint">${selected.timestamp} · Absender: ${hfmV68Html(selected.sender_id)}</p><div class="infoBox newsBody">${hfmV68NewsBody(selected)}</div>${hfmV68NewsActionButtons(selected)}<div class="modalActions"><button class="ghost full" onclick="hfmV68GoFromNews('team','lineup')">Zur Aufstellung</button><button class="ghost full" onclick="hfmV68GoFromNews('market')">Zu Transfers</button></div>`;
  document.querySelectorAll('.newsItem').forEach(btn => {
    const isActive = btn.dataset.newsId === id;
    btn.classList.toggle('activeNewsItem', isActive);
    if (isActive) btn.classList.remove('unread');
  });
  return true;
}
hfmV68OpenNewsItem = function(id) {
  if (!hfmV77SetNewsDetailHtml(id)) render();
};
setNewsFilter = function(filter) {
  hfmV68EnsureNewsState();
  state.newsFilter = filter || 'inbox';
  state.newsSelectedId = null;
  render();
};
const hfmV77NewscenterBase = newscenter;
newscenter = function() {
  return hfmV77NewscenterBase()
    .replace(/onclick="hfmV68OpenNewsItem\('([^']+)'\)"/g, 'data-news-id="$1" onclick="hfmV68OpenNewsItem(\'$1\')"')
    .replace('Zum Markt', 'Zu Transfers');
};

function hfmV77CustomLayoutKey() { return state.formation || 'custom'; }
function hfmV77EnsureCustomLayout() {
  if (!state.customFormationLayouts || typeof state.customFormationLayouts !== 'object') state.customFormationLayouts = {};
  const key = hfmV77CustomLayoutKey();
  if (!Array.isArray(state.customFormationLayouts[key])) {
    const base = FORMATION_LAYOUTS[key] || [];
    state.customFormationLayouts[key] = base.map(p => ({ x: p.x, y: p.y }));
  }
  return state.customFormationLayouts[key];
}
const hfmV77ActivePositionsBase = activePositions;
activePositions = function() {
  const positions = FORMATIONS[state.formation] || FORMATIONS['4-4-2'] || [];
  const custom = hfmV77EnsureCustomLayout();
  return positions.map((pos, index) => ({ id: `${pos}-${index}`, pos, index, ...(custom[index] || { x: 50, y: 50 }) }));
};
function hfmV77MoveFormationSlot(slotId, x, y) {
  const slot = activePositions().find(s => s.id === slotId);
  if (!slot) return;
  const custom = hfmV77EnsureCustomLayout();
  custom[slot.index] = { x: clamp(Math.round(x * 10) / 10, 6, 94), y: clamp(Math.round(y * 10) / 10, 7, 93) };
}
function hfmV77EnableFormationDrag() {
  document.querySelectorAll('.visualPitch').forEach(pitch => {
    if (pitch.dataset.v77DragReady === '1') return;
    pitch.dataset.v77DragReady = '1';
    let holdTimer = null, dragged = null, moved = false, pointerId = null;
    const clearHold = () => { if (holdTimer) clearTimeout(holdTimer); holdTimer = null; };
    pitch.addEventListener('pointerdown', ev => {
      const el = ev.target.closest('.fieldPlayer[data-slot-id]');
      if (!el) return;
      moved = false;
      pointerId = ev.pointerId;
      clearHold();
      holdTimer = setTimeout(() => {
        dragged = el;
        dragged.classList.add('draggingFormationSlot');
        if (dragged.setPointerCapture) dragged.setPointerCapture(pointerId);
      }, 360);
    });
    pitch.addEventListener('pointermove', ev => {
      if (!dragged) return;
      ev.preventDefault();
      moved = true;
      const rect = pitch.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 100;
      const y = ((ev.clientY - rect.top) / rect.height) * 100;
      hfmV77MoveFormationSlot(dragged.dataset.slotId, x, y);
      dragged.style.left = `${clamp(x, 6, 94)}%`;
      dragged.style.top = `${clamp(y, 7, 93)}%`;
    });
    const finish = ev => {
      clearHold();
      if (!dragged) return;
      dragged.classList.remove('draggingFormationSlot');
      const suppress = moved;
      dragged = null;
      if (suppress) {
        ev.preventDefault();
        ev.stopPropagation();
        hfmV77SilentSave();
        render();
      }
    };
    pitch.addEventListener('pointerup', finish, true);
    pitch.addEventListener('pointercancel', finish, true);
    pitch.addEventListener('click', ev => {
      if (dragged || ev.target.closest('.draggingFormationSlot')) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }, true);
  });
}

lineup = function() {
  const formationButtons = Object.keys(FORMATIONS).map(f => `<button class="chip ${state.formation === f ? 'selected' : ''}" onclick="setFormation('${f}')">${f}</button>`).join('');
  const detailCards = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const loss = selectedPlayer ? selectedPlayer.strength - eff : 0;
    return `<button class="positionCard ${fit.className}" onclick="openLineupSlot('${slot.id}')"><div class="positionHeader"><span class="positionBadge">${slot.pos}</span><span class="fitTag ${fit.className}">${fit.label}</span></div><strong>${selectedPlayer ? selectedPlayer.name : 'Spieler wählen'}</strong><small>${selectedPlayer ? `${selectedPlayer.age} Jahre · ${stars(selectedPlayer.talent)} · Positionen: ${positionText(selectedPlayer)}` : 'Tippen, um diese Position zu besetzen'}</small><div class="strengthLine"><span>Basis: <b>${selectedPlayer ? selectedPlayer.strength : '-'}</b></span><span>Auf ${slot.pos}: <b>${selectedPlayer ? eff : '-'}</b></span>${loss > 0 ? `<span class="loss">-${loss}</span>` : selectedPlayer ? `<span class="bonus">optimal</span>` : ''}</div></button>`;
  }).join('');
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    return `<button class="fieldPlayer draggablePlayer ${fit.className}" data-slot-id="${slot.id}" style="left:${slot.x}%; top:${slot.y}%;" onclick="openLineupSlot('${slot.id}')" aria-label="${slot.pos} bearbeiten"><span class="fieldPos">${slot.pos}</span><strong>${name}</strong><small>${selectedPlayer ? eff : '+'}</small></button>`;
  }).join('');
  const benchCards = benchSlots().map(slot => {
    const player = state.players.find(p => p.id === Number((state.bench || {})[slot.id]));
    return `<button class="benchCard draggableBench" ${typeof dragAttrs === 'function' ? dragAttrs('bench', slot.id) : ''} onclick="openBenchSlot('${slot.id}')"><span class="benchNumber">Bank ${slot.index + 1}</span><strong>${player ? player.name : 'Spieler wählen'}</strong><small>${player ? `${positionText(player)} · Stärke ${player.strength} · ${stars(player.talent)}` : 'Antippen, um Ersatzspieler zu setzen'}</small></button>`;
  }).join('');
  return `<section class="panel"><p class="eyebrow">Team · Aufstellung</p><div class="chips">${formationButtons}</div><div class="lineupSummary"><span>Formation: <b>${state.formation}</b></span><span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span><span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span></div><div class="visualPitch freeFormationPitch" role="group" aria-label="Visuelle Aufstellung"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>${markers}</div><h3>Ersatzbank</h3><div class="benchGrid">${benchCards}</div><h3>Positionsdetails</h3><div class="pitch detailPitch">${detailCards}</div>${lineupSlotModal()}${benchSlotModal()}</section>`;
};
lineupSlotModal = function() {
  const slot = selectedSlot();
  if (!slot) return '';
  const currentId = Number(state.lineup[slot.id]);
  const used = new Set(Object.entries(state.lineup).filter(([key]) => key !== slot.id).map(([, id]) => Number(id)).filter(Boolean));
  const players = state.players
    .filter(p => p.loan !== 'verliehen' && (!used.has(p.id) || p.id === currentId))
    .map(p => ({ player: p, eff: effectiveStrength(p, slot.pos), fit: positionFit(p, slot.pos), fitScore: positionFit(p, slot.pos).factor }))
    .sort((a, b) => b.fitScore - a.fitScore || b.eff - a.eff || b.player.strength - a.player.strength);
  const choices = players.map(({ player, eff, fit }) => {
    const active = player.id === currentId ? 'activeChoice' : '';
    const loss = player.strength - eff;
    return `<button class="playerChoice ${active}" onclick="setLineupPlayerFromModal('${slot.id}', ${player.id})"><div><strong>${player.name}</strong><span>${positionText(player)} · ${player.age} Jahre · ${stars(player.talent)}</span></div><div class="choiceRight"><b>${eff}</b><small>${fit.label}${loss > 0 ? ` · -${loss}` : ''}</small></div></button>`;
  }).join('');
  return `<div class="lineupModalBackdrop" role="dialog" aria-modal="true"><div class="lineupModal"><div class="modalHeader"><div><p class="eyebrow">Aufstellung</p><h2>${slot.pos} besetzen</h2></div><button class="ghost closeButton" onclick="closeLineupSlot()">Schließen</button></div><button class="playerChoice removeChoice" onclick="setLineupPlayerFromModal('${slot.id}', '')"><strong>Position leer lassen</strong><span>Keinen Spieler aufstellen</span></button><div class="choiceList">${choices}</div></div></div>`;
};
halftimeFormationPitch = function() {
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    const statusBadges = selectedPlayer && typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(selectedPlayer.id, 'small') : '';
    return `<div class="fieldPlayer halftimeFieldPlayer draggablePlayer ${fit.className}" data-slot-id="${slot.id}" ${typeof dragAttrs === 'function' ? dragAttrs('lineup', slot.id) : ''} style="left:${slot.x}%; top:${slot.y}%;" aria-label="${slot.pos}: ${selectedPlayer ? selectedPlayer.name : 'frei'}"><span class="fieldPos">${slot.pos}</span><strong>${name}</strong><small>${selectedPlayer ? eff : '+'}</small>${statusBadges ? `<span class="fieldStatusBadges">${statusBadges}</span>` : ''}</div>`;
  }).join('');
  return `<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>${state.formation}</b></span><span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span><span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span><span>Wechsel: <b>${typeof usedSubstitutionsCount === 'function' ? usedSubstitutionsCount() : 0}/5</b></span></div><div class="visualPitch halftimePitch freeFormationPitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>${markers}</div>`;
};

function hfmV77CleanTacticsView() {
  const groups = Object.entries(TACTIC_OPTIONS).map(([key, cfg]) => `<label class="fieldLabel">${cfg.label}<select onchange="setTactic('${key}', this.value)">${Object.keys(cfg.options).map(o=>`<option value="${o}" ${state.tactics[key]===o?'selected':''}>${o}</option>`).join('')}</select><small>${cfg.options[state.tactics[key]]}</small></label>`).join('');
  const mod = tacticModifier();
  const units = lineupUnitScores();
  return `<section class="panel"><p class="eyebrow">Team · Taktik</p><h2>Mannschaftstaktik</h2>${groups}<div class="grid compact">${card('⚔️','Angriff',`${mod.attack >= 0 ? '+' : ''}${mod.attack}`,'Einfluss auf eigene Tore')}${card('🛡️','Defensive',`${mod.defense >= 0 ? '+' : ''}${mod.defense}`,'Einfluss auf Gegentore')}${card('🎛️','Kontrolle',`${mod.control >= 0 ? '+' : ''}${mod.control}`,'Stabilität im Spiel')}${card('🎲','Risiko',`${mod.risk >= 0 ? '+' : ''}${mod.risk}`,'Schwankung in der Simulation')}${card('🧬','Fähigkeiten',`${mod.skillSynergy >= 0 ? '+' : ''}${mod.skillSynergy}`,'passt die Taktik zum Kader?')}${card('📊','Kaderprofil',`Off ${units.attack} · Def ${units.defense}`,`Kontrolle ${units.control} · Flügel ${units.wings}`)}</div><p class="hint"><b>Aktuell:</b> ${tacticSummaryText()}</p></section>`;
}
tacticsView = hfmV77CleanTacticsView;
training = function() {
  const dir = state.trainingSort || 'desc';
  const players = [...state.players].sort((a, b) => {
    const byProgress = (Number(a.progress || 0) - Number(b.progress || 0));
    return (dir === 'asc' ? byProgress : -byProgress) || b.strength - a.strength;
  });
  const boostedId = boostedPlayerIdThisMonth();
  const list = players.map(player => {
    const isBoosted = boostedId === player.id;
    const boostAvailable = !boostedId;
    const cost = trainingBoostCost(player);
    return `<div class="player"><div class="playerTop"><strong>${player.name}</strong><span>${positionText(player)} · ${player.age} Jahre</span></div><div class="meta"><span>Stärke ${player.strength}/100</span><span class="stars">${stars(player.talent)}</span><span>Trainingsfortschritt ${player.progress}%</span><span>Note ${player.rating.toFixed(1)}</span><span>${player.minutes} Min.</span>${isBoosted ? '<span>Monatsboost aktiv</span>' : ''}</div><div class="bar"><div style="width:${player.progress}%"></div></div><div class="playerBottom"><span>${player.progress}% bis Stärke ${Math.min(100, player.strength + 1)}</span><span>voraussichtlich +${calcDevelopment(player, state.trainingFocus)}% Fortschritt</span></div><div class="playerActions"><button class="ghost" onclick="toggleLoan(${player.id})">${player.loan === 'verliehen' ? 'Leihe zurückholen' : 'Spieler verleihen'}</button><button class="primary" ${boostAvailable ? '' : 'disabled'} onclick="giveTrainingBoost(${player.id})">Monatsboost · ${euro(cost)}</button></div></div>`;
  }).join('');
  return `<section class="panel"><div class="sectionHeader"><div><p class="eyebrow">Team · Training</p><h2>Trainingsübersicht</h2></div><select onchange="setTrainingSort(this.value)"><option value="desc" ${dir === 'desc' ? 'selected' : ''}>Fortschritt absteigend</option><option value="asc" ${dir === 'asc' ? 'selected' : ''}>Fortschritt aufsteigend</option></select></div><div class="playerList">${list}</div></section>`;
};
contractView = function() {
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
  return `<section class="panel"><p class="eyebrow">Team · Vertragsansicht</p><h2>Verträge & Laufzeiten</h2><div class="sectionHeader"><h3>Sortierung</h3><select onchange="setContractSort(this.value)"><option value="asc" ${dir==='asc'?'selected':''}>Vertragslänge aufsteigend</option><option value="desc" ${dir==='desc'?'selected':''}>Vertragslänge absteigend</option></select></div><div class="playerList">${players}</div><h3>Ablösefreie Transferliste</h3><div class="leagueList">${free}</div>${contractNegotiationModal()}</section>`;
};

const hfmV77MarketOverviewBase = typeof marketOverview === 'function' ? marketOverview : null;
marketOverview = function() {
  const tlCount = state.transferListedIds?.length || 0;
  return `<section class="panel"><p class="eyebrow">Transfers</p><h2>Transfers, Suche, Leihen und Beobachtung</h2><div class="grid compact">${card('📋', 'Transferliste', `${tlCount} Spieler`, 'leichter und oft guenstiger kaufbar', "setMarketSection('transferlist')")}${card('🔎', 'Spielersuche', 'Filter bereit', 'alle Vereine und Ligen durchsuchen', "setMarketSection('search')")}${card('⭐', 'Beobachtungsliste', `${state.watchlist.length} Spieler`, 'gespeicherte Kandidaten', "setMarketSection('watchlist')")}${card('🔁', 'Leihen', `${state.players.filter(p => p.loan === 'verliehen').length} verliehen`, 'geliehene und verliehene Spieler', "setMarketSection('loans')")}</div></section>`;
};
const hfmV77SetMarketSectionBase = setMarketSection;
setMarketSection = function(section) {
  state.marketSection = section === 'aiTransfers' ? 'overview' : section;
  render();
};
market = function() {
  if (state.marketSection === 'aiTransfers') state.marketSection = 'overview';
  const content = state.marketSection === 'transferlist' ? transferListView() : state.marketSection === 'search' ? playerSearchView() : state.marketSection === 'watchlist' ? watchlistView() : state.marketSection === 'loans' ? loansView() : marketOverview();
  return `<section class="teamSubnav"><div class="chips">${marketSubButton('overview', 'Übersicht')}${marketSubButton('transferlist', 'Transferliste')}${marketSubButton('search', 'Spielersuche')}${marketSubButton('watchlist', 'Beobachtungsliste')}${marketSubButton('loans', 'Leihen')}</div></section>${content}`;
};

imageView = function() {
  const national = state.clubImage.national;
  const international = state.clubImage.international;
  const total = ownCombinedImage();
  return `<section class="panel"><p class="eyebrow">Verein · Image</p><h2>Vereinsimage</h2><div class="infoBox">Das Image beeinflusst, welche Spieler realistisch zu deinem Verein wechseln wollen. Prime-Spieler von Vereinen mit hohem Image lehnen kleinere Vereine oft ab. Ältere Spieler oder Spieler mit kurzer Vertragslaufzeit sind eher erreichbar.</div><div class="grid compact">${card('🏠', 'Nationales Image', `${national}/100`, imageLabel(national))}${card('🌍', 'Internationales Image', `${international}/100`, imageLabel(international))}${card('⭐', 'Gesamtimage', `${total}/100`, 'wird für Transfers verwendet')}${card('🏆', 'Aktueller Trend', getOwnTablePosition() <= 4 ? 'steigend' : getOwnTablePosition() >= 10 ? 'fallend' : 'stabil', `Tabellenplatz ${getOwnTablePosition()}`)}</div><h3>Wie sich Image verändert</h3><div class="financeGrid"><div class="financeRow positive"><span>Meistertitel</span><strong>starker Imagegewinn</strong></div><div class="financeRow positive"><span>Pokalsieg</span><strong>mittlerer Imagegewinn</strong></div><div class="financeRow positive"><span>Internationaler Erfolg</span><strong>starkes internationales Wachstum</strong></div><div class="financeRow negative"><span>Schlechte Jahre</span><strong>langsamer Imageverlust</strong></div></div></section>`;
};

function hfmV77ZeroTableRowsForLeague(leagueIndex, ownClubNameValue) {
  const clubsRaw = makeLeagueClubs(Number(leagueIndex));
  const clubs = clubsRaw.slice();
  if (ownClubNameValue && !clubs.includes(ownClubNameValue) && clubs.length) clubs[Math.min(6, clubs.length - 1)] = ownClubNameValue;
  return clubs.map((club, i) => ({ pos: i + 1, club, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, diff: 0, points: 0, own: club === ownClubNameValue }));
}
hfmV68BuildTableRowsForLeague = hfmV77ZeroTableRowsForLeague;
hfmV68ApplyCurrentLeagueTable = function(force = false) {
  const leagueIndex = Number(state.startLeagueIndex ?? state.startSetup?.leagueIndex ?? 10);
  const realClubs = makeLeagueClubs(leagueIndex);
  const hasPlayedRealMatch = Boolean(state.matchPlayedWeek || (state.lastMatchdayResults || []).length || CURRENT_TABLE.some(r => Number(r.played || 0) > 0 && Number(r.played || 0) < 7));
  const currentNames = CURRENT_TABLE.map(r => r.club);
  const hasFictional = currentNames.some(name => /Beispielstadt|Bergheim|Hainstadt|Altbrunn|Nordheim|Südstadt|Donaupark|Talblick|Mühlbach|Kronau/.test(String(name)));
  const hasOldFictivePoints = CURRENT_TABLE.some(r => Number(r.played || 0) >= 7 && Number(r.points || 0) > 0 && !state.matchPlayedWeek && !(state.lastMatchdayResults || []).length);
  if (!force && state.realClubNamesAppliedV68 && !hasFictional && !hasOldFictivePoints) return;
  const own = state.clubName && state.clubName !== 'FC Beispielstadt' ? state.clubName : (realClubs[0] || 'FC Red Bull Salzburg');
  state.clubName = own;
  if (!hasPlayedRealMatch || hasOldFictivePoints || force) {
    const rows = hfmV77ZeroTableRowsForLeague(leagueIndex, own);
    if (!rows.some(r => r.own) && rows.length) rows[Math.min(6, rows.length - 1)].own = true;
    CURRENT_TABLE.splice(0, CURRENT_TABLE.length, ...rows);
  }
  state.realClubNamesAppliedV68 = true;
  state.realCurrentLeagueIndexV68 = leagueIndex;
  state.leagueTableCache = {};
};
getLeagueTable = function(leagueIndex) {
  const idx = Number(leagueIndex);
  if (state.gameStarted && idx === Number(state.startLeagueIndex ?? 10)) return CURRENT_TABLE.map(r => ({ ...r, leagueIndex: idx }));
  const cacheKey = `v77-zero:${idx}`;
  state.leagueTableCache = state.leagueTableCache || {};
  if (!state.leagueTableCache[cacheKey]) state.leagueTableCache[cacheKey] = hfmV77ZeroTableRowsForLeague(idx, null).map(r => ({ ...r, leagueIndex: idx, own: false }));
  return state.leagueTableCache[cacheKey];
};
leagueTableView = function() {
  const index = state.selectedLeagueIndex ?? 10;
  const league = LEAGUES[index];
  const rows = getLeagueTable(index).map(row => {
    const r = tableRecord(row);
    return `<tr class="${row.own ? 'ownClub' : ''} clickableRow" onclick="openClubRoster('${row.club}', ${index})"><td>${row.pos}</td><td class="clubNameCell">${row.club}</td><td>${r.played}</td><td>${r.wins}</td><td>${r.draws}</td><td>${r.losses}</td><td>${r.goalsFor}:${r.goalsAgainst}</td><td>${r.diff > 0 ? '+' : ''}${r.diff}</td><td><b>${r.points}</b></td></tr>`;
  }).join('');
  return `<section class="panel"><p class="eyebrow">Saison · Ligen</p><h2>${league.league}</h2><div class="infoBox">${league.country} · ${league.region} · ${league.clubs} Vereine. Tippe auf einen Verein, um den Kader zu öffnen.</div><div class="tableWrap footballTable"><table><thead><tr><th>#</th><th>Verein</th><th>Sp</th><th>S</th><th>U</th><th>N</th><th>Tore</th><th>TD</th><th>Pts</th></tr></thead><tbody>${rows}</tbody></table></div><button class="ghost" onclick="setSeasonSection('world')">Zurück zu allen Ligen</button></section>`;
};

const hfmV77RenderBase = render;
render = function() {
  hfmV68ApplyRealLeagueNames();
  hfmV68EnsureNewsState();
  hfmV68NormalizeStartSetup();
  if (state.gameStarted) {
    hfmV68ApplyCurrentLeagueTable(false);
    hfmV68SeedInitialNews();
  }
  initV36Features();
  ensureTrainingLevelUpQueue();
  if (!state.gameStarted) { document.getElementById('app').innerHTML = startScreen(); hfmV77ApplyAfterRender(); return; }
  if (state.activeMatch?.phase === 'halftime' && state.tab !== 'matchHalftime') state.tab = 'matchHalftime';
  if (state.activeMatch?.phase === 'tacticalStop' && state.tab !== 'matchHalftime') state.tab = 'matchHalftime';
  if (state.activeMatch?.phase === 'finished' && state.tab !== 'matchEnd') state.tab = 'matchEnd';
  const content = state.tab === 'dashboard' ? dashboard()
    : state.tab === 'news' ? newscenter()
      : state.tab === 'team' ? team()
        : state.tab === 'market' ? market()
          : state.tab === 'scouting' ? scouting()
            : state.tab === 'club' ? club()
              : state.tab === 'environment' ? environment()
                : state.tab === 'match' ? matchScreen()
                  : state.tab === 'matchHalftime' ? halftimeScreen()
                    : state.tab === 'matchEnd' ? matchEndScreen()
                      : state.tab === 'options' ? optionsView()
                        : season();
  const matchTheme = isMatchTabForTheme();
  const isLiveSimulation = state.activeMatch?.phase === 'live';
  const unread = hfmV68NewsUnreadCount();
  const actionNews = hfmV68ActionNews().length;
  const newsLine = unread ? `<br>News: <b>${unread} ungelesen${actionNews ? ` · ${actionNews} offen` : ''}</b>` : '';
  const noTransition = isLiveSimulation || state.tab === 'news';
  document.getElementById('app').innerHTML = `<div class="appShell ${matchTheme ? 'matchdayShell' : ''} ${isLiveSimulation ? 'liveSimulationShell' : ''}"><header class="hero ${matchTheme ? 'matchHero' : ''}"><div><p class="eyebrow">Saison ${seasonLabel()} · ${formatGermanDate(currentGameDate())}</p><h1>Handy-Fussballmanager</h1><p>Nächstes Spiel: <b>${formatGermanDate(nextMatchDate())}</b><br>Manager: ${state.manager.name} · ${state.manager.age} Jahre · ${state.manager.country}<br>Verein: ${ownClubName()}<br>Kontostand: <b>${euro(state.money)}</b>${newsLine}</p></div><button class="primary" onclick="headerAction()">${headerActionLabel()}</button></header><main class="${noTransition ? 'noPageTransition' : 'pageTransition'} ${matchTheme ? 'matchMain' : ''} ${isLiveSimulation ? 'liveSimulationMain' : ''}">${content}</main><nav class="bottomNav">${hfmV77NavHtml()}</nav>${seasonEndModal()}${seasonStartModal()}${sponsorModal()}${trainingLevelUpModal()}${matchDayModal()}${postMatchWindowModal()}${youthDiscoveryModal()}${playerProfileModal()}</div>`;
  hfmV77ApplyAfterRender();
};
function hfmV77ApplyAfterRender() {
  hfmV77ApplyNavOrderDom();
  hfmV77EnableFormationDrag();
  document.querySelectorAll('.bottomNav [data-nav-id="market"] span').forEach(el => { el.textContent = 'Transfers'; });
}

render();

/* Version 77 Zusatz: Halbzeit-Anpassungen ohne erklaerende Infoboxen */
halftimeChangeScreen = function() {
  const current = ["report", "formation", "tactic"].includes(state.halftimeEditSection) ? state.halftimeEditSection : "report";
  const match = state.activeMatch;
  const minute = match && match.phase === "tacticalStop" ? Number(match.currentMinute || match.tacticalStop && match.tacticalStop.minute || 0) : 45;
  const menuTitle = match && match.phase === "tacticalStop" ? `Taktikstopp · ${minute}. Minute` : "Halbzeit-Menue";
  const reportTitle = match && match.phase === "tacticalStop" ? `Spielbericht bis zur ${minute}. Minute` : "Spielbericht zur Halbzeit";
  if (current === "report") {
    return `<h3>${menuTitle}</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>${reportTitle}</h3>${match ? matchStatRows(matchStatsForHalf(minute)) : ""}${matchStatusOverview()}${hfmV71LiveRatingTable(minute, match && match.phase === "tacticalStop" ? "Aktuelle Spielernoten" : "Benotung 1. Halbzeit")}<h3>Wichtige Ereignisse</h3>${importantEventList(match && match.log || [])}</div>`;
  }
  if (current === "tactic") {
    return `<h3>${menuTitle}</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Taktik aendern</h3>${tacticsView()}</div>`;
  }
  return `<h3>${menuTitle}</h3>${halftimeEditTabs()}<div class="halftimeEditBox"><h3>Formation aendern</h3><div class="chips">${formationButtonsForMatch()}</div>${halftimeFormationPitch()}<h3>Wechsel</h3><div class="subGrid">${halftimeSubControls()}</div></div>`;
};

render();

/* Version 78: Automatische Positions-Erkennung bei freiem Verschieben + Spielerwahl weiter oben */
function hfmV78BaseFormationPos(index) {
  const base = (FORMATIONS[state.formation] || FORMATIONS['4-4-2'] || []);
  return base[index] || 'ZM';
}
function hfmV78InferPositionFromCoordinates(x, y) {
  const xx = Number(x);
  const yy = Number(y);

  // Das Spielfeld ist von oben nach unten gelesen: Angriff -> Mittelfeld -> Abwehr -> Tor.
  // Wide-Spieler werden deshalb nicht nur in LA/RA und LV/RV geteilt, sondern besitzen
  // eine echte Zwischenzone fuer LM/RM zwischen Aussenverteidiger und Aussenstuermer.
  if (yy >= 84) return 'TW';

  // Abwehrreihe
  if (yy >= 67) {
    if (xx < 31) return 'LV';
    if (xx > 69) return 'RV';
    return 'IV';
  }

  // defensives Mittelfeld / breite Mittelfeldspieler
  if (yy >= 55) {
    if (xx < 31) return 'LM';
    if (xx > 69) return 'RM';
    return 'DM';
  }

  // zentrales Mittelfeld / breite Mittelfeldspieler
  if (yy >= 39) {
    if (xx < 31) return 'LM';
    if (xx > 69) return 'RM';
    return 'ZM';
  }

  // offensives Mittelfeld: breite Spieler bleiben hier noch LM/RM,
  // erst ganz vorne werden sie automatisch LA/RA.
  if (yy >= 28) {
    if (xx < 31) return 'LM';
    if (xx > 69) return 'RM';
    return 'OM';
  }

  // Sturmreihe
  if (xx < 31) return 'LA';
  if (xx > 69) return 'RA';
  return 'ST';
}
function hfmV78EnsureCustomPositionStore() {
  if (!state.customFormationPositions || typeof state.customFormationPositions !== 'object') state.customFormationPositions = {};
  const key = hfmV77CustomLayoutKey();
  const base = FORMATIONS[state.formation] || FORMATIONS['4-4-2'] || [];
  if (!Array.isArray(state.customFormationPositions[key]) || state.customFormationPositions[key].length !== base.length) {
    state.customFormationPositions[key] = base.slice();
  }
  return state.customFormationPositions[key];
}
activePositions = function() {
  const basePositions = FORMATIONS[state.formation] || FORMATIONS['4-4-2'] || [];
  const customLayout = hfmV77EnsureCustomLayout();
  const customPositions = hfmV78EnsureCustomPositionStore();
  return basePositions.map((basePos, index) => ({
    id: `${basePos}-${index}`,
    basePos,
    pos: customPositions[index] || basePos,
    index,
    ...(customLayout[index] || { x: 50, y: 50 })
  }));
};
function hfmV78MoveFormationSlot(slotId, x, y) {
  const slot = activePositions().find(s => s.id === slotId);
  if (!slot) return;
  const custom = hfmV77EnsureCustomLayout();
  const customPositions = hfmV78EnsureCustomPositionStore();
  const nx = clamp(Math.round(Number(x) * 10) / 10, 6, 94);
  const ny = clamp(Math.round(Number(y) * 10) / 10, 7, 93);
  custom[slot.index] = { x: nx, y: ny };
  customPositions[slot.index] = hfmV78InferPositionFromCoordinates(nx, ny);
}
hfmV77MoveFormationSlot = hfmV78MoveFormationSlot;

function hfmV78PositionChangeHint(slot) {
  return slot.basePos && slot.basePos !== slot.pos ? `<span class="fitTag good">frei: ${slot.basePos} → ${slot.pos}</span>` : '';
}

lineup = function() {
  const formationButtons = Object.keys(FORMATIONS).map(f => `<button class="chip ${state.formation === f ? 'selected' : ''}" onclick="setFormation('${f}')">${f}</button>`).join('');
  const detailCards = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const loss = selectedPlayer ? selectedPlayer.strength - eff : 0;
    return `<button class="positionCard ${fit.className}" onclick="openLineupSlot('${slot.id}')"><div class="positionHeader"><span class="positionBadge">${slot.pos}</span><span class="fitTag ${fit.className}">${fit.label}</span></div>${hfmV78PositionChangeHint(slot)}<strong>${selectedPlayer ? selectedPlayer.name : 'Spieler wählen'}</strong><small>${selectedPlayer ? `${selectedPlayer.age} Jahre · ${stars(selectedPlayer.talent)} · Positionen: ${positionText(selectedPlayer)}` : 'Tippen, um diese Position zu besetzen'}</small><div class="strengthLine"><span>Basis: <b>${selectedPlayer ? selectedPlayer.strength : '-'}</b></span><span>Auf ${slot.pos}: <b>${selectedPlayer ? eff : '-'}</b></span>${loss > 0 ? `<span class="loss">-${loss}</span>` : selectedPlayer ? `<span class="bonus">optimal</span>` : ''}</div></button>`;
  }).join('');
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    return `<button class="fieldPlayer draggablePlayer ${fit.className}" data-slot-id="${slot.id}" style="left:${slot.x}%; top:${slot.y}%;" onclick="openLineupSlot('${slot.id}')" aria-label="${slot.pos} bearbeiten"><span class="fieldPos">${slot.pos}</span><strong>${name}</strong><small>${selectedPlayer ? eff : '+'}</small></button>`;
  }).join('');
  const benchCards = benchSlots().map(slot => {
    const player = state.players.find(p => p.id === Number((state.bench || {})[slot.id]));
    return `<button class="benchCard draggableBench" ${typeof dragAttrs === 'function' ? dragAttrs('bench', slot.id) : ''} onclick="openBenchSlot('${slot.id}')"><span class="benchNumber">Bank ${slot.index + 1}</span><strong>${player ? player.name : 'Spieler wählen'}</strong><small>${player ? `${positionText(player)} · Stärke ${player.strength} · ${stars(player.talent)}` : 'Antippen, um Ersatzspieler zu setzen'}</small></button>`;
  }).join('');
  return `<section class="panel"><p class="eyebrow">Team · Aufstellung</p><div class="chips">${formationButtons}</div><div class="lineupSummary"><span>Formation: <b>${state.formation}</b></span><span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span><span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span></div><div class="visualPitch freeFormationPitch" role="group" aria-label="Visuelle Aufstellung"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>${markers}</div><h3>Ersatzbank</h3><div class="benchGrid">${benchCards}</div><h3>Positionsdetails</h3><div class="pitch detailPitch">${detailCards}</div>${lineupSlotModal()}${benchSlotModal()}</section>`;
};

halftimeFormationPitch = function() {
  const markers = activePositions().map(slot => {
    const selectedId = state.lineup[slot.id];
    const selectedPlayer = state.players.find(p => p.id === Number(selectedId));
    const fit = positionFit(selectedPlayer, slot.pos);
    const eff = selectedPlayer ? effectiveStrength(selectedPlayer, slot.pos) : 0;
    const name = selectedPlayer ? selectedPlayer.name.split(' ').slice(-1)[0] : 'frei';
    const statusBadges = selectedPlayer && typeof getMatchStatusBadges === 'function' ? getMatchStatusBadges(selectedPlayer.id, 'small') : '';
    return `<div class="fieldPlayer halftimeFieldPlayer draggablePlayer ${fit.className}" data-slot-id="${slot.id}" ${typeof dragAttrs === 'function' ? dragAttrs('lineup', slot.id) : ''} style="left:${slot.x}%; top:${slot.y}%;" aria-label="${slot.pos}: ${selectedPlayer ? selectedPlayer.name : 'frei'}"><span class="fieldPos">${slot.pos}</span><strong>${name}</strong><small>${selectedPlayer ? eff : '+'}</small>${statusBadges ? `<span class="fieldStatusBadges">${statusBadges}</span>` : ''}</div>`;
  }).join('');
  return `<div class="lineupSummary halftimeLineupSummary"><span>Formation: <b>${state.formation}</b></span><span>Effektive Startelf Ø <b>${lineupStrength()}/100</b></span><span>Positionsprobleme: <b>${lineupPenaltyCount()}</b></span><span>Wechsel: <b>${typeof usedSubstitutionsCount === 'function' ? usedSubstitutionsCount() : 0}/5</b></span></div><div class="visualPitch halftimePitch freeFormationPitch" role="group" aria-label="Visuelle Formation in der Halbzeit"><div class="pitchStripe one"></div><div class="pitchStripe two"></div><div class="pitchCenter"></div><div class="goal top"></div><div class="goal bottom"></div>${markers}</div>`;
};

lineupSlotModal = function() {
  const slot = selectedSlot();
  if (!slot) return '';
  const currentId = Number(state.lineup[slot.id]);
  const used = new Set(Object.entries(state.lineup).filter(([key]) => key !== slot.id).map(([, id]) => Number(id)).filter(Boolean));
  const players = state.players
    .filter(p => p.loan !== 'verliehen' && (!used.has(p.id) || p.id === currentId))
    .map(p => ({ player: p, eff: effectiveStrength(p, slot.pos), fit: positionFit(p, slot.pos), fitScore: positionFit(p, slot.pos).factor }))
    .sort((a, b) => b.fitScore - a.fitScore || b.eff - a.eff || b.player.strength - a.player.strength);
  const choices = players.map(({ player, eff, fit }) => {
    const active = player.id === currentId ? 'activeChoice' : '';
    const loss = player.strength - eff;
    return `<button class="playerChoice ${active}" onclick="setLineupPlayerFromModal('${slot.id}', ${player.id})"><div><strong>${player.name}</strong><span>${positionText(player)} · ${player.age} Jahre · ${stars(player.talent)}</span></div><div class="choiceRight"><b>${eff}</b><small>${fit.label}${loss > 0 ? ` · -${loss}` : ''}</small></div></button>`;
  }).join('');
  return `<div class="lineupModalBackdrop lineupModalTop" role="dialog" aria-modal="true"><div class="lineupModal"><div class="modalHeader"><div><p class="eyebrow">Aufstellung</p><h2>${slot.pos} besetzen</h2></div><button class="ghost closeButton" onclick="closeLineupSlot()">Schließen</button></div><button class="playerChoice removeChoice" onclick="setLineupPlayerFromModal('${slot.id}', '')"><strong>Position leer lassen</strong><span>Keinen Spieler aufstellen</span></button><div class="choiceList">${choices}</div></div></div>`;
};

const hfmV78RenderBase = render;
render = function() {
  const result = hfmV78RenderBase();
  if (state.gameStarted) hfmV78EnsureCustomPositionStore();
  return result;
};

try { hfmV78EnsureCustomPositionStore(); } catch (err) {}
render();

/* Version 80: Logikbasierte Newgen-/Spielergenerierung mit Positionsquoten */
const HFM_V80_POSITION_ORDER = ['TW','LV','IV','RV','DM','ZM','OM','LM','RM','LA','RA','ST'];
const HFM_V80_MARKET_DEPTH_TARGET = { TW: 3, LV: 4, IV: 6, RV: 4, DM: 4, ZM: 6, OM: 4, LM: 4, RM: 4, LA: 4, RA: 4, ST: 6 };
const HFM_V80_SQUAD_BLUEPRINT = { TW: 2, LV: 2, IV: 4, RV: 2, DM: 2, ZM: 3, OM: 2, LM: 2, RM: 2, LA: 2, RA: 2, ST: 3 };
const HFM_V80_COUNTRY_YOUTH_RATING = {
  Brasilien: 180, Argentinien: 168, Spanien: 165, Frankreich: 162, Deutschland: 160, England: 156,
  Italien: 150, Niederlande: 148, Portugal: 145, Belgien: 138, Kroatien: 132, Serbien: 124,
  Österreich: 104, Schweiz: 102, Türkei: 115, USA: 105, Kanada: 96, Mexiko: 112,
  Dänemark: 112, Schottland: 92, Griechenland: 90, Tschechien: 98, International: 100
};
const HFM_V80_SECONDARY_BY_POS = {
  TW: [], LV: ['LM','IV'], IV: ['DM','RV','LV'], RV: ['RM','IV'], DM: ['ZM','IV'],
  ZM: ['DM','OM'], OM: ['ZM','ST'], LM: ['LA','LV'], RM: ['RA','RV'],
  LA: ['LM','RA','ST'], RA: ['RM','LA','ST'], ST: ['LA','RA','OM']
};
const HFM_V80_POSITION_SKILL_PRIORITIES = {
  TW: ['reflexe','handling','kommunikation','stellungsspiel','sprungkraft'],
  LV: ['schnelligkeit','flanken','zweikampf','ausdauer','stellungsspiel'],
  IV: ['stellungsspiel','zweikampf','sprungkraft','antizipation','kommunikation'],
  RV: ['schnelligkeit','flanken','zweikampf','ausdauer','stellungsspiel'],
  DM: ['zweikampf','antizipation','passspiel','stellungsspiel','ausdauer'],
  ZM: ['passspiel','technik','uebersicht','ausdauer','antizipation'],
  OM: ['technik','uebersicht','passspiel','dribbling','abschluss'],
  LM: ['schnelligkeit','flanken','dribbling','ausdauer','technik'],
  RM: ['schnelligkeit','flanken','dribbling','ausdauer','technik'],
  LA: ['schnelligkeit','dribbling','abschluss','flanken','technik'],
  RA: ['schnelligkeit','dribbling','abschluss','flanken','technik'],
  ST: ['abschluss','torriecher','schnelligkeit','sprungkraft','technik']
};
function hfmV80EnsureState() {
  if (!state.newgenSystem || typeof state.newgenSystem !== 'object') state.newgenSystem = {};
  if (!Array.isArray(state.newgenSystem.history)) state.newgenSystem.history = [];
  if (!state.newgenSystem.lastMarketFillSeason) state.newgenSystem.lastMarketFillSeason = '';
  if (!state.newgenSystem.lastYouthIntakeSeason) state.newgenSystem.lastYouthIntakeSeason = '';
}
function hfmV80Pick(arr, seedText) {
  if (!arr.length) return null;
  return arr[stableHash(String(seedText)) % arr.length];
}
function hfmV80WeightedPick(items, seedText) {
  const total = items.reduce((s, i) => s + Math.max(0, Number(i.weight || 0)), 0) || 1;
  let roll = stableHash(String(seedText)) % Math.round(total * 1000);
  roll = roll / 1000;
  for (const item of items) {
    roll -= Math.max(0, Number(item.weight || 0));
    if (roll <= 0) return item.value;
  }
  return items[items.length - 1]?.value;
}
function hfmV80PositionCounts(players) {
  const counts = Object.fromEntries(HFM_V80_POSITION_ORDER.map(p => [p, 0]));
  (players || []).forEach(p => {
    const pos = p?.pos;
    if (counts[pos] !== undefined) counts[pos] += 1;
  });
  return counts;
}
function hfmV80NeededPosition(players, targets, seedText) {
  const counts = hfmV80PositionCounts(players);
  const weighted = HFM_V80_POSITION_ORDER.map(pos => {
    const target = Number(targets[pos] || 2);
    const gap = Math.max(0, target - Number(counts[pos] || 0));
    const base = pos === 'TW' ? 0.75 : ['IV','ZM','ST'].includes(pos) ? 1.25 : 1;
    return { value: pos, weight: gap > 0 ? gap * 8 + base : base * 0.45 };
  });
  return hfmV80WeightedPick(weighted, seedText) || 'ZM';
}
function hfmV80NationalityForLeague(leagueIndex, seedText) {
  const country = LEAGUES[Number(leagueIndex)]?.country || 'International';
  const pools = {
    England: ['England','Schottland','Irland','Frankreich'], Spanien: ['Spanien','Argentinien','Uruguay','Brasilien'],
    Italien: ['Italien','Kroatien','Serbien','Argentinien'], Deutschland: ['Deutschland','Österreich','Schweiz','Niederlande'],
    Frankreich: ['Frankreich','Belgien','Marokko','Algerien'], Portugal: ['Portugal','Brasilien','Angola'],
    Niederlande: ['Niederlande','Belgien','Suriname'], Belgien: ['Belgien','Frankreich','Niederlande'],
    Türkei: ['Türkei','Deutschland','Georgien'], Schottland: ['Schottland','England','Irland'],
    Österreich: ['Österreich','Deutschland','Slowenien','Kroatien'], Schweiz: ['Schweiz','Deutschland','Frankreich'],
    Dänemark: ['Dänemark','Schweden','Norwegen'], Griechenland: ['Griechenland','Serbien','Kroatien'],
    Tschechien: ['Tschechien','Slowakei','Kroatien'], 'USA/Kanada': ['USA','Kanada','Mexiko','Kolumbien'],
    Südamerika: ['Brasilien','Argentinien','Kolumbien','Uruguay']
  };
  return hfmV80Pick(pools[country] || [country, 'International'], seedText) || 'International';
}
function hfmV80TalentByYouthRating(nationality, seedText, facilityBonus = 0) {
  const rating = Number(HFM_V80_COUNTRY_YOUTH_RATING[nationality] || 100);
  const roll = (stableHash(String(seedText)) % 1000) / 1000;
  const quality = roll + (rating - 100) / 520 + facilityBonus;
  if (quality >= 0.93) return 5;
  if (quality >= 0.70) return 4;
  if (quality >= 0.38) return 3;
  if (quality >= 0.16) return 2;
  return 1;
}
function hfmV80Name(nationality, seedText) {
  const first = {
    Österreich: ['Lukas','Noah','Elias','Matteo','Fabian','David','Leon','Samuel'], Deutschland: ['Jonas','Leon','Finn','Moritz','Timo','Julian','Niklas'],
    Brasilien: ['Joao','Lucas','Rafael','Bruno','Matheus','Gabriel'], Argentinien: ['Mateo','Thiago','Santino','Nicolas','Lautaro'],
    Spanien: ['Pablo','Hugo','Izan','Alejandro','Diego'], Frankreich: ['Theo','Lucas','Enzo','Noam','Kylian'],
    England: ['Jack','Oliver','Harry','Mason','George'], Italien: ['Luca','Marco','Gabriele','Nicolo','Andrea'],
    Niederlande: ['Daan','Sem','Milan','Jens','Luuk'], Portugal: ['Tiago','Diogo','Goncalo','Andre','Rui']
  };
  const last = {
    Österreich: ['Hofer','Gruber','Schmid','Pichler','Auer','Moser','Lechner'], Deutschland: ['Meyer','Schmidt','Weber','Fischer','Klein','Bauer'],
    Brasilien: ['Silva','Santos','Costa','Oliveira','Pereira'], Argentinien: ['Garcia','Fernandez','Rojas','Medina','Romero'],
    Spanien: ['Garcia','Lopez','Martinez','Sanchez','Torres'], Frankreich: ['Dubois','Martin','Lefevre','Bernard','Petit'],
    England: ['Smith','Brown','Taylor','Wilson','Walker'], Italien: ['Rossi','Bianchi','Esposito','Romano','Costa'],
    Niederlande: ['de Jong','van Dijk','Bakker','Visser','Smit'], Portugal: ['Ferreira','Pereira','Costa','Santos','Moreira']
  };
  const f = hfmV80Pick(first[nationality] || ['Alex','Milan','Daniel','Leo','Marco'], `${seedText}-f`);
  const l = hfmV80Pick(last[nationality] || ['Novak','Kovac','Horvat','Meyer','Silva'], `${seedText}-l`);
  return `${f} ${l}`;
}
function hfmV80ApplySkillTemplate(player, seedText) {
  const p = ensurePlayerSkillProfile(player);
  const pri = HFM_V80_POSITION_SKILL_PRIORITIES[p.pos] || HFM_V80_POSITION_SKILL_PRIORITIES.ZM;
  const base = Number(p.strength || 45);
  if (!p.skills) p.skills = generateSkillSet(p);
  PLAYER_SKILLS.forEach(skill => {
    const rank = pri.indexOf(skill);
    const bonus = rank >= 0 ? 7 - rank : -3;
    const noise = ((stableHash(`${seedText}-${skill}`) % 9) - 4);
    p.skills[skill] = clamp(Math.round(base + bonus + noise), 1, 100);
  });
  p.strength = typeof overallForPosition === 'function' ? overallForPosition(p, p.pos) : p.strength;
  return p;
}
function hfmV80CreateNewgen({ pos, clubName = 'Ablösefrei', leagueIndex = OWN_LEAGUE_INDEX, ageMin = 15, ageMax = 19, purpose = 'market', seed = '' } = {}) {
  const league = LEAGUES[Number(leagueIndex)] || LEAGUES[OWN_LEAGUE_INDEX];
  const seedText = `${seasonLabel()}-${purpose}-${clubName}-${leagueIndex}-${pos}-${seed}-${state.newgenSystem?.history?.length || 0}`;
  const nationality = hfmV80NationalityForLeague(leagueIndex, seedText);
  const facilityBonus = purpose === 'academy' ? ((state.facilities?.academy?.level || 1) * 0.018 + (state.facilities?.youthCenter?.level || 1) * 0.012) : 0;
  const talent = hfmV80TalentByYouthRating(nationality, `${seedText}-talent`, facilityBonus);
  const age = ageMin + (stableHash(`${seedText}-age`) % Math.max(1, ageMax - ageMin + 1));
  const tierBoost = league.tier === 'Topliga' ? 10 : league.tier === 'Stark' ? 6 : league.tier === 'Mittel' ? 3 : 2;
  const youthQuality = Math.round((Number(HFM_V80_COUNTRY_YOUTH_RATING[nationality] || 100) - 100) / 18);
  const rawStrength = 30 + talent * 4 + tierBoost + youthQuality + (stableHash(`${seedText}-str`) % 10) - Math.max(0, ageMin + 2 - age);
  const strength = clamp(rawStrength, purpose === 'academy' ? 26 : 34, purpose === 'academy' ? 62 : 72);
  const player = hfmV80ApplySkillTemplate({
    id: `ng-${seasonLabel()}-${stableHash(seedText)}`,
    name: hfmV80Name(nationality, seedText), age, nationality,
    pos: pos || 'ZM', secondary: HFM_V80_SECONDARY_BY_POS[pos || 'ZM'] || [], strength, talent,
    progress: stableHash(`${seedText}-progress`) % 60,
    rating: 3.0, minutes: 0, youth: purpose === 'academy', loan: null,
    salary: Math.round((strength * 760 + talent * 2100) / 1000) * 1000,
    marketValue: Math.round((strength * strength * 860 + talent * 78000 + Math.max(0, 24 - age) * 36000) / 10000) * 10000,
    contractYears: purpose === 'market' ? 0 : 2,
    club: purpose === 'market' ? HFM_V65_FREE_AGENT : clubName,
    leagueIndex: Number(leagueIndex), newgen: true, generatedSeason: seasonLabel(), generationPurpose: purpose
  }, seedText);
  return player;
}
function hfmV80FillFreeAgentMarket(force = false) {
  hfmV80EnsureState();
  if (!Array.isArray(state.transferFreeAgents)) state.transferFreeAgents = [];
  const seasonKey = seasonLabel();
  if (!force && state.newgenSystem.lastMarketFillSeason === seasonKey && state.transferFreeAgents.some(p => p.newgen)) return [];
  const created = [];
  HFM_V80_POSITION_ORDER.forEach(pos => {
    const counts = hfmV80PositionCounts(state.transferFreeAgents.filter(p => Number(p.age || 0) <= 30));
    const target = HFM_V80_MARKET_DEPTH_TARGET[pos] || 3;
    const missing = Math.max(0, target - Number(counts[pos] || 0));
    for (let i = 0; i < missing; i += 1) {
      const ng = hfmV80CreateNewgen({ pos, purpose: 'market', leagueIndex: OWN_LEAGUE_INDEX, ageMin: 17, ageMax: 23, seed: `free-${pos}-${i}` });
      state.transferFreeAgents.push(ng);
      created.push(ng);
    }
  });
  state.newgenSystem.lastMarketFillSeason = seasonKey;
  if (created.length) state.newgenSystem.history.unshift({ season: seasonKey, type: 'market', count: created.length, date: formatGermanDate(currentGameDate()) });
  state.newgenSystem.history = state.newgenSystem.history.slice(0, 20);
  return created;
}
function hfmV80GenerateYouthIntake(force = false) {
  hfmV80EnsureState();
  if (!Array.isArray(state.academyPlayers)) state.academyPlayers = [];
  const seasonKey = seasonLabel();
  if (!force && state.newgenSystem.lastYouthIntakeSeason === seasonKey) return [];
  const academyLevel = Number(state.facilities?.academy?.level || 1);
  const youthLevel = Number(state.facilities?.youthCenter?.level || 1);
  const targetCount = Math.min(10, 4 + Math.floor(academyLevel / 3) + Math.floor(youthLevel / 4));
  const poolForDemand = [...(state.players || []), ...(state.academyPlayers || [])];
  const created = [];
  for (let i = 0; i < targetCount; i += 1) {
    const pos = hfmV80NeededPosition([...poolForDemand, ...created], HFM_V80_SQUAD_BLUEPRINT, `academy-${seasonKey}-${i}`);
    created.push(hfmV80CreateNewgen({ pos, purpose: 'academy', leagueIndex: state.startLeagueIndex ?? OWN_LEAGUE_INDEX, clubName: ownClubName(), ageMin: 14, ageMax: 18, seed: `academy-${i}` }));
  }
  state.academyPlayers.push(...created);
  state.newgenSystem.lastYouthIntakeSeason = seasonKey;
  if (created.length) state.newgenSystem.history.unshift({ season: seasonKey, type: 'academy', count: created.length, date: formatGermanDate(currentGameDate()) });
  state.newgenSystem.history = state.newgenSystem.history.slice(0, 20);
  if (created.length && typeof hfmV68AddNews === 'function') {
    hfmV68AddNews({ category: 'YOUTH', priority: 3, scope: 'inbox', sender_id: 'academy', uniqueKey: `youth-intake-${seasonKey}`, title_template: 'Jugendaufnahme abgeschlossen', body_template: `${created.length} neue Jugendspieler wurden positionslogisch erzeugt. Fehlende Kaderbereiche wurden dabei bevorzugt aufgefüllt.`, data: {} });
  }
  return created;
}
function hfmV80BalanceRoster(roster, clubName, leagueIndex, maxSize = 26) {
  if (!Array.isArray(roster)) return [];
  const balanced = roster.map(p => hfmV65NormalizeExternalPlayer ? hfmV65NormalizeExternalPlayer(p, clubName, leagueIndex) : ensurePlayerSkillProfile(p));
  const target = { TW: 2, LV: 1, IV: 3, RV: 1, DM: 1, ZM: 2, OM: 1, LM: 1, RM: 1, LA: 1, RA: 1, ST: 2 };
  let guard = 0;
  while (balanced.length < maxSize && guard < 40) {
    const pos = hfmV80NeededPosition(balanced, target, `${clubName}-${leagueIndex}-squad-${guard}`);
    balanced.push(hfmV80CreateNewgen({ pos, purpose: 'squad', clubName, leagueIndex, ageMin: 17, ageMax: 29, seed: `squad-${guard}` }));
    guard += 1;
    const counts = hfmV80PositionCounts(balanced);
    const missing = Object.entries(target).some(([p, t]) => Number(counts[p] || 0) < Number(t));
    if (!missing && balanced.length >= 23) break;
  }
  return balanced.slice(0, maxSize);
}
const hfmV80GenerateYouthPlayerBase = generateYouthPlayer;
generateYouthPlayer = function() {
  hfmV80EnsureState();
  const pos = hfmV80NeededPosition([...(state.players || []), ...(state.academyPlayers || [])], HFM_V80_SQUAD_BLUEPRINT, `single-youth-${state.week}-${state.academyPlayers?.length || 0}`);
  return hfmV80CreateNewgen({ pos, purpose: 'academy', leagueIndex: state.startLeagueIndex ?? OWN_LEAGUE_INDEX, clubName: ownClubName(), ageMin: 14, ageMax: 18, seed: `single-${Date.now ? Date.now() : state.week}` });
};
const hfmV80MakeExternalPlayerBase = makeExternalPlayer;
makeExternalPlayer = function(clubName, index, leagueIndex = OWN_LEAGUE_INDEX) {
  const pos = hfmV80NeededPosition([], HFM_V80_SQUAD_BLUEPRINT, `${clubName}-${leagueIndex}-${index}-external`);
  return hfmV80CreateNewgen({ pos, purpose: 'squad', clubName, leagueIndex, ageMin: 17, ageMax: 34, seed: `external-${index}` });
};
const hfmV80GetClubRosterBase = getClubRoster;
getClubRoster = function(clubName, leagueIndex = OWN_LEAGUE_INDEX) {
  const key = `${Number(leagueIndex)}:${clubName}`;
  const roster = hfmV80GetClubRosterBase(clubName, leagueIndex);
  if (!state.clubRosterCache) state.clubRosterCache = {};
  state.clubRosterCache[key] = hfmV80BalanceRoster(roster, clubName, Number(leagueIndex), 26);
  return state.clubRosterCache[key];
};
const hfmV80BeginNewSeasonBase = beginNewSeason;
beginNewSeason = function() {
  const result = hfmV80BeginNewSeasonBase();
  hfmV80EnsureState();
  hfmV80GenerateYouthIntake(true);
  hfmV80FillFreeAgentMarket(true);
  return result;
};
const hfmV80StartGameBase = startGame;
startGame = function() {
  const result = hfmV80StartGameBase();
  hfmV80EnsureState();
  hfmV80FillFreeAgentMarket(false);
  return result;
};
const hfmV80LoadGameBase = loadGame;
loadGame = function() {
  const result = hfmV80LoadGameBase();
  hfmV80EnsureState();
  hfmV80FillFreeAgentMarket(false);
  return result;
};
function hfmV80GenerationInfoBox() {
  hfmV80EnsureState();
  const counts = hfmV80PositionCounts([...(state.transferFreeAgents || []), ...(state.academyPlayers || [])]);
  const weakest = HFM_V80_POSITION_ORDER.slice().sort((a,b) => (counts[a] || 0) - (counts[b] || 0)).slice(0,3).map(p => `${p}: ${counts[p] || 0}`).join(' · ');
  return `<div class="infoBox"><b>Spielergenerierung aktiv:</b> Newgens werden nicht rein zufaellig erzeugt. Das System nutzt Positionsquoten, Marktbedarf, Jugendrating nach Land und positionsspezifische Attribut-Templates. Niedrigste Tiefe aktuell: ${weakest}.</div>`;
}
const hfmV80YouthViewBase = typeof youthView === 'function' ? youthView : null;
if (hfmV80YouthViewBase) {
  youthView = function() {
    const html = hfmV80YouthViewBase();
    return html.replace('<div class="playerList">', `${hfmV80GenerationInfoBox()}<div class="playerList">`);
  };
}

hfmV80EnsureState();
hfmV80FillFreeAgentMarket(false);
try { render(); } catch (err) {}

/* Version 81: Kalenderbutton immer ueber Home mit sichtbarer Kalendersimulation */
function hfmV81CanUseCalendarOverlay() {
  return !!(state.gameStarted && !state.activeMatch && !state.seasonEndModal && !state.seasonStartModal && state.sponsor && typeof hfmV70BeginWeekSimulation === 'function');
}
function hfmV81GoHomeBeforeCalendar() {
  if (state.tab !== 'dashboard') state.tab = 'dashboard';
}

var hfmV81NextWeekBase = nextWeek;
nextWeek = function() {
  if (typeof hfmV70EnsureState === 'function') hfmV70EnsureState();
  if (state.weekSimulation?.active) return;
  const blocker = typeof hfmV68BlockingNews === 'function' ? hfmV68BlockingNews() : null;
  if (blocker) {
    hfmV81GoHomeBeforeCalendar();
    if (typeof hfmV70OpenBlockingNews === 'function') return hfmV70OpenBlockingNews(blocker);
    return hfmV81NextWeekBase();
  }
  if (hfmV81CanUseCalendarOverlay()) {
    hfmV81GoHomeBeforeCalendar();
    return hfmV70BeginWeekSimulation('week');
  }
  hfmV81GoHomeBeforeCalendar();
  return hfmV81NextWeekBase();
};

var hfmV81AdvanceToNextCalendarWeekBase = advanceToNextCalendarWeek;
advanceToNextCalendarWeek = function() {
  if (typeof hfmV70EnsureState === 'function') hfmV70EnsureState();
  if (state.weekSimulation?.active) return;
  const blocker = typeof hfmV68BlockingNews === 'function' ? hfmV68BlockingNews() : null;
  if (blocker) {
    hfmV81GoHomeBeforeCalendar();
    if (typeof hfmV70OpenBlockingNews === 'function') return hfmV70OpenBlockingNews(blocker);
    return hfmV81AdvanceToNextCalendarWeekBase();
  }
  if (hfmV81CanUseCalendarOverlay()) {
    hfmV81GoHomeBeforeCalendar();
    return hfmV70BeginWeekSimulation('advance');
  }
  hfmV81GoHomeBeforeCalendar();
  return hfmV81AdvanceToNextCalendarWeekBase();
};

var hfmV81HeaderActionBase = headerAction;
headerAction = function() {
  const m = state.activeMatch;
  if (m?.phase === 'tacticalStop' || m?.phase === 'halftime' || state.tab === 'matchHalftime' || m?.phase === 'firstReady' || state.tab === 'match' || m?.phase === 'live') {
    return hfmV81HeaderActionBase();
  }
  const label = typeof headerActionLabel === 'function' ? headerActionLabel() : '';
  if (label === 'Zur nächsten KW.' || label === 'Zur nächsten KW' || label === 'Zum Spiel simulieren') {
    hfmV81GoHomeBeforeCalendar();
    if (label === 'Zum Spiel simulieren') return advanceToNextCalendarWeek();
    return nextWeek();
  }
  hfmV81GoHomeBeforeCalendar();
  return hfmV81HeaderActionBase();
};

try { render(); } catch (err) {}

/* Version 82: Sichtbare KW-Kalendersimulation wieder erzwingen */
function hfmV82CanUseCalendarOverlay() {
  return !!(state.gameStarted && !state.activeMatch && !state.seasonEndModal && !state.seasonStartModal && typeof hfmV70BeginWeekSimulation === 'function');
}
function hfmV82GoHomeForCalendar() {
  if (state.gameStarted && state.tab !== 'dashboard') state.tab = 'dashboard';
}
function hfmV82StartCalendarOverlay(mode) {
  if (typeof hfmV70EnsureState === 'function') hfmV70EnsureState();
  hfmV82GoHomeForCalendar();
  if (state.weekSimulation?.active) {
    if (state.weekSimulation.hidden) state.weekSimulation.hidden = false;
    render();
    return;
  }
  const blocker = typeof hfmV68BlockingNews === 'function' ? hfmV68BlockingNews() : null;
  if (blocker) {
    if (typeof hfmV70OpenBlockingNews === 'function') hfmV70OpenBlockingNews(blocker);
    return;
  }
  if (hfmV82CanUseCalendarOverlay()) {
    hfmV70BeginWeekSimulation(mode || 'week');
    return;
  }
  if (mode === 'advance' && typeof hfmV81AdvanceToNextCalendarWeekBase === 'function') hfmV81AdvanceToNextCalendarWeekBase();
  else if (typeof hfmV81NextWeekBase === 'function') hfmV81NextWeekBase();
}

var hfmV82NextWeekBase = nextWeek;
nextWeek = function() {
  if (hfmV82CanUseCalendarOverlay()) return hfmV82StartCalendarOverlay('week');
  hfmV82GoHomeForCalendar();
  return hfmV82NextWeekBase();
};

var hfmV82AdvanceBase = advanceToNextCalendarWeek;
advanceToNextCalendarWeek = function() {
  if (hfmV82CanUseCalendarOverlay()) return hfmV82StartCalendarOverlay('advance');
  hfmV82GoHomeForCalendar();
  return hfmV82AdvanceBase();
};

var hfmV82HeaderActionBase = headerAction;
headerAction = function() {
  const label = typeof headerActionLabel === 'function' ? String(headerActionLabel()) : '';
  if (!state.activeMatch && (label.includes('Zur nächsten KW') || label.includes('Zum Spiel simulieren') || label.includes('Simulation'))) {
    if (label.includes('Zum Spiel simulieren')) return advanceToNextCalendarWeek();
    if (state.weekSimulation?.active) {
      if (state.weekSimulation.paused && typeof hfmV70ResumeWeekSimulation === 'function') return hfmV70ResumeWeekSimulation();
      return;
    }
    return nextWeek();
  }
  return hfmV82HeaderActionBase();
};

var hfmV82RenderBase = render;
render = function() {
  hfmV82RenderBase();
  if (typeof hfmV70InjectWeekSimulationUi === 'function') hfmV70InjectWeekSimulationUi();
};

try { render(); } catch (err) {}
