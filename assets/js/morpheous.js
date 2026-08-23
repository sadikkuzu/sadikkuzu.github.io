/*
 * Matrix-style reveal for the page heading: the name starts scrambled and
 * locks into place one character at a time, left to right.
 */
(function () {
    "use strict";

    var NAME = "SADIK KUZU";
    var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // scramble: how often the unresolved characters are redrawn
    // reveal:   how often one more character locks into place
    var INTRO = { scramble: 20, reveal: 200 };
    var HOVER = { scramble: 20, reveal: 300 };

    var el = document.getElementById("morpheous");
    if (!el) {
        return;
    }

    var frame = null;

    function motionAllowed() {
        return !window.matchMedia ||
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function randomChar() {
        return CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }

    // Spaces are left alone so the word break stays visible while scrambling.
    function scramble(locked) {
        var out = NAME.slice(0, locked);
        for (var i = locked; i < NAME.length; i++) {
            out += NAME.charAt(i) === " " ? " " : randomChar();
        }
        return out;
    }

    function stop() {
        if (frame !== null) {
            window.cancelAnimationFrame(frame);
            frame = null;
        }
    }

    function run(timing) {
        stop();

        if (!motionAllowed()) {
            el.textContent = NAME;
            return;
        }

        var locked = 0;
        var lastScramble = null;
        var lastReveal = null;

        function step(now) {
            if (lastReveal === null) {
                lastScramble = now;
                lastReveal = now;
            }

            if (now - lastReveal >= timing.reveal) {
                locked++;
                lastReveal = now;
            }

            if (locked >= NAME.length) {
                el.textContent = NAME;
                frame = null;
                return;
            }

            if (now - lastScramble >= timing.scramble) {
                el.textContent = scramble(locked);
                lastScramble = now;
            }

            frame = window.requestAnimationFrame(step);
        }

        frame = window.requestAnimationFrame(step);
    }

    el.addEventListener("mouseenter", function () {
        run(HOVER);
    });

    el.addEventListener("mouseleave", function () {
        stop();
        el.textContent = NAME;
    });

    run(INTRO);
}());
