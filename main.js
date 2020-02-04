const baseURL = "https://swapi.co/api/";

function getData(type, cb) { //The second parameter stand for callback
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/"); //Create an url combining the baseURL and the type, and download it
    xhr.send();

    xhr.onreadystatechange = function() { //Convert the downloaded string into a js object
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText)); //The argument for cb is created here, will refer to it as data in the callback function 
        }
    };

}

function getTableHeaders(obj) {//This function take every key of an array and store them inside an empty array
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)
    });

    return `<tr>${tableHeaders}</tr>`;
}

//The following function is called in html
function writeToDocument(type) { //The argument is passed in line (people, film, starship ecc..)
    var el = document.getElementById("data");
    el.innerHTML = ""; //Every time the function is called (on click), the variable is emptied before is loaded again, this prevent the arrays to stack on top of each others

    getData(type, function(data) { //This callback just pass the JSON object, in fact data == cb
        data = data.results; //.results are properties (arrays) of those specific objects
        var tableHeaders = getTableHeaders(data[0]); //Store the first key of the results property (data = data.results). It will be used as table header

        data.forEach(function(item) { //Since JSON objects can be treated as arrays, the .forEach can be used to get a list to be "printed" on the page using .innerHTML as setter
            el.innerHTML += "<p>" + item.name + "</p>";
        });

        el.innerHTML =`<table>${tableHeaders}</table>`; 
    });
};