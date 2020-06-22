var naszDiv = document.querySelector("div");

// naszDiv.innerHTML = "<ul></ul>";

// for (var i=0; i < 10; i++){
//     naszDiv.innerHTML += "<li>" + i + "</li>";
// }

var name_ul = document.createElement("ul");

for (var i=0; i < 10; i++){
    var nowe_li = document.createElement("li");
    naszDiv.appendChild(nowe_li)
}
naszDiv.appendChild(name_ul);
