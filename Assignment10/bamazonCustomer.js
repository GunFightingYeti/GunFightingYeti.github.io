// Required variables
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");
var cTable = require('console.table');

// Global variables
var buffer = "\n";
var goodbye = "\nThank you for shopping with Bamazon, please come again soon!";
var cartItems = [];
var CartAmount = [];
var cartCost = [];
var cartIDs = [];

// Welcome text
console.log("------------------------------------------");
console.log("\nWelcome to the Bamazon marketplace!");

// MySQL server connection creation
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: keys.mysql.password,
    database: 'bamazon_db'
});

// MySQL server connection
connection.connect(function (err) {
    if (err) throw err;
});

// Adds cart prices together when called
function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

// Show all items in database
function showAll() {
    console.log(buffer);
    var allItems = [];
    connection.query("SELECT item_id, product_name, department_name, price FROM products;", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            allItems.push(res[i])
        }
        console.table(allItems);
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
            type: "list",
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

                    // Add cart items back to inventory
                    if (cartItems.length > 0) {
                        for (var i = 0; i < cartItems.length; i++) {
                            var amount = CartAmount[i];
                            var query = "UPDATE products SET stock_quantity = stock_quantity + " + amount + " WHERE ?";
                            connection.query(query, {
                                item_id: cartIDs[i]
                            }, function (err, res) {

                            });
                        }
                    }

                    console.log(goodbye);
                    connection.end();
                    break;
            }
        });
}

// Browse items and choose
function browse() {
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
            var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, {
                item_id: answer.item_id
            }, function (err, res) {

                // Only allow the purchase if there are enough items
                if (res[0].stock_quantity >= answer.quantity) {

                    // If they confirm the purchase remove the quantity from the database and add to cart
                    if (answer.confirm) {
                        console.log("\n" + answer.quantity + " " + res[0].product_name + "'s added to your cart\n");
                        var price = (res[0].price * answer.quantity);
                        updateCart(res[0].product_name, price, answer.quantity, res[0].item_id);
                        console.log("Items in cart:");
                        for (var i = 0; i < cartItems.length; i++) {
                            console.log(cartItems[i] + " x" + CartAmount[i]);
                        }
                        console.log("\nTotal: $" + cartCost.reduce(add).toFixed(2));

                        // Remove items from inventory
                        var query = "UPDATE products SET stock_quantity = stock_quantity - " + answer.quantity + " WHERE ?";
                        connection.query(query, {
                            item_id: answer.item_id
                        }, function (err, res) {

                        });

                        whatNext();

                        // If the user cancels the purchase nothing happens
                    } else {
                        console.log("\nPurchase canceled")
                        whatNext();
                    }

                    // If there is not enough quantity don't allow the purchase
                } else {
                    console.log("\nI'm sorry, we only have " + res[0].stock_quantity + " items in stock\n\nPlease choose a smaller quantity or a different item\n\nWe apologize for the inconvenience");
                    showAll();
                }
            });
        });
}

// Update cart with purchased items
function updateCart(item, price, amount, ID) {
    cartItems.push(item);
    cartCost.push(price);
    CartAmount.push(amount);
    cartIDs.push(ID);
}

// Decide what to do while looking at your cart
function inCart() {
    console.log(buffer);
    inquirer
        .prompt([{
            name: "purchase",
            type: "list",
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
                                console.log("\nAll items purchased!\nYour total is: $" + cartCost.reduce(add).toFixed(2))

                                // Empty all cart arrays
                                cartItems.length = 0;
                                cartCost.length = 0;
                                CartAmount.length = 0;
                                cartIDs.length = 0;

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
                            default: false
                        }, ])
                        .then(function (answer) {
                            if (answer.confirm) {
                                // Add cart items back to inventory
                                for (var i = 0; i < cartItems.length; i++) {
                                    var amount = CartAmount[i];
                                    var query = "UPDATE products SET stock_quantity = stock_quantity + " + amount + " WHERE ?";
                                    connection.query(query, {
                                        item_id: cartIDs[i]
                                    }, function (err, res) {

                                    });
                                }

                                // Empty all cart arrays
                                cartItems.length = 0;
                                cartCost.length = 0;
                                CartAmount.length = 0;
                                cartIDs.length = 0;

                                console.log("\nAll items deleted, your cart is now empty")
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

                    // Add cart items back to inventory
                    if (cartItems.length > 0) {
                        for (var i = 0; i < cartItems.length; i++) {
                            var amount = CartAmount[i];
                            var query = "UPDATE products SET stock_quantity = stock_quantity + " + amount + " WHERE ?";
                            connection.query(query, {
                                item_id: cartIDs[i]
                            }, function (err, res) {

                            });
                        }
                    }

                    console.log(goodbye);
                    connection.end();
                    break;
            }
        });
}

// View cart, if there are items to view
function viewCart() {
    console.log(buffer);
    if (cartItems.length === 0) {
        console.log("Your cart is empty")
        whatNext();
    } else {
        console.log("Items in cart:");
        for (var i = 0; i < cartItems.length; i++) {
            console.log(cartItems[i] + " x" + CartAmount[i]);
        }
        console.log("\nTotal: $" + cartCost.reduce(add).toFixed(2));
        inCart();
    }
}

// Run function to ask what the user wants to do next
whatNext();