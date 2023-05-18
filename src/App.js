import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authorization } from './components/authorization/Authorization';
import { EnterPhone } from './components/authorization/EnterPhone';
import { Messenger } from './components/messenger/Messenger';

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
