import * as httpRequest from '../utils/axios.js';
import { 
    getData, getDataFulfilled, getDataFailed,
    postData, postDataFulfilled, postDataFailed, 
    putData, putDataFulfilled, putDataFailed, 
    delData, delDataFulfilled, delDataFailed, 
} from '../reducers/medicineSlice.js';

export const getMedicineList = () => {
    return async dispatch => {
        dispatch(getData())
        try{
            const response = await httpRequest.get(`medicine`)
            dispatch(getDataFulfilled(response.data))
        } catch (error) {
            dispatch(getDataFailed())
        }
    }
}

export const postMedicine = (data) => {
    return async dispatch => {
        dispatch(postData())
        try{
            const response = await httpRequest.post(`medicine`,data)
            dispatch(postDataFulfilled(response.data))
        } catch (error) {
            dispatch(postDataFailed())
        }
    }
}

export const putMedicine = (id,data) => {
    return async dispatch => {
        dispatch(putData())
        try{
            const response = await httpRequest.put(`medicine/${id}`,data)
            dispatch(putDataFulfilled(response.data))
        } catch (error) {
            dispatch(putDataFailed())
        }
    }
}

export const delMedicine = (id) => {
    return async dispatch => {
        dispatch(delData())
        try{
            const response = await httpRequest.destroy(`medicine/${id}`)
            dispatch(delDataFulfilled(response.data))
        } catch (error) {
            dispatch(delDataFailed())
        }
    }
}