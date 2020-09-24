# Conceitos do Node.JS

> `Node.JS` é uma plataforma de desenvolvimento backend, que utiliza a linguagem de programação JavaScript.

O Node.JS trata-se de um software open-source e cross-platform além de um runtime JavaScript que executa código JS a nível de backend.

Escrito em C++ e implementado com base no interpretador V8 JavaScript do Google, utilizando no Google Chrome.

### Características

A principal diferença do Node.JS para demais tecnologias do mesmo nincho é a sua execução de requisições ou eventos em `single-thread`, no qual apenas uma `thread*` é responsável por executar o código JavaScript, sem a necessidade de criar uma nova thread que acabaria utilizando mais recursos computacionais como por exemplo memória **RAM.**

### Event Loop

O `Event Loop` é uma arquitetura baseada em eventos e possui como ponto central a `Call Stack`(Uma pilha de eventos).

A `Call Stack` é uma pilha de funções que são monitoradas e executadas pelo Event Loop. Essa pilha de funções são do tipo LIFO(Last In, First Out), no qual a última função que entra na pilha é a primeira a ser executada.

### Non-blocking I/O

É arquitetura não bloqueante de `Input` e `Output` na qual uma requisição **não bloquea o processamento**. 

### Frameworks

- Express
    1. Sem opinião
    2. Microserviços
    3. Ótimo para iniciar
- Adonis.JS || Nest.JS
    1. Opinados