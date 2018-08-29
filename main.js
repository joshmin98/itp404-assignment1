$('form').submit((event) => {
    let subreddit = $('input:text').val();
    event.preventDefault();

    $('#results').html('<div class="loader">Loading...</div>');

    let url = `https://www.reddit.com/r/${subreddit}.json`;

    let promise = $.ajax({
	type: 'GET',
	url: url
    });

    promise.then((threads) => {
	console.log(threads.data.children);
	let html = '';
	threads.data.children.forEach((thread) => {
	    let threadTitle = thread.data.title;
	    if (threadTitle.length >= 60) {
		threadTitle = threadTitle.slice(0, 56);
		threadTitle += '...';
	    }
	    html += `<div id="thread"><a href="${thread.data.url} target="_blank"><h2>${threadTitle}</h2></a><h3>Author: ${thread.data.author}</h3><h4>Upvotes: ${thread.data.ups}</h4></div>`;
	});
	$('#results').html(html);
    }, (error) => {
	$('#results').html('<h1 id="error">Error! Thread may not exist.</h1>');
	console.log('Error: ', error);
    });
});
