/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
// app.use('/people_certs', require('./people_certs.js'));
// app.use('/people', require('./people.js'));
// app.use('/planets', require('./planets.js'));
app.use('/', express.static('public'));

app.get('/', function(req, res){
  // This will eventually be changed to a fetch to grab data from the database instead of using dummy data
  let data = [{'company_name': 'Code for Money', 'bid': 1, 'cid': 1}]
  res.status(200).render("tabledata", {
    tableData: data
  })
})

app.get('/branch/', function(req, res){
  // This will eventually be changed to a fetch to grab data from the database instead of using dummy data
  let data = [{'branch_id': '1', 'branch_type': 'Company', 'cid': '1'},
              {'branch_id': '2', 'branch_type': 'Human Resources', 'cid': '2'},
              {'branch_id': '3', 'branch_type': 'Marketing', 'cid': '3'},
              {'branch_id': '4', 'branch_type': 'Finance', 'cid': '4'}]
  res.status(200).render("branch",{
    tableData: data
  })
})

// app.get('/contact/', function(req, res){
//   let data = [{'contact_id': 1, 'fst_name': 'Tun', 'lst_name': 'Thaung', 'sex': 'male', 'dob': '2001-05-29', 'phone_number': '1231231234', 'address': 'somewhere in the US', 'email': '@oregonstate.edu', 'bid': '1'}]
//   res.status(200).render("contact", {
//     contact: data
//   })
// })

app.use('/contact/', require('./contact.js'));
app.use('/branch/humanresources/', require('./hr.js'))
// app.get('/branch/humanresources/', function(req, res){
//   let data =[{'employee_id': '1', 'fst_name': 'Alex', 'lst_name': 'Yu', 'bid': '1', 'cid': '1'}]
//   res.status(200).render('humanresources',{
//     tableData: data
//   })
// })

// app.get('/branch/marketing/', function(req, res){
//   let data =[{'employee_id': '1', 'fst_name': 'Alex', 'lst_name': 'Yu', 'bid': '1', 'cid': '1'}]
//   res.status(200).render('marketing', {
//     tableData: data
//   })
// })

app.use('/branch/marketing/', require('./marketing.js'));

// app.get('/branch/finance/', function(req, res){
//   let data =[{'employee_id': '1', 'fst_name': 'Alex', 'lst_name': 'Yu', 'bid': '1', 'cid': '1'}]
//   res.status(200).render('finance', {
//     tableData: data
//   })
// })

app.use('/branch/finance/', require('./finance.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});