const vscode = require('vscode');
const axios = require('axios');
const xmlParse = require('fast-xml-parser');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let web_dev_articles = []
	const wds_blogs = await axios.get("https://blog.webdevsimplified.com/rss.xml");
	xmlParse.parse(wds_blogs.data).rss.channel.item.map(article => {
		return web_dev_articles.push({
			label: article.title,
			detail: article.description,
			link: article.link,
		})
	})
	const codePen_blogs = await axios.get("https://blog.codepen.io/feed/");
	xmlParse.parse(codePen_blogs.data).rss.channel.item.map(article =>{
		return web_dev_articles.push({
			label: article.title,
			detail: article.description,
			link: article.link
		}) 
	})
	console.log(web_dev_articles[0])
	console.log('Congratulations, "v-zai-extension" is now active!');
	let disposable = vscode.commands.registerCommand('v-zai-extension.v-zai', async () => {
		var time = new Date()
		let displayDate = time.toLocaleDateString()
		let displayTime = time.toLocaleTimeString()
		vscode.window.showInformationMessage(`Date: ${displayDate}\tTime: ${displayTime}`);
				
		const article = await vscode.window.showQuickPick(web_dev_articles,{matchOnDetail:true})
		if(article == null)return
		vscode.env.openExternal(article.link)
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
