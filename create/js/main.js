/*jslint browser:true, nomen:true*/
/*global requirejs*/
requirejs(['pouchdb'], function (Pouchdb) {
    'use strict';
    var showSection,
        elements = {};

    elements.nav = document.querySelector('nav');

    /*
     * Helper functions
     */
    showSection = function (elm) {
        document.querySelector('#main>section[class~="show"]').classList.remove('show');
        elm.classList.add('show');
    };

    /*
     * React to user interaction
     */
    elements.nav.addEventListener('click', function (ev) {
        var sectionElm;
        if (ev.target.dataset.section && (ev.target.dataset.active && ev.target.dataset.active !== "true")) {
            sectionElm = document.getElementById(ev.target.dataset.section);
            if (sectionElm) {
                showSection(sectionElm);
            }
        }
    });
});
