/* eslint no-console: ["error", { allow: ["info", "warn", "error"]}] */
/* eslint one-var: off */
/* global requirejs */
requirejs(["pouchdb"], (PouchDB) => {
    const localDB = new PouchDB('paddyone'),
        remoteDB = new PouchDB(window.location.protocol + '//' + window.location.hostname + '/db'),
        gmMode = (document.querySelector('title').textContent.substr(-2) === 'GM');

    const elements = {
        main: document.querySelector('#main'),
        newNote: document.querySelector('section[data-input="new"]')
    };

    /*
     * Helper functions
     */
    const findParent = (node, tags) => {
        let found = false;
        if (node.tagName === 'BODY') {
            return false;
        }
        if (!Array.isArray(tags)) {
            tags = [tags];
        }
        tags.forEach((tag) => {
            if (node.tagName === tag.toUpperCase()) {
                found = true;
            }
        });
        if (found) {
            return node;
        }
        return findParent(node.parentNode, tags);
    };

    const semiRandomId = () => Math.floor((1 + Math.random()) * 0x1000000000)
        .toString(16)
        .substring(1);

    /*
     * UI Functions
     */
    const addNote = (note) => {
        const noteList = elements.main.querySelectorAll('section[data-type="show"]');

        let index,
            html = '';

        if (note._deleted) {
            return;
        }
        const section = document.querySelector(`[data-id=${note._id}]`) || document.createElement("section");
        if (!gmMode && !note.pcVisible) {
            if (section.parentNode) {
                section.parentNode.removeChild(section);
            }
            return;
        }

        section.setAttribute('data-type', 'show');
        section.setAttribute('data-id', note._id);
        section.setAttribute('data-rev', note._rev);
        section.setAttribute('data-name', note.name);
        section.classList.add('note');
        html += '<h2>';
        if (gmMode) {
            const pcAction = (note.pcVisible) ? 'pcDisable' : 'pcEnable';
            html += '<button type="button" data-action="' + pcAction + '">u</button>';
            html += '<button type="button" data-action="delete">x</button>';
        }
        html += note.name + '</h2>';
        html += '<ul>';
        note.aspects.forEach((aspect) => {
            html += '<li>' + aspect + '</li>';
        });
        html += '</ul>';
        section.innerHTML = html;
        if (section.parentNode) {
            section.parentNode.replaceChild(section);
            return;
        }
        if (noteList.length === 0) {
            elements.main.appendChild(section);
        } else {
            for (index = 0; index < noteList.length; index += 1) {
                if (note.name < noteList[index].dataset.name) {
                    break;
                }
            }
            elements.main.insertBefore(section, noteList[index]);
        }
    };

    const deleteNote = (noteDoc) => {
        const toBeDeleted = elements.main.querySelector('section[data-id="' + noteDoc._id + '"]');
        if (toBeDeleted) {
            toBeDeleted.parentNode.removeChild(toBeDeleted);
        }
    };

    const deleteNoteDoc = (note) => {
        localDB.remove(note.dataset.id, note.dataset.rev)
            .then((result) => deleteNote(result))
            .catch((err) => console.error('Error deleting doc', { note: note, err: err }));
    };


    /*
     * Database
     */

    const saveNote = (element) => {
        const doc = {
            aspects: []
        };
        doc._id = 'aspect-' + semiRandomId();
        doc.name = element.querySelector('h2').querySelector('input').value;
        Array.from(element.querySelector('ul').querySelectorAll('input'))
            .forEach((inputElm) => {
                if (inputElm.value === '') {
                    return;
                }
                doc.aspects.push(inputElm.value);
            });
        localDB.put(doc)
            .then()
            .catch((err) => console.error('Error saving new note', err));

    };

    const togglePCVisible = (note, visible) => {
        localDB.get(note.dataset.id)
            .then((doc) => {
                doc.pcVisible = visible;
                localDB.put(doc)
                    .then(() => {
                        note.dataset.action = (visible) ? 'pcEnable' : 'pcDisable';
                    })
                    .catch((err) => console.error('Error saving note for togglePCVisible', { doc: doc, note: note, visible: visible, err: err }));
            })
            .catch((err) => console.error('Error getting note for togglePCVisible', { note: note, visible: visible, err: err }));
    };

    const handleChanges = (change) => {
        console.info('Change to be handled', change);
        change.docs.forEach((doc) => {
            if (doc._deleted) {
                deleteNote(doc);
            } else {
                addNote(doc);
            }
        });
    };

    /*
    * MAIN
    */
    PouchDB.sync(localDB, remoteDB, {
        live: true,
        retry: true
    }).on('change', (info) => {
        if (info.direction === 'pull') {
            console.info('Incoming change', info);
            handleChanges(info.change);
        } else {
            console.warn('Other change', info);
            handleChanges(info.change);
        }
    });

    (() => {
        localDB.allDocs({
            include_docs: true,
            startkey: 'aspect-',
            endkey: 'aspect-\uffff'
        })
            .then((docs) => {
                docs.rows.forEach((row) => addNote(row.doc));
            })
            .catch((err) => console.error('Error with allDocs', err));

    })();

    /*
     * React to user interaction
     */

    elements.main.addEventListener('click', (ev) => {
        if (ev.target.tagName === 'BUTTON') {
            if (!ev.target.dataset.action) {
                return;
            }
            switch (ev.target.dataset.action) {
            case 'push':
                saveNote(ev.target.parentNode);
                break;
            case 'delete':
                deleteNoteDoc(ev.target.parentNode.parentNode);
                break;
            case 'pcEnable':
                togglePCVisible(ev.target.parentNode.parentNode, true);
                break;
            case 'pcDisable':
                togglePCVisible(ev.target.parentNode.parentNode, false);
                break;
            }
        }
    });

    elements.main.addEventListener('keypress', (ev) => {
        let parentList,
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

});
