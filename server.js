const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const TMDB_API = "71bd251de003b28f5ec266b4eca971d6"


app.use(cors());

app.get("/popular", async (req, res) => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API}&language=tr-US&`);
	const data = await response.json();
	res.json(data);
});
app.get("/search", async (req, res) => {
	const searchquery = req.query.query;
	const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API}&query=${searchquery}`);
	const data = await response.json();
	res.json(data);
})
app.listen("5500", () => {
	console.log("server is running port : 5500")
})