var express = require('express');
var router = express.Router();
/*
const SECRET = "MY_SECRET_KEY"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ

const bodyParser = require("body-parser");
router.use(bodyParser.json()); //ทำให้รับ json จาก body ได้

//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
   secretOrKey: SECRET,//SECRETเดียวกับตอนencodeในกรณีนี้คือ MY_SECRET_KEY
}
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
   if(payload.sub=== "ball") done(null, true);
   else done(null, false);
});
const passport = require("passport");
passport.use(jwtAuth);
const requireJWTAuth = passport.authenticate("jwt",{session:false});
router.get("/", requireJWTAuth, (req, res) => {
   res.send("ยอดเงินคงเหลือ 50");
});

//////////////////////////////////////////////////////////////////////////////////////

const loginMiddleware = function(req, res, next){
   if(req.body.username == "ball" && 
      req.body.password == "1234") next();
   else res.send("Wrong username and password");
   //ถ้า username password ไม่ตรงให้ส่งว่า Wrong username and password
}

const jwt = require("jwt-simple");
//เพิ่มโค้ดลงไปใน router.post("/login")
router.post("/login", loginMiddleware, function(req, res)  {
   const payload = {
      sub: req.body.username,
      iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
   };
   res.send(jwt.encode(payload, SECRET));
});

*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
