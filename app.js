const express = require('express');
const expressHandlebars = require('express-handlebars');
const fs = require('fs');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const app = express()
// routes
// const guessRoutes = require('./routes/guesses');
// const scoreRoutes = require('./routes/scoreboard');
// const rootRoutes = require('./routes/newGame');


app.engine('handlebars', expressHandlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(
  session({
    secret: 'stuff and things', // this is a password. make it unique
    resave: false, // don't resave the session into memory if it hasn't changed
    saveUninitialized: true // always create a session, even if we're not storing anything in it.
  })
);


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(express.static('public'));

// show a randomWord
//make random word appear for the game
//split or splice? into array
let newWord = words[Math.floor(Math.random() * words.length)];
let newWordSplit = (newWord.toUpperCase()).split("");
//define these outside of the loop
let wordInstance = [];

let newWords = [];

let alreadyGuessed = [];

let turns = 8;

//fixed the commas added to the array by making it a string, splitting and joining
let stringWord = (wordInstance.toString()).split(",").join(" ");
console.log(newWordSplit)
app.get('/', function(req, res){

  for (var i = 0; i < newWordSplit.length; i++) {
    //placeholder
    newWords.push(newWordSplit);
    console.log(newWords)
    wordInstance.push( ' _ ' );
    stringWord = (wordInstance.toString()).split(",").join(" ");
    console.log(stringWord)
  }
   return res.render('home', {stringWord: stringWord,
  wordInstance: wordInstance,
turns: turns})
});

app.post('/', function(req, res){
    let userGuess = req.body.userGuess.toUpperCase()
  //
  req.checkBody('userGuess', 'guess a letter!').notEmpty();
  let errors = req.getValidationResult();
  console.log(errors);


// hanlde errors
  // if (errors) {
  //   return res.send(errors)
  //   } else {
  //   console.log("no error")
  //
  // };



  if (!alreadyGuessed.includes(userGuess)) {
  alreadyGuessed.push(userGuess);
};

    if (newWordSplit.includes(userGuess)){
            for (var i = 0; i < newWordSplit.length; i++) {
        if (newWordSplit[i] === userGuess){
                wordInstance.splice(i, 1, userGuess);
                stringWord = (wordInstance.toString()).split(",").join(" ");
        } else{
          turns = -1;
        }

        console.log(stringWord);
      }
  };
      res.render('home', {
        turns: turns,
        stringWord: stringWord,
        alreadyGuessed: alreadyGuessed,
        wordInstance: wordInstance
    });

});









//use splice here to fix the

//make form and have user input with a post button
//make model to push to array




//get userWord from input
// app.get('/', userGuesses)
// let userGuesses = []
//if it is equal then keep and win or if not then put to another array

//check through the word

//stored in a session

//how to iterate over a word for individual characters


//word.length instead of new array .split or .splice?

//word.length add _ per each


//splice user input and put it into an array of it's own (word array)
//  if input[i] === given[i]


app.listen(3000);
console.log("listening at 3000")
