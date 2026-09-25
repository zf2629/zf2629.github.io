
/**
 * 网址数据源
 * 可根据需求自由扩展
 */
const navData = [
    {
        id: 1,
        title: "Google",
        url: "https://www.google.com",
        desc: "全球最大搜索引擎",
        category: "搜索"
    },
    {
        id: 2,
        title: "GitHub",
        url: "https://github.com",
        desc: "代码托管与协作平台",
        category: "开发"
    },
    {
        id: 3,
        title: "Stack Overflow",
        url: "https://stackoverflow.com",
        desc: "程序员问答社区",
        category: "开发"
    },
    {
        id: 4,
        title: "Dribbble",
        url: "https://dribbble.com",
        desc: "设计师灵感分享",
        category: "设计"
    },
    {
        id: 5,
        title: "YouTube",
        url: "https://www.youtube.com",
        desc: "全球视频分享平台",
        category: "娱乐"
    },
    {
        id: 6,
        title: "Twitter",
        url: "https://twitter.com",
        desc: "实时信息网络",
        category: "社交"
    },
    {
        id: 7,
        title: "LinkedIn",
        url: "https://www.linkedin.com",
        desc: "职业社交网络",
        category: "社交"
    },
    {
        id: 8,
        title: "Medium",
        url: "https://medium.com",
        desc: "高质量阅读平台",
        category: "阅读"
    },
    {
        id: 9,
        title: "Figma",
        url: "https://www.figma.com",
        desc: "协同界面设计工具",
        category: "设计"
    },
    {
        id: 10,
        title: "Vercel",
        url: "https://vercel.com",
        desc: "前端部署云平台",
        category: "开发"
    },
    {
        id: 11,
        title: "Netflix",
        url: "https://www.netflix.com",
        desc: "流媒体视频服务",
        category: "娱乐"
    },
    {
        id: 12,
        title: "Spotify",
        url: "https://www.spotify.com",
        desc: "数字音乐服务",
        category: "娱乐"
    },
    {
        id: 13,
        title: "Notion",
        url: "https://www.notion.so",
        desc: "全能笔记与工作区",
        category: "效率"
    },
    {
        id: 14,
        title: "Slack",
        url: "https://slack.com",
        desc: "团队沟通协作工具",
        category: "效率"
    },
    {
        id: 15,
        title: "Zoom",
        url: "https://zoom.us",
        desc: "视频会议软件",
        category: "效率"
    }
];

// DOM 元素
const container = document.getElementById('links-container');
const searchInput = document.getElementById('search-input');
const mobileSearchInput = document.getElementById('mobile-search-input');
const filterContainer = document.getElementById('category-filters');
const emptyState = document.getElementById('empty-state');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    renderCategories();
    renderLinks(navData);
    
    // 绑定搜索事件
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    mobileSearchInput.addEventListener('input', (e) => handleSearch(e.target.value));
});

/**
 * 渲染分类按钮
 */
function renderCategories() {
    const categories = ['all', ...new Set(navData.map(item => item.category))];
    
    categories.forEach(cat => {
        if (cat === 'all') return; // 'all' 按钮已硬编码在 HTML 中
        
        const btn = document.createElement('button');
        btn.className = `filter-btn px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all`;
        btn.textContent = cat;
        btn.dataset.category = cat;
        btn.onclick = () => filterByCategory(cat, btn);
        filterContainer.appendChild(btn);
    });

    // 为 'all' 按钮绑定事件
    document.querySelector('[data-category="all"]').onclick = (e) => filterByCategory('all', e.target);
}

/**
 * 渲染链接卡片
 * @param {Array} data - 要渲染的数据数组
 */
function renderLinks(data) {
    container.innerHTML = '';
    
    if (data.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    data.forEach(item => {
        const card = document.createElement('a');
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        // 核心样式：纯黑主题适配，微缩放+上浮动效在 CSS 中定义
        card.className = `nav-card group block p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 relative overflow-hidden`;
        
        card.innerHTML = `
            <div class="flex flex-col h-full justify-between">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">${item.title}</h3>
                        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-gray-600 group-hover:text-white transition-colors"></i>
                    </div>
                    <p class="text-sm text-gray-400 line-clamp-2 leading-relaxed">${item.desc}</p>
                </div>
                <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span class="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">${item.category}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * 处理搜索逻辑
 * @param {string} keyword 
 */
function handleSearch(keyword) {
    const lowerKeyword = keyword.toLowerCase().trim();
    const filtered = navData.filter(item => 
        item.title.toLowerCase().includes(lowerKeyword) || 
        item.desc.toLowerCase().includes(lowerKeyword)
    );
    renderLinks(filtered);
    
    // 重置分类高亮
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-white', 'text-black');
        btn.classList.add('bg-white/5', 'text-gray-400');
    });
    if (!lowerKeyword) {
        const allBtn = document.querySelector('[data-category="all"]');
        allBtn.classList.add('active', 'bg-white', 'text-black');
        allBtn.classList.remove('bg-white/5', 'text-gray-400');
    }
}

/**
 * 处理分类筛选
 * @param {string} category 
 * @param {HTMLElement} btnElement 
 */
function filterByCategory(category, btnElement) {
    // 更新按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-white', 'text-black');
        btn.classList.add('bg-white/5', 'text-gray-400');
    });
    btnElement.classList.add('active', 'bg-white', 'text-black');
    btnElement.classList.remove('bg-white/5', 'text-gray-400');

    // 过滤数据
    if (category === 'all') {
        renderLinks(navData);
    } else {
        const filtered = navData.filter(item => item.category === category);
        renderLinks(filtered);
    }
    
    // 清空搜索框
    searchInput.value = '';
    mobileSearchInput.value = '';
}

/**
 * 星空背景动画逻辑
 * 纯黑背景适配，亮度适中
 */
function initStars() {
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    // 星星密度配置
    let starCount = 150; 

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createStars();
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5, // 较小的半径，避免刺眼
                alpha: Math.random(),
                speed: Math.random() * 0.05 + 0.01
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        // 纯黑背景由 CSS 控制，这里只画星星
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
            
            // 闪烁效果
            star.alpha += (Math.random() - 0.5) * 0.05;
            if (star.alpha < 0.1) star.alpha = 0.1;
            if (star.alpha > 0.8) star.alpha = 0.8; // 限制最大亮度，避免在黑背景下过于刺眼
            
            // 缓慢移动
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }
        });
        
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    // 切换密度按钮逻辑
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.addEventListener('click', () => {
        starCount = starCount === 150 ? 300 : 150;
        createStars();
        const icon = toggleBtn.querySelector('i');
        icon.className = starCount === 300 ? 'fa-solid fa-sun text-yellow-200' : 'fa-solid fa-moon';
    });
}
