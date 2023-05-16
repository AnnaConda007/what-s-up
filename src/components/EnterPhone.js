import './Forms.css';
export const EnterPhone = () => {
	return (
		<main className='main'>
			<form className='main__form form'>
				<input
					className='form__input'
					id='idInstance'
					required
					autoComplete='off'
					placeholder='Номер телефона получателя'
				></input>
				<button type='submite' className='form__btn'>
					Далее
				</button>
			</form>
		</main>
	);
};
