// Main application file - connects all modules

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize music player
    player = new MusicPlayer();
    player.init();

    // Initialize playlist manager
    playlistManager = new PlaylistManager();
    playlistManager.init();

    // Render genres
    renderGenres();

    // Initialize statistics
    initializeStats();

    // Setup navigation
    setupNavigation();

    // Setup theme toggle
    setupThemeToggle();

    // Add CSS for notifications
    addNotificationStyles();

    console.log('🎵 MusicVibe initialized successfully!');
}

// Render genre cards
function renderGenres() {
    const grid = document.getElementById('genreGrid');
    grid.innerHTML = genres.map(genre => `
        <div class="genre-card" onclick="selectGenre('${genre.name}')">
            <span class="genre-icon">${genre.icon}</span>
            <h3 class="genre-name">${genre.name}</h3>
            <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">
                ${genre.description}
            </p>
        </div>
    `).join('');
}

// Handle genre selection
function selectGenre(name) {
    const genre = genres.find(g => g.name === name);
    if (genre) {
        showModal(`
            <h2>${genre.icon} ${genre.name}</h2>
            <p>${genre.description}</p>
            <p style="margin-top: 1rem;">
                Explore amazing ${genre.name} tracks and discover new artists!
            </p>
        `);
    }
}

// Show modal
function showModal(content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        padding: 2rem;
        border-radius: 20px;
        max-width: 500px;
        text-align: center;
        color: white;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: slideUp 0.3s ease;
    `;
    modalContent.innerHTML = content + `
        <button onclick="this.closest('[style*=fixed]').remove()" 
                style="margin-top: 1.5rem; padding: 0.8rem 2rem; background: var(--accent-color); 
                       color: #333; border: none; border-radius: 25px; cursor: pointer; 
                       font-weight: bold; font-size: 1rem;">
            Close
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Initialize statistics with animation
function initializeStats() {
    animateStatNumber('songsCount', stats.songs);
    animateStatNumber('playlistsCount', stats.playlists);
    animateStatNumber('genresCount', stats.genres);
    animateStatNumber('usersCount', stats.users);
}

function animateStatNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let current = 0;
    const increment = Math.ceil(target / 50);
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
    }, stepTime);
}

// Setup smooth scrolling navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href === '#' ? 'discover' : href.substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Add active state to nav links on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = 'var(--accent-color)';
                    }
                });
            }
        });
    });
}

// Setup theme toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    let isDark = false;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        
        // Save preference
        console.log(`Theme: ${isDark ? 'Dark' : 'Light'}`);
    });
}

// Add notification animation styles
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility: Scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Log welcome message
console.log(`
    ╔═══════════════════════════════════╗
    ║                                   ║
    ║        🎵 MUSICVIBE 🎵           ║
    ║                                   ║
    ║    Your Music, Your Vibe          ║
    ║                                   ║
    ╚═══════════════════════════════════╝
`);

// Export functions for global access
window.selectGenre = selectGenre;
window.scrollToSection = scrollToSection;