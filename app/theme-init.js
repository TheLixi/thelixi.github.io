// Tema titremesini önlemek için kayıtlı temayı erkenden uygula
      try {
        var s = JSON.parse((localStorage.getItem('netlen:v1') || localStorage.getItem('lixi-yks:v1')) || '{}');
        var t = (s.settings && s.settings.theme) || 'auto';
        var dark = t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
        document.documentElement.dataset.palette = s.settings && s.settings.palette === 'mor' ? 'mor' : 'lixi';
      } catch (e) {}
