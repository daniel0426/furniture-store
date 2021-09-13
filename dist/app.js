
 function loadData(){
    return fetch("../db/furniture.json")
    .then(response => response.json())
    .then(data=> data.furniture)
    
   
}

//create filter
function getCategory (items) {
    
  const category = []
    items.forEach((item)=> {category.push(item.category)})

  const filteredCategory = [];
   category.forEach((item)=> {
        if(!filteredCategory.includes(item) ){
            filteredCategory.push(item)
        }
    })
   
    displayFilter(filteredCategory)
        
}


function displayFilter(items){
    const filterContainer = document.querySelector('.filter-container')
    filterContainer.innerHTML = items.map(item => createFilter(item)).join('');
}

function createFilter (item){
    return `<li class="m-2 text-green-700  p-2 cursor-pointer transform hover: text-green-800  hover:scale-110 transition duration-500">
        <button class=${item}> ${item} </button>
    </li>
    `
} 

//create products 
function displayProducts(products){
    const productContainer = document.querySelector('.product');
    productContainer.innerHTML = products.map(product => createProduct(product)).join("");

}

function createProduct(product){
    return `
    <li class="m-4  ">
        <div class="product-image group relative">
        <img src=${product.imgURL} alt=${product.category} />
        <p class="absolute top-0 left-0 z-10 p-2 text-gray-700 opacity-95 text-sm  "> ${product.size} </p>
        </div>
        <div class="detail flex flex-col items-end"> 
        <p class="my-2">${product.name}</p>
        <p>$ ${product.price} NZD</p>
        </div>
        
    </li>
    `
}

function showProducts(e, items){
    const categoryName = e.target.className;
    displayProducts(items.filter(item => item.category === categoryName))

}

function filterClickListener(items){
    const buttons = document.querySelector('.buttons')
    buttons.addEventListener('click', e=> showProducts(e, items));

}


    loadData()
    .then(items => {
        if(items){

            getCategory(items);
            filterClickListener(items)
        }
    })
    .catch(err=> new Error(err))



function displayResponsiveNav(){
    const burgerBar = document.querySelector('.burgerBar');
    const newNav = document.querySelector('.newNav')
    burgerBar.addEventListener('click', ()=> {
        newNav.classList.remove('left-full');
        newNav.classList.add('right-0');
        newNav.classList.remove('hidden')
        
    })
}
function removeResponsiveNav(){
    const removeBar = document.querySelector('.cancelBar');
    const newNav = document.querySelector('.newNav')

    removeBar.addEventListener('click', ()=>{
        newNav.classList.add('hidden');

    })
}


function handleNavbar(){
    displayResponsiveNav();
    removeResponsiveNav();
}

handleNavbar()