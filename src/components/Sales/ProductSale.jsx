import styles from './ProductSale.module.css'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const BACKEND_URL = 'http://localhost:3333'

function ProductSale({ product }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!product) return null

  const productId = product?.id ?? product?._id
  const title = product?.title ?? product?.name ?? 'Product'

  const discount = product?.discount_price ?? product?.discont_price ?? null
  const hasDiscount =
    discount !== null &&
    discount !== undefined &&
    Number(discount) > 0 &&
    Number(discount) < Number(product?.price)

  const currentPrice = hasDiscount ? Number(discount) : Number(product?.price)

  const imgPath = product?.image
  const imgSrc = imgPath?.startsWith('http')
    ? imgPath
    : `${BACKEND_URL}${imgPath}`

  const goToProduct = () => {
    if (!productId) return
    navigate(`/products/${productId}`)
  }

  const handleAdd = (e) => {
    e.stopPropagation()
    if (!productId) return

    dispatch(
      addToCart({
        id: productId,
        title,
        image: imgPath,
        price: currentPrice,
        oldPrice: hasDiscount ? Number(product.price) : null,
        quantity: 1,
      }),
    )
  }

  return (
    <div
      className={styles.cardSale}
      onClick={goToProduct}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') goToProduct()
      }}
    >
      <div className={styles.imgWrap}>
        <img className={styles.imgSale} src={imgSrc} alt={title} />

        <button type="button" className={styles.addBtn} onClick={handleAdd}>
          Add to cart
        </button>

        {hasDiscount && (
          <div className={styles.discount}>
            -{Math.round((1 - Number(discount) / Number(product.price)) * 100)}%
          </div>
        )}

        <div className={styles.info}>
          <p className={styles.saleTitle}>{title}</p>

          <div className={styles.priceRow}>
            <span className={styles.price}>${currentPrice}</span>

            {hasDiscount && (
              <span className={styles.oldPrice}>${Number(product.price)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSale
