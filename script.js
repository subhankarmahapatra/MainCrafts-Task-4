// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}


// =========================
// CONTACT FORM
// VALIDATION + LOCALSTORAGE
// TASK 3
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();


        // =========================
        // VALIDATION
        // =========================

        if (name === "") {

            alert("Please enter your name.");
            return;

        }

        if (email === "") {

            alert("Please enter your email.");
            return;

        }

        if (message === "") {

            alert("Please enter your message.");
            return;

        }


        // =========================
        // GET EXISTING SUBMISSIONS
        // =========================

        let submissions =
            JSON.parse(localStorage.getItem("contacts")) || [];


        // =========================
        // SAVE NEW SUBMISSION
        // =========================

        submissions.push({

            name: name,
            email: email,
            message: message

        });


        localStorage.setItem(
            "contacts",
            JSON.stringify(submissions)
        );


        // =========================
        // SUCCESS MESSAGE
        // =========================

        alert("Form submitted successfully!");


        // Clear form
        contactForm.reset();

    });

}


// =========================
// DISPLAY SUBMISSIONS
// TASK 3
// =========================

const submissionList = document.getElementById("list");

if (submissionList) {

    const submissions =
        JSON.parse(localStorage.getItem("contacts")) || [];


    if (submissions.length === 0) {

        submissionList.innerHTML =
            "<li>No submissions yet.</li>";

    } else {

        submissions.forEach(function (submission) {

            const listItem = document.createElement("li");

            listItem.innerHTML = `
                <strong>Name:</strong> ${submission.name}<br>
                <strong>Email:</strong> ${submission.email}<br>
                <strong>Message:</strong> ${submission.message}
            `;

            submissionList.appendChild(listItem);

        });

    }

}


// =====================================================
// TASK 4
// TASK MANAGER DASHBOARD
// CREATE - READ - UPDATE - DELETE
// =====================================================


// =========================
// TASK STORAGE
// =========================

let tasks =
    JSON.parse(localStorage.getItem("maincraftsTasks")) || [];


// =========================
// ADD TASK
// CREATE
// =========================

function addTask() {

    const taskInput =
        document.getElementById("taskInput");


    if (!taskInput) {
        return;
    }


    const taskText =
        taskInput.value.trim();


    // Check empty task
    if (taskText === "") {

        alert("Please enter a task.");
        return;

    }


    // Create new task
    const newTask = {

        id: Date.now(),

        title: taskText

    };


    // Add task to array
    tasks.push(newTask);


    // Save to LocalStorage
    saveTasks();


    // Clear input
    taskInput.value = "";


    // Display tasks
    displayTasks();

}


// =========================
// DISPLAY TASKS
// READ
// =========================

function displayTasks(taskArray = tasks) {

    const taskList =
        document.getElementById("taskList");


    if (!taskList) {
        return;
    }


    // Clear old list
    taskList.innerHTML = "";


    // No tasks
    if (taskArray.length === 0) {

        taskList.innerHTML = `
            <li>
                <span>No tasks found.</span>
            </li>
        `;

        return;

    }


    // Display each task
    taskArray.forEach(function (task) {

        const listItem =
            document.createElement("li");


        listItem.innerHTML = `

            <span>${escapeHTML(task.title)}</span>

            <div>

                <button
                    onclick="editTask(${task.id})"
                    class="edit-btn">
                    Edit
                </button>

                <button
                    onclick="deleteTask(${task.id})"
                    class="delete-btn">
                    Delete
                </button>

            </div>

        `;


        taskList.appendChild(listItem);

    });

}


// =========================
// UPDATE TASK
// =========================

function editTask(id) {

    const task =
        tasks.find(function (item) {

            return item.id === id;

        });


    if (!task) {
        return;
    }


    // Ask user for updated task
    const updatedTask =
        prompt(
            "Update your task:",
            task.title
        );


    // Cancel button
    if (updatedTask === null) {
        return;
    }


    const newTitle =
        updatedTask.trim();


    // Empty task
    if (newTitle === "") {

        alert("Task cannot be empty.");
        return;

    }


    // Update task
    task.title = newTitle;


    // Save changes
    saveTasks();


    // Refresh task list
    displayTasks();

}


// =========================
// DELETE TASK
// =========================

function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {
        return;
    }


    // Remove task
    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


    // Save changes
    saveTasks();


    // Refresh list
    displayTasks();

}


// =========================
// SEARCH TASKS
// =========================

function searchTasks() {

    const searchBox =
        document.getElementById("searchBox");


    if (!searchBox) {
        return;
    }


    const searchText =
        searchBox.value
            .toLowerCase()
            .trim();


    // Filter tasks
    const filteredTasks =
        tasks.filter(function (task) {

            return task.title
                .toLowerCase()
                .includes(searchText);

        });


    // Display filtered tasks
    displayTasks(filteredTasks);

}


// =========================
// SAVE TASKS
// LOCALSTORAGE
// =========================

function saveTasks() {

    localStorage.setItem(
        "maincraftsTasks",
        JSON.stringify(tasks)
    );

}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}


// =========================
// LOAD TASKS WHEN PAGE OPENS
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayTasks();

    }
);