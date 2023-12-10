let foodDetails = [
  
    {
        id:2,
        name:'Burger',
        description:' Delicious burger with cheese and veggies',
        price:250,
        image:"https://wallpaperaccess.com/thumb/715621.jpg"
     }, {
        id:3,
        name:'Dosa',
        description:'Delicious Dosa with chutney and sambar',
        price:150,
        image:"https://wallpaperaccess.com/thumb/6340448.jpg"
     },
     {
        id:1,
        name:'Pizza',
        description:'Classic pizza with your favorite toppings',
        price:300,
        image:"https://wallpaperaccess.com/full/3667703.jpg"
     },
     {
        id:4,
        name:'Donut',
        description:'sweet and cholatey donut',
        price:120,
        image:"https://wallpaperaccess.com/thumb/1636234.jpg"
     },  {
        id:5,
        name:'idli',
        description:'savoury rice cake',
        price:50,
        image:"https://wallpaperaccess.com/thumb/4883006.jpg"
     },  {
        id:6,
        name:'Pani Puri',
        description:'Deep-fried breaded sphere with filling',
        price:40,
        image:"https://wallpaperaccess.com/full/9450617.jpg"
     }
]

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function loadAllDetails(){
    // to fetch food details make an api call
    getFoodDetailsFromJsonServer();
    createFoodCards();
   // createFoodTable();
}



function createFoodCards(){
    const foodContainer = document.getElementById('food-container');
    //   adding the class name for the container
    
    const foodCardRow = document.createElement('div');
    foodContainer.classList.add('mt-4')
    foodCardRow.classList.add('row');
   
    foodDetails.forEach(item=>{
        const foodCard = document.createElement('div');
        foodCard.classList.add('food-card');
        foodCard.classList.add('mx-auto');
        foodCard.innerHTML = `
        
        <h3 >${item.name}</h3>
        <p>${item.description}</p>
        <img class="card-img-top" src=${item.image} alt="Card image cap" />
        <p>Price: $${item.price}</p>
        
       
        <button onclick="viewItemDetails(${item.id})">Add to Cart</button>
    `;
    foodCardRow.appendChild(foodCard);

    })
    foodContainer.appendChild(foodCardRow);
}

function createFoodTable(foodDetailsRecords){
    const foodTableBody = document.querySelector('#food-table tbody');
    foodDetailsRecords.forEach(item => {
        // Create a table row for each food item
        const row = document.createElement('tr');

        // Populate the row with food details
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.description}</td>
           
            <td><img class="card-img-top" src=${item.image} alt="Card image cap" /></td>
            <td>$${item.price}</td>
            <td><button onclick="viewItemDetails(${item.id})">Add to Cart</button></td>
        `;

        // Append the row to the table body
        foodTableBody.appendChild(row);
    });
   //syntax equivalent for document.getElementById('food-table') in jquery below code we can use
   $('#food-table').DataTable();
}


//'' "" 
//es5 format
// var sureshage =24;
// var rajeshage=25;
// "suresh=" +sureshage+"rajesh="+rajeshage

// //es6  template literals
// `suresh= ${sureshage} rajesh= ${rajeshage}`

function viewItemDetails(foodId){

    // let me loop through food details array and identify id and provides filtered array
    const selectedItemArray = foodDetails.filter(item=>item.id === foodId);
    const selectedObject = selectedItemArray[0];
   
    // inorder to store the data in the localstorage we have to store the data in the form of strings
 
    const convertedObject  = JSON.stringify(selectedObject);

    // localstorage allows the users to store the values in the form of string against a key
    // key here is selectedItem and stored values will be appearing inside the dev tools application tab and by selecting the localstorage 

    /////////////////////key              value
    localStorage.setItem('selectedItem',convertedObject)

    //navigate to details page
    window.location.href = 'details.html'
}


function  goBack(){
   // window.location.href = 'index.html'
   window.history.back()
}

function  goHome(){
    window.location.href = 'index.html'
   
 }

function displayItemDetails(){

    /////////////////////converting into js object    // getting the value back from key from localstorage
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
    const itemDetailsSection = document.getElementById('item-details');

    // es6 format -${ } template literals `
    const buildItemDetailsHTML =`
    <h2>${selectedItem.name}</h2>
    <p>${selectedItem.description}</p>
    <p>Price: $${selectedItem.price}</p>
    <button onclick="addToCart(${selectedItem.id})">Add to Cart</button>
    `

     //es5 format 
    // '<h2>'+selectedItem.name+'</h2>'   


    itemDetailsSection.innerHTML = buildItemDetailsHTML
}

function addToCart(){
 
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
    // while in the cart we dont need description
    if (selectedItem) {
        cart.push({ id: selectedItem.id, name: selectedItem.name, price: selectedItem.price });
        updateCart();
        saveCartToLocalStorage();
       window.location.href = 'checkout.html';
    } else {
        alert('Item not found!');
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}



function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
     console.log(cartItemsList,cart)
       // Clear previous items
       if(cartItemsList){
        cartItemsList.innerHTML = '';
        let total = 0;
        console.log('cart',cart)
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerText = `${item.name} - ${item.price}`;
            cartItemsList.appendChild(listItem);
            total += item.price;
        });
        // Update total price
        totalElement.innerText = total
       }
   

        // Display items in the cart

        // es5 fromat dynamically prepareing the list item
  
}

function checkout() {
    // Dummy function for checkout process

   // alert('Checkout process goes here!');
   saveCartToJsonServer();
}

function saveCartToJsonServer(){
  //  JSON Server is running on localhost:3000
  fetch('http://localhost:3000/cart',{
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(cart)
  }).then(response => response.json()).then(data => console.log('Cart saved to server:', data))
  .catch(error => console.error('Error saving cart to server:', error));
}


function getFoodDetailsFromJsonServer(){
    fetch('http://localhost:3000/foodDetails',{
        method:'GET'
      }).then(response => response.json()).then( foodDetails =>{
        createFoodTable(foodDetails)
      }).catch(error => console.error('Error fetching cart items:', error));
}



