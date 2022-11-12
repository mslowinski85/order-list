{
    const tasks = [];

const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
}

const doneTask = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
}


const render = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
       
        <li 
        class="list__item${task.done ? " list__item--done" : ""}"
        >
            <button class="list__button js-done"></button>
            ${task.content} 
            <button class="list__button list__button--delete js-remove"></button> 
        </li>
        <hr>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleButton, index) => {
        toggleButton.addEventListener("click", () => {
            doneTask(index);
            render();
        })
    })
     

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
            removeTask(index);
            render();
        });
        
    });
};

const addNewTask = (newTaskContent) => {
    tasks.push({
        content: newTaskContent
    });
    render();
}
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === ""){
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit)
    }

        init();
}