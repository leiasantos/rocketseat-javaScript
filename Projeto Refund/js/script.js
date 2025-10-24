//TODO: Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2")

//capturando entrada de valor do input (Valor da despesa)
amount.oninput = () =>{
  //* Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g,"");

  //! Transforma o valor em centavos.
  value = Number(value) / 100;

  //*Atualiza o valor do input
  amount.value = formatCurrencyBRL(value); 
}

function formatCurrencyBRL(value){
  //!Formata o valor no padrão BRL (Real Brasileiro).
 value = value.toLocaleString("pt-BR",{
  style: "currency",
  currency: "BRL",
 })

 //? Retorna o valor formatado
 return value;
}

//Captura o evento de submit do formulário para obter os valores

form.onsubmit = (event) =>{

//Previne o comportamento padrão de recarregar a página
event.preventDefault();

//Cria um objeto com os detalhes na nova despesa
  const  newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  expenseAdd(newExpense)
}

//Adiciona itens na lista
function expenseAdd(newExpense){
    try{
      //Criando o elemento de li (li)  para adicionar o item na lista (ul)
      const expenseItem = document.createElement("li");
      expenseItem.classList.add("expense");

      // Criando o icone da categoria
      const expenseIcon = document.createElement("img");
      expenseIcon.setAttribute("src",`assets/img/${newExpense.category_id}.svg`);
      expenseIcon.setAttribute("alt", b=newExpense.category_name);

      //Criando a info da despesa
      const expenseInfo = document.createElement("div");
      expenseInfo.classList.add("expense-info")

      //Criando o nome da despesa.
      const expenseName = document.createElement("strong");
      expenseName.textContent = newExpense.expense;

      //Criando a categoria da despesa
      const expenseCategory = document.createElement("span");
      expenseCategory.textContent = newExpense.category_name;

      //Adicionar nome e categoria na div das informações da despesa.
      expenseInfo.append(expenseName, expenseCategory);

      //Criando o valor da despesa
      const expenseAmount = document.createElement("span");
      expenseAmount.classList.add("expense-amount");
      expenseAmount.innerHTML = `
      <small>R$</small>
      ${newExpense.amount
        .toUpperCase()
        .replace("R$", "")}`;

      //Adicionando o icone de remover
      const removeIcon = document.createElement("img");
      removeIcon.classList.add("remove-icon");
      removeIcon.setAttribute("src","assets/img/remove.svg");
      removeIcon.setAttribute("alt", "remover");

      //Adiciona as informações no item
      expenseItem.append(expenseIcon, expenseInfo,expenseAmount, removeIcon);

      //Adiciona o item na lista
      expenseList.append(expenseItem)

      //Limpa o formulário

      formClear();

      //Atualiza os totais
      updateTotals()
    }
    catch(error){
      alert("Não foi possível atualizar a lista de despesas.");
      console.log(error);
    }
}

//Atualizar totais
  function updateTotals(){
    try{
    //Recupera todos os itens (li) da lista (ul)
      const items = expenseList.children;

    //Atualizando a quantidade de itens da lista
      expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

    // Variável para incrementar o total.
      let total = 0;

    // Percorre cada item (li) da lista(ul)
     for(let item = 0; item < items.length; item++){
       const itemAmount = items[item].querySelector(".expense-amount");

       //Remover caracteres não numéricos e substitui a vírgula pelo ponto
       let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

       //Converte o valor para float
       value = parseFloat(value);

       //Verifica se é um número válido
       if(isNaN(value)){
          return alert("Não foi possível calcular o total.");
       }
    //Incrementar o valor total.
    total += Number(value);
     }

    //Criando a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$"

    //Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    //Limpa o conteúdo do elemento
    expenseTotal.innerHTML = "";

    //Adiciona o simbolo da moeda 
    expenseTotal.append(symbolBRL, total);

    }catch(error){
      alert("Não foi possível atualizar os totais.")
      console.log(error);
    }
  }

  //Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function(event){
  //Verifica se o elemento clicado é o ícone de remover
  if(event.target.classList.contains("remove-icon")){
   //Obtém a li pai do elemento clicado.
   const item = event.target.closest(".expense");

   //Remove o item da lista
   item.remove();
  }

  //Atualiza os totais
  updateTotals()
});

function formClear(){
  //Limpa os inputs
  expense.value = "";
  category.value = "";
  amount.value = "";

  //coloca o foco no input amount
  expense.focus();
}