	

				// ==================== 音乐播放器 (增强版，包含可播放的网易云外链示例，使用稳定链接) ====================
				class MusicPlayer {
					constructor() {
						this.playlist = [
							{ name: '借过一下', artist: '陈小春', url: 'https://music.163.com/song/media/outer/url?id=3389798285.mp3' },
							{ name: '17岁 (Live)', artist: '刘德华', url: 'https://music.163.com/song/media/outer/url?id=29723041.mp3' },
							{ name: '黄昏', artist: '落日微醺', url: 'https://music.163.com/song/media/outer/url?id=3393137260.mp3' },
							{ name: '白鸽', artist: '落日微醺', url: 'https://music.163.com/song/media/outer/url?id=3403324254.mp3' },
							{ name: '掉了', artist: '张惠妹', url: 'https://music.163.com/song/media/outer/url?id=454828902.mp3' }
						];
						this.currentIndex = 0;
						this.isPlaying = false;
						this.audio = document.getElementById('audio-player');
						this.init();
					}
					init() {
						this.loadSongByIndex(0);
						this.bindEvents();
						this.audio.addEventListener('error', () => { this.playNext(); });
						this.audio.addEventListener('ended', () => { this.playNext(); });
					}
					bindEvents() {
						document.getElementById('play-btn').onclick = () => this.togglePlay();
						document.getElementById('prev-btn').onclick = () => this.prev();
						document.getElementById('next-btn').onclick = () => this.next();
						const searchInput = document.getElementById('search-input');
						searchInput.addEventListener('input', (e) => this.searchSongs(e.target.value));
						searchInput.addEventListener('focus', () => { if(searchInput.value.trim()) this.showSearchResults(); });
						document.addEventListener('click', (e) => { if(!e.target.closest('.music-search')) this.hideSearchResults(); });
					}
					loadSongByIndex(index) {
						if(index < 0) index = this.playlist.length-1;
						if(index >= this.playlist.length) index = 0;
						this.currentIndex = index;
						const song = this.playlist[this.currentIndex];
						this.audio.src = song.url;
						this.audio.load();
						document.getElementById('current-song').innerText = `${song.name} · ${song.artist}`;
					}
					togglePlay() {
						if(this.isPlaying) this.pause();
						else this.play();
					}
					play() {
						this.audio.play().then(() => {
							this.isPlaying = true;
							document.getElementById('play-btn').innerHTML = '⏸';
						}).catch(() => { this.next(); });
					}
					pause() {
						this.audio.pause();
						this.isPlaying = false;
						document.getElementById('play-btn').innerHTML = '▶';
					}
					prev() {
						let newIdx = this.currentIndex - 1;
						if(newIdx < 0) newIdx = this.playlist.length-1;
						this.loadSongByIndex(newIdx);
						if(this.isPlaying) this.play();
					}
					next() {
						let newIdx = (this.currentIndex + 1) % this.playlist.length;
						this.loadSongByIndex(newIdx);
						if(this.isPlaying) this.play();
					}
					searchSongs(query) {
						if(!query.trim()) { this.hideSearchResults(); return; }
						const lower = query.toLowerCase();
						const results = this.playlist.filter(s => s.name.toLowerCase().includes(lower) || s.artist.toLowerCase().includes(lower));
						this.displaySearchResults(results);
					}
					displaySearchResults(results) {
						const container = document.getElementById('search-results');
						container.innerHTML = '';
						if(results.length === 0) {
							container.innerHTML = '<div class="search-result-item">😢 暂无匹配歌曲</div>';
						} else {
							results.forEach(song => {
								const idx = this.playlist.findIndex(s => s.name === song.name && s.artist === song.artist);
								const div = document.createElement('div');
								div.className = 'search-result-item';
								div.innerHTML = `<div class="song-name">${song.name}</div><div class="artist-name">${song.artist}</div>`;
								div.onclick = () => {
									this.loadSongByIndex(idx);
									this.play();
									this.hideSearchResults();
									document.getElementById('search-input').value = '';
								};
								container.appendChild(div);
							});
						}
						this.showSearchResults();
					}
					showSearchResults() { document.getElementById('search-results').style.display = 'block'; }
					hideSearchResults() { document.getElementById('search-results').style.display = 'none'; }
				}
			
			
			
				// 全局初始化
				document.addEventListener('DOMContentLoaded', () => {
					// new WeatherWidget();
					new MusicPlayer();
			
					// 为所有阅读更多按钮绑定教程显示
					document.querySelectorAll('.read-more').forEach(btn => {
						btn.addEventListener('click', (e) => {
							e.stopPropagation();
							const tutId = btn.getAttribute('data-tut-id');
							if(tutId) showTutorialById(tutId);
						});
					});
			
					// 为所有返回按钮绑定事件 (动态+静态)
					document.querySelectorAll('.back-btn').forEach(btn => {
						btn.addEventListener('click', () => showList());
					});
			
					// 导航锚点滚动
					document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
						anchor.addEventListener('click', function(e) {
							e.preventDefault();
							const targetId = this.getAttribute('href').substring(1);
							if(targetId === 'tutorials') {
								showList();
								const listSec = document.getElementById('tutorial-list');
								if(listSec) listSec.scrollIntoView({ behavior: 'smooth' });
							} else if(targetId === 'tips') {
								document.getElementById('tips')?.scrollIntoView({ behavior: 'smooth' });
							} else if(targetId === 'home') {
								window.scrollTo({ top: 0, behavior: 'smooth' });
							} else if(targetId === 'about' || targetId === 'contact') {
								document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
							}
						});
					});
			
					// 滚动显示动画 (fade-up)
					const fadeElements = document.querySelectorAll('.tutorial-card, .tip-item');
					const obs = new IntersectionObserver((entries) => {
						entries.forEach(entry => {
							if(entry.isIntersecting) {
								entry.target.classList.add('visible');
								obs.unobserve(entry.target);
							}
						});
					}, { threshold: 0.1 });
					fadeElements.forEach(el => {
						el.classList.add('fade-up');
						obs.observe(el);
					});
			
					// 页面显隐后确保播放器与天气区域不丢失状态
					document.body.style.opacity = '1';
				});
	