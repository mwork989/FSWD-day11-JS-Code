let foodDetails = [
  
    {
        id:2,
        name:'Burger',
        description:' Delicious burger with cheese and veggies',
        price:250
     }, {
        id:3,
        name:'Dosa',
        description:'Delicious Dosa with chutney and sambar',
        price:150
     },
     {
        id:1,
        name:'Pizza',
        description:'Classic pizza with your favorite toppings',
        price:300
     }
]

let cart = []

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
    window.location.href= 'checkout.html'
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
    // while in the cart we dont need description
    cart.push({ id: selectedItem.id, name: selectedItem.name, price: selectedItem.price})
    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

       // Clear previous items
       cartItemsList.innerHTML = '';
       let total = 0;

        // Display items in the cart

        // es5 fromat dynamically prepareing the list item
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(listItem);
        total += item.price;
    });
    // Update total price
    totalElement.innerText = total
}

function checkout() {
    // Dummy function for checkout process
    alert('Checkout process goes here!');
}