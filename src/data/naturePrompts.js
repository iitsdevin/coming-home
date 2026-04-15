/**
 * Nature connection prompts for devotional practice
 * on Whadjuk Noongar boodja (Perth, Western Australia).
 *
 * Inspired by Sophie Strand, Charlotte Joko Beck, Thich Nhat Hanh,
 * David Abram, Robin Wall Kimmerer, and Daniel Foor.
 *
 * No direct quotes are reproduced. All attributions use "after [Author]"
 * to indicate paraphrased inspiration.
 */

const prompts = [
  // ──────────────────────────────────────────────
  // ALL SEASONS
  // ──────────────────────────────────────────────
  {
    text: "Notice how your breath already knows this place. The air you pull in has passed through banksia cones and over limestone. You are not separate from this exchange.",
    attribution: "after Thich Nhat Hanh",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "Your body is a landscape too — scarred, weathered, holding water. Press your palm to any surface and feel the conversation between two kinds of earth.",
    attribution: "after David Abram",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "Beneath this floor, beneath the concrete and pipe, the mycelium is still at work. You are always standing on a living thing.",
    attribution: "after Sophie Strand",
    seasons: ["all"],
    context: ["indoor"],
    time: ["any"],
  },
  {
    text: "What is the oldest living thing you can see from where you sit? A tree, a patch of lichen, the sky itself? Let your attention rest there as an offering.",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["all"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Just this breath. Just this light on the wall. Just this body sitting here. Nothing to fix, nothing to improve — only this.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "The ancestors of this place are not only human. Tuart trees that stood here before settlement are ancestors. The river is an ancestor. What does it mean to sit in an ancestral body?",
    attribution: "after Daniel Foor",
    seasons: ["all"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Attention is the first and last prayer. Whatever your eyes land on next — give it thirty seconds of your full, unhurried presence.",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "The world is not a backdrop to your life. It is alive, articulate, speaking in textures and temperatures. What is it saying to your skin right now?",
    attribution: "after David Abram",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "You did not come into this world. You grew out of it, the way a wave rises from the ocean. Feel your continuity with the ground beneath you.",
    attribution: "after Thich Nhat Hanh",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "Stories travel through soil the way they travel through families — slowly, transformed at each telling. What story is the dirt outside your door carrying today?",
    attribution: "after Sophie Strand",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "Find one sound you were ignoring. A bird, a fridge hum, wind in a gap. Let it be the bell that calls you back to this moment.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "The places that shaped your ancestors shaped you. Even here, far from those places, your body carries their weather. Honour both — where you came from and where you are.",
    attribution: "after Daniel Foor",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "Look at your hands. They are made of the same minerals as the sand at Cottesloe, the same calcium as banksia seed. Interbeing is not a metaphor — it is chemistry.",
    attribution: "after Thich Nhat Hanh",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "Reciprocity begins small. You breathe out what the trees breathe in. You are already in a gift economy with every plant on this street.",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "When the mind spins stories, return to sensation. The weight of your body on the chair. The temperature of the air on your upper lip. Just this, exactly as it is.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "Fungi do not distinguish between life and death — they tend to both. What in your life is composting right now? Can you let the mycelium do its work?",
    attribution: "after Sophie Strand",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "The land here has been tended for sixty thousand years. You walk on shaped country. Sit quietly and consider what it means to be a guest on storied ground.",
    attribution: null,
    seasons: ["all"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Every perception is a duet — the world reaching toward you and your senses reaching toward it. Right now, what is reaching for your attention?",
    attribution: "after David Abram",
    seasons: ["all"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },

  // ──────────────────────────────────────────────
  // BIRAK (Dec–Jan) — hot, dry, easterly winds
  // ──────────────────────────────────────────────
  {
    text: "The easterly pushes hot air through the city like a breath held too long. Let your own breath be slow and deliberate. You do not have to match the urgency of the wind.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["Birak"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "Cicadas are the voice of Birak — relentless, layered, vibrating at the edge of hearing. Can you listen without deciding it is noise?",
    attribution: "after David Abram",
    seasons: ["Birak"],
    context: ["outdoor"],
    time: ["afternoon"],
  },
  {
    text: "The marri trees are flowering now, sticky with honey. Somewhere a twenty-eight parrot is drunk on nectar. Even heat carries sweetness if you pay attention.",
    attribution: null,
    seasons: ["Birak"],
    context: ["outdoor"],
    time: ["morning"],
  },
  {
    text: "In the long light of a Birak evening, shadows stretch to impossible lengths. Watch your own shadow and remember — you are always larger than you think.",
    attribution: null,
    seasons: ["Birak"],
    context: ["outdoor"],
    time: ["evening"],
  },
  {
    text: "The ground is cracked and pale. This is not failure — it is the land in its dry dreaming. Not everything alive looks green.",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["Birak"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Heat simplifies. When it is too hot to think, the body takes over — seeking shade, seeking water. Trust the animal intelligence that carries you through a Birak afternoon.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["Birak"],
    context: ["indoor", "outdoor"],
    time: ["afternoon"],
  },
  {
    text: "Even inside, the dry heat finds you. Notice how the house ticks and settles as the timber expands. The building is a body, breathing with the season.",
    attribution: "after David Abram",
    seasons: ["Birak"],
    context: ["indoor"],
    time: ["any"],
  },
  {
    text: "At dusk the Fremantle Doctor arrives — that cool breath off the Indian Ocean. Stand in it. Let the wind be a teacher of relief, arriving exactly when it arrives.",
    attribution: null,
    seasons: ["Birak"],
    context: ["outdoor"],
    time: ["evening"],
  },

  // ──────────────────────────────────────────────
  // BUNURU (Feb–Mar) — hottest, still, afternoon sea breezes
  // ──────────────────────────────────────────────
  {
    text: "Bunuru is the season of endurance. The zamia palms do not wilt — they simply slow down. What in you is wisely slowing?",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["Bunuru"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "The river is at its lowest, its edges crusted with salt. Even diminished, it holds the memory of winter floods. Sit with what feels diminished in you and sense the fullness it still carries.",
    attribution: "after Sophie Strand",
    seasons: ["Bunuru"],
    context: ["outdoor"],
    time: ["morning"],
  },
  {
    text: "At the hottest point of the hottest season, find one cool thing — a tile floor, a glass of water, the shade side of a wall. Gratitude does not need grandeur.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["Bunuru"],
    context: ["indoor", "outdoor"],
    time: ["afternoon"],
  },
  {
    text: "The white cockatoos scream across the burnt sky like torn paper. They are not complaining — that is their language of abundance. What sounds harsh in your life might also be a kind of fullness?",
    attribution: null,
    seasons: ["Bunuru"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "This is the season Noongar people traditionally moved toward the coast, following the cool. Notice what your body is already seeking. It knows the old patterns.",
    attribution: "after Daniel Foor",
    seasons: ["Bunuru"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "The tuart trees hold their canopy high, providing shade that dapples rather than blocks. Not all shelter is total. Sometimes partial shade is enough.",
    attribution: null,
    seasons: ["Bunuru"],
    context: ["outdoor"],
    time: ["afternoon"],
  },
  {
    text: "Late Bunuru nights finally cool. Step outside after dark and feel the earth releasing the heat it held all day. You, too, can release what you have been holding.",
    attribution: "after Thich Nhat Hanh",
    seasons: ["Bunuru"],
    context: ["outdoor"],
    time: ["evening"],
  },
  {
    text: "The paperbark along the creeks is peeling — shedding layers it no longer needs. What layer are you ready to let fall?",
    attribution: "after Sophie Strand",
    seasons: ["Bunuru"],
    context: ["outdoor"],
    time: ["any"],
  },

  // ──────────────────────────────────────────────
  // DJERAN (Apr–May) — cooling, leaves turning, first rains
  // ──────────────────────────────────────────────
  {
    text: "The first Djeran rains arrive like a long-held apology. Step outside and smell the petrichor — the earth greeting water it has missed for months.",
    attribution: "after David Abram",
    seasons: ["Djeran"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "The deciduous trees — imports, all of them — are turning gold along the streets. They do not belong here, and still they are beautiful. Hold that paradox gently.",
    attribution: null,
    seasons: ["Djeran"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Mornings carry a chill now. Notice the moment your skin registers the change — that instant before the mind names it 'cold.' There is so much intelligence before thought.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["Djeran"],
    context: ["indoor", "outdoor"],
    time: ["morning"],
  },
  {
    text: "The red-tailed black cockatoos are flying low and inland — they carry the rain behind them, the old people say. Pay attention to what the animals know before you do.",
    attribution: "after Daniel Foor",
    seasons: ["Djeran"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "In Djeran the light softens. Shadows lose their hard edges. Let your own edges soften today — not everything requires sharpness.",
    attribution: "after Thich Nhat Hanh",
    seasons: ["Djeran"],
    context: ["indoor", "outdoor"],
    time: ["afternoon"],
  },
  {
    text: "The quenda are busy in the leaf litter, turning soil, planting seeds without knowing it. So much good work is done without intention. What are you planting accidentally?",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["Djeran"],
    context: ["outdoor"],
    time: ["evening"],
  },
  {
    text: "As the season cools, the body draws inward. This is not withdrawal — it is the same intelligence that pulls sap down into roots. Let yourself descend.",
    attribution: "after Sophie Strand",
    seasons: ["Djeran"],
    context: ["indoor", "outdoor"],
    time: ["evening"],
  },
  {
    text: "Rain on a tin roof is its own mantra. If you can hear it, let each drop be a single note of attention. If you cannot, imagine it — the body remembers rain.",
    attribution: null,
    seasons: ["Djeran"],
    context: ["indoor"],
    time: ["any"],
  },

  // ──────────────────────────────────────────────
  // MAKURU (Jun–Jul) — cold, wet, fungi, grey skies
  // ──────────────────────────────────────────────
  {
    text: "Makuru is fungus season. After rain, walk slowly and look low. The mycorrhizal web is fruiting — making visible what is usually hidden. What underground connections sustain you?",
    attribution: "after Sophie Strand",
    seasons: ["Makuru"],
    context: ["outdoor"],
    time: ["morning"],
  },
  {
    text: "Grey skies for days. The mind says 'dreary' but the jarrah forest is drinking deeply. Not every nourishment looks like sunshine.",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["Makuru"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "The wetlands are full again. Waterbirds have returned to places that were dust in Bunuru. Abundance is not a permanent state — it is a season, and it always returns.",
    attribution: null,
    seasons: ["Makuru"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Cold hands, warm mug. This moment does not need to be anything other than exactly what it is. Feel the heat moving from ceramic to skin.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["Makuru"],
    context: ["indoor"],
    time: ["morning"],
  },
  {
    text: "In the shortest days the darkness is generous — it gives you more hours to rest, to dream, to let the composting happen in quiet. Do not rush toward the light.",
    attribution: "after Daniel Foor",
    seasons: ["Makuru"],
    context: ["indoor"],
    time: ["evening"],
  },
  {
    text: "Rain is the earth remembering it is part of the ocean. You are sixty percent water — you, too, are the ocean remembering itself.",
    attribution: "after Thich Nhat Hanh",
    seasons: ["Makuru"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "The moss on the south side of the wall is emerald now, almost electric. It has waited all year for this. What in you has been waiting for the right conditions?",
    attribution: "after David Abram",
    seasons: ["Makuru"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Listen to the creek — if there is one near you, it is loud now, urgent and brown. Moving water does not judge what it carries. It simply moves.",
    attribution: null,
    seasons: ["Makuru"],
    context: ["outdoor"],
    time: ["any"],
  },

  // ──────────────────────────────────────────────
  // DJILBA (Aug–Sep) — transitional, wildflowers, warming
  // ──────────────────────────────────────────────
  {
    text: "Djilba is the season of mixing — warm days then cold rain, sun then hail. Let yourself be unsettled. Transition is not confusion; it is becoming.",
    attribution: "after Sophie Strand",
    seasons: ["Djilba"],
    context: ["indoor", "outdoor"],
    time: ["any"],
  },
  {
    text: "The wildflowers are starting on the verges and in the bush — kangaroo paw, orchids, hakea. The earth does not wait for permission to bloom. Neither should you.",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["Djilba"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Magpies are nesting. Their fierce protection is a kind of prayer — embodied, specific, unapologetic. What are you protecting with your full body?",
    attribution: null,
    seasons: ["Djilba"],
    context: ["outdoor"],
    time: ["morning"],
  },
  {
    text: "The banksia cones are opening after fire and rain — seeds released only under pressure. Your own difficult seasons have opened something. Trust the timing.",
    attribution: null,
    seasons: ["Djilba"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Morning light in Djilba has a quality it lacks the rest of the year — thin, golden, almost hesitant. Meet it with the same tenderness. Not everything arrives with force.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["Djilba"],
    context: ["indoor", "outdoor"],
    time: ["morning"],
  },
  {
    text: "The wattle is bright yellow against grey-green bush. It does not try to coordinate — it simply is its colour, fully. What would it mean to be your own colour today?",
    attribution: "after David Abram",
    seasons: ["Djilba"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "Frogs are calling from every damp ditch. They sing because conditions are right, not because they have an audience. Practice without audience today.",
    attribution: "after Thich Nhat Hanh",
    seasons: ["Djilba"],
    context: ["outdoor"],
    time: ["evening"],
  },

  // ──────────────────────────────────────────────
  // KAMBARANG (Oct–Nov) — warming, baby birds, longer days
  // ──────────────────────────────────────────────
  {
    text: "The baby willy wagtails are out — tiny, fierce, already fanning their tails. New life does not wait until it is ready. It just begins.",
    attribution: null,
    seasons: ["Kambarang"],
    context: ["outdoor"],
    time: ["morning"],
  },
  {
    text: "Kambarang days are long enough to feel spacious again. Notice what you do with the extra light. Busyness is not the only response to abundance.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["Kambarang"],
    context: ["indoor", "outdoor"],
    time: ["evening"],
  },
  {
    text: "The bush is humming with insects now — native bees, beetles, things too small to name. A whole economy of pollination is happening at knee height. Kneel down. Join it with your attention.",
    attribution: "after Robin Wall Kimmerer",
    seasons: ["Kambarang"],
    context: ["outdoor"],
    time: ["morning"],
  },
  {
    text: "Lizards are basking on every warm surface — fence posts, rocks, paths. They are not lazy; they are gathering what they need. Sometimes stillness is the most productive thing.",
    attribution: "after Charlotte Joko Beck",
    seasons: ["Kambarang"],
    context: ["outdoor"],
    time: ["afternoon"],
  },
  {
    text: "The jarrah is in bud, preparing the flowers that will feed the honeyeaters through summer. So much of devotion is preparation — quiet, unseen, essential.",
    attribution: "after Daniel Foor",
    seasons: ["Kambarang"],
    context: ["outdoor"],
    time: ["any"],
  },
  {
    text: "In the warming evenings the sky stays pink for a long time. Sit with the slow dissolve. Not everything ends abruptly — some things fade with grace.",
    attribution: "after Thich Nhat Hanh",
    seasons: ["Kambarang"],
    context: ["outdoor"],
    time: ["evening"],
  },
  {
    text: "The bobtail lizards are courting, slow and deliberate, tasting the air with blue tongues. Desire is not separate from the sacred. It is the earth wanting to continue.",
    attribution: "after Sophie Strand",
    seasons: ["Kambarang"],
    context: ["outdoor"],
    time: ["afternoon"],
  },
  {
    text: "Open a window. Kambarang air carries pollen, warmth, the green scent of growth. Let the outside become the inside for a moment. The boundary was always an illusion.",
    attribution: "after David Abram",
    seasons: ["Kambarang"],
    context: ["indoor"],
    time: ["any"],
  },
];

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

/**
 * Maps a month number (0-11) to the Noongar season name.
 */
function getSeasonName(month) {
  if (month === 11 || month === 0) return "Birak";
  if (month === 1 || month === 2) return "Bunuru";
  if (month === 3 || month === 4) return "Djeran";
  if (month === 5 || month === 6) return "Makuru";
  if (month === 7 || month === 8) return "Djilba";
  if (month === 9 || month === 10) return "Kambarang";
  return "Birak"; // fallback
}

/**
 * Returns a time-of-day label based on the current hour.
 */
function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  return "evening";
}

/**
 * Returns the day-of-year (1-366) for a given date.
 */
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Filters prompts that are appropriate for the current season and time.
 */
function getSeasonalPrompts(season, timeOfDay) {
  return prompts.filter((p) => {
    const seasonMatch =
      p.seasons.includes("all") || p.seasons.includes(season);
    const timeMatch =
      p.time.includes("any") || p.time.includes(timeOfDay);
    return seasonMatch && timeMatch;
  });
}

/**
 * Uses the day-of-year as a seed to select a seasonally and
 * time-of-day appropriate prompt. The same day always returns
 * the same prompt (given the same time-of-day window).
 */
export function getPromptForToday() {
  const now = new Date();
  const season = getSeasonName(now.getMonth());
  const timeOfDay = getTimeOfDay(now.getHours());
  const dayOfYear = getDayOfYear(now);

  const eligible = getSeasonalPrompts(season, timeOfDay);
  if (eligible.length === 0) return prompts[0]; // safety fallback

  const index = dayOfYear % eligible.length;
  return eligible[index];
}

/**
 * Returns a random prompt appropriate for the current season
 * and time of day.
 */
export function getRandomPrompt() {
  const now = new Date();
  const season = getSeasonName(now.getMonth());
  const timeOfDay = getTimeOfDay(now.getHours());

  const eligible = getSeasonalPrompts(season, timeOfDay);
  if (eligible.length === 0) return prompts[Math.floor(Math.random() * prompts.length)];

  const index = Math.floor(Math.random() * eligible.length);
  return eligible[index];
}

export { getSeasonName };
export default prompts;
