      // Creates an array that lists out all of the possible fictional characters.
      var characters = ["Mr Meeseeks", "Finn and Jake", "Rick and Morty", "Malcom Reynolds",
          "Michael Scott", "Barney Stinson", "Hobart Washburn", "Obiwan Kenobi", "Sterling Archer",
          "Jack O Neill", "Peter Griffin", "Benjamin Hawkye Pierce", "John Dorian", "Shawn Spencer",
          "Truman Burbank", "Jeeves and Wooster", "Bruce Wayne", "Steve Rogers", "Tony Stark", "Stephen Strange",
          "Woody and Buzz", "Wesley and Buttercup", "Scott Pilgrim", 'Han Solo', "Wade Wilson", "Peter Quill"]
          
      // Randomly chooses a word from the array which becomes the word to guess.
      var word = document.getElementById("word");
      var mysteryWord = characters[Math.floor(Math.random() * characters.length)];
      word.innerHTML = mysteryWord;
      console.log(mysteryWord);

      // Displays letters already guessed
      var guessed = document.getElementById("guessed");
      document.onkeyup = function (event) {
          var userInput = event.key.toUpperCase()
          guessed.innerHTML = userInput
      }

      //Change hangman image
      function change() {
          var image = document.getElementById("hangman");
          image.src = "assets/images/Hangman/2-Hangman-Head.png";
      }