import './Messenger.css';
export const Messenger = () => {
	return (
		<main className='main'>
			<div className='substrate'></div>
			<div className='main__pnone'>
				<h4 className='main__number'>+ 7 888888888888</h4>
			</div>
			<div className='main__messages'></div>
			<form className='main__message-form '>
				<div class='main__message' contenteditable='true'></div>
				<button className='main__btn'>
					<img className='main__send' src='send-btn.png' alt='отправить'></img>
				</button>
			</form>
		</main>
	);
};
