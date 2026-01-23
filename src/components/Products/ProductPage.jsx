import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/features/products/productSlice'
import { addToCart } from '../../redux/features/cart/cartSlice'
import ProductCard from '../Cards/ProductCard'
import styles from './ProductPage.module.css'

function ProductPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    products = [],
    items = [],
    status,
    error,
  } = useSelector((state) => state.products)

  const listSource = items?.length ? items : products

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [onlyDiscount, setOnlyDiscount] = useState(false)
  const [sort, setSort] = useState('default')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const productTitle = useMemo(() => {
    if (!id) return 'All products'
    const found = listSource.find((p) => String(p.id) === String(id))
    return found?.title || 'All products'
  }, [listSource, id])

  const filtered = useMemo(() => {
    let list = Array.isArray(listSource) ? [...listSource] : []

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
  }, [listSource, from, to, onlyDiscount, sort])

  if (status === 'loading')
    return <div style={{ padding: 24 }}>Loading products...</div>
  if (status === 'failed')
    return <div style={{ padding: 24 }}>Error: {error}</div>

  return (
    <section className={styles.page}>
      <div className={styles.topLine}>
        <nav className={styles.breadcrumbs}>
          <button
            type="button"
            className={styles.smollBtn}
            onClick={() => navigate('/')}
          >
            Main page
          </button>
          <span className={styles.sep}></span>
          <button type="button" className={styles.active}>
            {productTitle}
          </button>
        </nav>
      </div>

      <h1 className={styles.title}>{productTitle}</h1>

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

      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={() => dispatch(addToCart(p))}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductPage
