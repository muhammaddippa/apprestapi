//kode javascript ini lebih diperketat, jadi codenya lebih sempurna
'use strict';

exports.ok = function(values, res) {
    var data = {
        'status':200,
        'values':values
    }

    res.json(data);

    res.end();
}