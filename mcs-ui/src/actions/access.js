import * as httpRequest from '../utils/axios.js';
import { 
    getData, getDataFulfilled, getDataFailed,
    getAuthAccess, getAuthAccessFulfilled, getAuthAccessFailed,
    putData, putDataFulfilled, putDataFailed, 
} from '../reducers/accessSlice.js';

export const getAccessListByPosition = (id) => {
    return async dispatch => {
        dispatch(getData())
        try{
            const response = await httpRequest.get(`access/by-position/${id}`)
            dispatch(getDataFulfilled(response.data))
        } catch (error) {
            dispatch(getDataFailed())
        }
    }
}

export const getUserAccess = () => {
    return async dispatch => {
        dispatch(getAuthAccess())
        try{
            const response = await httpRequest.get(`auth/access`)
            dispatch(getAuthAccessFulfilled(response.data))
        } catch (error) {
            dispatch(getAuthAccessFailed())
        }
    }
}

export const putAccessByPosition = (id,data) => {
    return async dispatch => {
        dispatch(putData())
        try{
            const response = await httpRequest.put(`access/by-position/${id}`,data)
            dispatch(putDataFulfilled(response.data))
        } catch (error) {
            dispatch(putDataFailed())
        }
    }
}