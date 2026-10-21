
// ============ 网站数据（添加网站只需加一条：name / url / category） ============
const sites = [
 // 常用
 { name: "百度", url: "https://www.baidu.com", category: "常用" },
 { name: "MT远程管理", url: "http://192.168.1.7:8082/", category: "常用" },

 














           // 游戏
           { name: "小霸王", url: "./html/小霸王.html", category: "常用" }, 
           { name: "自动加载", url: "https://zf2629.github.io/01zf-main/自动推送/自动推送.json", category: "常用" }, 
           
          // 音乐
          { name: "自用音乐", url: "https://zf2629.github.io/01MP3/index.html", category: "音乐" },     
          { name: "音乐下载", url: "./html/music.html", category: "音乐" },
          
          { name: "QQ音乐", url: "https://zf2629.neocities.org/qqmusic/", category: "音乐" },
          { name: "ZF2629音乐网", url: "./html/音乐网/index.html", category: "音乐" },
          
          { name: "音乐解析器", url: "https://musicjx.com/", category: "音乐" },     
          { name: "无损音乐下载", url: "https://flac.music.hi.cn/", category: "音乐" }, 
          { name: "世纪音乐网", url: "https://www.4c44.com/", category: "音乐" },      
         









            { name: "我的永硕E盘", url: "https://zf2629.ysepan.com/", category: "空间网盘" },
            { name: "GitHub", url: "https://github.com", category: "空间网盘" },
            { name: "Gitee", url: "https://gitee.com", category: "空间网盘" },
            { name: "netlify", url: "https://www.netlify.com", category: "空间网盘" },
            { name: "蓝奏云", url: "https://accounts.woozooo.com/", category: "空间网盘" },
            { name: "凯速网", url: "https://kstore.cc/", category: "空间网盘" },
            { name: "neocities", url: "https://neocities.org/", category: "空间网盘" },



            { name: "大白外链网盘", url: "https://pan.gt68.cn/", category: "空间网盘" },
            { name: "免费公益外链网盘", url: "https://pan.29o.cn/", category: "空间网盘" },
            { name: "惜染外链网盘", url: "https://mpimg.cn/", category: "空间网盘" },
            { name: "彩虹外链网盘", url: "https://cccimg.com/", category: "空间网盘" },
            { name: "乐趣享外链网盘", url: "https://www.lequxiang.com.cn/", category: "空间网盘" },
            { name: "松子云盘", url: "https://pan.szfx.top/", category: "空间网盘" },
            { name: "免费文件外链网盘", url: "http://pan.daliutv.top:2025/", category: "空间网盘" },

            { name: "月下独酌网盘", url: "https://wpty.ccccocccc.cc/", category: "空间网盘" },
            { name: "玖伴外链网盘", url: "https://www.panurl.cn/", category: "空间网盘" },
            { name: "咖咖云盘", url: "https://wp.kayyw.com/", category: "空间网盘" },





            
            
            { name: "SaltyLeo的书架", url: "https://tstrs.me/search", category: "书" },
            
            // 工具
            { name: "小草助手", url: "https://yecao.app/", category: "文件分享" },
            { name: "Wormhole文件分享", url: "https://wormhole.app/", category: "文件分享" },
            { name: "文件快递柜", url: "https://crud.bbroot.com/", category: "文件分享" },

            // 工具
            { name: "直播转换工具", url: "./code/直播转换工具.html", category: "工具" },
            { name: "JSON校验格式化", url: "./code/JSON校验格式化.html", category: "工具" },
            { name: "base64", url: "./code/base64.html", category: "工具" },
            { name: "图片转Base64", url: "./code/图片转Base64.html", category: "工具" },
            { name: "JS加密解密", url: "./code/JS加密解密.html", category: "工具" },
            { name: "利息收益", url: "./code/利息收益.html", category: "工具" },
            { name: "GITHUB代理加速", url: "./code/代理加速.html", category: "工具" },


            
            // 官
            
            { name: 'MT管理器[官]', url: 'https://mt.cc/', category: '官' },
            { name: '节点聚合[官]', url: 'https://github.com/yy1588133/proxy-pool', category: '官' },
            { name:"FongMi","url":"https://github.com/FongMi/Release/releases",category: "官" },
            { name:"webhtv","url":"https://github.com/webhtv/webhtv/releases",category: "官" },
            { name: "alantang1977", url: "https://github.com/alantang1977", category: "官" },
            { name: "天神", url: "https://github.com/IY-CPU", category: "官" },
            { name: "香雅情", url: "https://github.com/xyq254245", category: "官" },
            



            { name: "我不是.摸鱼儿.cc", url: "https://我不是.摸鱼儿.cc", category: "官" },
            { name: "英格里希嗷呜", url: "http://www.英格里希嗷呜.top/", category: "官" },
            { name: "junchao.tang", url: "https://cnb.cool/junchao.tang", category: "官" },
            { name: "酷佬", url: "https://jsnzkpg.com/", category: "官" },
            { name: "东篱", url: "https://chigua.eu.org/", category: "官" },



            // 接口
            
            { name: "TVBox接口编辑器", url: "https://bjq.catvod.site/", category: "接口" },

            { name: "CCSH[直播]", url: "https://seep.eu.org/https://raw.githubusercontent.com/CCSH/IPTV/refs/heads/main/live.txt", category: "接口" },

            { name: "东篱接口", url: "https://16151.kstore.space/", category: "接口" },
            { name: "潇洒接口", url: "https://qist.ugigc.dpdns.org/xiaosa/api.json", category: "接口" },
            { name: "王二小接口", url: "https://9280.kstore.vip/newwex.json", category: "接口" },
            { name: "茶茶接口", url: "https://y.cczi.cc/cham/cha.json", category: "接口" },
            
            



            
       
       
  


   








        
  


              //APP 下载
            {"name":"1DM+","url":"https://ys-e.ysepan.com/wap/zf2629/BBO5IfCV83JFkjH/Cc6gA75q4ISHV4T8nf7hFfC5ha9MC/1DM+.apk" , category: "APP" }, 
            {"name":"黄鸟抓包","url":"https://ys-e.ysepan.com/wap/zf2629/BBO5IfCV83JFkjH/9c6gA75q4ISIGAa4ds2IbHc7FR1lG8/黄鸟抓包.apk" , category: "APP" }, 
            {"name":"mt管理器","url":"https://ys-e.ysepan.com/wap/zf2629/BBO5IfCV83JFkjH/9c6gA75q4ISIDSaAds2IbHc7FE1lG8/mt.apk" , category: "APP" }, 
            {"name":"musicfree","url":"https://ys-e.ysepan.com/wap/zf2629/BBO5IfCV83JFkjH/9c6gA75q4ISIT8a7Ds2IbHc7FS1lG8/musicfree.apk" , category: "APP" }, 
            {"name":"APK编辑器","url":"https://ys-e.ysepan.com/wap/zf2629/BBO5IfCV83JFkjH/Cc6gA75q4ISHFTaA4s2IbHc7FD1lG8/APK编辑器.apk" , category: "APP" }, 
            {"name":"咪咕爱唱","url":"https://ys-g.ysepan.com/wap/zf2629/BBO5IfCV83JFkjH/2c5fT8Kq4HEHFTa7As2HCdb7jA1lG8/咪咕爱唱.apk" , category: "APP" }, 
            {"name":"小白文件管理器","url":"https://ys-e.ysepan.com/wap/zf2629/BBO5IfCV83JFkjH/9c6gA75q4JBeD8a9ds2IbHc7FU1lG8/小白文件管理器.apk" , category: "APP" }, 

            { "name": "影视+", url: "https://gh-proxy.com/https://github.com/zf2629/01app/raw/main/影视+.apk", category: "APP" },
            { "name": "ClashMeta", url: "https://gh-proxy.com/https://github.com/zf2629/01app/raw/main/ClashMeta.apk", category: "APP" },

            









            { "name": "影视2629", url: "https://lz0.qaiu.top/parser?url=https://wwaqx.lanzouc.com/imSEM4b245da&pwd=1230", category: "APP" },


              //ZIP 下载
            {"name":"自动推送.zip","url":"https://ys-e.ysepan.com/wap/zf2629/BPN0IfCV83JFkjH/M5G9c4V0jUh8fdqKL2hSlRKH8gmSPi/%E8%87%AA%E5%8A%A8%E6%8E%A8%E9%80%81.zip" , category: "ZIP" }, 
            {"name":"应用商店.zip","url":"https://ys-e.ysepan.com/wap/zf2629/BPN0IfCV83JFkjH/J5G9c4V0jUh7iaqkM2hSlRKH8fmSPi/%E5%BA%94%E7%94%A8%E5%95%86%E5%BA%97.zip" , category: "ZIP" }, 
            {"name":"数据库.zip","url":"https://ys-e.ysepan.com/wap/zf2629/BPN0IfCV83JFkjH/M5G9c4V0jUh7hdqkK2hSlRKH8emSPi/%E6%95%B0%E6%8D%AE%E5%BA%93.zip" , category: "ZIP" }, 
            {"name":"本地01.zip","url":"https://ys-e.ysepan.com/wap/zf2629/BPN0IfCV83JFkjH/J5G9caC0jCgShaqj62hSlRMHRFmSPi/本地01.zip" , category: "ZIP" }, 
            {"name":"CMS.zip","url":"https://ys-e.ysepan.com/wap/zf2629/BPN0IfCV83JFkjH/M5G9c4V0jUh7gCqlj2hSlRKH8cmSPi/CMS.zip" , category: "ZIP" }, 
            {"name":"b.zip","url":"https://ys-e.ysepan.com/wap/zf2629/BPN0IfCV83JFkjH/M5G9c4V0jUh7fAqLM2hSlRKGTGmSPi/b.zip" , category: "ZIP" }, 

            








            
           
            // 采集
            {name:"OK采集","url":"https://okzyw.cc/api.php/provide/vod", category: "采集" },
            {name:"猫眼采集","url":"https://www.maoyanzy.com/api.php/provide/vod", category: "采集" },
            {name:"天涯影视采集","url":"https://tyyszy.com/api.php/provide/vod", category: "采集" },
            {name:"非凡采集","url":"http://www.ffzy.tv/api.php/provide/vod", category: "采集" },
            {name:"量子采集","url":"https://www.lzzy.tv/api.php/provide/vod", category: "采集" },
            {name:"牛牛采集","url":"https://niuniuzy6.com/api.php/provide/vod", category: "采集" },
            {name:"索尼采集","url":"https://suonizy.cc/api.php/provide/vod", category: "采集" },
            {name:"闪电采集","url":"https://shandianzy.com/api.php/provide/vod", category: "采集" },
            {name:"快车采集","url":"https://kuaichezy.com/api.php/provide/vod", category: "采集" },
            {name:"最大采集","url":"https://www.zuidazy.co/api.php/provide/vod", category: "采集" },
            {name:"如意采集","url":"https://www.ryzy.tv/api.php/provide/vod", category: "采集" },
            {name:"豆瓣采集","url":"https://dbzy.tv/api.php/provide/vod", category: "采集" },
            {name:"魔都采集","url":"https://www.moduzy6.com/api.php/provide/vod", category: "采集" },
            {name:"爱奇艺","url":"https://iqiyizy.cc/api.php/provide/vod", category: "采集" },
            {name:"豪华采集","url":"http://www.haohuazy.com/api.php/provide/vod", category: "采集" },
            {name:"电影天堂","url":"http://dyttzyw.tv/api.php/provide/vod", category: "采集" },
            {name:"极速采集","url":"https://www.jisuzy.com/api.php/provide/vod", category: "采集" },
            {name:"速播采集","url":"https://www.subozy.com/api.php/provide/vod", category: "采集" },
            {name:"爱坤采集","url":"https://ikunzy.cc/api.php/provide/vod", category: "采集" },
            {name:"樱花采集","url":"https://yhzy.cc/api.php/provide/vod", category: "采集" },
            {name:"艾旦采集","url":"https://lovedan.net/api.php/provide/vod", category: "采集" },

            {name:"无尽采集","url":"https://api.wujinapi.me/api.php/provide/vod", category: "采集" },
            {name:"优质采集","url":"https://api.yyzy-tv.vip/inc/api_mac10.php", category: "采集" },
            {name:"人人影视","url":"http://43.139.196.163:31308/gather/jso", category: "采集" },
            {name:"红牛采集","url":"https://www.hongniuzy2.com/api.php/provide/vod/at/josn/", category: "采集" },
            {name:"新浪采集","url":"https://api.xinlangapi.com/xinlangapi.php/provide/vod/josn", category: "采集" },
            {name:"暴风采集","url":"https://bfzyapi.com/api.php/provide/vod/", category: "采集" },
            {name:"U酷采集","url":"https://api.ukuapi88.com/api.php/provide/vod/",category: "采集" },
            {name:"360采集","url":"https://360zyzz.com/api.php/provide/vod", category: "采集" },





            // github
            {name:"gh-proxy","url":"https://gh-proxy.com/",category: "GITHUB" },
          
            {name:"phu889","url":"https://github.com/phu889/kjh998",category: "GITHUB" },
            {name:"潇洒","url":"https://github.com/PizazzGY",category: "GITHUB" },
            {name:"东璃","url":"https://github.com/chitue/dongliTV",category: "GITHUB" },
            {name:"雨呢","url":"https://github.com/cluntop/tvbox",category: "GITHUB" },
            {name:"AVBOX","url":"https://github.com/xiaochangxu",category: "GITHUB" },
            
            

            

            // 邮箱服务
            { name: 'QQ邮箱', url: 'https://mail.qq.com', category: '邮箱' },
            { name: '网易邮箱', url: 'https://mail.163.com', category: '邮箱' },
            { name: 'skymail', url: 'https://skymail.ink/', category: '邮箱' },
            { name: '临时邮箱', url: './html/临时邮箱.html', category: '邮箱' },

            
            
            // 节点
            { name: 'yy1588133', url: 'https://gh-proxy.com/raw.githubusercontent.com/yy1588133/proxy-pool/main/clash.yaml', category: '节点' },
            { name: '酷佬节点', url: 'https://sub.445569.xyz/', category: '节点' },
            // 其他
            { name: '装机助理', url: 'http://www.ntdvf.com/', category: '其他' },

            
            
];

// ============ 右侧顶部功能菜单 ============
const topMenus = [
  { key: 'home', label: '<a href="index.html" style="text-decoration: none;color: inherit;">首页</a>', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>' },
  { key: 'fav', label: '<a href="index.html" target="_blank" style="text-decoration: none;color: inherit;">FAV</a>', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>' },
  { key: 'tool', label: '<a href="index.html"  style="text-decoration: none;color: inherit;">工具</a>', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>' },
  { key: 'setting', label: '设置', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>' },
  { key: 'about', label: '关于', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>' },
];

// ============ 快捷复制区 ============
const copyList = [
{ name: '内网IP', url: 'ftp://192.168.1.7:2122/' },
{ name: 'gh-proxy', url: 'https://gh-proxy.com/' },
{ name: 'view-source:', url: 'view-source:' },
{ name: '自动推送', url: 'https://zf2629.github.io/01zf-main/自动推送/自动推送.json' },
{ name: '在线zf-main', url: 'https://zf2629.github.io/01zf-main/zf-main/zf-main.json' },
{ name: 'NZ多仓', url: 'https://zf2629.github.io/01zf-main/nz.json' },
{ name: '直播接口', url: 'https://zf2629.github.io/live.json' },




];

// ============ 友情链接 ============
const friendLinks = [
  { name: '百度', url: 'https://www.baidu.com' },
  { name: 'neocities', url: 'https://neocities.org/' },
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Gitee', url: 'https://gitee.com' },
  { name: '影视2629', url: 'https://lz0.qaiu.top/parser?url=https://wwaqx.lanzouc.com/imSEM4b245da&pwd=1230' },
  { name: 'hyperphp', url: 'https://zf2629.hyperphp.com' },
  { name: 'wasmer', url: 'https://zf2629.wasmer.app/' },
  { name: 'NZ多仓', url: 'https://zf2629.github.io/01zf-main/nz.json' },
  { name: 'musicfree插件', url: 'https://zf2629.github.io/01json/musicfree/musicfree.json' },
  { name: '海阔仓库', url: 'https://raw.githubusercontent.com/zf2629/02hiker/refs/heads/main/ZF仓库.hiker' },
  
];

// ============ 工具函数 ============
// 从 URL 提取域名
function extractDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch (e) {
    return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  }
}

// 根据名称生成图标背景色（柔和灰阶变化）
function iconBgColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hues = [0, 220, 260, 180, 200, 240, 280, 30];
  const hue = hues[Math.abs(hash) % hues.length];
  return `linear-gradient(135deg, hsla(${hue},8%,22%,1) 0%, hsla(${hue},6%,16%,1) 100%)`;
}

// 获取首字
function getFirstChar(name) {
  return name.charAt(0);
}

// Toast 提示
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

// 复制到剪贴板（兼容写法）
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => showToast('已复制：' + text));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('已复制：' + text);
    } catch (e) {
      showToast('复制失败，请手动复制');
    }
    document.body.removeChild(ta);
  }
}

// ============ 渲染函数 ============
let currentCategory = '全部';
let currentKeyword = '';

function getCategories() {
  const set = new Set(sites.map(s => s.category));
  return ['全部', ...Array.from(set)];
}

function renderTopMenu() {
  const nav = document.getElementById('topMenu');
  nav.innerHTML = topMenus.map(m =>
    `<button class="top-menu-item" data-key="${m.key}">${m.icon}<span>${m.label}</span></button>`
  ).join('');

  nav.querySelectorAll('.top-menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (key === 'home') {
        currentCategory = '全部';
        currentKeyword = '';
        document.getElementById('searchInput').value = '';
        renderCatTabs();
        renderCards();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (key === 'about') {
        showToast('ZF2629网址导航');
      } else if (key === 'fav') {
        showToast('该功能敬请期待');  
      } else {
        showToast('该功能敬请期待');
      }
    });
  });
}

function renderCatTabs() {
  const wrap = document.getElementById('catTabs');
  const cats = getCategories();
  wrap.innerHTML = cats.map(c =>
    `<button class="cat-tab${c === currentCategory ? ' active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
  wrap.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentCategory = tab.dataset.cat;
      renderCatTabs();
      renderCards();
    });
  });
}

function renderCards() {
  const grid = document.getElementById('cardGrid');
  let list = sites;

  if (currentCategory !== '全部') {
    list = list.filter(s => s.category === currentCategory);
  }
  if (currentKeyword) {
    const kw = currentKeyword.toLowerCase();
    list = list.filter(s =>
      s.name.toLowerCase().includes(kw) ||
      s.url.toLowerCase().includes(kw) ||
      s.category.toLowerCase().includes(kw)
    );
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p>站内没有找到「${currentKeyword}」相关网站，按回车/点搜索去百度找找 ↵</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map((s, i) => {
    const domain = extractDomain(s.url);
    const first = getFirstChar(s.name);
    const bg = iconBgColor(s.name);
    return `
      <a class="site-card" href="${s.url}" target="_blank" rel="noopener noreferrer" style="animation-delay:${Math.min(i * 20, 500)}ms;">
        <div class="card-icon" style="background:${bg};">
          <span class="card-icon-inner">${first}</span>
        </div>
        <div class="card-text">
          <div class="card-name">${s.name}</div>
          <div class="card-domain">${domain}</div>
        </div>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>`;
  }).join('');
}

function renderCopyArea() {
  const wrap = document.getElementById('copyArea');
  wrap.innerHTML = copyList.map(c =>
    `<button class="copy-btn" data-url="${c.url}">${c.name}</button>`
  ).join('');
  wrap.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      copyText(btn.dataset.url);
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1500);
    });
  });
}

function renderFriendLinks() {
  const wrap = document.getElementById('friendLinks');
  wrap.innerHTML = friendLinks.map(f =>
    `<a class="friend-link" href="${f.url}" target="_blank" rel="noopener noreferrer">${f.name}</a>`
  ).join('');
}

// ============ 搜索 ============
function doBaiduSearch(kw) {
  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(kw), '_blank');
}

// mode: 'site'  = 输入时实时做站内搜索（只筛选卡片，不跳转）
//       'baidu' = 点击按钮/回车，直接新开标签页跳百度搜索对应关键词
function handleSearch(mode) {
  const kw = document.getElementById('searchInput').value.trim();
  currentKeyword = kw;
  renderCards();                 // 输入即做站内搜索
  if (mode === 'baidu' && kw) {
    doBaiduSearch(kw);           // 按钮/回车：直接新开标签页跳百度
  }
}

// ============ 返回顶部 / 返回底部 ============
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.getElementById('backBottom').addEventListener('click', () => {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
});

// ============ 初始化 ============
function init() {
  renderTopMenu();
  renderCatTabs();
  renderCopyArea();
  renderFriendLinks();
  renderCards();

  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');

  input.addEventListener('input', () => handleSearch('site'));
  btn.addEventListener('click', () => handleSearch('baidu'));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleSearch('baidu'); }
  });
}

document.addEventListener('DOMContentLoaded', init);
