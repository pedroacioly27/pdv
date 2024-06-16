# Projeto de API para Gestão de Produtos e Pedidos 📦

Este projeto é uma API desenvolvida com Node.js, Express e TypeORM para a gestão de categorias, produtos, clientes e pedidos. A aplicação permite o cadastro, atualização, listagem e exclusão dessas entidades, além de autenticação de usuários e autorização para acessar determinadas rotas.

## Funcionalidades
* Usuários: Cadastro, login, atualização de perfil e obtenção de perfil do usuário logado.
* Categorias: Cadastro, listagem e exclusão de categorias de produtos.
* Produtos: Cadastro, listagem, atualização e exclusão de produtos.
* Clientes: Cadastro, listagem, atualização e obtenção de detalhes de clientes.
* Pedidos: Criação de pedidos vinculados a clientes e produtos, com cálculo de valor total e controle de estoque.

## Tecnologias Utilizadas
* Node.js
* Express
* TypeORM
* PostgreSQL
* JSON Web Token (JWT) para autenticação
* bcrypt para hash de senhas
* dotenv para variáveis de ambiente

Estrutura do Projeto

```sh
├── src
│   ├── controllers
│   │   ├── CategorieController.ts
│   │   ├── ClientController.ts
│   │   ├── OrderController.ts
│   │   ├── ProductController.ts
│   │   └── UserController.ts
│   ├── entities
│   │   ├── Categorie.ts
│   │   ├── Client.ts
│   │   ├── Order.ts
│   │   ├── OrderProduct.ts
│   │   ├── Product.ts
│   │   └── User.ts
│   ├── helpers
│   │   └── api-error.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── repositories
│   │   ├── categorieRepository.ts
│   │   ├── clientRepository.ts
│   │   ├── orderProductRepository.ts
│   │   ├── orderRepository.ts
│   │   ├── productRepository.ts
│   │   └── userRepository.ts
│   ├── data-source.ts
│   ├── routes.ts
│   └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Instalação e Execução

### Pré-requisitos
* Node.js
* PostgreSQL

## Passos para Instalação

Clone o repositório

```sh
git clone https://github.com/pedroacioly27/pdv

cd pdv
```

## Instale as dependências
```sh
npm install
```

## Configure as variáveis de ambiente
Crie um arquivo <strong>.env</strong> na raiz do projeto e defina as seguintes variáveis

```sh
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu-usuario
DB_PASS=sua-senha
DB_NAME=nome-do-banco
JWT_PASS=sua-senha-secreta
PORT=3000
```

## Execute as migrações do banco de dados

```sh
npm run typeorm migration:run
```
## Inicie o servidor
```sh
npm start
```

## Uso
### Endpoints

#### Autenticação

<strong>POST</strong> /users: Cria um novo usuário.

<strong>POST</strong> /login: Realiza login do usuário.

#### Categorias

<strong>GET </strong>/categories: Lista todas as categorias.

<strong>POST</strong> /categories: Cria uma nova categoria.

<strong>DELETE</strong> /categories/:id: Deleta uma categoria.

#### Produtos
<strong>POST</strong> /products: Cria um novo produto.

<strong>GET </strong>/products: Lista todos os produtos.

<strong>GET </strong>/products/:id: Obtém um produto pelo ID.

<strong>PUT </strong>/products/:id: Atualiza um produto.

<strong>DELETE</strong> /products/:id: Deleta um produto.

#### Clientes

<strong>POST</strong> /clients: Cria um novo cliente.

<strong>GET </strong>/clients: Lista todos os clientes.

<strong>GET </strong>/clients/:id: Obtém um cliente pelo ID.

<strong>PUT </strong>/clients/:id: Atualiza um cliente.

#### Pedidos
<strong>POST</strong> /orders: Cria um novo pedido.

<strong>GET </strong>/orders: Lista todos os pedidos.

## Middleware de Autenticação

As rotas protegidas utilizam o middleware <strong>authMiddleware</strong> para verificar se o usuário está autenticado. O token JWT deve ser enviado no cabeçalho da requisição no formato:

```sh
Authorization: Bearer <token>
```

## Tratamento de Erros
Os erros são tratados pelo middleware errorMiddleware, que captura as exceções lançadas durante a execução das rotas e retorna a resposta apropriada ao cliente.


## Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.