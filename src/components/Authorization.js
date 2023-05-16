import './Forms.css';

export const Authorization = () => {
	const han = (e) => {
		e.preventDefault();
		const idInstance = '1101821223';
		const apiTokenInstance = '758ada212e094a7883a6ecadf6c3b9e9c6ea1bc713324d8682';

		fetch(`https://api.green-api.com/waInstance/${idInstance}/GetSettings/${apiTokenInstance}`, {
			method: 'GET',
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Failed to fetch settings');
				}
			})
			.then((data) => {})
			.catch((error) => {
				console.log(error);
			});
	};
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
