var basket_table = document.querySelector("table tbody");

var xhttp = new XMLHttpRequest();
var counter = 1;

var header = document.getElementsByClassName("nav-menu")[0];
var buffer = header.innerHTML;

function check_id(arr, id){
    for (var key in arr){
        if (arr[key]["id"] == id){
            return false;
        }
    }
    return true;
}

function display_basket_items(){

    var basket = localStorage.getItem("basket");

    if (basket != null && basket != undefined && basket != "null" && basket != "[]"){
        basket = JSON.parse(basket);
    }

    header.innerHTML = ``;
    
    header.innerHTML = buffer;
    var nav_total = ``;
    var total_items = 0;

    for (var key in basket){
        if(isNaN(basket[key]["items"])){
            total_items = 0;
        }
        else{
            total_items += Number(basket[key]["items"]);
        }
    }


    var nav_items = document.createElement("div");
    nav_items.classList.add("total");

    nav_total = `
    <div class="item-total" style="margin-top: 20px;"> In Basket ${total_items} items</div>
    `
    
    nav_items.innerHTML = ``;
    nav_items.innerHTML += nav_total;

    header.append(nav_items);

}

function dodaj_do_koszyka(id, name, price){

    var basket = localStorage.getItem("basket");

    if (basket != null && basket != undefined && basket != "null" && basket != "[]"){
        basket = JSON.parse(basket);

        for (var key in basket){
            if(basket[key] != null){
                if (basket[key]["id"] == id){
                    item = basket[key]["items"];
                    item++;
                    basket[key]["items"] = item;
                }
                else if(check_id(basket, id)){
                    basket.push({"id": id, "name": name, 
                        "price": price,"items": counter});
                }
            }
    
        }
    }
    else{
        basket = [];
        basket.push({"id": id, "name": name, 
                     "price": price,"items": counter});
    }

    basket = JSON.stringify(basket);
    localStorage.setItem("basket", basket);

    console.log(localStorage.getItem("basket"));
    display_basket_items();
    
        
}

xhttp.onload = function(){

    display_basket_items();

    var listapr = JSON.parse(this.responseText);

    var basket = localStorage.getItem("basket"); 

    if (basket != null || basket != undefined){
        
        basket = JSON.parse(basket);

    }

    for (var i=0; i< listapr.length; i++){

        var name = listapr[i].name;
        var productId = listapr[i].id;
        var price = listapr[i].price;

        name = JSON.stringify(name);

        var new_line = 
        `
            <tr>
                <td> ${productId} </td>
                <td> ${name} </td>
                <td> ${price} </td>
                <td> 
                    <button class ="btn-add-item" onclick=dodaj_do_koszyka(${productId},${name},${price});>Dodaj do koszyka</button>
                </td>

            </tr>
        `;
        basket_table.innerHTML += new_line;
    }
};

xhttp.open("Get", "http://127.0.0.1:5500/lista_produktow.json", true);
xhttp.send();

