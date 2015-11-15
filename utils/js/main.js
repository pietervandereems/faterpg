/*jslint browser:true, nomen:true, devel:true*/
/*global requirejs*/
requirejs(['pouchdb-5.1.0.min'], function (Pouchdb) {
    'use strict';
    var db = new Pouchdb('utils'),
        remoteDb = new Pouchdb('https://utils.faterpg.nl/db/utils', {skip_setup: true}),
        elements = {},
//        sync, // handler for the replication
        getNames,
        startSync;

    // **********************************************************
    // ** Get elements
    // **********************************************************
    elements.options = document.querySelector('#id');
    elements.result = document.querySelector('ul');

    // **********************************************************
    // ** Display Data
    // **********************************************************
    // Display Player information

    // **********************************************************
    // **  Database interaction
    // **********************************************************
    // Get names from the local database
    getNames = function (type) {
        db.get('names').then(function (doc) {
            //var langs;
            console.log(doc);
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
        }).on('change', function (change) {
            console.log('change', {dt: new Date().toISOString(), change: change});
        }).on('paused', function (info) {
            console.log('paused', {dt: new Date().toISOString(), info: info});
        }).on('active', function (info) {
            console.log('active', {dt: new Date().toISOString(), info: info});
        }).on('error', function (err) {
            console.error('Error in Sync (retry is true)', err);
        }).on('completed', function (info) {
            console.log('Sync completed, was replication cancelled?', info);
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
