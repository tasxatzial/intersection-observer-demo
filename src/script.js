const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const introSection = document.getElementById('intro');
const navList = document.querySelector('.nav-list');

function changeHeader(entries, introObserver) {
    for (let entry of entries) {
        if (!entry.isIntersecting) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

let h1_IO = null;

const navList_RO = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (h1_IO) {
            h1_IO.unobserve(header);
        }
        const headerHeight = header.getBoundingClientRect().height; 
        const introSectionHeight = introSection.getBoundingClientRect().height;
        const options = {threshold: 1, rootMargin: -headerHeight + 'px 0px ' + introSectionHeight + 'px 0px'};
        h1_IO = new IntersectionObserver(changeHeader, options);
        h1_IO.observe(h1);
    }
})

navList_RO.observe(navList);
