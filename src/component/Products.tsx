import { ProductsType } from "../context/ProductProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement } from "react"
import {getImageURL} from '../utlis/image-utlis'
// import GetImgUrl from "./GetImg"
// import item001 from '../assets/images/item0001.jpg'



type PropsType = {
    product: ProductsType,
    dispatch: React.ActionDispatch<[action: ReducerAction]>
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean
}

const Product = ({dispatch, REDUCER_ACTIONS, inCart, product}: PropsType): ReactElement => {
  
//    const image: string = new URL(`../assests/images/${product.sku}.jpg`, import.meta.url).pathname
//   const image = new URL(`../assets/images/${product.sku}`, import.meta.url).href;
// const imagePath = `../assets/images/${product.sku}`;
// const imagePath = '../assests/images/'+product.sku
// const extentions = '.jpg';
// console.log('Image Path:', imagePath); // Debugging
// const imageUrl = new URL(imagePath, import.meta.url).href;
// const image = imageUrl+extentions
// console.log('Resolved URL:', imageUrl); 


//    console.log('image',image);
//    console.log(item001);
   

   const onAddToCart = ()=> dispatch({type: REDUCER_ACTIONS.ADD, payload: {...product, qty: 1}})
   const itemInCart = inCart? `-> item in Cart: ✔` : null
   const image = getImageURL(product.sku)+'.jpg'

//    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null

   console.log('image',image);
   console.log(product.sku);
   console.log('ProductURL', product.imageUrl);
   
   

   const content = 
        <article className="product">
            <h3>{product.name}</h3>
            {/* <img src={product.imageUrl} alt={product.name} className="product__img" />  */}
            {/* <img src={item001} alt={product.name} className="product__img" /> */}
            <p>{new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(product.price)} {itemInCart}</p>
            <button onClick={onAddToCart}>Ass to cart</button>
        </article>

    return content
}

export default Product