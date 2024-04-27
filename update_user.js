// Get the objects we need to modify
let updateUserForm = document.getElementById('update-user-form-ajax');

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserID = document.getElementById("mySelect");
    let inputUserWebsite = document.getElementById("input-user_website-update");

    // Get the values from the form fields
    let userIDValue = inputUserID.value;
    let userWebsiteValue = inputUserWebsite.value;


    // currently the database table does not allow updating values to NULL
    // so we must abort if being bassed NULL 
    if (isNaN(userIDValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        user_id: userIDValue,
        user_website: userWebsiteValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, userIDValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
})


function updateRow(data, user_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("users-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == user_id) {

            // Get the location of the row where we found the matching tool id
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of user website value 
            let td_user_website = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign  id to our value we updated to
            td_user_website.innerHTML = parsedData[0].user_website; 
       }
    }
}
