// Get the objects we need to modify
let addUserForm = document.getElementById('add-user-form-ajax');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserName = document.getElementById("input-user_name");
    let inputUserLocation = document.getElementById("input-user_location");
    let inputUserWebsite = document.getElementById("input-user_website");
    let inputUserIndustry = document.getElementById("input-user_industry");

    // Get the values from the form fields
    let userNameValue = inputUserName.value;
    let userLocationValue = inputUserLocation.value;
    let userWebsiteValue = inputUserWebsite.value;
    let userIndustryValue = inputUserIndustry.value;

    // Put our data we want to send in a javascript object
    let data = {
        user_name : userNameValue,
        user_location: userLocationValue,
        user_website: userWebsiteValue,
        user_industry: userIndustryValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUserName.value='';
            inputUserLocation.value='';
            inputUserWebsite.value='';
            inputUserIndustry.value='';
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
    let currentTable = document.getElementById("users-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and multiple cells
    let row = document.createElement("TR");
    let user_id_cell = document.createElement("TD");
    let user_name_cell = document.createElement("TD");
    let user_location_cell = document.createElement("TD");
    let user_website_cell = document.createElement("TD");
    let user_industry_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    user_id_cell.innerText = newRow.user_id;
    user_name_cell.innerText = newRow.user_name;
    user_location_cell.innerText = newRow.user_location;
    user_website_cell.innerText = newRow.user_website;
    user_industry_cell.innerText = newRow.user_industry;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteUser(newRow.user_id);
    };

    // Add the cells to the row 
    // row.appendChild(user_id_cell);
    // row.appendChild(user_name_cell);
    // row.appendChild(user_location_cell);
    // row.appendChild(user_website_cell);
    // row.appendChild(user_industry_cell);
    // row.appendChild(deleteCell);
    location.reload();

    // Add a row attribute so that deleteDevDetails function can find a newly added row 
    row.setAttribute('data-value', newRow.user_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.user_id;
    option.value = newRow.user_id;
    selectMenu.add(option);
    // End of new step 8 code.
}