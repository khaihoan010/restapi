const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	lyric: { type: String, require: true },
	timeStar: { type: Number, require: true },
	pronounce: { type: String, require: false },
	translate: { type: String, require: false },
	songId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Song",
	},
});

module.exports = mongoose.model("Lyric", productSchema);
