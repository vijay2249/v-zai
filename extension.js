const vscode = require('vscode');
const axios = require('axios')
const xmlParser = require('fast-xml-parser')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	let disposable = vscode.commands.registerCommand('v-zai-extension.v-zai', function () {
		var time = new Date()
		let displayDate = time.toLocaleDateString()
		let displayTime = time.toLocaleTimeString()
		let displayMsg = `Date: ${displayDate}\nTime: ${displayTime}`
		vscode.window.showInformationMessage(displayMsg); // Display a message box to the user

	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
