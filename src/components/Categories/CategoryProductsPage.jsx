import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '../Cards/ProductCard'
import { fetchCategoryProducts } from '../../redux/features/categories/categoriesSlice'
import styles from './CategoryProductsPage.module.css'

function CategoryProductsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { itemsByCategory, loadingByCategory, errorByCategory, categories } =
    useSelector((s) => s.categories)

  const products = itemsByCategory?.[id] || []
  const loading = loadingByCategory?.[id] || false
  const error = errorByCategory?.[id] || null

  const categoryTitle =
    categories?.find((c) => String(c?.id ?? c?._id) === String(id))?.title ||
    categories?.find((c) => String(c?.id ?? c?._id) === String(id))?.name ||
    'Категория'

  useEffect(() => {
    if (!id) return
    dispatch(fetchCategoryProducts(id))
  }, [dispatch, id])

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [onlyDiscount, setOnlyDiscount] = useState(false)
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let list = [...products]

    if (onlyDiscount) {
      list = list.filter(
        (p) => p.discont_price != null && Number(p.discont_price) > 0,
      )
    }

    const min = from === '' ? null : Number(from)
    const max = to === '' ? null : Number(to)

    if (min !== null && !Number.isNaN(min)) {
      list = list.filter((p) => Number(p.discont_price ?? p.price) >= min)
    }

    if (max !== null && !Number.isNaN(max)) {
      list = list.filter((p) => Number(p.discont_price ?? p.price) <= max)
    }

    if (sort === 'price_asc') {
      list.sort(
        (a, b) => (a.discont_price ?? a.price) - (b.discont_price ?? b.price),
      )
    } else if (sort === 'price_desc') {
      list.sort(
        (a, b) => (b.discont_price ?? b.price) - (a.discont_price ?? a.price),
      )
    } else if (sort === 'title_asc') {
      list.sort((a, b) => String(a.title).localeCompare(String(b.title)))
    }

    return list
  }, [products, from, to, onlyDiscount, sort])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {String(error)}</p>

  return (
    <div className={styles.page}>
      <div className={styles.topLine}>
        <nav className={styles.breadcrumbs}>
          <button
            className={styles.smallBtn}
            type="button"
            onClick={() => navigate('/')}
          >
            Main page
          </button>
          <span className={styles.sep}></span>
          <button
            className={styles.smallBtn}
            type="button"
            onClick={() => navigate('/categories')}
          >
            Categories
          </button>
          <span className={styles.sep}></span>
          <button className={styles.active} type="button">
            {categoryTitle}
          </button>
        </nav>
      </div>

      <h2 className={styles.title}>{categoryTitle}</h2>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Price</span>
          <input
            className={styles.input}
            placeholder="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <label className={styles.checkbox}>
          <span className={styles.filterLabel}>Discounted items</span>
          <input
            type="checkbox"
            checked={onlyDiscount}
            onChange={(e) => setOnlyDiscount(e.target.checked)}
          />
        </label>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Sorted</span>
          <select
            className={styles.select}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">by default</option>
            <option value="price_asc">price: low - high</option>
            <option value="price_desc">price: high - low</option>
            <option value="title_asc">title: A - Z</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {products.length === 0 ? (
        <p></p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {products.map((p, idx) => {
            const key = p?.id ?? p?._id ?? idx
            return <ProductCard key={String(key)} product={p} />
          })}
        </div>
      )}
    </div>
  )
}

export default CategoryProductsPage
