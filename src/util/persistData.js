export default function updateLocalStorage(key, data) {
  if (!key || data === undefined) {
    console.error("Invalid key or data for local storage update.");
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
}
