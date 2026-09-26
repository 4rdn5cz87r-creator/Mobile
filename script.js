const products=[
{id:1,name:"Nova X1 Pro",price:69999,cls:"phone-black",code:"N1",spec:"6.7-inch OLED • 256GB • 50MP camera • 5000mAh"},
{id:2,name:"Nova X1",price:49999,cls:"phone-blue",code:"N2",spec:"6.5-inch OLED • 128GB • 48MP camera • 4800mAh"},
{id:3,name:"Nova Mini",price:34999,cls:"phone-silver",code:"N3",spec:"6.1-inch OLED • 128GB • 48MP camera • 4200mAh"}
];

function money(n){return "₹"+n.toLocaleString("en-IN")}
function cart(){return JSON.parse(localStorage.getItem("novaCart")||"[]")}
function save(c){localStorage.setItem("novaCart",JSON.stringify(c))}
function updateCount(){const n=cart().reduce((s,x)=>s+x.qty,0);document.querySelectorAll("#cartCount").forEach(e=>e.textContent=n)}
function productCard(p){return `<a class="card" href="product.html?id=${p.id}"><div class="phone-img ${p.cls}">${p.code}</div><h3>${p.name}</h3><p>${money(p.price)}</p></a>`}

const productsEl=document.getElementById("products");
if(productsEl) productsEl.innerHTML=products.map(productCard).join("");

const productEl=document.getElementById("product");
if(productEl){
 const id=Number(new URLSearchParams(location.search).get("id"))||1;
 const p=products.find(x=>x.id===id)||products[0];
 productEl.innerHTML=`<div class="detail"><div class="phone-img ${p.cls}">${p.code}</div><div><p class="eyebrow">NOVA MOBILE</p><h1>${p.name}</h1><div class="price">${money(p.price)}</div><p class="specs">${p.spec}</p><div class="qty"><button onclick="addToCart(${p.id})">Add to cart</button><a class="btn" href="cart.html">Go to cart →</a></div></div></div>`;
}

function addToCart(id){
 let c=cart(), item=c.find(x=>x.id===id);
 if(item)item.qty++; else c.push({id,qty:1});
 save(c);updateCount();alert("Added to cart!");
}

const cartEl=document.getElementById("cart");
if(cartEl){
 const c=cart();
 if(!c.length) cartEl.innerHTML='<p class="muted">Your cart is empty. <a href="products.html" style="color:#315cff">Browse products →</a></p>';
 else{
  let total=0;
  cartEl.innerHTML=c.map(item=>{const p=products.find(x=>x.id===item.id);total+=p.price*item.qty;return `<div class="cart-row"><div><strong>${p.name}</strong><br><span class="muted">${item.qty} × ${money(p.price)}</span></div><button onclick="removeItem(${p.id})">Remove</button></div>`}).join("")+`<div class="total">Total: ${money(total)}<br><button class="btn" style="margin-top:15px" onclick="alert('Demo checkout — no real payment is connected.')">Checkout</button></div>`;
 }
}
function removeItem(id){save(cart().filter(x=>x.id!==id));location.reload()}
updateCount();