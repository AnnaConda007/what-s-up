import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authorization } from './components/Authorization';
import { EnterPhone } from './components/EnterPhone';
import { Messenger } from './components/Messenger';

function App() {
	return (
		<div className='App'>
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
