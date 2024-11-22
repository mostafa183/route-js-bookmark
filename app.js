document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Get DOM elements
    const bookmarkForm = document.getElementById('bookmarkForm');
    const siteNameInput = document.getElementById('siteName');
    const siteUrlInput = document.getElementById('siteUrl');
    const bookmarksTable = document.getElementById('bookmarksTable');
    const bookmarksList = document.getElementById('bookmarksList');

    // Load bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    // Update bookmarks table
    function updateBookmarksTable() {
        if (bookmarks.length === 0) {
            bookmarksTable.style.display = 'none';
            return;
        }

        bookmarksTable.style.display = 'block';
        bookmarksList.innerHTML = bookmarks.map((bookmark, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${bookmark.name}</td>
                <td>
                    <a href="${bookmark.url}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="visit-link"
                    >
                        <i data-lucide="external-link"></i>
                    </a>
                </td>
                <td>
                    <button 
                        onclick="deleteBookmark(${bookmark.id})"
                        class="delete-btn"
                    >
                        <i data-lucide="trash-2"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Reinitialize icons for the new content
        lucide.createIcons();
    }

    // Save bookmarks to localStorage
    function saveBookmarks() {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        updateBookmarksTable();
    }

    // Handle form submission
    bookmarkForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = siteNameInput.value.trim();
        const url = siteUrlInput.value.trim();

        if (!name || !url) return;

        const newBookmark = {
            id: Date.now(),
            name,
            url: url.startsWith('http') ? url : `https://${url}`
        };

        bookmarks.push(newBookmark);
        saveBookmarks();

        // Reset form
        bookmarkForm.reset();
    });

    // Delete bookmark
    window.deleteBookmark = (id) => {
        bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        saveBookmarks();
    };

    // Initial render
    updateBookmarksTable();
});