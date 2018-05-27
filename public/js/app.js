

$.getJSON("/articles", function(data) {
	for(var i = 0; i < data.length; i++) {
		$('#articles').append("<div class='card w-30'><img class='card-img-top' src='" + data[i].image +
			"' alt=''><div class='card-body'><h5 class='card-title'><a href='" + data[i].link + "'>" + data[i].title +
			"</a></h5><p class='card-text'>" + data[i].summary + "</p><div class='text-center'><div class='btn-group' role='group'><button class='btn btn-secondary save' type='button' data-id='" +
			data[i]._id + "' href='#'>Save This</a><button class='btn btn-secondary comment' type='button' data-toggle='modal' data-target='#commentModal' data-id='" +
			data[i]._id + "'>Leave a Comment</button></div></div></div></div>");
	}
});

$(document).on("click", ".save", function() {
	var thisID = $(this).attr("data-id");
	
});