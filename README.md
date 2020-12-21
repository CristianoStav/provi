# Provi

## Visão Geral
Aplicação construida a partir do desafio proposto.

## Tecnologias e Bibliotecas
 - NodeJs;
 - Express;
 - Mongoose;
 - ESM;
 - Cors;
 - JsonWenToken;

## Iniciando a Aplicação
para iniciar aplicação, execute os comandos a seguir.

 ```
    $ npm instal
 ```
 ```
    $ npm start
 ``` 

## Rotas
Rotas da aplicação.


#### Todas as chamadas da aplicação (exeto o registro) devem conter o access_token, que é gerado no registro, no corpo da requisição

Registro - `POST` (http://localhost:3000/api/v1/register)
 - body: { email, password }

Usuario - `GET` (http://localhost:3000/api/v1/user)

CPF - `PATCH` (http://localhost:3000/api/v1/user/cpf)
 - body: { access_token, cpf }

Nome Completo - `PATCH` (http://localhost:3000/api/v1/user/full_name)
 - body: { access_token, full_name }

Data de Aniversário - `PATCH` (http://localhost:3000/api/v1/user/birthday)
 - body: { access_token, birthday }

Telefone - `PATCH` (http://localhost:3000/api/v1/user/phone)
 - body: { access_token, phone }

Endereço - `PATCH` (http://localhost:3000/api/v1/user/address)
 - body: { access_token, cep, street, number, complement, city, state }

Quantidade solicitada - `POST` (http://localhost:3000/api/v1/user/request_amount)
 - body: { access_token, request_amount }
  