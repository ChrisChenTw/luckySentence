var fs = require('fs');

var fileName = './sentences.txt';

function checkForFile () {
	fs.exists(fileName, function(exists) {
		if(!exists) {
			return next(new Error('Missing file!'));
		}else{
			next(null, fileName);
		}
	});
}

function readSentence (fileName) {
	fs.readFile(fileName, function(err, feedList) {
		if (err) return next(err);

		feedList = feedList
					.toString()
					.split("\n");
		var random = Math.floor(Math.random() * feedList.length);
		next(null, feedList[random]);
	});
}

function writeToNewFile (context) {
	fs.writeFile("today.txt", context, function(err) {
		if (err) return next(err);

		console.log(context);
	});
}

var tasks = [ checkForFile, 
			  readSentence,
			  writeToNewFile ];

function next(err, result) {
	if (err) throw err;

	var currentTask = tasks.shift();

	if(currentTask) {
		currentTask(result);
	}
}

next();