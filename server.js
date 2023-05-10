require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
// const cookieSession = require("cookie-session");
const session = require('express-session');
const passportStrategy = require("./passport");
const cookieParser = require("cookie-parser");
const app = express();

// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );
app.use(cookieParser());
app.use(session({
	secret: `${process.env.CLIENT_SECRET}`,
	resave: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: false,
		secure: true,
		sameSite: 'none',
	}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
		allowedHeaders: ['X-Requested-With', 'XMLHttpRequest', 'Access-Control-Allow-Origin', 'Content-Type', 'Accept', 'Authorization', 'Origin'],
	})
);
app.use("/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
