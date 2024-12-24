// DynamicField.tsx
import React, { useState } from 'react'
import '../App.css'

export interface FieldConfig {
	controlType:
		| 'dropdown'
		| 'buttons'
		| 'checkbox'
		| 'text'
		| 'number'
		| 'textarea'
	options?: string[]
	multiple?: boolean
	required?: boolean
	label?: string,
  placeholder?: string,
  rows?: number,
	default?: boolean | string | number
}

interface DynamicFieldProps {
	fieldKey: string
	fieldConfig: FieldConfig
	onChange: (key: string, value: any) => void
}

const DynamicField: React.FC<DynamicFieldProps> = ({
	fieldKey,
	fieldConfig,
	onChange,
}) => {
	const [selectedValues, setSelectedValues] = useState<string[] | string>(
		fieldConfig.multiple ? [] : ''
	)

	const handleButtonClick = (option: string) => {
		if (fieldConfig.multiple) {
			setSelectedValues(prev =>
				Array.isArray(prev)
					? prev.includes(option)
						? prev.filter(item => item !== option)
						: [...prev, option]
					: [option]
			)
			onChange(fieldKey, selectedValues)
		} else {
			setSelectedValues(option)
			onChange(fieldKey, option)
		}
	}

	switch (fieldConfig.controlType) {
		case 'buttons':
			return (
				<div className='mt-8 '>
					<label className='mt-4 text-xl font-semibold'>
						{fieldConfig.label || fieldKey}
					</label>
					<div>
						{fieldConfig.options?.map(option => (
							<button
								className={`primary-button my-2 mx-2 ${
									(
										fieldConfig.multiple
											? Array.isArray(selectedValues) &&
											  selectedValues.includes(option)
											: selectedValues === option
									)
										? 'active'
										: ''
								}`}
								key={option}
								type='button'
								onClick={() => handleButtonClick(option)}
							>
								{option}
							</button>
						))}
					</div>
				</div>
			)

		case 'number':
			return (
				<div className='mt-8 '>
					<div>
						<label className='mt-4 text-xl font-semibold'>
							{fieldConfig.label || fieldKey}
						</label>
					</div>
					<div>
						<input
							className='bw-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700 transition-all duration-150'
							type='number'
							onChange={e => onChange(fieldKey, e.target.value)}
						/>
					</div>
				</div>
			)
		case 'text':
			return (
				<div className='mt-8 '>
					<div>
						<label className='mt-4 text-xl font-semibold'>
							{fieldConfig.label || fieldKey}
						</label>
					</div>
					<div>
						<input
							className='/>'
							type='text'
							onChange={e => onChange(fieldKey, e.target.value)}
						/>
					</div>
				</div>
			)
		case 'textarea':
			return (
				<div className='mt-8 '>
					<div>
						<label className='mt-4 text-xl font-semibold'>
							{fieldConfig.label || fieldKey}
						</label>
					</div>
					<div className='mr-2'>
						<textarea
							className='textarea-primary'
							placeholder={fieldConfig.placeholder}
							rows={fieldConfig.rows}
							onChange={e => onChange(fieldKey, e.target.value)}
						></textarea>
					</div>
				</div>
			)

		case 'dropdown':
			return (
				<div className='mt-8 inline-block relative w-64'>
					<label className='mt-4 text-xl font-semibold'>
						{fieldConfig.label || fieldKey}
					</label>
					<select
						className='dropdown-primary'
						multiple={fieldConfig.multiple}
						onChange={e =>
							onChange(
								fieldKey,
								fieldConfig.multiple
									? Array.from(e.target.selectedOptions).map(o => o.value)
									: e.target.value
							)
						}
					>
						{fieldConfig.options?.map(option => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			)

		case 'checkbox':
			if (fieldConfig.options) {
				return (
					<div className='mt-8 '>
						<label className='mt-8 mb-4 text-xl font-semibold'>
							{fieldConfig.label || fieldKey}
						</label>
						{fieldConfig.options.map(option => (
							<label
								className='flex items-center space-x-2 mb-2 text-xl'
								key={option}
							>
								<input
									className='mr-3 w-5 h-5'
									type='checkbox'
									onChange={e =>
										onChange(fieldKey, {
											...fieldConfig.default,
											[option]: e.target.checked,
										})
									}
								/>
								{option}
							</label>
						))}
					</div>
				)
			} else {
				return (
					<div className=''>
						<label className='flex items-center space-x-2 mb-2 text-xl'>
							<input
								className='mr-3 w-5 h-5'
								type='checkbox'
								defaultChecked={fieldConfig.default as boolean}
								onChange={e => onChange(fieldKey, e.target.checked)}
							/>
							{fieldConfig.label || fieldKey}
						</label>
					</div>
				)
			}

		default:
			return null
	}
}

export default DynamicField
