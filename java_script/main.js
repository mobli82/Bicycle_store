var name = document.getElementsByTagName("div")[0];

name.innerHTML = "Odlicznie: ";

var naszslownik = {
    key: "Jakas wartosc",
    drugiklucz: "innay klucz",
};


function dummy_func(ile_liczb, jaki_element){
    for (var i=0; i < ile_liczb; i++){
        jaki_element.innerHTML += i;
    }
}

dummy_func(10, name);