{
    const tasks = [];

const render = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
       
        <li class="list__item"
            ${task.done ? "class=list__item--done" : ""}
        >
            <button class="list__button js-done"></button>
            ${task.content} 
            <button class="list__button list__button--delete js-remove"></button> 
        </li>
      
        <hr>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    const doneButton = document.querySelector(".js-done");

    // doneButton.classList.toggle("list__item--done");

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
            tasks.splice(index, 1);
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