module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMarketing (res, mysql, context, complete) {
        let results = mysql.pool.query("SELECT * FROM marketing", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.marketing = results;
            complete();
        });
    }

    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["delete.js", "filter.js", "search.js"];
        var mysql = req.app.get('mysql');
        getMarketing(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            res.render('marketing', {"tableData": context.marketing});
        }
    });
    return router;
} ();