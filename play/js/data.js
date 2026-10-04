// Truck Readers: missions, helpers, words, and spoken lines. Secular, child-safe content only.
// The player is always called "Driver" by the helpers. Lines are arrays of short strings (1-2 sentences each).
export const TRANSLATION = "Free to play. Works offline. No ads, no accounts, no tracking.";

// ---------- Badges (one per mission) ----------
export const BADGES = [
  { id: 'builder', name: 'Builder', color: '#f2a900', hint: 'Finish Build a Dump Truck.' },
  { id: 'loader', name: 'Loader', color: '#3b82d9', hint: 'Finish Load the Trailer.' },
  { id: 'fueler', name: 'Fuel Pro', color: '#e0503c', hint: 'Finish Fuel the Rig.' },
  { id: 'fixer', name: 'Fixer', color: '#3aa76d', hint: 'Finish Fix the Truck.' },
  { id: 'crane', name: 'Crane Pal', color: '#8e5cc7', hint: 'Finish Port Crane.' },
  { id: 'tripper', name: 'Road Tripper', color: '#16a5a5', hint: 'Finish the Road Trip.' },
];

// ---------- Truck facts (shown from the Talk menu; short, true, and kid-friendly) ----------
export const FACTS = {
  dump: "A dump truck has a bed that tips up, so the load slides out the back.",
  trailer: "A big rig pulls a long trailer. A trailer can carry many boxes and crates.",
  fuel: "Big trucks use diesel fuel. A full tank can take a truck very far.",
  parts: "A truck has wheels, lights, mirrors, and a horn. Drivers check them before every trip.",
  port: "A port crane lifts big metal boxes called containers off ships and onto trucks.",
  trip: "Truck drivers read road signs and maps to find their way from town to town.",
  guide: "Trucks carry food, toys, and building things all over the country.",
};

// ---------- Helpers (characters). look: robe = work clothes, sash = belt or vest, wrap = hard hat or cap ----------
export const NPCS = [
  { id: "dee", name: "Dee", quest: "trip", x: 50.5, z: 49.5, look: { robe: "#2f6fb0", sash: "#f2a900", skin: "#e0ac7e", hair: "#3b2416", wrap: null, beard: null, collar: "#ffffff" } },
  { id: "fran", name: "Foreman Fran", quest: "dump", x: 53.5, z: 37.5, look: { robe: "#e8832a", sash: "#f6e04a", skin: "#c68b59", hair: "#2b1d12", wrap: "#f6d21e", beard: null } },
  { id: "ray", name: "Ray the Trucker", quest: "trailer", x: 39.5, z: 44.5, look: { robe: "#b33b3b", sash: "#2b2b2b", skin: "#e2b48c", hair: "#6b4423", wrap: "#2b4a7a", beard: "#6b4423" } },
  { id: "cruz", name: "Crane Operator Cruz", quest: "port", x: 66.5, z: 70.5, look: { robe: "#2e9e8f", sash: "#f6e04a", skin: "#b9804f", hair: "#1e140c", wrap: "#f6f6f6", beard: null } },
  { id: "gus", name: "Gus at the Pumps", quest: "fuel", x: 22.5, z: 66.5, look: { robe: "#3f8a4a", sash: "#e8e8e8", skin: "#d49b6a", hair: "#4a2f1a", wrap: "#c43b3b", beard: "#4a2f1a" } },
  { id: "mo", name: "Mechanic Mo", quest: "parts", x: 17.5, z: 76.5, look: { robe: "#3a5da8", sash: "#c9c9c9", skin: "#d8a47a", hair: "#2a1b10", wrap: null, beard: null, staff: true } },
  // Road trip stops (friendly people who receive deliveries)
  { id: "stop1", name: "Minnesota Stop", role: "stop", x: 21.5, z: 22.5, look: { robe: "#c43b3b", sash: "#f4f4f4", skin: "#e8b98a", hair: "#e2c16b", wrap: "#f4f4f4", beard: null } },
  { id: "stop2", name: "Maryland Stop", role: "stop", x: 47.5, z: 17.5, look: { robe: "#2f6fb0", sash: "#e8c36a", skin: "#c68b59", hair: "#2b1d12", wrap: null, beard: "#2b1d12" } },
  { id: "stop3", name: "Texas Stop", role: "stop", x: 74.5, z: 23.5, look: { robe: "#8a5a33", sash: "#e0c080", skin: "#d49b6a", hair: "#3a2616", wrap: "#a07040", beard: null } },
  { id: "stop4", name: "El Salvador Stop", role: "stop", x: 88.5, z: 52.5, look: { robe: "#2e9e4f", sash: "#ffffff", skin: "#b9804f", hair: "#1e140c", wrap: null, beard: null } },
];

// Mission text. 'steps' texts are what the tracker shows. type: planks | collect | share | reach | fill | talk
export const QUESTS = {
  dump: {
    title: "Build a Dump Truck", npc: "fran", badge: "builder",
    words: ["dump", "frame", "build", "cone", "crew"],
    intro: ["Hi Driver! I’m Fran, the construction foreman.", "We need a big dump truck to move dirt.", "Let’s build one together, block by block.", "First we build the frame. Then we put out safety cones."],
    start: "Let’s build it!",
    steps: [
      { type: "planks", count: 10, text: "Place blocks in the glowing truck frame", label: "Blocks placed" },
      { type: "collect", item: "cone", count: 3, text: "Read and pick up 3 safety cones", label: "Cones" },
      { type: "talk", npc: "fran", text: "Go back and talk to Fran" },
    ],
    outro: ["Wow! Look at that dump truck!", "It is strong and ready to work.", "You are a great builder, Driver."],
    done: ["The dump truck works hard every day.", "Thanks again for your help, Driver!"],
    remind: "Follow the arrow. You can do it!",
  },
  trailer: {
    title: "Load the Trailer", npc: "ray", badge: "loader",
    words: ["trailer", "crate", "load", "cargo", "rig"],
    intro: ["Hey Driver! I’m Ray. I drive a big rig.", "My trailer is empty, and we have a long trip.", "Can you load word crates onto my trailer?", "Read each crate to pick it up."],
    start: "Let’s load up!",
    steps: [
      { type: "collect", item: "crate", count: 5, text: "Read and pick up 5 word crates", label: "Crates loaded" },
      { type: "talk", npc: "ray", text: "Bring the crates to Ray" },
    ],
    outro: ["The trailer is full! Good reading, Driver.", "Now my rig is ready to roll.", "Thanks for the great help."],
    done: ["My rig is loaded and ready.", "Thanks again, Driver!"],
    remind: "Look for the crates with words on them.",
  },
  fuel: {
    title: "Fuel the Rig", npc: "gus", badge: "fueler",
    words: ["fuel", "pump", "tank", "diesel", "gauge"],
    intro: ["Hi Driver! I’m Gus. I work at the fuel station.", "A big rig needs lots of fuel to go far.", "Can you bring me 3 fuel cans?", "Read each can to pick it up."],
    start: "I’ll find them!",
    steps: [
      { type: "collect", item: "fuel", count: 3, text: "Read and pick up 3 fuel cans", label: "Fuel cans" },
      { type: "talk", npc: "gus", text: "Bring the fuel to Gus" },
    ],
    outro: ["Glug, glug! The tank is full.", "The rig can go a long way now.", "Great work, Driver."],
    done: ["A full tank means a happy trip.", "Thanks again for the fuel!"],
    remind: "The fuel cans are near the pumps.",
  },
  parts: {
    title: "Fix the Truck", npc: "mo", badge: "fixer",
    words: ["wheel", "horn", "mirror", "light", "mechanic"],
    intro: ["Hello, Driver! I’m Mo, the mechanic.", "This truck needs some new parts.", "Each part has a label on it.", "Read the label, and bring me 4 parts."],
    start: "Let’s fix it!",
    steps: [
      { type: "collect", item: "part", count: 4, text: "Read the labels and pick up 4 truck parts", label: "Truck parts" },
      { type: "talk", npc: "mo", text: "Bring the parts to Mo" },
    ],
    outro: ["Click, clack! The truck is fixed.", "The wheel, the horn, and the lights all work.", "You read every label. Nice, Driver!"],
    done: ["That truck runs like new.", "Thanks again, Driver!"],
    remind: "The parts are on the shelves by the garage.",
  },
  port: {
    title: "Port Crane", npc: "cruz", badge: "crane",
    words: ["port", "crane", "container", "ship", "dock"],
    intro: ["Hi Driver! I’m Cruz. I run the big crane at the port.", "Ships bring big metal boxes called containers.", "Help me stack some blocks at the dock.", "Then climb up to the crane deck to see the view."],
    start: "I’ll climb it!",
    steps: [
      { type: "fill", count: 6, text: "Stack 6 blocks in the glowing dock spot", label: "Dock blocks" },
      { type: "reach", where: "crane", text: "Climb up to the crane deck" },
      { type: "talk", npc: "cruz", text: "Go back and talk to Cruz" },
    ],
    outro: ["You stacked the blocks and climbed the crane!", "The port is a busy place, and you helped.", "Thank you, Driver."],
    done: ["Ships and trucks work together at the port.", "Thanks again, Driver!"],
    remind: "Follow the arrow. Take your time.",
  },
  trip: {
    title: "Road Trip", npc: "dee", badge: "tripper",
    words: ["road", "trip", "map", "stop", "deliver"],
    intro: ["Hi Driver! I’m Dee, the dispatcher. Welcome to Truck Readers!", "See the people with a gold mark? They could use your help.", "The arrow at the top shows where to go next.", "Today we have a road trip. We deliver to four stops: Minnesota, Maryland, Texas, and El Salvador."],
    start: "Let’s roll!",
    steps: [
      { type: "share", npcs: ["stop1", "stop2", "stop3", "stop4"], text: "Deliver to the 4 road trip stops", label: "Stops" },
      { type: "talk", npc: "dee", text: "Go back and talk to Dee" },
    ],
    outro: ["You made all four deliveries!", "Minnesota, Maryland, Texas, and El Salvador all say thank you.", "What a great road trip, Driver."],
    done: ["You are a great driver.", "Come back any time for more trips!"],
    remind: "Look for the stops along the road.",
  },
};
export const QUEST_ORDER = ["dump", "trailer", "fuel", "parts", "port", "trip"];

export const NPC_LINES = {
  stop: ["Hello, Driver! Thanks for stopping by."],
  stopDone: ["Thank you for the delivery!"],
  shareLines: {
    stop1: ["Hello from Minnesota! It is snowy and cold here.", "Thank you for the delivery, Driver!"],
    stop2: ["Hello from Maryland! We have boats and blue crabs.", "Thank you for the delivery, Driver!"],
    stop3: ["Howdy from Texas! The roads here are long and wide.", "Thank you for the delivery, Driver!"],
    stop4: ["Hello from El Salvador! It is warm and sunny here.", "Thank you for the delivery, Driver!"],
  },
  busy: "Hi! You’re already helping with another mission.",
  busyPrompt: "What do you want to do?",
};
export const HELLOS = { dee: "Hi, Driver!", fran: "Hey, Driver!", ray: "Hello, Driver!", cruz: "Hi there!", gus: "Hi, Driver!", mo: "Hello!", stop1: "Hello!", stop2: "Hi!", stop3: "Howdy!", stop4: "Hello!" };
// Which voice each character uses: m = man's voice, n = narrator (woman's voice)
export const NPC_VOICE = { dee: "n", fran: "n", ray: "m", cruz: "m", gus: "m", mo: "m", stop1: "n", stop2: "m", stop3: "m", stop4: "n" };

// Short spoken feedback. Always kind: never "wrong".
export const PHRASES = {
  right: ["Yes! That’s right.", "You got it!", "Nice work!", "Great job!", "That’s it!", "Awesome!"],
  tryAgain: ["Good try. Here’s the answer.", "Nice try. Let’s look at the answer."],
  retellRight: "You put it in the right order!",
  retellTry: "Good try! Here is the right order.",
  stepDone: ["Step done! Nice work.", "Great! On to the next step.", "You did it! Step done."],
  missionDone: "Mission complete! Way to go!",
  blockHint: "Place blocks inside the glowing box.",
  newWords: "Here are some new words for this mission.",
  raYes: ["You read it!", "Wonderful reading!", "You did it! Great reading."],
  raTry: "Nice try! Listen, and try again.",
  raEffort: "Great effort! Here’s a star for practicing. You can move on.",
  raNoHear: "I didn’t hear anything. Tap the microphone and try again.",
  raSelf: "That was you! Nice job practicing.",
  saidIt: ["Wonderful! You get a star for practicing.", "Great practicing! Say it as many times as you like."],
  results: ["Goal reached! You mastered this.", "Good work! Keep practicing to reach the goal.", "Good effort! Practice helps. You can try again anytime."],
  levelUp: { 2: "Level up! You are ready for harder words.", 3: "Level up! You are ready for harder words." },
  levelDown: { 1: "Let’s practice some easier words for a while.", 2: "Let’s practice some easier words for a while." },
  welcome: "Welcome to Truck Readers! Let’s build, read, and drive.",
  readLabel: "Read the label.",
  readLabelWord: "Tap the word you hear.",
  readLabelPic: "Tap the picture that matches the word.",
  readLabelFill: "Pick the word that fits.",
  loaded: "Loaded!",
  checkDone: "Got it! Nice reading.",
};
export const LEVEL_NAMES = ["Warm-Up", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8"];
// Hotbar: Yellow, Red, Blue, Steel, Crate, Planks, Glass, Asphalt, Stone, Grass, Brick, Wool
export const BLOCK_HOTBAR = [18, 19, 20, 17, 21, 8, 10, 16, 3, 1, 11, 12];

// ---------- Talk menu (all lines are pre-recorded; no free chat) ----------
// hints: [not started, ...one per step..., done]. "giver" = said by the mission helper (first person),
// "helper" = said by the road trip stops (about the mission).
export const TALK = {
  labels: { again: "Tell me the mission again.", next: "What do I do next?", story: "Tell me about your job.", fact: "Tell me a truck fact.", bye: "Goodbye.", replay: "Hear the mission again.", start: "Start the mission.", finish: "Finish the mission.", deliver: "Take the delivery.", hello: "Say hello." },
  open: "What would you like to talk about?",
  noCatch: "Hmm, I didn’t catch that. You can tap a button, or try again!",
  bye: "Goodbye, Driver! Come back any time.",
  factLead: "Here is a truck fact.",
  allDone: "You finished every mission! You can build anything you like.",
  allDoneStory: "Trucks carry food, toys, and building things all over the country. You helped in every mission here. Great job!",
  hints: {
    dump: {
      giver: ["I need your help to build a dump truck. Tap the star button to start!", "Pick a block at the bottom. Then tap Place inside the glowing box.", "Walk to the orange cones. Read each one to pick it up.", "Nice! Tap the star button, and we will finish the truck.", "The dump truck is done. Thank you, Driver!"],
      helper: ["Foreman Fran needs help to build a dump truck. Look for her.", "Place blocks inside the glowing box.", "Read and pick up the safety cones.", "Go back and talk to Fran.", "You helped Fran build the dump truck. Great job!"],
    },
    trailer: {
      giver: ["I need word crates for my trailer. Tap the star button to start!", "Walk up to a crate. Read it, and it goes on the trailer.", "The trailer is full! Tap the star button to finish.", "The trailer is loaded. Thank you, Driver!"],
      helper: ["Ray needs help to load his trailer. Look for him.", "Read and pick up the word crates.", "Take the crates back to Ray.", "You helped Ray load the trailer. Great job!"],
    },
    fuel: {
      giver: ["I need three fuel cans. Tap the star button to start!", "Walk up to a fuel can. Read it to pick it up.", "You have all the fuel! Tap the star button to finish.", "The tank is full. Thank you, Driver!"],
      helper: ["Gus needs help at the fuel station. Look for him.", "Read and pick up the fuel cans.", "Take the fuel back to Gus.", "You helped Gus fuel the rig. Great job!"],
    },
    parts: {
      giver: ["This truck needs four new parts. Tap the star button to start!", "Walk up to a part. Read its label to pick it up.", "You have all the parts! Tap the star button to finish.", "The truck is fixed. Thank you, Driver!"],
      helper: ["Mo needs help to fix a truck. Look for the garage.", "Read the labels and pick up the parts.", "Take the parts back to Mo.", "You helped Mo fix the truck. Great job!"],
    },
    port: {
      giver: ["Will you help at the port? Tap the star button to start.", "Place blocks inside the glowing box at the dock.", "Climb the hill to the crane deck. Follow the arrow.", "You climbed up! Come back and tap the star button.", "The port is ready. Thank you, Driver!"],
      helper: ["Cruz needs help at the port. Look for the big crane.", "Stack blocks in the glowing spot at the dock.", "Climb up to the crane deck.", "Go back and talk to Cruz.", "You helped Cruz at the port. Great job!"],
    },
    trip: {
      giver: ["Let’s go on a road trip! Tap the star button to start.", "Visit each stop and take the delivery. Follow the arrow.", "All four deliveries are done! Tap the star button to finish.", "What a great road trip. Thank you, Driver!"],
      helper: ["Dee has a road trip for you. Look for her at the depot.", "Visit the four stops. Follow the arrow.", "Go back and talk to Dee.", "You finished the road trip. Great job!"],
    },
  },
  stories: {
    dump: { giver: "I am a construction foreman. I help the crew build roads and buildings. Dump trucks carry the dirt and gravel we need.", },
    trailer: { giver: "I am a trucker. I drive a big rig with a long trailer. I carry boxes from town to town, and I read lots of signs." },
    fuel: { giver: "I work at the fuel station. I help drivers fill their tanks, so their trucks can go far." },
    parts: { giver: "I am a mechanic. I fix trucks. I check the wheels, the lights, and the horn, and I read the label on every part." },
    port: { giver: "I am a crane operator. I sit high up and lift big containers from ships onto trucks. I take care to be safe." },
    trip: { giver: "I am a dispatcher. I tell drivers where to go. Today I sent you to four stops across the country.", helper: "People at the stops wait for deliveries. Drivers bring food, toys, and more." },
  },
};
// Which mission a helper character talks about
export const HELPER_QUEST = { stop1: "trip", stop2: "trip", stop3: "trip", stop4: "trip" };

// ---------- Mission text at other reading levels ----------
// 'k' = Warm-Up to Level 2 (very short, always read aloud). The base text above is for Level 3 and up.
export const QUEST_TIERS = {
  k: {
    dump: { intro: ["Hi! I am Fran.", "We need a big dump truck.", "Can you help me build it?"], steps: ["Put blocks in the glowing box", "Pick up 3 cones", "Go back to Fran"], outro: ["We did it! The truck is done.", "You are a great builder."], done: ["Thank you, Driver!"], remind: "Follow the arrow." },
    trailer: { intro: ["Hi! I am Ray.", "My trailer is empty.", "Can you fill it with crates?"], steps: ["Pick up 5 crates", "Go back to Ray"], outro: ["The trailer is full! Good job.", "Now we can go."], done: ["Thank you, Driver!"], remind: "Look for the crates." },
    fuel: { intro: ["Hi! I am Gus.", "A big rig needs fuel.", "Can you get 3 fuel cans?"], steps: ["Pick up 3 fuel cans", "Go back to Gus"], outro: ["The tank is full!", "Good job, Driver."], done: ["Thank you, Driver!"], remind: "Look by the pumps." },
    parts: { intro: ["Hi! I am Mo.", "This truck needs parts.", "Can you bring me 4 parts?"], steps: ["Pick up 4 truck parts", "Go back to Mo"], outro: ["The truck is fixed!", "You read the labels. Good job."], done: ["Thank you, Driver!"], remind: "Look by the garage." },
    port: { intro: ["Hi! I am Cruz.", "I run the big crane.", "Can you stack some blocks?", "Then climb up to the crane."], steps: ["Put blocks in the glowing box", "Climb up to the crane", "Go back to Cruz"], outro: ["You did it! Thank you.", "The port is ready."], done: ["Thank you, Driver!"], remind: "Follow the arrow." },
    trip: { intro: ["Hi! I am Dee.", "Welcome to Truck Readers!", "Let’s go on a road trip.", "We visit four stops."], steps: ["Visit the 4 stops", "Go back to Dee"], outro: ["All four stops are done!", "What a great trip, Driver."], done: ["Thank you, Driver!"], remind: "Follow the arrow." },
  },
};
const QUEST_BASE = JSON.parse(JSON.stringify(Object.fromEntries(Object.entries(QUESTS).map(([k, q]) => [k, { intro: q.intro, outro: q.outro, done: q.done, remind: q.remind, steps: q.steps.map(s => s.text), options: q.choice ? q.choice.options.map(o => o.text) : null }]))));
// Swap mission text in place for the child's reading level ('k' | 'base')
export function applyMissionTier(tier) {
  for (const [id, Q] of Object.entries(QUESTS)) {
    const b = QUEST_BASE[id], o = (QUEST_TIERS[tier] || {})[id] || {};
    Q.intro = o.intro || b.intro; Q.outro = o.outro || b.outro; Q.done = o.done || b.done; Q.remind = o.remind || b.remind;
    Q.steps.forEach((s, i) => { s.text = (o.steps && o.steps[i]) || b.steps[i]; });
  }
}

// ---------- Say It With Me: short phrases to say out loud (never graded) ----------
export const PRACTICE = [
  { id: "p1", ref: "I see a big truck.", chunks: ["I see", "a big truck."] },
  { id: "p2", ref: "The red truck can go.", chunks: ["The red truck", "can go."] },
  { id: "p3", ref: "Stop at the red light.", chunks: ["Stop", "at the red light."] },
  { id: "p4", ref: "We can look and see.", chunks: ["We can look", "and see."] },
  { id: "p5", ref: "Jump up and help me.", chunks: ["Jump up", "and help me."] },
  { id: "p6", ref: "Come down here and play.", chunks: ["Come down here", "and play."] },
  { id: "p7", ref: "The little truck ran away.", chunks: ["The little truck", "ran away."] },
  { id: "p8", ref: "I want to ride in the truck.", chunks: ["I want to ride", "in the truck."] },
  { id: "p9", ref: "What did the driver see?", chunks: ["What did", "the driver see?"] },
  { id: "p10", ref: "The truck went down the long road.", chunks: ["The truck went", "down the long road."] },
];

// ---------- Word Book: mission words and truck words (definitions and example sentences) ----------
export const WORDS = {
  dump: { def: "A truck with a bed that tips up to pour out its load.", ex: "The dump truck tipped up its bed." },
  frame: { def: "The strong base that holds the parts of a truck together.", ex: "We built the frame first." },
  build: { def: "To make something by putting parts together.", ex: "We build a truck with blocks." },
  cone: { def: "An orange safety marker that tells drivers to be careful.", ex: "The cone is on the road." },
  crew: { def: "A group of people who work together.", ex: "The crew works on the road." },
  trailer: { def: "A long box on wheels that a truck pulls.", ex: "The trailer is full of crates." },
  crate: { def: "A strong box for carrying things.", ex: "I can lift the crate." },
  load: { def: "To put things on a truck. Also, the things on a truck.", ex: "We load the crates." },
  cargo: { def: "Things that a truck, ship, or plane carries.", ex: "The cargo is on the truck." },
  rig: { def: "A big truck with a trailer, also called a semi.", ex: "The big rig goes fast." },
  fuel: { def: "What a truck burns to make its engine go.", ex: "The rig needs fuel." },
  pump: { def: "A machine that moves fuel into a tank.", ex: "Gus uses the pump." },
  tank: { def: "A big container that holds fuel.", ex: "The tank is full." },
  diesel: { def: "A kind of fuel that big trucks use.", ex: "Big trucks use diesel." },
  gauge: { def: "A dial that shows how much fuel is in the tank.", ex: "The gauge says full." },
  wheel: { def: "A round part that turns so a truck can roll.", ex: "The truck has big wheels." },
  horn: { def: "A part that makes a loud sound, like honk.", ex: "Honk the horn!" },
  mirror: { def: "A glass on a truck that shows what is behind it.", ex: "I look in the mirror." },
  light: { def: "A part that glows so a driver can see at night.", ex: "The light is on." },
  mechanic: { def: "A person who fixes trucks and cars.", ex: "Mo is a mechanic." },
  port: { def: "A busy place by the water where ships load and unload.", ex: "Ships come to the port." },
  crane: { def: "A tall machine that lifts heavy things.", ex: "The crane lifts a box." },
  container: { def: "A big metal box that holds cargo.", ex: "The container is on the ship." },
  ship: { def: "A very big boat.", ex: "The ship is at the dock." },
  dock: { def: "A place where ships stop to load and unload.", ex: "The ship is at the dock." },
  road: { def: "A path where cars and trucks drive.", ex: "The road is long." },
  trip: { def: "A journey from one place to another.", ex: "We go on a road trip." },
  map: { def: "A drawing that shows where places are.", ex: "I look at the map." },
  stop: { def: "To not go. Also, a place where a driver visits.", ex: "Stop at the red light." },
  deliver: { def: "To take something to the place it needs to go.", ex: "We deliver the crates." },
};
// Extra truck words used by pictures and the Word Book popup
export const GLOSSARY = {
  truck: "A big vehicle that carries things.", bus: "A big vehicle that carries many people.", van: "A small truck with a box in back.", car: "A small vehicle for a few people.",
  tire: "A rubber ring around a wheel.", engine: "The part that makes a truck go.", trailer: "A long box on wheels that a truck pulls.", cab: "The part of a truck where the driver sits.",
  bumper: "A strong bar on the front or back of a truck.", hood: "The cover over the front of a truck.", key: "A small tool that starts a truck.", ladder: "Steps that help you climb up.",
  tractor: "A strong machine that pulls things on a farm.", bulldozer: "A big machine that pushes dirt.", excavator: "A big machine that digs holes.", mixer: "A truck that mixes cement as it drives.",
  tow: "To pull a car or truck that cannot go.", plow: "A big blade that pushes snow off the road.", garbage: "Things we throw away.", tanker: "A truck with a big tank for liquids.",
  highway: "A big, fast road.", driver: "The person who drives.", helmet: "A hard hat that keeps your head safe.", tunnel: "A road that goes under a mountain or river.", bridge: "A road that goes over water.",
  signal: "A light that tells drivers to stop or go.", exhaust: "The pipe where smoke leaves the engine.", hitch: "The part that joins a trailer to a truck.", delivery: "Something taken to a place.",
  minnesota: "A cold state in the middle of the country.", maryland: "A state by the sea.", texas: "A big state in the south.", salvador: "A small, warm country in Central America.",
};

// compatibility names used by the shared screens
export const VIRTUES = BADGES;

// ---------- Simple mode for children who are just starting to read: one task at a time, spoken and shown with a picture ----------
export const KID_ORDER = ["trailer", "fuel", "parts", "dump", "port", "trip"];
export const KID = {
  find: n => `Let’s find ${n}! Follow the arrow.`,
  talk: "We are here! Tap the Talk button.",
  back: n => `Go back to ${n}!`,
  collect: { crate: "Let’s find a crate! Walk up to it.", cone: "Let’s find a cone! Walk up to it.", fuel: "Let’s find a fuel can! Walk up to it.", part: "Let’s find a truck part! Walk up to it." },
  planks: "Put blocks in the glowing box! Tap Place.",
  fill: "Put blocks in the glowing spot! Tap Place.",
  reach: "Climb up to the crane!",
  share: "Let’s visit the next stop!",
  free: "You did it! Now you can build and drive anywhere.",
  icons: { crate: "crate", cone: "cone", fuel: "fuel", part: "part", planks: "dump", fill: "crane", reach: "crane", share: "map" },
};
