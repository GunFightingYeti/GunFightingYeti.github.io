// Variables
var mysql = require("mysql");
var inquirer = require("inquirer");
var wip = "\nI haven't made this yet...sorry.\n";
var goodbye = "\nThank you for your shopping with Bamazon.  Please come again soon!";
var cart = [wip].join("\n");

console.log("------------------------------------------")
console.log("\nWelcome to the Bamazon marketplace! We have everything from Bay to Zee and at prices that won't cost you a cent.")

// MySQL server connection

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'secret',
//   database: 'bamazon_db'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();

// console.log all available products
var itemsToBuy = [
  "\nItem id	Product name	  Department name	  Price	    Stock_quantity\n",
  " 1      River Boat	  Recreation	          $19,995   	3",
  " 2      Piece of 8	  Toys            	  $10     	27",
  " 3	Pillow	          Décor	                  $14.95    	19",
  " 4     	Lego TM	          Toys	                  $29.95 	11",
  " 5	Lemon Juice       Grocery	          $4.97 	35",
  " 6     	Shot Glass    	  Home	                  $7.99     	8",
  " 7     	Tennis Racket	  Sport	                  $48.75 	12",
  " 8	Pants	          Clothing        	  $99.45    	17",
  " 9     	Xbox TM	          Electronics     	  $274.95   	9",
  " 10    	Yoga Mat          Fitness	          $19.99 	14\n"
].join("\n");

// Inquirer functions
function cartFunc() {
  // console.log("You're in cart()")
  // Cart
  inquirer
    .prompt([{
      type: "confirm",
      message: "Would you like to view your cart?",
      name: "confirm",
      default: true
    }, ])
    .then(function (inquirerResponse) {
      if (inquirerResponse.confirm) {
        // If yes then show cart
        console.log(cart);
        inquirer
          .prompt([{
            type: "confirm",
            message: "Would you like to continue with your purchase?",
            name: "confirm",
            default: true
          }, ])
          .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
              // If yes then show cart
              console.log("All items purchased!");
              inquirer
                .prompt([{
                  type: "confirm",
                  message: "Would you like to keep shopping?",
                  name: "confirm",
                  default: true
                }, ])
                .then(function (inquirerResponse) {
                  if (inquirerResponse.confirm) {
                    // If yes then continue shopping
                    selectItem();

                    // Else, log off
                  } else {
                    console.log(goodbye);
                  }
                });
            }
          });
      } else {
        console.log(goodbye);
      }
    });
}

// Ask if the user is done shopping
function more() {
  // console.log("You're in more()")
  inquirer
    .prompt([
      // Ask the user if they would like to keep shopping
      {
        type: "confirm",
        message: "Would you like to keep shopping?",
        name: "confirm",
        default: true
      },
    ])
    .then(function (inquirerResponse) {
      // If the inquirerResponse confirms, select new item
      if (inquirerResponse.confirm) {
        selectItem();
      } else {
        cartFunc();
      }
    });
}

// Select item and quantity
function selectItem() {
  // console.log("You're in SelectItem()")
  console.log(itemsToBuy);
  inquirer
    .prompt([
      // Ask the user which ID they would like to "add to cart"
      {
        type: "input",
        message: "Please enter the name of the item you wish to purchase:",
        name: "name"
      },
      // Ask how many of that item they would like to purchase
      {
        type: "input",
        message: "How many of that item would you like to purchase?",
        name: "quantity",
        validate: function (value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
            return true;
          }
          return false;
        }
      },
      // Confirm purchase
      {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
      },
    ])
    .then(function (inquirerResponse) {
      // If the inquirerResponse confirms, display the cart and purchase info
      if (inquirerResponse.confirm) {
        console.log("\nYou've added " + inquirerResponse.quantity + " " + inquirerResponse.name + "'s to your cart\n");
        // cart.push(inquirerResponse.quantity + " " + inquirerResponse.name);
        more();

      } else {
        // Else, ask if the user wants to continue
        // console.log("You're in SelectItem/Else")
        inquirer
          .prompt([{
            type: "confirm",
            message: "Would you like to keep shopping?",
            name: "confirm",
            default: true
          }, ])
          .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
              // If yes then continue
              selectItem();

              // Else, cart
            } else {
              cartFunc();
            }
          });
      }
    });
}

selectItem();