/*jslint browser:true, nomen:true*/
/*global requirejs*/
requirejs(['pouchdb'], function (Pouchdb) {
    'use strict';
    var localDb = new Pouchdb('faterpg'),
        remoteDb = new Pouchdb('https://create.faterpg.nl/db/faterpg'),
        showSection,
        setBatteryManagers,
        startReplicator,
        stopReplicator,
        setting = {
            doc: {
                _id: 'setting'
            }
        },
        elements = {},
        replicator;

    elements.nav = document.querySelector('nav');
    setting.section = document.querySelector('section[data-input="setting"]');

    /*
     * Helper functions
     */
    showSection = function (elm, selector) {
        var oldShow = document.querySelector('#main>section[class~="show"]');

        oldShow.classList.remove('show');
        document.querySelector('nav li[data-section="' + oldShow.id + '"]').dataset.active = 'false';
        elm.classList.add('show');
        selector.dataset.active = 'true';
    };

    /*
     * Setting manipulation
     */
    setting.save = function () {
        var createList;

        createList = function (nodeList) {
            var list = [];
            nodeList.forEach(function (item) {
                list.push(item.value);
            });
            return list;
        };
        setting.doc.name = setting.section.querySelector('input[name="name"]').value;
        setting.doc.scale = setting.section.querySelector('input[name="scale"]').value;
        setting.doc.currentIssues = createList(setting.section.querySelectorAll('input[name="c_issue"]'));
        setting.doc.impendingIssues = createList(setting.section.querySelectorAll('input[name="i_issue"]'));
        setting.doc.aspects = createList(setting.section.querySelectorAll('input[name="aspect"]'));
        localDb.put(setting.doc).then(function (response) {
            setting.doc._rev = response.rev;
        }).catch(function (err) {
            console.error('Error saving setting doc', {err: err, doc: setting.doc, localDb: localDb});
        });
    };

    setting.get = function () {
        localDb.get(setting.doc._id).then(function (doc) {
            setting.doc = doc;
            setting.section.querySelector('input[name="name"]').value = setting.doc.name;
            setting.section.querySelector('input[name="scale"]').value = setting.doc.scale;
        }).catch(function (err) {
            console.error('Error getting settings doc', {err: err, doc: setting.doc, localDb: localDb});
        });
    };

    /*
     * React to user interaction
     */
    elements.nav.addEventListener('click', function (ev) {
        var sectionElm;
        if (ev.target.dataset.section) {
            if (ev.target.dataset.active && ev.target.dataset.active === "true") {
                return;
            }
            sectionElm = document.getElementById(ev.target.dataset.section);
            if (sectionElm) {
                showSection(sectionElm, ev.target);
            }
        }
    });

    setting.section.addEventListener('change', function () {
        setting.save();
    });

    /*
     * Replicator
     */

    startReplicator = function () {
        replicator = Pouchdb.sync(localDb, remoteDb);
    };

    stopReplicator = function () {
        replicator.cancel();
    };

    // **************************************************************************************************
    // Offline usage, this code is situated last to ensure everything is defined
    // **************************************************************************************************
    setBatteryManagers = function (battery) {
        var levelListener,
            fullMode,
            lowMode;

        fullMode = function () {
            battery.addEventListener('levelchange', levelListener);
            if (!replicator || replicator.cancelled) {
                startReplicator();
            }
        };
        lowMode = function () {
            if (!replicator.cancelled) {
                stopReplicator();
            }
            battery.removeEventListener('levelchange', levelListener);
        };
        levelListener = function () {
            if (!battery.charging && battery.level < 0.18) { // battery at 17% or less
                lowMode();
            }
        };

        battery.addEventListener('chargingchange', function () {
            if (battery.charging) {
                fullMode();
            }
        });

        // ** Main **
        if (battery.charging || battery.level >= 0.18) {
            fullMode();
        } else {
            lowMode();
        }
    };

    if (navigator.battery) { // Old battery api
        setBatteryManagers(navigator.battery);
    }

    if (navigator.getBattery) { // new battery api
        navigator.getBattery()
            .then(function (battery) {
                setBatteryManagers(battery);
            });
    }
});
