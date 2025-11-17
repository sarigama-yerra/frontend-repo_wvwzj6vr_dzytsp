import React from 'react'

function Stars({ rating }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`}>★</span>
      ))}
      {half && <span>☆</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="text-gray-300">★</span>
      ))}
    </div>
  )
}

export default function CourseCard({ course }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        {course.is_free ? (
          <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded">Free</span>
        ) : course.old_price ? (
          <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-semibold px-2.5 py-1 rounded">Sale</span>
        ) : null}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{course.category}</span>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">{course.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">{course.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stars rating={course.rating} />
            <span className="text-xs text-gray-500">({course.rating_count})</span>
          </div>
          <span className="text-xs text-gray-500">{course.students} students</span>
        </div>
        <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
          <span>{course.lessons} lessons</span>
          <span>•</span>
          <span>{course.duration}</span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            {course.is_free ? (
              <span className="text-emerald-600 font-semibold">Free</span>
            ) : (
              <>
                <span className="text-gray-900 font-semibold">${course.price.toFixed(2)}</span>
                {course.old_price && (
                  <span className="text-sm text-gray-400 line-through">${course.old_price.toFixed(2)}</span>
                )}
              </>
            )}
          </div>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View details →</button>
        </div>
      </div>
    </div>
  )
}
