export function getCurrentTime() {
  const now = new Date(); // Tworzy obiekt Date z aktualną datą i godziną
  const hours = now.getHours(); // Pobiera aktualną godzinę
  const minutes = now.getMinutes(); // Pobiera aktualną minutę
  
  return `${hours}:${minutes}`; // Zwraca aktualną godzinę w formacie HH:MM
}