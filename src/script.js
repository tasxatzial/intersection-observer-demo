const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const navList = document.querySelector('.nav-list');
const sections = document.querySelectorAll('section');
const destinationItems = document.querySelectorAll('.destinations-item');
const images = document.querySelectorAll('.destinations-img');
const planetBodies = document.querySelectorAll('.planet-body');

function changeHeader(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            header.classList.add('intro-header');
        } else {
            header.classList.remove('intro-header');
        }
    }
}

function underlineCurrentLink(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            let id = entries[i].target.id;
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
            img.classList.add('loaded-img');
            observer.unobserve(entries[i].target);
        }
    }
}

function slideText(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            let planetBody = entries[i].target.querySelector('.planet-body');
            planetBody.classList.add('slide-in');
            observer.unobserve(entries[i].target);
        }
    }
}

function loadAllImages() {
    for (let i = 0; i < images.length; i++) {
        images[i].src = images[i].getAttribute('data-src');
        images[i].classList.add('loaded-img');
    }
}

function slideAllText() {
    for (let i = 0; i < planetBodies.length; i++) {
        planetBodies[i].classList.add('slide-in');
    }
}

if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'isIntersecting' in window.IntersectionObserverEntry.prototype) {
    (function() {
        let io = null;
        const navList_RO = new ResizeObserver(create_h1_IO);
        navList_RO.observe(navList);
    
        function create_h1_IO(entries) {
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
        sections.forEach(function(x, i) {
            io.observe(x);
        });
    })();
    
    (function() {
        const options = {
            threshold: .8
        };
        const io = new IntersectionObserver(loadImg, options);
        destinationItems.forEach(function(x, i) {
            io.observe(x);
        });
    })();
    
    (function() {
        const options = {
            threshold: .5
        };
        const io = new IntersectionObserver(slideText, options);
        destinationItems.forEach(function(x, i) {
            io.observe(x);
        });
    })();
}  else {
    loadAllImages();
    slideAllText();
}
