// practices.js — core data for the Coming Home devotional practice companion

export const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const DAY_DATA = {
  Monday: { theme: "building the container", practices: ["zazen","threshold","weights"], note: "Start the week in the body. Strength as devotion." },
  Tuesday: { theme: "listening", practices: ["zazen","threshold","walk"], note: "Walk slowly. Let the marri and tuart speak first." },
  Wednesday: { theme: "strength & fire", practices: ["zazen","threshold","weights"], note: "Midweek. The body wants to move. Let it." },
  Thursday: { theme: "tending", practices: ["zazen","threshold","walk"], note: "Softer day. Notice what your body is holding." },
  Friday: { theme: "completion", practices: ["zazen","threshold","weights"], note: "The last strong practice of the week. Finish what the body started." },
  Saturday: { theme: "earth time", practices: ["zazen","tree","walk-long"], note: "Your Sophie Strand day. No agenda. Just proximity to the living world." },
  Sunday: { theme: "rest as resistance", practices: ["zazen","rest","threshold"], note: "Self-preservation is political warfare. Rest is the practice today." },
};

export const PRACTICE_DETAIL = {
  zazen: { label: "Zazen", icon: "◯", duration: "10 min", color: "#6B8F71", time: "morning", description: "Sit. Spine long. Cosmic mudra. Label thoughts. Return to body. Not special — just this." },
  threshold: { label: "Threshold Ritual", icon: "◈", duration: "5 min", color: "#8B7D6B", time: "evening", description: "Break the trance between work and home. Qi gong shaking, EFT tapping, or barefoot earth standing. Same modality for 2 weeks before changing." },
  weights: { label: "Weights", icon: "△", duration: "30–45 min", color: "#B07D62", time: "evening", description: "Kara Duval Range or similar. Reclaim your body as yours. On migraine days: do half, or just the warm-up." },
  walk: { label: "Walk Without Input", icon: "∿", duration: "15–30 min", color: "#6B8FA0", time: "evening", description: "No earbuds. Just you, the trees, and Whadjuk Noongar boodja. Notice one thing each walk." },
  "walk-long": { label: "Longer Nature Walk", icon: "∿", duration: "30–60 min", color: "#6B8FA0", time: "any", description: "Unhurried. Let the season teach you. No agenda, no destination." },
  tree: { label: "Sit With a Tree", icon: "⌘", duration: "10+ min", color: "#6B8F71", time: "any", description: "Same tree each week. Back against bark. Do nothing. Relationship is built through return." },
  rest: { label: "Rest", icon: "○", duration: "as needed", color: "#A09080", time: "any", description: "Not earned. Not lazy. Radical. Audre Lorde called self-care political warfare." },
};

export const STATES = [
  { id: "activated", label: "Activated / Anxious", emoji: "⚡", color: "#B07D62", suggestion: "Try the threshold ritual early — shaking for 3 min, then stillness. Let the charge move through. Your nervous system knows how to discharge this." },
  { id: "flat", label: "Flat / Depleted", emoji: "〰", color: "#6B8FA0", suggestion: "Gentle is the word today. Even 5 min of zazen counts. Or skip to the walk — let the air wake you. You don't have to earn the day." },
  { id: "pain", label: "In Pain", emoji: "◇", color: "#A09080", suggestion: "Modified everything. Sit if you can. Walk gently if you can. Rest if that's what's true. No shame. The practice holds you even on days like this." },
  { id: "foggy", label: "Foggy / Scattered", emoji: "≋", color: "#8B7D6B", suggestion: "Body first. Stand up and shake for 60 seconds. Then decide. The fog lifts when you move. Your ADHD brain needs the body to lead." },
  { id: "grounded", label: "Grounded / Clear", emoji: "●", color: "#6B8F71", suggestion: "Beautiful. Follow the rhythm as written. This is the day your practice deepens. Trust the structure." },
  { id: "tender", label: "Tender / Raw", emoji: "◠", color: "#8BAF91", suggestion: "Be very gentle. Zazen can hold tenderness. Tapping can help it move. Don't push into weights today. Tenderness is not weakness." },
];

export const TIMER_PRESETS = [
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
  { label: "20 min", seconds: 1200 },
];

// Paraphrased and attributed — never direct quotes longer than a sentence.
export const QUOTES = [
  { text: "Attention is the most basic form of love.", author: "after Charlotte Joko Beck" },
  { text: "The practice is simply to return — not to get it right, but to begin again.", author: "after Charlotte Joko Beck" },
  { text: "Someone I loved once gave me a box full of darkness. It took years to understand that this too was a gift.", author: "after Mary Oliver" },
  { text: "Pay attention. Be astonished. Tell about it.", author: "after Mary Oliver" },
  { text: "Caring for myself is not self-indulgence, it is self-preservation, and that is an act of political warfare.", author: "after Audre Lorde" },
  { text: "Your silence will not protect you. But your rest might sustain you.", author: "after Audre Lorde" },
  { text: "Walk as if you are kissing the Earth with your feet.", author: "after Thich Nhat Hanh" },
  { text: "We are here to awaken from the illusion of our separateness.", author: "after Thich Nhat Hanh" },
  { text: "You are not a separate self. You are the mycelium dreaming it is a mushroom.", author: "after Sophie Strand" },
  { text: "Healing is not a return to some previous state. It is composting yourself into something new.", author: "after Sophie Strand" },
  { text: "The moment you can recognise what is true, that is the moment of freedom.", author: "after Tara Brach" },
  { text: "Radical acceptance does not mean approving of what is. It means letting reality be reality so you can respond from wholeness.", author: "after Tara Brach" },
  { text: "All flourishing is mutual. The land gives to us and asks us to give in return.", author: "after Robin Wall Kimmerer" },
  { text: "Gratitude is the thread that connects us to the living world. It is not a feeling — it is a practice.", author: "after Robin Wall Kimmerer" },
  { text: "Liberation is not an escape from suffering. It is the capacity to be with what is.", author: "after Lama Rod Owens" },
  { text: "The body holds what the mind cannot yet speak. Practice is learning the body's language.", author: "after Lama Rod Owens" },
  { text: "In the beginner's mind there are many possibilities; in the expert's mind there are few.", author: "after Shunryu Suzuki" },
  { text: "When you do something, you should do it with your whole body and mind.", author: "after Shunryu Suzuki" },
  { text: "Rest is not a reward. It is a right. It is a radical refusal to be ground down.", author: "after Tricia Hersey" },
  { text: "You were not born to be exhausted. You were born to be whole.", author: "after Tricia Hersey" },
];

export const NOONGAR_SEASONS = [
  { name: "Birak", months: [12, 1], description: "Hot, dry — fire, cicadas, heat on skin", theme: "fire and stillness" },
  { name: "Bunuru", months: [2, 3], description: "Hottest — seeking shade, dry earth, afternoon storms", theme: "shade and surrender" },
  { name: "Djeran", months: [4, 5], description: "Cooling — leaves turning, morning dew, first rains", theme: "cooling and turning" },
  { name: "Makuru", months: [6, 7], description: "Cold, wet — rain, grey sky, water on bark, fungi emerging", theme: "water and darkness" },
  { name: "Djilba", months: [8, 9], description: "Transitional — wildflowers, wind shifts, cold mornings/warm afternoons", theme: "wind and wildflowers" },
  { name: "Kambarang", months: [10, 11], description: "Warming — baby birds, longer light, flowering", theme: "light and blooming" },
];

export function getCurrentSeason() {
  const month = new Date().getMonth() + 1; // 1-12
  return NOONGAR_SEASONS.find(season => season.months.includes(month)) ?? NOONGAR_SEASONS[0];
}
