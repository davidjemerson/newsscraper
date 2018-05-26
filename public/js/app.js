
$.getJSON("/articles", function(data) {
	for(var i = 0; i < data.length; i++) {
		$('#articles').append("<div class='card w-30'><img class='card-img-top' src='" + data[i].image +
			"' alt=''><div class='card-body'><h5 class='card-title'><a href='" + data[i].link + "'>" + data[i].title +
			"</a></h5><p class='card-text'>" + data[i].summary + "</p><div class='text-center'><div class='btn-group' role='group'><a class='btn btn-secondary' data-id='" +
			data[i]._id + "' href='#' role='button'>Save This</a><a class='btn btn-secondary' data-id='" +
			data[i]._id + "' href='#' role='button'>Leave a Comment</a></div></div></div></div>");
	}
});