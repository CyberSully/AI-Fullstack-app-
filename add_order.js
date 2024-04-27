// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserID = document.getElementById("input-user_id");
    let inputOrderDate = document.getElementById("input-order_date");
    let inputOrderAmount = document.getElementById("input-order_amount");
    let inputPaymentComplete = document.getElementById("input-payment_complete");

    // Get the values from the form fields
    let userIDValue = inputUserID.value;
    let orderDateValue = inputOrderDate.value;
    let orderAmountValue = inputOrderAmount.value;
    let paymentCompleteValue = inputPaymentComplete.value;

    // Put our data we want to send in a javascript object
    let data = {
        user_id : userIDValue,
        order_date: orderDateValue,
        order_amount: orderAmountValue,
        payment_complete: paymentCompleteValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUserID.value='';
            inputOrderDate.value='';
            inputOrderAmount.value='';
            inputPaymentComplete.value='';
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
    let currentTable = document.getElementById("orders-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and multiple cells
    let row = document.createElement("TR");
    let order_id_cell = document.createElement("TD");
    let user_id_cell = document.createElement("TD");
    let order_date_cell = document.createElement("TD");
    let order_amount_cell = document.createElement("TD");
    let payment_complete_cell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    order_id_cell.innerText = newRow.order_id;
    user_id_cell.innerText = newRow.user_id;
    order_date_cell.innerText = newRow.order_date;
    order_amount_cell.innerText = newRow.order_amount;
    payment_complete_cell.innerText = newRow.payment_complete;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrder(newRow.order_id);
    };

    // Add the cells to the row 
    // row.appendChild(order_id_cell);
    // row.appendChild(user_id_cell);
    // row.appendChild(order_date_cell);
    // row.appendChild(order_amount_cell);
    // row.appendChild(payment_complete_cell);
    // row.appendChild(deleteCell);
    location.reload();

    // Add a row attribute so that delete function can find a newly added row 
    row.setAttribute('data-value', newRow.order_id);

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