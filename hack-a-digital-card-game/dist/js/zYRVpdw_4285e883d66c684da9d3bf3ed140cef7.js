// Offensive items set
// An object containing all of our offensive equippable cards for our various function to pull from
// Master audio array.
const _masterAudio = [
{
  'name': 'bgmusic',
  'source': 'asset/hackbgsoundtrack.mp3',
  'stack': 1 },
{
  'name': 'heal',
  'source': 'asset/hackHealFX.wav' },
{
  'name': 'invalid',
  'source': 'asset/hackErrorFX.wav',
  'stack': 4 },
{
  'name': 'stageComplete',
  'source': 'asset/hackStageCompleteFX.mp3' },
{
  'name': 'cardHover',
  'source': 'asset/hackCardHoverFX.wav',
  'stack': 5 },
{
  'name': 'enemyKilled',
  'source': 'asset/hackEnemyDeadFX.wav' },
{
  'name': 'defensiveEquipped',
  'source': 'asset/hackDefensiveEquipped.mp3' },
{
  'name': 'enemyHit',
  'source': 'asset/hackEnemyHitFX.mp3',
  'stack': 4 },
{
  'name': 'node',
  'source': 'asset/hackNodeFX.wav',
  'stack': 2 },
{
  'name': 'data',
  'source': 'asset/hackDataFX.mp3',
  'stack': 3 },
{
  'name': 'buy',
  'source': 'asset/hackBuyFX.mp3',
  'stack': 2 },
{
  'name': 'openShop',
  'source': 'asset/hackOpenShopFX.mp3' },
{
  'name': 'take',
  'source': 'asset/hackTakeFX.mp3',
  'stack': 6 },
{
  'name': 'trash',
  'source': 'asset/hackTrashFX.mp3',
  'stack': 2 },
{
  'name': 'enemyAttackFlesh',
  'source': 'asset/hackEnemyAttackFX.mp3',
  'stack': 3 },
{
  'name': 'enemyAttackShield',
  'source': 'asset/hackEnemyAttackShieldFX_1.wav',
  'stack': 3 },
{
  'name': 'achievement',
  'source': 'asset/hack--achievementsfx.mp3' },
{
  'name': 'mine',
  'source': 'asset/hack--dataminingsfx.wav',
  'stack': 2 },
{
  'name': 'intro',
  'source': 'asset/hack--intro.mp3' },
{
  'name': 'takerelic',
  'source': 'asset/hack--takerelicsfx.wav' }];



const offensiveCards = [
{
  name: 'DDoS',
  baseAttack: 3,
  attack: 3, // Penetration lel
  durability: 2,
  cost: 12,
  type: 'offensive',
  description: 'Deplete target nodes resistance' },


{
  name: 'Worm',
  baseAttack: 4,
  attack: 4,
  durability: 2,
  cost: 18,
  type: 'offensive',
  description: 'Deplete target nodes resistance' },

{
  name: 'Rootkit',
  baseAttack: 5,
  attack: 5,
  durability: 1,
  cost: 12,
  type: 'offensive',
  description: 'Deplete target nodes resistance' },

{
  name: 'RAT',
  baseAttack: 6,
  attack: 6,
  durability: 1,
  cost: 15,
  type: 'offensive',
  description: 'Deplete target nodes resistance' },

{
  name: 'Virus',
  baseAttack: 5,
  attack: 5,
  durability: 2,
  cost: 23,
  type: 'offensive',
  description: 'Deplete target nodes resistance' }];



// Defensive items set
// An object containing all of our defensive equippable cards for our various function to pull from

const defensiveCards = [
{
  name: 'Shell',
  defence: 2,
  cost: 8,
  type: 'defensive',
  description: 'Blocks incoming attacks' },

{
  name: 'Proxy',
  defence: 4,
  cost: 12,
  type: 'defensive',
  description: 'Blocks incoming attacks' },

{
  name: 'Spoofer',
  defence: 6,
  cost: 18,
  type: 'defensive',
  description: 'Blocks incoming attacks' },

{
  name: 'Cloak',
  defence: 8,
  cost: 25,
  type: 'defensive',
  description: 'Blocks incoming attacks' }];



// Defensive items set
// An object containing all of our defensive equippable cards for our various function to pull from

const healthCards = [
{
  name: 'Defrag',
  value: 3,
  baseValue: 3,
  cost: 4,
  type: 'healing',
  description: 'Replenish integrity points' },

{
  name: 'Recompile',
  value: 6,
  baseValue: 6,
  cost: 8,
  type: 'healing',
  description: 'Replenish integrity points' },

{
  name: 'Debug',
  value: 8,
  baseValue: 8,
  cost: 10,
  type: 'healing',
  description: 'Replenish integrity points' }];




// Locations set
// An object containing all of our non interactive locations or 'nodes'

const nodeCards = [
{
  name: 'Email account',
  type: 'node' },

{
  name: 'Network switch',
  type: 'node' },

{
  name: 'FTP server',
  type: 'node' },

{
  name: 'Web server',
  type: 'node' },

{
  name: 'Storage network',
  type: 'node' },

{
  name: 'Cache',
  type: 'node' },

{
  name: 'Bank account',
  type: 'node' },

{
  name: 'File system',
  type: 'node' },

{
  name: 'Hotspot',
  type: 'node' },

{
  name: 'Mail server',
  type: 'node' },

{
  name: 'Terminal',
  type: 'node' },

{
  name: 'Crypto wallet',
  type: 'node' }];



// Enemies set
// An object containing all of our games enemies and their base stats

const enemies = [
{
  name: 'Gateway',
  health: 2,
  baseHealth: 2,
  attack: 1,
  type: 'enemy',
  description: 'Hack this node to progress' },

{
  name: 'Router',
  health: 4,
  baseHealth: 4,
  attack: 2,
  type: 'enemy',
  description: 'Hack this node to progress' },

{
  name: 'Database',
  health: 5,
  baseHealth: 5,
  attack: 1,
  type: 'enemy',
  description: 'Hack this node to progress' },

{
  name: 'SDL',
  health: 2,
  baseHealth: 2,
  attack: 6,
  type: 'enemy',
  description: 'Hack this node to progress' },

{
  name: 'Virtual Machine',
  health: 4,
  baseHealth: 4,
  attack: 3,
  type: 'enemy',
  description: 'Hack this node to progress' }];



// Boss set
// An object containing all of our games bosses

const bosses = [
{
  name: 'Data Center',
  health: 14,
  attack: 3,
  type: 'enemy',
  description: 'Hack to complete the stage' },

{
  name: 'Security beacon',
  health: 12,
  attack: 5,
  type: 'enemy',
  description: 'Hack to complete the stage' },

{
  name: 'Mainframe',
  health: 10,
  attack: 6,
  type: 'enemy',
  description: 'Hack to complete the stage' },

{
  name: 'Antivirus',
  health: 8,
  attack: 8,
  type: 'enemy',
  description: 'Hack to complete the stage' },

{
  name: 'Firewall',
  health: 4,
  attack: 15,
  type: 'enemy',
  description: 'Hack to complete the stage' },

{
  name: 'Server',
  health: 20,
  attack: 2,
  type: 'enemy',
  description: 'Hack to complete the stage' },

{
  name: 'Subnet',
  health: 9,
  attack: 4,
  type: 'enemy',
  description: 'Hack to complete the stage' }];



// Relic set
// An object containing all of our games relics and their effects

const relicCards = [
{
  name: 'Ram module',
  type: 'relic',
  description: 'Increase tech deck capacity by 1',
  targets: ['player.maxInventory'],
  operator: ['+='],
  change: [1],
  cost: 12 },

{
  name: 'Lag switch',
  type: 'relic',
  description: 'Increase max integrity by 5',
  targets: ['player.maxHealth'],
  operator: ['+='],
  change: [5],
  cost: 15 },

{
  name: 'Premium proxy',
  type: 'relic',
  description: 'Increase max integrity by 10',
  targets: ['player.maxHealth'],
  operator: ['+='],
  change: [10],
  cost: 25 },

{
  name: 'Sensitive data',
  type: 'relic',
  description: '1 extra choice in shops',
  targets: ['player.shopCardTotal'],
  operator: ['+='],
  change: [1],
  cost: 15 },

{
  name: 'Hacker rep',
  type: 'relic',
  description: '10% shop discount',
  targets: ['player.shopDiscount'],
  operator: ['+='],
  change: [10],
  cost: 25 },

{
  name: 'Hard reset',
  type: 'relic',
  description: 'Fully restore your integrity',
  targets: ['player.health'],
  operator: ['+='],
  change: [1000],
  cost: 12 },

{
  name: 'Filter coffee',
  type: 'relic',
  description: 'Increase integrity recovery rate by 5%',
  targets: ['player.restHealPercentage'],
  operator: ['+='],
  change: [5],
  cost: 12 },

{
  name: 'Additional CPU',
  type: 'relic',
  description: 'Gain an addition 2 max integrity when fortifying',
  targets: ['player.restMaxHealthIncrease'],
  operator: ['+='],
  change: [2],
  cost: 10 },

{
  name: 'Packet sniffer',
  type: 'relic',
  description: 'Loose 10 integrity gain 20 data',
  targets: ['player.health', 'player.currency'],
  operator: ['-=', '+='],
  change: [10, 20],
  cost: 5 },

{
  name: 'NMAP',
  type: 'relic',
  description: 'Loose 5 max integrity gain 15 data',
  targets: ['player.maxHealth', 'player.currency'],
  operator: ['-=', '+='],
  change: [5, 15],
  cost: 5 },
{
  name: 'Quantum processor',
  type: 'relic',
  description: 'Lose 15 max hp, increase brute force damage by 1',
  targets: ['player.boosts["Brute force"]', 'player.maxHealth'],
  operator: ['+=', '-='],
  change: [1, 15],
  cost: 25 },
{
  name: 'Additional servers',
  type: 'relic',
  description: 'DDoS has +1 penetration',
  targets: ['player.boosts["DDoS"]'],
  affects: 0,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },
{
  name: 'Worm AI',
  type: 'relic',
  description: 'Worms have +1 penetration',
  targets: ['player.boosts["Worm"]'],
  affects: 1,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },
{
  name: 'Multilang rootkits',
  type: 'relic',
  description: 'Rootkits have +1 penetration',
  targets: ['player.boosts["Rootkit"]'],
  operator: ['+='],
  affectGroup: "offensiveCards",
  affects: 2,
  change: [1],
  cost: 15 },

{
  name: 'Remote Bypass',
  type: 'relic',
  description: 'RATs have +1 penetration',
  targets: ['player.boosts["RAT"]'],
  affects: 3,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },
{
  name: 'Automatic concealment',
  type: 'relic',
  description: 'Virus has +1 penetration',
  targets: ['player.boosts["Virus"]'],
  affects: 4,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },
{
  name: 'YO-YO attacks',
  type: 'relic',
  description: 'DDoS has +1 uses',
  targets: ['player.boosts["DDoSDurability"]'],
  affects: 0,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },
{
  name: 'Advanced replication',
  type: 'relic',
  description: 'Worms have +1 uses',
  targets: ['player.boosts["WormDurability"]'],
  affects: 1,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },
{
  name: 'Admin overrides',
  type: 'relic',
  description: 'Rootkits have +1 uses',
  targets: ['player.boosts["RootkitDurability"]'],
  affects: 2,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },

{
  name: 'Anti-detection capabilities',
  type: 'relic',
  description: 'RATs have +1 uses',
  targets: ['player.boosts["RATDurability"]'],
  affects: 3,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },
{
  name: 'Deep embedding',
  type: 'relic',
  description: 'Virus has +1 uses',
  targets: ['player.boosts["VirusDurability"]'],
  affects: 4,
  affectGroup: "offensiveCards",
  operator: ['+='],
  change: [1],
  cost: 15 },
{
  name: 'Remote terminal',
  type: 'relic',
  description: 'Shells have +2 defence',
  targets: ['player.boosts["Shell"]'],
  operator: ['+='],
  affects: 0,
  affectGroup: "defensiveCards",
  change: [2],
  cost: 15 },
{
  name: 'Auto rotate',
  type: 'relic',
  description: 'Proxys have +2 defence',
  targets: ['player.boosts["Proxy"]'],
  affects: 1,
  affectGroup: "defensiveCards",
  operator: ['+='],
  change: [2],
  cost: 15 },
{
  name: 'HWID Spoofing',
  type: 'relic',
  description: 'Spoofers have +2 defence',
  targets: ['player.boosts["Spoofer"]'],
  operator: ['+='],
  affects: 2,
  affectGroup: "defensiveCards",
  change: [2],
  cost: 15 },
{
  name: 'Super cloak',
  type: 'relic',
  description: 'Cloaks have +2 defence',
  targets: ['player.boosts["Cloak"]'],
  operator: ['+='],
  affects: 3,
  affectGroup: "defensiveCards",
  change: [2],
  cost: 15 },
{
  name: 'NVMes',
  type: 'relic',
  description: 'Defrag replenishes +2 more integrity',
  targets: ['player.boosts["Defrag"]'],
  affects: 0,
  affectGroup: "healthCards",
  operator: ['+='],
  change: [2],
  cost: 15 },
{
  name: 'Distcc',
  type: 'relic',
  description: 'Recompiling replenishes +2 more integrity',
  targets: ['player.boosts["Recompile"]'],
  operator: ['+='],
  affects: 1,
  affectGroup: "healthCards",
  change: [2],
  cost: 15 },
{
  name: 'Advanced IDEs',
  type: 'relic',
  description: 'Debug replenishes +2 more integrity',
  targets: ['player.boosts["Debug"]'],
  affects: 2,
  affectGroup: "healthCards",
  operator: ['+='],
  change: [2],
  cost: 15 },
{
  name: 'Selective targets',
  type: 'relic',
  description: 'Nodes contain 10% more data',
  targets: ['player.boosts["Data"]'],
  operator: ['+='],
  change: [10],
  cost: 15 },
{
  name: 'Self repair',
  type: 'relic',
  description: 'At the end of each stage recover 2 integrity',
  targets: ['player.boosts["StageHeal"]'],
  operator: ['+='],
  change: [2],
  cost: 15 }];



const startingCards = [
{
  name: 'Brute force',
  attack: 1, // Penetration lel
  baseAttack: 1,
  durability: 999999,
  cost: 0,
  type: 'offensive',
  description: 'Deplete target nodes resistance' }];



const achievements = [
{
  name: 'Maximum penetration',
  description: 'Get any program to 9 or more penetration' },

{
  name: 'Snowden',
  description: 'Attempt to hack the CIA' },

{
  name: 'Script kiddy',
  description: 'Collect 5 upgrades in one run' },

{
  name: 'Red hat',
  description: 'Collect 10 upgrades in one run' },

{
  name: 'Black hat',
  description: 'Collect 15 upgrades in one run' },

{
  name: 'Elite hacker',
  description: 'Collect 20 upgrades in one run' },

{
  name: 'Impenetrable',
  description: 'Get any firewall module to 12 or more resistance' },

{
  name: 'Gigabyte',
  description: 'Collect 30 or more data' },

{
  name: 'Teabyte',
  description: 'Collect 100 or more data' },

{
  name: 'Petabyte',
  description: 'Collect 150 or more data' },

{
  name: 'Mine, all mine',
  description: 'Mine a network node' },

{
  name: 'One down',
  description: 'Terminate a node' },

{
  name: 'Top up',
  description: 'Heal yourself' },

{
  name: 'n00b',
  description: 'Get detected' },

{
  name: 'Its a UNIX system!',
  description: 'Complete a stage' },

{
  name: 'What upgrades?',
  description: 'Complete a stage with no upgrades' },

{
  name: 'Jackpot',
  description: 'Mine a node worth 14 or more data' },

{
  name: 'Kitted',
  description: 'Have a max tech deck capacity of 8 or more' },

{
  name: 'Data dump',
  description: 'Hack a Data Center' },

{
  name: 'Not so secure',
  description: 'Hack a Security beacon' },

{
  name: 'My kung fu is stronger',
  description: 'Hack a Mainframe' },

{
  name: 'Antivirus down',
  description: 'Hack an Antivirus' },

{
  name: 'Through the fire and flame',
  description: 'Hack a Firewall' },

{
  name: 'Youve been served',
  description: 'Hack a Server' },

{
  name: 'Piece of cake',
  description: 'Hack a Subnet' },

{
  name: "We're in",
  description: 'Successfully hack an easy target' },

{
  name: 'I am invincible',
  description: 'Successfully hack a medium target' },

{
  name: 'There is no spoon',
  description: 'Successfully hack a hard target' },

{
  name: 'I know Kung Fu',
  description: 'Download something from the dark web' },

{
  name: 'Dictionary attack',
  description: 'Increase your Brute Force penetration' },

{
  name: 'Absolute unit',
  description: 'Have a max integrity of 40 or more' },

{
  name: 'Fort Knox',
  description: 'Have a max integrity of 70 or more' },

{
  name: 'They are on to you',
  description: 'Take more than 10 damage in one hit' },

{
  name: 'Skin of your teeth',
  description: 'Complete a stage with just 1 integrity remaining' },

{
  name: 'Digital don',
  description: 'Complete a stage with full integrity' },

{
  name: 'Who needs health',
  description: 'Reduce your max integrity to 5 or below' },


// seed specific
{
  name: 'McKinnon would be proud',
  description: 'Successfully hack NASA on hard' },

{
  name: 'Bourne to do this',
  description: 'Successfully hack TREADSTONE on hard' },

{
  name: 'Judgement day prevented',
  description: 'Successfully hack SKYNET on hard' },

{
  name: "I'm sorry, Dave",
  description: 'Successfully hack HAL9000 on hard' }];