// ==UserScript==
// @name         nCore Fixes
// @description  Shows full images and full titles, makes search use GET, hides banners and extra boxes
// @author       János Orcsik
// @version      2026.10.09
// @match        https://ncore.pro/*
// @grant        none
// @noframes
// ==/UserScript==

(() => {
    'use strict';

    document.head.appendChild(Object.assign(document.createElement('style'), {
        textContent: `
            .box_alcimek_all .box_alap:nth-child(n+5 of .box_alap),
            .box_alcimek_all .box_alap_utolso,
            .box_feltolto,.box_feltolto2,
            .box_d,.box_d2,.box_l,.box_l2,.box_s,.box_s2,
            .lista_fej,.lista_fej_b,.lista_fej_t,.banner{display:none!important}
            .box_torrent_all .box_nev,.box_torrent_all .box_nev2{width:665px}
            .box_alap{margin:0}
            .alcim .box_nev{width:652px}
            .torrent_txt nobr{width:565px;overflow:hidden;display:block;text-overflow:ellipsis}
            .torrent_kep_ico2{height:auto!important;width:auto!important}
            .fancy_groups img.bn-full{height:auto!important;width:auto!important;max-width:280px!important;max-height:500px!important}
        `
    }));

    document.getElementById('kereses_mezo')?.setAttribute('method', 'get');

    const process = () => {
        for (const img of document.querySelectorAll('a.fancy_groups img.attached_link:not([data-p])')) {
            img.dataset.p = '1';
            const href = img.closest('a').href;
            img.referrerPolicy = 'no-referrer';
            img.loading = 'lazy';
            img.src = href;
            img.classList.add('bn-full');
        }
        for (const nobr of document.querySelectorAll('.torrent_txt nobr:not([data-p])')) {
            nobr.dataset.p = '1';
            const title = nobr.closest('a')?.title;
            if (title) {
                nobr.textContent = title;
            }
        }
    };

    process();

    let tid;
    new MutationObserver(() => {
        clearTimeout(tid);
        tid = setTimeout(process, 100);
    }).observe(document.body, { childList: true, subtree: true });
})();