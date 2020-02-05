
function getData(url, cb) { //The second parameter stand for callback
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url); 
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

//Generate next and previous buttons
function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }        
}


//The following function is called in html
function writeToDocument(url) { //The argument is passed in line (people, film, starship ecc..)
    var tableRows = [];
    var el = document.getElementById("data");
   
    getData(url, function(data) { //This callback just pass the JSON object, in fact data == cb
        var pagination ="";
        
        if (data.next || data.previous) { //next and previous are two properties of those specific objects, if at least one exists, the function that creates the buttons is called
            pagination = generatePaginationButtons(data.next, data.previous)
        }
        
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