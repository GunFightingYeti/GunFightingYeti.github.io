// Variables
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");
var cTable = require('console.table');

var buffer = "\n"
var goodbye = "\nThank you for your shopping with Bamazon.  Please come again soon!";
var cartItems = [];
var cartCost = [0];

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

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
    var items = [];
    connection.query("SELECT item_id, product_name, department_name, price FROM products;", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            items.push(res[i])
        }
        console.table(items);
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
        .prompt([{
                type: "input",
                message: "Please enter the ID of the item you wish to purchase:",
                name: "item_id",
                validate: function (value) {
                    if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                message: "How many of that item would you like to purchase?",
                name: "quantity",
                validate: function (value) {
                    if (isNaN(value) === false) {
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
        .then(function (answer) {
            // If the answer confirms, display the cart and purchase info
            var query = "SELECT item_id, product_name, price FROM products WHERE ?";
            connection.query(query, {
                item_id: answer.item_id
            }, function (err, res) {

                // UPDATE `bamazon_db`.`products` SET `stock_quantity` -= answer.quantity WHERE (`item_id` = answer.item_id);

                if (answer.confirm) {
                    console.log("\n" + answer.quantity + " " + res[0].product_name + "'s added to your cart\n");
                    var price = (res[0].price * answer.quantity);
                    updateCart(res[0].product_name + " x" + answer.quantity, price);
                    console.log("Items in cart:\n" + cartItems.join("\n"));
                    console.log("\nTotal: $" + cartCost.reduce(add).toFixed(2));
                    whatNext();
                } else {
                    console.log("\nPurchase canceled")
                    whatNext();
                }
            });
        });
}

// Update cart with purchased items
function updateCart(item, price) {
    cartItems.push(item);
    cartCost.push(price);
}

// Decide what to do while looking at your cart
function inCart() {
    console.log(buffer);
    inquirer
        .prompt([{
            name: "purchase",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Purchase all items in your cart",
                "Empty your cart",
                "Browse for an item",
                "Stop shopping"
            ]
        }])
        .then(function (answer) {
            switch (answer.purchase) {
                case "Purchase all items in your cart":
                    inquirer
                        .prompt({
                            type: "confirm",
                            message: "Are you sure:",
                            name: "confirm",
                            default: true
                        })
                        .then(function (answer) {
                            if (answer.confirm) {
                                console.log("Items in cart:\n" + cartItems.join("\n"));
                                console.log("\nAll items purchased!\nYour total is: $" + cartCost.reduce(add).toFixed(2))
                                whatNext();
                            } else {
                                viewCart();
                            }
                        });
                    break;

                case "Empty your cart":
                    inquirer
                        .prompt([{
                            type: "confirm",
                            message: "Are you sure you want to delete all items in your cart?",
                            name: "confirm",
                            default: true
                        }, ])
                        .then(function (answer) {
                            if (answer.confirm) {
                                // Delete cart array
                                console.log("\nAll items deleted, your cart is now empty.")
                                whatNext();
                            } else {
                                inCart();
                            }
                        });
                    break;

                case "Browse for an item":
                    showAll();
                    break;

                case "Stop shopping":
                    console.log(goodbye);
                    connection.end();
                    break;
            }
        });
}

// View cart and confirm/deny purchse
function viewCart() {
    console.log(buffer);
    if (cartItems.length === 0) {
        console.log("You haven't added anything to your cart.")
        whatNext();
    } else {
    console.log("Items in cart:\n" + cartItems.join("\n"));
    console.log("\nTotal: $" + cartCost.reduce(add).toFixed(2));
    inCart();
    }
}

// Run function to ask what the user wants to do next
whatNext();