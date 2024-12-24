// CategorySelector.tsx
import React, { useEffect, useState } from 'react'
import '../App.css'

interface Subcategory {
	id: number
	name: string
	fields: string
}

interface Category {
	name: string
	subcategories: Subcategory[]
}

const CategorySelector: React.FC<{
	onSelect: (subcategory: Subcategory) => void
	selectedSubcategories: Subcategory[]
}> = ({ onSelect, selectedSubcategories }) => {
	const [categories, setCategories] = useState<Category[]>([])

	useEffect(() => {
		// Загружаем JSON с сервера
		const fetchCategories = async () => {
			try {
				const response = await fetch('http://localhost:3005/categories/ru')
				if (response.ok) {
					const data = await response.json()
					setCategories(data.categories) // Предполагается, что JSON имеет корневой ключ
				} else {
					console.error('Ошибка при загрузке категорий:', response.statusText)
				}
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error)
			}
		}
		fetchCategories()
	}, [])

	return (
		<div>
			{categories.map(category => (
				<div key={category.name} className='category-section'>
					<h2>{category.name}</h2>
					<div>
						{category.subcategories.map(subcategory => (
							<button
								key={subcategory.id}
								className={`primary-button my-2 mx-2 ${
									selectedSubcategories.some(item => item.id === subcategory.id)
										? 'active'
										: ''
								}`}
								onClick={() => onSelect(subcategory)}
							>
								{subcategory.name}
							</button>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default CategorySelector
