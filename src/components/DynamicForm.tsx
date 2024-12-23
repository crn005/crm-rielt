// DyncamicForm.tsx
import React, { useState } from 'react'
import DynamicField, { FieldConfig } from './DynamicField'

interface DynamicFormProps {
	fields: Record<string, FieldConfig>
	categoryId: number // Добавляем categoryId как обязательный пропс
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, categoryId }) => {
	const [formData, setFormData] = useState<Record<string, any>>({})

	const handleChange = (fieldKey: string, value: any) => {
		setFormData(prev => ({
			...prev,
			[fieldKey]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
      const payload = {
        ...formData,
				categoryId, // Добавляем categoryId
			}
      console.log('Данные формы перед отправкой:', payload)

			const response = await fetch('http://localhost:3005/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})

			if (response.ok) {
				const result = await response.json()
				console.log('Ответ от сервера:', result)
			} else {
				console.error('Ошибка при отправке данных:', response.statusText)
			}
		} catch (error) {
			console.error('Ошибка при выполнении запроса:', error)
		}
	}

	/* console.log(`🎈 = ${JSON.stringify(fields)}`); */

	return (
		<form className='pl-10' onSubmit={handleSubmit}>
			{Object.entries(fields).map(([fieldKey, fieldConfig]) => (
				<DynamicField
					key={fieldKey}
					fieldKey={fieldKey}
					fieldConfig={fieldConfig}
					onChange={handleChange}
				/>
			))}
			<button className='primary-button my-2 mx-2' type='submit'>
				Сохранить
			</button>
		</form>
	)
}

export default DynamicForm
