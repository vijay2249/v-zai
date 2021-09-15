const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, "v-zai-extension" is now active!');
	let disposable = vscode.commands.registerCommand('v-zai-extension.v-zai', function () {
		// The code you place here will be executed every time your command is executed
		var time = new Date()
		let displayDate = time.toLocaleDateString()
		let displayTime = time.toLocaleTimeString()
		let displayMsg = `Date: ${displayDate}\nTime: ${displayTime}`
		vscode.window.showInformationMessage(displayMsg);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
