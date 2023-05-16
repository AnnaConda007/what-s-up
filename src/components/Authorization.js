import './Authorization.css';
export const Authorization = () => {
	return (
		<main className='main'>
			<form className='main__form form'>
				<input className='form__input' id='idInstance' required autoComplete='off' placeholder='idInstance'></input>
				<input
					className='form__input'
					id='apiTokenInstance'
					required
					autoComplete='off'
					placeholder='apiTokenInstance'
				></input>
				<button type='submite' className='form__btn'>
					Войти
				</button>
			</form>
		</main>
	);
};
