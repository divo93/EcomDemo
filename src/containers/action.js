

import axios from 'axios'
import {API_ENDPOINT} from '../../apiConstant'


export const getProductList = async () => {
    let data = await axios.get(API_ENDPOINT)
    return data
}