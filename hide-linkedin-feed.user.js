// ==UserScript==
// @name         Hide LinkedIn Feed
// @description  Hides the main feed
// @author       János Orcsik
// @version      2026.10.09
// @match        https://www.linkedin.com/*
// @grant        none
// @run-at       document-start
// @noframes
// ==/UserScript==

(() => {
    'use strict';

    document.documentElement.appendChild(Object.assign(document.createElement('style'), {
        textContent: `[data-testid="mainFeed"]{display:none!important}`
    }));
})();