// Get the objects we need to modify
let addDownloadForm = document.getElementById('add-download-form-ajax');

// Modify the objects we need
addDownloadForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputToolID = document.getElementById("input-tool_id");
    let inputUserID = document.getElementById("input-user_id");
    let inputOrderID = document.getElementById("input-order_id");
    let inputDownloadDate = document.getElementById("input-download_date");
    let inputDownloadSuccess = document.getElementById("input-download_success")

    // Get the values from the form fields
    let toolIDValue = inputToolID.value;
    let userIDValue = inputUserID.value;
    let orderIDValue = inputOrderID.value;
    let downloadDateValue = inputDownloadDate.value;
    let downloadSuccessValue = inputDownloadSuccess.value;


    // Put our data we want to send in a javascript object
    let data = {
        tool_id : toolIDValue,
        user_id: userIDValue,
        order_id: orderIDValue,
        download_date: downloadDateValue,
        download_success: downloadSuccessValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-download-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputToolID.value='';
            inputUserID.value='';
            inputOrderID.value='';
            inputDownloadDate.value='';
            inputDownloadSuccess.value='';
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
    let currentTable = document.getElementById("downloads-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and multiple cells
    let row = document.createElement("TR");
    let download_id_cell = document.createElement("TD");
    let tool_id_cell = document.createElement("TD");
    let tool_name_cell = document.createElement("TD");
    let user_id_cell = document.createElement("TD");
    let user_name_cell = document.createElement("TD");
    let order_id_cell = document.createElement("TD");
    let order_date_cell = document.createElement("TD");
    let download_date_cell = document.createElement("TD");
    let download_success_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    download_id_cell.innerText = newRow.download_id;
    tool_id_cell.innerText = newRow.tool_id;
    tool_name_cell.innerText = "Refresh for tool name";
    user_id_cell.innerText = newRow.user_id;
    user_name_cell.innerText = "Refresh for user name";
    order_id_cell.innerText = newRow.order_id;
    order_date_cell.innerText = "Refresh for order date";
    download_date_cell.innerText = newRow.download_date;
    download_success_cell.innerText = newRow.download_success;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDownload(newRow.download_id);
    };

    // Add the cells to the row 
    // row.appendChild(download_id_cell);
    // row.appendChild(tool_id_cell);
    // row.appendChild(tool_name_cell);
    // row.appendChild(user_id_cell);
    // row.appendChild(user_name_cell);
    // row.appendChild(order_id_cell);
    // row.appendChild(order_date_cell);
    // row.appendChild(download_date_cell);
    // row.appendChild(download_success_cell);
    // row.appendChild(deleteCell);
    location.reload();

    // Add a row attribute so that delete function can find a newly added row 
    row.setAttribute('data-value', newRow.download_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // // Find drop down menu, create a new option, fill data in the option (full name, id),
    // // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.tool_id;
    // option.value = newRow.tool_id;
    // selectMenu.add(option);
    // // End of new step 8 code.
}