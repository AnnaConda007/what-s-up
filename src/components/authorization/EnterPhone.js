import styles from './forms.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EnterPhone = () => {
	const apiTokenInstance = localStorage.getItem('apiTokenInstance');
	const navigate = useNavigate();
	const idInstance = localStorage.getItem('idInstance');
	const [phoneNum, setPhoneNum] = useState('');
	const handleNext = (e) => {
		e.preventDefault();
		localStorage.setItem('phoneNum', phoneNum);
		console.log(apiTokenInstance, idInstance);
		navigate('/what`s-up-messenger');
	};

	return (
		<main className={styles.main}>
			<div className={styles.main__frame}>
				<input
					className={styles.frame__input}
					id='numberPhone'
					required
					autoComplete='995555598092'
					placeholder='Номер телефона получателя'
					value={phoneNum}
					onChange={(e) => setPhoneNum(e.target.value)}
				></input>
				<button
					type='submit'
					className={styles.frame__btn}
					onClick={(e) => {
						handleNext(e);
					}}
				>
					Создать чат
				</button>
			</div>
		</main>
	);
};
