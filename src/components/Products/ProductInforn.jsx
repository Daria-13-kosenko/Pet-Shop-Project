import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../../redux/features/products/productInformSlice'

function ProductInform() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { currentProduct, loading, error } = useSelector((s) => s.productInform)

  useEffect(() => {
    console.log('PARAM id =', id)
    if (!id) return
    dispatch(fetchProductById(Number(id)))
  }, [dispatch, id])
  console.log('STATE:', { currentProduct, loading, error })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!currentProduct) return null

  return (
    <div>
      <h1>{currentProduct.title}</h1>
      <img src={currentProduct.image} alt={currentProduct.title} />
      <p>{currentProduct.description}</p>
      <p>${currentProduct.price}</p>
    </div>
  )
}

export default ProductInform
