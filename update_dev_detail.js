
// Get the objects we need to modify
let updateDevDetailForm = document.getElementById('update-dev-detail-form-ajax');

// Modify the objects we need
updateDevDetailForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDevDetailsID = document.getElementById("mySelect");
    let inputToolID = document.getElementById("input-tool_id-update")
    let inputDevID = document.getElementById("input-dev_id-update");

    // Get the values from the form fields
    let devDetailsIDValue = inputDevDetailsID.value;
    let toolIDValue = inputToolID.value;
    let devIDValue = inputDevID.value;
    
    // currently the database table does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld
    if (isNaN(toolIDValue)) 
    {
        return;
    }

    if (isNaN(devIDValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        dev_details_id: devDetailsIDValue,
        tool_id: toolIDValue,
        dev_id: devIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-dev-detail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, devDetailsIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload()
})


function updateRow(data, dev_details_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("dev-detail-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == dev_details_id) {

            // Get the location of the row where we found the matching tool id
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of tool id value 
            let td_tool = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign tool id to our value we updated to
            td_tool.innerHTML = parsedData[0].tool_id; 

            // Get td of developer id value
            let td_dev = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign developer id to our value we updated to
            td_dev.innerHTML = parsedData[0].dev_id; 
       }
    }
}
