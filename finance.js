module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getFinance (res, mysql, context, complete) {
        let results = mysql.pool.query("SELECT * FROM finance", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.finance = results;
            complete();
        });
    }

    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["delete.js", "filter.js", "search.js"];
        var mysql = req.app.get('mysql');
        getFinance(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            res.render('finance', {"tableData": context.finance});
        }
    });
    return router;
} ();