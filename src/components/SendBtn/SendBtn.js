import styles from './SendBtn.module.css';
export const SendBtn = ({ onClick }) => {
	return (
		<button onClick={onClick} className={styles.btn}>
			<img className={styles.send} src='send-btn.png' alt='отправить'></img>
		</button>
	);
};
