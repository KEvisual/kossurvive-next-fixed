let _users = {}; // { email: {name,email,prefs,score, saved:[], mood:[] } }

export function getUser(email) {
  return _users[email];
}
export function upsertUser(u) {
  _users[u.email] = { ...(_users[u.email] || {}), ...u };
  return _users[u.email];
}
export function updateScore(email, score) {
  if (!_users[email]) return null;
  _users[email].score = score;
  return _users[email];
}
export function pushSaved(email, recipeId) {
  if (!_users[email]) return null;
  _users[email].saved = Array.from(
    new Set([...(_users[email].saved || []), recipeId])
  );
  return _users[email];
}
export function pushMood(email, mood) {
  if (!_users[email]) return null;
  _users[email].mood = [
    ...(_users[email].mood || []),
    { ...mood, at: Date.now() },
  ];
  return _users[email];
}
export function debugAll() {
  return _users;
}

export function getActivities() {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem("activities") || "{}");
}

export function saveActivity(date, olahraga) {
  if (typeof window === "undefined") return;
  const data = getActivities();
  data[date] = olahraga;
  localStorage.setItem("activities", JSON.stringify(data));
}

export function setSelectedDate(date) {
  if (typeof window === "undefined") return;
  localStorage.setItem("selectedDate", date);
}

export function getSelectedDate() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("selectedDate") || "";
}
