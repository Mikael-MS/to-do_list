const input = document.getElementById('input');
const btn = document.getElementById('button');
const list = document.getElementById('list');
const card = document.getElementById('card');


function removeError() {
    let spanError = document.querySelectorAll('span');
    for(const span of spanError){
        card.removeChild(span);
    }
}


function removeItemTask(item){
    tasks.splice(tasks.indexOf(item.textContent),1);

    renderTasks(tasks);

    saveDataStorage(tasks);
}


function saveDataStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks(tasks) {
    
    list.innerHTML = '';

    for(let task of tasks){
    
        const itemLi = document.createElement('li');
         
        itemLi.addEventListener('click', function(){
             
            removeItemTask(itemLi)
        })

      
        itemLi.setAttribute('class', 'list-group-item list-group-item-action');
 
        itemLi.textContent = task;
       
        list.appendChild(itemLi);
    }
}

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks(tasks);

btn.addEventListener('click', function () {
    
    let inputValue = input.value;

    if (!inputValue) {

        removeError();
        
        const spanError = document.createElement('span');
        spanError.setAttribute('class', 'alert alert-warning');
        let textError = document.createTextNode('Você precisa adicionar uma tarefa');
        spanError.appendChild(textError);
        card.appendChild(spanError);

    } else {
        
        tasks.push(inputValue);

        input.value = "";

        renderTasks();

        removeError();

        saveDataStorage(tasks);
    }
})