import { useContext } from "react"
import { cartContext } from "../context/CartProvider"
import { UsecartContextType } from "../context/CartProvider"


const useCart = (): UsecartContextType => {
    return useContext(cartContext)
}


export default useCart