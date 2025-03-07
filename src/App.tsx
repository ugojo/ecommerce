import './App.css'
import Header from './component/Header'
import Cart from './component/Cart'
import ProductList from './component/ProductList'
import Footer from './component/Footer'
import { useState } from 'react'

function App() {
  
  const [viewCart, setViewCart] = useState(false)
  
  const pageContent = viewCart  ?  <Cart /> : <ProductList/ > 

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
         {pageContent}
      <Footer viewCart={viewCart} />
    </>
  )
  return (
    content
  )
}

export default App
