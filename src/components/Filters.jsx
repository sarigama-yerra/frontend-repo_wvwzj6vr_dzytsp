import React from 'react'

export default function Filters({ filters, setFilters, options }) {
  const onChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value, page: 1 }))

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-6 h-fit">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Filters</h4>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Search</label>
          <input
            type="text"
            value={filters.q}
            onChange={e => onChange('q', e.target.value)}
            placeholder="Search courses"
            className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={e => onChange('category', e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All</option>
            {options.categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Level</label>
          <select
            value={filters.level}
            onChange={e => onChange('level', e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All</option>
            {options.levels.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700">Free only</label>
          <input
            type="checkbox"
            checked={filters.is_free}
            onChange={e => onChange('is_free', e.target.checked)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Min rating</label>
          <input type="number" step="0.1" min="0" max="5" value={filters.min_rating}
            onChange={e => onChange('min_rating', e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Sort by</label>
          <select
            value={filters.sort}
            onChange={e => onChange('sort', e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="new">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
