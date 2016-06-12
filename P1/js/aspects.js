/* eslint no-console: ["error", { allow: ["warn", "error"]}] */
/* global requirejs */
requirejs(["pouchdb"], function internal (PouchDB) {
    const localDB = new PouchDB('paddyone'),
        remoteDB = new PouchDB(window.location.protocol + '//' + window.location.hostname + '/db/paddyone');
});
