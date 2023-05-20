import styles from './input.module.css';
export const Input = ({ id, autoComplete, placeholder, value, onChange }) => {
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
