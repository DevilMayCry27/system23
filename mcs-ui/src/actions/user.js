import * as httpRequest from '../utils/axios.js';
import { 
    getData, getDataFulfilled, getDataFailed,
    postData, postDataFulfilled, postDataFailed, 
    putData, putDataFulfilled, putDataFailed, 
    delData, delDataFulfilled, delDataFailed, 
} from '../reducers/userSlice.js';

export const getUserList = () => {
    return async dispatch => {
        dispatch(getData())
        try{
            const response = await httpRequest.get(`user`)
            dispatch(getDataFulfilled(response.data))
        } catch (error) {
            dispatch(getDataFailed())
        }
    }
}

export const postUser = (data) => {
    return async dispatch => {
        dispatch(postData())
        try{
            const response = await httpRequest.post(`user`,data)
            dispatch(postDataFulfilled(response.data))
        } catch (error) {
            dispatch(postDataFailed())
        }
    }
}

export const putUser = (id,data) => {
    return async dispatch => {
        dispatch(putData())
        try{
            const response = await httpRequest.put(`user/${id}`,data)
            dispatch(putDataFulfilled(response.data))
        } catch (error) {
            dispatch(putDataFailed())
        }
    }
}

export const delUser = (id) => {
    return async dispatch => {
        dispatch(delData())
        try{
            const response = await httpRequest.destroy(`user/${id}`)
            dispatch(delDataFulfilled(response.data))
        } catch (error) {
            dispatch(delDataFailed())
        }
    }
}