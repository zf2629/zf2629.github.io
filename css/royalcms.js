 
        // 主题切换功能
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // 检查本地存储的主题偏好
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });

        // 导航栏滚动效果
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if(window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // 移动端菜单切换
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // 移动端点击后关闭菜单
                    if(window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                    }
                }
            });
        });
        
        // 标签页功能
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有active类
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // 添加active类到当前标签
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // 导航链接高亮
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if(scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // 添加浮动元素动画
        document.addEventListener('DOMContentLoaded', function() {
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 2}s`;
            });
        });

        // 下载计数功能
        let downloadCount = localStorage.getItem('royalcmsDownloadCount') || 1130;
        document.getElementById('downloadCount').textContent = downloadCount;
        
        // 下载弹窗功能
        const downloadModal = document.getElementById('downloadModal');
        const downloadTriggers = document.querySelectorAll('.download-trigger');
        const closeModalButtons = document.querySelectorAll('.close-modal');
        const confirmDownloadButton = document.getElementById('confirmDownload');
        let currentDownloadSource = '';
        
        // 打开弹窗
        downloadTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                currentDownloadSource = 'direct';
                downloadModal.style.display = 'flex';
            });
        });
        
        // 关闭弹窗
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                downloadModal.style.display = 'none';
                techServiceModal.style.display = 'none';
            });
        });
        
        // 点击弹窗外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === downloadModal || e.target === techServiceModal) {
                downloadModal.style.display = 'none';
                techServiceModal.style.display = 'none';
            }
        });
        
        // 确认下载
        confirmDownloadButton.addEventListener('click', () => {
            // 增加下载计数
            downloadCount++;
            localStorage.setItem('royalcmsDownloadCount', downloadCount);
            document.getElementById('downloadCount').textContent = downloadCount;
            
            // 创建临时下载链接
            const link = document.createElement('a');
            link.href = 'http://demo.royalcms.com.cn/uploads/downloads/royalcms-package.zip';
            link.download = 'http://demo.royalcms.com.cn/uploads/downloads/royalcms-package.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // 关闭弹窗
            downloadModal.style.display = 'none';
            
            // 显示下载成功提示
            alert('下载成功！感谢您选择RoyalCMS。如有部署问题，请联系我们获取有偿技术支持。');
        });

        // 技术服务弹窗
        const techServiceModal = document.getElementById('techServiceModal');
        const techServiceTriggers = document.querySelectorAll('.tech-service-trigger');
        
        techServiceTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                techServiceModal.style.display = 'flex';
            });
        });

        // 添加滚动动画效果
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        document.querySelectorAll('.feature-card, .philosophy-card, .team-card, .section-title, .tech-card').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
 // 返回顶部功能
const backToTopButton = document.getElementById('backToTop');

// 显示/隐藏返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// 点击返回顶部
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

 