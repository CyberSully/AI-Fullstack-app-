// Get the objects we need to modify
let addToolForm = document.getElementById('add-tool-form-ajax');

// Modify the objects we need
addToolForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputToolName = document.getElementById("input-tool_name");
    let inputToolType = document.getElementById("input-tool_type");
    let inputPrice = document.getElementById("input-price");
    let inputReleaseDate = document.getElementById("input-release_date");
    let inputCategory = document.getElementById("input-category")

    // Get the values from the form fields
    let toolNameValue = inputToolName.value;
    let toolTypeValue = inputToolType.value;
    let priceValue = inputPrice.value;
    let releaseDateValue = inputReleaseDate.value;
    let categoryValue = inputCategory.value;


    // Put our data we want to send in a javascript object
    let data = {
        tool_name : toolNameValue,
        tool_type: toolTypeValue,
        price: priceValue,
        release_date: releaseDateValue,
        category: categoryValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-tool-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputToolName.value='';
            inputToolType.value='';
            inputPrice.value='';
            inputReleaseDate.value='';
            inputCategory.value='';
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
    let currentTable = document.getElementById("tools-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and multiple cells
    // let row = document.createElement("TR");
    // let tool_id_cell = document.createElement("TD");
    // let tool_name_cell = document.createElement("TD");
    // let tool_type_cell = document.createElement("TD");
    // let price_cell = document.createElement("TD");
    // let release_date_cell = document.createElement("TD");
    // let category_cell = document.createElement("TD");
    // let deleteCell = document.createElement("TD");
    location.reload();

    // Fill the cells with correct data
    tool_id_cell.innerText = newRow.tool_id;
    tool_name_cell.innerText = newRow.tool_name;
    tool_type_cell.innerText = newRow.tool_type;
    price_cell.innerText = newRow.price;
    release_date_cell.innerText = newRow.release_date;
    category_cell.innerText = newRow.category;

    // Delete
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTool(newRow.tool_id);
    };

    // Add the cells to the row 
    row.appendChild(tool_id_cell);
    row.appendChild(tool_name_cell);
    row.appendChild(tool_type_cell);
    row.appendChild(price_cell);
    row.appendChild(release_date_cell);
    row.appendChild(category_cell);
    row.appendChild(deleteCell);

    // Add a row attribute so that delete function can find a newly added row 
    row.setAttribute('data-value', newRow.tool_id);

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