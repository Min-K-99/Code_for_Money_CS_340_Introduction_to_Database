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
    });

    // router.post('/', function(req, res){
    //     console.log(req.body);
    //     var mysql = req.app.get('mysql');
    //     var sql = "INSERT INTO contact (fst_name, lst_name, sex, dob, phone_number, address, email, bid) VALUES (?,?,?,?,?,?,?,?)";
    //     var inserts = [req.body.fst_name, req.body.lst_name, req.body.sex, req.body.dob, req.body.phone_number, req.body.address, req.body.email, req.body.bid];
    //     console.log(inserts);
    //     sql = mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error) {
    //             console.log(JSON.stringify(error))
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         else {
    //             res.redirect('/branch/humanresources');
    //         }
    //     });
    // });

    return router;
} ();