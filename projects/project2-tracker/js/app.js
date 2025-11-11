// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// FINAL app.js (Labs 13 + 14 + 15)
// ==========================================

console.log('PROJECT 2: Local Favorites Tracker - FINAL app.js');

const STORAGE_KEY = 'localFavorites';

// App state
let favorites = [];

// DOM ready to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
  // ===== Get references to DOM elements =====
  const form = document.getElementById('add-favorite-form');
  const favoritesList = document.getElementById('favorites-list');
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const clearAllBtn = document.getElementById('clear-all-btn');

  console.log('Form:', form);
  console.log('Favorites list:', favoritesList);
  console.log('Search input:', searchInput);
  console.log('Category filter:', categoryFilter);

  if (!form || !favoritesList) {
    console.warn('Required elements missing: #add-favorite-form and/or #favorites-list');
    return;
  }

  // ===== LAB15: Persistence =====
  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      console.log('Favorites saved to localStorage (count:', favorites.length + ')');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      alert('Unable to save favorites. Your browser may have storage disabled.');
    }
  }

  function loadFavorites() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      favorites = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(favorites)) favorites = [];
      console.log('Loaded', favorites.length, 'favorite(s) from localStorage');
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      favorites = [];
    }
  }

  // ===== LAB13 + LAB14: Display/Search/Filter/Delete/Add =====

  // Display all favorites on the page
  function displayFavorites() {
    console.log('Displaying favorites...');
    favoritesList.innerHTML = '';

    // If none, show empty message
    if (favorites.length === 0) {
      favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
      return;
    }

    // Reset search/filter, then show everything via searchFavorites
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    searchFavorites();
  }

  // Search and filter favorites, then render
  function searchFavorites() {
    const searchText = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

    console.log('Searching for:', searchText, 'Category:', selectedCategory);

    favoritesList.innerHTML = '';

    const filteredFavorites = favorites.filter((favorite) => {
      const matchesSearch =
        searchText === '' ||
        favorite.name.toLowerCase().includes(searchText) ||
        (favorite.notes || '').toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === 'all' || favorite.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    console.log('Found', filteredFavorites.length, 'matching favorites');

    if (filteredFavorites.length === 0) {
      if (searchText !== '' || selectedCategory !== 'all') {
        favoritesList.innerHTML = '<p class="empty-message">No favorites match your search.</p>';
      } else {
        favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
      }
      return;
    }

    filteredFavorites.forEach((favorite) => {
      const originalIndex = favorites.indexOf(favorite);
      const starsDisplay = '⭐'.repeat(favorite.rating);

      const cardHTML = `
        <div class="favorite-card">
          <h3>${favorite.name}</h3>
          <span class="favorite-category">${favorite.category}</span>
          <div class="favorite-rating">${starsDisplay} (${favorite.rating}/5)</div>
          <p class="favorite-notes">${favorite.notes}</p>
          <p class="favorite-date">Added: ${favorite.dateAdded}</p>
          <div class="favorite-actions">
            <button class="btn btn-danger" data-index="${originalIndex}">Delete</button>
          </div>
        </div>
      `;

      favoritesList.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Delegate delete buttons
    favoritesList.querySelectorAll('.btn.btn-danger').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        deleteFavorite(index);
      });
    });
  }

  // Delete favorite by index
  function deleteFavorite(index) {
    if (index < 0 || index >= favorites.length) return;

    console.log('Deleting favorite at index:', index);
    console.log('Favorite to delete:', favorites[index].name);

    const favorite = favorites[index];
    const confirmDelete = confirm(`Are you sure you want to delete "${favorite.name}"?`);

    if (confirmDelete) {
      favorites.splice(index, 1);
      console.log('Favorite deleted. Total remaining:', favorites.length);
      saveFavorites();        // persist change
      searchFavorites();      // re-apply current filters
    } else {
      console.log('Deletion cancelled by user');
    }
  }

  // Handle adding a new favorite
  function addFavorite(event) {
    event.preventDefault();

    console.log('Add Favorite button clicked!');

    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const ratingInput = document.getElementById('rating');
    const notesInput = document.getElementById('notes');

    const nameValue = (nameInput?.value || '').trim();
    const categoryValue = (categoryInput?.value || '').trim();
    const ratingValue = parseInt(ratingInput?.value || '0', 10);
    const notesValue = (notesInput?.value || '').trim();

    if (!nameValue || !categoryValue) {
      alert('Please fill in the place name and category!');
      return;
    }

    const newFavorite = {
      name: nameValue,
      category: categoryValue,
      rating: isNaN(ratingValue) ? 0 : ratingValue,
      notes: notesValue,
      dateAdded: new Date().toLocaleDateString()
    };

    console.log('Created favorite object:', newFavorite);

    favorites.push(newFavorite);
    console.log('Total favorites:', favorites.length);

    saveFavorites(); // persist
    form.reset();
    displayFavorites(); // resets filters, then renders via searchFavorites
    console.log('Favorite added successfully!');
  }

  // LAB15: Clear ALL favorites
  function clearAllFavorites() {
    const confirmClear = confirm('Are you sure you want to delete ALL favorites? This cannot be undone!');
    if (!confirmClear) {
      console.log('Clear all cancelled by user');
      return;
    }

    favorites = [];
    localStorage.removeItem(STORAGE_KEY);
    console.log('All favorites cleared and localStorage removed');

    displayFavorites();
    alert('All favorites have been deleted.');
  }

  // ===== Wire up events =====
  form.addEventListener('submit', addFavorite);
  if (searchInput) searchInput.addEventListener('input', searchFavorites);
  if (categoryFilter) categoryFilter.addEventListener('change', searchFavorites);
  if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllFavorites);

  console.log('Event listeners attached - app is ready!');

  // ===== Initial boot =====
  loadFavorites();     // LAB15: load from localStorage
  displayFavorites();  // LAB13/14: render (resets filters, then searchFavorites)
  console.log('✅ Local Favorites Tracker is ready to use!');
});
