const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Song = require("../../models/songs");
const Lyric = require("../../models/lyric");

router.get("/", (req, res, next) => {
	Song.find()
		.select("_id name singer youtubeId lyrics")
		.populate("lyrics")
		.exec()
		.then((songs) => {
			const response = {
				count: songs.length,
				songs: songs.map((song) => {
					return {
						_id: song._id,
						name: song.name,
						singer: song.singer,
						youtubeId: song.youtubeId,
						lyrics: song.lyrics,
					};
				}),
			};
			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

router.post("/seed", async (req, res, next) => {
	await seedSongs();
	await seedLyric();
	res.status(201).json({
		message: "Create seed successfully",
	});
});
async function seedSongs() {
	const songs = [
		{
			_id: new mongoose.Types.ObjectId(),
			name: "thunder",
			singer: "Son Tung",
			youtubeId: "321312",
		},
		{
			_id: new mongoose.Types.ObjectId(),
			name: "thunder demo",
			singer: "Hoai Lam",
			youtubeId: "789678",
		},
	];
	for (song of songs) {
		var newSong = new Song(song);
		await newSong.save();
	}
	const a = await Song.find();
	console.log("Songs: ", a);
}
async function seedLyric() {
	const songThunder = await Song.findOne({ name: "thunder" });
	let lyricFirst = new Lyric({
		_id: new mongoose.Types.ObjectId(),
		lyric: "Just a young gun with the quick fuse",
		timeStar: 20,
		pronounce: "hello",
		translate: "hello world",
		song: songThunder._id,
	});
	let lyricSecond = new Lyric({
		_id: new mongoose.Types.ObjectId(),
		lyric: "Just a young gun with the quick fuse demo",
		timeStar: 15,
		pronounce: "hello",
		translate: "hello world",
		song: songThunder._id,
	});
	await lyricFirst.save();
	await lyricSecond.save();
	songThunder.lyrics.push(lyricFirst);
	songThunder.lyrics.push(lyricSecond);
	await songThunder.save();
}

module.exports = router;
