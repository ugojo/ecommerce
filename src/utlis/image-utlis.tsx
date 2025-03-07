
function getImageURL(name: string) {
    return new URL(`/Users/BUYPC COMPUTERS/Desktop/webapp/Ecomm/Ecommerce/public/${name}`, import.meta.url).href
}

export  {getImageURL}