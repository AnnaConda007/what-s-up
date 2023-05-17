import './Messenger.css';
import { useState } from 'react';
export const Messenger = () => {
	const idInstance = localStorage.getItem('idInstance');
	const apiTokenInstance = localStorage.getItem('apiTokenInstance');
	const phoneNum = localStorage.getItem('phoneNum');
	const phoneFormat = phoneNum + '@c.us';
	const [message, setMessage] = useState('');
	const hadlerr = (e) => {
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
				} else {
					console.log('error');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<main className='main'>
			<div className='substrate'></div>
			<div className='main__pnone'>
				<h4 className='main__number'>{phoneNum}</h4>
			</div>
			<div className='main__messages'></div>
			<form className='main__message-form '>
				<div className='main__message' contentEditable='true' onInput={(e) => setMessage(e.target.innerText)}></div>
				<button
					onClick={(e) => {
						hadlerr(e);
					}}
					className='main__btn'
				>
					<img className='main__send' src='send-btn.png' alt='отправить'></img>
				</button>
			</form>
		</main>
	);
};
