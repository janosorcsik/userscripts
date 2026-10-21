// ==UserScript==
// @name         Hide YouTube Recommendations
// @description  Hides the home feed and the recommendations next to the video
// @author       János Orcsik
// @version      2026.10.21
// @updateURL    https://raw.githubusercontent.com/janosorcsik/userscripts/main/hide-youtube-recommendations.user.js
// @downloadURL  https://raw.githubusercontent.com/janosorcsik/userscripts/main/hide-youtube-recommendations.user.js
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
            ytd-watch-flexy #related,
            ytd-watch-flexy:not(:has(ytd-playlist-panel-renderer:not([hidden]), #chat:not([hidden]))) #secondary{display:none!important}
        `
    }));
})();
