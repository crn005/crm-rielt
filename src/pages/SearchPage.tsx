// SearchPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategorySelector from '../components/CategorySelector'

interface Subcategory {
	id: number
	name: string
	fields: string
}

const SearchPage: React.FC = () => {
	const [selectedSubcategories, setSelectedSubcategories] = useState<
		Subcategory[]
	>([])

	const navigate = useNavigate()

	// Обработка выбора подкатегорий
	const handleSubcategorySelect = (subcategory: Subcategory) => {
		setSelectedSubcategories(
			prev =>
				prev.some(item => item.id === subcategory.id)
					? prev.filter(item => item.id !== subcategory.id) // Убираем, если уже выбран
					: [...prev, subcategory] // Добавляем объект
		)
	}

	const handleCreateRequest = () => {
		if (selectedSubcategories.length === 0) {
			alert('Выберите хотя бы одну категорию для создания заявки.')
			return
		}

		console.log(
			'Создание заявки с выбранными подкатегориями:',
			selectedSubcategories
		)



		// Переходим на страницу создания заявки с выбранными категориями
		navigate('/create-request', { state: { selectedSubcategories } })
	}


	return (
		<div>
			<h1>Заявки</h1>
			<CategorySelector
				onSelect={handleSubcategorySelect}
				selectedSubcategories={selectedSubcategories}
			/>
			<button className='primary-button my-4' onClick={handleCreateRequest}>
				Создать заявку
			</button>
			<div>
	
			</div>
		</div>
	)
}

export default SearchPage
