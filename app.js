
import express from "express";
import bodyParser from"body-parser";
import path from "path";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import 'dotenv/config'
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
//rikam expresu pouzi slozku public picooooo
app.use(express.static(__dirname + '/public'));
//rikam expresu pouzi slozku public picooooo

//cesta k fondum
app.use(express.static(__dirname + '/fonts'));
//cesta k fondum



app.get("/", (req, res) => {
  res.render("home",  { // pokud mam nainstalovany modul EJS tak funguje render... a rika reaguj vyrendruj home.ejs kterou mam uchovanou ve view slozce..
  });


});

app.post("/",function(req, response){
  var yoursubject = "Svatební formulář";
  var yourname = req.body.yourname;
  var youremail = req.body.youremail;
  var yourubytovani = req.body.yourubytovani;
  var yourjidlo = req.body.yourjidlo;
  var yourmessage = req.body.yourmessage;

  console.log(yoursubject + yourname + youremail + yourubytovani + yourjidlo + yourmessage);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD,
    }
  });

  var mailOption = {
    from: process.env.GMAIL_USER,
    to: process.env.EMAIL,
    subject: yoursubject,


    html: `Obdržela jste zprávu od:<br>
    Jméno: ${yourname}<br>
    Email : ${youremail}<br>
    Ubytování: ${yourubytovani}<br>
    Jídlo: ${yourjidlo}<br>
    Zpráva: ${yourmessage}`,
  }
  transporter.sendMail(mailOption, function(error, info){
    if (error){
      console.log(error);
    } else {
      console.log("Email Send: " + info.response);
    }
    response.redirect("/email-odeslan");
  })
});

app.get("/email-odeslan", function(req, res){ // rikam vyhledavaci co das za lomeno tak rendruj about s kontentem about

  res.render("email-odeslan", { // pokud mam nainstalovany modul EJS tak funguje render... a rika reaguj vyrendruj kterou mam uchovanou ve view slozce..

  });

});




app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
