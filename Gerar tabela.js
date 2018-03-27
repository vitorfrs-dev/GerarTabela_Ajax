//Um Script que gera uma tabela com Nome, idade e gênero

//Declara as variáveis da tabela a ser gerada e do botão que despara a função
var tabelaDeNomesEL, btnGerarTabelaEL;

//referência os elementos da página

tabelaDeNomesEL = document.querySelector('#nameTable');
btnGerarTabelaEL = document.querySelector('#btnGerarTabela');

//Evento a ser disparado quando clicar no botão
btnGerarTabela.addEventListener('click',function() {
	loadText();
});

/// Array com o cadastro das pessoas - puxa os dados do arquivo cadastros.json
var people;

//Variavel que informa se a tabela já foi criada
var isReady = false;

//função que irá gerar a tabela
function gerarTabela(array) {
	//se a tabela não foi criada executa o laço for
	if(!isReady) {
		for (let i = 0; i < array.length; i++) {
			//Variaveis que possuem o valor das propriedades de cada pessoas
			let name, age, gender;
			name = array[i].name;
			age = array[i].age;
			gender = array[i].gender;

			//Chama a função com os dados armazenados nas variáveis acima
			createRow(name, age, gender);
		}

		isReady = true; //tabela criada
	}

	else {
		//Se a tabela já foi criada 
		alert('A tabela já foi gerada');
	}
}


function createRow(nome, idade, genero) {

	//Cria os elementos tr e td
	var tr, td1, td2,td3;
	tr = document.createElement('tr');
	td1 = document.createElement('td');//Vai Conter o nome
	td2 = document.createElement('td');//Vai Conter a idade
	td3 = document.createElement('td');//Vai Conter o Gênero

	//Cria um elemento text node e coloca os valores passados nos parâmetros nome, idade, genero
	var texto1, texto2, texto3;
	texto1 = document.createTextNode(nome);
	texto2 = document.createTextNode(idade);
	texto3 = document.createTextNode(genero);

	//Coloca o texto dentro da célula
	td1.appendChild(texto1);
	td2.appendChild(texto2);
	td3.appendChild(texto3);
	
	//Coloca as células dentro da row
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);


	//Coloca a row no final da tabela
	tabelaDeNomesEL.lastChild.appendChild(tr);
}


//Requisição ajax

function loadText() {
	var request = new XMLHttpRequest;

	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//Transforma a resposta em um array e depois
			//Chama "gerarTabela" com o array gerado.
			people = JSON.parse(this.responseText);
			gerarTabela(people);
			
		}
	};

	request.open('GET', "cadastros.json", true);
	request.send();

}
