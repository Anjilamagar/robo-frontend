

const BASE_URL = 'http://localhost:5000'


export const API_LINKS =  {

    getAllProduct : `${BASE_URL}/product/getAllProducts`,
    getProductDetail : (id)=>`${BASE_URL}/product/getProductById/${id}`,



    auth : {
        login : '',
        register : '',
        logout: '',
    }


}

// API_LINKS.auth.login

// API_LINKS.product.list
// API_LINKS.product.detail

// const person = {

//     sum : (a,b)=> a+b
// }


// const total = person.sum(2,5)