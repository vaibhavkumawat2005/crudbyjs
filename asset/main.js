let currentIndex = null;

document.addEventListener("DOMContentLoaded",displayRecord);

function takeRecords(){
    const records = localStorage.getItem("records");
    return records ? JSON.parse(records):[];
}

function addrecord(){
    const nameInput = document.getElementById("name").value.trim();
    const detailsInput = document.getElementById("details").value.trim();

    if(!nameInput || !detailsInput){
        alert("both name and details are required")
    }
    const newRecord = {
        id: getUniqueId(),
        name: nameInput,
        details: detailsInput,
        date: new Date()

    }

    const records = takeRecords();
    records.push(newRecord);
    localStorage.setItem("records",JSON.stringify(records));
    clearform();
    displayRecord();


}

function loadRecord(index){
    const records = takeRecords();
    const record = records[index]

    document.getElementById("name").value=record.name;
    document.getElementById("details").value=record.details;

  
    currentIndex = index;
   
    document.getElementById("add-button").style.display="none";
    document.getElementById("update-button").style.display="inline";

}

function updaterecord(){
    const records= takeRecords();
    records[currentIndex].name= document.getElementById("name").value.trim();
    records[currentIndex].details= document.getElementById("details").value.trim();
    records[currentIndex].date = new Date ();

    localStorage.setItem("records",JSON.stringify(records));
    clearform();
    displayRecord();

    document.getElementById("add-button").style.display = "inline";
    document.getElementById("update-button").style.display = "none";
    currentIndex = null;

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
        <td>${new Date(record.date).toLocaleString()}</td>
       <td>
       <button onclick = "loadRecord(${index})">Edit</button>
       <button onclick = "deleteRecord(${index})">delete</button>
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
        <td>${new Date(record.date).toLocaleString()}</td>
        <td>
          <button onclick ="loadRecord(${index})">Edit</button>
          <button onclick ="deletRecord(${index})">Delete</button>
        </td>
        </tr>
      `;
    });
  }
function clearform(){
    document.getElementById("name").value="";
    document.getElementById("details").value="";
}

function getUniqueId(){
    return Math.floor(Math.random() * Date.now());

}


