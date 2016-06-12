/* eslint no-console: ["error", { allow: ["info", "warn", "error"]}] */
/* eslint one-var: off */
/* global requirejs */
requirejs(["pouchdb"], function internal (PouchDB) {
    const localDB = new PouchDB('paddyone'),
        remoteDB = new PouchDB(window.location.protocol + '//' + window.location.hostname + '/db/paddyone');

    var elements = {
            main: document.querySelector('#main'),
            newNote: document.querySelector('section[data-input="new"]')
        },
        replicator,
        // Functions
        handleChanges,
        saveNote;


/*
 * Helper functions
 */
    const findParent = function (node, tags) {
        var found = false;
        if (node.tagName === 'BODY') {
            return false;
        }
        if (!Array.isArray(tags)) {
            tags = [tags];
        }
        tags.forEach(function (tag) {
            if (node.tagName === tag.toUpperCase()) {
                found = true;
            }
        });
        if (found) {
            return node;
        }
        return findParent(node.parentNode, tags);
    };

    const semiRandomId = function  semiRandomId () {
        return Math.floor((1 + Math.random()) * 0x1000000000)
            .toString(16)
            .substring(1);
    };

/*
 * UI Functions
 */
    const addNote = function addNote (note) {
        var noteList = elements.main.querySelectorAll('section[data-type="show"]'),
            index,
            newSection,
            html = '';

        if (note._deleted) {
            return;
        }

        newSection = document.createElement("section");
        newSection.setAttribute('data-type', 'show');
        newSection.setAttribute('data-id', note._id);
        newSection.setAttribute('data-rev', note._rev);
        newSection.classList.add('note');
        html += '<button type="button" data-action="delete">×</button>';
        html += '<h2>' + note.name + '</h2>';
        html += '<ul>';
        note.aspects.forEach(function addAspectsToSection (aspect) {
            html += '<li>' + aspect + '</li>';
        });
        html += '</ul>';
        newSection.innerHTML = html;
        if (noteList.length === 0) {
            elements.main.appendChild(newSection);
        } else {
            for (index = 0; index < noteList.length; index += 1) {
                if (note.name > noteList[index].name) {
                    break;
                }
            }
            elements.main.insertBefore(newSection, noteList[index]);
        }
    };

    const deleteNote = function deleteNote (noteDoc) {
        var toBeDeleted;

        toBeDeleted = elements.main.querySelector('section[data-id="' + noteDoc._id + '"]');
        if (toBeDeleted) {
            toBeDeleted.parentNode.removeChild(toBeDeleted);
        }
    };

    const deleteNoteDoc = function deleteNoteDoc (note) {
        localDB.remove(note.dataset.id, note.dataset.rev)
            .then(function (result) {
                deleteNote(result);
            })
            .catch(function (err) {
                console.error('Error deleting doc', {note: note, err: err});
            });
    };

/*
 * React to user interaction
 */

    elements.main.addEventListener('click', function mainClick (ev) {
        if (ev.target.tagName === 'BUTTON') {
            if (ev.target.dataset.action && ev.target.dataset.action === 'push') {
                saveNote(ev.target.parentNode);
            }
            if (ev.target.dataset.action && ev.target.dataset.action === 'delete') {
                deleteNoteDoc(ev.target.parentNode);
            }
        }
    });

    elements.main.addEventListener('keypress', function keypress (ev) {
        var parentList,
            parentItem,
            newItem,
            newInput;

        if (ev.key && ev.key !== 'Enter') {
            return;
        }
        if (ev.keyCode && (ev.keyCode !== 13 && ev.keyCode !== 10)) {
            return;
        }
        if (ev.which && (ev.which !== 13 && ev.which !== 10)) {
            return;
        }
        if (ev.target.tagName === "TEXTAREA" && !ev.ctrlKey) { // in a text area, only react to ctrl-enter
            return;
        }
        if (ev.target.dataset.repeatable) { // if <enter> was pressed on a repeatable item, clone it and add it to the list
            parentItem = findParent(ev.target, 'LI');
            if (parentItem.nextElementSibling === null) { // We are the last item in the list, so add a new item like this
                parentList = findParent(parentItem, ['OL', 'UL']);
                newItem = parentItem.cloneNode(true);
                newInput = newItem.querySelector('input') || newItem.querySelector('textarea');
                newInput.value = '';
                parentList.appendChild(newItem);
                newInput.focus();
            }
        }
    });

/*
 * Database
 */

    saveNote = function saveNote (element) {
        var doc = {
            aspects: []
        };
        doc._id = 'aspect-' + semiRandomId();
        doc.name = element.querySelector('h2').querySelector('input').value;
        Array.from(element.querySelector('ul').querySelectorAll('input'))
            .forEach(function walkInputs (inputElm) {
                if (inputElm.value === '') {
                    return;
                }
                doc.aspects.push(inputElm.value);
            });
        localDB.put(doc)
            .then()
            .catch(function putCatch (err) {
                console.error('Error saving new note', err);
            });

    };

    handleChanges = function handleChanges (change) {
        console.info('Change to be handled', change);
        change.docs.forEach(function doChanges (doc) {
            if (doc._deleted) {
                deleteNote(doc);
            } else {
                addNote(doc);
            }
        });
    };

    replicator = PouchDB.sync(localDB, remoteDB, {
        live: true,
        retry: true
    }).on('change', function syncChange (info) {
        if (info.direction === 'pull') {
            console.info('Incoming change', info);
            handleChanges(info.change);
        } else {
            console.warn('Other change', info);
            handleChanges(info.change);
        }
    });

    (function getInitial () {
        localDB.allDocs({
            include_docs: true,
            startkey: 'aspect-',
            endkey: 'aspect-\uffff'
        })
        .then(function (docs) {
            docs.rows.forEach(function (row) {
                addNote(row.doc);
            });
        })
        .catch(function (err) {
            console.error('Error with allDocs', err);
        });

    }());
});
