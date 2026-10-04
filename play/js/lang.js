// Language support: per-profile choice of English / Español / both.
//   en   : everything in English.
//   es   : instructions, mission talk, and prompts are shown and spoken in Spanish (letters are named in Spanish).
//   both : English on screen; every instruction is spoken in Spanish first, then English.
import { activeProfile } from './save.js';
export const LETTER_ES = { a: 'a', b: 'be', c: 'ce', d: 'de', e: 'e', f: 'efe', g: 'ge', h: 'hache', i: 'i', j: 'jota', k: 'ka', l: 'ele', m: 'eme', n: 'ene', o: 'o', p: 'pe', q: 'cu', r: 'erre', s: 'ese', t: 'te', u: 'u', v: 'uve', w: 'doble ve', x: 'equis', y: 'ye', z: 'zeta' };
export const ES = {
  'Hi!': '¡Hola!', 'I am Fran.': 'Soy Fran.', 'I am Ray.': 'Soy Ray.', 'I am Gus.': 'Soy Gus.', 'I am Mo.': 'Soy Mo.', 'I am Cruz.': 'Soy Cruz.', 'I am Dee.': 'Soy Dee.',
  'We need a big dump truck.': 'Necesitamos un camión de volteo grande.', 'Can you help me build it?': '¿Me ayudas a construirlo?', 'We did it!': '¡Lo logramos!', 'The truck is done.': 'El camión está listo.',
  'You are a great builder.': 'Eres un gran constructor.', 'Thank you, Driver!': '¡Gracias, Conductor!', 'Follow the arrow.': 'Sigue la flecha.', 'Let’s build it!': '¡Vamos a construirlo!',
  'Build a Dump Truck': 'Construye un camión de volteo', 'Put blocks in the glowing box': 'Pon bloques en la caja brillante', 'Pick up 3 cones': 'Recoge 3 conos',
  'My trailer is empty.': 'Mi remolque está vacío.', 'Can you fill it with crates?': '¿Lo llenas con cajas?', 'The trailer is full!': '¡El remolque está lleno!', 'Good job.': 'Buen trabajo.', 'Now we can go.': 'Ahora podemos irnos.',
  'Look for the crates.': 'Busca las cajas.', 'Let’s load up!': '¡A cargar!', 'Load the Trailer': 'Carga el remolque', 'Pick up 5 crates': 'Recoge 5 cajas',
  'A big rig needs fuel.': 'Un camión grande necesita combustible.', 'Can you get 3 fuel cans?': '¿Puedes traer 3 latas de combustible?', 'The tank is full!': '¡El tanque está lleno!', 'Good job, Driver.': 'Buen trabajo, Conductor.',
  'Look by the pumps.': 'Busca junto a las bombas.', 'I’ll find them!': '¡Las voy a encontrar!', 'Fuel the Rig': 'Llena el tanque del camión', 'Pick up 3 fuel cans': 'Recoge 3 latas de combustible',
  'This truck needs parts.': 'Este camión necesita piezas.', 'Can you bring me 4 parts?': '¿Me traes 4 piezas?', 'The truck is fixed!': '¡El camión está arreglado!', 'You read the labels.': 'Leíste las etiquetas.',
  'Look by the garage.': 'Busca junto al taller.', 'Let’s fix it!': '¡Vamos a arreglarlo!', 'Fix the Truck': 'Arregla el camión', 'Pick up 4 truck parts': 'Recoge 4 piezas del camión',
  'I run the big crane.': 'Yo manejo la grúa grande.', 'Can you stack some blocks?': '¿Puedes apilar unos bloques?', 'Then climb up to the crane.': 'Luego sube a la grúa.', 'You did it!': '¡Lo hiciste!', 'Thank you.': 'Gracias.',
  'The port is ready.': 'El puerto está listo.', 'I’ll climb it!': '¡Voy a subir!', 'Port Crane': 'La grúa del puerto', 'Climb up to the crane': 'Sube a la grúa',
  'Welcome to Truck Readers!': '¡Bienvenido a Truck Readers!', 'Let’s go on a road trip.': 'Vamos de viaje por carretera.', 'We visit four stops.': 'Visitamos cuatro paradas.', 'All four stops are done!': '¡Las cuatro paradas están listas!',
  'What a great trip, Driver.': '¡Qué gran viaje, Conductor!', 'Let’s roll!': '¡Vámonos!', 'Road Trip': 'Viaje por carretera', 'Visit the 4 stops': 'Visita las 4 paradas',
  'Hello from Minnesota!': '¡Hola desde Minnesota!', 'It is snowy and cold here.': 'Aquí hay nieve y hace frío.', 'Thank you for the delivery, Driver!': '¡Gracias por la entrega, Conductor!',
  'Hello from Maryland!': '¡Hola desde Maryland!', 'We have boats and blue crabs.': 'Tenemos barcos y cangrejos azules.', 'Howdy from Texas!': '¡Hola desde Texas!', 'The roads here are long and wide.': 'Las carreteras aquí son largas y anchas.',
  'Hello from El Salvador!': '¡Hola desde El Salvador!', 'It is warm and sunny here.': 'Aquí hace calor y hay sol.', 'Hello, Driver!': '¡Hola, Conductor!', 'Thanks for stopping by.': 'Gracias por venir.',
  'You’re already helping with another mission.': 'Ya estás ayudando en otra misión.', 'What do you want to do?': '¿Qué quieres hacer?', 'Hi, Driver!': '¡Hola, Conductor!', 'Hey, Driver!': '¡Oye, Conductor!', 'Hi there!': '¡Hola!', 'Hello!': '¡Hola!', 'Howdy!': '¡Hola!',
  'Tell me the mission again.': 'Dime la misión otra vez.', 'What do I do next?': '¿Qué hago ahora?', 'Tell me about your job.': 'Cuéntame de tu trabajo.', 'Tell me a truck fact.': 'Dime un dato de camiones.', 'Goodbye.': 'Adiós.',
  'Hear the mission again.': 'Escucha la misión otra vez.', 'Start the mission.': 'Empieza la misión.', 'Finish the mission.': 'Termina la misión.', 'Take the delivery.': 'Recibe la entrega.', 'Say hello.': 'Saluda.',
  'What would you like to talk about?': '¿De qué quieres hablar?', 'Hmm, I didn’t catch that.': 'Mmm, no te entendí.', 'You can tap a button, or try again!': 'Toca un botón o inténtalo otra vez.', 'Goodbye, Driver!': '¡Adiós, Conductor!', 'Come back any time.': 'Vuelve cuando quieras.',
  'Here is a truck fact.': 'Aquí tienes un dato de camiones.', 'You finished every mission!': '¡Terminaste todas las misiones!', 'You can build anything you like.': 'Puedes construir lo que quieras.',
  'Yes!': '¡Sí!', 'That’s right.': 'Eso es.', 'You got it!': '¡Lo lograste!', 'Nice work!': '¡Buen trabajo!', 'Great job!': '¡Excelente!', 'That’s it!': '¡Eso es!', 'Awesome!': '¡Genial!', 'Good try.': 'Buen intento.', 'Here’s the answer.': 'Esta es la respuesta.',
  'Nice try.': 'Buen intento.', 'Let’s look at the answer.': 'Veamos la respuesta.', 'Step done!': '¡Paso listo!', 'Nice work.': 'Buen trabajo.', 'Great!': '¡Muy bien!', 'On to the next step.': 'Vamos al siguiente paso.', 'Step done.': 'Paso listo.',
  'Mission complete!': '¡Misión cumplida!', 'Way to go!': '¡Bien hecho!', 'Place blocks inside the glowing box.': 'Pon bloques dentro de la caja brillante.', 'Here are some new words for this mission.': 'Aquí hay palabras nuevas para esta misión.',
  'Let’s build, read, and drive.': 'Vamos a construir, leer y manejar.', 'Read the label.': 'Lee la etiqueta.', 'Tap the word you hear.': 'Toca la palabra que oyes.', 'Tap the picture that matches the word.': 'Toca el dibujo que va con la palabra.',
  'Pick the word that fits.': 'Escoge la palabra que encaja.', 'Loaded!': '¡Cargado!', 'Got it!': '¡Muy bien!', 'Nice reading.': 'Buena lectura.', 'Wonderful!': '¡Maravilloso!', 'Listen, and try again.': 'Escucha e inténtalo otra vez.',
  'Let’s find a crate!': '¡Vamos a buscar una caja!', 'Walk up to it.': 'Camina hasta allí.', 'Let’s find a cone!': '¡Vamos a buscar un cono!', 'Let’s find a fuel can!': '¡Vamos a buscar una lata de combustible!', 'Let’s find a truck part!': '¡Vamos a buscar una pieza de camión!',
  'We are here!': '¡Ya llegamos!', 'Tap the Talk button.': 'Toca el botón Hablar.', 'Put blocks in the glowing box!': '¡Pon bloques en la caja brillante!', 'Tap Place.': 'Toca Poner.', 'Put blocks in the glowing spot!': '¡Pon bloques en el lugar brillante!',
  'Climb up to the crane!': '¡Sube a la grúa!', 'Let’s visit the next stop!': '¡Vamos a la siguiente parada!', 'Now you can build and drive anywhere.': 'Ahora puedes construir y manejar donde quieras.',
  'Find the letter you hear.': 'Encuentra la letra que oyes.', 'Tap the big green button to keep playing.': 'Toca el botón verde grande para seguir jugando.', 'Tap Talk.': 'Toca Hablar.', 'Here we go!': '¡Vamos!',
  'Tap the matching part.': 'Toca la pieza que va con la etiqueta.', 'Read the can.': 'Lee la lata.', 'Great reading.': 'Gran lectura.', 'Wonderful reading!': '¡Qué bien lees!', 'You read it!': '¡Lo leíste!',
  // short UI labels (screen only)
  'Play': 'Jugar', 'Continue': 'Seguir', 'Next ›': 'Siguiente ›', 'Done': 'Listo', 'Later': 'Después', 'Keep my mission': 'Seguir con mi misión', 'Switch to this mission': 'Cambiar a esta misión', 'Finish mission': 'Terminar misión', 'Try again': 'Otra vez',
  '▶ Keep playing': '▶ Seguir jugando', '🔤 Letter games': '🔤 Juegos de letras', '🎥 Fix my view': '🎥 Arreglar la vista', '🔒 Grown-ups': '🔒 Adultos', '⭐ Yay!': '⭐ ¡Hurra!', '☰ Menu': '☰ Menú', 'Menu': 'Menú',
  'Go': 'Ir', 'Jump': 'Saltar', 'Talk': 'Hablar', 'Place': 'Poner', 'Break': 'Romper', 'Skip': 'Saltar', 'Read the label. Tap the word you hear.': 'Lee la etiqueta. Toca la palabra que oyes.',
  'Read the crate': 'Lee la caja', 'Read the cone': 'Lee el cono', 'Read the fuel can': 'Lee la lata', 'Read the part label': 'Lee la etiqueta', 'Read the delivery': 'Lee la entrega', 'Load it ›': 'Cargar ›',
  'Mission complete!': '¡Misión cumplida!', 'Letter Lane': 'Camino de letras',
};
export const NAMES_ES = { 'Foreman Fran': 'Capataz Fran', 'Ray the Trucker': 'Ray el camionero', 'Crane Operator Cruz': 'Cruz, operador de grúa', 'Gus at the Pumps': 'Gus de las bombas', 'Mechanic Mo': 'Mo el mecánico', 'Minnesota Stop': 'Parada de Minnesota', 'Maryland Stop': 'Parada de Maryland', 'Texas Stop': 'Parada de Texas', 'El Salvador Stop': 'Parada de El Salvador' };
const nm = n => NAMES_ES[n] || n;
const NORM = t => String(t).toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-záéíóúüñ0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const ESVALS = new Set(Object.values(ES));
function sentences(text) { const out = []; let cur = null; text.replace(/\S+/g, (w, i) => { if (!cur) cur = { off: i, end: i }; cur.end = i + w.length; if (/[.!?…][”"’')]*$/.test(w)) { out.push(cur); cur = null; } return w; }); if (cur) out.push(cur); return out.map(c => text.slice(c.off, c.end)); }
// Spanish version of ONE sentence/phrase, or null
export function esSentence(s) {
  s = s.trim(); if (!s) return null;
  if (ES[s]) return ES[s];
  let m;
  if ((m = /^Let’s find (.+)!$/.exec(s))) return `¡Vamos a buscar a ${nm(m[1])}!`;
  if ((m = /^Go back to (.+?)!?\.?$/.exec(s))) return /!$/.test(s) ? `¡Vuelve con ${nm(m[1])}!` : `Vuelve con ${nm(m[1])}`;
  if ((m = /^Next: (.+)\.$/.exec(s))) { const e = esSentence(m[1]); return e ? `Siguiente: ${e.replace(/[.!]$/, '')}.` : null; }
  if ((m = /^You got (\d+) out of (\d+)\.$/.exec(s))) return `Acertaste ${m[1]} de ${m[2]}.`;
  if ((m = /^Find the letter ([A-Za-z])\.$/.exec(s))) return `Busca la letra ${m[1].toUpperCase()}.`;
  if (ESVALS.has(s) || /^¡?Vamos a buscar a .+!$/.test(s) || /^¡?Vuelve con .+$/.test(s) || /^Siguiente: .+\.$/.test(s) || /^Acertaste \d+ de \d+\.$/.test(s) || /^Busca la letra [A-Z]\.$/.test(s)) return s;
  return null;
}
// Text used for the voice clip of a Spanish sentence (letters are spelled as Spanish names)
export function esSpoken(es) { return es.replace(/^Busca la letra ([A-Z])\.$/, (m, c) => `Busca la letra ${LETTER_ES[c.toLowerCase()]}.`); }
export const Lang = {
  get mode() { const p = activeProfile(); return (p && p.lang) || 'en'; },
  // Whole text translated sentence by sentence (unknown sentences stay English). Only used when the mode is 'es'.
  tr(text) {
    if (this.mode !== 'es' || !text) return text;
    const t = String(text); const direct = esSentence(t); if (direct) return direct;
    const ss = sentences(t); if (!ss.length) return t;
    return ss.map(s => esSentence(s) || s).join(' ');
  },
  normEs: NORM,
};
