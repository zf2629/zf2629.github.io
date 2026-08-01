
function copyLinkToClipboard(link) {  
	navigator.clipboard.writeText(link)  
	.then(() => {  
		console.log('链接已复制到剪贴板');  
		alert('链接已复制到剪贴板'); // 使用alert来提示用户  
		})  
		.catch(err => {  
			console.error('无法复制链接到剪贴板', err);  
			alert('无法复制链接到剪贴板'); // 使用alert来显示错误信息  
			});  
			return false; // 防止链接的默认点击行为  
			}  
