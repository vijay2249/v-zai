const vscode = require('vscode');
const axios = require('axios');
const xmlParse = require('fast-xml-parser');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const blogs = await axios.get("https://blog.webdevsimplified.com/rss.xml");
	const articles = xmlParse.parse(blogs.data).rss.channel.item.map(article => {
		return {
			label: article.title,
			detail: article.description,
			link: article.link,
		}
	})
	console.log(articles)
	const actionsAvailable = [{"label": 'github users'}, {"label":"wds blog post", "clicked":false}]

	console.log('Congratulations, "v-zai-extension" is now active!');
	let disposable = vscode.commands.registerCommand('v-zai-extension.v-zai', async function () {
		// The code you place here will be executed every time your command is executed
		var time = new Date()
		let displayDate = time.toLocaleDateString()
		let displayTime = time.toLocaleTimeString()
		let displayMsg = `Date: ${displayDate}\nTime: ${displayTime}`
		vscode.window.showInformationMessage(displayMsg);
		
		// const searchBoxDisplay = vscode.window.showQuickPick(actionsAvailable, {matchOnDetail:true})
		// if(searchBoxDisplay == null)return
		
		const article = await vscode.window.showQuickPick(articles,{matchOnDetail:true})
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
