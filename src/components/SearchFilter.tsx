import React, { useState } from 'react'
import '../App.css'

interface SearchFilters {
	city?: string
	priceMin?: number
	priceMax?: number
	rooms?: number
}

interface SearchFilterProps {
	onSearch: (filters: SearchFilters) => void
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
	const [filters, setFilters] = useState<SearchFilters>({})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFilters(prev => ({
			...prev,
			[name]: value
				? name.includes('price') || name === 'rooms'
					? Number(value)
					: value
				: undefined,
		}))
	}

	const handleSearch = () => {
		onSearch(filters)
	}

	return (
		<div className='search-filter'>
			<h2>Фильтры</h2>
			<div className='filter-item'>
				<label>Город:</label>
				<input
					className='edit-primary'
					type='text'
					name='city'
					value={filters.city || ''}
					onChange={handleInputChange}
				/>
			</div>
			<div className='filter-item'>
				<label>Цена от:</label>
				<input
					className='edit-primary'
					type='number'
					name='priceMin'
					value={filters.priceMin || ''}
					onChange={handleInputChange}
				/>
			</div>
			<div className='filter-item'>
				<label>Цена до:</label>
				<input
					className='edit-primary'
					type='number'
					name='priceMax'
					value={filters.priceMax || ''}
					onChange={handleInputChange}
				/>
			</div>
			<div className='filter-item'>
				<label>Количество комнат:</label>
				<input
					className='edit-primary'
					type='number'
					name='rooms'
					value={filters.rooms || ''}
					onChange={handleInputChange}
				/>
			</div>
			<button className='primary-button' onClick={handleSearch}>
				Найти
			</button>
		</div>
	)
}

export default SearchFilter
