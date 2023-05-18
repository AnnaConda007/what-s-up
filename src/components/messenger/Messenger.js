import styles from './messenger.module.css';
import { useState } from 'react';

export const Messenger = () => {
	const idInstance = localStorage.getItem('idInstance');
	const apiTokenInstance = localStorage.getItem('apiTokenInstance');
	const phoneNum = localStorage.getItem('phoneNum');
	const phoneFormat = phoneNum + '@c.us';

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	fetch(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`, {
		method: 'GET',
	})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});

	fetch(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}`, {
		method: 'DELETE',
		redirect: 'follow',
	}).then((response) => {
		console.log(response);
	});

	const handleSend = (e) => {
		e.preventDefault();
		fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
			method: 'POST',
			body: JSON.stringify({
				chatId: phoneFormat,
				message: message,
			}),
		})
			.then((response) => {
				if (response.ok) {
					console.log(response);
					setMessages([...messages, message]);
					setMessage('');
					console.log(messages);
				} else {
					console.log('error');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<main className={styles.main}>
			<div className={styles.substrate}></div>
			<div className={styles.main__pnone}>
				<h4 className={styles.main__number}>{phoneNum}</h4>
			</div>
			<div className={styles.main__messages}>
				{messages.map((msg, index) => (
					<p key={index} className={styles.messages__message}>
						{msg}
					</p>
				))}
			</div>
			<form className={styles.main__message_form}>
				<textarea
					className={styles.main__message}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				></textarea>
				<button onClick={handleSend} className={styles.main__btn}>
					<img className={styles.main__send} src='send-btn.png' alt='отправить'></img>
				</button>
			</form>
		</main>
	);
};
