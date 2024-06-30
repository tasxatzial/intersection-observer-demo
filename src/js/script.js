'use strict';

const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const navList = header.querySelector('.nav-list');
const navLinks = header.querySelectorAll('.nav-link');
const toggleNavBtn = header.querySelector('.toggle-nav');
const destinations = document.querySelectorAll('.destination');
const destinationPhotos = document.querySelectorAll('.destination-img');
const destinationBodies = document.querySelectorAll('.destination-body');
const introContent = document.querySelector('.intro-content');
const historyContent = document.querySelector('.history-content');
const destinationsContent = document.querySelector('.destinations-content');
const mqList = window.matchMedia("(min-width: 45em)");
let navShouldBeOpen = false;

// add listeners & create initial observers
(function() {
    if (mqList.addEventListener) {
        mqList.addEventListener('change', toggleNavOnResize);
    } else {
        mqList.addListener(toggleNavOnResize);
    }
    window.addEventListener('click', autoCloseNav);
    if (supportsObservers()) {
        createSectionObservers();
        createDestinationInfoObservers();
        createDestinationPhotoObservers();
    } else {
        //load all photos
        for (let i = 0; i < destinationPhotos.length; i++) {
            destinationPhotos[i].src = destinationPhotos[i].getAttribute('data-src');
            destinationPhotos[i].classList.add('js-loaded-img');
        }

        //slide all text
        for (let i = 0; i < destinationBodies.length; i++) {
            destinationBodies[i].classList.add('js-slide-in');
        }
    }
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', closeNav);
    }
    toggleNavBtn.addEventListener('click', toggleNav);

    /* If we add the h1 observers without waiting for the h1 to finish its slide-in
    transition, the header's background will flash when the page loads. This happens
    because the background color changes based on the position of h1, requiring the h1
    intersection observer to be called multiple times during the slide-in transition.
    To address this, we wait until all h1 transitions have ended before adding its
    observers.*/
    const h1TransitionEndPromise = new Promise(resolve => {
        h1.addEventListener('transitionend', resolve, {once: true})
    });
    window.addEventListener('load', async () => {
        h1.classList.add('js-slide-in');
        if (supportsObservers()) {
            await h1TransitionEndPromise;
            createH1Observers();
        }
    });
})();


function toggleNav() {
    header.classList.toggle('js-nav-open');
    if (header.classList.contains('js-nav-open')) {
        openNav();
    } else {
        closeNav();
    }
}

function openNav() {
    header.classList.add('js-nav-open');
    toggleNavBtn.setAttribute('aria-expanded', 'true');
    header.classList.remove('js-bg-transparent');
    header.classList.remove('box-shadow');
}

function closeNav() {
    header.classList.remove('js-nav-open');
    toggleNavBtn.setAttribute('aria-expanded', 'false');
    if (header.classList.contains('js-above-h1')) {
        header.classList.add('js-bg-transparent');
        header.classList.remove('box-shadow');
    } else {
        header.classList.add('box-shadow');
    }
    navShouldBeOpen = false;
}

/**
 * Called when there's a click anywhere on the window.
 * The menu will close only if the click happens outside the menu & header.
 */
function autoCloseNav(e) {
    if (header.classList.contains('js-nav-open') && !header.contains(e.target)) {
        closeNav();
    }
}

/**
 * When the mobile menu is open and the window width becomes > than the
 * breakpoint for desktops, the menu should close. However, we need to restore
 * its state when the window width becomes < than the breakpoint for desktops.
 */
function toggleNavOnResize() {
    if (mqList.matches && header.classList.contains('js-nav-open')) {
        closeNav();
        navShouldBeOpen = true;
        return;
    }
    if (navShouldBeOpen) {
        openNav();
    }
}

/**
 * Returns true if intersection observer is supported, false otherwise.
 */
function supportsObservers() {
    return 'IntersectionObserver' in window &&
           'IntersectionObserverEntry' in window &&
           'isIntersecting' in window.IntersectionObserverEntry.prototype;
}

/**
 * Creates intersection & resize observers for the h1 element (text in the
 * landing section).
 * 
 * The intersection observer is used for controlling the background color of the
 * navigation menu.
 * 
 * The resize observer is used for detecting when the height of the navigation menu
 * changes. If that's the case, it re-creates the intersection observer.
 */
function createH1Observers() {
    let io = null;
    const navList_RO = new ResizeObserver(create_h1_IO);
    navList_RO.observe(navList);

    /**
     * Resize observer callback
     */
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

    /**
     * Intersection observer callback
     */
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
}

/**
 * Creates an intersection observer for each of the top-level sections. These observers
 * are used for controlling the highlighted menu item.
 */
function createSectionObservers() {
    const options = {
        rootMargin: '-50% 0px -50% 0px'
    };
    const io = new IntersectionObserver(underlineCurrentLink, options);
    io.observe(introContent);
    io.observe(historyContent);
    io.observe(destinationsContent);

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
}

/**
 * Creates an intersection observer for each of the destinations. These observers
 * are used for controlling the slide-in of the text in each destination.
 */
function createDestinationInfoObservers() {
    const options = {
        threshold: .5
    };
    const io = new IntersectionObserver(slideText, options);
    destinations.forEach(function(x, i) {
        io.observe(x);
    });

    function slideText(entries, observer) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                let planetBody = entries[i].target.querySelector('.destination-body');
                planetBody.classList.add('js-slide-in');
                observer.unobserve(entries[i].target);
            }
        }
    }
}

/**
 * Creates an intersection observer for each of the destinations. These observers
 * are used for controlling the loading of the image in each destination.
 */
function createDestinationPhotoObservers() {
    const options = {
        threshold: .8
    };
    const io = new IntersectionObserver(loadPhoto, options);
    destinations.forEach(function(x, i) {
        io.observe(x);
    });

    function loadPhoto(entries, observer) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                let img = entries[i].target.querySelector('img');
                img.src = img.getAttribute('data-src');
                img.classList.add('js-loaded-img');
                observer.unobserve(entries[i].target);
            }
        }
    }
}
