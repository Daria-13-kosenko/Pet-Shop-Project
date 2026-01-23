import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProducts } from '../../redux/features/products/productSlice'
import { addToCart } from '../../redux/features/cart/cartSlice'
import ProductSale from './ProductSale'
import styles from './SalePage.module.css'

export default function SalePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ✅ безопасно: slice может называться products или product
  const productsState = useSelector((s) => s?.products || s?.product || {})
  const {
    products = [],
    items = [],
    status = 'idle',
    error = null,
  } = productsState

  const listSource = items?.length ? items : products

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [dispatch, status])

  const discounted = useMemo(() => {
    let list = (Array.isArray(listSource) ? [...listSource] : []).filter(
      (p) => p?.discont_price != null && Number(p.discont_price) > 0,
    )

    const min = from === '' ? null : Number(from)
    const max = to === '' ? null : Number(to)

    if (min !== null && !Number.isNaN(min)) {
      list = list.filter((p) => Number(p.discont_price) >= min)
    }
    if (max !== null && !Number.isNaN(max)) {
      list = list.filter((p) => Number(p.discont_price) <= max)
    }

    if (sort === 'price_asc')
      list.sort((a, b) => Number(a.discont_price) - Number(b.discont_price))
    if (sort === 'price_desc')
      list.sort((a, b) => Number(b.discont_price) - Number(a.discont_price))
    if (sort === 'title_asc')
      list.sort((a, b) => String(a.title).localeCompare(String(b.title)))

    return list
  }, [listSource, from, to, sort])

  if (status === 'loading') return <div style={{ padding: 24 }}>Loading...</div>
  if (status === 'failed')
    return <div style={{ padding: 24 }}>Error: {error}</div>

  return (
    <section className={styles.page}>
      <div className={styles.topLine}>
        <nav className={styles.breadcrumbs}>
          <button
            type="button"
            className={styles.smallBtn}
            onClick={() => navigate('/')}
          >
            Main page
          </button>
          <span className={styles.sep}></span>
          <button type="button" className={styles.active}>
            All sales
          </button>
        </nav>
      </div>

      <h1 className={styles.title}>Discounted items</h1>

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

      <div className={styles.grid}>
        {discounted.map((p) => (
          <ProductSale
            key={p.id}
            product={p}
            onAdd={() => dispatch(addToCart(p))}
          />
        ))}
      </div>
    </section>
  )
}
