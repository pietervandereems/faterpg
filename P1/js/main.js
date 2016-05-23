/* eslint no-console: ["error", { allow: ["warn", "error"]}] */
/*global requirejs*/
requirejs(["pouchdb"], function internal (PouchDB) {
    const localDB = new PouchDB('paddyone'),
        remoteDB = new PouchDB('/db/paddyone');



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
