// ==UserScript==
// @name         Google Maps Tab
// @description  Adds a Maps tab to Google search results
// @author       János Orcsik
// @version      2026.10.09
// @match        https://www.google.com/search*
// @match        https://www.google.hu/search*
// @grant        none
// @noframes
// ==/UserScript==

(() => {
    'use strict';

    const run = () => {
        const tabs = document.querySelector('div[role="navigation"] div[role="list"]');
        const q = new URLSearchParams(location.search).get('q');
        if (!tabs || !q) return;

        let mine = tabs.querySelector('.gm-custom');
        if (tabs.querySelector('a[href*="/maps"]:not(.gm-custom a)')) return mine?.remove();

        if (!mine) {
            const links = [...tabs.querySelectorAll('[role="listitem"] a')];
            if (!links.length) return;
            const n = (l) => links.filter((x) => x.className === l.className).length;
            const ref = links.reduce((a, b) => (n(b) > n(a) ? b : a)).closest('[role="listitem"]');

            mine = ref.cloneNode(true);
            mine.classList.add('gm-custom');
            for (const el of [mine, ...mine.querySelectorAll('*')]) {
                ['jsaction', 'ping', 'data-ved'].forEach((x) => el.removeAttribute(x));
            }
            const a = mine.querySelector('a');
            a.target = '_blank';
            a.rel = 'noreferrer';
            a.querySelector('span')?.replaceChildren('Maps');
            ref.after(mine);
        }

        mine.querySelector('a').href = `${location.origin}/maps/search/${encodeURIComponent(q)}`;
    };

    run();
    new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
})();