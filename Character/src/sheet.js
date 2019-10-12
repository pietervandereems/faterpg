import './style.css';
import PouchDB from 'pouchdb-browser';

const db = new PouchDB('http://localhost:5984/characters');


console.log('sheet.js runs now with characters local database.', db.info());

const getLocal = (() => db.get('localOne')
    .then((doc) => {
        console.log('doc', { doc, arr: Array.from(doc) });
    })
    .catch((err) => {
        if (err.status === 404) {
            db.put({
                _id: 'localOne'
            })
                .then(getLocal());
            return;
        }
        console.error('error getting localOne', err);
    }))();

document.querySelector('body').addEventListener('change', (change) => {
    console.log('change event caught', { id: change.target.id, value: change.target.value });
    db.get('localOne').then((doc) => db.put(Object.assign({}, doc, { [change.target.id]: change.target.value })));
});
