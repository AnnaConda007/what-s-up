import styles from './messenger.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { SendBtn } from '../SendBtn/SendBtn';
export const Messenger = () => {
	const idInstance = localStorage.getItem('idInstance');
	const apiTokenInstance = localStorage.getItem('apiTokenInstance');
	const phoneNum = localStorage.getItem('phoneNum');
	const phoneFormat = phoneNum + '@c.us';
	const [newIncoming, SetNewIncoming] = useState('');
	const [incoming, SetIncoming] = useState([]);

	const getMessage = async () => {
		const notification = await fetch(
			`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
			{
				method: 'GET',
			}
		);
		const jsonNotification = await notification.json();
		if (!jsonNotification) return;
		const receiptId = jsonNotification.receiptId;
		const text = jsonNotification.body.messageData.textMessageData.textMessage;
		console.log(text);

		const DeleteNotification = await fetch(
			`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
			{
				method: 'DELETE',
				redirect: 'follow',
			}
		);
		const jsonDeleteNotification = await DeleteNotification.json();
		console.log(jsonDeleteNotification);
	};

	const handleSend = (e) => {
		e.preventDefault();
		fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
			method: 'POST',
			body: JSON.stringify({
				chatId: phoneFormat,
				message: newIncoming,
			}),
		})
			.then((response) => {
				if (response.ok) {
					SetIncoming([...incoming, newIncoming]);
					SetNewIncoming('');
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
	}, []); // !!!!!!!!!!!!  ???????????

	return (
		<>
			<div className={styles.substrate}></div>
			<main className={styles.main}>
				<div className={styles.ppp}>
					<div className={styles.main__pnone}>
						<h4 className={styles.main__number}>{phoneNum}</h4>
					</div>
					<div className={styles.main__messages}>
						{incoming.map((msg, index) => (
							<p key={index} className={styles.messages__message}>
								{msg}
							</p>
						))}
					</div>
					<form className={styles.main__message_form}>
						<input
							className={styles.main__message}
							value={newIncoming}
							onChange={(e) => SetNewIncoming(e.target.value)}
						></input>
						<SendBtn onClick={handleSend}></SendBtn>
					</form>
				</div>
			</main>
		</>
	);
};
