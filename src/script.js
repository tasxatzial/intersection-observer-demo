const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const navList = document.querySelector('.nav-list');
const sections = document.querySelectorAll('section');
const galleryItems = document.querySelectorAll('.gallery-item');


function changeHeader(entries, observer) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
    }
}

function underlineCurrentLink(entries, observer) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            let id = entry.target.id;
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
    for (let entry of entries) {
        if (entry.isIntersecting) {
            let img = entry.target.querySelector('img');
            img.src = img.getAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(entry.target);
        }
    }
}

function slideText(entries, observer) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            let planetBody = entry.target.querySelector('.planet-body');
            planetBody.classList.add('slide-in');
            observer.unobserve(entry.target);
        }
    }
}

(function() {
    let io = null;
    const navList_RO = new ResizeObserver(create_h1_IO);
    navList_RO.observe(navList);

    function create_h1_IO(entries) {
        if (io) {
            io.unobserve(h1);
        }
        const headerHeight = header.getBoundingClientRect().height;
        const options = {threshold: 1, rootMargin: -headerHeight + 'px 0px 0px 0px'};
        io = new IntersectionObserver(changeHeader, options);
        io.observe(h1);
    }
})();

(function() {
    const options = {
        rootMargin: '-50% 0px -50% 0px'
    };
    const io = new IntersectionObserver(underlineCurrentLink, options);
    sections.forEach(x => io.observe(x));
})();

(function() {
    const io = new IntersectionObserver(loadImg, {});
    galleryItems.forEach(x => io.observe(x));
})();

(function() {
    const io = new IntersectionObserver(slideText, {threshold: .3});
    galleryItems.forEach(x => io.observe(x));
})();