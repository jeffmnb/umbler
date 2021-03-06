const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
app.use(express.static('scripts'))
app.use(express.static('styles'))
app.use(express.static('assets'))
const PORT = 3000;


app.use(express.static(__dirname));

app.get('*', function(req, res){
  res.redirect('/index.html');
});

var port = 3000;
app.listen(port);
console.log('Umbler - Express server started on port %s', port);



const ffmpeg = require("fluent-ffmpeg");

const bodyParser = require("body-parser");

const fs = require("fs");

const fileUpload = require("express-fileupload");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

ffmpeg.setFfmpegPath(__dirname + "/ffmpeg32/ffmpeg.exe");

ffmpeg.setFfprobePath(__dirname + "ffmpeg/bin");

ffmpeg.setFlvtoolPath(__dirname + "flvtool");

console.log(ffmpeg);

app.post("/convert", (req, res) => {
	//res.contentType(`video/${to}`);
	//res.attachment(`output.${to}`

	let to = req.body.to;
	let file = req.files.file;
	let fileName = `FileConverted.${to}`;
	console.log(to);
	console.log(file);

	file.mv("tmp/" + file.name, function (err) {
		if (err) return res.send(err);
		console.log("File Uploaded successfully");
	});

	ffmpeg("tmp/" + file.name)
		.withOutputFormat(to)
		.on("end", function (stdout, stderr) {
			console.log("Finished");
			res.download(fileName, function (err) {
				if (err) throw err;

				fs.unlink(fileName, function (err) {
					if (err) throw err;
					console.log("File deleted");
				});
			});
			fs.unlink("tmp/" + file.name, function (err) {
				if (err) throw err;
				console.log("File deleted");
			});
		})
		.on("error", function (err) {
			console.log("an error happened: " + err.message);
			fs.unlink("tmp/" + file.name, function (err) {
				if (err) throw err;
				console.log("File deleted");
			});
		})
		.saveToFile(fileName);
	//.pipe(res, { end: true });
});










app.use(cors());





app.get('/downloadmp3', async (req, res, next) => {
	try {
		var url = req.query.url;
		if (!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title = 'audio';

		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
			if (err) throw err;
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
		});

		res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
		ytdl(url, {
			format: 'mp3',
			filter: 'audioonly',
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});

app.get('/downloadmp4', async (req, res, next) => {
	try {
		let url = req.query.url;
		if (!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title = 'video';

		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
		});

		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
		ytdl(url, {
			format: 'mp4',
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});