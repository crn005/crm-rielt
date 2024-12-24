import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DynamicForm from '../components/DynamicForm'

const CreateRequestPage: React.FC = () => {
	const location = useLocation()
	const { selectedSubcategories } = location.state as {
		selectedSubcategories: number[]
	}

	const [fields, setFields] = useState<Record<string, any>>({})
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		// Запрос на сервер с выбранными категориями
		const fetchFields = async () => {
			try {
				const response = await fetch('http://localhost:3005/request-fields', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ subcategories: selectedSubcategories }),
				})

				if (response.ok) {
					const data = await response.json()
					setFields(data)
				} else {
					console.error('Ошибка при загрузке полей:', response.statusText)
				}
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchFields()
	}, [selectedSubcategories])

	if (isLoading) {
		return <p>Загрузка...</p>
	}

	return (
		<div>
			<h1>Создание заявки</h1>
			<DynamicForm fields={fields} />
		</div>
	)
}

export default CreateRequestPage
