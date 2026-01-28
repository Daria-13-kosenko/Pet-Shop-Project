import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import ProductCard from '../Cards/ProductCard'
import { fetchCategoryProducts } from '../../redux/features/categories/categoriesSlice'
import styles from './CategoryProductsPage.module.css'

function toNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function getEffectivePrice(p) {
  const dp = toNumber(p?.discont_price)
  const price = toNumber(p?.price)
  if (dp != null && dp > 0) return dp
  return price ?? 0
}

function CategoryProductsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { itemsByCategory, loadingByCategory, errorByCategory, categories } =
    useSelector((s) => s.categories)

  const products = itemsByCategory?.[id] ?? []
  const loading = loadingByCategory?.[id] ?? false
  const error = errorByCategory?.[id] ?? null

  const categoryTitle = useMemo(() => {
    const found = categories?.find(
      (c) => String(c?.id ?? c?._id) === String(id),
    )
    return found?.title || found?.name || 'Категория'
  }, [categories, id])

  useEffect(() => {
    if (!id) return
    dispatch(fetchCategoryProducts(id))
  }, [dispatch, id])

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [onlyDiscount, setOnlyDiscount] = useState(false)
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let list = Array.isArray(products) ? [...products] : []

    if (onlyDiscount) {
      list = list.filter((p) => {
        const dp = toNumber(p?.discont_price)
        return dp != null && dp > 0
      })
    }

    const min = from === '' ? null : toNumber(from)
    const max = to === '' ? null : toNumber(to)

    if (min != null) {
      list = list.filter((p) => getEffectivePrice(p) >= min)
    }

    if (max != null) {
      list = list.filter((p) => getEffectivePrice(p) <= max)
    }

    if (sort === 'price_asc') {
      list.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b))
    } else if (sort === 'price_desc') {
      list.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a))
    } else if (sort === 'title_asc') {
      list.sort((a, b) =>
        String(a?.title ?? '').localeCompare(String(b?.title ?? '')),
      )
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

          <span className={styles.sep} />

          <button
            className={styles.smallBtn}
            type="button"
            onClick={() => navigate('/categories')}
          >
            Categories
          </button>

          <span className={styles.sep} />

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
            type="number"
            inputMode="numeric"
            placeholder="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            className={styles.input}
            type="number"
            inputMode="numeric"
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

      {filtered.length === 0 ? (
        <p className={styles.empty}>No products</p>
      ) : (
        <div
          className={styles.grid}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {filtered.map((p, idx) => {
            const key = p?.id ?? p?._id ?? idx
            return <ProductCard key={String(key)} product={p} />
          })}
        </div>
      )}
    </div>
  )
}

export default CategoryProductsPage
