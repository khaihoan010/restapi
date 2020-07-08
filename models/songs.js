const mongoose = require("mongoose");
const songModel = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: "Name is required!",
	},
	singer: {
		type: String,
	},
	youtubeId: {
		type: String,
	},
	lyrics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lyric" }],
});
module.exports = mongoose.model("Songs", songModel);
