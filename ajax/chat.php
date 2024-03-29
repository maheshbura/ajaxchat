<?php
require '../core/init.php';
if (isset($_POST['method']) === true && empty($_POST['method']) === false) {

	$chat = new Chat();
	$method = trim($_POST['method']);

	if ($method === 'fetch') {

		// fetch messages and output
		$messages = $chat->fetchMessages();

		if (empty($messages) === true) {
			echo 'There are currently no messages in the chat';
		} else {
			foreach ($messages as $message) {
			?>
				
				<div class="message">
					<a href="#"><?php echo $message['username']; ?></a> says:
					<span><?php echo date("F j, Y, g:i a", $message['timestamp']) ?></span>
					<p><?php echo nl2br($message['content']); ?></p>
					
				</div>

			<?php
			}
		}

	} else if ($method === 'throw' && isset($_POST['message']) === true) {
		// throw message into database
		$message = trim($_POST['message']);
		if(empty($message) === false) {
			$chat->throwMessage($_SESSION['user'], $message);
		}
	}

}