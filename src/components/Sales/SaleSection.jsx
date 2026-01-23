import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSaleProducts } from '../../redux/features/sale/saleSlice'
import { NavLink } from 'react-router-dom'
import styles from './SaleSection.module.css'
import ProductSale from '../Sales/ProductSale'

function SaleSection() {
  const dispatch = useDispatch()
  const saleState = useSelector((state) => state.sale) || {
    items: [],
    loading: false,
    error: null,
  }
  const { items, loading, error } = saleState

  useEffect(() => {
    dispatch(fetchSaleProducts())
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const top4 = items.slice(0, 4)

  return (
    <section className={styles.sale}>
      <div className={styles.saleTitle}>
        <h2>Sale</h2>
        <div className={styles.line}></div>
        <NavLink to="/sales">
          <button className={styles.btnSale}>All sales</button>
        </NavLink>
      </div>
      <div className={styles.gridSale}>
        {top4.map((p) => (
          <ProductSale key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

export default SaleSection
