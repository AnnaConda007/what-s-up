import styles from './messenger.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { SendBtn } from '../SendBtn/SendBtn';
export const Messenger = () => {
	const idInstance = localStorage.getItem('idInstance');
	const apiTokenInstance = localStorage.getItem('apiTokenInstance');
	const phoneNum = localStorage.getItem('phoneNum');
	const phoneFormat = phoneNum + '@c.us';
	const [newOutgoing, SetNewOutgoing] = useState('');
	const [Outgoing, SetOutgoing] = useState([]);
	const [incoming, Setincoming] = useState([]);

	const getMessage = async () => {
		const notification = await fetch(
			`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
			{
				method: 'GET',
			}
		);
		const jsonNotification = await notification.json();
		console.log('jsonNotification', jsonNotification);

		if (!jsonNotification || !jsonNotification.receiptId) return;
		const receiptId = jsonNotification.receiptId;
		const text = jsonNotification.body.messageData?.textMessageData?.textMessage;

		if (text && text !== undefined) {
			console.log('jsonNotification', jsonNotification);
			Setincoming((prevIncoming) => {
				const newIncoming = [...prevIncoming, text];
				console.log('newIncoming', newIncoming);
				return newIncoming;
			});
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
					SetOutgoing([...Outgoing, newOutgoing]);
					console.log('Outgoing', Outgoing);
					SetNewOutgoing('');
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
					<div className={styles.main__pnone}>
						<h4 className={styles.main__number}>{phoneNum}</h4>
					</div>
					<div className={styles.main__messages}>
						<div></div>
						{Outgoing.map((msg, index) => (
							<div key={index} className={styles.messages__frame}>
								<p key={index} className={styles.messages__out}>
									{msg}
								</p>
							</div>
						))}
						{incoming.map((msg, index) => (
							<p key={index} className={styles.messages__inc}>
								{msg}
							</p>
						))}
					</div>
					<form className={styles.main__message_form}>
						<input
							className={styles.main__message}
							value={newOutgoing}
							onChange={(e) => SetNewOutgoing(e.target.value)}
						></input>
						<SendBtn onClick={handleSend}></SendBtn>
					</form>
				</div>
			</main>
		</>
	);
};
