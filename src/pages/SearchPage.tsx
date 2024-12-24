// SearchPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategorySelector from '../components/CategorySelector'

const SearchPage: React.FC = () => {
	const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>(
		[]
	)
	const [results, setResults] = useState([])
	const navigate = useNavigate()

	// Обработка выбора подкатегорий
	const handleSubcategorySelect = (subcategoryId: number) => {
		setSelectedSubcategories(
			prev =>
				prev.includes(subcategoryId)
					? prev.filter(id => id !== subcategoryId) // Убираем, если уже выбрано
					: [...prev, subcategoryId] // Добавляем, если ещё не выбрано
		)
	}

		const handleCreateRequest = () => {
			if (selectedSubcategories.length === 0) {
				alert('Выберите хотя бы одну категорию для создания заявки.')
				return
			}

			// Переходим на страницу создания заявки с выбранными категориями
			navigate('/create-request', { state: { selectedSubcategories } })
		}

	// Отправка выбранных категорий на сервер
	const handleSearch = async () => {
		try {
			console.log('Выбранные подкатегории:', selectedSubcategories)
			const response = await fetch('http://localhost:3005/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ subcategories: selectedSubcategories }),
			})

			if (response.ok) {
				const data = await response.json()
				setResults(data)
			} else {
				console.error('Ошибка при поиске:', response.statusText)
			}
		} catch (error) {
			console.error('Ошибка при выполнении запроса:', error)
		}
	}

	return (
		<div>
			<h1>Поиск объектов</h1>
			<CategorySelector
				onSelect={handleSubcategorySelect}
				selectedSubcategories={selectedSubcategories}
			/>
			<button className='primary-button my-4' onClick={handleCreateRequest}>
				Создать заявку
			</button>
			<div>
				<h2>Результаты поиска</h2>
				<pre>{JSON.stringify(results, null, 2)}</pre>
			</div>
		</div>
	)
}

export default SearchPage
