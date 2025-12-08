// ===============================
// PLAYLIST PULSE APP LOGIC
// Upskilled: DOM manipulation, event delegation, localStorage, filtering
// ===============================

// LocalStorage key so it's easy to change later
const STORAGE_KEY = "playlistPulseSongs";

// Cached DOM elements
const songForm = document.querySelector("#song-form");
const formError = document.querySelector("#form-error");
const songsListEl = document.querySelector("#songs-list");

const filterGenreEl = document.querySelector("#filter-genre");
const searchInputEl = document.querySelector("#search");
const clearFiltersBtn = document.querySelector("#clear-filters");

// Stats elements
const statTotalEl = document.querySelector("#stat-total");
const statTopGenreEl = document.querySelector("#stat-top-genre");
const statRecommendationEl = document.querySelector("#stat-recommendation");

// App state (single source of truth)
let songs = [];

// ===============================
// Initialization
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  songs = loadSongsFromStorage();
  renderSongs();
  updateStats();
});

// ===============================
// Storage helpers
// ===============================

function loadSongsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Make sure it's always an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading from localStorage:", err);
    return [];
  }
}

function saveSongsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

// ===============================
// Form handling
// ===============================

songForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";

  const formData = new FormData(songForm);

  const title = formData.get("title").trim();
  const artist = formData.get("artist").trim();
  const album = formData.get("album").trim();
  const genre = formData.get("genre");
  const playlist = formData.get("playlist").trim();
  const ratingValue = formData.get("rating");
  const notes = formData.get("notes").trim();

  // Basic validation for required fields
  if (!title || !artist || !genre || !playlist) {
    formError.textContent = "Please fill in all required fields (Song, Artist, Genre, Playlist).";
    return;
  }

  const rating = ratingValue ? Number(ratingValue) : null;

  const newSong = {
    id: Date.now().toString(),
    title,
    artist,
    album: album || null,
    genre,
    playlist,
    rating,
    notes: notes || null,
    createdAt: new Date().toISOString(),
  };

  songs.push(newSong);
  saveSongsToStorage();

  // Reset only after saving
  songForm.reset();
  formError.textContent = "";

  renderSongs();
  updateStats();
});

// ===============================
// Filtering + searching
// ===============================

filterGenreEl.addEventListener("change", () => {
  renderSongs();
});

searchInputEl.addEventListener("input", () => {
  renderSongs();
});

clearFiltersBtn.addEventListener("click", () => {
  filterGenreEl.value = "all";
  searchInputEl.value = "";
  renderSongs();
});

// ===============================
// Render functions
// ===============================

function renderSongs() {
  // Filter in JS based on current controls
  const genreFilter = filterGenreEl.value;
  const searchQuery = searchInputEl.value.trim().toLowerCase();

  let filtered = [...songs];

  if (genreFilter !== "all") {
    filtered = filtered.filter((song) => song.genre === genreFilter);
  }

  if (searchQuery) {
    filtered = filtered.filter((song) => {
      const haystack = [
        song.title,
        song.artist,
        song.album || "",
        song.playlist,
        song.notes || "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchQuery);
    });
  }

  // Clear list first
  songsListEl.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No tracks match your filters yet. Try adding or clearing filters.";
    songsListEl.appendChild(empty);
    return;
  }

  // Create a fragment to avoid reflow on each card
  const fragment = document.createDocumentFragment();

  filtered.forEach((song) => {
    const card = createSongCard(song);
    fragment.appendChild(card);
  });

  songsListEl.appendChild(fragment);
}

// Build one song card DOM node
function createSongCard(song) {
  const card = document.createElement("article");
  card.className = "song-card";
  card.dataset.id = song.id;
  card.dataset.genre = song.genre;
  card.dataset.playlist = song.playlist;

  // LEFT SIDE (info)
  const main = document.createElement("div");
  main.className = "song-main";

  const titleEl = document.createElement("div");
  titleEl.className = "song-title";
  titleEl.textContent = song.title;

  const artistEl = document.createElement("div");
  artistEl.className = "song-artist";
  artistEl.textContent = song.artist;

  const metaEl = document.createElement("div");
  metaEl.className = "song-meta";
  const bits = [];
  if (song.album) bits.push(song.album);
  bits.push(song.genre);
  metaEl.textContent = bits.join(" • ");

  const tagsEl = document.createElement("div");
  tagsEl.className = "song-tags";

  const playlistTag = document.createElement("span");
  playlistTag.className = "tag-pill";
  playlistTag.textContent = song.playlist;
  tagsEl.appendChild(playlistTag);

  if (song.rating) {
    const ratingTag = document.createElement("span");
    ratingTag.className = "tag-outline";
    ratingTag.textContent = "Rating: " + "★".repeat(song.rating);
    tagsEl.appendChild(ratingTag);
  }

  if (song.notes) {
    const notesEl = document.createElement("p");
    notesEl.className = "song-notes";
    notesEl.textContent = song.notes;
    main.appendChild(notesEl);
  }

  main.prepend(tagsEl);
  main.prepend(metaEl);
  main.prepend(artistEl);
  main.prepend(titleEl);

  // RIGHT SIDE (actions)
  const actions = document.createElement("div");
  actions.className = "song-actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "song-delete";
  deleteBtn.textContent = "Remove";
  deleteBtn.setAttribute("aria-label", `Remove ${song.title} by ${song.artist}`);
  deleteBtn.dataset.id = song.id;

  actions.appendChild(deleteBtn);

  card.appendChild(main);
  card.appendChild(actions);

  return card;
}

// ===============================
// Event delegation for delete
// ===============================

songsListEl.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".song-delete");
  if (!deleteBtn) return;

  const id = deleteBtn.dataset.id;
  if (!id) return;

  // You can remove confirm() if you don't want it
  const shouldDelete = window.confirm("Remove this track from your library?");
  if (!shouldDelete) return;

  songs = songs.filter((song) => song.id !== id);
  saveSongsToStorage();
  renderSongs();
  updateStats();
});

// ===============================
// Stats + recommendations
// ===============================

function updateStats() {
  const total = songs.length;
  statTotalEl.textContent = total.toString();

  if (total === 0) {
    statTopGenreEl.textContent = "—";
    statRecommendationEl.textContent = "Add a few songs to see a playlist recommendation.";
    return;
  }

  const genreCounts = songs.reduce((acc, song) => {
    acc[song.genre] = (acc[song.genre] || 0) + 1;
    return acc;
  }, {});
}
  let topGenr
