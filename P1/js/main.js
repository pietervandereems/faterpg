/* eslint no-console: ["error", { allow: ["warn", "error"]}] */
/*global requirejs*/
requirejs(["pouchdb"], function internal (PouchDB) {
    const localDB = new PouchDB('paddyone'),
        remoteDB = new PouchDB('/db/paddyone'),
        elements = {
            selection: document.querySelector('#selection'),
            generate: document.querySelector('#selection').querySelector('button'),
            result: document.querySelector('#result'),
            lifepath: document.querySelector('#lifepath'),
            traits: document.querySelector('#traits')
        };

    var displayLifepath;

    displayLifepath = function displayLifepath (elm, prop) {

        localDB.get('lifepath')
        .then(function displayLifepathGetThen (doc) {
            var row = document.createElement('tr'),
                inner = elm.querySelector('table');
            
            row.innerHTML = '';
            if (!doc[prop]) {
                console.error('Cannot display lifepath property', {prop: prop, lifepath: doc});
                return;
            }
            if (!Array.isArray(doc[prop])) {
                console.error('Lifepath property is not an Array', {prop: doc[prop]});
                return;
            }
            row.innerHTML += '<td>' + prop + '</td>';
            row.innerHTML += '<td><select>';
            doc[prop].forEach(function displayPropEach (propItem, index) {
                row.innerHTML += '<option data-times="' + (propItem.times || '0') +
                       '" data-item="' + index + '@' + prop + '"' +
                       'data-next="' + propItem.next + '"' +
                       '>' + propItem.text + '</option>';
            });
            row.innerHTML += '</select></td>';
            if (!inner) {
                inner = document.createElement('table');
            }
            inner.appendChild(row);
        })
        .catch(function displayLifepathGetCatch (err) {
            console.error('Error getting lifepath doc to display', err);
        });
    };

/***********************************
 * Events
 ***********************************/
    elements.generate.addEventListener('click', function btnGeneratePush (ev) {
        ev.preventDefault();
        displayLifepath(elements.traits, 'Hair Color');
        displayLifepath(elements.lifepath, 'Money');
    });
    
    elements.result.addEventListener('click', function traitClick (ev) {
        console.log(ev.target);
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
        console.info('active');
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