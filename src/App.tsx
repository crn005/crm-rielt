import { useState } from 'react'
import './App.css'
//import KanbanBoard from './components/KanbanBoard'

function App() {
	const [categories, setCategories] = useState([]) // Состояние для хранения категорий

	const handleAddObject = async () => {
		try {
			const response = await fetch('http://localhost:3005/categories/ru') // Запрос к серверу
			if (!response.ok) {
				throw new Error('Failed to fetch categories')
			}
			const data = await response.json() // Парсинг ответа
			console.log('Полученные данные:', data) // Логируем данные
			setCategories(data.categories) // Установка категорий в состояние
		} catch (error) {
			console.error('Error fetching categories:', error)
		}
	}

	return (
		<div>
			<h1>Добавление объекта</h1>
			<button onClick={handleAddObject}>Добавить объект</button>
			<div>
				{categories.map(category => (
					<button className='primary-button
					my-2 mx-2'>
						{category.name}
					</button>
				))}
			</div>
		</div>
	)
}

export default App
