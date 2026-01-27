import styles from './ProductCard.module.css'
import { getProductImageUrl } from '../../utils/image'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const title = product?.title ?? product?.name ?? 'Product'
  const productId = product?.id ?? product?._id

  const handleAdd = (e) => {
    e.stopPropagation()
    if (!productId) return

    dispatch(
      addToCart({
        id: productId,
        title,
        image: product.image || getProductImageUrl(productId),
      }),
    )
  }

  const goToProduct = () => {
    if (!productId) return
    navigate(`/products/${productId}`)
  }

  return (
    <div
      className={styles.card}
      onClick={goToProduct}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') goToProduct()
      }}
    >
      <div className={styles.imgWrap}>
        <img
          className={styles.imgSale}
          src={product?.image || getProductImageUrl(productId)}
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
            <div className={styles.price}>
              {' '}
              ${product.discont_price || product.price}
            </div>
            {product.discont_price && (
              <div className={styles.discount}>
                -{Math.round((1 - product.discont_price / product.price) * 100)}
                %
              </div>
            )}

            <div className={styles.oldPrice}>${product.price}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
