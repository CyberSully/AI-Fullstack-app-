// Get the objects we need to modify
let addDevForm = document.getElementById('add-dev-form-ajax');

// Modify the objects we need
addDevForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDevName = document.getElementById("input-dev_name");
    let inputDevLocation = document.getElementById("input-dev_location");
    let inputDevWebsite = document.getElementById("input-dev_website");

    // Get the values from the form fields
    let devNameValue = inputDevName.value;
    let devLocationValue = inputDevLocation.value;
    let devWebsiteValue = inputDevWebsite.value;

    // Put our data we want to send in a javascript object
    let data = {
        dev_name : devNameValue,
        dev_location: devLocationValue,
        dev_website: devWebsiteValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-dev-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDevName.value='';
            inputDevLocation.value='';
            inputDevWebsite.value='';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("developers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and multiple cells
    let row = document.createElement("TR");
    let dev_id_cell = document.createElement("TD");
    let dev_name_cell = document.createElement("TD");
    let dev_location_cell = document.createElement("TD");
    let dev_website_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    dev_id_cell.innerText = newRow.dev_id;
    dev_name_cell.innerText = newRow.dev_name;
    dev_location_cell.innerText = newRow.dev_location;
    dev_website_cell.innerText = newRow.dev_website;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteUser(newRow.dev_id);
    };

    // Add the cells to the row 
    // row.appendChild(dev_id_cell);
    // row.appendChild(dev_name_cell);
    // row.appendChild(dev_location_cell);
    // row.appendChild(dev_website_cell);
    // row.appendChild(deleteCell);
    location.reload();

    // Add a row attribute so that deleteDevDetails function can find a newly added row 
    row.setAttribute('data-value', newRow.dev_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // // Find drop down menu, create a new option, fill data in the option (full name, id),
    // // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.user_id;
    // option.value = newRow.user_id;
    // selectMenu.add(option);
    // // End of new step 8 code.
}