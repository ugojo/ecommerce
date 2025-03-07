import { useContext } from "react";
import { productContext } from "../context/ProductProvider";
import { UseProductContextType } from "../context/ProductProvider";


const useProduct = (): UseProductContextType => {
    return useContext(productContext)
}

export default useProduct