const API_URL = "/api/patients";

const form = document.getElementById("patientForm");
const table = document.getElementById("patientTable");

loadPatients();

form.addEventListener("submit", async (e) => {
e.preventDefault();

const id = document.getElementById("patientId").value;

const patient = {
fullName: document.getElementById("fullName").value,
email: document.getElementById("email").value,
phoneNumber: document.getElementById("phoneNumber").value,
age: document.getElementById("age").value,
disease: document.getElementById("disease").value,
doctorAssigned: document.getElementById("doctorAssigned").value
};

if(id){

await fetch(API_URL + "/" + id,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(patient)
});

}else{

await fetch(API_URL,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(patient)
});

}

form.reset();
document.getElementById("patientId").value="";
loadPatients();
});

async function loadPatients(){

const res = await fetch(API_URL);
const patients = await res.json();

table.innerHTML="";

patients.forEach(p => {

const row = `
<tr>
<td>${p.fullName}</td>
<td>${p.disease}</td>
<td>${p.doctorAssigned}</td>
<td class="actions">
<button onclick="editPatient('${p._id}')">Edit</button>
<button onclick="deletePatient('${p._id}')">Delete</button>
</td>
</tr>
`;

table.innerHTML += row;

});

}

async function deletePatient(id){

await fetch(API_URL + "/" + id,{
method:"DELETE"
});

loadPatients();
}

async function editPatient(id){

const res = await fetch(API_URL + "/" + id);
const p = await res.json();

document.getElementById("patientId").value = p._id;
document.getElementById("fullName").value = p.fullName;
document.getElementById("email").value = p.email;
document.getElementById("phoneNumber").value = p.phoneNumber;
document.getElementById("age").value = p.age;
document.getElementById("disease").value = p.disease;
document.getElementById("doctorAssigned").value = p.doctorAssigned;

}