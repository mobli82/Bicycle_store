var basket_table = document.querySelector("#basket tbody");

var basket = localStorage.getItem("basket");
var header = document.getElementsByClassName("nav-menu")[0];
var buffer = header.innerHTML;


function display_basket(){
    
    header.innerHTML = ``;
    
    header.innerHTML = buffer;
    var nav_total = ``;
    var total_items = 0;

    basket_table.innerHTML = ``;

    if (typeof(basket) == typeof(String(basket))){
        localStorage.clear();
    }

    if (basket != null || basket != undefined){
        basket = JSON.parse(basket);
    }

    var total_sum = 0;

    for (var key in basket){
        if(basket[key] != null){
            var id = basket[key]["id"];
            var name = basket[key]["name"];
            var nr_items = basket[key]["items"];
            var price = basket[key]["price"];
            total_items += Number(nr_items);

            var line = `
                <tr class="basket-items">
                    <td class="id-item">${id}</td>
                    <td> ${name} </td>
                    <td><input class="quantity-input" type="number" value=${nr_items} name="items" style="font-size: 15px;"></td>
                    <td> ${price} </td>
                    <td> 
                        <button onclick="del_item(${id})"class="btn-delete" type="button">Del item</button>
                    </td>
                </tr>
                    
            `
            
            basket_table.innerHTML += line;
            total_sum += (price * nr_items);
        }
    }

    basket_table.innerHTML += `
                            <br/> 
                            <th> Total price  </th>     
                            <td> ${total_sum}</td>
                            `    

    var input_line = basket_table.getElementsByClassName("basket-items");

    for(var i=0; i<input_line.length; i++){
        input_line[i].addEventListener('change', changeItemValue);
    }

    var nav_items = document.createElement("div");
    nav_items.classList.add("total");

    nav_total = `
    <div class="item-total" style="margin-top: 20px;"> In Basket ${total_items} items</div>
    `
    
    nav_items.innerHTML = ``;
    nav_items.innerHTML += nav_total;

    header.append(nav_items);

    basket = JSON.stringify(basket)

    localStorage.setItem("basket", basket);
}

display_basket();


function del_item(id){

    if (basket != null || basket != undefined){
        basket = JSON.parse(basket);
    }

    for (var key in basket){
        if(basket[key] != null){
            if(basket[key]["id"] == id){
                basket.splice(key, 1);
            }
        }
    }

    basket = JSON.stringify(basket);

    localStorage.setItem("basket", basket);
    display_basket();
};

function changeItemValue(event){

    if (basket != null || basket != undefined){
        basket = JSON.parse(basket);
    }

    var buttonClicked = event.target;

    if(isNaN(buttonClicked.value) || buttonClicked.value <= 0){
        buttonClicked.value = 1;
    }

    var new_items = buttonClicked.value;

    var basket_items = buttonClicked.parentElement.parentElement;
    
    var id_item = basket_items.getElementsByClassName("id-item")[0].innerHTML;

    
    
    for(var key in basket){
        if(basket[key] != null){
            if(basket[key]["id"] == Number(id_item)){            
                basket[key]["items"] = new_items;
            }
        }
    }
    basket = JSON.stringify(basket);
    localStorage.setItem("basket", basket);

    display_basket();

}