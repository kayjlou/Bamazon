
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password:"",
  database: "bamazon",
});

connection.connect(function(err){
  if (err) throw err;
  displayProducts();
})


//On load it will display all the products for sale with their ID, name, and price
  function displayProducts(){
    var query= 'SELECT * FROM products'
    connection.query(query, function(err,res){
      console.log("ITEMS AVAILABLE FOR SALE:" + "\n")
      for (var i =0; i < res.length; i++){
          console.log("Item id: " + res[i].item_id + "|| " + "Product: " + res[i].product_name + "|| " + "Department: " + res[i].department_name +
                      "|| " + "Price: " + res[i].price + "|| " + "Quantity for sale: " + res[i].stock_quantity + 
                      "\n--------------------------------------------------------------------------------------------")
      }
      getOrder();
    })
  };


  //Function for prompt for customer
  function getOrder(){
    inquirer.prompt([{
      name: "item_id",
      type: "input",
      message: "What is the id of the product you would like to purchase?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },{
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?",
      //Validate
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    
    }]).then(function(input){
        connection.query('SELECT * FROM products WHERE item_id = ?', input.item_id, function(err,res){
          
          for (var i =0; i< res.length; i++){

          if(input.quantity > res[i].stock_quantity){
            console.log("-------------------------------------------------");
            console.log('INSUFFICIENT QUANTITY, unable to complete order');
            console.log("-------------------------------------------------");
            //getOrder();
            newOrder();
          }
          else {
            console.log("\nThank you for your order")
            console.log("----------------------------------------------");
            console.log("You have ordered: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Total: " + "$" + res[i].price * input.quantity);
            console.log("----------------------------------------------");
            console.log("");
            //Update products table
            connection.query('UPDATE products SET ? WHERE ?', 
                            [{ stock_quantity: res[0].stock_quantity - input.quantity },
                             { item_id: input.item_id
                            }], function(err,res){});
            newOrder();
          }
        }
        })
        //newOrder();
    })
    
  }

  //This function ask if user would like to continue and purchase more items
  function newOrder(){
    inquirer.prompt([{
      type: 'confirm',
      name: 'choice',
      message: 'Would you like to place another order?'
    }]).then(function(answer){
      if(answer.choice){
          displayProducts();
      }
      else{
          console.log('Thank you for doing business with us. \nHave a great day!');
          connection.end();
      }
    })
  };