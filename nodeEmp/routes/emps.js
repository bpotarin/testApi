var mysql = require('mysql');
var mysqlHelper = require('jm-ez-mysql');
var express = require('express');
var router = express.Router();
var dbCon = require('../config/config.js');

mysqlHelper.init(dbCon['config']);

var condb = mysql.createConnection(dbCon['config']);
condb.connect(function(err) {
  if (err) throw err;
});

router.get('/', function(req, res, next) {
  res.send(JSON.stringify(dbCon['config']));
  //res.send('employees');
});

router.get('/listEmps', function (req, res, next) {
    var sGetEmp = "SELECT mis_prenames.name_full_th as prename,fname_th,lname_th,mis_positions.name_th as position,"+
    " mis_position_academics.name_th as position_academic,"+
    " IFNULL(o2.name_full_th,mis_organizes.name_full_th) as organize,phone_work,photo"+
    " FROM mis_employees INNER JOIN mis_prenames ON mis_prenames.id = mis_employees.mis_prename_id"+
    " INNER JOIN mis_positions ON mis_positions.id = mis_employees.mis_position_id"+
    " INNER JOIN mis_organizes ON mis_organizes.id = mis_employees.mis_organize_id"+
    " LEFT JOIN mis_organizes o2 ON o2.id = mis_organizes.parent AND mis_organizes.id NOT IN (0,40) "+
    " INNER JOIN mis_position_academics ON mis_position_academics.id = mis_employees.mis_position_academic_id"+
    " WHERE mis_work_status_id = 1 ";
    condb.query(sGetEmp, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
/*
  condb.query("SELECT * FROM mis_employees ORDER BY id DESC LIMIT 0,10").then(function (result) {
     res.send(JSON.stringify(result));
 })
 */
})

router.get('/listEmp/:id', function (req, res, next) {
    condb.query("SELECT * FROM mis_employees WHERE id="+[req.params.id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    });
  /*
  condb.query("SELECT * FROM mis_employees where id="+[req.params.id]).then(function (result) {
     res.send(JSON.stringify(result));
  })
  */
})


router.get('/addEmp', function (req, res, next) {
  var user = {
     username: "ball2",
     password: "ball2",
     tag_number: "55556",
     id_card: "321323139898"
  };

  mysqlHelper.insert("mis_employees", user).then(function (result) {
     //console.log(result.insertId)
    // user.push(user);
     //res.send(user);
    res.send(JSON.stringify(result.insertId));
  })

})


router.get('/updateEmp', function (req, res, next) {
  var user = {
     username: "ball22",
     password: "ball22",
     tag_number: "55556",
     id_card: "321323139898"
  };

  mysqlHelper.update("mis_employees",user,"id=970" ).then(function (result) {
     //console.log(result.insertId)
    // user.push(user);
     //res.send(user);
    res.send(JSON.stringify(mysqlHelper.lQ));
  })

})


module.exports = router;
