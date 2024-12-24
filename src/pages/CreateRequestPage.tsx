import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DynamicForm from '../components/DynamicForm'

const CreateRequestPage: React.FC = () => {
	const location = useLocation()
	const { selectedSubcategories } = location.state || {
		selectedSubcategories: [],
	}
	 const [fields, setFields] = useState<Record<string, any>>({})
		const [categoryId, setCategoryId] = useState<number | null>(null)

	useEffect(() => {
		if (!selectedSubcategories || selectedSubcategories.length === 0) {
			console.error('Нет выбранных категорий для создания заявки')
			return
		}

		// Делаем запрос на сервер с переданными данными
		const fetchFields = async () => {
			try {
				const response = await fetch('http://localhost:3005/request-fields', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ selectedSubcategories }),
				})

				if (response.ok) {
					const data = await response.json()
					console.log('Полученные данные полей:', data)
					setFields(data.fields) // JSON должен содержать объект `fields`
					setCategoryId(data.categoryId) // JSON должен содержать `categoryId`
					// Обработайте полученные данные здесь
				} else {
					console.error('Ошибка при получении полей:', response.statusText)
				}
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error)
			}
		}

		fetchFields()
	}, [selectedSubcategories])


    if (!fields || !categoryId) {
			return <div>Загрузка...</div>
		}

	return (
		<div>
			<h1>Создание заявки</h1>
			<DynamicForm fields={fields} categoryId={categoryId} />
		</div>
	)
}

export default CreateRequestPage
