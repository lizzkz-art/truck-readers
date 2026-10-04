// Word lists, levels, sentences, rig parts, badges. Secular, child-safe content only.
var TR = window.TR = window.TR || {};
(function () {
  const S = s => s.split(/\s+/).filter(Boolean);

  // ---------- word lists ----------
  const L = {
    A: S('go stop big red up me we can'),
    B: S('run see look in is it my not I a'),
    cvcPics: S('bus van cab mud jet hog tug dig can truck stop go'),
    preC: S('and away blue come down find for help here jump'),
    preD: S('little make one play said the where'),
    preE: S('three to two yellow you funny jump find'),
    preAll: S('a and away big blue can come down find for funny go help here I in is it jump little look make me my not one play red run said see the three to two up we where yellow you'),
    vehicles: S('crane plow tow dump fire tractor mixer loader tanker hauler bulldozer garbage excavator'),
    priA: S('all am are at ate be black brown but came did do eat four'),
    priB: S('get good have he into like must new no now on our out please pretty'),
    shortSight: S('at am be do he no on so up to we go me it is in my by or if as of'),
    priC1: S('ran ride saw say she so soon that there they this too'),
    priC2: S('under want was well went what white who will with yes'),
    fryA: S('of as his her him had has by or if how your'),
    fryB: S('then them some many more from when were been day way long made call first water time'),
    fryShort: S('of as his her him had has by or if how day way'),
  };
  L.priAll = L.priA.concat(L.priB, L.priC1, L.priC2);
  L.fryAll = L.fryA.concat(L.fryB);
  const uniq = a => Array.from(new Set(a));

  // ---------- sentences: pre + [blank] + post ; pic = art key ----------
  // d = wrong choices that do not fit the picture or the grammar. g = group
  const SENT = [
    { g: 'pre', pre: 'I see a big', post: '.', a: 'truck', d: ['bus', 'van', 'jet'], pic: ['semi'] },
    { g: 'pre', pre: 'The fire truck is', post: '.', a: 'red', d: ['blue', 'yellow'], pic: ['fire'] },
    { g: 'pre', pre: 'The bus is', post: '.', a: 'yellow', d: ['red', 'blue'], pic: ['bus', { c: '#ffc928' }] },
    { g: 'pre', pre: 'The blue truck can', post: '.', a: 'go', d: ['the', 'red'], pic: ['semi', { c: '#2f80ed' }] },
    { g: 'pre', pre: 'The crane goes', post: '.', a: 'up', d: ['down', 'red'], pic: ['crane', { arrow: 'up' }] },
    { g: 'pre', pre: 'The crane goes', post: '.', a: 'down', d: ['up', 'blue'], pic: ['crane', { arrow: 'down' }] },
    { g: 'pre', pre: 'I can', post: 'the big truck.', a: 'see', d: ['the', 'blue', 'little'], pic: ['semi'] },
    { g: 'pre', pre: 'Stop! The light is', post: '.', a: 'red', d: ['blue', 'yellow'], pic: ['stop'] },
    { g: 'pre', pre: 'The tow truck can', post: 'the car.', a: 'help', d: ['blue', 'little', 'the'], pic: ['tow'] },
    { g: 'pre', pre: 'I', post: 'a blue tractor.', a: 'see', d: ['the', 'little', 'yellow'], pic: ['tractor', { c: '#2f80ed' }] },
    { g: 'pre', pre: 'Jump in the', post: '!', a: 'mud', d: ['bus', 'van'], pic: ['mud'] },
    { g: 'pre', pre: 'The excavator can', post: '.', a: 'dig', d: ['the', 'blue'], pic: ['excavator'] },
    { g: 'pre', pre: 'Look at the', post: 'dump truck!', a: 'big', d: ['the', 'and'], pic: ['dump'] },
    { g: 'pre', pre: 'The little truck can', post: '.', a: 'run', d: ['the', 'yellow'], pic: ['pickup'] },
    { g: 'pre', pre: 'Come', post: 'play with the trucks!', a: 'and', d: ['red', 'blue'], pic: ['dump'] },
    { g: 'pri', pre: 'I', post: 'to ride in the big truck.', a: 'want', d: ['red', 'the', 'under'], pic: ['semi'] },
    { g: 'pri', pre: 'The bulldozer is', post: '.', a: 'black', d: ['white', 'brown'], pic: ['bulldozer', { c: '#33363d' }] },
    { g: 'pri', pre: 'The bulldozer is', post: '.', a: 'brown', d: ['black', 'white'], pic: ['bulldozer', { c: '#8a5a33' }] },
    { g: 'pri', pre: 'The garbage truck is', post: '.', a: 'white', d: ['black', 'brown'], pic: ['garbage', { c: '#f5f7fa' }] },
    { g: 'pri', pre: 'The car hauler has', post: 'cars.', a: 'four', d: ['black', 'ride'], pic: ['hauler'] },
    { g: 'pri', pre: 'I', post: 'the fire truck!', a: 'saw', d: ['black', 'must'], pic: ['fire'] },
    { g: 'pri', pre: 'I', post: 'a good driver.', a: 'am', d: ['are', 'new'], pic: ['semi'] },
    { g: 'pri', pre: 'Look at', post: 'big loader!', a: 'that', d: ['please', 'under'], pic: ['loader'] },
    { g: 'pri', pre: 'The truck', post: 'out of the mud.', a: 'ran', d: ['black', 'four'], pic: ['mud'] },
    { g: 'pri', pre: 'I', post: 'the tow truck.', a: 'like', d: ['white', 'under'], pic: ['tow'] },
    { g: 'pri', pre: '', post: 'honk the horn!', a: 'Please', d: ['black', 'under'], pic: ['semi'] },
    { g: 'pri', pre: 'The cement mixer is', post: 'the yard.', a: 'in', d: ['must', 'four'], pic: ['mixer'] },
    { g: 'pri', pre: 'The tractor is', post: 'green.', a: 'was', d: ['black', 'the'], pic: ['tractor', { c: '#2e9e4f' }] },
    { g: 'pri', pre: 'The tanker came', post: 'the road.', a: 'down', d: ['red', 'blue'], pic: ['tanker'] },
    { g: 'fry', pre: 'The tanker has', post: 'in it.', a: 'water', d: ['time', 'day'], pic: ['tanker', { drops: 1 }] },
    { g: 'fry', pre: 'The big rig has', post: 'wheels.', a: 'many', d: ['from', 'then'], pic: ['semi'] },
    { g: 'fry', pre: 'First the truck goes,', post: 'the crane goes.', a: 'then', d: ['from', 'her'], pic: ['crane'] },
    { g: 'fry', pre: 'The dump truck came', post: 'the hill.', a: 'from', d: ['how', 'been'], pic: ['dump'] },
    { g: 'fry', pre: 'The tow truck can lift', post: 'car.', a: 'her', d: ['how', 'then'], pic: ['tow'] },
    { g: 'fry', pre: 'The driver has', post: 'hat.', a: 'his', d: ['from', 'many'], pic: ['semi'] },
    { g: 'fry', pre: 'Can you see the truck', post: 'the bus?', a: 'and', d: ['many', 'time'], pic: ['semi'] },
    { g: 'fry', pre: 'It is a good', post: 'to drive.', a: 'day', d: ['her', 'then'], pic: ['bus'] },
    { g: 'fry', pre: 'The truck is red', post: 'big.', a: 'and', d: ['long', 'many'], pic: ['semi'] },
    { g: 'fry', pre: 'We saw', post: 'big trucks.', a: 'some', d: ['how', 'then'], pic: ['hauler'] },
    { g: 'fry', pre: 'The garbage truck', post: 'by.', a: 'went', d: ['many', 'first'], pic: ['garbage'] },
    { g: 'fry', pre: 'The crane can lift', post: 'than the car.', a: 'more', d: ['her', 'been'], pic: ['crane'] },
    { g: 'fry', pre: 'The big rig goes a', post: 'way.', a: 'long', d: ['from', 'water'], pic: ['semi'] },
    { g: 'fry', pre: 'Who', post: 'the red truck?', a: 'made', d: ['many', 'then'], pic: ['semi'] },
    { g: 'fry', pre: 'The crane lifts the box', post: 'the truck.', a: 'from', d: ['long', 'water'], pic: ['crane'] },
  ];
  SENT.forEach(s => { s.full = ((s.pre ? s.pre + ' ' : '') + s.a + (s.post ? (/^[.!?]/.test(s.post) ? '' : ' ') + s.post : '')).replace(/\s+/g, ' '); });

  // ---------- word -> picture ----------
  const PIC = {
    truck: ['semi'], bus: ['bus'], van: ['van'], cab: ['taxi'], jet: ['jet'], tug: ['tug'], hog: ['hog'], mud: ['mud'],
    dig: ['excavator'], can: ['can'], crane: ['crane'], plow: ['plow'], tow: ['tow'], dump: ['dump'], fire: ['fire'],
    tractor: ['tractor'], mixer: ['mixer'], loader: ['loader'], tanker: ['tanker'], hauler: ['hauler'],
    bulldozer: ['bulldozer'], garbage: ['garbage'], excavator: ['excavator'], stop: ['stop'], go: ['light'],
    red: ['swatch', { c: '#e63946' }], blue: ['swatch', { c: '#2f80ed' }], yellow: ['swatch', { c: '#ffc928' }],
    black: ['swatch', { c: '#33363d' }], white: ['swatch', { c: '#f5f7fa' }], brown: ['swatch', { c: '#8a5a33' }],
    up: ['arrow', { dir: 'up' }], down: ['arrow', { dir: 'down' }],
  };

  // ---------- Spanish bonus ----------
  const ES = {
    truck: 'camión', bus: 'autobús', van: 'camioneta', cab: 'taxi', jet: 'avión', tug: 'remolcador', hog: 'cerdo', mud: 'lodo',
    dig: 'cavar', can: 'lata', crane: 'grúa', plow: 'quitanieves', tow: 'grúa', dump: 'volquete', fire: 'bomberos',
    tractor: 'tractor', mixer: 'mezcladora', loader: 'cargador', tanker: 'cisterna', hauler: 'transportador',
    bulldozer: 'topadora', garbage: 'basura', excavator: 'excavadora', stop: 'parar', go: 'ir', red: 'rojo', blue: 'azul',
    yellow: 'amarillo', black: 'negro', white: 'blanco', brown: 'café', big: 'grande', little: 'pequeño', up: 'arriba', down: 'abajo',
  };

  // ---------- letters ----------
  // [letter, vehicle word shown, art key, letter-name text, letter-sound text]
  const LETTERS = [
    ['b', 'bulldozer', 'bulldozer', 'bee', 'buh'], ['c', 'crane', 'crane', 'see', 'kuh'], ['d', 'dump truck', 'dump', 'dee', 'duh'],
    ['f', 'fire truck', 'fire', 'eff', 'fff'], ['g', 'garbage truck', 'garbage', 'gee', 'guh'], ['h', 'hauler', 'hauler', 'aitch', 'huh'],
    ['j', 'jet', 'jet', 'jay', 'juh'], ['l', 'loader', 'loader', 'ell', 'lll'], ['m', 'mixer', 'mixer', 'em', 'mmm'],
    ['p', 'pickup', 'pickup', 'pee', 'puh'], ['s', 'semi', 'semi', 'ess', 'sss'], ['t', 'tractor', 'tractor', 'tee', 'tuh'],
    ['v', 'van', 'van', 'vee', 'vvv'], ['e', 'excavator', 'excavator', 'ee', 'eh'],
  ];
  const LGROUPS = [['b', 'c', 'd', 'f'], ['g', 'h', 'j', 'l', 'm'], ['p', 's', 't', 'v', 'e']];

  // ---------- levels ----------
  // mode: hear | pic | fill | spell | haul | speed | boss ; n=[min,max] choices ; sim: 0 distinct 1 random 2 similar
  const WORLDS = [
    { id: 'mn', name: 'Minnesota', vehicle: 'plow', es: 'Minnesota', color: '#dff1ff', ground: '#f4fbff', tip: 'Snow plow time!' },
    { id: 'md', name: 'Maryland', vehicle: 'portcrane', color: '#cfeefd', ground: '#f2e3b3', tip: 'Crabs and a port crane!' },
    { id: 'tx', name: 'Texas', vehicle: 'cattle', color: '#ffe8c2', ground: '#e9c88a', tip: 'Big rigs and wide roads!' },
    { id: 'sv', name: 'El Salvador', vehicle: 'chicken', color: '#d7f5e1', ground: '#a8d98f', tip: 'A colorful chicken bus!' },
  ];
  const LV = [
    // Minnesota
    { w: 0, name: 'Stop and Go', mode: 'hear', n: [2, 3], sim: 0, words: L.A, vehicle: 'semi' },
    { w: 0, name: 'Look and See', mode: 'hear', n: [2, 3], sim: 0, words: L.B, vehicle: 'dump' },
    { w: 0, name: 'Picture Match', mode: 'pic', n: [2, 3], sim: 0, words: L.cvcPics, vehicle: 'bus' },
    { w: 0, name: 'Load the Trailer', mode: 'haul', n: [3, 3], sim: 1, words: L.preC, vehicle: 'hauler' },
    { w: 0, name: 'Spell It!', mode: 'spell', n: [0, 2], sim: 1, words: S('go up me we in is it no bus van cab mud jet hog tug dig can red big run'), vehicle: 'tow' },
    { w: 0, name: 'Big Rig Challenge', mode: 'boss', boss: true, n: [3, 3], sim: 1, from: [0, 1, 2, 3, 4], vehicle: 'plow' },
    // Maryland
    { w: 1, name: 'Port Words', mode: 'hear', n: [3, 4], sim: 1, words: L.preD, vehicle: 'portcrane' },
    { w: 1, name: 'Fill the Gap', mode: 'fill', n: [2, 3], sim: 1, g: ['pre'], vehicle: 'mixer' },
    { w: 1, name: 'Crate Haul', mode: 'haul', n: [3, 4], sim: 1, words: L.preE, vehicle: 'tanker' },
    { w: 1, name: 'Speed Round', mode: 'speed', n: [3, 4], sim: 1, words: L.preAll, vehicle: 'loader' },
    { w: 1, name: 'Truck Names', mode: 'pic', n: [3, 4], sim: 1, words: L.vehicles, vehicle: 'crane' },
    { w: 1, name: 'Big Rig Challenge', mode: 'boss', boss: true, n: [3, 4], sim: 1, from: [6, 7, 8, 9, 10], vehicle: 'portcrane' },
    // Texas
    { w: 2, name: 'Rodeo Road', mode: 'hear', n: [3, 4], sim: 2, words: L.priA, vehicle: 'cattle' },
    { w: 2, name: 'Fill the Gap 2', mode: 'fill', n: [3, 3], sim: 1, g: ['pri'], vehicle: 'garbage' },
    { w: 2, name: 'Cattle Hauler Load', mode: 'haul', n: [3, 4], sim: 1, words: L.priB, vehicle: 'cattle' },
    { w: 2, name: 'Spell Short Words', mode: 'spell', n: [2, 3], sim: 1, words: L.shortSight, vehicle: 'bulldozer' },
    { w: 2, name: 'Speed Round 2', mode: 'speed', n: [3, 4], sim: 2, words: L.priA.concat(L.priB), vehicle: 'fire' },
    { w: 2, name: 'Big Rig Challenge', mode: 'boss', boss: true, n: [3, 4], sim: 2, from: [12, 13, 14, 15, 16], vehicle: 'semi' },
    // El Salvador
    { w: 3, name: 'Chicken Bus Words', mode: 'hear', n: [3, 4], sim: 2, words: L.priC1, vehicle: 'chicken' },
    { w: 3, name: 'Fill the Gap 3', mode: 'fill', n: [3, 3], sim: 1, g: ['fry'], vehicle: 'pickup' },
    { w: 3, name: 'Market Haul', mode: 'haul', n: [3, 4], sim: 2, words: L.priC2, vehicle: 'chicken' },
    { w: 3, name: 'Spell Bigger Words', mode: 'spell', n: [2, 3], sim: 1, words: L.fryShort, vehicle: 'excavator' },
    { w: 3, name: 'Speed Round 3', mode: 'speed', n: [3, 4], sim: 2, words: L.fryAll, vehicle: 'tractor' },
    { w: 3, name: 'Grand Big Rig Challenge', mode: 'boss', boss: true, grand: true, n: [4, 4], sim: 2, from: 'all', vehicle: 'semi' },
  ];
  LV.forEach((l, i) => { l.id = i + 1; l.rounds = l.boss ? 10 : 8; if (l.mode === 'haul') l.rounds = 2; if (l.mode === 'speed') l.rounds = 10; });

  // placement tiers -> start level
  const PLACE = [
    { lvl: 1, words: S('go stop red big') },
    { lvl: 2, words: S('see look run can') },
    { lvl: 7, words: S('little where said yellow') },
    { lvl: 13, words: S('that want went white') },
    { lvl: 19, words: S('from were their when') },
  ];

  // ---------- rig parts (unlock by total stars earned) ----------
  const PARTS = {
    color: [
      { id: 'red', name: 'Red', v: '#e63946', at: 0 }, { id: 'blue', name: 'Blue', v: '#2f80ed', at: 0 }, { id: 'yellow', name: 'Yellow', v: '#ffc928', at: 0 },
      { id: 'green', name: 'Green', v: '#2e9e4f', at: 6 }, { id: 'orange', name: 'Orange', v: '#fb8500', at: 12 }, { id: 'purple', name: 'Purple', v: '#8e5bd6', at: 20 },
      { id: 'pink', name: 'Pink', v: '#f06aa8', at: 28 }, { id: 'teal', name: 'Teal', v: '#1aa6a6', at: 36 }, { id: 'silver', name: 'Silver', v: '#aab4c2', at: 50 }, { id: 'gold', name: 'Gold', v: '#e0a800', at: 70 },
    ],
    stack: [
      { id: 'single', name: 'One Stack', at: 0 }, { id: 'double', name: 'Two Stacks', at: 8 }, { id: 'tall', name: 'Tall Chrome', at: 16 }, { id: 'bullet', name: 'Round Top', at: 26 },
    ],
    horn: [
      { id: 'air', name: 'Air Horn', at: 0 }, { id: 'toot', name: 'Toot Toot', at: 5 }, { id: 'deep', name: 'Deep Horn', at: 14 }, { id: 'music', name: 'Song Horn', at: 24 }, { id: 'beep', name: 'Beep Beep', at: 34 },
    ],
    tires: [
      { id: 'std', name: 'Regular', at: 0 }, { id: 'big', name: 'Big Tires', at: 10 }, { id: 'white', name: 'White Walls', at: 18 }, { id: 'gold', name: 'Gold Hubs', at: 30 },
    ],
    decal: [
      { id: 'none', name: 'Plain', at: 0 }, { id: 'stars', name: 'Stars', at: 12 }, { id: 'stripes', name: 'Stripes', at: 22 }, { id: 'one', name: 'Number 1', at: 32 }, { id: 'flowers', name: 'Flowers', at: 40 },
    ],
  };

  const BADGES = [
    { id: 'first', name: 'First Star', desc: 'Earn your first star' },
    { id: 'w10', name: '10 Words', desc: 'Master 10 words' },
    { id: 'w25', name: '25 Words', desc: 'Master 25 words' },
    { id: 'w50', name: '50 Words', desc: 'Master 50 words' },
    { id: 'w100', name: '100 Words', desc: 'Master 100 words' },
    { id: 'streak5', name: 'Five in a Row', desc: '5 right in a row' },
    { id: 'streak10', name: 'Ten in a Row', desc: '10 right in a row' },
    { id: 'turbo', name: 'Turbo Driver', desc: 'Answer 5 fast in a speed round' },
    { id: 'speller', name: 'Spell Star', desc: 'Finish a spelling level' },
    { id: 'garage', name: 'Fix-It Pro', desc: 'Finish a Fix-It Garage trip' },
    { id: 'letters', name: 'Letter Lane Pro', desc: 'Finish a Letter Lane trip' },
    { id: 'trip', name: 'Road Trip Done', desc: 'Finish all four places' },
  ];

  const PHRASES = {
    great: 'Great job!', yes: 'You got it!', awesome: 'Awesome!', nice: 'Nice driving!', super: 'Super reading!', wow: 'Wow, you did it!',
    again: 'Try again!', listen: 'Listen again.', hear: 'Tap the word you hear.', findpic: 'Which word matches the picture?',
    fillit: 'Which word fits in the blank?', spellit: 'Spell the word.', loadit: 'Load the trailer with', whichletter: 'Which letter is it?',
    letterstart: 'What letter does it start with?', lettersound: 'Which letter makes this sound?', letsgo: "Let's go!",
    bigrig: 'Big Rig Challenge!', done: 'Level complete!', welcome: 'Hi Driver! Ready to drive?', place: "Let's find your starting road.",
    newpart: 'You earned a new truck part!', loaded: 'The trailer is loaded! Off we go!', garage: 'Fix-it Garage', speedgo: 'Speed round! Go go go!',
    tune: 'Everything is tuned up!', nextstop: 'Next stop!', tryspell: 'Tap the letters in order.', hint: 'Here is a hint.',
    mn: 'Minnesota', md: 'Maryland', tx: 'Texas', sv: 'El Salvador',
  };
  TR.D = { PHRASES, L, SENT, PIC, ES, LETTERS, LGROUPS, WORLDS, LV, PLACE, PARTS, BADGES, uniq,
    TROPHY: ['Snow Plow Champ', 'Port Pro', 'Rodeo Rig Star', 'Chicken Bus Champ'] };
  // every word that can be read aloud as a choice
  TR.D.ALLWORDS = uniq([].concat(...Object.values(L), SENT.map(s => s.a), SENT.flatMap(s => s.d), PLACE.flatMap(p => p.words)));
})();
