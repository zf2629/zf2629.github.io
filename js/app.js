/**
 * Nav Home — 交互引擎
 */
(function () {
    'use strict';

    /* ========== 粒子系统 ========== */
    function initParticles() {
        const canvas = document.getElementById('particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: -999, y: -999 };

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class P {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.r = Math.random() * 1.5 + 0.3;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.alpha = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) {
                    const f = (100 - d) / 100;
                    this.x += (dx / d) * f * 1.5;
                    this.y += (dy / d) * f * 1.5;
                }
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(124, 92, 252, ${this.alpha})`;
                ctx.fill();
            }
        }

        let rafId = null;
        let paused = false;
        let resizeTimer = null;

        function setup() {
            resize();
            const n = Math.min(40, Math.floor(canvas.width * canvas.height / 25000));
            particles = Array.from({ length: n }, () => new P());
        }

        function loop() {
            if (paused) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) { p.update(); p.draw(); }
            // 批量连线：同一 strokeStyle 合并，减少状态切换
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(124,92,252,0.06)';
            ctx.lineWidth = 0.4;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = dx * dx + dy * dy;
                    if (d < 18000) {
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                    }
                }
            }
            ctx.stroke();
            rafId = requestAnimationFrame(loop);
        }

        // resize 防抖
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setup, 200);
        });
        // passive 减少滚动阻塞
        document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
        // 页面不可见时暂停
        document.addEventListener('visibilitychange', () => {
            paused = document.hidden;
            if (!paused) { rafId = requestAnimationFrame(loop); }
        });
        setup();
        loop();
    }

    /* ========== 入场动画 (分层入场) ========== */
    function initReveal() {
        // 分层入场：hero → 各 section 标题 → 各 section 卡片（左→右）
        // 在 stage 遮挡下启动，stage 3200ms 开始淡出时卡片刚好开始可见
        const hero = document.querySelector('.hero');
        if (hero) setTimeout(() => hero.classList.add('in-view'), 100);

        let delay = 400;
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            setTimeout(() => section.classList.add('in-view'), delay);
            delay += 150;
            const cards = section.querySelectorAll('.card');
            cards.forEach((card, i) => {
                setTimeout(() => card.classList.add('in-view'), delay + i * 120);
            });
            delay += cards.length * 120 + 200;
        });
    }

    /* ========== 侧栏导航 ========== */
    function initSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('sidebarToggle');
        if (!sidebar) return;

        // 滚动高亮：IntersectionObserver 监听各 section
        const sections = document.querySelectorAll('.section[data-category-id]');
        const sidebarItems = sidebar.querySelectorAll('.sidebar-item[data-cat-id]');
        let currentId = null;
        let isClickScrolling = false;
        if (sections.length && sidebarItems.length) {
            const updateActive = () => {
                if (isClickScrolling) return;
                // 找 section 顶部最接近视口顶部（已滚过 topbar）的那个
                let bestSection = null;
                let bestDistance = Infinity;
                sections.forEach(section => {
                    const top = section.getBoundingClientRect().top - 90;
                    if (top <= 20) {
                        const dist = Math.abs(top);
                        if (dist < bestDistance) {
                            bestDistance = dist;
                            bestSection = section;
                        }
                    }
                });
                if (!bestSection) bestSection = sections[0];
                if (bestSection) {
                    const id = bestSection.getAttribute('data-category-id');
                    if (id !== currentId) {
                        currentId = id;
                        sidebarItems.forEach(item => {
                            item.classList.toggle('active', item.getAttribute('data-cat-id') === id);
                        });
                        const activeItem = sidebar.querySelector('.sidebar-item.active');
                        if (activeItem && sidebar.offsetParent !== null) {
                            const sTop = sidebar.scrollTop;
                            const sH = sidebar.clientHeight;
                            const eTop = activeItem.offsetTop - sidebar.offsetTop;
                            const eH = activeItem.offsetHeight;
                            if (eTop < sTop) {
                                sidebar.scrollTo({ top: eTop - 8, behavior: 'smooth' });
                            } else if (eTop + eH > sTop + sH) {
                                sidebar.scrollTo({ top: eTop + eH - sH + 8, behavior: 'smooth' });
                            }
                        }
                    }
                }
            };
            // 用 IntersectionObserver 作为触发器，回调内检查所有 section
            const observer = new IntersectionObserver(() => updateActive(), {
                rootMargin: '-80px 0px -40% 0px',
                threshold: 0
            });
            sections.forEach(s => observer.observe(s));
        }

        // 侧栏点击平滑滚动
        sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const catId = item.getAttribute('data-cat-id');
                // 立即设置 active 状态，临时禁止 observer 覆盖
                isClickScrolling = true;
                currentId = catId;
                sidebarItems.forEach(si => {
                    si.classList.toggle('active', si.getAttribute('data-cat-id') === catId);
                });
                setTimeout(() => { isClickScrolling = false; }, 800);
                const target = document.getElementById('cat-' + catId);
                if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
                // 移动端点击后关闭侧栏
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });

        // 移动端侧栏切换（预创建backdrop，避免动画中DOM操作）
        let backdrop = null;
        function ensureBackdrop() {
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'sidebar-backdrop';
                const container = sidebar.parentElement || document.body;
                container.appendChild(backdrop);
                backdrop.addEventListener('click', closeSidebar);
            }
            return backdrop;
        }
        function openSidebar() {
            sidebar.classList.add('open');
            document.body.style.overflow = 'hidden';
            const bd = ensureBackdrop();
            requestAnimationFrame(() => bd.classList.add('active'));
        }
        function closeSidebar() {
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
            if (backdrop) {
                backdrop.classList.remove('active');
            }
        }
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
            });
        }
    }

    /* ========== 主题切换（View Transitions） ========== */
    function initTheme() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;

        // 无用户手动选择时，按北京时间自动决定默认主题
        const saved = localStorage.getItem('nav-theme');
        if (!saved) {
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const bjHour = new Date(utc + 8 * 3600000).getHours();
            const auto = (bjHour >= 18 || bjHour < 8) ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', auto);
        } else {
            document.documentElement.setAttribute('data-theme', saved);
        }

        btn.addEventListener('click', (e) => {
            const cur = document.documentElement.getAttribute('data-theme');
            const next = cur === 'dark' ? 'light' : 'dark';

            if (document.startViewTransition) {
                const x = e.clientX, y = e.clientY;
                const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
                // 切换前临时禁用耗性能的属性
                document.documentElement.classList.add('theme-switching');
                const t = document.startViewTransition(() => {
                    document.documentElement.setAttribute('data-theme', next);
                    localStorage.setItem('nav-theme', next);
                });
                t.ready.then(() => {
                    document.documentElement.animate(
                        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
                        { duration: 380, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' }
                    );
                }).catch(() => {});
                t.finished.then(() => {
                    document.documentElement.classList.remove('theme-switching');
                }).catch(() => {
                    document.documentElement.classList.remove('theme-switching');
                });
            } else {
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('nav-theme', next);
            }
        });
    }

    /* ========== 搜索（Hero 内嵌 + 弹窗备用） ========== */
    function initSearch() {
        const heroInput = document.getElementById('heroSearchInput');
        const modal = document.getElementById('searchModal');
        const modalInput = document.getElementById('searchInput');
        const results = document.getElementById('searchResults');
        const backdrop = document.getElementById('searchBackdrop');
        const closeBtn = document.getElementById('searchClose');

        // 收集所有卡片数据
        const allCards = [];
        document.querySelectorAll('.card').forEach(card => {
            allCards.push({
                title: card.dataset.title || '',
                desc: card.dataset.desc || '',
                url: card.getAttribute('href') || '',
                icon: card.querySelector('.card-icon')?.textContent || '',
                el: card,
                section: card.closest('.section')
            });
        });

        // 实时过滤卡片（Hero 搜索框）
        function filterCards(query) {
            const q = query.toLowerCase().trim();
            if (!q) {
                // 清空搜索：显示所有
                allCards.forEach(c => c.el.classList.remove('filtered-out'));
                document.querySelectorAll('.section.filtered-out').forEach(s => s.classList.remove('filtered-out'));
                return;
            }
            document.querySelectorAll('.section').forEach(section => {
                let hasVisible = false;
                const cards = section.querySelectorAll('.card');
                cards.forEach(card => {
                    const title = (card.dataset.title || '').toLowerCase();
                    const desc = (card.dataset.desc || '').toLowerCase();
                    if (title.includes(q) || desc.includes(q)) {
                        card.classList.remove('filtered-out');
                        hasVisible = true;
                    } else {
                        card.classList.add('filtered-out');
                    }
                });
                section.classList.toggle('filtered-out', !hasVisible);
            });
        }

        // Hero 搜索框事件
        if (heroInput) {
            heroInput.addEventListener('input', () => filterCards(heroInput.value));
        }

        // 弹窗搜索（备用，兼容旧逻辑）
        function esc(s) {
            const d = document.createElement('div');
            d.textContent = s;
            return d.innerHTML;
        }
        function openModal() {
            if (!modal) return;
            modal.classList.add('open');
            if (modalInput) {
                modalInput.value = heroInput?.value || '';
                renderResults(modalInput.value.trim());
                setTimeout(() => modalInput.focus(), 100);
            }
        }
        function closeModal() {
            if (!modal) return;
            modal.classList.remove('open');
        }
        function renderResults(query) {
            if (!results) return;
            results.innerHTML = '';
            if (!query) return;
            const q = query.toLowerCase();
            const matched = allCards.filter(c =>
                c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
            );
            if (!matched.length) {
                results.innerHTML = '<div class="search-no-result">没有找到匹配的链接</div>';
                return;
            }
            matched.forEach(c => {
                const a = document.createElement('a');
                a.className = 'search-item';
                a.href = c.url;
                a.target = '_blank';
                a.rel = 'noopener';
                a.innerHTML = `
                    <span class="si-icon">${c.icon || '↗'}</span>
                    <div class="si-text">
                        <div class="si-title">${esc(c.title)}</div>
                        <div class="si-desc">${esc(c.desc)}</div>
                    </div>
                    <svg class="si-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
                results.appendChild(a);
            });
        }

        backdrop?.addEventListener('click', closeModal);
        closeBtn?.addEventListener('click', closeModal);
        if (modalInput) {
            modalInput.addEventListener('input', () => {
                renderResults(modalInput.value.trim());
                // 同步到 Hero 搜索框
                if (heroInput) heroInput.value = modalInput.value;
                filterCards(modalInput.value);
            });
        }

        // Ctrl+K 聚焦 Hero 搜索框，Esc 清空
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (heroInput) {
                    heroInput.focus();
                    heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            if (e.key === 'Escape') {
                if (modal?.classList.contains('open')) {
                    closeModal();
                } else if (heroInput && document.activeElement === heroInput) {
                    heroInput.value = '';
                    filterCards('');
                    heroInput.blur();
                }
            }
        });
    }

    /* ========== 统计追踪 ========== */
    function initTracking() {
        // 页面浏览量
        fetch('api/track.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'view' })
        }).catch(() => {});

        // 链接点击量
        document.querySelectorAll('.card[data-id]').forEach(card => {
            card.addEventListener('click', () => {
                const linkId = card.dataset.id;
                if (linkId) {
                    fetch('api/track.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: 'click', link_id: parseInt(linkId) })
                    }).catch(() => {});
                }
            });
        });
    }

    /* ========== 滚动进度条 + 回到顶部 + 背景视差 ========== */
    function initScroll() {
        const progressBar = document.getElementById('scrollProgress');
        const backToTop = document.getElementById('backToTop');
        const orbs = document.querySelectorAll('.orb');

        function onScroll() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            // 进度条
            if (progressBar && docHeight > 0) {
                const pct = (scrollTop / docHeight) * 100;
                progressBar.style.width = pct + '%';
            }

            // 回到顶部按钮
            if (backToTop) {
                if (scrollTop > 400) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }

            // 背景视差 — orbs 缓慢偏移
            orbs.forEach((orb, i) => {
                const rate = 0.03 + i * 0.015;
                orb.style.transform = `translateY(${scrollTop * rate}px)`;
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });

        // 回到顶部点击
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    /* ========== 入场序列编排 ========== */
    function initIntro() {
        var introConfig = window.__INTRO__ || { enabled: true, type: 'cylinder', duration: 5 };
        const splash = document.getElementById('splash');
        const enterBtn = document.getElementById('splashEnter');
        const stage = document.getElementById('stage');

        // 动画关闭：跳过splash和3D动画，直接显示内容
        if (!introConfig.enabled) {
            if (splash) splash.remove();
            if (stage) { stage.classList.add('stage-bg'); stage.style.opacity = '1'; }
            document.body.classList.add('content-in');
            initReveal();
            return;
        }

        if (!splash || !enterBtn || !stage) {
            document.body.classList.add('content-in');
            initReveal();
            return;
        }

        stage.style.opacity = '0';

        stage.querySelectorAll('img').forEach(img => {
            if (img.src) { const p = new Image(); p.src = img.src; }
        });

        let timers = [];
        let phase = 'splash'; // splash | stage | done

        function clearTimers() {
            timers.forEach(t => clearTimeout(t));
            timers = [];
        }

        let revealCalled = false;

        function stageToBackground() {
            stage.classList.remove('flyaway', 'fading');
            stage.classList.add('stage-bg');
            // 重置所有行回到正常动画
            stage.querySelectorAll('.stage-row').forEach(row => {
                row.style.animation = '';
                row.style.transform = '';
                row.style.transition = '';
                row.style.opacity = '';
            });
        }

        function finishNow() {
            if (phase === 'done') return;
            phase = 'done';
            clearTimers();
            if (splash.parentNode) splash.remove();
            anim.teardown(stage);
            stageToBackground();
            document.body.classList.remove('animating');
            document.body.classList.add('content-in');
            document.removeEventListener('click', onSkip);
            document.removeEventListener('keydown', onSkip);
            if (!revealCalled) {
                revealCalled = true;
                setTimeout(() => { initReveal(); }, 200);
            }
        }

        var skipClickCount = 0;
        var skipClickTimer = null;
        var skipThreshold = 5;
        function onSkip() {
            if (phase !== 'stage') return;
            skipClickCount++;
            clearTimeout(skipClickTimer);
            // 1.5秒内连续点击5次才跳过，超时重置
            skipClickTimer = setTimeout(function() { skipClickCount = 0; }, 1500);
            if (skipClickCount >= skipThreshold) {
                skipClickCount = 0;
                finishNow();
            }
        }

        // 动画模块接口：从 window.IntroAnimations 获取当前动画类型
        var animType = introConfig.type || 'cylinder';
        var anim = (window.IntroAnimations || {})[animType];
        if (!anim) {
            // 动画模块未加载，直接显示内容
            if (splash) splash.remove();
            if (stage) { stage.classList.add('stage-bg'); stage.style.opacity = '1'; }
            document.body.classList.add('content-in');
            initReveal();
            return;
        }

        function startSequence() {
            if (phase !== 'splash') return;
            phase = 'stage';

            splash.classList.add('slide-up');

            // 用户点击后标记已交互，并取消静音播放视频
            window.__heroUserInteracted = true;
            var video = document.getElementById('heroVideo');
            if (video) {
                video.muted = false;
                video.play().catch(function() {});
                var muteBtn = document.getElementById('heroMuteBtn');
                if (muteBtn) { muteBtn.classList.add('unmuted'); muteBtn.title = '静音'; }
            }

            // 延迟注册 skip 监听
            setTimeout(function() {
                document.addEventListener('click', onSkip);
                document.addEventListener('keydown', onSkip);
            }, 600);

            // 无障碍：prefers-reduced-motion时跳过圆柱动画
            var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReduced) {
                // 直接进入：跳过3D圆柱，快速过渡
                timers.push(setTimeout(function() {
                    if (splash.parentNode) splash.remove();
                }, 400));
                stageToBackground();
                document.body.classList.add('content-in');
                phase = 'done';
                document.body.classList.remove('animating');
                if (!revealCalled) {
                    revealCalled = true;
                    setTimeout(function() { initReveal(); }, 100);
                }
                return;
            }

            // ① 设置动画 + stage淡入
            anim.setup(stage);
            stage.style.transition = 'opacity 0.6s ease-out';
            stage.style.opacity = '1';

            // ② splash 滑走后移除 DOM
            timers.push(setTimeout(function() {
                if (splash.parentNode) splash.remove();
            }, 700));

            // ③ 动画旋转 → 着陆 → 背景就位 → 页面渐显
            var dur = introConfig.duration || 5;
            anim.run(stage, dur, function() {
                stage.style.filter = '';

                anim.land(stage, dur, function() {
                    anim.teardown(stage);
                    stageToBackground();
                    document.body.classList.add('content-in');
                    phase = 'done';
                    document.body.classList.remove('animating');
                    document.removeEventListener('click', onSkip);
                    document.removeEventListener('keydown', onSkip);
                    if (!revealCalled) {
                        revealCalled = true;
                        setTimeout(function() { initReveal(); }, 100);
                    }
                });
            });
        }

        enterBtn.addEventListener('click', startSequence);
        splash.addEventListener('click', startSequence);
    }

    /* ========== 通用弹窗 ========== */
    function getSiteLogoHTML(size) {
        const logo = window.__SITE_LOGO__;
        if (logo) {
            return '<img src="' + logo + '" alt="Logo" width="' + size + '" height="' + size + '" style="border-radius:10px;object-fit:contain;">';
        }
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/><polyline points="2 15.5 12 8.5 22 15.5"/><line x1="12" y1="2" x2="12" y2="8.5"/></svg>';
    }

    function showModal({ icon, title, desc, url, accentColor, buttons }) {
        const overlay = document.getElementById('navModalOverlay');
        const modal = document.getElementById('navModal');
        const elIcon = document.getElementById('navModalIcon');
        const elTitle = document.getElementById('navModalTitle');
        const elDesc = document.getElementById('navModalDesc');
        const elUrl = document.getElementById('navModalUrl');
        const elActions = document.getElementById('navModalActions');
        if (!overlay) return;

        // --- 填充内容 ---
        elIcon.innerHTML = icon || '';
        elTitle.textContent = title || '';
        elDesc.textContent = desc || '';

        // URL 胶囊：提取域名高亮
        if (url) {
            try {
                const u = new URL(url);
                elUrl.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
                    '<span class="url-domain">' + u.hostname.replace(/</g, '&lt;') + '</span>';
            } catch (_) {
                elUrl.textContent = url;
            }
            elUrl.style.display = '';
        } else {
            elUrl.style.display = 'none';
        }

        // 背景水印 icon
        let bgIcon = modal.querySelector('.nav-modal-bg-icon');
        if (!bgIcon) {
            bgIcon = document.createElement('div');
            bgIcon.className = 'nav-modal-bg-icon';
            modal.insertBefore(bgIcon, modal.firstChild);
        }
        bgIcon.innerHTML = icon || '';

        if (accentColor) {
            overlay.style.setProperty('--modal-accent', accentColor);
        }
        elActions.innerHTML = '';

        // 关闭按钮（只创建一次）
        let closeBtn = overlay.querySelector('.nav-modal-close');
        if (!closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.className = 'nav-modal-close';
            closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            modal.appendChild(closeBtn);
        }
        closeBtn.onclick = () => hideModal();
        overlay.onclick = (e) => { if (e.target === overlay) hideModal(); };

        // 按钮 + 图标
        const btnIcons = {
            '复制链接': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
            '前往访问': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'
        };
        (buttons || []).forEach(b => {
            const btn = document.createElement('button');
            btn.className = 'nav-modal-btn ' + (b.type || 'secondary');
            const ico = btnIcons[b.text] || '';
            btn.innerHTML = ico + '<span>' + (b.text || '').replace(/</g, '&lt;') + '</span>';
            btn.addEventListener('click', () => {
                hideModal();
                if (b.onClick) b.onClick();
            });
            elActions.appendChild(btn);
        });

        // --- 等一帧再显示 ---
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });
        });
    }

    function hideModal() {
        const overlay = document.getElementById('navModalOverlay');
        if (overlay) overlay.classList.remove('active');
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('链接已复制到剪贴板');
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showToast('链接已复制到剪贴板');
        } catch (e) {
            showToast('复制失败，请手动复制');
        }
        document.body.removeChild(ta);
    }

    function showToast(text) {
        let toast = document.querySelector('.nav-modal-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'nav-modal-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = text;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }

    /* ========== Hero 视频控制 ========== */
    function initHeroVideo() {
        const video = document.getElementById('heroVideo');
        const btn = document.getElementById('heroMuteBtn');
        const hero = document.getElementById('heroSection');
        if (!video || !btn || !hero) return;

        let heroVisible = false;

        /* — 视频加载淡入 — */
        video.style.opacity = '0';
        video.style.transition = 'opacity 0.8s ease';
        function onCanPlay() {
            video.style.opacity = '1';
            video.removeEventListener('canplay', onCanPlay);
        }
        video.addEventListener('canplay', onCanPlay);
        if (video.readyState >= 3) onCanPlay();

        /* — 缓冲指示 — */
        video.addEventListener('waiting', () => hero.classList.add('video-buffering'));
        video.addEventListener('playing', () => hero.classList.remove('video-buffering'));

        /* — 播放控制：只有用户交互后才允许播放，可见 → 播放，不可见 → 暂停 — */
        function syncPlayback() {
            if (!window.__heroUserInteracted) return;
            if (heroVisible) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }

        btn.addEventListener('click', () => {
            video.muted = !video.muted;
            btn.classList.toggle('unmuted', !video.muted);
            btn.title = video.muted ? '取消静音' : '静音';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                heroVisible = entry.isIntersecting;
                syncPlayback();
            });
        }, { threshold: 0.1 });
        observer.observe(hero);
    }

    // showSoundPrompt 已移除，点击 Splash 后直接取消静音播放

    /* ========== 链接点击确认 ========== */
    function initLinkConfirm() {
        document.querySelectorAll('.grid > .card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const url = card.getAttribute('href');
                const title = card.getAttribute('data-title') || '链接';
                const desc = card.getAttribute('data-desc') || '';
                // 从卡片的 .tag 标签元素获取颜色（如 tag-blue → #60a5fa）
                const tagEl = card.querySelector('.tag');
                const tagColor = tagEl ? getComputedStyle(tagEl).color : '';

                // 从卡片提取 icon HTML（服务端已含 favicon 兜底）
                const cardIconEl = card.querySelector('.card-icon');
                const iconHTML = cardIconEl ? cardIconEl.innerHTML.trim() : '';

                showModal({
                    icon: iconHTML,
                    title: title,
                    desc: desc,
                    url: url,
                    accentColor: tagColor,
                    buttons: [
                        {
                            text: '复制链接', type: 'secondary',
                            onClick: () => { copyText(url); }
                        },
                        {
                            text: '前往访问', type: 'primary',
                            onClick: () => {
                                if (card.getAttribute('target') === '_blank') {
                                    window.open(url, '_blank', 'noopener');
                                } else {
                                    location.href = url;
                                }
                            }
                        }
                    ]
                });
            });
        });
    }

    /* ========== 初始化 ========== */
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initParticles();
        initSidebar();
        initSearch();
        initScroll();
        initTracking();
        initHeroVideo();
        initLinkConfirm();
        initIntro();
    });

})();
