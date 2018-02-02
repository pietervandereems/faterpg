/*jslint browser:true, nomen:true, devel:true*/
/*global requirejs*/
requirejs(['pouchdb-6.1.2.min'], function (Pouchdb) {
    'use strict';
    var db = new Pouchdb('utils'),
        remoteDb = new Pouchdb('https://utils.faterpg.nl/db', {skip_setup: true}),
        elements = {},
//        sync, // handler for the replication
        getDocObjects,
        getRandomInt,
        getRandomObject,
        getNames,
        startSync;
    // **********************************************************
    // ** Get elements
    // **********************************************************
    elements.options = document.querySelector('#options');
    elements.result = document.querySelector('ul');

    // **********************************************************
    // ** Utililty functionality
    // **********************************************************
    getDocObjects = function (doc) {
        var clean = [];
        Object.keys(doc).forEach(function (elm) {
            if (elm.substr(0, 1) !== '_') {
                clean.push(doc[elm]);
            }
        });
        return clean;
    };

    getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    getRandomObject = function (obj) {
        var keys = Object.keys(obj);
        return obj[keys[getRandomInt(0, keys.length - 1)]];
    };
    // **********************************************************
    // ** Display Data
    // **********************************************************
    // Display Player information

    // **********************************************************
    // **  Database interaction
    // **********************************************************
    // Get names from the local database
    getNames = function (typeU) {
        var type = typeU.toLowerCase();
        db.get('names').then(function (doc) {
            var langs = getDocObjects(doc),
                fnLang = langs[getRandomInt(0, langs.length - 1)],
                lnLang = langs[getRandomInt(0, langs.length - 1)].lastnames,
                li = document.createElement('li'),
                firstnameList;
            firstnameList = fnLang.firstnames[type] || getRandomObject(fnLang.firstnames);
            li.innerHTML = (firstnameList[getRandomInt(0, firstnameList.length - 1)]) + ' ' + lnLang[getRandomInt(0, lnLang.length - 1)];
            elements.result.appendChild(li);
        }).catch(function (err) {
            console.error('Error getting names', err);
        });
    };

    // **********************************************************
    // **  Database replication
    // **********************************************************
    // Synchronise (master-master replication)
    startSync = function () {
        db.sync(remoteDb, {
            live: true,
            retry: true
        }).on('error', function (err) {
            console.error('Error in Sync (retry is true)', err);
        });
    };

    // **********************************************************
    // **  UI Events
    // **********************************************************
    // Generate pushed
    elements.options.addEventListener('click', function (ev) {
        if (ev.target.nodeName === 'BUTTON') {
            getNames(ev.target.value);
        }
    });

    // **********************************************************
    // **  MAIN
    // **********************************************************
    startSync();

});
