var chat = {}

chat.fetchMessages = function () {
	$.ajax({
		url: 'ajax/chat.php',
		type: 'post',
		data: { method: 'fetch' },
		success: function(data) {
			$('.chat .messages').html(data);
			// $('.chat .messages').scrollTop = $('.chat .messages').scrollHeight;
			$('.chat .messages').scrollTop($('.chat .messages')[0].scrollHeight);
		}
	});
}

chat.throwMessage = function(message) {
	if($.trim(message).length != 0) {
		$.ajax({
			url: 'ajax/chat.php',
			type: 'post',
			data: { method: 'throw', message: message },
			success: function(data) {
				chat.fetchMessages();
				chat.entry.val('');
			}
		});
	}
}

chat.entry = $('.chat .entry');
chat.entry.bind('keydown', function(e) {
	// console.log(e.keyCode);
	if (e.keyCode === 13 && e.shiftKey === false) {
		//throw message
		chat.throwMessage($(this).val());
		e.preventDefault();
	}
});

chat.interval = setInterval(chat.fetchMessages, 5000);
chat.fetchMessages();

$('.title').click(function(e) {
	e.preventDefault();
	$('.chat-box').slideToggle();
});

// $('textarea').autoResize();