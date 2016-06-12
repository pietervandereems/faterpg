/* eslint no-console: ["error", { allow: ["info", "warn", "error"]}] */
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
            newSection;
        for (index = 0; index < noteList.length; index += 1) {
            if (note.name > noteList[index].name) {
                break;
            }
        }
        newSection = document.createElement("section");
        newSection.setAttribute('data-type="show"');
        newSection.classList.add('note');
        newSection.innerHTML = '<h2>' + note.name + '</h2>';
        newSection.innerHTML += '<ul>';
        note.aspects.forEach(function addAspectsToSection (aspect) {
            newSection.innerHTML += '<li>' + aspect + '</li>';
        });
        newSection.innerHTML += '</ul>';
        elements.main.insertBefore(newSection, noteList[index]);
    };

/*
 * React to user interaction
 */

    elements.main.addEventListener('click', function mainClick (ev) {
        if (ev.target.tagName === 'BUTTON') {
            if (ev.target.dataset.action && ev.target.dataset.action === 'push') {
                saveNote(ev.target.parentNode);
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
        change.docs.forEach(addNote);
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
        }
    });

});
