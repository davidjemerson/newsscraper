var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true,
		unique: true
	},
	summary: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	},
	saved: {
		type: Boolean,
		default: false
	}
});

ArticleSchema.methods.saveArticle = function() {
  this.saved = true;
  return this.saved;
};

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article; 