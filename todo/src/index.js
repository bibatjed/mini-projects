window.addEventListener('load',(e) => {

    
    const input  = document.querySelector(".input");
    const tasks = document.querySelector(".tasks");
    const submitButton = document.querySelector(".submit-task");
    const form = document.querySelector("#user-input");
    


    form.addEventListener('submit',(e) => {
        e.preventDefault();

        const userInput = input.value;

        if(!userInput){
            alert('Please enter a task');
            return;
        }
        

        const task = document.createElement('div');
        task.classList.add("task");

        const taskInput = document.createElement("input");
        taskInput.setAttribute("readonly","readonly");
        taskInput.value = userInput;
        task.appendChild(taskInput);

        const editButton = document.createElement('button');
        editButton.classList.add("edit");
        editButton.innerText = "Edit";
        task.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add("edit");
        deleteButton.innerText = "Delete";
        task.appendChild(deleteButton);
        tasks.appendChild(task);

        editButton.addEventListener('click',() => {

            if(editButton.innerText.toLocaleLowerCase() === "edit"){
                taskInput.removeAttribute("readonly");
                editButton.innerText = "Save";
            }else {
                let editInput = taskInput.value;
                if(!editInput){
                    alert('Please enter a task');
                    return
                }else {
                    taskInput.value = taskInput.value;
                    editButton.innerText = "Edit";
                    taskInput.setAttribute("readonly","readonly");
                }
            }
           
        });

        deleteButton.addEventListener('click',() => {
            tasks.removeChild(task);
        });



    });


});


function fade(elem){

}









