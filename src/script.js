const header = document.querySelector('header');
const introObserved = document.getElementById('intro-observed');

function intersectionObserverFn(entries, introObserver) {
    for (let entry of entries) {
        if (!entry.isIntersecting) {
            ;
        } else {
            ;
        }
    }
}

let introObserver = null;

const headerResizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (introObserver) {
            introObserver.unobserve(header);
        }
        const headerHeight = entry.contentRect.top + entry.contentRect.bottom;
        const options = {threshold: 1, rootMargin: -headerHeight + "px 0px 0px 0px"};
        introObserver = new IntersectionObserver(intersectionObserverFn, options);
        introObserver.observe(introObserved);
    }
})

headerResizeObserver.observe(header);
