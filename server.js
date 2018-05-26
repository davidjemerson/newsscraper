var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req, res) {
	request('https://www.npr.org/sections/news/', function(error, response, html) {
		var $ = cheerio.load(html);
		$('article.has-image').each(function(i, element) {
			var result = {};
			result.image = $(element).find('div.item-image').find('div.imagewrap').find('a').find('img').attr('src');
			result.title = $(element).find('div.item-info').find('.title').find('a').text();
			result.link = $(element).find('div.item-info').find('.title').find('a').attr('href');
			result.summary = $(element).find('p').find('a').text();

			db.Article.create(result)
				.then(function(dbArticle) {
					console.log(dbArticle);
				})
				.catch(function(err) {
					return res.json(err);
				});
		});

		res.send("Articles Scraped!");
	});
});

app.get("/articles", function(req, res) {
	db.Article.find({})
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
});

app.get("/articles/:id", function(req, res) {
	db.Article.findOne({_id:req.params.id})
		.populate("comment")
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
});

app.post("/articles/:id", function(req, res) {
	db.Comment.create(req.body)
		.then(function(dbComment) {
			return db.Article.findOneAndUpdate({_id:req.params.id}, {comment:dbComment._id}, {new: true});
		})
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});