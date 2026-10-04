// Mission Check content. Each mission has 3 short pages (same pictures at every level).
// Text tiers: 0 = Warm-Up to Level 2 (very short, listening), 1 = Levels 3 to 5, 2 = Levels 6 to 8.
// Question: s = skill (elements | main | wh), lv = lowest level it appears at,
// a = answer, w = wrong answers, p = pictures {answer: icon}
const q = (s, lv, text, a, w, p) => ({ s, lv, q: text, a, w, p: p || {} });

export const STORIES = {
  dump: {
    pics: [['face:fran', 'dump'], ['dump', 'cone'], ['dump']],
    pages: {
      0: ["Fran builds a dump truck.", "She puts out red cones.", "The dump truck can go."],
      1: ["Fran and the crew build a big dump truck.", "Then they put out safety cones.", "Now the dump truck can carry dirt."],
      2: ["Fran is the foreman. She helps the crew build a strong dump truck frame.", "Then the crew puts out orange cones so the road is safe.", "At last the dump truck is ready to carry dirt and rocks to the work site."],
    },
    qs: [
      q('elements', 1, "Who builds the dump truck?", "Fran", ["Ray", "Cruz", "Gus"], { Fran: 'face:fran', Ray: 'face:ray', Cruz: 'face:cruz', Gus: 'face:gus' }),
      q('elements', 1, "What do the cones do?", "They keep the road safe.", ["They make a sound.", "They fill the tank."], { "They keep the road safe.": 'cone', "They make a sound.": 'horn', "They fill the tank.": 'fuel' }),
      q('wh', 1, "What can the dump truck carry?", "Dirt", ["Milk", "Snow"], { Dirt: 'dump', Milk: 'crate', Snow: 'road' }),
      q('wh', 2, "Why do the workers put out cones?", "To keep everyone safe", ["To paint the truck", "To make noise", "To fill the tank"]),
      q('main', 2, "What is this story mostly about?", "A crew builds a dump truck.", ["A ship comes to port.", "A truck runs out of fuel.", "A driver reads a map."]),
    ],
    retell: { cards: [{ text: "The crew builds the truck.", pic: 'dump' }, { text: "They put out cones.", pic: 'cone' }, { text: "The truck carries dirt.", pic: 'road' }], because: { q: "The crew puts out cones because ___.", a: "it keeps the road safe", w: ["it is a game", "the truck is red"] } },
  },
  trailer: {
    pics: [['face:ray', 'trailer'], ['crate', 'trailer'], ['road']],
    pages: {
      0: ["Ray has a trailer.", "He loads the crates.", "The trailer is full."],
      1: ["Ray drives a big rig with a long trailer.", "He reads each crate and loads it on.", "Now the trailer is full and ready to go."],
      2: ["Ray is a trucker. His rig pulls a long trailer, and today it is empty.", "He reads the word on every crate before he loads it, so nothing gets mixed up.", "When the last crate is on, the trailer is full and Ray is ready for the road."],
    },
    qs: [
      q('elements', 1, "Who drives the big rig?", "Ray", ["Fran", "Mo", "Dee"], { Ray: 'face:ray', Fran: 'face:fran', Mo: 'face:mo', Dee: 'face:dee' }),
      q('elements', 1, "What goes on the trailer?", "Crates", ["Cones", "Fuel"], { Crates: 'crate', Cones: 'cone', Fuel: 'fuel' }),
      q('wh', 1, "How does Ray know which crate is which?", "He reads the word.", ["He guesses.", "He sleeps."]),
      q('wh', 2, "When is Ray ready for the road?", "When the trailer is full", ["When the sun is out", "When the tank is empty", "When he is hungry"]),
      q('main', 2, "What is this story mostly about?", "Ray loads his trailer.", ["Mo fixes a wheel.", "A crane climbs a hill.", "Gus finds a map."]),
    ],
    retell: { cards: [{ text: "Ray reads a crate.", pic: 'crate' }, { text: "He loads it on.", pic: 'trailer' }, { text: "The trailer is full.", pic: 'road' }], because: { q: "Ray reads each crate because ___.", a: "he wants to load the right things", w: ["he is sleepy", "it is a song"] } },
  },
  fuel: {
    pics: [['face:gus', 'fuel'], ['fuel'], ['road']],
    pages: {
      0: ["Gus has fuel.", "The rig needs fuel.", "The tank is full."],
      1: ["Gus works at the fuel station.", "A big rig needs lots of fuel.", "Gus fills the tank, and the rig can go far."],
      2: ["Gus works at the pumps all day and helps drivers fill their tanks.", "A big rig uses a lot of fuel, so it needs to stop often.", "When the tank is full, the driver can go a long way down the road."],
    },
    qs: [
      q('elements', 1, "Who works at the fuel station?", "Gus", ["Ray", "Cruz", "Mo"], { Gus: 'face:gus', Ray: 'face:ray', Cruz: 'face:cruz', Mo: 'face:mo' }),
      q('elements', 1, "What does the rig need?", "Fuel", ["Cones", "Crates"], { Fuel: 'fuel', Cones: 'cone', Crates: 'crate' }),
      q('wh', 1, "What happens when the tank is full?", "The rig can go far.", ["The rig can fly.", "The rig is a boat."]),
      q('wh', 2, "Why does a big rig stop at the pumps?", "It uses a lot of fuel.", ["It wants a nap.", "It likes to wait.", "It needs a new color."]),
      q('main', 2, "What is this story mostly about?", "A rig gets fuel.", ["A crane lifts a box.", "A dump truck tips up.", "A mechanic reads a label."]),
    ],
    retell: { cards: [{ text: "The rig needs fuel.", pic: 'fuel' }, { text: "Gus fills the tank.", pic: 'face:gus' }, { text: "The rig goes far.", pic: 'road' }], because: { q: "The rig stops because ___.", a: "it needs fuel", w: ["it is lost", "it is a game"] } },
  },
  parts: {
    pics: [['face:mo', 'part'], ['part', 'tool'], ['dump']],
    pages: {
      0: ["Mo is a mechanic.", "She reads each label.", "The truck is fixed."],
      1: ["Mo is a mechanic. She fixes trucks.", "She reads the label on each part.", "Now the truck runs like new."],
      2: ["Mo is a mechanic, and today a truck needs new parts.", "She reads the label on every part so she picks the right wheel, light, and horn.", "When she is done, the truck runs like new."],
    },
    qs: [
      q('elements', 1, "Who fixes the truck?", "Mo", ["Dee", "Fran", "Gus"], { Mo: 'face:mo', Dee: 'face:dee', Fran: 'face:fran', Gus: 'face:gus' }),
      q('elements', 1, "What does Mo read?", "Labels", ["Maps", "Songs"], { Labels: 'part', Maps: 'map', Songs: 'horn' }),
      q('wh', 1, "What is Mo?", "A mechanic", ["A pilot", "A farmer"]),
      q('wh', 2, "Why does Mo read the labels?", "To pick the right part", ["To pass the time", "To sing", "To paint"]),
      q('main', 2, "What is this story mostly about?", "Mo fixes a truck.", ["Ray loads crates.", "Cruz climbs the crane.", "Dee plans a trip."]),
    ],
    retell: { cards: [{ text: "The truck needs parts.", pic: 'part' }, { text: "Mo reads the labels.", pic: 'face:mo' }, { text: "The truck is fixed.", pic: 'dump' }], because: { q: "Mo reads labels because ___.", a: "she wants the right part", w: ["she likes songs", "it is dark"] } },
  },
  port: {
    pics: [['face:cruz', 'crane'], ['crane'], ['crane', 'road']],
    pages: {
      0: ["Cruz runs a crane.", "The crane lifts a box.", "The box goes on a truck."],
      1: ["Cruz runs the big crane at the port.", "The crane lifts a container off the ship.", "Then the container goes on a truck."],
      2: ["Cruz sits high up in the crane at the port. Ships bring in big metal containers.", "She lifts each container carefully off the ship and sets it down.", "Then trucks carry the containers to stores and towns all over."],
    },
    qs: [
      q('elements', 1, "Who runs the crane?", "Cruz", ["Ray", "Gus", "Fran"], { Cruz: 'face:cruz', Ray: 'face:ray', Gus: 'face:gus', Fran: 'face:fran' }),
      q('elements', 1, "What does the crane lift?", "A box", ["A star", "A hill"], { "A box": 'crate', "A star": 'part', "A hill": 'road' }),
      q('wh', 1, "Where does the box go next?", "On a truck", ["In a tree", "In the sky"]),
      q('wh', 2, "Why does Cruz lift things carefully?", "To keep everyone safe", ["To be slow", "To be loud", "To go home"]),
      q('main', 2, "What is this story mostly about?", "A crane moves containers.", ["A truck runs out of fuel.", "A mechanic fixes a horn.", "A foreman builds a frame."]),
    ],
    retell: { cards: [{ text: "A ship brings a box.", pic: 'crate' }, { text: "The crane lifts it.", pic: 'crane' }, { text: "A truck takes it.", pic: 'road' }], because: { q: "Cruz is careful because ___.", a: "it keeps people safe", w: ["it is a race", "she is sleepy"] } },
  },
  trip: {
    pics: [['face:dee', 'map'], ['map', 'road'], ['road']],
    pages: {
      0: ["Dee plans a trip.", "We go to four stops.", "We say hello to all."],
      1: ["Dee is the dispatcher. She plans a road trip.", "We go to Minnesota, Maryland, Texas, and El Salvador.", "At each stop we say hello and drop off a delivery."],
      2: ["Dee is the dispatcher, and she plans a long road trip with four stops.", "The driver visits Minnesota, Maryland, Texas, and El Salvador, reading the signs along the way.", "At each stop, the driver makes a delivery, and the people there say thank you."],
    },
    qs: [
      q('elements', 1, "Who plans the trip?", "Dee", ["Mo", "Ray", "Cruz"], { Dee: 'face:dee', Mo: 'face:mo', Ray: 'face:ray', Cruz: 'face:cruz' }),
      q('elements', 1, "How many stops are there?", "Four", ["Two", "Nine"]),
      q('wh', 1, "What does the driver do at each stop?", "Makes a delivery", ["Takes a nap", "Builds a boat"]),
      q('wh', 2, "Which one is a stop on the trip?", "Texas", ["The moon", "A pond", "A cave"]),
      q('main', 2, "What is this story mostly about?", "A road trip with four stops", ["A truck that will not start", "A ship at the port", "A dump truck at work"]),
    ],
    retell: { cards: [{ text: "Dee plans the trip.", pic: 'map' }, { text: "The driver goes to four stops.", pic: 'road' }, { text: "Everyone says thank you.", pic: 'face:dee' }], because: { q: "The driver goes to the stops because ___.", a: "there are deliveries to make", w: ["it is a race", "the truck is lost"] } },
  },
};
