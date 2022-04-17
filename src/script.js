const header = document.querySelector('header');
const introObserved = document.querySelector('h1');
const introSection = document.getElementById('intro');
const navList = document.querySelector('.nav-list');

function intersectionObserverFn(entries, introObserver) {
    for (let entry of entries) {
        if (!entry.isIntersecting) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

let introObserver = null;

const headerResizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (introObserver) {
            introObserver.unobserve(header);
        }
        const headerHeight = header.getBoundingClientRect().height; 
        const introSectionHeight = introSection.getBoundingClientRect().height;
        const options = {threshold: 1, rootMargin: -headerHeight + 'px 0px ' + introSectionHeight + 'px 0px'};
        introObserver = new IntersectionObserver(intersectionObserverFn, options);
        introObserver.observe(introObserved);
    }
})

headerResizeObserver.observe(navList);
