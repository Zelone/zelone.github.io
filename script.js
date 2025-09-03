/**
 * Zelone's Portfolio - Enhanced JavaScript
 * Includes: Navigation, API handling, Search, Error handling
 */

// Global configuration
const CONFIG = {
    GITHUB_USERNAME: 'zelone',
    API_BASE_URL: 'https://api.github.com',
    ITEMS_PER_PAGE: 100,
    COLUMN_COUNT: 2,
    DEBOUNCE_DELAY: 300
};

// Global state
const state = {
    repositories: [],
    filteredRepositories: [],
    isLoading: false,
    currentPage: 'home'
};

// Utility functions
const utils = {
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text ? text.replace(/[&<>"']/g, m => map[m]) : '';
    },

    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    },

    formatSize: function(size) {
        if (size < 1024) return size + ' KB';
        return Math.round(size / 1024 * 100) / 100 + ' MB';
    }
};

// API functions
const api = {
    async fetchRepositories() {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/users/${CONFIG.GITHUB_USERNAME}/repos?per_page=${CONFIG.ITEMS_PER_PAGE}&sort=updated`);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.filter(repo => !repo.fork); // Filter out forks
        } catch (error) {
            console.error('Error fetching repositories:', error);
            throw error;
        }
    },

    async fetchCommitInfo(repoName) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/repos/${CONFIG.GITHUB_USERNAME}/${repoName}/commits?per_page=1`);
            if (response.ok) {
                const commits = await response.json();
                return commits[0] || null;
            }
            return null;
        } catch (error) {
            console.warn(`Could not fetch commit info for ${repoName}:`, error);
            return null;
        }
    }
};

// UI functions
const ui = {
    showLoading: function(container, message = 'Loading repositories...') {
        const loadingHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="loading-text">${utils.escapeHtml(message)}</div>
            </div>
        `;
        container.innerHTML = loadingHTML;
    },

    showError: function(container, error) {
        const errorHTML = `
            <div class="error-container">
                <div class="error-title">Oops! Something went wrong</div>
                <div class="error-message">${utils.escapeHtml(error.message)}</div>
                <button class="retry-btn" onclick="location.reload()">Try Again</button>
            </div>
        `;
        container.innerHTML = errorHTML;
    },

    createRepositoryCard: function(repo) {
        const hasPages = repo.has_pages;
        const repoUrl = hasPages ? `/${repo.name === 'zelone.github.io' ? '' : repo.name}` : repo.html_url;
        const linkTarget = hasPages ? '_self' : '_blank';
        
        // Process description for links
        let description = repo.description || 'No description provided yet';
        description = description.replace(
            /https?:\/\/(www\.)?((?:youtu\.be)?(?:youtube\.com)?(?:github\.com)?)\/([^\s]*)/g,
            '<a href="$&" target="_blank" rel="noopener">$&</a>'
        );

        // Create topics badges
        const topicsHTML = repo.topics && repo.topics.length > 0 
            ? `<div class="mb-3">
                ${repo.topics.map(topic => `<span class="badge badge-topic">${utils.escapeHtml(topic)}</span>`).join(' ')}
               </div>`
            : '';

        return `
            <div class="col-12 mb-4">
                <div class="card repo-card fade-in">
                    <div class="card-body">
                        <h5 class="card-title">
                            ${hasPages 
                                ? `<a href="${repoUrl}" target="${linkTarget}">${utils.escapeHtml(repo.name)}</a>`
                                : utils.escapeHtml(repo.name)
                            }
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            ${repo.language ? `Language: <span class="lang">${utils.escapeHtml(repo.language)}</span>` : ''}
                            ${repo.language && repo.size ? ' • ' : ''}
                            ${repo.size ? `Size: <span class="ssize">${utils.formatSize(repo.size)}</span>` : ''}
                        </h6>
                        <p class="card-text">${description}</p>
                        ${topicsHTML}
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                Updated: ${utils.formatDate(repo.updated_at)}
                            </small>
                            <div>
                                <a href="${repo.html_url}" target="_blank" rel="noopener" class="card-link">
                                    View on GitHub
                                </a>
                                ${hasPages ? `<a href="${repoUrl}" target="${linkTarget}" class="card-link ml-2">Live Demo</a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderRepositories: function(repositories) {
        const columns = [
            document.getElementById('card-repo1'),
            document.getElementById('card-repo2')
        ];
        
        if (!columns[0] || !columns[1]) return;

        // Clear existing content
        columns.forEach(col => col.innerHTML = '');

        // Distribute repositories across columns
        repositories.forEach((repo, index) => {
            const columnIndex = index % CONFIG.COLUMN_COUNT;
            const cardHTML = this.createRepositoryCard(repo);
            columns[columnIndex].insertAdjacentHTML('beforeend', cardHTML);
        });
    }
};

// Search functionality
const search = {
    init: function() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const clearBtn = document.getElementById('clearSearch');
        
        if (!searchInput) return;

        const debouncedSearch = utils.debounce((query) => {
            this.performSearch(query);
        }, CONFIG.DEBOUNCE_DELAY);

        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });

        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.performSearch(searchInput.value);
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                this.performSearch('');
                searchInput.focus();
            });
        }
    },

    performSearch: function(query) {
        const trimmedQuery = query.trim().toLowerCase();
        const resultsContainer = document.getElementById('searchResults');
        
        if (!trimmedQuery) {
            state.filteredRepositories = [...state.repositories];
        } else {
            state.filteredRepositories = state.repositories.filter(repo => {
                return (
                    repo.name.toLowerCase().includes(trimmedQuery) ||
                    (repo.description && repo.description.toLowerCase().includes(trimmedQuery)) ||
                    (repo.language && repo.language.toLowerCase().includes(trimmedQuery)) ||
                    (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes(trimmedQuery)))
                );
            });
        }

        // Update results count
        if (resultsContainer) {
            const count = state.filteredRepositories.length;
            const total = state.repositories.length;
            resultsContainer.textContent = trimmedQuery 
                ? `Found ${count} of ${total} repositories`
                : `Showing all ${total} repositories`;
        }

        // Re-render repositories
        ui.renderRepositories(state.filteredRepositories);
    }
};

// Navigation functions (delegated to nav.html)
const navigation = {
    init: function() {
        // Navigation is now handled by nav.html
        // This function is kept for compatibility
        state.currentPage = this.getCurrentPage();
        console.log('Navigation delegated to nav.html');
    },

    getCurrentPage: function() {
        const path = window.location.pathname;
        if (path.endsWith('about.html') || path.endsWith('about')) {
            return 'about';
        } else if (path.endsWith('repositories.html') || path.endsWith('repositories')) {
            return 'repositories';
        } else {
            return 'home';
        }
    }
};

// Repository page functionality
const repositoryPage = {
    async init() {
        const repoContainer1 = document.getElementById('card-repo1');
        const repoContainer2 = document.getElementById('card-repo2');
        
        if (!repoContainer1 || !repoContainer2) return;

        try {
            state.isLoading = true;
            ui.showLoading(repoContainer1, 'Loading your repositories...');
            repoContainer2.innerHTML = '';

            const repositories = await api.fetchRepositories();
            state.repositories = repositories;
            state.filteredRepositories = [...repositories];

            ui.renderRepositories(state.filteredRepositories);
            search.init();

            // Update search results count
            const resultsContainer = document.getElementById('searchResults');
            if (resultsContainer) {
                resultsContainer.textContent = `Showing all ${repositories.length} repositories`;
            }

        } catch (error) {
            console.error('Error loading repositories:', error);
            ui.showError(repoContainer1, error);
        } finally {
            state.isLoading = false;
        }
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation for all pages
    navigation.init();

    // Initialize page-specific functionality
    if (state.currentPage === 'repositories') {
        repositoryPage.init();
    }

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states to external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 1000);
        });
    });
});

// Handle page visibility change (pause/resume operations)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page is now hidden');
    } else {
        console.log('Page is now visible');
    }
});

// Export for potential use by other scripts
window.ZelonePortfolio = {
    config: CONFIG,
    state: state,
    utils: utils,
    api: api,
    ui: ui,
    search: search,
    navigation: navigation
};
