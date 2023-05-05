const input = document.getElementById('input');
console.log(input)
const btn = document.getElementById('button');
console.log(btn)
const list = document.getElementById('list');
console.log(list)
const card = document.querySelector('.card');
console.log(card)



// converte o local storange JSON para array
const taskis = JSON.parse(localStorage.getItem('taskis')) || [];

function renderTaskis() {

    list.innerHTML = '';

    for(let taski of taskis){
        //criar uma li para ser adicionada na lista 
        const itemLi = document.createElement('li');

        // cria evento de click na li 
        itemLi.addEventListener('click', function(){
            //remove item da lista através da função 
            removeItemTask(itemLi)
        })

        // atribuir uma classe a ela do bootstrap
        itemLi.setAttribute('class', 'list-group-item list-group-item-action');
        //adicionar na li um texto que é o valor do input
        itemLi.textContent = taski;
        //adicionar a li na lista 
        list.appendChild(itemLi);
    }
}

renderTaskis();

// Evento click no botão
btn.addEventListener('click', function () {
    // ao clicar no botão vamos pegar o valor do input
    let inputValue = input.value;

    // verifica se é o valor do input é vazio
    if (!inputValue) {

        //limpa msg de erro
        removeErro();
        
        // cria mensagem de erro
        const spanError = document.createElement('span');
        spanError.setAttribute('class', 'alert alert-warning');
        let textError = document.createTextNode('Você precisa adicionar uma tarefa');
        spanError.appendChild(textError);
        card.appendChild(spanError);

        
    } else {
        
        //adiconar o item do input a uma array
        taskis.push(inputValue);

        // imprimir array
        console.log(taskis);

        //esvazia o input
        input.value = "";

        //renderiza a tela e insere um valor na lista
        renderTaskis();

        //limpa msg de erro
        removeErro();

        // slava na local storange
        saveDataStorange();
    
    }
})


// função remove erro
function removeErro() {
    let spanError = document.querySelectorAll('span');
    for(const span of spanError){
        card.removeChild(span);
    }
}

//função remove item da array de taskis
function removeItemTask(item){
    taskis.splice(taskis.indexOf(item.textContent),1);

    renderTaskis();

    saveDataStorange();
}

// função que cria um local storange
function saveDataStorange() {
    localStorage.setItem('taskis', JSON.stringify(taskis));
}