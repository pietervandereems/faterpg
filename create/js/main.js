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
    showSection = function (elm, selector) {
        var oldShow = document.querySelector('#main>section[class~="show"]');

        oldShow.classList.remove('show');
        document.querySelector('nav li[data-section="' + oldShow.id + '"]').dataset.active = 'false';
        elm.classList.add('show');
        selector.dataset.active = 'true';
    };

    /*
     * React to user interaction
     */
    elements.nav.addEventListener('click', function (ev) {
        var sectionElm;
        if (ev.target.dataset.section) {
            if (ev.target.dataset.active && ev.target.dataset.active === "true") {
                return;
            }
            sectionElm = document.getElementById(ev.target.dataset.section);
            if (sectionElm) {
                showSection(sectionElm, ev.target);
            }
        }
    });
});
