// Truck Readers: levels, ages, and age-appropriate wording.
// Reading level and truck-word (vocabulary) level are separate (0 = Warm-Up ... 8 = Level 8). Age sets tone and styling only.
export const LV_MAX = 8;
export const LV_SHORT = ['Warm-Up', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'];
export const READ_DESC = [
  'Warm-Up: pre-reader. Letters, first sounds, rhymes, and truck pictures. Everything is read aloud; no reading needed.',
  'Level 1: first sight words (go, stop, big, red, up, me, we, can).',
  'Level 2: more first words (run, see, look, in, is, it, my, not, I, a).',
  'Level 3: and, away, blue, come, down, find, for, help, here, jump.',
  'Level 4: little, make, one, play, said, the, where, three, to, two, yellow, you, funny.',
  'Level 5: kindergarten words like all, are, black, brown, good, have, like, out, please, pretty.',
  'Level 6: harder kindergarten words like ride, saw, say, she, there, they, want, was, went, what, with.',
  'Level 7: early first-grade words like of, as, his, her, him, had, has, by, or, if, how, your.',
  'Level 8: first-grade challenge words like then, them, some, many, more, from, when, were, long, water.',
];
export const VOCAB_DESC = [
  'Warm-Up: naming big vehicles and things (truck, bus, car, van).',
  'Level 1: simple truck words (horn, light, key, map, road).',
  'Level 2: truck parts and tools (wheel, mirror, fuel, crate).',
  'Level 3: machines and gear (engine, trailer, crane, helmet).',
  'Level 4: job and road words (mechanic, driver, highway, bumper).',
  'Level 5: cargo words (container, diesel, delivery, garage).',
  'Level 6: trip words (foreman, dispatcher, route, journey).',
  'Level 7: careful words (freight, detour, hazard, inspect).',
  'Level 8: challenge words (transport, destination, warehouse).',
];
export const clampLv = v => Math.max(0, Math.min(LV_MAX, Math.round(Number(v) || 0)));
// Suggested level from age (a gentle guess used as a starting point only)
export const lvForAge = age => (Number(age) || 5) <= 4 ? 0 : (Number(age) || 5) === 5 ? 1 : (Number(age) || 5) === 6 ? 3 : 5;
// Story/mission text tiers: 0 = Pre-K/K, 1..3 = grades 1..3, 4 = grades 4-5, 5 = grades 6-8
export const textTier = lv => lv <= 2 ? 0 : lv <= 5 ? 1 : 2;
// Mission dialog: 'k' (Pre-K, K), 'base' (grades 1-3), 'adv' (grades 4-8)
export const missionTier = lv => lv <= 2 ? 'k' : 'base';
export const AGES = [3, 4, 5, 6, 7, 8];
export const ageBand = age => (Number(age) || 5) <= 7 ? 'young' : 'mid';
export const isPreReader = lv => lv === 0;

// Short spoken feedback per age band. Never "wrong". Teens get a calm, grown-up tone.
export const BAND_PHRASES = {
  young: {
    right: ['Yes! That’s right.', 'You got it!', 'Nice work!', 'Great job!', 'That’s it!', 'Awesome!'],
    tryAgain: ['Good try. Here’s the answer.', 'Nice try. Let’s look at the answer.'],
    placement: ['Great listening!', 'Thanks! Here comes the next one.', 'You’re doing great!', 'Nice! Let’s keep going.', 'Good thinking!'],
    stepDone: ['Step done! Nice work.', 'Great! On to the next step.', 'You did it! Step done.'],
    results: ['Goal reached! You mastered this.', 'Good work! Keep practicing to reach the goal.', 'Good effort! Practice helps. You can try again anytime.'],
    levelUp: 'Level up! You are ready for harder words.',
    levelDown: 'Let’s practice some easier words for a while.',
  },
  mid: {
    right: ['Correct!', 'Nice work.', 'That’s it.', 'Well done.', 'Right!'],
    tryAgain: ['Not quite. Here’s the answer.', 'Close. Here’s the answer.'],
    placement: ['Thanks. Next one.', 'Got it. Keep going.', 'Nice. Here’s the next one.', 'Good. Keep it up.'],
    stepDone: ['Step complete.', 'Nice work. Next step.', 'Done. On to the next step.'],
    results: ['Goal reached. Well done.', 'Good work. Keep practicing to reach the goal.', 'Good effort. You can try again anytime.'],
    levelUp: 'Level up. Harder words are unlocked.',
    levelDown: 'Switching to slightly easier practice for a while.',
  },
  teen: {
    right: ['Correct.', 'Nice work.', 'Right.', 'Good call.', 'Solid.'],
    tryAgain: ['Not quite. Here’s the answer.', 'Close. The answer is shown.'],
    placement: ['Got it. Next.', 'Thanks. Next one.', 'Okay. Keep going.', 'Noted. Next one.'],
    stepDone: ['Step complete.', 'Objective done.', 'Done. Next objective.'],
    results: ['Goal reached. Well done.', 'Good work. A little more practice will reach the goal.', 'Good effort. You can retry anytime.'],
    levelUp: 'Level up. Harder material unlocked.',
    levelDown: 'Adjusting to slightly easier practice for now.',
  },
};
// Player looks for the profile picker
export const SKINS = ['#f3d2b3', '#e3a97e', '#c68b59', '#9a6440', '#6b4428'];
export const HAIRS = ['#2a1b10', '#5a3818', '#a0612a', '#e2c16b', '#b8412c', '#8a8a8a'];
export const SHIRTS = ['#2bb3a3', '#4a90d9', '#e25a5a', '#8e5cc7', '#f0a030', '#3aa76d', '#555c66'];
// Hair style, accessory, and outfit choices (stored in each profile's look; missing = the first option)
export const HAIR_STYLES = [['short', 'Short'], ['long', 'Long'], ['ponytail', 'Ponytail'], ['pigtails', 'Pigtails'], ['braids', 'Braids'], ['puffs', 'Curly puffs']];
export const ACCESSORIES = [['none', 'None'], ['bow', 'Bow'], ['headband', 'Headband']];
export const OUTFITS = [['pants', 'Shirt and pants'], ['dress', 'Dress']];
export const BOW_COLOR = '#ff5c9a';
const pickOpt = (v, list) => (list.find(o => o[0] === v) || list[0])[0];
// Fills in defaults so old saved profiles (no style fields) keep the original look
export function normLook(look) {
  const L = look || {};
  return { skin: L.skin ?? 1, hair: L.hair ?? 1, shirt: L.shirt ?? 0, hairStyle: pickOpt(L.hairStyle, HAIR_STYLES), acc: pickOpt(L.acc, ACCESSORIES), outfit: pickOpt(L.outfit, OUTFITS) };
}
export const FOCUS_SOUNDS = { r: 'R', l: 'L', s: 'S', th: 'TH', bl: 'Blends' };
