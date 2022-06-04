module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getContact (res, mysql, context, complete) {
        let results = mysql.pool.query("SELECT * FROM contact", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.contacts = results;
            complete();
        });
    }

    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["delete.js", "filter.js", "search.js"];
        var mysql = req.app.get('mysql');
        getContact(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            res.render('contact', {"contact": context.contacts});
        }
    });
    return router;
} ();