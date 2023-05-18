import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authorization } from '../authorization/Authorization';
import { EnterPhone } from '../authorization/EnterPhone';
import { Messenger } from '../messenger/Messenger';

function App() {
	return (
		<div className={styles.App}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Authorization />} />
					<Route path='/enter-phone' element={<EnterPhone />} />
					<Route path='/what`s-up-messenger' element={<Messenger />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
