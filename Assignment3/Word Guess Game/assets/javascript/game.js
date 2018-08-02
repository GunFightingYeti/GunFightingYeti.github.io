      // Creates an array that lists out all of the possible fictional characters.
      var characters = ["Mr Meeseeks", "Finn and Jake", "Rick and Morty", "Malcom Reynolds",
          "Michael Scott", "Barney Stinson", "Hobart Washburn", "Obiwan Kenobi", "Sterling Archer",
          "Jack O Neill", "Peter Griffin", "Benjamin Hawkye Pierce", "John Dorian", "Shawn Spencer",
          "Truman Burbank", "Jeeves and Wooster", "Bruce Wayne", "Steve Rogers", "Tony Stark", "Stephen Strange",
          "Woody and Buzz", "Wesley and Buttercup", "Scott Pilgrim", 'Han Solo', "Wade Wilson", "Peter Quill"
      ]
      //Array to check if key pressed is a letter
      var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
          'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
          'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
      ]

      // Randomly chooses a word from the array which becomes the word to guess.
      var word = document.getElementById("word");
      var mysteryWord = characters[Math.floor(Math.random() * characters.length)];
      word.innerHTML = mysteryWord;
      console.log(mysteryWord);

      // Displays letters already guessed
      var guessedArray = []

      var guessed = document.getElementById("guessed");
      var t = 0;
      document.onkeyup = function (event) {
          var userInput = event.key.toUpperCase();
          guessedArray.push(" " + userInput);
          guessed.innerHTML = guessedArray;

          var countDown = ["7 tries", "6 tries", "5 tries", "4 tries", "3 tries", "2 tries", "1 try"];
          var triesLeft = document.getElementById("triesLeft");
          triesLeft.innerHTML = countDown[t];
          if (t < 7) {
            t++;
          }
           
      }

      //Change hangman image
      var i = 0;
      function change() {
          var hangman = document.getElementById("hangman");
          var imageArray = ["assets/images/Hangman/2-Hangman-Head.png", "assets/images/Hangman/3-Hangman-Backbone.png", "assets/images/Hangman/4-Hangman-LeftArm.png", "assets/images/Hangman/5-Hangman-RightArm.png", "assets/images/Hangman/6-Hangman-LeftLeg.png", "assets/images/Hangman/7-Hangman-RightLeg.png", "assets/images/Hangman/8-Hangman-GameOver.png"]
          hangman.src = imageArray[i];
          i++;
      }