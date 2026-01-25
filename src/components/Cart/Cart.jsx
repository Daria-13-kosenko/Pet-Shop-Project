import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartItemsArray,
  selectCartTotal,
  increment,
  decrement,
  removeFromCart,
  clearCart,
} from '../../redux/features/cart/cartSlice'
import styles from './Cart.module.css'
import { Link } from 'react-router-dom'
import OrderSuccessModal from '../../components/Cart/OrderSuccessModal'

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItemsArray)
  const total = useSelector(selectCartTotal)

  const itemsCount = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items],
  )

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const isEmpty = items.length === 0

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)

  const closeModal = () => {
    setIsModalOpen(false)
    setName('')
    setPhone('')
    setEmail('')
    dispatch(clearCart())
  }

  const handleOrder = (e) => {
    e.preventDefault()
    if (isEmpty) return
    if (!name.trim() || !phone.trim() || !email.trim()) return
    openModal()
  }

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>Shopping cart</h1>
        <div className={styles.line}></div>
        <Link to="/" className={styles.backBtn}>
          Back to the store
        </Link>
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          {isEmpty ? (
            <div className={styles.emptyBlock}>
              <p className={styles.emptyTitle}>
                Looks like you have no items in your basket currently.
              </p>

              <Link to="/" className={styles.continueBtn}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.id} className={styles.itemCard}>
                <img className={styles.img} src={it.image} alt={it.title} />

                <div className={styles.info}>
                  <div className={styles.row1}>
                    <div className={styles.name}>{it.title}</div>
                    <button
                      className={styles.remove}
                      onClick={() => dispatch(removeFromCart(it.id))}
                      aria-label="Remove item"
                      type="button"
                    >
                      ✕
                    </button>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.counter}>
                      <button
                        type="button"
                        className={styles.counterBtn}
                        onClick={() => dispatch(decrement(it.id))}
                      >
                        –
                      </button>
                      <div className={styles.qty}>{it.qty}</div>
                      <button
                        type="button"
                        className={styles.counterBtn}
                        onClick={() => dispatch(increment(it.id))}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.priceBlock}>
                      <div className={styles.price}>
                        ${Number(it.price * it.qty).toFixed(0)}
                      </div>
                      {it.oldPrice ? (
                        <div className={styles.old}>
                          ${Number(it.oldPrice * it.qty).toFixed(0)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className={styles.right}>
          <div className={styles.orderTitle}>Order details</div>
          <div className={styles.itemsCount}>{itemsCount} items</div>

          <div className={styles.totalRow}>
            <div className={styles.totalLabel}>Total</div>
            <div className={styles.totalValue}>${Number(total).toFixed(2)}</div>
          </div>

          <form className={styles.form} onSubmit={handleOrder}>
            <input
              className={styles.input}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={styles.orderBtn}
              disabled={isEmpty}
              type="submit"
            >
              Order
            </button>
          </form>
        </aside>
      </div>

      <OrderSuccessModal open={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Cart
