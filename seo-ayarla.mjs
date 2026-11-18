// Netlen tanıtım sitesi: GitHub Pages adresini ve Google ayarlarını sayfaya yazar.
//
//   node seo-ayarla.mjs <github-kullanici-adi> [--repo <depo-adi>] [--google <dogrulama-kodu>]
//
// Depo adı <kullanici>.github.io ise site https://<kullanici>.github.io/ adresinde yayınlanır (önerilen).
// Başka bir depo adı verirsen adres https://<kullanici>.github.io/<depo>/ olur.
// --google: Google Search Console'un "HTML etiketi" yönteminde verdiği content="..." değeri.
import fs from 'node:fs';

const args = process.argv.slice(2);
const user = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--repo' && args[args.indexOf(a) - 1] !== '--google');
const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
if (!user || !/^[A-Za-z0-9-]+$/.test(user)) {
  console.error('Kullanım: node seo-ayarla.mjs <github-kullanici-adi> [--repo <depo-adi>] [--google <kod>]');
  process.exit(1);
}
const repo = opt('--repo');
const base = !repo || repo.toLowerCase() === `${user.toLowerCase()}.github.io`
  ? `https://${user.toLowerCase()}.github.io/`
  : `https://${user.toLowerCase()}.github.io/${repo}/`;
const google = opt('--google');
const today = new Date().toISOString().slice(0, 10);

let html = fs.readFileSync('index.html', 'utf8');
// canonical, og:url and the absolute share picture
html = html.replace(/<!-- canonical:[^\n]*\n<!-- <link rel="canonical" href="[^"]*"> -->\n/, '')
           .replace(/<link rel="canonical" href="[^"]*">\n/, '')
           .replace(/<meta property="og:url" content="[^"]*">\n/, '');
html = html.replace('<meta name="site-kind"', `<link rel="canonical" href="${base}">\n<meta property="og:url" content="${base}">\n<meta name="site-kind"`);
html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${base}share.jpg">`);
// absolute addresses in the structured data
html = html.replace(/"(image|logo)": "[^"]*netlen-logo-512\.png"/g, `"$1": "${base}media/netlen-logo-512.png"`)
           .replace(/"(screenshot|thumbnailUrl)": "[^"]*tanitim-poster\.png"/g, `"$1": "${base}media/tanitim-poster.png"`)
           .replace(/"contentUrl": "[^"]*netlen-tanitim\.mp4"/, `"contentUrl": "${base}media/netlen-tanitim.mp4"`)
           .replace(/"@type": "WebSite", "name": "Netlen", "inLanguage": "tr"( , "url": "[^"]*")?/, `"@type": "WebSite", "name": "Netlen", "inLanguage": "tr", "url": "${base}"`)
           .replace(/("@type": "SoftwareApplication",\n\s*"name": "Netlen",)(\n\s*"url": "[^"]*",)?/, `$1\n      "url": "${base}",`)
           .replace(/("operatingSystem": "Web, Chrome",)(\n\s*"installUrl": "[^"]*",)?/, `$1\n      "installUrl": "${base}app/",`);
// Google Search Console ownership tag
html = html.replace(/<meta name="google-site-verification" content="[^"]*">\n/, '');
if (google) html = html.replace('<meta name="site-kind"', `<meta name="google-site-verification" content="${google.replace(/"/g, '')}">\n<meta name="site-kind"`);
fs.writeFileSync('index.html', html);

fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${base}gizlilik.html</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>
`);
fs.writeFileSync('robots.txt', `User-agent: *
Allow: /
Disallow: /app/

Sitemap: ${base}sitemap.xml
`);
console.log(`Hazır: ${base}`);
console.log('index.html (canonical, og:url, yapısal veri), sitemap.xml ve robots.txt güncellendi.');
if (!google) console.log('Search Console doğrulama kodun olunca: node seo-ayarla.mjs ' + user + (repo ? ` --repo ${repo}` : '') + ' --google <kod>');
