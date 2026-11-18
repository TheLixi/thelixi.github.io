# Netlen tanıtım sitesini ücretsiz yayınlama (GitHub Pages)

Alan adı almana gerek yok. Site `https://KULLANICIADIN.github.io` adresinde ücretsiz yayınlanır, Netlen web uygulaması da `https://KULLANICIADIN.github.io/app/` adresinde açılır.

## 1. Depoyu oluştur

1. [github.com](https://github.com) üzerinde hesabın yoksa ücretsiz hesap aç.
2. Sağ üstte **+ → New repository** seç.
3. **Repository name** alanına tam olarak `KULLANICIADIN.github.io` yaz (kendi kullanıcı adınla, küçük harfle).
4. **Public** seçili olsun, **Create repository** de.

## 2. Adresi siteye yaz (bir kez)

Bu klasörde terminal aç ve kendi kullanıcı adınla çalıştır:

```bash
node seo-ayarla.mjs KULLANICIADIN
```

Bu komut Google'ın istediği canonical adresini, `sitemap.xml` dosyasını ve `robots.txt` dosyasını oluşturur.

## 3. Dosyaları yükle

En kolayı **GitHub Desktop** (ücretsiz, desktop.github.com):

1. GitHub Desktop'ta **File → Add local repository** ile bu `NEtlen` klasörünü seç. "Not a git repository" derse **create a repository** de.
2. **Publish repository** de. Adı `KULLANICIADIN.github.io` olsun, **Keep this code private** işaretini kaldır.
3. Sonraki değişikliklerde: **Commit to main**, sonra **Push origin**.

`.gitignore` dosyası, `shots/` ve `.taste-skill/` gibi kontrol dosyalarını yüklemez.

## 4. Pages'i aç

Depoda **Settings → Pages → Build and deployment → Source: Deploy from a branch**, **Branch: main / (root)** seç ve kaydet. 1-2 dakika sonra site açılır.

## 5. Google'a tanıt (öne çıkmak için en önemli adım)

1. [search.google.com/search-console](https://search.google.com/search-console) adresine Google hesabınla gir.
2. **Mülk ekle → URL öneki** seç, `https://KULLANICIADIN.github.io/` yaz.
3. Doğrulama yöntemi olarak **HTML etiketi**ni seç. Sana verilen etiketteki `content="..."` değerini kopyala ve çalıştır:

   ```bash
   node seo-ayarla.mjs KULLANICIADIN --google BURAYA_KOD
   ```

   Değişikliği GitHub Desktop ile yükle (Commit, Push), sonra Search Console'da **Doğrula** de.
4. Soldaki **Site haritaları** bölümüne `sitemap.xml` yaz ve gönder.
5. **URL denetimi** kutusuna ana sayfa adresini yaz ve **Dizine eklenmesini iste** de.

Google'ın siteyi listelemesi birkaç gün ile birkaç hafta sürebilir.

## 6. Giriş ve sınıf özellikleri için Firebase ayarı

Web uygulaması `KULLANICIADIN.github.io` adresinde açılınca e-posta ile giriş ve sınıf özellikleri bu alan adına izin ister:
**Firebase Console → Authentication → Settings → Authorized domains → Add domain** ile `KULLANICIADIN.github.io` ekle.

## Daha çok görünmek için

- Siteyi Instagram, TikTok ve YouTube profillerindeki bağlantıya koy; dışarıdan gelen bağlantılar Google sıralamasına yardım eder.
- Chrome Web Mağazası, Google Play veya App Store'a yüklediğinde mağaza bağlantılarını bana ilet; siteye indirme düğmeleri olarak eklenir.
- Uygulamayı güncellediğinde yeni sürümü `app/` klasörüne kopyala.
