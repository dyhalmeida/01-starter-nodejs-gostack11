# Módulo 1 - NodeJS

O primeiro passo necessário para começar uma aplicação Node.Js é utilizando os gerenciadores NPM ou YARN.  Abaixo é um exemplo de uso dos gerenciadores para inicializar um projeto com o package.json padrão.

```bash
npm init -y
# ou
yarn init -y
```

---

### Depedências do projeto

Nesse exemplo de projeto de API com Node.JS é utilizado as bibliotecas `express`, `nodemon`, `uuidv4`. Entendi que o express é um mini-framework NodeJS para criação de um servidor HTTP, o nodemon é um módulo que faz um root reload no servidor sempre que há uma modificação no código fonte, ideal para o ambiente de desenvolvimento e o uuid é uma lib para gerar identificadores unicos e universal. Abaixo os comandos necessários para instala-los.

```bash
# Instalação
yarn add express uuidv4 && yarn add nodemon -D
```

---

### Configuração do script **nodemon**

Para que não seja necessário parar e inciar o serviço da API, toda vez que houver uma alteração no codigo, foi utilizado a  configuração abaixo para que as alterações seja interpretadas automáticamente pelo nodemon em segundo plano.

```json
{
	"main": "src/index.js",
	"scripts": {
		"dev": "nodemon"
	}
}

# O script acima pode ser executado com npm run dev ou yarn dev.
# O nodemon escutará todas as alterações do projeto tendo como arquivo 
# de entrada o src/index.js
```

---

### O index.js

Esse arquivo será o ponto de partida da API, nele será configurado as rotas e seus endpoits, métodos HTTP e Middlewares.

---

Dentro no arquivo **`index.js`** foi realizado a importação dos módulos necessários para o desenvolvimento da aplicação.

```jsx
/** src/index.js */
const express = require('express')
const {uuid, isUuid } = require('uuidv4');
```

---

Neste trecho do código é inicializado o servidor HTTP com o express na porta 3333 e também configurado um middleware global com app.use, adicionando o express.json() para que o servidor passe a entender JSON no corpo da requisição.

```jsx
/** src/index.js */
const app = express()
app.use(express.json())

app.listen(3333)
```

---

### A rota raiz e o método Http GET

O exemplo abaixo é uma configuração de uma rota **`/`**. A raiz da aplicação, que retornará um JSON com a mensagem de que o backend foi iniciado.

Uma rota é definida através de um método **HTTP**, neste caso **GET** com `app.get`, um caminho `'/'` e uma função anônima de middleware/callback `(request, response) => {}` para interceptar a requisição, processar algum dado e devolver uma resposta.

Os parâmetros da função anônima passada como callback são injetadas pelo proprio express.

```jsx
/** src/index.js */
app.get('/', (request, response) => {
  return response.status(200).json({ message: '🚀 Backend started' });
});
```

---

### A rota /projects e o método Http POST

O exemplo abaixo é uma configuração de rota para `**/projects**`, neste caso com a utilização do método POST com **`app.post`**, pois está rota receberá dados no corpo da requisição para inserção de dados e retornará o novo dado gerado.

```jsx
/** src/index.js */
const projects = []
app.post('/projects', (request, response) => {
	/** Desestruturação do body params pegando as propriedades title e owner */
  const { title, owner } = request.body
  const project = {
    id: uuid(),
    title,
    owner,
  };
  projects.push(project)
  return response.status(201).json(project)
})
```

---

### A rota /projects e o método Http GET

O exemplo abaixo é uma configuração de rota para `**/projects**`, neste caso com a utilização do método GET com **`app.get` .** Essa rota utiliza recursos de **`query params`** para realizar filtros de busca.

```jsx
/** src/index.js */
app.get('/projects', (request, response) => {
/** Desestruturação do query params pegando apenas a propriedade title */
  const { title } = request.query;

	// Aplicação do filtro
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;
  return response.json(results);
});
```

---

### A rota /projects e o método Http DELETE

O exemplo abaixo é uma configuração de rota para `**/projects/:id**`, neste caso com a utilização do método DELETE com **`app.delete` .** Essa rota utiliza recursos de **`route params`** para filtrar o recurso a ser excluido.

```jsx
/** src/index.js */
app.delete('/projects/:id', (request, response) => {
/** Desestruturação do route params pegando apenas a propriedade title */
  const { id } = request.params;

	// Aplicação do filtro com o id obtido no route params
  const projectIndex = projects.findIndex((project) => project.id === id);

	// Aplicação da regra
  if (projectIndex < 0) {
    return response.status(400).json(['Project not found']);
  }

	// Exclusão do recurso
  projects.splice(projectIndex, 1);
  return response.status(204).json();
});
```

---

### A rota /projects e o método Http PUT

O exemplo abaixo é uma configuração de rota para `**/projects/:id**`, neste caso com a utilização do método PUT com **`app.put` .** Essa rota utiliza recursos de **`route params`** para filtrar o recurso a ser excluido.

```jsx
/** src/index.js */
app.put('/projects/:id', (request, response) => {
/** Desestruturação do route params e body params */
  const { id } = request.params;
  const { title, owner } = request.body;

	// Aplicação do filtro
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex < 0) {
    return response.status(400).json(['Project not found']);
  }
  const project = { id, title, owner };
	// Atualização do recurso
  projects[projectIndex] = project;
  return response.json(project);
});
```

---

### Intercepatdores ou Middlewares

O exmeplo abaixo é uma configuração de middelwares para todas as rotas da aplicação.

Um Middleware é uma funçao que intecepta a requisição podendo ou não finaliza-lá.

```jsx
/** src/index.js */
const log = (request, response, next) => {
  const { method, url } = request;
  const logInfo = `${method.toUpperCase()}: ${url}`;
  console.time(logInfo); // Essa linha executa no momento da chamada deste middleware
  next(); // Chama o próximo middleware
  console.timeEnd(logInfo); /** Essa linha executa após o último middeware da rota se executado */
};
```

---

### Middleware que verifica se o id do recurso é válido

```jsx
/** src/index.js */
const checkIDProject = (request, response, next) => {
  const { id } = request.params;
  if (!isUuid(id)) {
		// Intecepta a requisição por completo e retorna a resposta
    return response.status(400).json(['Invalid Project ID']);
  }
  return next(); // Chama o próximo middleware
};
```