# Santo Terço Luminoso

Aplicativo web para acompanhar o Santo Terço com visual elegante, progresso interativo, modo automático, orações e experiência mobile-first.

## 🌐 Demo

Site publicado no GitHub Pages:

https://borges2023.github.io/santo-rosario/

## ✨ Funcionalidades

- Mistérios do terço por dia
- Navegação por beads e etapas
- Modo automático com temporizador
- Sons e vibração opcionais
- Leitura em voz alta das orações
- Devocionário com orações e reflexões
- Layout mobile-first e visual de app Android
- Instalação como PWA no celular
- Compatível com GitHub Pages

## ▶️ Como executar localmente

### Requisitos

- Node.js 18+
- npm

### Instalação

```bash
npm install
```

### Iniciar em desenvolvimento

```bash
npm run dev
```

A aplicação fica disponível em:

```text
http://localhost:3000
```

### Build de produção

```bash
npm run build
```

## 🚀 Publicação no GitHub Pages

O projeto já está preparado para publicação estática.

1. Envie o código para o GitHub.
2. No repositório, acesse `Settings` → `Pages`.
3. Configure:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. O deploy pode ser feito com o comando:

```bash
npm run deploy
```

## 🧩 Estrutura principal

```text
src/
  App.tsx
  components/
  data/
  hooks/
  utils/
public/
  manifest.webmanifest
  sw.js
```

## 🛠️ Tecnologias

- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide React

## 📜 Licença

Este projeto é destinado ao uso pessoal e devocional. Ajustes e melhorias são bem-vindos.

## Uso sem internet no celular

O app não precisa de banco de dados nem de uma conta. Orações e mistérios fazem parte do aplicativo; preferências, intenção e etapa atual ficam salvas localmente no aparelho.

- **Como PWA:** abra o site com internet, instale pelo menu do navegador e aguarde o primeiro carregamento terminar. Depois disso, o app instalado abre e funciona sem conexão.
- **Como app Android:** gere/instale o APK com os arquivos incluídos no pacote. A instalação nativa do Capacitor usa o conteúdo local do aplicativo e pode funcionar offline desde a primeira abertura.

A leitura em voz alta depende das vozes instaladas no próprio celular. Fontes externas foram removidas para que a interface não precise da internet.

Para atualizar os arquivos nativos Android depois de um build web:

```bash
npm run build
npx cap sync android
```
