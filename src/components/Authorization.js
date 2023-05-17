import './Forms.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Authorization = () => {
	const [idInstance, setIdInstance] = useState(''); //1101821223
	const [apiTokenInstance, setApiTokenInstance] = useState(''); //758ada212e094a7883a6ecadf6c3b9e9c6ea1bc713324d8682
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`https://api.green-api.com/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`, {
			method: 'GET',
		})
			.then((response) => {
				if (response.ok) {
					navigate('/enter-phone');
					localStorage.setItem('idInstance', idInstance);
					localStorage.setItem('apiTokenInstance', apiTokenInstance);
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
					id='idInstance'
					required
					autoComplete='1101821223'
					placeholder='idInstance'
					value={idInstance}
					onChange={(e) => setIdInstance(e.target.value)}
				></input>
				<input
					className='form__input'
					id='apiTokenInstance'
					required
					autoComplete='758ada212e094a7883a6ecadf6c3b9e9c6ea1bc713324d8682'
					placeholder='apiTokenInstance'
					value={apiTokenInstance}
					onChange={(e) => setApiTokenInstance(e.target.value)}
				></input>
				<button onClick={handleSubmit} type='submit' className='form__btn'>
					Войти
				</button>
			</form>
		</main>
	);
};
