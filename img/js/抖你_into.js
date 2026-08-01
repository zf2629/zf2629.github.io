//by_顺承天意(20250831)
() => {
	const sel = input;
	if (sel.includes('歌词适配')) {
		let KeyP = getPath('hiker://files/rules/dzHouse/html/抖你key.json');
		let be_task = function(input) {
			deleteItemByCls('音乐列表');
			putVar('id', '音乐');
			/*
			let name = 'https://xiaoapi.cn/API/yy.php?type=qq&msg=' + input;
			
			let name3 = "https://api.dragonlongzhu.cn/api/joox/juhe_music.php?&type=json&msg=" + input;
			*/
			let KeyP = getPath('hiker://files/rules/dzHouse/html/抖你key.json');
			let name3 = 'https://sdkapi.hhlqilongzhu.cn/api/juhe_dgmusic/?key='+request(KeyP)+'&type=json&msg=' + input;
			let songs = JSON.parse(fetch(name3));
			if(Array.isArray(songs)==false) deleteFile(KeyP);
			/*
			let music_list = fetch(name, {
				dns: '101.133.174.0'
			}).split('\n');
			
			let music_list = fetch(name).split('\n');
			var task = function(obj) {
				let music = request(obj.url);
				music = music.split('\n');
				let title = music[1].split('：')[1];
				let desc = music[2].split('：')[1];
				let img = music[0].split('：')[1];
				let url = music[3].split('：')[1] + '#isMusic=true#';
				let Dd = {
					封面: img,
					曲名: title,
					歌手: desc,
					地址: url,
					ID: obj.id
				};
				return Dd;
			};
			*/
			var task2 = function(obj) {
				let music = JSON.parse(request(obj.url)).data;
				let title = music.title
				let desc = music.singer
				let img = music.cover
				let lyric =music.lyric
				let url = music.url + '#isMusic=true#';
				let Dd = {
					封面: img,
					曲名: title,
					歌手: desc,
					歌词: lyric,
					地址: url,
					ID: obj.id
				};
				return Dd;
			};
			
			let tasks = [];
			/*
			for (let i = 0; i < music_list.length - 1; i++) {
				tasks.push({
					func: task,
					param: {
						url: name + '&n=' + (i + 1),
						id: '曲目' + (i + 1)
					},
					id: '曲目' + (i + 1)
				})
			};
			*/
			
/*
			let music_list3 = songs.filter(song => 
				song.title.includes(input)
			);*/

			for (let i = 0; i < songs.length - 1; i++) {
				tasks.push({
					func: task2,
					param: {
						url: name3 + '&n=' + (i + 1),
						id: '曲目' + (i + 0),
					},
					id: '曲目' + (i + 0),
					
				})
			};
			var results = [];
			be(tasks, {
				func: function(obj, id, error, taskResult) {
					obj.results.push(taskResult);
					let info = taskResult.曲名;
					let info_url = taskResult.地址;
					let index = obj.results.length;
					if(index==1) {
						putVar('首曲目id',id)
						putVar("首曲目", info)
					}
					let Arr = [{
						col_type: 'icon_1_left_pic',
						title: index == 1? `‘‘’’<b><font color=#1AB16B>${info}</font></b>` : info,
						desc: taskResult.歌手,
						img: taskResult.封面,
						url: $('hiker://empty##noPre##noLoading##noHistory#').lazyRule((info_url, info, id) => {
							if (getVar('刷新id') != id) {
								updateItem(id, {
									title: `‘‘’’<b><font color=#1AB16B>${info}</font></b>`
								});
								updateItem(getVar('刷新id', getVar('首曲目id')), {
									title: getVar('刷新info', getVar('首曲目')),
								});
								putVar('刷新id', id);
								putVar('刷新info', info);
								refreshX5WebView(getPath('hiker://files/rules/dzHouse/html/h5音乐播放器.html'));
								return 'hiker://empty';
							} else {
								return 'hiker://empty';
							}
						}, info_url, info, id),
						extra: {
							cls: '音乐列表',
							id: id,
							inheritTitle: false
						}
					}];
					addItemAfter(getVar('id', '音乐'), Arr);
					deleteItem('loading');
					putVar('id', id);
				},
				param: {
					results: results
				}
			});
			putVar('音乐数据', JSON.stringify(results));
			deleteItem('头部');
			refreshX5WebView(getPath('hiker://files/rules/dzHouse/html/h5音乐播放器.html'))
			refreshX5Desc('float&&300');
		};
		
		
		let input_tips;
		if(request(KeyP)) {
			input_tips= '歌曲名';
		} else {
			input_tips = '接口key'
		}
		
		return $("", input_tips).input((be_task) => {
			let KeyP = getPath('hiker://files/rules/dzHouse/html/抖你key.json');
			if(!request(KeyP)) {
				writeFile(KeyP, input)
				return 'toast://已设置好key，可以正常使用'
			}
			putVar('music', input);
			return $('hiker://empty##gameTheme##noHistory##noRecordHistory##noRefresh##background#').rule((input, be_task) => {
				setPageTitle('歌词适配');
				addListener('onClose', $.toString(()=>{
					clearVar('音乐数据');
					clearVar('id');
					clearVar('刷新id');
					clearVar('首曲目');
					clearVar('首曲目id');
					clearVar('刷新info');
				}))
				let d = [];
				let 高度;
				if (!getVar('音乐数据')) {
					d.push({
						col_type: 'pic_1_center',
						img: "http://123.56.105.145/weisyr/img/music_vip.png",
						url: 'hiker://empty',
						extra: {
							id: '头部',
						}
					});
					高度 = 0;
				} else {
					高度 = 300;
				}
				var 本地x5 = getPath('hiker://files/rules/dzHouse/html/h5音乐播放器.html');
				if (fileExist(本地x5) == false) {
					var 远程x5 = request('http://123.56.105.145/weisyr/h5音乐播放器.html');
					if (远程x5.indexOf("player-content") > 0) {
						writeFile(本地x5, 远程x5);
					} else {
						confirm({
							title: '❌错误提示',
							content: 'h5音乐播放器导入出错\n请手动导入'
						})
					}
				}
				d.push({
					col_type: 'x5_webview_single',
					desc: 0 + '&&float',
					url: 本地x5,
					extra: {
						ua: MOBILE_UA,
						autoPlay: true,
						imgLongClick: false,
						id: '播放器'
					},
				});
				d.push({
					col_type: 'input',
					desc: '按回车确认搜索',
					extra: {
						id: '音乐',
						titleVisible: false,
						defaultValue: getVar('music'),
					},
					url: $.toString((be_task) => {
						if (input != '' && input != getVar('music')) {
							putVar('music', input);
							clearVar('音乐数据');
							clearVar('id');
							clearVar('刷新id');
							clearVar('首曲目');
							clearVar('首曲目id');
							clearVar('刷新info');
							deleteItem('头部');
							//refreshX5Desc('float&&300');
							addItemAfter('音乐', [{
								col_type: 'pic_1_center',
								img: 'http://123.56.105.145/weisyr/img/Loading1.gif',
								url: 'hiker://empty',
								extra: {
									id: 'loading'
								}
							}]);
							try {
								be_task(input);
							} catch (e) {};
						}
					}, be_task),
				});
				d.push({
					title: "““”” <small><font color='grey'>" + '——   频繁操作会限制IP   ——' + "</font> </small>",
					col_type: "text_center_1",
					url: 'hiker://empty',
					extra: {
						lineVisible: false,
						id: 'end',
						cls: 'end'
					}
				});
				setResult(d);
				try {
					be_task(input);
				} catch (e) {};
			}, input, be_task);
		}, be_task);
	} else if (sel.includes('科兴')) {
		return $('hiker://empty#gameTheme##noRecordHistory##noHistory#').rule(() => {
			setPageTitle('科兴三针短剧');
			let d = []
			require('http://123.56.105.145/weisyr/H5视频播放器.js');
			H5视频播放器(d)
			setResult(d)
		})
	} else {
		var tips;
		if (sel.includes('水印')) {
			tips = '抖音快手小红书等视频和图集';
		} else if (sel.includes('音乐')) {
			tips = '全民K歌暂时不可用';
		}
		return $("{{clipboard}}", tips).input((sel) => {
			var url = input.match(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g);
			if (url == null) {
				return "toast://请输入正确的视频分享链接";
			} else if (url) {
				url = url[0];
				showLoading('正在识别解析中');

				function qsy(type) {
					/* ---------- 同步拉取 ---------- */
					function safeGet(u) {
						try {
							var res = fetch(u);
							if (!res) return null;
							return JSON.parse(res);
						} catch (e) {
							return null;
						}
					}
				
					function getField(obj, path) {
						return path.split('.').reduce((o, k) => (o || null)[k], obj);
					}

					var apis = [
						{url: "https://api.yunmge.com/api/analyze?token=be512c28eaab84f1a10928f0574346e3&url=", field: "data"},
						{url: "https://api.xingzhige.com/API/douyin/?url=",		field: "data.item"},
						{url: "https://api.dragonlongzhu.cn/api/sp_jx/sp.php?url=",   field: "data"},
						{url: "https://api.dragonlongzhu.cn/api/sp_jx/tuji.php?url=", field: "data"},
						{url: "https://api.cenguigui.cn/api/juhe/video.php?url=", field: "data"}
					];
				
					var Data = null;
					for (var i = 0; i < apis.length; i++) {
						var api = apis[i];
						var json = safeGet(api.url + encodeURIComponent(url));
						if (json && (json.code === 200 || json.code === 0)) {
							var val = getField(json, api.field);
							if (val) {
								Data = val;
								log('接口 ' + (i + 1) + ' 成功');
								//log(Data)
								break;
							}
						}
					}
				
					if (!Data) {
						hideLoading();
						return 'toast://暂不支持该链接，已启动嗅探';
					}
				
					var title = (Data.desc || Data.title || '').substring(0, 18).replace(/[#？！，。!,.?\t]/g, '');
					if (!title) title = '[抖你]' + $.dateFormat(new Date(), "yyyyMMddHHmmss");
				
					var 视频直链 = Data.playurl || Data.url || '';
					var 图集	 = Data.imsges || Data.images || [];
					var 音频	 = Data.muisic || Data.music || '';
				
					if (!type) {
						if (图集.length > 0) {
							log("识别为图集");
							return $('hiker://empty#gameTheme##noHistory##noRecordHistory#').rule((图集, title) => {
								setPageTitle(title);
								let d = [];
								require('http://123.56.105.145/weisyr/Top_H5.js');
								Top_H5(d, 120, 图集[0]);
								for (let i in 图集) {
									d.push({
										col_type: 'pic_2_card',
										pic: 图集[i],
										url: 图集[i] + '#.jpg'
									});
								}
								setResult(d);
								hideLoading();
							}, 图集, title);
						} else if (视频直链) {
							log("识别为视频");
							updateItem("我的主页#新去水印", {title: title});
							registerTask('抖你', 500, $.toString(() => {
								updateItem("我的主页#新去水印", {title: '抖你'});
								unRegisterTask('抖你');
							}));
							hideLoading();
							return 'x5Play://' + 视频直链;
						} else {
							hideLoading();
							log('暂不支持该链接，已启动嗅探')
							updateItem("我的主页#新去水印", {title: title});
							registerTask('抖你', 500, $.toString(() => {
								updateItem("我的主页#新去水印", {title: '抖你'});
								unRegisterTask('抖你');
							}));
							return 'video://' + url
						}
					} else {
						hideLoading();
						if (音频) {
							updateItem("我的主页#新去水印", {title: title});
							registerTask('抖你', 500, $.toString(() => {
								updateItem("我的主页#新去水印", {title: '抖你'});
								unRegisterTask('抖你');
							}));
							return 音频 + '#isMusic=true#';
						} else {
							return 'toast://暂无音频';
						}
					}
				}

				function tqyy() {
					var Data, audioUrl, title;
					try {
						Data = JSON.parse(fetch("https://api.milorapart.top/apis/jiexi?url=" + url));
						const audioItem = Data.medias.find(media => media.media_type === "audio");
						audioUrl = audioItem ? audioItem.resource_url : null;
						//const videoItem = Data.medias.find(media => media.media_type === "video");
						//var previewUrl = videoItem ? videoItem.preview_url : null;
						title = Data.text.substring(0, 18).replace(/#|？|！|，|。|\!|\,|\?|\.|\\t/g, '');
					} catch (e) {
						let html = JSON.parse(fetch('https://api.uomg.com/api/get.kg?songurl=' + url));
						Data = html.data;
						title = Data.song_name + " - " + Data.kg_nick;
						audioUrl = Data.playurl;
					}
					hideLoading();
					if (audioUrl) {
						log("识别为音乐");
						updateItem("我的主页#新去水印", {
							title: title,
							//pic: previewUrl
						});
						registerTask('抖你', 500, $.toString(() => {
							updateItem("我的主页#新去水印", {
								title: '抖你'
							});
							unRegisterTask('抖你');
						}));
						return audioUrl + '#isMusic=true#'
					} else {
						//return 'toast://暂不支持当前链接提取';
						return qsy()
					}
				}

				try {
					if (sel.includes('水印') && !url.includes('kg.qq.com')) {
						return qsy()
					} else if (sel.includes('音频') || url.includes('kg.qq.com')) {
						return qsy('音频')
					}
				} catch (e) {
					hideLoading();
					return 'toast://出错了';
				}
			}
		}, sel);
	}
}