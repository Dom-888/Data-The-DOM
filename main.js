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
    var tableRows = [];
    var el = document.getElementById("data");
   
    getData(type, function(data) { //This callback just pass the JSON object, in fact data == cb
        data = data.results; //.results are properties (arrays) of those specific objects
        var tableHeaders = getTableHeaders(data[0]); //Store the first key of the results property (data = data.results). It will be used as table header

        data.forEach(function(item) { //Create a row of data for every record in the array and store it in the dataRow var
            var dataRow = [];
            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString(); 
                var truncatedData = rowData.substring(0, 15); //Truncates the row to prevent horizontal scrolling
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`; //Print the table
    });
};