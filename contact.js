module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // This fetches the info from the database
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

    // This displays the database info
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscript = ["deletePerson.js"];
        // context.jsscripts = ["delete.js", "filter.js", "search.js"];
        var mysql = req.app.get('mysql');
        getContact(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            res.render('contact', {"contact": context.contacts});
        }
    });
    
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM contact WHERE ID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }
            else{
                res.status(202).end();
            }
        })
    })

    return router;
} ();