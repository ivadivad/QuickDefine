```markdown
# 📘 QuickDefine

Uma extensão para navegador que permite selecionar qualquer palavra em uma página web e obter sua definição automaticamente, com suporte a tradução para português.

---

## 🚀 Funcionalidades

- Seleção de palavras diretamente na página
- Detecção automática do texto selecionado
- Tradução automática (qualquer idioma → inglês)
- Busca de definição em inglês
- Tradução da definição para português
- Interface simples via popup
- Arquitetura baseada em extensões modernas (Manifest V3)

---

## 🧠 Como funciona

O fluxo da aplicação segue a arquitetura padrão de extensões:

```

Content Script → Background → Popup

````

### 🔹 Content Script
- Escuta a seleção de texto (`mouseup`)
- Envia a palavra selecionada para o background

### 🔹 Background (Service Worker)
- Recebe a palavra
- Traduz para inglês
- Consulta a API de dicionário
- Traduz a definição para português
- Armazena o resultado

### 🔹 Popup (React)
- Solicita os dados ao abrir
- Exibe a palavra e sua definição

---

## 🛠️ Tecnologias utilizadas

- React
- TypeScript
- Vite
- Chrome Extension API (Manifest V3)

---

## 📦 Instalação e uso

### 1. Clone o repositório

```bash
git clone https://github.com/ivadivad/QuickDefine
cd QuickDefine
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Build do projeto

```bash
npm run build
```

### 4. Carregar no Chrome

1. Acesse: `chrome://extensions`
2. Ative o **Modo do desenvolvedor**
3. Clique em **"Carregar sem compactação"**
4. Selecione a pasta:

```
dist/
```

---

## 🧪 Como testar

1. Abra qualquer site
2. Selecione uma palavra
3. Clique na extensão
4. Veja a definição aparecer no popup

---

## ⚠️ Observações

* O popup não permanece aberto ao interagir com a página (comportamento padrão do Chrome)
* A definição pode aparecer inicialmente como "Carregando..." devido ao tempo de resposta das APIs
* É necessário recarregar a página após atualizar a extensão durante o desenvolvimento

---

## 🔮 Melhorias futuras

* Atualização em tempo real do popup
* Histórico de palavras pesquisadas
* Interface mais elaborada
* Suporte offline (cache)
* Detecção de idioma mais robusta

---

## 📚 APIs utilizadas

* [https://dictionaryapi.dev/](https://dictionaryapi.dev/)
* [https://translate.googleapis.com/](https://translate.googleapis.com/)

---

## 📄 Licença

Este projeto é open-source e pode ser utilizado para fins de estudo e aprimoramento.

```
```
