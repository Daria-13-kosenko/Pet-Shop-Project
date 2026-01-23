import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { clearCurrentCategory } from '../../redux/features/categories/categoriesSlice'
import { addToCart } from '../../redux/features/cart/cartSlice'
import ProductCard from '../Cards/ProductCard'

function CategoryProductsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const current = useSelector((state) => state.categories.current)

  useEffect(() => {
    dispatch(id)
    return () => {
      dispatch(clearCurrentCategory())
    }
  }, [dispatch, id])

  if (current.status === 'loading')
    return <div style={{ padding: 24 }}>Loading category...</div>
  if (current.status === 'failed')
    return <div style={{ padding: 24 }}>Error: {current.error}</div>

  return (
    <section style={{ padding: 24, maxWidth: 1440, margin: '0 auto' }}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        ← Back
      </button>
      <h2>{current.category?.title ?? current.category?.name ?? 'Category'}</h2>

      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        {current.products.map((p) => (
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

export default CategoryProductsPage
