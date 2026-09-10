# Portfólio — Thiago Martiro

Site de portfólio de edição de vídeo (Direct Response, VSL, Criativos, Reels e TikTok Shop).
Feito em **HTML + CSS + JavaScript puro** — sem dependências, sem build. É só publicar.

---

## 🚀 Publicar no GitHub Pages (grátis)

1. Crie um repositório novo no GitHub, por exemplo: `portfolio` (pode ser público).
2. Suba estes arquivos para o repositório (veja os comandos no fim).
3. No GitHub, vá em **Settings → Pages**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)` e clique em **Save**.
5. Em ~1 minuto seu site fica no ar em:
   `https://SEU-USUARIO.github.io/portfolio/`

> Dica: se quiser o endereço `https://SEU-USUARIO.github.io/` (raiz),
> crie o repositório com o nome exato `SEU-USUARIO.github.io`.

---

## ✏️ Como editar

### Vídeos do portfólio
Abra `script.js` e edite a lista `VIDEOS` no topo do arquivo. Cada vídeo é:

```js
{ id: "ID_DO_ARQUIVO_NO_DRIVE", title: "Nome que aparece", cat: "vsl" }
```

- `id` → é o trecho que aparece na URL do Drive: `drive.google.com/file/d/`**`ESTE_ID`**`/view`
- `cat` → categoria: `"vsl"`, `"criativos"`, `"reels"` ou `"ttk"`

A proporção (vertical/horizontal) é detectada automaticamente pela miniatura — não precisa configurar nada.

### Foto
Troque o arquivo `assets/thiago.jpg` por outra imagem com o mesmo nome
(ideal: retrato, proporção ~4:5).

### Contato (⚠️ preencher antes de publicar)
No `index.html`, na seção **Contato**, troque os campos de exemplo:
- `mailto:SEU-EMAIL@exemplo.com` → seu e-mail
- `https://wa.me/55SEUNUMERO` → seu WhatsApp (formato: 55 + DDD + número)
- Os links de **Instagram / YouTube / LinkedIn** (estão como `#`)

---

## 🔓 Importante: compartilhamento dos vídeos no Drive

Para os vídeos tocarem para **qualquer visitante**, a pasta do Drive precisa estar
compartilhada como **"Qualquer pessoa com o link" → Leitor**.
(No Drive: botão direito na pasta → Compartilhar → Acesso geral → Qualquer pessoa com o link.)

---

## 💻 Ver localmente

Abra o `index.html` direto no navegador **ou** rode um servidor simples:

```bash
python -m http.server 8000
```

E acesse `http://localhost:8000`.

---

## 📁 Estrutura

```
portfolio-site/
├── index.html      → estrutura e conteúdo
├── styles.css      → visual (tema escuro cinematográfico)
├── script.js       → lista de vídeos, galeria, filtros e player
└── assets/
    └── thiago.jpg  → foto
```

---

## ⬆️ Subir para o GitHub (comandos)

```bash
git init
git add .
git commit -m "Portfólio Thiago Martiro"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/portfolio.git
git push -u origin main
```
