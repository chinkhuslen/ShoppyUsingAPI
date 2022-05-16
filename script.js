
const cartIcon = document.getElementById("cart") 
 const cartCon = document.getElementsByClassName("cartList")[0]
const cartList = document.createElement("div")
const cat = document.getElementsByClassName("catCon")

cartList.classList.add("cartList")
const dv = document.createElement("div")
dv.classList.add("redCircle")
let posterItems = [];
let counter = 0;
let btnbool = true
const list = document.getElementById("list");
// -------------- all products -----------------
fetch('https://fakestoreapi.com/products')
            .then((res)=>{
                console.log("unshij baina")
                return res.json();
                
            })
            .then(data =>{
                data.forEach(el=>{
                    el.count = 0;
                    posterItems.push(el)
                })
                console.log("unshij duusla")
            })
  .catch((err) => console.log("Err:", err));
// -------------- show products -----------------
  function showList(posterItems){
    const postCon = document.getElementById("posterItems")
   
    let items = ""
    posterItems.forEach((element,i) =>{
        items += 
        `<div class="width-m"><div class="posterItem">
        <h3 class="fullwidth center name">${element.title}</h3>
        <div class="pics"><img src=${element.image} alt=""></div>
        <div class="fullwidth price flexrow center" style="position: relative;"><h4 class="special">$${element.price}</h4></div>
        <div><button id="${element.id-1}" class="cartbtn">Add to Cart</button></div>
    </div></div>`
    })
    postCon.innerHTML = items;
        connectListener()
}
// -------------- category button -----------------
for(let i of cat ){
    i.addEventListener("click",()=>{
        if(i.textContent == "All Products"){
            showList(posterItems)
        }else{
            const filteredItems = posterItems.filter((item)=>item.category ==i.textContent.toLowerCase())
                showList(filteredItems)
  }
  for(let j of cat){
    if(j.classList.contains("activeCat")){
        j.classList.toggle("activeCat")
    }
}
  i.classList.toggle("activeCat")
    })
}

function connectListener(){
    const btns = document.getElementsByClassName("cartbtn");
    for(let i of btns){
        i.addEventListener('click',()=>{
            posterItems[i.id].count++
            counter++;
            cartCorner();
            drawCartCon();
        })
    }
}
// -------------- cart products -----------------
function drawCartCon(){
    let items = '';
    let total = 0;
    if(counter){
        posterItems.forEach((el,i) =>{
            if(el.count>0)
            items+=
            `<div class="fullwidth flexrow spacebtwn mar-b-10">
              <div class="flexrow">
                <div class="cartPics center">
                  <img
                    src="${posterItems[i].image}"
                  />
                </div>
                <h5 class="cartItemTitle center">${
                    posterItems[i].title
                } Poster</h5>
              </div>
              <div class="flexrow">
                <div class="center mar-r-10">
                  <h4 class="mar-r-10">$${posterItems[i].price} <span><i class="fa-solid fa-xmark"></i></span> ${el.count}</h4><div class="flexrow">
                  <button onclick="plusSubBtn(${i},true)" class="lilBtn" style="margin-right:5px;"> + </button>
                  <button onclick="plusSubBtn(${i},false)" class="lilBtn"> - </button>
                  </div>
                </div>
                <div class="center mar-r-10">
                  <div class="removeIcon center" onclick="removeItem(${i})">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </div>
              </div>
            </div>`;
            total+=posterItems[i].price*posterItems[i].count
        })
        items+=
        `<div class="border-t fullwidth center"><h2>Total price : $${total}</h2></div>`
    }else{
        items = "Cart is Empty"
    }
  cartCon.innerHTML = items;
}
// -------------- cart counter -----------------
function cartCorner(){
    if(counter>0){
        dv.innerHTML = counter
        cartIcon.appendChild(dv)
    }else{
        dv.remove();
    }
}

cartIcon.addEventListener('click', () => {
    drawCartCon();
cartCon.classList.toggle("off")
cartIcon.classList.toggle("back")
})

function plusSubBtn(i,t){
    if(t){
        counter++;
        posterItems[i].count++;
    }else{
        if(posterItems[i].count>0){
            posterItems[i].count--;
            counter--;
        }
    }
    cartCorner()
    drawCartCon();
}

function removeItem(i){
    counter-=posterItems[i].count;
    posterItems[i].count=0;
    cartCorner()
    drawCartCon();
}

        