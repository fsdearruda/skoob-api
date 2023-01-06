# Skoob API (WIP 🛠️)

Esta API foi criada para ajudar a desenvolver aplicações que utilizam informações do [Skoob](https://skoob.com.br).

A API utiliza uma mistura de informações da API do Skoob e web scraping no site da Amazon para obter mais detalhes sobre o livro.

## Tecnologias e ferramentas utilizadas

[Node.js](https://nodejs.org/) [Express.js](https://expressjs.com/) [Typescript](https://www.typescriptlang.org/) [MongoDB](https://www.mongodb.com/) [CheerioJS](https://github.com/cheeriojs/cheerio) [Axios](https://github.com/axios/axios)

## Variáveis de ambiente

Antes de iniciar o servidor você deve criar um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

- `SKOOB_AUTH` - Cookies de autenticação de uma conta Skoob
  - Para conseguir os cookies, acesse o [Skoob](https://skoob.com.br), faça login, ou crie uma conta, e depois use `document.cookie` no console para copiar os cookies.
- `MONGO_URI` - URI do banco de dados MongoDB
  - Exemplo: `mongodb://localhost:27017/skoob`

## Instalação

Antes de instalar, certifique-se de ter [Node.js](https://nodejs.org/) e [Yarn](https://yarnpkg.com/) instalados.

Faça o clone do repositório e instale as dependências:

```bash
# Clonar repositório
git clone https://github.com/Rapoxo/skoob-api.git
cd skoob-api

# Instalar dependências
yarn install

# Iniciar servidor
yarn dev
```

## Rotas da API

| Rota                                       | Descrição                                                                                                                  | [Tipo de retorno](https://github.com/Rapoxo/skoob-api/tree/main/src/%40types) |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `/reviews/users/${userId}`                 | Retorna todas as resenhas de um usuário.                                                                                   | `Review[]`                                                                    |
| `/reviews/books/${bookId}`                 | Retorna todas as resenhas de um livro.                                                                                     | `Review[]`                                                                    |
| `/books/${bookId}`                         | Retorna os dados de um livro.                                                                                              | `Book`                                                                        |
| `/books/${bookId}/price?tag=${amazon_tag}` | Retorna preço e link da Amazon de um livro. A query `amazon_tag` Pode ser usada para adicionar link de afiliado da amazon. | `Price`                                                                       |
| `/users/${userId}`                         | Retorna os dados de um usuário.                                                                                            | `User`                                                                        |
| `/users/${userId}/bookshelf`               | Retorna estante de livros de um usuário.                                                                                   | `Bookshelf`                                                                   |
| `/search/books/${query}?limit=${limit}`    | Retorna `limit` livros que contenham o termo `query`. A quantidade padrão é de 3 livros.                                   | `Book[]`                                                                      |

## Todo list

- [ ] Deploy na Vercel
- [ ] Rota de preços
  - [x] Retorna preço e link da Amazon de um livro
  - [ ] Retorna opções de preço do livro físico e digital (se disponíveis)
  - [ ] Faz cache dos preços no banco de dados
- [ ] Rota de resenhas
  - [x] Lista todas as resenhas de um usuário
  - [ ] Lista todas as resenhas de um livro

## Bugs conhecidos

- Por enquanto nenhum bug foi encontrado. Mas se você encontrar um, por favor, envie um [issue](https://github.com/Rapoxo/skoob-api/issues/new)
