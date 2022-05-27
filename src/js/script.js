const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const nav = document.querySelector('nav');
const navList = nav.querySelector('.nav-list');
const navLinks = nav.querySelectorAll('.nav-link');
const navBtn = header.querySelector('.toggle-nav');
const destinations = document.querySelectorAll('.destination');
const images = document.querySelectorAll('.destination-img');
const destinationBodies = document.querySelectorAll('.destination-body');
const introContent = document.querySelector('.intro-content');
const historyContent = document.querySelector('.history-content');
const destinationsContent = document.querySelector('.destinations-content');
const mqList = window.matchMedia("(min-width: 45rem)");


function changeHeader(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            if (!header.classList.contains('js-nav-open')) {
                header.classList.add('js-bg-transparent');
            }
            header.classList.remove('box-shadow');
            header.classList.add('js-above-h1');
        } else {
            if (!header.classList.contains('js-nav-open')) {
                header.classList.add('box-shadow');
            }
            header.classList.remove('js-bg-transparent');
            header.classList.remove('js-above-h1');
        }
    }
}

function underlineCurrentLink(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            let id = entries[i].target.parentNode.id;
            let currentUnderlined = navList.querySelector('.current-link');
            let newUnderlined = navList.querySelector('[href="#' + id + '"]');
            if (currentUnderlined) {
                currentUnderlined.classList.remove('current-link');
            }
            newUnderlined.classList.add('current-link');
        }
    }
}

function loadImg(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            let img = entries[i].target.querySelector('img');
            img.src = img.getAttribute('data-src');
            img.classList.add('js-loaded-img');
            observer.unobserve(entries[i].target);
        }
    }
}

function slideText(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            let planetBody = entries[i].target.querySelector('.destination-body');
            planetBody.classList.add('js-slide-in');
            observer.unobserve(entries[i].target);
        }
    }
}

function loadAllImages() {
    for (let i = 0; i < images.length; i++) {
        images[i].src = images[i].getAttribute('data-src');
        images[i].classList.add('js-loaded-img');
    }
}

function slideAllText() {
    for (let i = 0; i < destinationBodies.length; i++) {
        destinationBodies[i].classList.add('js-slide-in');
    }
}

function toggleNav() {
    header.classList.toggle('js-nav-open');
    if (header.classList.contains('js-nav-open')) {
        navBtn.setAttribute('aria-expanded', 'true');
        header.classList.remove('js-bg-transparent');
        header.classList.remove('box-shadow');
        return;
    }
    navBtn.setAttribute('aria-expanded', 'false');
    if (header.classList.contains('js-above-h1')) {
        header.classList.add('js-bg-transparent');
        header.classList.remove('box-shadow');
    } else {
        header.classList.add('box-shadow');
    }
}

function closeNav() {
    if (header.classList.contains('js-nav-open')) {
        toggleNav();
    }
}

function autoCloseNav(e) {
    if (header.classList.contains('js-nav-open') &&
        (introContent.contains(e.target) ||
         historyContent.contains(e.target) ||
         destinationsContent.contains(e.target))) {
             toggleNav();
    }
}

function closeNavOnResize() {
    if (mqList.matches) {
        closeNav();
    }
}

function supportsObservers() {
    return 'IntersectionObserver' in window &&
           'IntersectionObserverEntry' in window &&
           'isIntersecting' in window.IntersectionObserverEntry.prototype;
}

function createObservers() {
    (function() {
        let io = null;
        const navList_RO = new ResizeObserver(create_h1_IO);
        navList_RO.observe(navList);

        function create_h1_IO(entries, observer) {
            if (io) {
                io.unobserve(h1);
            }
            const headerHeight = header.getBoundingClientRect().height;
            const options = {
                threshold: 1,
                rootMargin: -headerHeight + 'px 0px 0px 0px'
            };
            io = new IntersectionObserver(changeHeader, options);
            io.observe(h1);
        }
    })();
    
    (function() {
        const options = {
            rootMargin: '-50% 0px -50% 0px'
        };
        const io = new IntersectionObserver(underlineCurrentLink, options);
        io.observe(introContent);
        io.observe(historyContent);
        io.observe(destinationsContent);
    })();
    
    (function() {
        const options = {
            threshold: .8
        };
        const io = new IntersectionObserver(loadImg, options);
        destinations.forEach(function(x, i) {
            io.observe(x);
        });
    })();
    
    (function() {
        const options = {
            threshold: .5
        };
        const io = new IntersectionObserver(slideText, options);
        destinations.forEach(function(x, i) {
            io.observe(x);
        });
    })();
}

(function() {
    if (mqList.addEventListener) {
        mqList.addEventListener('change', closeNavOnResize);
    } else {
        mqList.addListener(closeNavOnResize);
    }
    window.addEventListener('click', autoCloseNav);
    if (supportsObservers()) {
        createObservers();
    } else {
        loadAllImages();
        slideAllText();
    }
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', closeNav);
    }
    navBtn.addEventListener('click', toggleNav);
    window.addEventListener('load', function() {
        h1.classList.add('js-slide-in');
    });
})();
