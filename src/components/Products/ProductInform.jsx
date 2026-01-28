import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../../redux/features/cart/cartSlice'
import styles from './ProductInform.module.css'

function ProductInform() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return
    axios
      .get(`http://localhost:3333/products/${id}`)
      .then((response) => {
        const data = response.data
        setProduct(Array.isArray(data) ? data[0] : data)
      })
      .catch((err) => console.error(err))
  }, [id])

  if (!product) {
    return <p className={styles.loading}>Loading...</p>
  }

  const discount = product?.discount_price ?? product?.discont_price ?? null
  const hasDiscount =
    discount !== null &&
    discount !== undefined &&
    Number(discount) > 0 &&
    Number(discount) < Number(product?.price)

  const currentPrice = hasDiscount ? Number(discount) : Number(product?.price)

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id ?? product._id ?? id,
        title: product.title ?? product.name ?? 'Product',
        image: product.image,
        quantity,
        price: Number(currentPrice),
        oldPrice: hasDiscount ? Number(product.price) : null,
      }),
    )
  }

  return (
    <div className={styles.page}>
      {' '}
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
          <button type="button" className={styles.smallBtn}>
            Categories
          </button>
        </nav>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <img
            src={
              product.image?.startsWith('http')
                ? product.image
                : `http://localhost:3333${product.image}`
            }
            alt={product.title ?? product.name}
          />

          {product.discont_price && (
            <div className={styles.discount}>
              -{Math.round((1 - product.discont_price / product.price) * 100)}%
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h1>{product.title ?? product.name}</h1>

          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>
              ${product.discont_price || product.price}
            </span>

            <span className={styles.oldPrice}>${product.price}</span>
          </div>

          <div className={styles.addToCartBlock}>
            <div className={styles.quantityControl}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>

            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInform
