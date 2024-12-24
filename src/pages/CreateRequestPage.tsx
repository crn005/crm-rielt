import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const CreateRequestPage: React.FC = () => {
	const location = useLocation()
	const { selectedSubcategories } = location.state || {
		selectedSubcategories: [],
	}

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

	return (
		<div>
			<h1>Создание заявки</h1>
			{/* Ваш интерфейс для работы с заявкой */}
		</div>
	)
}

export default CreateRequestPage
