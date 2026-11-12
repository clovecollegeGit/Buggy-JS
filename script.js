let todoItems = [];

document.addEventListener("DOMContentLoaded", function () {

    loadItems();

    document.getElementById("addButton")
        .addEventListener("click", addItem);

    document.getElementById("todoInput")
        .addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                addItem();
            }

        });

    updateList();
});


function addItem() {

    const input = document.getElementById("todoInput");
    let newItem = input.value.trim();

    if (newItem !== "") {

        todoItems.push(newItem);

        input.value = "";

        saveItems();
        updateList();

        input.focus();

    } else {

        alert("Please enter a to-do item.");

    }
}

function updateList() {

    let list = document.getElementById("todoList");
    let emptyMessage = document.getElementById("emptyMessage");

    list.innerHTML = "";
    for (let i = 0; i < todoItems.length; i++) {

        let listItem = document.createElement("li");

        listItem.textContent = todoItems[i];

        // FIX: Capture the correct item index
        listItem.addEventListener("click", function () {

            removeItem(i);

        });

        list.appendChild(listItem);
    }

    emptyMessage.hidden = todoItems.length > 0;
}

function removeItem(index) {

    if (index >= 0 && index < todoItems.length) {

        todoItems.splice(index, 1);

        saveItems();
        updateList();

    }
}

function saveItems() {

    localStorage.setItem(
        "todoItems",
        JSON.stringify(todoItems)
    );

}

function loadItems() {

    const savedItems = localStorage.getItem("todoItems");

    if (savedItems !== null) {

        try {

            const parsedItems = JSON.parse(savedItems);

            if (Array.isArray(parsedItems)) {

                todoItems = parsedItems.filter(
                    item => typeof item === "string"
                );

            }

        } catch (error) {

            todoItems = [];

        }

    }

}