//Event Listeners
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector('#tenant-profile').addEventListener('submit', handleSubmit)
});

//Event handlers
function handleSubmit(e) {
    e.preventDefault()
    let tenantObj = {
        name: e.target.name.value,
        rent: e.target.rent.value,
        modeofpayment: e.target.modeofpayment.value,
        
    }
    loadOneTenant(tenantObj);
    addTenant(tenantObj)

}

//DOM Load Function
function loadOneTenant(tenant) {
    //Create Tenant
    let form = document.createElement('li')
    form.className = "form"
    form.id = tenant.id
    form.innerHTML = `
   <div class ="content">
    <h4>${tenant.name}</h4>
    <p> 
    $<span class="rent-paid">${tenant.rent}</span> Paid
    </p>
    <p>Mode of Payment- ${tenant.modeofpayment}</p>
   </div>
   <div class="buttons">
   <button>Remove-Tenant</button>
   <button>Rent-Paid</button>
   </div>
   `
    // Adding Click Event Listener
    form.querySelector('button').addEventListener('click', () => {
        //console.log("Button clicked");
        tenant.rent += 1000;
        const paidRent = parseInt(form.querySelector(".rent-paid").textContent);
        form.querySelector(".rent-paid").textContent = paidRent + 1000;
        
        updateRent(tenant);
    });

 form.querySelector('button').addEventListener('click', () => {
         //console.log("Button clicked");
         const tenantElement = form.querySelector(".remove-tenant");
         if (tenantElement) {
             tenantElement.parentNode.removeChild(tenantElement);
         }
         deleteTenant(tenant.id)
     });

    //Add Tenant Form to DOM
    document.querySelector("#tenants").appendChild(form)
}

//Fetch Requests
//Get Fetch for all Tenants
function getTenants() {
    fetch("http://localhost:3000/tenants")
        .then(response => response.json())
        .then(tenants => tenants.forEach(tenant => loadOneTenant(tenant)))

}
// Function to add tenant rent
function addTenant(tenantObj) {
    fetch("http://localhost:3000/tenants", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tenantObj)
    })
        .then(res => res.json())
        .then(tenant => console.log(tenant))
}

// Function to Delete Tenant
function deleteTenant(id) {
    fetch(`http://localhost:3000/tenants/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(tenant => console.log(tenant))
}

// Function to update Tenant Rent
function updateRent(tenantObj) {
    fetch(`http://localhost:3000/tenants/${tenantObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tenantObj)
    })
        .then(res => res.json())
        .then(updatedTenant => console.log(updatedTenant))
}

//Initial Load
//Get Data and Load Tenants to the DOM

function initialize() {
    //tenants.forEach(tenant =>loadOneTenant(tenant))
    getTenants()
}

initialize();
