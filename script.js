function openClock() {
  document.getElementById("clockModal").classList.remove("hidden");
}

function closeClock() {
  document.getElementById("clockModal").classList.add("hidden");
}

function setTime() {
  let hour = document.getElementById("hour").value;
  let minute = document.getElementById("minute").value;
  let ampm = document.getElementById("ampm").value;

  hour = hour.padStart(2, '0');
  minute = minute.padStart(2, '0');

  const formattedTime = `${hour}:${minute} ${ampm}`;
  document.getElementById("taskTime").value = formattedTime;
  closeClock();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskTime = document.getElementById("taskTime");
  const taskText = taskInput.value.trim();
  const timeText = taskTime.value.trim();

  if (taskText === "" || timeText === "") {
    alert("Please enter both task and time.");
    return;
  }

  const taskItem = createTaskItem(taskText, timeText, false);
  document.getElementById("pendingList").appendChild(taskItem);

  taskInput.value = "";
  taskTime.value = "";
}

function createTaskItem(text, time, isCompleted) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  const taskLeft = document.createElement("div");
  taskLeft.classList.add("task-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  const label = document.createElement("label");
  label.textContent = `${text} 🕒 ${time}`;
  if (isCompleted) label.classList.add("completed");

  checkbox.addEventListener("change", function () {
    label.classList.toggle("completed");

    if (checkbox.checked) {
      document.getElementById("completedList").appendChild(li);
    } else {
      document.getElementById("pendingList").appendChild(li);
    }
  });

  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(label);
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.border = "none";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.fontSize = "18px";
  deleteBtn.style.marginLeft = "auto";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(taskLeft);
  li.appendChild(deleteBtn);

  return li;
}
