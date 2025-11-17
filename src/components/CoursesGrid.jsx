import React from 'react'
import CourseCard from './CourseCard'

export default function CoursesGrid({ items, page, total, total_pages, page_size, onPage }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>

      {total_pages > 1 && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 text-sm">
          <span className="text-gray-600">Page {page} of {total_pages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border text-gray-700 disabled:opacity-40 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => onPage(Math.min(total_pages, page + 1))}
              disabled={page === total_pages}
              className="px-3 py-1.5 rounded-lg border text-gray-700 disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
