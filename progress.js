'use strict';
const WebPack = require('webpack');
let start = new Date();
let chars = 0;

Object.assign(exports, {
	getPlugin () {
		start = new Date();
		return new WebPack.ProgressPlugin(progress);
	}
});


function progress (percentage, msg) {

	if(percentage < 1) {
		percentage = Math.floor(percentage * 100);
		msg = percentage + '% ' + msg;
		if(percentage < 100) {
			msg = ' ' + msg;
		}
		if(percentage < 10) {
			msg = ' ' + msg;
		}
	} else {
		msg += '\n';
	}

	if ((new Date() - start) < 5000) {
		return;
	}

	if (/emit/.test(msg)) {
		msg = '';
	}

	goToLineStart(msg);
	process.stderr.write(msg);
}


function goToLineStart (nextMessage) {
	var str = '';

	for(; chars > nextMessage.length; chars--) {
		str += '\b \b';
	}

	chars = nextMessage.length;
	for(let i = 0; i < chars; i++) {
		str += '\b';
	}
	if(str) {
		process.stderr.write(str);
	}
}
