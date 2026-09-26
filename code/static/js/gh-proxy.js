
    (() => {
      /* 胶囊导航滚动高亮 */
      const cards = document.querySelectorAll('.repo-card[id^="repo-"]');
      if (cards.length) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const link = document.querySelector(`.nav-bar a[href="#${entry.target.id}"]`);
            if (!link) return;
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
              document.querySelectorAll('.nav-bar a.active').forEach(a => a.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }, { rootMargin: '-70px 0px -45% 0px', threshold: [0.25] });
        cards.forEach(c => observer.observe(c));
      }

      /* 加速开关逻辑 */
      const toggle = document.getElementById('accelToggle');
      const sourceSel = document.getElementById('accelSource');
      const savedOn = localStorage.getItem('legado_accel') === 'on';
      // ✅ 默认 gh-proxy.com（与 select 第一项 + selected 对齐）
      sourceSel.value = localStorage.getItem('legado_proxy') || 'https://gh-proxy.com/';
      toggle.checked = savedOn;

      const patchLinks = () => {
        const on = toggle.checked;
        const base = sourceSel.value;
        document.querySelectorAll('.asset-link').forEach(a => {
          const raw = a.dataset.raw || (a.dataset.raw = a.href);
          a.href = on ? base + raw.replace('https://', '') : raw;
        });
      };
      patchLinks();

      toggle.addEventListener('change', () => {
        localStorage.setItem('legado_accel', toggle.checked ? 'on' : 'off');
        patchLinks();
      });
      sourceSel.addEventListener('change', () => {
        localStorage.setItem('legado_proxy', sourceSel.value);
        if (toggle.checked) patchLinks();
      });
    })();
