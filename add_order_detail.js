// Get the objects we need to modify
let addOrderDetailForm = document.getElementById('add-order-detail-form-ajax');

// Modify the objects we need
addOrderDetailForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("input-order_id");
    let inputToolID = document.getElementById("input-tool_id");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let toolIDValue = inputToolID.value;

    // Put our data we want to send in a javascript object
    let data = {
        order_id: orderIDValue,
        tool_id: toolIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-detail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderID.value = '';
            inputToolID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("order-details-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let order_details_id_cell = document.createElement("TD");
    let order_id_cell = document.createElement("TD");
    let user_id_cell = document.createElement("TD");
    let user_name_cell = document.createElement("TD");
    let tool_id_cell = document.createElement("TD");
    let tool_name_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    order_details_id_cell.innerText = newRow.order_details_id;
    order_id_cell.innerText = newRow.order_id;
    user_id_cell.innerText = "Refresh the page for user id";
    user_name_cell.innerText = "Refresh the page for user name";
    tool_id_cell.innerText = newRow.tool_id;
    tool_name_cell.innerText = "Refresh the page for tool name";

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDevDetails(newRow.order_details_id);
    };

    // Add the cells to the row 
    // row.appendChild(order_details_id_cell);
    // row.appendChild(order_id_cell);
    // row.appendChild(user_id_cell);
    // row.appendChild(user_name_cell);
    // row.appendChild(tool_id_cell);
    // row.appendChild(tool_name_cell);
    location.reload();

    // Add a row attribute so that deleteDevDetails function can find a newly added row 
    row.setAttribute('data-value', newRow.order_details_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // // Find drop down menu, create a new option, fill data in the option (full name, id),
    // // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.tool_id + ' ' +  newRow.dev_id;
    // option.value = newRow.dev_details_id;
    // selectMenu.add(option);
    // // End of new step 8 code.
}