import styles from './messenger.module.css';
import { useEffect, useState } from 'react';
import { SendBtn } from '../SendBtn/SendBtn';

export const Messenger = () => {
	const idInstance = localStorage.getItem('idInstance');
	const apiTokenInstance = localStorage.getItem('apiTokenInstance');
	const phoneNum = localStorage.getItem('phoneNum');
	const phoneFormat = phoneNum + '@c.us';
	const [newOutgoing, setNewOutgoing] = useState('');
	const [messages, setMessages] = useState([]);

	const getMessage = async () => {
		const notification = await fetch(
			`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
			{
				method: 'GET',
			}
		);
		const jsonNotification = await notification.json();

		if (!jsonNotification || !jsonNotification.receiptId) return;
		const receiptId = jsonNotification.receiptId;
		const text = jsonNotification.body.messageData?.textMessageData?.textMessage;

		if (text && text !== undefined) {
			setMessages((prevMessages) => [...prevMessages, { text, isOutgoing: false }]);
		}

		fetch(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`, {
			method: 'DELETE',
			redirect: 'follow',
		});
	};

	const handleSend = (e) => {
		e.preventDefault();
		fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
			method: 'POST',
			body: JSON.stringify({
				chatId: phoneFormat,
				message: newOutgoing,
			}),
		})
			.then((response) => {
				if (response.ok) {
					setMessages((prevMessages) => [...prevMessages, { text: newOutgoing, isOutgoing: true }]);
					setNewOutgoing('');
				} else {
					alert('Ошибка при отправке');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			getMessage();
		}, 5000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<>
			<div className={styles.substrate}></div>
			<main className={styles.main}>
				<div className={styles.main__wrap}>
					<div className={styles.main__phone}>
						<h4 className={styles.main__number}>{phoneNum}</h4>
					</div>
					<div className={styles.main__messages}>
						{messages.map((msg, index) => (
							<div key={index} className={msg.isOutgoing ? styles.messages__frameOut : styles.messages__frameInc}>
								<p className={styles.message}>{msg.text}</p>
							</div>
						))}
					</div>
					<form className={styles.main__message_form} onSubmit={handleSend}>
						<input
							className={styles.main__message}
							value={newOutgoing}
							onChange={(e) => setNewOutgoing(e.target.value)}
							placeholder='Type a message...'
						></input>
						<SendBtn onClick={handleSend}></SendBtn>
					</form>
				</div>
			</main>
		</>
	);
};
