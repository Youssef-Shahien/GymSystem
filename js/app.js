let appBody = document.querySelector("body");
let name = document.getElementById("name");
let nationalID = document.getElementById("national-id");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let weight = document.getElementById("weight");
let height = document.getElementById("height");
let package = document.getElementById("package");
let period = document.getElementById("period");
let coach = document.getElementById("coach");
let amount = document.getElementById("amount");
let submit = document.querySelector(".submit-btn");
let clearData = document.querySelector(".delete-all");
let searchName = document.getElementById("search-name");
let searchPhone = document.getElementById("search-phone");

let mood = "submit";
let tmp;
//Add Start Date
const currentDate = new Date();
const subscriptionStartDate = currentDate.toLocaleDateString();
let subscriptionEndDate;

const subscriptionPackage = {
  "body-building": 350,
  cardio: 250,
  "body-building-cardio": 500,
};
const subscriptionPeriod = {
  3: 0.1,
  6: 0.15,
  12: 0.2,
};

//Calc Offer Function
function getOffer() {
  if (package.value && period.value != "none") {
    let result = subscriptionPackage[package.value] * period.value;
    if (period.value != "1") {
      let resultOffer = result - result * subscriptionPeriod[period.value];
      amount.innerHTML = `${resultOffer} EGP`;
    } else {
      amount.innerHTML = `${result} EGP`;
    }
  } else {
    amount.innerHTML = " ";
  }
}

//Add Data To Array and to Local Storage
let dataMember;
if (localStorage.member != null) {
  dataMember = JSON.parse(localStorage.member);
} else {
  dataMember = [];
}

submit.onclick = function (e) {
  e.preventDefault();
  let newMember = {
    name: name.value,
    nationalID: nationalID.value,
    phone: phone.value,
    age: age.value,
    weight: weight.value,
    height: height.value,
    package: package.value,
    period: period.value,
    coach: coach.value,
    startDate: subscriptionStartDate,
    endDate: subscriptionEndDate,
    amount: amount.textContent,
  };
  if (name.value != "" && nationalID.value != "") {
    if (mood === "submit") {
      dataMember.push(newMember);
      localStorage.setItem("member", JSON.stringify(dataMember));
      smoothScroll("data-content");
    } else {
      dataMember[tmp] = newMember;
      mood = "submit";
      submit.textContent = "Submit";
      smoothScroll("data-content");
    }
    clearInputs();
  }
  showData();
};

//clear inputs
function clearInputs() {
  name.value = "";
  nationalID.value = "";
  phone.value = "";
  age.value = "";
  weight.value = "";
  height.value = "";
  package.value = "none";
  period.value = "none";
  coach.value = "none";
  amount.textContent = "";
}

// Read Data or Add New Member To The table

function showData() {
  let table = "";
  for (let i = 0; i < dataMember.length; i++) {
    //Add End Date
    subscriptionEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + parseInt(dataMember[i].period),
      currentDate.getDate()
    ).toLocaleDateString();
    //Data To Table
    table += `<tr>
    <td>${dataMember[i].name}</td>
    <td>${dataMember[i].nationalID}</td>
    <td>${dataMember[i].phone}</td>
    <td>${dataMember[i].age}</td>
    <td>${dataMember[i].weight} KG</td>
    <td>${dataMember[i].height} CM</td>
    <td>${dataMember[i].package}</td>
    <td>${dataMember[i].period} ${
      dataMember[i].period === "1" ? "Month" : "Months"
    }</td>
    <td>${dataMember[i].coach}</td>
    <td>${dataMember[i].startDate}</td>
    <td>${subscriptionEndDate}</td>
    <td>${dataMember[i].amount}</td>
    <td>
      <div>
        <button onClick=deletMember(${i}) class="setting-btns del-btn">Delete</button>
        <button onClick=updateMember(${i}) class="setting-btns upd-btn">Update</button>
      </div>
    </td>
  </tr>`;
  }
  document.querySelector(".table-body").innerHTML = table;

  //Show Count Of Member in <DeleteAll> Button
  if (dataMember.length > 0) {
    clearData.style.display = "inline-block";
    clearData.childNodes[1].textContent = dataMember.length;
  } else {
    clearData.style.display = "none";
  }
}
//Clear All Data
clearData.onclick = function () {
  // popupFunc();
  dataMember = [];
  localStorage.member = JSON.stringify(dataMember);
  showData();
};

//Remove Member Function
function deletMember(i) {
  dataMember.splice(i, 1);
  localStorage.member = JSON.stringify(dataMember);
  showData();
}

//Search For Member Function
//Search Mood Function
let searchMood = "name";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "search-name") {
    searchMood = "name";
  } else {
    searchMood = "phone";
  }
  search.placeholder = "Search By " + searchMood;

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataMember.length; i++) {
    if (searchMood == "name") {
      if (dataMember[i].name.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${dataMember[i].name}</td>
          <td>${dataMember[i].nationalID}</td>
          <td>${dataMember[i].phone}</td>
          <td>${dataMember[i].age}</td>
          <td>${dataMember[i].weight} KG</td>
          <td>${dataMember[i].height} CM</td>
          <td>${dataMember[i].package}</td>
          <td>${dataMember[i].period} ${
          dataMember[i].period === "1" ? "Month" : "Months"
        }</td>
          <td>${dataMember[i].coach}</td>
          <td>${dataMember[i].startDate}</td>
          <td>${subscriptionEndDate}</td>
          <td>${dataMember[i].amount}</td>
          <td>
            <div>
              <button onClick=deletMember(${i}) class="setting-btns del-btn">Delete</button>
              <button onClick=updateMember(${i}) class="setting-btns upd-btn">Update</button>
            </div>
          </td>
        </tr>`;
      }
    } else {
      if (dataMember[i].phone.includes(value)) {
        table += `
        <tr>
          <td>${dataMember[i].name}</td>
          <td>${dataMember[i].nationalID}</td>
          <td>${dataMember[i].phone}</td>
          <td>${dataMember[i].age}</td>
          <td>${dataMember[i].weight} KG</td>
          <td>${dataMember[i].height} CM</td>
          <td>${dataMember[i].package}</td>
          <td>${dataMember[i].period} ${
          dataMember[i].period === "1" ? "Month" : "Months"
        }</td>
          <td>${dataMember[i].coach}</td>
          <td>${dataMember[i].startDate}</td>
          <td>${subscriptionEndDate}</td>
          <td>${dataMember[i].amount}</td>
          <td>
            <div>
              <button onClick=deletMember(${i}) class="setting-btns del-btn">Delete</button>
              <button onClick=updateMember(${i}) class="setting-btns upd-btn">Update</button>
            </div>
          </td>
        </tr>`;
      }
    }
  }

  document.querySelector(".table-body").innerHTML = table;
}
//Update Member informations Function
function updateMember(i) {
  name.value = dataMember[i].name;
  nationalID.value = dataMember[i].nationalID;
  phone.value = dataMember[i].phone;
  age.value = dataMember[i].age;
  weight.value = dataMember[i].weight;
  height.value = dataMember[i].height;
  package.value = dataMember[i].package;
  period.value = dataMember[i].period;
  coach.value = dataMember[i].coach;
  amount.textContent = dataMember[i].amount;

  mood = "update";
  tmp = i;
  //Scroll to the Form
  smoothScroll("form-content");
  //Change Submit Button To Update
  submit.textContent = "Update";
}

//Smooth Scroll Function
function smoothScroll(addClassNameHere) {
  document.querySelector(`.${addClassNameHere}`).scrollIntoView({
    behavior: "smooth",
  });
}
/////
showData();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const result = confirm('Do you want to proceed?');
// if (result == true) {
//   // User clicked 'OK' (yes)
//   console.log(true);
// } else {
//   // User clicked 'Cancel' (no)
//   console.log(false);
// }

//Create PopUP
// function popupFunc() {
//   let parent = document.createElement("div");
//   parent.className = "popup-container";
//   let popup = `
//     <div class="popup-content">
//           <h3>Are You Sure To Delete All Members?</h3>
//           <div class="sure-btns">
//           <button id="yes">Yes</button>
//           <button id="no">No</button>
//           </div>
//   </div>`;

//   parent.innerHTML = popup;
//   appBody.appendChild(parent);
// }
