# Skoob API (WIP 🛠️)

Esta API foi criada para ajudar a desenvolver aplicações que utilizam informações do [Skoob](https://skoob.com.br).

A API utiliza uma mistura de informações da API do Skoob e web scraping no site da Amazon para obter mais detalhes sobre o livro.

## Tecnologias

[Node.js](https://nodejs.org/) [Express.js](https://expressjs.com/) [Typescript](https://www.typescriptlang.org/) [MongoDB](https://www.mongodb.com/)

## Rotas da API

| Rota                                   | Descrição                                                                                 | Tipo de retorno  |
| :------------------------------------- | :---------------------------------------------------------------------------------------- | :--------------- |
| `/reviews/user/${userId}`              | Retorna todas as resenhas de um usuário                                                   | `Array<Review>`  |
| `/reviews/book/${bookId}`              | Retorna todas as resenhas de um livro                                                     | `Array<Reviews>` |
| `/book/${bookId}?tag=${amazonTag}`     | Retorna os dados de um livro,                                                             | `Book`           |
| `/user/${userId}`                      | Retorna os dados de um usuário                                                            | `User`           |
| `/search/book/${query}?limit=${limit}` | Retorna `${limit}` livros que contenham o termo `${query}`. O limite padrão é de 3 livros | `Array<Book>`    |

## Variáveis de ambiente

- `SKOOB_AUTH` - Cookies de autenticação de uma conta Skoob
  - Para conseguir os cookies, acesse o [Skoob](https://skoob.com.br), faça login, ou crie uma conta, e depois use `document.cookie` no console para copiar os cookies.
- `MONGO_URI` - URI do banco de dados MongoDB
  - Exemplo: `mongodb://localhost:27017/skoob`

## Todo list

- [x] Rota de livros
- [x] Rota de busca
- [x] Web scraping Amazon
- [X] Rota de usuários
- [X] Rota de resenhas
- [ ] Implementar MongoDB
  - Já funcionando na rota de usuários

## Bugs conhecidos

- Por enquanto nenhum bug foi encontrado. Mas se você encontrar um, por favor, envie um [issue](https://github.com/Rapoxo/skoob-api/issues/new)
