/*
 <ul class="todo-items-container" id="todoItemsContainer">
                            <li class="todo-item-container d-flex flex-row">
                                <input type="checkbox" class="checkbox-input" id="checkboxInput">
                                <div class="label-container d-flex flex-row">
                                    <label for="checkboxInput" class="checkbox-label">
                                        Learn HTML
                                    </label>
                                    <div class="delete-icon-container m-auto">   
                                        <i class="fa-sharp fa-solid fa-trash"></i>
                                    </div>
                                </div> 
                            </li>
    </ul>
*/

/*let todoList=[
    {
        text : "Learn HTML",
        uniqueKey : 1
    },

    {
        text : "Learn CSS",
        uniqueKey : 2
    },

    {
        text : "Learn JavaScript",
        uniqueKey : 3
    }
]*/


let saveButton=document.getElementById("saveTodoButton");

saveButton.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

//localStorage.removeItem("todoList"); 
function getTodoListFromLocalStorage()
{
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parsedTodoList=JSON.parse(stringifiedTodoList);
    if(parsedTodoList === null)
    {
        return[];
    }
    else{
        return parsedTodoList;
    }
}

let todoList=getTodoListFromLocalStorage();

let todoCount=todoList.length;       //length of intial todo-list

function onToDoStatusChanged(checkboxId,labelId,todoId)
{
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    /*if(checkboxElement.checked === true){
        labelElement.classList.add("checked");
    }
    else{
        labelElement.classList.remove("checked");
    }*/
    labelElement.classList.toggle("checked");

    let todoItemIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueKey;
        if(eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }
    });
    let todoObject=todoList[todoItemIndex];
    if(todoObject === true){
        todoObject.isChecked=false;
    }
    else{
        todoObject.isChecked=true;
    }
}

function onDeleteToDo(todoId)
{
    let todoElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement); 
    let deletedTodoItemIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.uniqueKey;
        if(eachTodoId === todoId){
            return true;
        }
        else{
            return false;
        }
    });
    console.log(deletedTodoItemIndex);
    todoList.splice(deletedTodoItemIndex);
}



function createAndAppend(todo){
    let checkboxId="checkbox"+todo.uniqueKey;  //creating a unique id for each checkbox
    let labelId="label"+todo.uniqueKey;        //creating a unique id for each label-item
    let todoId="todo"+todo.uniqueKey;          //creating a unique id for each todo item

    let todoElement=document.createElement("li");
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement=document.createElement("input");
    inputElement.type="checkbox";
    inputElement.classList.add("checkbox-input");
    inputElement.id=checkboxId;
    inputElement.checked=todo.isChecked;
    


    inputElement.onclick=function()
    {
        onToDoStatusChanged(checkboxId,labelId,todoId);
    }

    todoElement.appendChild(inputElement);

    let labelContainer=document.createElement("div");
    labelContainer.classList.add("label-container","d-flex","flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text;
    labelElement.id=labelId;                  //adding label id
    
    if(todo.isChecked === true){
        labelElement.classList.add("checked");
    }

    labelContainer.appendChild(labelElement);
    

    let deleteIconContainer=document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container","m-auto");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon=document.createElement("i");
    deleteIcon.classList.add("fa-sharp","fa-solid","fa-trash");
    
    deleteIcon.onclick=function()
    {
        onDeleteToDo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);

}

/*createAndAppend(todoList[0]);
createAndAppend(todoList[1]);
createAndAppend(todoList[2]);*/

for(let todo of todoList){
    createAndAppend(todo);
}

function onAddToDo()                                              //function for adding new todo-item
{
    let userInputElement=document.getElementById("todoUserInput");
    let userInputValue=userInputElement.value;
    if(userInputValue === "")
    {
        alert("Enter Valid Text");
        return;
    }
    todoCount=todoCount+1;
    let newTodo={
        text : userInputValue,
        uniqueKey : todoCount,
        isChecked : false
    }
    todoList.push(newTodo);

    createAndAppend(newTodo);    

}

let addButtonElement=document.getElementById("addTodoButton");
addButtonElement.onclick=function()
{
    onAddToDo();
}


//console.log(todoItemsContainer);