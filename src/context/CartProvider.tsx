import { createContext, ReactElement, useMemo, useReducer } from "react"


export type CartItemType = {
    sku: string
    name: string,
    price: number,
    qty: number
}

//const initState: CartType[] = []

type CartStateType = {cart: CartItemType[]}

const initCartState: CartStateType = {cart: []}

const REDUCER_ACTION_TYPE = {
    ADD : "ADD",
    REMOVE : "REMOVE",
    QUANTITY : "QUANTITY",
    SUBMIT : "SUBMIT"
}
// have not understand is part 
export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload? : CartItemType
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType =>{

    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('Payload missing in add')
            }
            const {sku, name, price} = action.payload

            const filterCart: CartItemType[] = state.cart.filter((cart)=> cart.sku !== sku)
            const ItemExist : CartItemType | undefined = state.cart.find((cart)=>cart.sku === sku)

            const qty: number = ItemExist ? ItemExist.qty + 1 :  1
            
            return {...state, cart : [...filterCart, {sku, name, price, qty}]}
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('Payload missing in add')
            }
            const {sku} = action.payload

            const filterCart: CartItemType[] = state.cart.filter((cart)=> cart.sku !== sku)
           
            return {...state, cart : [...filterCart]}
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('Payload missing in add')
            }
            const {sku, qty} = action.payload

            const ItemExist : CartItemType | undefined = state.cart.find((cart)=>cart.sku === sku)
            
            if (!ItemExist) {
                throw new Error('Cant find data')
            }

            const updatedCart: CartItemType = {...ItemExist, qty}

            const filterCart: CartItemType[] = state.cart.filter((cart)=> cart.sku !== sku)

            return {...state, cart: [...filterCart, updatedCart]}
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            if (!action.payload) {
                throw new Error('Payload missing in add')
            }
            return {...state, cart: []}
        }
        default:
            throw new Error('Unidentified Reducer Action')
    }
}

const useCartContext = (initCartState: CartStateType)=>{

    const [state, dispatch] = useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(()=> {
        return REDUCER_ACTION_TYPE
    },[])

    const totalItem = state.cart.reduce((previousValue, cartItem)=>{
        return previousValue + cartItem.qty 
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(
        state.cart.reduce((previousValue, cartItem)=>{
            return previousValue + (cartItem.qty * cartItem.price)
        },0)
    )

    const cart =  state.cart.sort((a, b)=>{
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return {dispatch, REDUCER_ACTIONS, totalItem, totalPrice, cart}
}

export type UsecartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UsecartContextType = {
    dispatch: ()=> {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItem: 0,
    totalPrice: '',
    cart: []
}

export const cartContext = createContext<UsecartContextType>(initCartContextState)

type ChildrenType = {
    children? : ReactElement | ReactElement[]   
}
export const CartProvider = ({children} :ChildrenType)=>{

    return(
        <cartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </cartContext.Provider>
    )
}