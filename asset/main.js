let currentIndex = null;

document.addEventListener("DOMContentLoaded",displayRecord);

function takeRecords(){
    const records = localStorage.getItem("records");
    return records ? JSON.parse(records):[];
}

function addrecord(){
    const nameInput = document.getElementById("name").value.trim();
    const detailsInput = document.getElementById("details").value.trim();
    const AgeInput = document.getElementById("Age").value.trim();
    const occupationInput = document.getElementById("occupation").value.trim();


    if(!nameInput || !detailsInput){
        alert("both name and details are required")
    }
    const newRecord = {
        id: getUniqueId(),
        name: nameInput,
        age: AgeInput,
        occupation: occupationInput,
        details: detailsInput,
        date: new Date()

    }

    const records = takeRecords();
    records.push(newRecord);
    localStorage.setItem("records",JSON.stringify(records));
    clearform();
    displayRecord();


}

function loadRecord(index) {
  const records = takeRecords();
  const record = records[index];

  document.getElementById("modal-name").value = record.name;
  document.getElementById("modal-details").value = record.details;
  document.getElementById("modal-Age").value = record.age;
  document.getElementById("modal-occupation").value = record.occupation;
  

  currentIndex = index;
  openModal();
}

function updaterecord() {
  const records = takeRecords();
  records[currentIndex].name = document.getElementById("modal-name").value.trim();
  records[currentIndex].details = document.getElementById("modal-details").value.trim();
  records[currentIndex].date = new Date();
  records[currentIndex].age =  document.getElementById("modal-Age").value.trim();
  records[currentIndex].occupation =  document.getElementById("modal-occupation").value.trim();


  localStorage.setItem("records", JSON.stringify(records));
  closeModal();
  displayRecord();
}

function deletRecord(index){
    const record = takeRecords();
    record.splice(index,1);
    localStorage.setItem("records",JSON.stringify(record))
    displayRecord();
}

function searchBy(){
    const query = document.getElementById("search").value.toLowerCase();
    const records = takeRecords();
    const filterData = records.filter((record) =>
        record.name.toLowerCase().includes(query)
      );
    const recordList = document.getElementById("records");
      recordList.innerHTML="";

    filterData.forEach((record,index) =>{

        recordList.innerHTML +=`

        <tr>
        <td>${record.id}</td>
        <td>${record.name}</td>
        <td>${record.details}</td>
        <td>${record.age}</td>
        <td>${record.occupation}</td>

        <td>${new Date(record.date).toLocaleString()}</td>
       <td>
       <button onclick = "loadRecord(${index})"  class = "edit-button">Edit</button>
       <button onclick = "deleteRecord(${index})" class = "delete-button">delete</button>
       </td>
       
        </tr>
    
        
        `;
    });

    
}


function displayRecord() {
    const recordList = document.getElementById("records");
    recordList.innerHTML = "";
  
    const records = takeRecords();
    records.forEach((record, index) => {
      recordList.innerHTML += `
        <tr>
        <td>${record.id}</td>
        <td>${record.name}</td>
        <td>${record.details}</td>
           <td>${record.age}</td>
           <td>${record.occupation}</td>
        <td>${new Date(record.date).toLocaleString()}</td>
        <td>
          <button onclick ="loadRecord(${index})" class = "edit-button">Edit</button>
          <button onclick ="deletRecord(${index})" class = "delete-button">Delete</button>
        </td>
        </tr>
      `;
    });
  }
function clearform(){
    document.getElementById("name").value="";
    document.getElementById("details").value="";
    document.getElementById("Age").value=""
    document.getElementById("occupation").value=""
}

function getUniqueId(){
    return Math.floor(Math.random() * Date.now());


}

function openModal() {
  document.getElementById("editModal").style.display = "block";
  
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}


