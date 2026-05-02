# Tennis Taula Catalunya — tennistaulacatalunya.com

Blog de tennis taula en català construït amb Astro 4 + Vercel.

## Stack
- **Astro 4** — Framework estàtic
- **Keystatic CMS** — Panel d'administració (pendent configurar)
- **Vercel** — Hosting i deploy
- **Umami** — Analítica sense cookies (pendent configurar)

## Estructura
```
src/
  content/
    fustes/         ← 12 posts
    configuracions/ ← 9 posts
    guies/          ← 13 posts
    gomes/          ← 5 posts
    noticies/       ← 5 posts
  layouts/          ← BaseLayout + PostLayout
  components/       ← PostCard
  pages/            ← index, [category]/index, [category]/[slug]
  styles/           ← global.css
public/
  robots.txt
vercel.json         ← 51 redireccions 301 (44 posts + 7 pàgines estàtiques)
```

## Comandes
```bash
npm install
npm run dev    # localhost:4321
npm run build
```

## Deploy a Vercel
1. Push a GitHub
2. Importar repo a Vercel
3. Build command: `npm run build` / Output dir: `dist`
4. Apuntar domini a Dondominio → nameservers de Vercel
