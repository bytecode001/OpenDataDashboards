// Dashboard data (placeholder)
const dashboards = [
    {
        title: "Oscar Awards Explorer",
        description: "Explore 97 years of Academy Award winners and nominations through an interactive timeline and search tool powered by real data.",
        image: "img/oscar-awards.jpg",
        link: "https://bytecode001.github.io/OpenDataDashboards/dashboards/oscar-awards/"
    },
    {
        title: "COVID-19 World Statistics",
        description: "Real-time dashboard with global pandemic statistics, including cases, vaccinations, and regional trends.",
        image: "img/placeholder.jpg",
        link: "dashboards/covid-stats/index.html"
    },
    {
        title: "Financial Markets Analysis",
        description: "Dynamic visualization of financial markets with interactive charts and asset performance analysis.",
        image: "img/placeholder.jpg",
        link: "dashboards/financial-markets/index.html"
    },
    {
        title: "World Population Demographics",
        description: "Global demographic exploration with interactive maps and future population projections by country.",
        image: "img/placeholder.jpg",
        link: "dashboards/population/index.html"
    },
    {
        title: "Energy Consumption Patterns",
        description: "Analysis of global energy consumption focusing on renewable sources and sustainability trends.",
        image: "img/placeholder.jpg",
        link: "dashboards/energy/index.html"
    },
    {
        title: "E-commerce Trends 2024",
        description: "Comprehensive e-commerce trends dashboard with market analysis, product categories, and shopping behaviors.",
        image: "img/placeholder.jpg",
        link: "dashboards/ecommerce/index.html"
    }
];

// Function to create a dashboard card
function createDashboardCard(dashboard, index) {
    const card = document.createElement('article');
    card.className = 'dashboard-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="card-image-container">
            <img src="${dashboard.image}" alt="${dashboard.title}" class="card-image" loading="lazy">
        </div>
        <div class="card-content">
            <h2 class="card-title">${dashboard.title}</h2>
            <p class="card-description">${dashboard.description}</p>
            <a href="${dashboard.link}" class="view-button" onclick="handleCardClick(event)">
                <span class="view-button-text">View Dashboard</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </a>
        </div>
    `;
    
    // Click on entire card
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('view-button') && !e.target.closest('.view-button')) {
            window.location.href = dashboard.link;
        }
    });
    
    return card;
}

// Handle click with ripple effect
function handleCardClick(event) {
    event.stopPropagation();
    const button = event.currentTarget;
    
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize dashboard grid
function initializeDashboards() {
    const grid = document.getElementById('dashboards');
    
    dashboards.forEach((dashboard, index) => {
        const card = createDashboardCard(dashboard, index);
        grid.appendChild(card);
    });
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
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
}

// Intersection Observer for scroll animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.dashboard-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// Theme management (light/dark mode)
function initializeThemeToggle() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        document.body.classList.toggle('dark-mode', e.matches);
    });
}

// Lazy loading for images with fallback
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'img/placeholder.jpg';
        });
    });
}

// Hero background animation on mouse movement
function initializeHeroAnimation() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { width, height } = hero.getBoundingClientRect();
        
        const xPos = (clientX / width - 0.5) * 20;
        const yPos = (clientY / height - 0.5) * 20;
        
        heroContent.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
    
    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translate(0, 0)';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboards();
    initializeSmoothScroll();
    initializeThemeToggle();
    initializeLazyLoading();
    initializeHeroAnimation();
    
    // Initialize scroll animations after a brief delay
    setTimeout(() => {
        initializeScrollAnimations();
    }, 100);
});

// Performance optimization: Debounce for resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize components that depend on window dimensions
        initializeHeroAnimation();
    }, 250);
});

// Add style for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);