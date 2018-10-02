// Variables
var mysql = require("mysql");
var inquirer = require("inquirer");

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
" 4     	Legos TM	  Toys	                  $29.95 	11",
" 5	Lemon Juice       Grocery	          $4.97 	35",
" 6     	Shot Glass    	  Home	                  $7.99     	8",
" 7     	Tennis Racket	  Sport	                  $48.75 	12",
" 8	Pants	          Clothing        	  $99.45    	17",
" 9     	Xbox TM	          Electronics     	  $274.95   	9",
" 10    	Yoga Mat         Fitness	          $19.99 	14\n"
].join("\n");

// Inquirer functions
// Ask if the user is done shopping
function more() {
  inquirer
  .prompt([
    // Ask the user if they would like to keep shopping
    {
      type: "confirm",
      message: "Would you like to keep shopping?",
      name: "confirm",
      default: false
    },
  ])
  .then(function (inquirerResponse) {
    // If the inquirerResponse confirms, select new item
    selectItem();
  });
}

// Select item and quantity
function selectItem() {
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
        name: "quantity"
      },
      // Confirm purchase
      {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: false
      },

    ])
    .then(function (inquirerResponse) {
      // If the inquirerResponse confirms, display the cart and purchase info
      console.log("\n"+ inquirerResponse.quantity + " " + inquirerResponse.name + "'s added to cart\n");
      more();
    });
}

selectItem();
