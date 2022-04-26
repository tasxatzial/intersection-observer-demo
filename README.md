# Space destinations website

A simple page demonstrating the use of Intersection and Resize observers. See it live [here](https://tasxatzial.github.io/space-destinations-website).

## Implementation

This project was built with:

* Plain HTML, CSS, Javascript.

### Frontend

* Responsive website (CSS flexbox).
* Mobile first design.
* aria-* attributes for assistive technology.
* No animations for users who turned them off.
* Hamburger menu for mobile.
* Lazy loading of images - only when user scrolls to their position (intersection observer).
* Slide in of text when user scrolls to the last section (intersection observer).
* Automatic underlining of the menu item that corresponds to the current visible section (intersection observer).
* Change of navigation bar background when user scrolls to the main heading (intersection & resize observer).

To get the full experience you'll need:

* Browser support for the intersection observer API.
* Browser support for the resize observer API.
* Browser support for scroll-behavior: smooth
* Animations enabled.

There are also full fallbacks when the APIs are not supported and/or animations are disabled. The page should display and function properly even in IE 11 although it needs just a manual refresh when switching from mobile to desktop view and vise versa.

## Run locally

Download the repo and open 'src/index.html' in your browser.
