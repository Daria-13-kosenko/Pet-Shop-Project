import { useDispatch } from 'react-redux'
import styles from './ProductSale.module.css'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { NavLink } from 'react-router-dom'

const BACKEND_URL = 'http://localhost:3333'

function ProductSale({ product }) {
  const dispatch = useDispatch()

  if (!product) return null

  const { title, price, discount_price } = product
  const imgPath = product.image
  const imgSrc = imgPath?.startsWith('http')
    ? imgPath
    : `${BACKEND_URL}${imgPath}`

  const hasDiscount =
    discount_price !== null &&
    discount_price !== undefined &&
    Number(discount_price) > 0
  const finalPrice = hasDiscount ? discount_price : price

  const handleAdd = () => {
    dispatch(addToCart({ ...product, count: 1 }))
  }
  return (
    <div className={styles.cardSale}>
      <div className={styles.imgWrap}>
        <NavLink to="/drywet">
          <img className={styles.imgSale} src={imgSrc} alt={product.title} />
        </NavLink>

        <button className={styles.addBtn} onClick={handleAdd}>
          Add to cart
        </button>
        {hasDiscount && (
          <div className={styles.badge}>
            {Math.round(100 - (discount_price / price) * 100)}%
          </div>
        )}

        <div className={styles.info}>
          <p className={styles.saleTitle}>{title}</p>

          <div className={styles.priceRow}>
            <span className={styles.price}>${finalPrice}</span>
            <span className={styles.oldPrice}>${price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSale
