// Variables
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");

var buffer = "\n"
var wip = "I haven't made this yet...sorry.\n";
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

// Show all items in database
function showAll() {
    console.log(buffer);
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Name: " + res[i].product_name + " | Price: $" + res[i].price + " | Amount in stock: " + res[i].stock_quantity);
        }
        // Browse function
        browse();
    });
}

// Ask what the user would like to do next
function whatNext() {
    console.log(buffer);
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Browse for an item",
                "View cart",
                "Stop shopping"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Browse for an item":
                    showAll();
                    break;

                case "View cart":
                    viewCart();
                    break;

                case "Stop shopping":
                    console.log(goodbye);
                    connection.end();
                    break;
            }
        });
}

// Browse items and choose
function browse() {
    console.log(buffer);
    inquirer
        .prompt([
            // Ask the user which ID they would like to "add to cart"
            {
                type: "input",
                message: "Please enter the ID of the item you wish to purchase:",
                name: "name",
                validate: function (value) {
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
                    if (isNaN(value) === false) {// && parseInt(value) > 0 && parseInt(value) <= 10) {
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
                whatNext();
            } else {
                whatNext();
            }
        });
}

// View cart and confirm/deny purchse
function viewCart() {
    console.log(buffer);
    console.log(cart);
}

// Run function to ask what the user wants to do next
whatNext();