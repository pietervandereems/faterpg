/*jslint browser:true, nomen:true*/
/*global requirejs*/
requirejs(['pouchdb'], function (Pouchdb) {
    'use strict';
    var elements = {};

    elements.nav = document.querySelector('nav');

    /*
     * React to user interaction
     */
    elements.nav.addEventListener('click', function (ev) {
        var sectionElm;
        if (ev.target.dataset.section) {
            sectionElm = document.getElementById(ev.target.dataset.section);
            console.log(sectionElm);
            if (sectionElm.dataset.active !== "true") {
                console.log('switch please');
            }
        }
    });
});
