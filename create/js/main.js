/*jslint browser:true, nomen:true*/
/*global requirejs*/
requirejs(['pouchdb'], function (Pouchdb) {
    'use strict';
    var elements;

    elements.nav = document.querySelector('nav');

    /*
     * React to user interaction
     */
    elements.nav.addEventListener(function (ev) {
        if (ev.target.dataset.section) {
            console.log(document.getElementById(ev.target.dataset.section));
        }
    });
});
