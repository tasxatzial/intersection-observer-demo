const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const navList = document.querySelector('.nav-list');
const homeSection = document.getElementById('intro');
const historySection = document.getElementById('history');
const gallerySection = document.getElementById('gallery');

const homeLink = navList.querySelector('[href="#intro"]');
const historyLink = navList.querySelector('[href="#history"');
const galleryLink = navList.querySelector('[href="#gallery"');

function changeHeader(entries, introObserver) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
    }
}

let h1_IO = null;

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
})

navList_RO.observe(navList);

const sections_IO_options = {
    rootMargin: '-49.99% 0px -50% 0px'
}

let currentLink = null;

const sections_IO = new IntersectionObserver(entries => {
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
},
sections_IO_options);

sections_IO.observe(homeSection)
sections_IO.observe(historySection)
sections_IO.observe(gallerySection)