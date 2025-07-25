const movies = [
    {
        id: 'godfather1',
        title: "The Godfather",
        year: "1972",
        duration: "2h 55m",
        description: `"The Godfather" follows the powerful Corleone family as they navigate loyalty, betrayal, and crime. When an attack weakens their leader, his son Michael is forced into the violent world he once rejected, changing the family's fate forever.`,
        bgImage: "../images/The-godfather-Netflix-F.jpg",
        logo: "../images/The-godfather-movie-logo.webp",
        trailer: "../video/The Godfather Trailer.mp4",
        watchLink: "../html/godfather1 movie-page.html",
        trilogyFlag: true,
        genre: ["Crime", "Drama"]
    },
    {
        id: 'godfather2',
        title: "The Godfather Part II",
        year: "1974",
        duration: "3h 22m",
        description: `"The Godfather Part II" follows Michael Corleone as he expands the family empire while facing betrayal from within. As his grip on power tightens, flashbacks reveal his father Vito's rise from orphan to Don, showing the cost of legacy, ambition, and family loyalty.`,
        bgImage: "../images/godfather2moviepicturepage.jpg",
        logo: "../images/godfather 2 logo.png",
        trailer: "../video/Godfather Part II trailer.mp4",
        watchLink: "../html/godfather2 movie-page.html",
        trilogyFlag: true,
        genre: ["Crime", "Drama"]
    },
    {
        id: 'godfather3',
        title: "The Godfather Part III",
        year: "1990",
        duration: "2h 42m",
        description: `"The Godfather Part III" follows an aging Michael Corleone as he seeks to legitimize the family business and escape the shadows of his past. As old sins resurface and new enemies emerge, Michael is drawn into a deadly web of power, redemption, and tragedy.`,
        bgImage: "../images/godfatherpart3movie-image.jpg",
        logo: "../images/The-godfather-part-iii-movie-logo.webp",
        trailer: "../video/The Godfather Part III Trailer.mp4",
        watchLink: "../html/godfather3 movie-page.html",
        trilogyFlag: true,
        genre: ["Crime", "Drama"]
    },
    {
        id: 'johnwick1',
        title: "John Wick",
        year: "2014",
        duration: "1h 41m",
        description: `"John Wick" follows a retired hitman seeking vengeance after the death of his dog, a final gift from his late wife. His quest for revenge leads him back into the criminal underworld he once escaped, unleashing a deadly rampage through New York's criminal hierarchy.`,
        bgImage: "../images/john-wick--poster.png",
        logo: "../images/John_Wick_logo.webp",
        trailer: "../video_and_soun/jwtr.mp4",
        watchLink: "../html/john-wick.html",
        trilogyFlag: false,
        genre: ["Action", "Thriller"]
    },
    {
        id: 'johnwick2',
        title: "John Wick: Chapter 2",
        year: "2017",
        duration: "2h 2m",
        description: `"John Wick: Chapter 2" follows the legendary hitman as he's forced out of retirement by a former associate. Bound by a blood oath, John must travel to Rome to face the world's most dangerous criminals in this action-packed sequel.`,
        bgImage: "../images/John-wick-2.jpg",
        logo: "../images/John_Wick_2_logo.webp",
        trailer: "../video/John Wick_ Chapter 2 Official Trailer.mp4",
        watchLink: "../html/john-wick-2.html",
        trilogyFlag: false,
        genre: ["Action", "Thriller"]
    },
    {
        id: 'johnwick3',
        title: "John Wick: Chapter 3",
        year: "2019",
        duration: "2h 10m",
        description: `"John Wick: Chapter 3" follows John as he becomes a marked man on the run in New York City. With a $14 million bounty on his head, he must fight his way through the city's criminal underworld, facing off against an army of the world's most ruthless killers.`,
        bgImage: "../images/john-wick-chapter-3.webp",
        logo: "../images/John_Wick_Chapter_3_logo.png",
        trailer: "../video/john-wick-3-trailer.mp4",
        watchLink: "../html/john-wick-3.html",
        trilogyFlag: false,
        genre: ["Action", "Thriller"]
    },
    {
        id: 'johnwick4',
        title: "John Wick: Chapter 4",
        year: "2023",
        duration: "2h 49m",
        description: `"John Wick: Chapter 4" finds John facing his greatest challenge yet. With the price on his head ever increasing, he must take on the High Table and its most powerful members to earn his freedom, leading to an epic showdown across the globe.`,
        bgImage: "../images/john-wick-chapter-4.jpg",
        logo: "../images/John_Wick_Chapter_4_logo.png",
        trailer: "../video/john-wick-4-trailer.mp4",
        watchLink: "../html/John-wick4.html",
        trilogyFlag: false,
        genre: ["Action", "Thriller"]
    },
    {
        id: 'scarface',
        title: "Scarface",
        year: "1983",
        duration: "2h 50m",
        description: `"Scarface" follows Tony Montana, a Cuban refugee who arrives in Miami with nothing and rises to become a powerful drug kingpin. His ambition and paranoia lead to his ultimate downfall in this epic tale of power, greed, and excess.`,
        bgImage: "../images/scarface0.webp",
        logo: "../images/Scarface_logo.webp",
        trailer: "../video/scarfacetr.mp4",
        watchLink: "../html/scarface.html",
        trilogyFlag: false,
        genre: ["Crime", "Drama"]
    },
    {
        id: 'taxidriver',
        title: "Taxi Driver",
        year: "1976",
        duration: "1h 54m",
        description: `"Taxi Driver" follows Travis Bickle, a lonely and disturbed veteran who spirals into violence while navigating the gritty streets of New York City. As his sense of justice warps, he becomes a vigilante in this haunting exploration of urban alienation.`,
        bgImage: "../images/taxidriverbackground.jpg",
        logo: "../images/taxi driver logo.webp",
        trailer: "../video/taxi-driver-trailer.mp4",
        watchLink: "../html/taxi-driver movie-page.html",
        trilogyFlag: false,
        genre: ["Crime", "Drama"]
    }
];

// Configuration
const config = {
    transitionDuration: 800,
    contentDelay: 50,
    buttonDelay: 100,
    autoPlayInterval: 3000,
    touchThreshold: 50,
    preloadCount: 1
};

// State management
let currentIndex = 0;
let isTransitioning = false;
let autoPlayTimer = null;
let preloadedImages = new Map();
let isModalOpen = false;

// Initialize hero section
function initHeroSection() {
    const firstMovie = movies[0];
    const img = new Image();
    img.onload = () => {
        createNavigationDots();
        setupEventListeners();
        updateHeroSection(firstMovie);
        startAutoPlay();
        preloadAdjacentImages();
    };
    img.src = firstMovie.bgImage;
}

// Create navigation dots
function createNavigationDots() {
    const dotsContainer = document.getElementById('navDots');
    movies.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'nav-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', index === 0);
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    updateNavigationDots();
}

// Update navigation dots
function updateNavigationDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
        dot.setAttribute('aria-selected', index === currentIndex);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Touch events for swipe
    let touchStartX = 0;
    let touchEndX = 0;

    document.getElementById('homeSection').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.getElementById('homeSection').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isModalOpen) return;
        if (e.key === 'ArrowLeft') goToPreviousSlide();
        if (e.key === 'ArrowRight') goToNextSlide();
    });

    // Auto-play pause on hover
    document.getElementById('homeSection').addEventListener('mouseenter', () => {
        clearInterval(autoPlayTimer);
    });

    document.getElementById('homeSection').addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Trailer button
    document.getElementById('tr').addEventListener('click', () => {
        const currentMovie = movies[currentIndex];
        if (currentMovie.trailer) {
            showTrailer(currentMovie.trailer);
        }
    });

    // Movie button - redirect to movie page
    document.getElementById('movie').addEventListener('click', () => {
        const currentMovie = movies[currentIndex];
        if (currentMovie.watchLink) {
            window.location.href = currentMovie.watchLink;
        }
    });

    // Modal close
    document.querySelector('.close').addEventListener('click', () => {
        closeTrailer();
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('trailerModal');
        if (e.target === modal) {
            closeTrailer();
        }
    });
}

// Handle swipe
function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > config.touchThreshold) {
        if (swipeDistance > 0) {
            goToPreviousSlide();
        } else {
            goToNextSlide();
        }
    }
}

// Navigation functions
function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;
    currentIndex = index;
    updateHeroSection(movies[currentIndex]);
    updateNavigationDots();
    preloadAdjacentImages();
}

function goToNextSlide() {
    const nextIndex = (currentIndex + 1) % movies.length;
    goToSlide(nextIndex);
}

function goToPreviousSlide() {
    const prevIndex = (currentIndex - 1 + movies.length) % movies.length;
    goToSlide(prevIndex);
}

// Auto-play functions
function startAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(goToNextSlide, config.autoPlayInterval);
}

// Image preloading
function preloadAdjacentImages() {
    const indices = [
        (currentIndex - 1 + movies.length) % movies.length,
        (currentIndex + 1) % movies.length
    ];

    indices.forEach(index => {
        const movie = movies[index];
        if (!preloadedImages.has(movie.id)) {
            const img = new Image();
            img.src = movie.bgImage;
            preloadedImages.set(movie.id, img);
        }
    });
}

// Update hero section
function updateHeroSection(movie) {
    if (isTransitioning) return;
    isTransitioning = true;

    console.log(`Updating hero section for movie ID: ${movie.id}`);
    console.log(`Background image path: ${movie.bgImage}`);

    const heroSection = document.getElementById('homeSection');
    const heroBackground = document.getElementById('heroBackground');
    const heroTitle = document.querySelector('.hero-title');
    const heroMeta = document.querySelector('.hero-meta');
    const heroDescription = document.getElementById('heroDescription');
    const heroButtons = document.querySelector('.hero-buttons');

    // Add loading state
    heroSection.classList.add('loading');

    // Fade out current content
    heroTitle.style.opacity = '0';
    heroMeta.style.opacity = '0';
    heroDescription.style.opacity = '0';
    heroButtons.style.opacity = '0';

    // Preload new background image
    const newImage = new Image();
    newImage.onload = () => {
        // Update background
        heroBackground.style.opacity = '0';
        setTimeout(() => {
            heroBackground.style.backgroundImage = `url(${movie.bgImage})`;
            heroBackground.style.opacity = '1';

            // Update content immediately for first load
            heroTitle.innerHTML = `<img src="${movie.logo}" alt="${movie.title}" style="max-width: 100%; height: auto; object-fit: contain;">`;
            heroMeta.innerHTML = `
                <span class="meta-year">${movie.year}</span>
                <span class="meta-duration">${movie.duration}</span>
                <span class="meta-quality">${movie.genre[0]}</span>
            `;
            heroDescription.textContent = movie.description;

            // Fade in content with staggered delay
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, config.contentDelay);

            setTimeout(() => {
                heroMeta.style.opacity = '1';
                heroMeta.style.transform = 'translateY(0)';
            }, config.contentDelay * 2);

            setTimeout(() => {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, config.contentDelay * 3);

            setTimeout(() => {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
                heroSection.classList.remove('loading');
                isTransitioning = false;
            }, config.buttonDelay);
        }, config.transitionDuration);
    };

    newImage.onerror = () => {
        console.error('Failed to load background image:', movie.bgImage);
        heroSection.classList.remove('loading');
        isTransitioning = false;
    };

    newImage.src = movie.bgImage;
}

// Trailer functions
function showTrailer(videoUrl) {
    const modal = document.getElementById('trailerModal');
    const video = document.getElementById('trailerVideo');
    video.src = videoUrl;
    modal.style.display = 'flex';
    video.play();
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
}

function closeTrailer() {
    const modal = document.getElementById('trailerModal');
    const video = document.getElementById('trailerVideo');
    video.pause();
    video.src = '';
    modal.style.display = 'none';
    isModalOpen = false;
    document.body.style.overflow = '';
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initHeroSection);