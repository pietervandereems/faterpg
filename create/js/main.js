/*jslint browser:true, nomen:true*/
/*global requirejs*/
requirejs(['pouchdb'], function (Pouchdb) {
    'use strict';
    var localDb = new Pouchdb('faterpg'),
        remoteDb = new Pouchdb('https://create.faterpg.nl/db/faterpg'),
        showSection,
        setBatteryManagers,
        replicato
        elements = {},
        replTo,
        replFrom;

    elements.nav = document.querySelector('nav');

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

    replFrom = localDb.replicate.from(remoteDb);
    replTo = localDb.replicate.to(remoteDb);

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
                setMsg('We have power again, starting replication archetypes');
            }
        };
        lowMode = function () {
            if (!replicator.cancelled) {
                replicator.cancel();
            }
            battery.removeEventListener('levelchange', levelListener);
            setMsg('Low battery, halting replication archetypes');
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
});
