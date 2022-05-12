# Space destinations website

A simple page demonstrating the use of Intersection and Resize observers. See it live [here](https://tasxatzial.github.io/space-destinations-website).

## Implementation

This project uses:

* Plain HTML, CSS, Javascript.
* [:focus-visible polyfill](https://github.com/WICG/focus-visible).

### Frontend

* Responsive website (CSS flexbox).
* Mobile first design.
* aria-* attributes for assistive technology.
* No animations for users who turned them off.
* Hamburger menu for mobile.
* Lazy loading of images (intersection observer).
* Slide in of text when user scrolls to the last section (intersection observer).
* Automatic underlining of the menu item that corresponds to the current visible section (intersection observer).
* Change of the navigation bar background when user scrolls to the main heading (intersection & resize observer).

## Run locally

Download the repo and open 'src/index.html' in your browser.
