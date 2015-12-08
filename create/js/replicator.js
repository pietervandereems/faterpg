define(function () {
    var replTo,
        replFrom,
        dbTo,
        dbFrom,
        remote,
        local,
        start,
        stop;

    start = function (to, from) {
        if (to) {
            dbTo = to;
        }
        if (!dbTo) {
            return('No target pouchdb handler');
        }
        if (from) {
            dbFrom = from;
        }
        if (!dbFrom) {
            return('No source pouchdb handler');
        }
        replTo = dbFrom.replicate.to(dbTo, {live: true, retry: true});
        replFrom = dbFrom.replicate.from(dbFrom, {live: true, retry: true});
    }

});
