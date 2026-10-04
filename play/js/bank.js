// Truck Readers: leveled kindergarten sight-word banks and word-game builders.
// Levels: 0 = Warm-Up (letters, sounds, pictures), 1..8 = Level 1..8. Pictures are emoji (drawn icons, no photos).
export function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }
const pickN = (a, n) => shuffle(a).slice(0, n);
const S = s => s.split(/\s+/).filter(Boolean);

// ---------- Sight-word levels (pre-primer, primer, and early high-frequency words) ----------
export const WL = {
  1: S('go stop big red up me we can'),
  2: S('run see look in is it my not I a'),
  3: S('and away blue come down find for help here jump'),
  4: S('little make one play said the where three to two yellow you funny'),
  5: S('all am are at ate be black brown but came did do eat four get good have he into like must new no now on our out please pretty'),
  6: S('ran ride saw say she so soon that there they this too under want was well went what white who will with yes'),
  7: S('of as his her him had has by or if how your'),
  8: S('then them some many more from when were been day way long made call first water time'),
};
export const LEVEL_OF = {}; for (const [lv, ws] of Object.entries(WL)) for (const w of ws) LEVEL_OF[w.toLowerCase()] = +lv;
export const wordLevel = w => LEVEL_OF[String(w).toLowerCase()] || 0;
export const wordsUpTo = lv => { const o = []; for (let l = 1; l <= Math.min(8, lv); l++) o.push(...WL[l]); return o; };

// ---------- Pictures ----------
export const PIC = {
  truck: '🚚', bus: '🚌', van: '🚐', car: '🚗', cab: '🚕', jet: '✈️', ship: '🚢', tug: '🚤', tractor: '🚜', dump: '🚛', fire: '🚒', crane: '🏗️', cone: '🚧',
  stop: '🛑', go: '🟢', red: '🔴', blue: '🔵', yellow: '🟡', black: '⚫', white: '⚪', brown: '🟤', up: '⬆️', down: '⬇️',
  wheel: '🛞', horn: '📯', light: '💡', door: '🚪', mirror: '🪞', key: '🔑', map: '🗺️', box: '📦', crate: '📦', fuel: '⛽', road: '🛣️', bridge: '🌉', tool: '🔧', ladder: '🪜', engine: '⚙️', helmet: '⛑️', flag: '🚩',
  mud: '🟫', dig: '⛏️', can: '🥫', sun: '☀️', bed: '🛏️', hat: '🧢', log: '🪵', nut: '🥜', bug: '🐛', hen: '🐔', web: '🕸️', net: '🥅', ten: '🔟', pig: '🐷', dog: '🐶', cat: '🐱', fox: '🦊', fish: '🐟', moon: '🌙', tree: '🌳', ball: '⚽',
  bear: '🐻', horse: '🐴', leaf: '🍃', ring: '💍', spoon: '🥄', star: '⭐', bee: '🐝', cake: '🎂', snake: '🐍', king: '🤴', house: '🏠', mouse: '🐭', clock: '🕐', sock: '🧦', nose: '👃', rose: '🌹', hand: '✋', egg: '🥚', book: '📖', drum: '🥁', duck: '🦆', frog: '🐸', goat: '🐐', gift: '🎁', lion: '🦁', pen: '🖊️', zebra: '🦓', whale: '🐋', turtle: '🐢', mug: '☕', bat: '🦇', map2: '🗺️',
};

// ---------- Warm-Up listening banks ----------
export const RHYME = [
  ['cat', 'hat', ['sun', 'dog']], ['dog', 'log', ['bus', 'moon']], ['bee', 'tree', ['fox', 'car']], ['cake', 'snake', ['bus', 'fish']],
  ['king', 'ring', ['hen', 'ship']], ['moon', 'spoon', ['pig', 'cat']], ['bus', 'nut', ['bed', 'king']], ['car', 'star', ['pig', 'bus']],
  ['sock', 'clock', ['bee', 'hat']], ['hen', 'ten', ['moon', 'fox']], ['fox', 'box', ['star', 'bee']], ['bug', 'mug', ['cake', 'moon']],
  ['mud', 'bug', ['hat', 'sun']], ['dig', 'pig', ['bus', 'car']], ['can', 'van', ['dog', 'sun']], ['jet', 'net', ['bus', 'fox']],
];
// First sound: [spoken word, picture that starts the same, other pictures, first letter]
export const FIRST = [
  ['bus', 'bed', ['sun', 'fish'], 'b'], ['truck', 'tree', ['moon', 'bus'], 't'], ['sun', 'sock', ['ball', 'dog'], 's'], ['fish', 'fox', ['moon', 'hat'], 'f'],
  ['dog', 'duck', ['sun', 'king'], 'd'], ['cat', 'car', ['moon', 'fish'], 'c'], ['mud', 'moon', ['ball', 'nose'], 'm'], ['pig', 'pen', ['sun', 'goat'], 'p'],
  ['hat', 'horse', ['moon', 'bus'], 'h'], ['jet', 'gift', ['sun', 'hat'], 'j'], ['van', 'vest', ['dog', 'moon'], 'v'], ['crane', 'cat', ['bus', 'fox'], 'c'],
  ['log', 'lion', ['bus', 'cat'], 'l'], ['key', 'king', ['sun', 'bear'], 'k'], ['ship', 'sun', ['fox', 'moon'], 's'], ['net', 'nose', ['hat', 'dog'], 'n'],
].filter(f => PIC[f[1]] && f[2].every(x => PIC[x]));
export const LETTERS = 'ABCDEFGHIJKLMNOPRSTUW'.split('');
// Letters that start a truck word: [letter, word, name text, sound text]
export const LETTER_WORDS = { B: 'bus', C: 'crane', D: 'dump truck', F: 'fuel', G: 'gas pump', H: 'horn', J: 'jet', L: 'light', M: 'mud', P: 'pickup', R: 'road', S: 'stop', T: 'truck', V: 'van', W: 'wheel' };
export const CVC = ['bus', 'van', 'cab', 'mud', 'jet', 'tug', 'dig', 'can', 'box', 'log', 'sun', 'nut', 'bug', 'bed', 'hat', 'map', 'net', 'ten', 'fox', 'pig'].filter(w => PIC[w]);

// ---------- Sentences: [before, answer, after, wrong choices, picture word] ----------
const SENT_RAW = [
  ['I see a big', 'truck', '.', ['run', 'up', 'see'], 'truck', 3],
  ['The fire truck is', 'red', '.', ['up', 'in'], 'fire', 1],
  ['The bus is', 'yellow', '.', ['the', 'to'], 'bus', 4],
  ['The blue truck can', 'go', '.', ['the', 'red'], 'truck', 1],
  ['Look', 'up', 'at the crane!', ['red', 'is'], 'crane', 1],
  ['The box went', 'down', 'the hill.', ['jump', 'blue'], 'crane', 3],
  ['I can', 'see', 'the big truck.', ['the', 'blue', 'little'], 'truck', 2],
  ['Stop! The light is', 'red', '.', ['up', 'can'], 'stop', 1],
  ['The tow truck can', 'help', 'the car.', ['blue', 'little', 'the'], 'truck', 3],
  ['I', 'see', 'a blue tractor.', ['the', 'little', 'yellow'], 'tractor', 2],
  ['Jump in the', 'mud', '!', ['is', 'up'], 'mud', 3],
  ['The digger can', 'dig', '.', ['the', 'blue'], 'dig', 3],
  ['Look at the', 'big', 'dump truck!', ['the', 'and'], 'dump', 1],
  ['The little truck can', 'run', '.', ['the', 'yellow'], 'truck', 2],
  ['Come', 'and', 'play with the trucks!', ['red', 'blue'], 'truck', 3],
  ['The truck is', 'not', 'little.', ['and', 'the'], 'truck', 2],
  ['I', 'want', 'to ride in the big truck.', ['red', 'the', 'under'], 'truck', 6],
  ['The bulldozer is', 'black', '.', ['four', 'that'], 'tractor', 5],
  ['The garbage truck is', 'white', '.', ['ride', 'the'], 'truck', 6],
  ['The car hauler has', 'four', 'cars.', ['ride', 'under'], 'truck', 5],
  ['I', 'saw', 'the fire truck!', ['black', 'must'], 'fire', 6],
  ['I', 'am', 'a good driver.', ['are', 'new'], 'truck', 5],
  ['Look at', 'that', 'big loader!', ['please', 'under'], 'tractor', 6],
  ['The truck', 'ran', 'out of the mud.', ['black', 'four'], 'mud', 6],
  ['I', 'like', 'the tow truck.', ['white', 'under'], 'truck', 5],
  ['', 'Please', 'honk the horn!', ['black', 'under'], 'horn', 5],
  ['The cement mixer is', 'in', 'the yard.', ['must', 'four'], 'truck', 2],
  ['The tractor', 'was', 'green.', ['black', 'the'], 'tractor', 6],
  ['The tanker came', 'down', 'the road.', ['red', 'blue'], 'truck', 3],
  ['The tanker has', 'water', 'in it.', ['time', 'day'], 'truck', 8],
  ['The big rig has', 'many', 'wheels.', ['from', 'then'], 'truck', 8],
  ['First the truck goes,', 'then', 'the crane goes.', ['from', 'her'], 'crane', 8],
  ['The dump truck came', 'from', 'the hill.', ['how', 'been'], 'dump', 8],
  ['The driver has', 'his', 'hat.', ['from', 'many'], 'truck', 7],
  ['Can you see the truck', 'and', 'the bus?', ['many', 'time'], 'bus', 3],
  ['It is a good', 'day', 'to drive.', ['her', 'then'], 'bus', 8],
  ['We saw', 'some', 'big trucks.', ['how', 'then'], 'truck', 8],
  ['The garbage truck', 'went', 'by.', ['many', 'first'], 'truck', 6],
  ['The crane can lift', 'more', 'than the car.', ['her', 'been'], 'crane', 8],
  ['The big rig goes a', 'long', 'way.', ['from', 'water'], 'truck', 8],
  ['Who', 'made', 'the red truck?', ['many', 'then'], 'truck', 8],
  ['What', 'is', 'in the box?', ['the', 'red'], 'box', 2],
  ['We', 'can', 'go to the port.', ['stop', 'big'], 'ship', 1],
  ['Where is the', 'little', 'truck?', ['jump', 'is'], 'truck', 4],
  ['The driver said, "', 'Come', 'here!"', ['the', 'blue'], 'truck', 3],
  ['Help me', 'find', 'the key.', ['the', 'big'], 'key', 3],
  ['The truck will', 'stop', 'at the light.', ['big', 'blue'], 'stop', 1],
  ['The truck has', 'two', 'big wheels.', ['the', 'is'], 'wheel', 4],
  ['The crate is for', 'you', '.', ['the', 'red'], 'crate', 4],
  ['They', 'were', 'at the port.', ['black', 'under'], 'ship', 8],
  ['She', 'will', 'drive the truck.', ['under', 'brown'], 'truck', 6],
  ['The truck is', 'under', 'the bridge.', ['white', 'ride'], 'bridge', 6],
  ['The truck is', 'by', 'the road.', ['how', 'his'], 'truck', 7],
  ['Is that truck red', 'or', 'blue?', ['of', 'has'], 'truck', 7],
  ['How big is', 'your', 'truck?', ['has', 'by'], 'truck', 7],
  ['Ray', 'has', 'a big truck.', ['his', 'of'], 'truck', 7],
  ['Mo', 'had', 'a tool.', ['of', 'or'], 'tool', 7],
  ['I saw', 'his', 'truck go by.', ['how', 'if'], 'truck', 7],
  ['Fran let', 'him', 'ride the truck.', ['of', 'has'], 'truck', 7],
  ['The truck is full', 'of', 'crates.', ['by', 'or'], 'crate', 7],
  ['The red truck is as big', 'as', 'a bus.', ['of', 'how'], 'bus', 7],
  ['Tell me', 'how', 'to drive the truck.', ['his', 'him'], 'truck', 7],
  ['We', 'went', 'on a long trip.', ['white', 'must'], 'road', 6],
];
export const SENT = SENT_RAW.map(([pre, a, post, d, pic, lv]) => ({ s: ((pre ? pre + ' ' : '') + '___' + (/^[.!?"]/.test(post) ? '' : ' ') + post).replace(/\s+/g, ' ').replace('" ___', '"___'), a, d, pic, lv: wordLevel(a) || lv, full: ((pre ? pre + ' ' : '') + a + (/^[.!?"]/.test(post) ? '' : ' ') + post).replace(/\s+/g, ' ') }));

// ---------- Truck vocabulary (listening / reading labels) ----------
// [word, picture or null, meaning, example, level]
const V = [
  ['truck', 'truck', 'A big vehicle that carries things.', 'The truck is big.', 0], ['bus', 'bus', 'A big vehicle that carries many people.', 'The bus is yellow.', 0], ['car', 'car', 'A small vehicle for a few people.', 'The car is red.', 0], ['van', 'van', 'A small truck with a box in back.', 'The van can go.', 0],
  ['cab', 'cab', 'A car you pay to ride in. Also, the front part of a truck.', 'I sit in the cab.', 0], ['jet', 'jet', 'A fast plane.', 'The jet goes up.', 0], ['box', 'box', 'A square thing that holds stuff.', 'The box is full.', 0], ['stop', 'stop', 'A sign that tells you to not go.', 'Stop at the sign.', 0],
  ['horn', 'horn', 'The part that goes honk.', 'Honk the horn.', 1], ['light', 'light', 'A part that glows so a driver can see.', 'The light is on.', 1], ['key', 'key', 'A small tool that starts a truck.', 'I have the key.', 1], ['map', 'map', 'A drawing that shows where places are.', 'Look at the map.', 1],
  ['door', 'door', 'The part you open to get in.', 'Open the door.', 1], ['flag', 'flag', 'A bright cloth on a pole.', 'The flag is red.', 1], ['road', 'road', 'A path where trucks drive.', 'The road is long.', 1], ['mud', 'mud', 'Wet, soft dirt.', 'The truck is in the mud.', 1],
  ['wheel', 'wheel', 'A round part that turns so a truck can roll.', 'The wheel turns.', 2], ['mirror', 'mirror', 'Glass that shows what is behind you.', 'Look in the mirror.', 2], ['fuel', 'fuel', 'What makes the engine go.', 'The truck needs fuel.', 2], ['crate', 'crate', 'A strong box for carrying things.', 'The crate is heavy.', 2],
  ['ship', 'ship', 'A very big boat.', 'The ship is at the port.', 2], ['cone', 'cone', 'An orange safety marker.', 'The cone is orange.', 2], ['tool', 'tool', 'Something that helps you fix things.', 'Mo has a tool.', 2], ['bridge', 'bridge', 'A road that goes over water.', 'The truck crosses the bridge.', 2],
  ['engine', 'engine', 'The part that makes a truck go.', 'The engine is loud.', 3], ['trailer', null, 'A long box on wheels that a truck pulls.', 'The trailer is long.', 3], ['tractor', 'tractor', 'A strong machine that pulls things.', 'The tractor is green.', 3], ['crane', 'crane', 'A tall machine that lifts heavy things.', 'The crane lifts a box.', 3],
  ['ladder', 'ladder', 'Steps that help you climb up.', 'Climb the ladder.', 3], ['helmet', 'helmet', 'A hard hat that keeps your head safe.', 'Wear your helmet.', 3], ['dump', 'dump', 'A truck with a bed that tips up to pour out its load.', 'The dump truck tips up.', 3], ['fire', 'fire', 'A truck that helps put out fires.', 'The fire truck is red.', 3],
  ['bumper', null, 'A strong bar on the front or back of a truck.', 'The bumper is shiny.', 4], ['hood', null, 'The cover over the front of a truck.', 'Open the hood.', 4], ['bulldozer', null, 'A big machine that pushes dirt.', 'The bulldozer pushes dirt.', 4], ['excavator', null, 'A big machine that digs holes.', 'The excavator digs.', 4],
  ['mechanic', null, 'A person who fixes trucks.', 'The mechanic fixes the truck.', 4], ['driver', null, 'The person who drives.', 'The driver waves.', 4], ['signal', null, 'A light that tells drivers to stop or go.', 'The signal is green.', 4], ['highway', null, 'A big, fast road.', 'The truck is on the highway.', 4],
  ['cargo', null, 'Things that a truck carries.', 'The cargo is in the trailer.', 5], ['container', null, 'A big metal box that holds cargo.', 'The container is on the ship.', 5], ['diesel', null, 'A kind of fuel that big trucks use.', 'The rig uses diesel.', 5], ['exhaust', null, 'The pipe where smoke leaves the engine.', 'The exhaust is tall.', 5],
  ['hitch', null, 'The part that joins a trailer to a truck.', 'The hitch holds the trailer.', 5], ['delivery', null, 'Something taken to the place it needs to go.', 'The delivery is here.', 5], ['garage', null, 'A building where trucks are fixed.', 'The truck is in the garage.', 5], ['gauge', null, 'A dial that shows how much fuel is left.', 'The gauge says half.', 5],
  ['foreman', null, 'The boss of a work crew.', 'The foreman is Fran.', 6], ['dispatcher', null, 'A person who tells drivers where to go.', 'Dee is a dispatcher.', 6], ['dock', null, 'A place where ships stop.', 'The ship is at the dock.', 6], ['route', null, 'The way you go to get somewhere.', 'We know the route.', 6],
  ['journey', null, 'A long trip.', 'The journey takes a day.', 6], ['distance', null, 'How far it is between two places.', 'The distance is long.', 6], ['weight', null, 'How heavy something is.', 'The weight of the load is high.', 6], ['schedule', null, 'A plan that tells you when to go.', 'We check the schedule.', 6],
  ['freight', null, 'Goods that are carried by trucks, trains, or ships.', 'The freight is on the train.', 7], ['detour', null, 'A different way to go when the road is closed.', 'We took a detour.', 7], ['hazard', null, 'Something that could be unsafe.', 'The cone marks a hazard.', 7], ['reflector', null, 'A part that shines back light so others can see you.', 'The reflector shines at night.', 7],
  ['inspect', null, 'To look at something very carefully.', 'Mo will inspect the truck.', 7], ['shipment', null, 'Goods sent from one place to another.', 'The shipment arrived today.', 7], ['mileage', null, 'How many miles a truck can go on its fuel.', 'This truck has good mileage.', 7], ['payload', null, 'The weight of the cargo a truck carries.', 'The payload is heavy.', 7],
  ['transport', null, 'To carry something from one place to another.', 'Trucks transport food.', 8], ['interstate', null, 'A big highway that crosses many states.', 'We drive on the interstate.', 8], ['destination', null, 'The place where you are going.', 'Our destination is Texas.', 8], ['equipment', null, 'The tools and machines used for a job.', 'The equipment is in the yard.', 8],
  ['passenger', null, 'A person who rides but does not drive.', 'The passenger sits in back.', 8], ['warehouse', null, 'A big building where goods are kept.', 'The crates are in the warehouse.', 8], ['maintenance', null, 'Care that keeps a truck working well.', 'Trucks need maintenance.', 8], ['regulation', null, 'A rule that drivers must follow.', 'Drivers follow every regulation.', 8],
];
export const VOCAB = V.map(([w, p, def, ex, lv]) => ({ w, pic: p ? PIC[p] || null : null, def, ex, lv }));
export const vocabAt = lv => VOCAB.filter(v => v.lv === lv);
export const PARTS = ['wheel', 'horn', 'light', 'mirror', 'door', 'key', 'engine', 'ladder', 'tool'];

// ---------- Games ----------
export const GAMES = [
  { id: 'letters', title: 'Letter Lane', skill: 'letters', lv: [0, 1], pre: true, dir: 'Listen. Tap the letter you hear.', tip: 'Look at the shape of each letter.' },
  { id: 'first', title: 'First Sounds', skill: 'first', lv: [0, 2], pre: true, dir: 'Listen to the word. Find the one that starts with the same sound.', tip: 'Say the word slowly. Listen to the very first sound.' },
  { id: 'rhyme', title: 'Rhyme Time', skill: 'rhyme', lv: [0, 2], pre: true, dir: 'Listen to the word. Tap the picture that rhymes with it.', tip: 'Rhyming words sound the same at the end, like cat and hat.' },
  { id: 'cvc', title: 'Missing Vowel', skill: 'cvc', lv: [1, 3], dir: 'Look at the picture. Pick the vowel that finishes the word.', tip: 'Say the word slowly: b - u - s.' },
  { id: 'hear', title: 'Hear and Tap', skill: 'hear', lv: [1, 8], dir: 'Listen to the word. Tap the word you hear.', tip: 'Tap the speaker to hear it again. Look at every letter.' },
  { id: 'readpic', title: 'Picture Match', skill: 'readpic', lv: [1, 5], dir: 'Read the word. Tap the picture that matches it.', tip: 'Sound out the word. Then look for its picture.' },
  { id: 'sight', title: 'Fill the Load', skill: 'sight', lv: [1, 8], dir: 'Read the sentence. Pick the word that fits in the blank.', tip: 'Read the whole sentence with your word in it.' },
  { id: 'spell', title: 'Spell the Word', skill: 'spell', lv: [2, 8], dir: 'Listen to the word. Tap the letters in order to spell it.', tip: 'Say the word slowly. What sound do you hear first?' },
  { id: 'vocab', title: 'Truck Words', skill: 'vocab', lv: [0, 8], vocab: true, pre: true, dir: 'Listen to the word. Tap the picture or meaning that matches.', tip: 'Tap a speaker to hear any answer.' },
];
export const SKILL_NAMES = {
  letters: 'Letter Names', first: 'First Sounds', rhyme: 'Rhyming', cvc: 'Short Vowels (CVC)', hear: 'Hearing a Word and Finding It', readpic: 'Reading Words and Matching Pictures', sight: 'Sight Words in Sentences', spell: 'Spelling Sight Words', vocab: 'Truck Vocabulary',
  elements: 'Mission Facts', main: 'Main Idea', wh: 'Wh- Questions', retell: 'Putting Things in Order', infer: 'Thinking Ahead', crate: 'Word Crates', part: 'Truck Part Labels', fuel: 'Fuel Can Sentences', cone: 'Road Sign Words', stop: 'Delivery Words',
};
export const PHONICS_SKILLS = ['letters', 'first', 'rhyme', 'cvc'];
export const SIGHT_SKILLS = ['hear', 'readpic', 'sight', 'spell'];
export const COMP_SKILLS = ['elements', 'main', 'wh', 'retell'];
export const MISSION_SKILLS = ['crate', 'part', 'fuel', 'cone', 'stop'];
export const gamesFor = (readLv, vocabLv) => GAMES.filter(g => readLv === 0 ? g.pre : (g.vocab ? true : readLv >= g.lv[0] && readLv <= g.lv[1]));
const COUNT = lv => lv <= 3 ? 6 : 8;
export const nChoices = lv => lv <= 1 ? 2 : lv <= 4 ? 3 : 4;
const picOpt = w => ({ v: w, pic: PIC[w] || '❓', label: w });

// Words to practice at a level (current level is favoured; the level below is mixed in)
export function poolFor(lv) { lv = Math.max(1, Math.min(8, lv)); const here = WL[lv] || [], below = WL[lv - 1] || []; return { here, below, all: [...here, ...below] }; }
// Wrong choices that look alike: same first letter or about the same length come first
export function lookAlikes(word, lv, n) {
  const w = word.toLowerCase(); const pool = wordsUpTo(Math.max(lv, 2)).filter(x => x.toLowerCase() !== w);
  const score = x => (x[0].toLowerCase() === w[0] ? 2 : 0) + (Math.abs(x.length - w.length) <= 1 ? 1 : 0) + Math.random();
  return pool.sort((a, b) => score(b) - score(a)).slice(0, n);
}
export function wordChoices(word, lv, n) { return shuffle([word, ...lookAlikes(word, lv, n - 1)]); }
export function pickWords(lv, n, avoid = []) {
  const { here, below } = poolFor(lv); const ok = w => !avoid.includes(w) && w.length > 1;
  const a = shuffle(here.filter(ok)), b = shuffle(below.filter(ok)); const out = [];
  for (const w of [...a, ...b, ...shuffle(wordsUpTo(lv).filter(ok))]) { if (!out.includes(w)) out.push(w); if (out.length >= n) break; }
  return out;
}
export function sentencesAt(lv, n) {
  const exact = SENT.filter(s => s.lv === lv), near = SENT.filter(s => s.lv === lv - 1 || s.lv === lv + 1);
  return [...shuffle(exact), ...shuffle(near)].slice(0, n);
}
export function sentenceItem(s, skill = 'sight') { return { skill, kind: 'sight', sentence: s.s, answer: s.a, choices: shuffle([s.a, ...s.d]), say: s.full }; }

// Build a list of items for a game. Item kinds: picchoice, letter, picfill, hear, readpic, sight, syll, mcq
export function buildGame(id, readLv, vocabLv) {
  const g = GAMES.find(x => x.id === id); const lv = g.vocab ? vocabLv : readLv; const n = COUNT(lv); const items = [];
  const nc = nChoices(lv);
  if (id === 'rhyme') for (const [w, r, others] of pickN(RHYME.filter(x => PIC[x[0]] && PIC[x[1]]), n)) { const ch = shuffle([picOpt(r), ...others.slice(0, lv === 0 ? 1 : 2).map(picOpt)]); items.push({ skill: 'rhyme', kind: 'picchoice', prompt: `Which one rhymes with ${w}?`, target: w, targetPic: PIC[w], choices: ch, answer: r, say: `${w}, ${r}` }); }
  else if (id === 'first') {
    for (const [w, same, others, letter] of pickN(FIRST.filter(f => f[0] !== f[1] && PIC[f[0]]), n)) {
      if (lv <= 1) { const ch = shuffle([picOpt(same), ...others.map(picOpt)].slice(0, 3)); items.push({ skill: 'first', kind: 'picchoice', prompt: `Which one starts like ${w}?`, target: w, targetPic: PIC[w], choices: ch, answer: same, say: `${w}, ${same}` }); }
      else { const pool = shuffle('bcdfghklmnprstw'.split('').filter(x => x !== letter)).slice(0, 2); items.push({ skill: 'first', kind: 'picfill', pic: PIC[w], prompt: `What sound does ${w} start with?`, word: '_' + w.slice(1), answer: letter, choices: shuffle([letter, ...pool]), say: w }); }
    }
  }
  else if (id === 'letters') for (const L of pickN(LETTERS, n)) { const lower = lv >= 1 && Math.random() < 0.5; const others = shuffle(LETTERS.filter(x => x !== L)).slice(0, lv === 0 ? 2 : 3); const f = x => lower ? x.toLowerCase() : x; items.push({ skill: 'letters', kind: 'letter', prompt: `Find the letter ${L}.`, answer: f(L), choices: shuffle([L, ...others]).map(f), say: `Find the letter ${L}.` }); }
  else if (id === 'cvc') for (const w of pickN(CVC, n)) { const v = w[1]; const others = shuffle('aeiou'.split('').filter(x => x !== v)).slice(0, lv <= 1 ? 1 : 2); items.push({ skill: 'cvc', kind: 'picfill', pic: PIC[w], word: w[0] + '_' + w[2], answer: v, choices: shuffle([v, ...others]), say: w }); }
  else if (id === 'hear') for (const w of pickWords(lv, n)) items.push({ skill: 'hear', kind: 'hear', answer: w, choices: wordChoices(w, lv, nc), say: w });
  else if (id === 'readpic') {
    const cands = pickWords(lv, 30).filter(w => PIC[w]);
    const extra = ['truck', 'bus', 'van', 'box', 'key', 'map', 'horn', 'light', 'wheel', 'crane', 'ship', 'road'];
    const pool = [...cands, ...shuffle(extra).filter(w => !cands.includes(w))].slice(0, n);
    for (const w of pool) { const others = shuffle(Object.keys(PIC).filter(k => k !== w && PIC[k] !== PIC[w] && !/\d/.test(k))).slice(0, nc - 1); items.push({ skill: 'readpic', kind: 'readpic', word: w, answer: w, choices: shuffle([w, ...others]).map(picOpt), say: w }); }
  }
  else if (id === 'sight') for (const s of sentencesAt(lv, n)) items.push(sentenceItem(s));
  else if (id === 'spell') { const ws = pickWords(lv, 30).filter(w => w.length >= 2 && w.length <= 6 && w.toLowerCase() !== 'i'); for (const w of ws.slice(0, Math.min(6, ws.length))) items.push({ skill: 'spell', kind: 'syll', parts: w.split(''), answer: w, say: w }); }
  else if (id === 'vocab') {
    const here = vocabAt(lv), below = vocabAt(Math.max(0, lv - 1));
    const pool = shuffle(here).slice(0, Math.min(n, here.length));
    for (const v of pool) {
      const sib = here.filter(x => x.w !== v.w);
      if (v.pic) { const near = [...sib.filter(x => x.pic), ...below.filter(x => x.pic && x.w !== v.w)]; const ch = shuffle([v, ...shuffle(near).slice(0, nc - 1)]).map(x => ({ v: x.w, pic: x.pic, label: x.w })); items.push({ skill: 'vocab', kind: 'picchoice', prompt: `Tap the ${v.w}.`, target: v.w, choices: ch, answer: v.w, say: `${v.w}. ${v.def}`, word: v.w, noLabels: lv <= 1 }); }
      else { const ch = shuffle([v.def, ...shuffle(sib).slice(0, 3).map(x => x.def)]); items.push({ skill: 'vocab', kind: 'mcq', word: v.w, question: `What does “${v.w}” mean?`, answer: v.def, choices: ch, say: `${v.w}. ${v.def}`, example: v.ex }); }
    }
    return shuffle(items);
  }
  return items;
}

// ---------- A single quick check for a mission item (crate, cone, fuel can, truck part, delivery) ----------
// Always forgiving: the answer is shown after a miss and the item still counts.
export function missionCheck(kind, lv, vlv, avoid = []) {
  lv = Math.max(0, lv);
  if (kind === 'part') {
    const parts = shuffle(PARTS.filter(p => !avoid.includes(p) && PIC[p])); const w = parts[0] || 'wheel';
    const others = shuffle(PARTS.filter(p => p !== w)).slice(0, lv <= 1 ? 1 : 2);
    return { skill: 'part', kind: 'readpic', word: w, answer: w, choices: shuffle([w, ...others]).map(picOpt), say: w, label: w, prompt: 'Read the label. Tap the matching part.' };
  }
  if (kind === 'fuel') {
    if (lv >= 1) { const s = sentencesAt(Math.max(1, lv), 4).filter(x => !avoid.includes(x.a))[0] || SENT[0]; return { ...sentenceItem(s, 'fuel'), label: s.a, prompt: 'Read the can. Pick the word that fits.' }; }
  }
  if (lv === 0 && kind !== 'stop' && Math.random() < 0.7) { // Letters first: hear a letter, tap it
    const pool = shuffle(LETTERS.filter(l => !avoid.includes(l))); const l = pool[0] || 'B';
    const others = shuffle(LETTERS.filter(x => x !== l)).slice(0, 2);
    return { skill: 'letters', kind: 'hear', answer: l, choices: shuffle([l, ...others]), say: l.toLowerCase(), label: l, prompt: 'Find the letter you hear.' };
  }
  if (lv === 0) { // Warm-Up: hear a truck word, tap its picture
    const pool = shuffle(vocabAt(0).filter(v => v.pic && !avoid.includes(v.w))); const v = pool[0] || vocabAt(0)[0];
    const others = shuffle(vocabAt(0).filter(x => x.pic && x.w !== v.w)).slice(0, 1);
    return { skill: kind, kind: 'picchoice', prompt: `Tap the ${v.w}.`, target: v.w, choices: shuffle([v, ...others]).map(x => ({ v: x.w, pic: x.pic, label: x.w })), answer: v.w, say: v.w, word: v.w, label: v.w, noLabels: true };
  }
  const w = pickWords(lv, 3, avoid)[0] || 'go';
  return { skill: kind, kind: 'hear', answer: w, choices: wordChoices(w, lv, nChoices(lv)), say: w, label: w, prompt: 'Read the label. Tap the word you hear.' };
}
export function labelFor(kind, lv, avoid = []) { const it = missionCheck(kind, lv, lv, avoid); return it; }

// Read It Aloud words and sentences by reading level
export const RA_SENTENCES = {
  1: ['I can go.', 'Stop at red.', 'We see a big truck.', 'Look at me.'],
  2: ['I see a red truck.', 'It is not big.', 'Look, a little truck.', 'The truck can run.'],
  3: ['Come and help me.', 'The truck went down.', 'Jump up and find the key.', 'Here is a blue truck.'],
  4: ['You can play with the truck.', 'Where is the little truck?', 'Make two yellow trucks.', 'The funny truck said hi.'],
  5: ['The black truck came to eat.', 'I like the good brown truck.', 'We must get the new truck.', 'Please do not go out.'],
  6: ['She saw the truck go under.', 'They want to ride soon.', 'What did the white truck say?', 'I will go with you.'],
  7: ['How did his truck get here?', 'Her truck has a big wheel.', 'He had the key, or she did.', 'Is it your turn?'],
  8: ['Then the truck went a long way.', 'We made a trip from town.', 'Many days went by on the road.', 'First call for the water truck.'],
};
export function readAloudList(lv) {
  lv = Math.max(1, Math.min(8, lv));
  return { words: shuffle([...new Set([...(WL[lv] || []), ...(WL[lv - 1] || [])].filter(w => w.length > 1))]).slice(0, 8), sentences: RA_SENTENCES[lv] };
}
// Say It With Me words: [word, sound tags]
const tagsOf = w => { const t = []; if (/r/.test(w)) t.push('r'); if (/l/.test(w)) t.push('l'); if (/s/.test(w)) t.push('s'); if (/th/.test(w)) t.push('th'); if (/^(bl|cl|fl|gr|tr|br|cr|dr|st|sl|pl)/.test(w)) t.push('bl'); return t; };
export const SAY_WORDS = ['truck', 'stop', 'red', 'big', 'look', 'run', 'blue', 'jump', 'help', 'yellow', 'little', 'three', 'where', 'ride', 'under', 'white', 'there', 'they', 'what', 'went', 'water', 'trailer', 'wheel', 'crane', 'fuel', 'road', 'light', 'horn', 'driver', 'mirror', 'cargo', 'port', 'bridge', 'engine'].map(w => [w, tagsOf(w)]);
