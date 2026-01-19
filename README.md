# 🥡 EfoodAPI

![GitHub repo size](https://img.shields.io/github/repo-size/SEU_USUARIO/EfoodAPI?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/SEU_USUARIO/EfoodAPI?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/SEU_USUARIO/EfoodAPI?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/SEU_USUARIO/EfoodAPI?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/SEU_USUARIO/EfoodAPI?style=for-the-badge)

> Uma API RESTful robusta para gestão de restaurantes e pedidos de delivery, desenvolvida como parte do desafio [NOME DO CURSO/BOOTCAMP, ex: EBAC Full Stack].

---

## 💻 Sobre o Projeto

A **EfoodAPI** é o backend responsável por orquestrar todo o ecossistema de um aplicativo de delivery. Ela gerencia desde o cadastro de restaurantes e cardápios até o fluxo complexo de realização e acompanhamento de pedidos.

A aplicação foi construída focando em:
* Escalabilidade e Clean Code.
* Tratamento de exceções personalizado.
* Modelagem de dados relacional complexa.

---

## ⚙️ Funcionalidades

- [x] **Cadastro de Restaurantes:** Gerenciamento completo (CRUD), incluindo tipos de cozinha e horário de funcionamento.
- [x] **Gestão de Produtos:** Adição de pratos ao cardápio com fotos e descrições.
- [x] **Fluxo de Pedidos:** Emissão, confirmação, entrega e cancelamento de pedidos.
- [x] **Controle de Acesso:** Autenticação e permissões (Admin vs Usuário).
- [x] **Formas de Pagamento:** Gerenciamento de métodos aceitos por cada restaurante.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

* **Linguagem:** [Java 17 / Node.js / Python]
* **Framework:** [Spring Boot 3 / Express / Django]
* **Banco de Dados:** [MySQL / PostgreSQL / MongoDB]
* **Migrações:** [Flyway / Liquibase]
* **ORM:** [JPA / Hibernate / Prisma]
* **Segurança:** [Spring Security / JWT]
* **Build:** [Maven / Gradle / NPM]

---

## 🎨 Diagrama de Entidade-Relacionamento (DER)

> (Opcional: Coloque uma imagem do seu diagrama aqui ou use o Mermaid abaixo)

```mermaid
erDiagram
    RESTAURANTE ||--o{ PRODUTO : possui
    RESTAURANTE ||--o{ PEDIDO : recebe
    USUARIO ||--o{ PEDIDO : faz
    PEDIDO ||--|{ ITEM_PEDIDO : contem
    FORMA_PAGAMENTO }|--|{ RESTAURANTE : aceita
