//TODO cotações de moedas do dia.
const USD = 5.33;
const EUR = 6.25;
const GBP = 7.18;
const JPY = 0.036;
const CNY = 0.75;
const KRW = 0.0038;
const TRY = 0.13;
const MXN = 0.29;

//TODO Obtendo os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");


//! Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");    
});


//* Capturando o evento de submit do formulário
form.onsubmit = (event) => {
  event.preventDefault(); // impede o reload da página

  switch(currency.value){
    case "USD":
      convertCurrency(Number(amount.value), USD, "US$");
      break;
    case "EUR":
      convertCurrency(Number(amount.value), EUR, "€");
      break;
    case "GBP":
      convertCurrency(Number(amount.value), GBP, "£");
      break;
    case "JPY":
      convertCurrency(Number(amount.value), JPY, "¥");
      break;
    case "CNY":
      convertCurrency(Number(amount.value), CNY, "¥");
      break;
    case "KRW":
      convertCurrency(Number(amount.value), KRW, "₩");
      break;
    case "TRY":
      convertCurrency(Number(amount.value), TRY, "₺");
      break;
    case "MXN":
      convertCurrency(Number(amount.value), MXN, "M$");
      break;
  }
};


//TODO Função para converter a moeda
function convertCurrency(amount, price, symbol){
   try{
      // Exibindo a cotação da moeda selecionada (sempre BRL puro)
      description.textContent = `${symbol} 1 = ${formatCurrencyBRLPlain(price)}`;

      // Calculando o total
      let total = amount * price;

      if(isNaN(total)){
        return alert("Por favor, digite o valor corretamente para converter.");
      }

      // Exibindo o resultado final já com 'real/reais/centavos'
      result.textContent = formatCurrencyBRL(total);

      footer.classList.add("show-result");
   }
   catch(error){
      console.log(error);
      footer.classList.remove("show-result");
      alert("Não foi possível converter. Tente novamente.");
   }
}


//* Formata a moeda em Real Brasileiro (para cotação pura)
function formatCurrencyBRLPlain(value){
  const number = Number(value);

  // Se o valor for menor que 1, mostra até 4 casas
  if(number < 1){
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  }

  // Caso contrário, mostra no padrão normal (2 casas)
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}


//* Formata para resultado (com real/reais/centavos)
function formatCurrencyBRL(value){
  const number = Number(value);

  const formatted = number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });

  if(number < 1){
    return `${formatted} centavos`;
  } else if(number === 1){
    return `${formatted} real`;
  } else {
    return `${formatted} reais`;
  }
}
