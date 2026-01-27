import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../../redux/features/cart/cartSlice'
import styles from './ProductInform.module.css'

function ProductInform() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
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

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }))
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Main page</Link>
        <span> / </span>
        <Link to="/categories">Categories</Link>
        <span> / </span>
        <span>{product.title}</span>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
          />

          {product.discont_price && (
            <div className={styles.discount}>
              -{Math.round((1 - product.discont_price / product.price) * 100)}%
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h1>{product.title}</h1>

          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>
              ${product.discont_price || product.price}
            </span>

            {product.discont_price && (
              <span className={styles.oldPrice}>${product.price}</span>
            )}
          </div>

          <div className={styles.addToCartBlock}>
            <div className={styles.quantityControl}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button className={styles.addButton} onClick={handleAddToCart}>
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
