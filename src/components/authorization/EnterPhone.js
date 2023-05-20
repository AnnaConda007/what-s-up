import styles from './forms.module.css';
import { Input } from '../Input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EnterPhone = () => {
	const navigate = useNavigate();
	const [phoneNum, setPhoneNum] = useState('');
	const handleNext = (e) => {
		e.preventDefault();
		localStorage.setItem('phoneNum', phoneNum);
		navigate('/what`s-up-messenger');
	};
	return (
		<main className={styles.main}>
			<form
				className={styles.main__frame}
				onSubmit={(e) => {
					handleNext(e);
				}}
			>
				<Input
					id='numberPhone'
					autoComplete='off'
					placeholder='Номер телефона получателя'
					value={phoneNum}
					onChange={(e) => setPhoneNum(e.target.value)}
				></Input>
				<button className={styles.frame__btn}>Создать чат</button>
			</form>
		</main>
	);
};
