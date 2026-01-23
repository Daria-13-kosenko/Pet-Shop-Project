import styles from './ProductCard.module.css'
import { getProductImageUrl } from '../../utils/image'

function formatPrice(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return ''

  return `${n} $ `
}

function ProductCard({ product, onAdd }) {
  const title = product.title ?? product.name
  const hasDiscount =
    product.discount_price !== null &&
    product.discount_price !== undefined &&
    Number(product.discount_price) > 0 &&
    Number(product.discount_price) < Number(product.price)

  const currentPrice = hasDiscount ? product.discount_price : product.price

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          className={styles.imgSale}
          // src={product.image ?? ''}
          src={product.image || getProductImageUrl(product.id)}
          alt={title}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        ></img>
        <button className={styles.addBtn} type="button" onClick={onAdd}>
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
