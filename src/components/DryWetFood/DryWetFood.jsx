import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './DryWetFood.module.css'

import { fetchDryWetFood } from '../../redux/features/dry_wet_food/dryWetFoodSlice'
import ProductSale from '../../components/Sales/ProductSale'

function DryWetFood() {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { itemsByCategory, loading, error } = useSelector((s) => s.dryWetFood)
  const { categories } = useSelector((s) => s.categories)

  const products = itemsByCategory?.[id] || []

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [onlyDiscount, setOnlyDiscount] = useState(false)
  const [sort, setSort] = useState('default')

  useEffect(() => {
    if (!id) return
    dispatch(fetchDryWetFood(id))
  }, [dispatch, id])

  const categoryTitle = useMemo(() => {
    const found = categories?.find((c) => String(c.id) === String(id))
    return found?.title || 'Dry & Wet Food'
  }, [categories, id])

  const filtered = useMemo(() => {
    let list = Array.isArray(products) ? [...products] : []

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

  return (
    <div className={styles.page}>
      <div className={styles.topLine}>
        <nav className={styles.breadcrumbs}>
          <button className={styles.smallBtn}>Main page</button>
          <span className={styles.sep}></span>
          <button className={styles.smallBtn}>Categories</button>
          <span className={styles.sep}></span>
          <button className={styles.active}>{categoryTitle}</button>
        </nav>
      </div>

      <h1 className={styles.title}>{categoryTitle}</h1>

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
            <option value="price_asc">price: low → high</option>
            <option value="price_desc">price: high → low</option>
            <option value="title_asc">title: A → Z</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProductSale key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default DryWetFood
