const express = require("express");

const app = express();
const morgan = require("morgan");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const songRoutes = require("./api/routes/songs");
mongoose.connect("mongodb://localhost:27017/test?retryWrites=true&w=majority");
// mongoose.connect(
//     "mongodb+srv://khaihoankh011:"+
//     process.env.MONGO_ATLAS_PW +
//     "@cluster0.x2gj4.mongodb.net/test?retryWrites=true&w=majority"
// );

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control_Allow-Origin", "*");
	res.header(
		"Access-Control_Allow-Headers",
		"Origin, X-Request-With, Content-Type, Accept, Authoriztion"
	);

	if (req.method === "OPTIONS") {
		res.header(
			"Access-Control_Allow-Methods",
			"PUT",
			"POST",
			"PATCH",
			"DELETE"
		);
		return res.status(200).json({});
	}
	next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/songs", songRoutes);

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
