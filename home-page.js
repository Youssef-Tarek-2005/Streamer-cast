

function play_trailer() {
    document.getElementById("trailerPopup").style.display = "block";
    document.getElementById("trailer_start").play();
}

function leave_trailer() {
    document.getElementById("trailerPopup").style.display = "none";
    document.getElementById("trailer_start").pause(); 
}

function enter_movie_page() {
    window.location.href = "godfather1 movie-page.html";
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-arrow').forEach(arrow => {
        arrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.style.transform = 'translateY(-50%) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-50%) scale(1)';
            }, 100);

            const direction = this.classList.contains('left') ? -1 : 1;
            const container = this.closest('.movie-row-container').querySelector('.cover-movies');
            
            if (!container) return;
            
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: scrollAmount * direction,
                behavior: 'smooth'
            });
        });
    });

    // Enhanced scroll detection
    function handleScroll() {
        document.querySelectorAll('.cover-movies').forEach(container => {
            const containerRect = container.getBoundingClientRect();
            const leftArrow = container.parentElement.previousElementSibling;
            const rightArrow = container.parentElement.nextElementSibling;
            
            if (!leftArrow || !rightArrow) return;
            
            // Update arrow states
            leftArrow.style.opacity = container.scrollLeft <= 10 ? '0.5' : '1';
            leftArrow.style.pointerEvents = container.scrollLeft <= 10 ? 'none' : 'all';
            
            const maxScroll = container.scrollWidth - container.clientWidth;
            rightArrow.style.opacity = container.scrollLeft >= maxScroll - 10 ? '0.5' : '1';
            rightArrow.style.pointerEvents = container.scrollLeft >= maxScroll - 10 ? 'none' : 'all';
        });
    }
    
    handleScroll();
    
    document.querySelectorAll('.cover-movies').forEach(container => {
        container.addEventListener('scroll', handleScroll);
    }); 
    
    window.addEventListener('resize', handleScroll);
});

// Simple, reliable arrow navigation
document.addEventListener('DOMContentLoaded', function() {
    const arrowHandler = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const arrow = e.currentTarget;
        const container = document.getElementById(arrow.dataset.target);
        const scrollAmount = 600; // Increased scroll distance
        
        arrow.style.transform = 'translateY(-50%) scale(0.95)';
        
        container.scrollBy({
            left: arrow.classList.contains('left') ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
            duration: 300 
        });
        
        setTimeout(() => {
            arrow.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    };

    // Lightning-fast event listeners
    document.querySelectorAll('.nav-arrow').forEach(arrow => {
        arrow.addEventListener('click', arrowHandler, { passive: false });
        arrow.style.pointerEvents = 'auto';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const mainContent = document.getElementById("mainContentContainer");

    setTimeout(() => {
        loadingScreen.style.display = "none"; // Hide loading screen
        mainContent.style.display = "block"; // Show main content
    }, 1700); // 1.7 seconds delay (adjust as needed)
});
