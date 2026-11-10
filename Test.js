// const heading = document.getElementById('heading');
// heading.innerHTML = 'Welcome to JavaScript'
// const phara = document.querySelectorAll('.message');
// phara.forEach(function (p){console.log(p.textContent)})

//event bubbling
 const containers = document.getElementById('container');

// containers.addEventListener('click',function(event){
//     console.log('target',event.target);
//     console.log('target',event.currentTarget);
    
// })

//event delegate
containers.addEventListener('click',function(event){
    const button = event.target.closest('add-cart');

    if(button && containers.contains(button)){
        console.log("add to cart");
        
    }
})


const container = document.getElementById('product-container');
const button = document.getElementById('add-product');
button.addEventListener('click', function(){
    const product = document.createElement('div');
    product.innerHTML = `
        <p>Product Name : Laptop</p>
        <p>Price: 50000</p>
    `;
    product.className = 'product-card';
    container.append(product);
    console.log("clicked");
})


//ASYSNC
function getProduct(callback){
    console.log("Fetching products");
    setTimeout(function(){
        const products = ["Laptop", "Mouse", "Keyboard"];
        callback(products);
    },2000);
}

function displayProduct(prod){
    console.log("Products received");

    console.log(prod);
}
getProduct(displayProduct);


// const productPromise = new Promise(function(resolve, reject) {

//     setTimeout(function() {

//         const products = ["Laptop", "Mouse", "Keyboardsssssss"];

//         resolve(products);

//     }, 2000);

// });

// productPromise.then(function(product){
//     console.log(product);
    
// })

const productPromise = new Promise(function(resolve, reject) {
        const success = true;

        if (success) {
            resolve(["Laptop", "Mouse"]);
        } else {
            reject("Unable to fetch products");
        }

});

// productPromise
//     .then(function(products) {
//         console.log(products);
//     })
//     .catch(function(error) {
//         console.log(error);
//     });


async function displaProduct(){

    try {  
        const products = await productPromise;
        console.log(products);
    } catch (error) {
        console.log(error);
        
    }
    
}

displaProduct();