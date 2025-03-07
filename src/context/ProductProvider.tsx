import { createContext, ReactElement, useState } from 'react'

export type ProductsType = {
    sku: string,
    name: string,
    price: number
    imageUrl: string
}

const initState: ProductsType[] = [
    {
        sku: "product1",
        "name": "Wedgit",
        "price": 99.9,
        imageUrl: "/images/product1.jpg"
    },
    {
        "sku": "product2",
        "name": "Premium Wedgit",
        "price": 120,
        imageUrl: "/images/product2.jpg"
    },
    {
        "sku": "product3",
        "name": "Deluxe Wedgit",
        "price": 200,
        imageUrl: "/images/product3.jpg"
    }
]

export type UseProductContextType = {products: ProductsType[]} 

const initContextState: UseProductContextType= {products: []}

export const productContext = createContext<UseProductContextType>(initContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const ProductsProvider = ({children}: ChildrenType): ReactElement =>{

    const [products, setProducts] = useState<ProductsType[]>(initState)

    // useEffect(()=>{
    //     const fetchProduct = async(): Promise<ProductsType[]> =>{
    //         const data = await fetch('http://localhost:3500/')
    //         .then((res)=> {return res.json()})
    //         .catch((err)=>{
    //             if (err instanceof Error) { console.log(err.message);
    //             }
    //         })

    //         return data
    //     }

    //     fetchProduct().then(products => setProducts(products))
    // },[])
    return (
          <productContext.Provider value={{products}}>
             {children}
          </productContext.Provider>
    )
}