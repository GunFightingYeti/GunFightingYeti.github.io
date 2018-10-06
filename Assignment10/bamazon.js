// Variables
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");

var wip = "\nI haven't made this yet...sorry.\n";
var goodbye = "\nThank you for your shopping with Bamazon.  Please come again soon!";
var cart = [wip].join("\n");

console.log("------------------------------------------");
console.log("\nWelcome to the Bamazon marketplace!");

// MySQL server connection
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: keys.mysql.password,
  database: 'bamazon_db'
});

connection.connect(function (err) {
  if (err) throw err;
});

// Show all items then begin purchase process
function showAll(callback) {
  console.log("\n");
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | Name: " + res[i].product_name + " | Price: $" + res[i].price + " | Amount in stock: " + res[i].stock_quantity);
    }
    callback();
  });
}

// Inquirer functions
function cartFunc() {
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
                    showAllCallback();

                    // Else, log off
                  } else {
                    console.log(goodbye);
                    connection.end();
                  }
                });
            } else {
              console.log(goodbye);
              connection.end();
            }
          });
      } else {
        console.log(goodbye);
        connection.end();
      }
    });
}

// Ask if the user is done shopping
function more() {
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
        showAllCallback();
      } else {
        cartFunc();
      }
    });
}

function showAllCallback() {
  showAll(selectItem);
  // Select item and quantity
  function selectItem() {
    console.log("\n");
    inquirer
      .prompt([
        // Ask the user which ID they would like to "add to cart"
        {
          type: "input",
          message: "Please enter the ID of the item you wish to purchase:",
          name: "name",
          validate: function(value) {
            if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
              return true;
            }
            return false;
          }
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
          console.log("\n" + inquirerResponse.quantity + " " + inquirerResponse.name + "'s added to your cart\n");
          // cart.push(inquirerResponse.quantity + " " + inquirerResponse.name);
          more();

        } else {
          // Else, ask if the user wants to continue
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
                showAllCallback();

                // Else, cart
              } else {
                cartFunc();
              }
            });
        }
      });
  }
}

showAllCallback();