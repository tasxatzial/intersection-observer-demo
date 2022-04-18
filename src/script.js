const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const navList = document.querySelector('.nav-list');
const homeSection = document.getElementById('intro');
const historySection = document.getElementById('history');
const gallerySection = document.getElementById('gallery');
const homeLink = navList.querySelector('[href="#intro"]');
const historyLink = navList.querySelector('[href="#history"');
const galleryLink = navList.querySelector('[href="#gallery"');
const galleryItems = document.querySelectorAll('.gallery-item');

let h1_IO = null;
let currentLink = null;

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
            let id = entry.target.getAttribute('id');
            if (currentLink != null) {
                currentLink.classList.remove('current-link');
            }
            if (id === 'intro') {
                homeLink.classList.add('current-link');
                currentLink = homeLink;
            } else if (id === 'history') {
                historyLink.classList.add('current-link');
                currentLink = historyLink;
            } else {
                galleryLink.classList.add('current-link');
                currentLink = galleryLink;
            }
        }
    }
}

function loadImg(entries, observer) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            let img = entry.target.querySelector('img');
            img.src = img.getAttribute('data-src');
            observer.unobserve(entry.target);
        }
    }
}

(function() {
    const navList_RO = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (h1_IO) {
                h1_IO.unobserve(h1);
            }
            const headerHeight = header.getBoundingClientRect().height;
            const options = {threshold: 1, rootMargin: -headerHeight + 'px 0px 0px 0px'};
            h1_IO = new IntersectionObserver(changeHeader, options);
            h1_IO.observe(h1);
        }
    });
    navList_RO.observe(navList);
})();

(function() {
    const sections_IO_options = {
        rootMargin: '-50% 0px -50% 0px'
    }
    const sections_IO = new IntersectionObserver(underlineCurrentLink, sections_IO_options);
    sections_IO.observe(homeSection)
    sections_IO.observe(historySection)
    sections_IO.observe(gallerySection)
})();

(function() {
    const galleryItem_IO = new IntersectionObserver(loadImg, {});
    galleryItems.forEach(item => {
        galleryItem_IO.observe(item);
    });
})();
