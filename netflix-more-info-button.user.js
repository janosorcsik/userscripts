// ==UserScript==
// @name         Netflix More Info Button
// @description  Adds a More Info link to the cards under More Like This and Collections
// @author       János Orcsik
// @version      2026.10.09
// @match        https://www.netflix.com/*
// @grant        none
// @noframes
// ==/UserScript==

(() => {
    'use strict';

    const CSS = 'display:inline-block;text-decoration:none;background:rgba(109,109,110,.7);border-radius:4px;font-size:.8em;font-weight:bold;padding:.8rem 2.4rem .8rem 2rem;margin:0 1em 1em;cursor:pointer;color:white';
    const CARDS = ':is(.detail-modal-container,.detail-modal) .titleCard--container:not(:has(.nre-btn)) .titleCard--metadataWrapper:has(.ptrack-content[data-ui-tracking-context])';

    // Keeps the card's own handlers from reacting to the button.
    for (const t of ['pointerdown', 'mousedown', 'click']) {
        document.addEventListener(t, (e) => e.target.closest('.nre-btn') && e.stopPropagation(), true);
    }

    const run = () => {
        for (const meta of document.querySelectorAll(CARDS)) {
            const ctx = meta.querySelector('.ptrack-content[data-ui-tracking-context]').dataset.uiTrackingContext;
            const btn = Object.assign(document.createElement('a'), {
                textContent: 'More Info',
                className: 'color-secondary hasLabel nre-btn',
                href: `/title/${JSON.parse(decodeURIComponent(ctx)).video_id}`,
                target: '_blank',
            });
            btn.style.cssText = CSS; // CSSOM, not blocked by style-src CSP
            const s = meta.querySelector('.titleCard-synopsis');
            s ? s.before(btn) : meta.append(btn);
        }
    };

    run();
    let tid;
    new MutationObserver(() => {
        clearTimeout(tid);
        tid = setTimeout(run, 100);
    }).observe(document.body, { childList: true, subtree: true });
})();