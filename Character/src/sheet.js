import './style.css'
import PouchDB from 'pouchdb-browser'

const db = new PouchDB('http://localhost:5984/characters')

console.log('sheet.js runs now with characters local database.', db.info())

const getLocal = (() => db.get('localOne')
  .then((doc) => {
    console.log('doc', { doc, arr: Array.from(doc) })
  })
  .catch((err) => {
    if (err.status === 404) {
      db.put({
        _id: 'localOne'
      })
        .then(getLocal())
      return
    }
    console.error('error getting localOne', err)
  }))()

const idToSheetvalue = (value) => (id) => id.split(':').reduceRight((acc, item) =>
  (Object.keys(acc).length === 0 ? { [item]: value } : { [item]: acc }), {})

document.querySelector('body').addEventListener('change', (change) => {
  // skill:fair:4, value="Pilot"
  // ['skill','fair','4'] => {skill: {fair: {4: "Pilot"}}}
  db.get('localOne').then((doc) => db.put(Object.assign({}, doc, idToSheetvalue(change.target.value)(change.target.id))))
})
