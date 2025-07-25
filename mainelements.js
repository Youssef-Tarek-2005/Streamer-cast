console.log("mainelements.js loaded");

class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>

        <div class="logo-container">
          <a href="home_page.html"> <img src="../images/ellogo.png" id="logo_title" /> </a>
        </div>

        <div class="Navigation-bar">
          <a href="My-Favourites.html" class="navigation-items" id="nav-favourites"><b>Favourites</b></a>
          <a href="coming_soon.html" class="navigation-items" id="nav-coming-soon"><b>Coming soon</b></a>

          <div class="genre-dropdown">
            <a href="#" class="navigation-items genre-link" id="nav-genres"><b>Genres</b></a>
            <div class="dropdown-content" id="genre-list">
              <a href="#action" id="genre-action">Action</a>
              <a href="#adventure" id="genre-adventure">Adventure</a>
              <a href="#comedy" id="genre-comedy">Comedy</a>
              <a href="#horror" id="genre-horror">Horror</a>
              <a href="#romance" id="genre-romance">Romance</a>
              <a href="#sci-fi" id="genre-sci-fi">Sci-Fi</a>
            </div>
          </div>
        </div>

        <div class="search-container">
          <input type="text" id="search-input" placeholder="Search movies...">
          <div id="search-results"></div>
        </div>

        <div class="language-container">
          <div id="google_translate_element"></div>
        </div>

        <div class="signin-container">
          <a href="sign-in.html" class="signin-btn" id="Sign-In">Sign In</a>
        </div>
      </header>
    `;
  }
}

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-container">
          <div>
            <h3 class="footer-heading" id="footer-explore">Explore</h3>
            <ul class="footer-list">
              <li><a href="../html/scarface.html" class="footer-link" id="footer-trending">Trending Movies</a></li>
              <li><a href="../html/john-wick4.html" class="footer-link" id="footer-newreleases">New Releases</a></li>
              <li><a href="../html/godfather1 movie-page.html" class="footer-link" id="footer-toprated">Top Rated</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-heading" id="footer-support">Support</h3>
            <ul class="footer-list">
              <li><a href="../html/help-center.html" class="footer-link" id="footer-helpcenter">Help Center</a></li>
              <li><a href="../html/faq.html" class="footer-link" id="footer-faqs">FAQs</a></li>
              <li><a href="mailto:youssef2304896@miuegypt.edu.eg" class="footer-link" id="footer-contactus">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-heading" id="footer-company">Company</h3>
            <ul class="footer-list">
              <li><a href="../html/about-us.html" class="footer-link" id="footer-aboutus">About Us</a></li>
              <li><a href="../html/career.html" class="footer-link" id="footer-careers">Careers</a></li>
              <li><a href="../html/privacy-policy.html" class="footer-link" id="footer-privacypolicy">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-heading" id="footer-followus">Follow Us</h3>
            <ul class="footer-list">
              <li><a href="https://www.facebook.com/StreamCast" class="footer-link"><i class="fab fa-facebook"></i> Facebook</a></li>
              <li><a href="https://twitter.com/StreamCast" class="footer-link"><i class="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="https://www.instagram.com/StreamCast" class="footer-link"><i class="fab fa-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-copy">2024 StreamCast. All rights reserved.</div>
      </footer>
    `;
  }
}

class LoadingScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .loading-logo {
          width: 300px;
          height: auto;
          animation: flash 1s infinite;
        }

        @keyframes flash {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      </style>

      <div class="loading-screen">
        <img src="../images/ellogo.png" class="loading-logo" alt="Loading"/>
      </div>
    `;

    setTimeout(() => {
      this.style.display = 'none';
    }, 1500);
  }
}

customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);
customElements.define('loading-screen', LoadingScreen);

// Google Translate initialization
window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    { pageLanguage: 'en' },
    'google_translate_element'
  );
};

const script = document.createElement('script');
script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
script.type = 'text/javascript';
document.body.appendChild(script);

// SEARCH FUNCTIONALITY (DO NOT MODIFY THIS)
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  let movies = [];
  const storedData = localStorage.getItem('movieData');
  if (storedData) {
    try {
      movies = JSON.parse(storedData);
    } catch (e) {
      console.error('Failed to parse movie data from localStorage', e);
    }
  }

  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<mark style="color:white;background-color:#444;border-radius:3px;padding:0 2px;">$1</mark>`);
  }

  function showResults(results, query) {
    resultsContainer.innerHTML = '';
    resultsContainer.style.position = 'absolute';
    resultsContainer.style.top = '100%';
    resultsContainer.style.left = '0';
    resultsContainer.style.width = '100%';
    resultsContainer.style.background = '#222';
    resultsContainer.style.borderRadius = '0 0 10px 10px';
    resultsContainer.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
    resultsContainer.style.zIndex = '1000';
    resultsContainer.style.maxHeight = '300px';
    resultsContainer.style.overflowY = 'auto';
    resultsContainer.style.display = 'block';

    if (results.length === 0) {
      const noRes = document.createElement('div');
      noRes.textContent = 'No results found';
      noRes.style.color = 'white';
      noRes.style.padding = '10px';
      resultsContainer.appendChild(noRes);
      return;
    }

    results.forEach(movie => {
      const result = document.createElement('div');
      result.style.display = 'flex';
      result.style.alignItems = 'center';
      result.style.padding = '10px';
      result.style.borderBottom = '1px solid #444';
      result.style.cursor = 'pointer';
      result.style.color = 'white';

      const img = document.createElement('img');
      img.src = movie.image;
      img.alt = movie.title;
      img.style.width = '40px';
      img.style.height = '60px';
      img.style.objectFit = 'cover';
      img.style.marginRight = '10px';

      const info = document.createElement('div');

      const title = document.createElement('div');
      title.innerHTML = highlightMatch(movie.title, query);
      title.style.fontWeight = 'bold';
      title.style.color = 'white';

      const year = document.createElement('div');
      year.textContent = movie.year;
      year.style.color = '#aaa';

      info.appendChild(title);
      info.appendChild(year);
      result.appendChild(img);
      result.appendChild(info);
      

      result.addEventListener('click', () => {
        if (movie.href && movie.href !== '#' && movie.href !== window.location.href) {
          window.location.href = movie.href;
        } else {
          alert(`Page not available for "${movie.title}".`);
        }
      });

      resultsContainer.appendChild(result);
    });
  }

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query === '') {
      resultsContainer.style.display = 'none';
      return;
    }
    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    showResults(filtered, query);
  }

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', handleSearch);
  }

  document.addEventListener('click', e => {
    if (!document.querySelector('.search-container')?.contains(e.target)) {
      resultsContainer.style.display = 'none';
    }
  });
});

