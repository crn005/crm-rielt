import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import CreateRequestPage from './pages/CreateRequestPage'

const App: React.FC = () => {
	return (
		<Router>
			<nav className='navbar'>
				<Link to='/'>Главная</Link>
				<Link to='/search'>Заявки</Link>
			</nav>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/search' element={<SearchPage />} />
				<Route path="/create-request" element={<CreateRequestPage />} />
			</Routes>
		</Router>
	)
}

export default App
