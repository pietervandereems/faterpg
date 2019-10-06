import './style.css';
import PouchDB from 'pouchdb-browser';

const db = new PouchDB('http://localhost:5984/characters');

console.log('sheet.js runs now with characters local database.', db.info());
