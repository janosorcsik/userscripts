// ==UserScript==
// @name         Hide YouTube Recommendations
// @description  Hides the home feed and the recommendations next to the video
// @author       János Orcsik
// @version      2026.10.09
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

(() => {
    'use strict';

    document.documentElement.appendChild(Object.assign(document.createElement('style'), {
        textContent: `
            ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,
            ytd-watch-flexy #secondary{display:none!important}
        `
    }));
})();