const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const navList = document.querySelector('.nav-list');

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
