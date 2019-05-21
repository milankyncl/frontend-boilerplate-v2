
import { FastClick } from 'fastclick';

/**
 * Scroll to function
 *
 * @param element
 * @param duration

function scrollTo(element, duration) {

    let start = document.body.scrollTop,
        change = element.getBoundingClientRect().top,
        currentTime = 0,
        increment = 5;

    let animateScroll = function() {

        currentTime += increment;

        (document.documentElement || document.body.parentNode || document.body).scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);

        console.log(Math.easeInOutQuad(currentTime, start, change, duration));

        if (currentTime < duration)
            setTimeout(animateScroll, increment);

    };

    animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {

    t = t / (d / 2);

    if (t < 1)
        return (c / 2 * t * t) + b;

    t--;

    return -c / 2 * (t * (t - 2) - 1) + b;
};
 */

/**
 * Window document onLoad event
 */

window.addEventListener('DOMContentLoaded', function() {

    /**
     * Fast click
     */

    FastClick.attach(document.body);

    /**
     * Scroll-to

    let elements = document.querySelectorAll('[rel="scroll-to"]');

    Array.prototype.forEach.call(elements, function(el, i) {

        let targetSelector = el.getAttribute('href'),
            targetEl = document.querySelector(targetSelector);

        if (targetEl !== null) {

            el.addEventListener('click', function(e) {

                e.preventDefault();

                scrollTo(targetEl, 500);

            }, false);

        }

    });
     */

}, false);