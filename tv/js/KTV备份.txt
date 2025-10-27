globalThis.post2 = function (_url, _data) {
    // let data = buildUrl(_url,_data).split('?')[1];
    // return post(_url,{body:encodeURIComponent(data),headers:rule.headers});
    return post(_url, {data: _data, headers: rule.headers});
}
var rule = {
    类型: '听歌',//影视|听书|漫画|小说
    title: 'KTV歌厅[听]',
    // host: 'https://vpsdn.leuse.top',
    host: 'https://api.cloudflare.com',
    root: 'https://api.cloudflare.com/client/v4/accounts/1ecc4a947c5a518427141f4a68c86ea1/d1/database/4f1385ab-f952-404a-870a-e4cfef4bd9fd/query',
    //mktvUrl: 'http://em.21dtv.com/songs/',
    mktvUrl: 'http://ktvmedia.mysoto.cc/songs/',
   
    url: '/searchmv?table=fyclass&pg=fypage#fyfilter',
    searchUrl: '/searchmv?keywords=**&pg=fypage',
    pic: 'https://api.paugram.com/wallpaper/?source=sina&category=us',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '{"singer":[{"key":"region","name":"地区","init":"","value":[{"n":"全部","v":""},{"v":"1","n":"大陆"},{"v":"2","n":"港台"},{"v":"3","n":"国外"}]},{"key":"form","name":"类别","init":"","value":[{"n":"全部","v":""},{"v":"1","n":"男"},{"v":"2","n":"女"},{"v":"3","n":"组合"}]}],"song":[{"key":"lan","name":"语言","init":"2","value":[{"n":"全部","v":""},{"v":"1","n":"藏语"},{"v":"2","n":"国语"},{"v":"3","n":"韩语"},{"v":"4","n":"日语"},{"v":"5","n":"闽南语"},{"v":"6","n":"英语"},{"v":"7","n":"粤语"},{"v":"8","n":"其他"},{"v":"9","n":"马来语"},{"v":"10","n":"泰语"},{"v":"11","n":"印尼语"},{"v":"12","n":"越南语"}]},{"key":"type","name":"类型","init":"","value":[{"n":"全部","v":""},{"v":"1","n":"流行"},{"v":"2","n":"合唱"},{"v":"3","n":"怀旧"},{"v":"4","n":"儿歌"},{"v":"5","n":"革命"},{"v":"6","n":"民歌"},{"v":"7","n":"舞曲"},{"v":"8","n":"喜庆"},{"v":"9","n":"迪高"},{"v":"10","n":"无损DISCO"},{"v":"11","n":"影视"}]}]}',
    filter_url: '{{fl}}',
    headers: {
        'User-Agent': 'MOBILE_UA',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer LueNrycW-6jks7xBjPqX9mjFq2A2M5Kul6Ig3D8z',
    },
    timeout: 5000,
    class_name: '歌手&曲库',
    class_url: 'singer&song',
    一级: $js.toString(() => {
        let d = [];
        // let _url = input.split('#')[0];
        let _url = rule.root;
        let params = [];
        let sql = '';
        let size = 20;
        let pg = MY_PAGE;
        if (MY_CATE === 'singer') {
            sql = 'select name, id from singer where 1=1';
            if (MY_FL.region) {
                params.push(MY_FL.region);
                sql += ' and region_id = ?';
                // _url += '&where=region_id&keywords=' + MY_FL.region + '&size=21';
            } else if (MY_FL.form) {
                params.push(MY_FL.form);
                sql += ' and form_id = ?';
                // _url += '&where=form_id&keywords=' + MY_FL.form + '&size=21';
            }
            sql += ` order by id limit ${(pg - 1) * size},${size};`;
            let html = post2(_url, {params: params, sql: sql});
            let json = JSON.parse(html);
            d = json.result[0].results.map(item => {
                let pic = rule.mktvUrl + item.id + '.jpg';
                return {
                    vod_id: item.name + '@@' + item.name + '@@' + pic,
                    vod_name: item.name,
                    vod_pic: pic,
                    vod_remarks: '',
                }
            });
        } else if (MY_CATE === 'song') {
            sql = 'select number, name from song where 1=1';
            if (MY_FL.lan) {
                params.push(MY_FL.lan);
                sql += ' and language_id = ?';
                // _url += '&where=language_id&keywords=' + MY_FL.lan + '&size=21';
            } else if (MY_FL.type) {
                params.push(MY_FL.type);
                sql += ' and type_id = ?';
                // _url += '&where=type_id&keywords=' + MY_FL.type + '&size=21';
            }
            sql += ` order by number limit ${(pg - 1) * size},${size};`;
            let html = post2(_url, {params: params, sql: sql});
            let json = JSON.parse(html);
            d = json.result[0].results.map(item => {
                return {
                    vod_id: rule.mktvUrl + item.number + '.mkv' + '@@' + item.name + '@@' + '',
                    vod_name: item.name,
                    vod_pic: rule.pic,
                    vod_remarks: '',
                }
            });
        }
        VODS = d;
    }),
    二级: $js.toString(() => {
        let _url = rule.root;
        let id = orId.split('@@')[0];
        let name = orId.split('@@')[1];
        if (id.endsWith('.mkv')) {
            VOD = {
                vod_name: name,
                vod_play_from: '道长在线',
                vod_content: '道长在线',
            }
        } else {
            VOD = {
                vod_name: id,
                vod_play_from: '道长在线',
                vod_content: '道长在线',
            }
        }
        if (id.endsWith('.mkv')) {
            VOD.vod_play_url = '嗅探播放$' + id;
        } else {
            let params = [id];
            let sql = 'select number,name from song where singer_names = ? order by number limit 0,999';
            let html = post2(_url, {params: params, sql: sql});
            let json = JSON.parse(html);
            let data = json.result[0].results;

            VOD.vod_play_url = (data.map(item => {
                return item.name + '$' + rule.mktvUrl + item.number + '.mkv';
            })).join('#');
        }
    }),
    搜索: $js.toString(() => {
        let _url = rule.root;
        let wd = KEY;
        let sql = "select number,name from song where name like '%" + wd + "%' or singer_names like '%" + wd + "%'";
        let d = [];
        let html = post2(_url, {sql: sql});
        let json = JSON.parse(html);
        d = json.result[0].results.map(item => {
            return {
                vod_id: rule.mktvUrl + item.number + '.mkv' + '@@' + item.name + '@@' + '',
                vod_name: item.name,
                vod_pic: rule.pic,
                vod_remarks: item.singer_names,
            }
        });
        VODS = d;
    }),
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 0, url: input};
    }),
}
