let notificationBtn = document.getElementById("notificationBtn");
let taskName = document.getElementById("taskName");
let hours = document.getElementById("hours");
let minuts = document.getElementById("minuts");
let startDate = document.getElementById("startDate");
let addTask = document.getElementById("addTask");
let tasks = document.querySelector(".tasks");
let Data;
let EnableNotification = false;

notificationBtn.addEventListener("click", async () => {
    EnableNotification = true;
    if (Notification.permission === "granted") {
        notificationBtn.disabled = true;
        notificationBtn.style.backgroundColor = "gray";
        notificationBtn.textContent = "Notification Enabled";
        return;
    }

    let permission = await Notification.requestPermission();

    if (permission === "granted") {
        notificationBtn.disabled = true;
        notificationBtn.style.backgroundColor = "gray";
        notificationBtn.textContent = "Notification Enabled";
    }
    else {
        alert("Notification permission denied");
    }

});


const db = idb.open('Tasks', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("DailyTasks")) {
        upgradeDb.createObjectStore("DailyTasks", { keyPath: 'TaskName' });
    }
});


addTask.addEventListener("click", async function () {
    if (!EnableNotification) {
        alert("You must Enable Notification");
        return;
    }

    if (!taskName.value) {
        alert("Enter task name");
        return;
    }

    let now = Date.now();

    let triggerTime =
        now +
        (Number(hours.value) * 60 * 60 * 1000) +
        (Number(minuts.value) * 60 * 1000);

    Data = {
        TaskName: taskName.value,
        triggerTime: triggerTime,
        done: false
    };

    const mydb = await db;
    const tx = mydb.transaction('DailyTasks', 'readwrite');
    const store = tx.objectStore('DailyTasks');

    try {
        await store.add(Data);
        console.log("Task Added");
        updateTaskSection(Data);
        clearInputs();
    } catch (err) {
        tx.abort();
        console.log(err);
    }
});


function updateTaskSection(task) {
    tasks.style.display = "block";

    let taskTime = new Date(task.triggerTime);

    let div = document.createElement("div");
    div.className = "task-item";
    div.dataset.name = task.TaskName;

    div.innerHTML = `   
        <span>${task.TaskName}</span>
        <small>${taskTime.toLocaleString()}</small>
    `;

    if (task.done) {
        div.style.textDecoration = "line-through";
        div.style.color = "gray";
    }

    tasks.appendChild(div);
}

function clearInputs() {
    taskName.value = "";
    hours.value = "";
    minuts.value = "";
    startDate.value = "";
}


async function checkTasks() {

    if (Notification.permission !== "granted") return;

    const mydb = await db;
    const tx = mydb.transaction("DailyTasks", "readwrite");
    const store = tx.objectStore("DailyTasks");

    const allTasks = await store.getAll();
    const now = Date.now();

    // Step 1: Update DB first (inside transaction)
    let tasksToNotify = [];

    for (const task of allTasks) {
        if (!task.done && now >= task.triggerTime) {
            task.done = true;
            await store.put(task);
            tasksToNotify.push(task);
        }
    }

    await tx.done;

    // Step 2: Show notifications AFTER transaction is closed
    if (tasksToNotify.length > 0) {
        const reg = await navigator.serviceWorker.ready;

        for (const task of tasksToNotify) {
            await reg.showNotification("Task Reminder", {
                body: task.TaskName,
                icon: 'images/notification-flat.png',
                actions: [
                    { action: 'explore', title: 'Link' },
                    { action: 'close', title: 'close Notification' }
                ]
            });
        }

        // Step 3: Reload UI
        await loadTasks();
    }
}


async function loadTasks() {
    const mydb = await db;
    const tx = mydb.transaction("DailyTasks", "readonly");
    const store = tx.objectStore("DailyTasks");

    const allTasks = await store.getAll();

    tasks.innerHTML = "";

    allTasks.forEach(task => {
        updateTaskSection(task);
    });
}


loadTasks();

setInterval(checkTasks, 1000);