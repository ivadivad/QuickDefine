# 📘 QuickDefine

Uma extensão para navegador que permite selecionar qualquer palavra em uma página web e obter sua definição automaticamente, com tradução para português — diretamente na tela, sem precisar abrir abas ou popups do navegador.

---

## 🚀 Funcionalidades

* Seleção de palavras diretamente na página
* Menu de contexto (botão direito → Definir palavra)
* Popup dinâmico exibido na própria página
* Tradução automática (qualquer idioma → inglês)
* Busca de definição em inglês
* Tradução da definição para português
* Interface leve, rápida e não intrusiva
* Fechamento automático ao clicar fora
* Arquitetura baseada em extensões modernas (Manifest V3)

---

## 🧠 Como funciona

O fluxo da aplicação segue a arquitetura padrão de extensões:

Content Script → Background → UI (Popup in-page)

### 🔹 Content Script

* Detecta seleção de texto
* Recebe eventos do menu de contexto
* Renderiza o popup diretamente na página

### 🔹 Background (Service Worker)

* Recebe a palavra selecionada
* Traduz para inglês
* Consulta a API de dicionário
* Traduz a definição para português
* Retorna o resultado para o content script

### 🔹 UI (Popup na página)

* Exibe a palavra selecionada
* Mostra estado de carregamento
* Atualiza com a definição
* Permite fechar manualmente ou clicando fora

---

## 🛠️ Tecnologias utilizadas

* React
* TypeScript
* Vite
* Chrome Extension API (Manifest V3)

---

## 📦 Instalação e uso

1. Clone o repositório
   git clone [https://github.com/ivadivad/QuickDefine](https://github.com/ivadivad/QuickDefine)
   cd QuickDefine

2. Instale as dependências
   npm install

3. Build do projeto
   npm run build

4. Carregar no Chrome

* Acesse: chrome://extensions
* Ative o Modo do desenvolvedor
* Clique em "Carregar sem compactação"
* Selecione a pasta: dist/

---

## 🧪 Como testar

1. Abra qualquer site (ex: [https://google.com](https://google.com))
2. Selecione uma palavra
3. Clique com o botão direito
4. Clique em "Definir palavra"
5. Veja o popup aparecer com a definição

---

## ⚠️ Observações

* O popup é renderizado diretamente na página (não usa o popup padrão do Chrome)
* Algumas páginas (como chrome:// ou intranets restritas) podem bloquear scripts
* A definição pode demorar alguns segundos devido às APIs externas
* É necessário recarregar a página após atualizar a extensão

---

## 🔮 Melhorias futuras

* Posicionar popup próximo à palavra selecionada
* Animações (fade-in / transições)
* Suporte multilíngue mais robusto
* Cache para respostas mais rápidas
* Detecção de contexto da frase

---

## 📚 APIs utilizadas

* Dictionary API: [https://dictionaryapi.dev/](https://dictionaryapi.dev/)
* Google Translate (não oficial)

---

## 📄 Licença

Este projeto é open-source e pode ser utilizado para fins de estudo, portfólio e aprimoramento técnico.
