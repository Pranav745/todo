var ToDoContainer = document.querySelector("#to-do");
var form = document.querySelector("form");
var datepicker = document.querySelector(".datepicker");
var todayDay = document.querySelector(".today-day");
var todayDate = document.querySelector(".date");
var CompleteTasks = document.querySelector(".completed-tast");
var InCompleteTasks = document.querySelector(".incompleted-tast");
var totalTasks = document.querySelector(".total");

window.onload = preloadActivities();

datepicker.addEventListener('change', changeData);

function changeTodayInfo() {
    var datePicker = document.querySelector(".datepicker");
    var selectedDate = new Date(datePicker.value);
    var dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    let temp = getDateFromPicker();
    todayDate.innerHTML = temp;
    todayDay.innerHTML = dayOfWeek;
}

function changeCount() {
    let key = getDateFromPicker();
    let data = JSON.parse(localStorage.getItem(key.toString())) ?? [];

    data.forEach((ele, i) => {
        if (data[i].status) {
            InCompleteTasks.innerHTML = parseInt(InCompleteTasks.textContent) + 1;
        } else {
            CompleteTasks.innerHTML = parseInt(CompleteTasks.textContent) + 1;
        }
        totalTasks.innerHTML = parseInt(totalTasks.textContent) + 1;
    })

}

function changeData() {
    changeTodayInfo();
    InCompleteTasks.innerHTML = 0;
    CompleteTasks.innerHTML = 0;
    totalTasks.innerHTML = 0;
    changeCount();
    showData();
}



function getDateFromPicker() {
    var selectedDate = document.querySelector(".datepicker").value;
    return selectedDate;
}


function preloadActivities() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    var formattedDate = yyyy + '-' + mm + '-' + dd;

    document.querySelector(".datepicker").value = formattedDate;
    changeTodayInfo();
    changeCount()


}







form.addEventListener("submit", (e) => {
    let todo = e.target.work.value;
    let currentDate = getDateFromPicker();
    let workStatus = true;
    let data = JSON.parse(localStorage.getItem(currentDate.toString())) ?? [];



    let flag = 0;
    for (let ele of data) {
        if (ele.work == todo) {
            flag = 1;
        }
    }
    if (flag == 1) {
        alert("enter somthing new ");
    } else {

        data.push({
            'work': todo,
            'status': workStatus
        });
        localStorage.setItem(currentDate.toString(), JSON.stringify(data));

        InCompleteTasks.innerHTML = parseInt(InCompleteTasks.textContent) + 1
        totalTasks.innerHTML = parseInt(totalTasks.textContent) + 1;
    }

    showData();
    e.target.reset();
    e.preventDefault();
})





let showData = () => {
    let key = getDateFromPicker();
    let data = JSON.parse(localStorage.getItem(key.toString())) ?? [];
    let finalData = '';
    console.log("jhsdgduyfgg");
    if(data.length === 0){
        document.querySelector("#to-do").classList.add('empty-list');
    }else{
        document.querySelector("#to-do").classList.remove('empty-list');
    }
    data.forEach((element, i) => {
        if (data[i].status) {

            finalData +=
                `<li class="task-incomplete">
                <div>
                    <input type="checkbox" class="work-done" onclick='changeStatus(this,${i})'>
                    <span>${element.work}</span>
                </div>
                
                <i class="fa-solid fa-trash" onclick='removeData(${i})'  style="color: #131314;  cursor: pointer;"></i>
            </li>`
        } else {
            finalData +=
                `<li class="task-complete">
                <div>
                    <input type="checkbox" class="work-done" onclick='changeStatus(this,${i})' checked>
                    <span>${element.work}</span>
                </div>
                <i class="fa-solid fa-trash" onclick='removeData(${i})' style="color: #131314; text-decoration: none;  cursor: pointer;"></i>
            </li>`
        }
    })

    ToDoContainer.innerHTML = finalData;
}

let removeData = (i) => {
    let key = getDateFromPicker();
    let data = JSON.parse(localStorage.getItem(key.toString())) ?? [];

    if (data[i].status) {
        InCompleteTasks.innerHTML = parseInt(InCompleteTasks.textContent) - 1;
    }
    else {
        CompleteTasks.innerHTML = parseInt(CompleteTasks.textContent) - 1;
    }
    totalTasks.innerHTML = parseInt(totalTasks.textContent) - 1;

    data.splice(i, 1);
    localStorage.setItem(key.toString(), JSON.stringify(data));
    showData()
}



function changeStatus(checkbox, i) {

    let key = getDateFromPicker();

    let data = JSON.parse(localStorage.getItem(key.toString())) ?? [];
    var listItem = checkbox.parentNode.parentNode; // Get the parent <li> element

    if (data[i].status) {
        CompleteTasks.innerHTML = parseInt(CompleteTasks.textContent) + 1;
        InCompleteTasks.innerHTML = parseInt(InCompleteTasks.textContent) - 1;
        listItem.classList.remove('task-incomplete');
        listItem.classList.add('task-complete');

    }
    if (!data[i].status) {
        CompleteTasks.innerHTML = parseInt(CompleteTasks.textContent) - 1;
        InCompleteTasks.innerHTML = parseInt(InCompleteTasks.textContent) + 1;
        listItem.classList.remove('task-complete');
        listItem.classList.add('task-incomplete');
    }



    if (data[i].status) {

        data[i].status = false;
    }
    else {
        data[i].status = true;
    }

    localStorage.setItem(key.toString(), JSON.stringify(data));
}

showData();