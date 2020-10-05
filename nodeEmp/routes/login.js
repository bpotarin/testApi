var express = require("express");
var router = express.Router();

var mysql = require("mysql");
var mysqlHelper = require("jm-ez-mysql");
var dbCon = require("../config/config.js");

var bodyParser = require("body-parser");
var jwt = require("jwt-simple");
var passport = require("passport");
var ExtractJwt = require("passport-jwt").ExtractJwt;
var JwtStrategy = require("passport-jwt").Strategy;

mysqlHelper.init(dbCon["config"]);

var condb = mysql.createConnection(dbCon["config"]);
condb.connect(function (err) {
  if (err) throw err;
});

router.use(bodyParser.json());

const SECRET = "AGRI_T_KEY_2020"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ

const loginMiddleware = (req, res, next) => {
  //console.log(req.body.loginUser.username);
  var sGetEmp =
    "SELECT id FROM mis_employees WHERE username = '" +
    req.body.loginUser.username +
    "' AND password = '" +
    req.body.loginUser.password +
    "' AND mis_work_status_id = 1";
  //res.send(sGetEmp);
  condb.query(sGetEmp, function (err, result) {
    if (err) throw result;
    if (result.length > 0) {
      //console.log("pass");
      next();
    } else {
      res.send(JSON.stringify("false"));
      //console.log("Wrong username and password");
    }
  });
};

///////////////////////////////////////
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: SECRET, //SECRETเดียวกับตอนencodeในกรณีนี้คือ MY_SECRET_KEY
};
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  if (payload.sub === "supakitp") done(null, true);
  else done(null, false);
});
passport.use(jwtAuth);
const requireJWTAuth = passport.authenticate("jwt", { session: false });
///////////////////////////////////////

//เสียบ middleware ยืนยันตัวตน JWT เข้าไป
router.get("/check", requireJWTAuth, (req, res) => {
  res.send("ยอดเงินคงเหลือ 50");
});

router.post("/", loginMiddleware, (req, res, next) => {
  //console.log(req.body);
  const payload = {
    sub: req.body.loginUser.username,
    iat: new Date().getTime(), //มาจากคำว่า issued at time (สร้างเมื่อ)
  };

  //console.log(JSON.stringify(jwt.encode(payload, SECRET)));
  res.send(JSON.stringify(jwt.encode(payload, SECRET)));

  //res.send("Login success");
});

router.get("/listEmps", function (req, res, next) {
  var sGetEmp =
    "SELECT mis_prenames.name_full_th as prename,fname_th,lname_th,mis_positions.name_th as position," +
    " mis_position_academics.name_th as position_academic," +
    " IFNULL(o2.name_full_th,mis_organizes.name_full_th) as organize,phone_work,photo" +
    " FROM mis_employees INNER JOIN mis_prenames ON mis_prenames.id = mis_employees.mis_prename_id" +
    " INNER JOIN mis_positions ON mis_positions.id = mis_employees.mis_position_id" +
    " INNER JOIN mis_organizes ON mis_organizes.id = mis_employees.mis_organize_id" +
    " LEFT JOIN mis_organizes o2 ON o2.id = mis_organizes.parent AND mis_organizes.id NOT IN (0,40) " +
    " INNER JOIN mis_position_academics ON mis_position_academics.id = mis_employees.mis_position_academic_id" +
    " WHERE mis_work_status_id = 1 ";
  condb.query(sGetEmp, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

router.get("/listEmp/:id", function (req, res, next) {
  condb.query(
    "SELECT * FROM mis_employees WHERE id=" + [req.params.id],
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

module.exports = router;
