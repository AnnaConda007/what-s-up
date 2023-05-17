import './Forms.css';
import { useState } from 'react';

export const EnterPhone = () => {
	const apiTokenInstance = localStorage.getItem('apiTokenInstance');
	const idInstance = localStorage.getItem('idInstance');
	const [phoneNum, setPhoneNum] = useState('');
	const handleNext = (e) => {
		e.preventDefault();
		localStorage.setItem('phoneNum', phoneNum);
		console.log(apiTokenInstance, idInstance);
		fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
			method: 'POST',
			body: JSON.stringify({
				chatId: '995555598092@c.us',
				message: 'I use Green-API to send this message to you!',
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
			<form className='main__form form'>
				<input
					className='form__input'
					id='numberPhone'
					required
					autoComplete='off'
					placeholder='Номер телефона получателя'
					value={phoneNum}
					onChange={(e) => setPhoneNum(e.target.value)}
				></input>
				<button
					type='submit'
					className='form__btn'
					onClick={(e) => {
						handleNext(e);
					}}
				>
					Далее
				</button>
			</form>
		</main>
	);
};
