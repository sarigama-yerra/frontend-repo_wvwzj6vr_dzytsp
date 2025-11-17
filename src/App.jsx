import { useEffect, useMemo, useState } from 'react'
import Filters from './components/Filters'
import CoursesGrid from './components/CoursesGrid'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [options, setOptions] = useState({ categories: [], levels: [], tags: [] })
  const [data, setData] = useState({ items: [], total: 0, page: 1, total_pages: 1, page_size: 9 })
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    q: '',
    category: '',
    level: '',
    is_free: false,
    min_rating: '',
    sort: 'popular',
    page: 1,
    page_size: 9,
  })

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/courses/filters`)
        const json = await res.json()
        setOptions({ categories: json.categories || [], levels: json.levels || [], tags: json.tags || [] })
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const fetchCourses = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== '' && v !== false && v !== null && v !== undefined) params.append(k, String(v))
      })
      try {
        const res = await fetch(`${BACKEND}/api/courses?${params.toString()}`, { signal: controller.signal })
        const json = await res.json()
        setData(json)
      } catch (e) {
        if (e.name !== 'AbortError') console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
    return () => controller.abort()
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Course Catalog</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/test" className="hover:text-indigo-600">Backend Test</a>
            <a href="https://demo.edublink.co/courses/?course_preset=1" target="_blank" className="text-gray-400 hover:text-gray-600">Reference</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Filters filters={filters} setFilters={setFilters} options={options} />
          </div>
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white h-80 rounded-xl border" />
                ))}
              </div>
            ) : (
              <CoursesGrid {...data} onPage={(p) => setFilters(f => ({ ...f, page: p }))} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
