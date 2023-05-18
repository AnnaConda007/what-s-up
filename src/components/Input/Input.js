import styles from './input.module.css';
export const Input = ({ id, autoComplete, placeholder, value, onChange, formatted }) => {
	const handleKeyPress = (e) => {
		/*	const key = e.key;
		
		if (formatted && isNaN(Number(key))) {
			e.preventDefault();
		}                не работает кнопка delete */
	};

	return (
		<input
			required
			className={styles.input}
			id={id}
			autoComplete={autoComplete}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};
