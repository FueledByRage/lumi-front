# 🌐 Frontend - Upload de Faturas

Este é o front-end da aplicação de upload e gerenciamento de faturas de energia elétrica.

A interface foi desenvolvida com foco em **usabilidade**, **responsividade** e **integração fluida** com a API backend.

---

## 🧰 Tecnologias Utilizadas

- ⚛️ **React**
- 💅 **Styled Components** – Estilização com CSS-in-JS
- ⚡ **Vite** – Empacotador leve e rápido

---

## 🔧 Configuração do Ambiente

### 1. Instale as Dependências

Este projeto utiliza o **Yarn** como gerenciador de pacotes:

```bash
yarn install
```

> Se ainda não tiver o Yarn instalado, execute:  
> `npm install -g yarn`

---

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` com base no exemplo fornecido:

```bash
cp .env.sample .env
```

Abra o arquivo `.env` e defina a URL da API backend:

```env
VITE_API_URL=http://localhost:3000
```

> Essa URL é usada para comunicação com a API que roda localmente na porta 3000.

---

### ▶️ 3. Rodar a Aplicação

Com tudo configurado, rode o front-end com:

```bash
yarn dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173)

---

## 🔗 Integração com o Backend

Este front-end depende do backend da aplicação para funcionar corretamente.

> Certifique-se de que a API esteja rodando em [http://localhost:3000](http://localhost:3000), conforme configurado no `.env`.

---

