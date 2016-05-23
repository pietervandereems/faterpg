/* eslint no-console: ["error", { allow: ["warn", "error"]}] */
/*global requirejs*/
requirejs(["pouchdb"], function internal (PouchDB) {
    const localDB = new PouchDB('paddyone'),
        remoteDB = new PouchDB('/db/paddyone'),
        elements = {
            selection: document.querySelector('#selection'),
            generate: document.querySelector('#selection').querySelector('button'),
            result: document.querySelector('#result'),
            lifepath: document.querySelector('#lifepath')
        };

    var generateLifepath;

    generateLifepath = function generateLifepath (start, elm) {
        localDB.get('lifepath')
        .lifepathThen(function lifepathThen (doc) {
            var follow;

            follow = function follow(from) {
                
            };

            if (!doc[start]) {
                console.error('Cannot go to start in lifepath', {start: start, lifepath: doc});
                return;
            }
            follow(start);
        })
        .catch(function lifepathErr (err) {
            console.error('Error getting lifepath', err);
        });
    };

/***********************************
 * Events
 ***********************************/
    elements.generate.addEventListener('click', function btnGeneratePush (ev) {
        ev.preventDefault();
        generateLifepath('Hair Color', document.getElementById('traits'));
        generateLifepath('Money', document.getElementById('lifepath'));
    });

/***********************************
 * Replicator
 ***********************************/

    const replicator = localDB.sync(remoteDB, {
        live: true,
        retry: true
    })
    .on('paused', function replPaused (err) {
        console.info('paused');
        if (err) {
            console.error('Replicator paused on error', err);
        }
    })
    .on('change', function replChange (info) {
    // handle change
        console.info('change', info);
    })
    .on('active', function replActive () {
        console.info('active', info);
    // replicate resumed (e.g. new changes replicating, user went back online)
    })
    .on('denied', function replDenied (err) {
    // a document failed to replicate (e.g. due to permissions)
        console.error('Replication denied', err);
    })
    .on('complete', function replComplete (info) {
        console.info('complete', info);
    // handle complete
    })
    .on('error', function replError (err) {
        console.error('Replication Error', err);
    // handle error
    });
});
