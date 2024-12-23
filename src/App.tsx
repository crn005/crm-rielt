import { useState } from 'react'
import './App.css'
import { FieldConfig } from './components/DynamicField'
import DynamicForm from './components/DynamicForm'
import SearchPage from './pages/SearchPage'

//import KanbanBoard from './components/KanbanBoard'

const App: React.FC = () => {
	const [categories, setCategories] = useState([]) // Состояние для хранения категорий
	const [selectedCategory, setSelectedCategory] = useState(null)
  const [fields, setFields] = useState<Record<string, FieldConfig> | null>(null)
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

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

	const handleCategoryClick = category => {
		setSelectedCategory(category) // Устанавливаем выбранную категорию
	}

	const handleSubcategoryClick = async subcategory => {
		console.log('Выбранная подкатегория:', subcategory);
		setSelectedCategoryId(subcategory.id)
		const locale = 'RU' // Здесь можно динамически задавать язык
		try {
			const response = await fetch(
				`http://localhost:3005/fields/${locale}/${subcategory.fields}`
			)
			if (!response.ok) {
				throw new Error('Failed to fetch fields')
			}
			const data = await response.json()
			console.log('Полученные поля:', data)
			setFields(data) // Устанавливаем поля в состояние
		} catch (error) {
			console.error('Ошибка при загрузке полей:', error)
		}
	}

	return (
		<div>
			<h1>Добавление объекта</h1>
			<button className='primary-button my-2 mx-2' onClick={handleAddObject}>
				Добавить объект
			</button>
			<div>
				{categories.map(category => (
					<button
						key={category.name}
						className='primary-button my-2 mx-2'
						onClick={() => handleCategoryClick(category)}
					>
						{category.name}
					</button>
				))}
			</div>
			{selectedCategory && (
				<div>
					<h2>Подкатегории для {selectedCategory.name}</h2>
					{selectedCategory.subcategories?.length > 0 ? (
						<div>
							{selectedCategory.subcategories.map(sub => (
								<button
									key={sub.name}
									onClick={() => handleSubcategoryClick(sub)}
									className='primary-button my-2 mx-2'
								>
									{sub.name}
								</button>
							))}
						</div>
					) : (
						<p>Подкатегории отсутствуют</p>
					)}
				</div>
			)}
			{fields && (
				<div>
					<h3>Поля для заполнения</h3>
					{/* <pre>{JSON.stringify(fields, null, 2)}</pre> */}
					{fields && (
						<DynamicForm fields={fields} categoryId={selectedCategoryId} />
					)}
				</div>
			)}
		</div>
	)
}

export default App
