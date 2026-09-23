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
