   // Creates an array that lists out all of the available letters.
   var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
       'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
       'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
   ];

   // Creates an array that lists out all of the possible words.
   var possibleWords = ["Mr Meeseeks", "Finn and Jake", "Rick and Morty", "Malcom Reynolds",
       "Michael Scott", "Barney Stinson", "Hobart Washburn", "Obiwan Kenobi", "Sterling Archer",
       "Jack O Neill", "Peter Griffin", "Benjamin Hawkye Pierce", "John Dorian", "Shawn Spencer", 
       "Truman Burbank", "Jeeves and Wooster", "Bruce Wayne", "Steve Rogers", "Tony Stark", "Stephen Strange", "Woody and Buzz", "Wesley and Buttercup", "Scott Pilgrim"
   ]

   // Randomly chooses a word from the array which becomes the word to guess.
   var mysteryWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
   console.log(mysteryWord)

    // Let's start by grabbing a reference to the <span> below.
    var remaining = document.getElementById("triesLeft");

    // Next, we give JavaScript a function to execute when onkeyup event fires.
    document.onkeyup = function (event) {
    remaining.textContent = event.key;
    };

   function change() {
    var image = document.getElementById("hangman");
    image.src = "assets/images/Hangman/2-Hangman-Head.png";
    console.log(image.src);
   }

   // This function is run whenever the user presses a key.
   document.onkeyup = function(event) {
   
   // Determines which key was pressed.
   var userGuess = event.key;
   console.log(userGuess)

 
    }

   //    window.onload = function () {

   //        var categories; // Array of topics
   //        var chosenCategory; // Selected catagory
   //        var getHint; // Word getHint
   //        var word; // Selected word
   //        var guess; // Geuss
   //        var geusses = []; // Stored geusses
   //        var lives; // Lives
   //        var counter; // Count correct geusses
   //        var space; // Number of spaces in word '-'

   // for (var i = 0; i < letters.length; i++) {

   //     // Each time we print the value inside the array.
   //     console.log(arr[i]);
   // }
   // Only run the following code block if the user presses "r" or "p" or "s".
   // if (userGuess.toLowerCase() === ) {

   // Here we create a "Function" that allows us to "call" (run) the loop for any array we wish.
   // We pass in an array as an "argument".
   // function consoleInside(arr) {

   // We then loop through the selected array.


   //     // If we choose paper and the computer guesses scissors, increment our losses variable.
   //     if ((userGuess === "p") && (computerGuess === "s")) {
   //       losses++;
   //     }

   //     // If we choose the same thing as the computer, increment our ties variable.
   //     if (userGuess === computerGuess) {
   //       ties++;
   //     }

   //     if (wins === 5) {
   //       alert("You Win! :) ");
   //       window.location.reload();
   //     }
   //     if (losses === 5) {
   //       alert("You lose. :( ");
   //       window.location.reload();
   //     }

   // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses and wins/losses/ties.
   // var html =
   //     "<h3>You chose: " + userGuess.toUpperCase() + "</h3>" +
   //     "<h3>The computer chose: " + computerGuess.toUpperCase() + "</h3>" +
   //     "<h3>Wins: " + wins + "</h3>" +
   //     "<h3>Losses: " + losses + "</h3>" +
   //     "<h3>Ties: " + ties + "</h3>";

   //     // Set the inner HTML contents of the #game div to our html string
   //     document.querySelector("#score").innerHTML = html;
      //else {
      //      alert("Wrong key. Stop thinking outside the box!");
      //   }