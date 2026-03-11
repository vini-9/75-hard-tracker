const tasks = document.querySelectorAll(".task");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const dayText = document.getElementById("day-text");
const finishButton = document.getElementById("finish-day");
const resetButton = document.getElementById("reset");

const historyList = document.getElementById("history-list");
const heatmap = document.getElementById("heatmap");

let currentDay = 1;
let history = [];

loadData();

tasks.forEach(task => {
task.addEventListener("change", () => {
saveTasks();
updateProgress();
});
});

finishButton.addEventListener("click", finishDay);

resetButton.addEventListener("click", () => {

if(confirm("Tem certeza que deseja resetar o desafio?")){

localStorage.removeItem("75hardData");
location.reload();

}

});

function updateProgress(){

let completed = 0;

tasks.forEach(task=>{
if(task.checked){
completed++;
}
});

const percentage = Math.round((completed / tasks.length) * 100);

progressBar.style.width = percentage + "%";
progressText.textContent = percentage + "% completo";

}

function saveTasks(){

const taskStates = [];

tasks.forEach(task=>{
taskStates.push(task.checked);
});

const data = {
day: currentDay,
tasks: taskStates,
history: history
};

localStorage.setItem("75hardData", JSON.stringify(data));

}

function loadData(){

const savedData = JSON.parse(localStorage.getItem("75hardData"));

if(savedData){

currentDay = savedData.day;
history = savedData.history || [];

tasks.forEach((task,index)=>{
task.checked = savedData.tasks[index];
});

}

updateDay();
updateProgress();
renderHistory();
renderHeatmap();

}

function updateDay(){

dayText.textContent = `Dia ${currentDay} / 75`;

}

function finishDay(){

if(currentDay > 75){
alert("Você já completou o desafio!");
return;
}

let allCompleted = true;

tasks.forEach(task=>{
if(!task.checked){
allCompleted = false;
}
});

if(!allCompleted){

alert("Você precisa completar todas as tarefas.");
return;

}

history.push(true);

currentDay++;

tasks.forEach(task=>{
task.checked = false;
});

saveTasks();

updateDay();
updateProgress();
renderHistory();
renderHeatmap();

if(currentDay > 75){
alert("Parabéns! Você completou o 75 Hard!");
}

}

function renderHistory(){

historyList.innerHTML = "";

history.forEach((day,index)=>{

const div = document.createElement("div");

div.classList.add("history-item");

div.textContent = `Dia ${index+1}`;

historyList.appendChild(div);

});

}

function renderHeatmap(){

heatmap.innerHTML = "";

for(let i=0;i<75;i++){

const square = document.createElement("div");

square.classList.add("heatmap-day");

if(history[i]){
square.classList.add("completed");
}

heatmap.appendChild(square);

}

}