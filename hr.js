module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getHR(res, mysql, context, complete){
        let results = mysql.pool.query("SELECT * FROM hr", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.hr=results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getHR(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            res.render('humanresources', {"tableData": context.hr});
        }
    })
    return router;
} ();