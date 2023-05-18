import styles from './forms.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Authorization = () => {
	const [idInstance, setIdInstance] = useState('');
	const [apiTokenInstance, setApiTokenInstance] = useState('');
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
		<main className={styles.main}>
			<form className={styles.main__frame} onSubmit={handleSubmit}>
				<input
					className={styles.frame__input}
					id='idInstance'
					required
					autoComplete='1101821223'
					placeholder='idInstance'
					value={idInstance}
					onChange={(e) => setIdInstance(e.target.value)}
				></input>
				<input
					className={styles.frame__input}
					id='apiTokenInstance'
					required
					autoComplete='758ada212e094a7883a6ecadf6c3b9e9c6ea1bc713324d8682'
					placeholder='apiTokenInstance'
					value={apiTokenInstance}
					onChange={(e) => setApiTokenInstance(e.target.value)}
				></input>
				<button type='submit' className={styles.frame__btn}>
					Войти
				</button>
			</form>
		</main>
	);
};
