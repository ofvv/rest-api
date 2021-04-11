// <--------------------------------> VARIABLES
var express = require("express");
var app = express();
const ms = require("ms");
var path = require("path");
var bodyParser = require("body-parser")
const moment = require("moment")
const fetch = require("node-fetch")
const axios = require("axios")
const cheerio = require("cheerio");
const figlet = require("figlet");

// <--------------------------------> VARIABLES

// <--------------------------------> EJS VIEW ENGINE

app.use(bodyParser.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs")
app.use(express.static("public"));

// <--------------------------------> EJS VIEW ENGINE

let port = process.env.PORT || 8080; // PORT

// <--------------------------------> ENDPOINTS
 
const Endpoints = [`/date`, `/yearpercent`, `/8ball`];

app.get(`/endpoints`, async function (req, res) {
  res.status(200).send({ endpoints: Endpoints })
})

// <--------------------------------> ENDPOINTS

// <--------------------------------> MAIN

app.get(`/date`, function (req, res) {
  res.send({
    hours: `${moment(Date.now()).format('LT')}`,
    date: `${moment(Date.now()).format('LL LTS')}`,
    ddmmyyyy: `${moment(Date.now()).format('DD/MM/YYYY')}`,
    dd: `${moment(Date.now()).format('DD')}`,
    mm: `${moment(Date.now()).format('MM')}`,
    yyyy: `${moment(Date.now()).format('YYYY')}`,
    day: `${moment(Date.now()).format('ddd')}`,
    pmnam: `${moment(Date.now()).format('hA')}`,
    yy: `${moment(Date.now()).format('YY')}`,
    weaky: `${moment(Date.now()).format('gg')}`,
    minute: `${moment(Date.now()).format('m')}`,
    second: `${moment(Date.now()).format('s')}`,
    ms: `${moment(Date.now()).format('s') * 1000}`,
    eyear: `${moment(Date.now()).format('y')}`,
    ddofww: `${moment(Date.now()).format('dddd')}`,
    wwofyy: `${moment(Date.now()).format('w')}`
  })
})

app.get(`/8ball`, function (req, res) {
  let host = app.get("host") || `localhost:${port}`
  const answers = [
    "Yes.",
    "No.",
    "Most likely.",
    "I Don't Know!",
    "Definitely",
    "Absolutely",
    "No Way!",
    "As I see it, yes."
]

const fanswer = answers[Math.floor(Math.random() * answers.length)];

let question = req.query.question || req.query.q
if (!question) {
  res.send({
   answer: `What Do You Want To Ask?`,
   question: `You Didn't Ask Me a Question!`,
   example: `${host}/8ball?q=should i code a web api?`
  })
} else if (question) {
  res.send({
    answer: fanswer,
    question: question
  })
}
})

app.get(`/yearpercent`, function (req, res) {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 1);
  const end = new Date(today.getFullYear() + 1, 0, 1);
  const percent = Math.round((Math.abs(today - start) / Math.abs(end - start)) * 100)
  res.send({
    completed: `${percent}`,
    completedp: percent + "%",
    completedper: percent + " Percent"
  })
})

app.get("/", async function (req, res) {
  res.redirect("/endpoints")
})

// <--------------------------------> MAIN

// <--------------------------------> ERR HANDLER

app.use(function (err, req, res, next) {
  var host = req.get('host') || `localhost:${port}`;
  console.log(err.stack)
  res.status(500).send(`${host}${req.originalUrl} Created an Error On Our Server!`)
})

app.use(function (req, res, next) {
  res.status(404).redirect("/")
})

// <--------------------------------> ERR HANDLER

// <--------------------------------> CONSOLE LOGS
let qkconsolelog = `                        
 ▀█ █ █▀█ █▀█ █▀▀ █▀█ █▀█ █▀▀
 █▄ █ █▀▄ █▄█ █▄▄ █▄█ █▀▄ ██▄
 `

let lengthlog = `<-------------------------------->`

var listeners = app.listen(port, async function () {
  let host = app.get("host") || `localhost:${port}` // I Can't Get The Host In app.listen :(
  let consolelogs = [
  lengthlog,
  qkconsolelog,
  lengthlog,
  "Listening On Port: " + listeners.address().port,
  "Host: " + host,
  `Endpoints: ` + host + `/endpoints`,
  `Available Endpoints:\n` + host + `${Endpoints.join(`\n${host}`)}`,
  lengthlog
]
  for (let log of consolelogs) {
    console.log(log)
  }
});
// <--------------------------------> CONSOLE LOGS
