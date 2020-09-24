# Conceitos de API Rest

Uma API Rest é uma arquitetura que executa encima do processo de requisição e resposta entre cliente e servidor. O cliente faz a requisição para uma URL via Ajax, a URL contém um endpoint que corresponde a uma rota no servidor no qual o mesmo responde com uma resposta. Essa resposta é retornada para o cliente numa estrutura de dados como por exemplo **JSON.**

### Rotas utilizam métodos HTTP

- `GET` http://minhaapi.com/`users`
- `POST` http://minhaapi.com/`users`
- `PUT` http://minhaapi.com/`users`/**`1`**
- `DELETE` http://minhaapi.com/`users`/`1`

---

1. `GET`: Utilizado para buscar uma informação
2. `POST`: Utilizado para inserir uma informação
3. `PUT`: Utilizado para atualizar uma informação
4. `DELETE`: Utilizado para exlcuir uma informação

---

Nos exemplos de rotas acima o `/users` é o recurso. Já o número `1` depois do recurso é um **parâmetro** da rota.

---

### Benefícios

- Múltiplos clientes
- Protocolo de comunicação padronizado
- Comunicação com serviços externos

---

### Estrutura JSON (Mais utilizado na comunicação de API's)

Exemplo de uma estrutura **JavaScript Object Notation** (JSON)

```json
{
	"user": {
		"name": "Diego",
		"lastname": "Almeida",
		"email": "diego.almeida@mail.com,
		"password": "@123456"
	}
}
```

---

### Conteúdo da requisição

Exemplo de requisição para buscar usuários  de uma empresa

GET http://api.com/company/1/users?page=2

- `**GET**`: Método HTTP
- **`company`**: Rota
- **`users`**: Rota
- **`1`**: Parâmetro de rota
- **`?page=2`**: Parâmetro nomeado de consulta

---

POST http://api.com/company/1/users

```json
{
	"user": {
		"name": "Diego",
		"lastname": "Almeida",
		"email": "diego.almeida@mail.com,
		"password": "@123456"
	}
}
```

No exemplo acima é feito uma requisição do tipo POST para inserir um usuário na empresa de ID `1`, neste caso utiliza-se o corpo da requisição(`body`) para enviar uma estrutura de dados em JSON.

A utilização do body é comumente nos métodos `POST` e `PUT` e diferente dos parametros nomeados de consulta, estes não ficam visiveis na URL da requisição

Obs: Outro fator importante também são os `headers` no qual é utilizando para enviar qualquer tipo de informação adicional

### Tipos HTTP Code

Os HTTP code são retornados na resposta de uma requisição. É um código que informa qual o status da resposta.

- `1xx`: Status informativos

- `2xx`: Status de sucesso

    `200`: Sucesso

    `201`: Criado

- `3xx`: Status de redirecionamento

    `301`: Movido permanentemente

    `302`: Movido

- `4xx`: Status de erros do cliente

    `400`: Requisição mal feita (Cliente não enviou as informações necessárias)

    `401`: Não autorizado

    `404`: Não encontrado

- `5xx`: Status de erros do servidor

    `500`: Erro interno do servidor