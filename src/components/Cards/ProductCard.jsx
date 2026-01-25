import styles from './ProductCard.module.css'
import { getProductImageUrl } from '../../utils/image'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

function formatPrice(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return ''
  return `${n} $ `
}

function ProductCard({ product }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const title = product.title ?? product.name

  const productId = product?.id ?? product?._id

  const hasDiscount =
    product.discount_price !== null &&
    product.discount_price !== undefined &&
    Number(product.discount_price) > 0 &&
    Number(product.discount_price) < Number(product.price)

  const currentPrice = hasDiscount ? product.discount_price : product.price

  const handleAdd = (e) => {
    e.stopPropagation()
    dispatch(
      addToCart({
        id: productId,
        title: product.title ?? product.name,
        image: product.image,
        price: Number(product.price),
        oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      }),
    )
  }

  return (
    <div
      className={styles.card}
      onClick={() => {
        if (!productId) return
        navigate(`/products/${productId}`)
      }}
      role="button"
      tabIndex={0}
    >
      <div className={styles.imgWrap}>
        <img
          className={styles.imgSale}
          src={product.image || getProductImageUrl(productId)}
          alt={title}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />

        <button className={styles.addBtn} type="button" onClick={handleAdd}>
          Add to cart
        </button>

        <div className={styles.info}>
          <div className={styles.saleTitle}>{title}</div>

          <div className={styles.priceRow}>
            <div className={styles.price}>{formatPrice(currentPrice)}</div>
            {hasDiscount && (
              <div className={styles.oldPrice}>
                {formatPrice(product.price)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
