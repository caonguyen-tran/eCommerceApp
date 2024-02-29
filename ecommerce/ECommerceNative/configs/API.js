import axios from "axios";


export const endpoints = {
    'login': '/o/token/',
    'register': '/user/',
    'create-shop': '/user/create-shop/',
    'current-user': '/user/current-user/',
    'categories' :'/categories/',
    'cart': '/cart/',
    'checkout': '/cart/checkout/',
    'shops': '/shop/',
    'products' : '/product/',
    'pays': "/pay/",
    'orders': "/order/",
    'current-shop': "/shop/current-shop/",
    'remove-product': (product_id) => `cart/${product_id}/remove-product/`,
    'product-details': (product_id) => `/product/${product_id}/`,
    'update-product': (product_id) => `product/${product_id}/`,
    'delete-product': (product_id) => `product/${product_id}/`,
    'add-cart': (product_id) => `/product/${product_id}/add-cart/`,
    'shop-details': (shop_id) => `/shop/${shop_id}/`,
    'delete-shop': (shop_id) => `/shop/${shop_id}/`,
    'add-product-to-shop': (shop_id) => `/shop/${shop_id}/add-product/`,
    'confirm-shop': (shop_id) => `/shop/${shop_id}/confirm/`, // only admin or staff
    'order-detail': (order_id) => `/order/${order_id}/order-detail/`,
    'shop-products': (shop_id) => `/shop/${shop_id}/products/`

}

export const authApi = (accessToken) => axios.create({
    baseURL: "https://tcaonguyen.pythonanywhere.com",
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: "https://tcaonguyen.pythonanywhere.com"
})



