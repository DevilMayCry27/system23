import * as httpRequest from '../utils/axios.js';
import { 
    getData, getDataFulfilled, getDataFailed,
    postData, postDataFulfilled, postDataFailed, 
    putData, putDataFulfilled, putDataFailed, 
    delData, delDataFulfilled, delDataFailed, 
} from '../reducers/dossageFormSlice.js';

export const getDossageFormList = () => {
    return async dispatch => {
        dispatch(getData())
        try{
            const response = await httpRequest.get(`dossage-form`)
            dispatch(getDataFulfilled(response.data))
        } catch (error) {
            dispatch(getDataFailed())
        }
    }
}

export const postDossageForm = (data) => {
    return async dispatch => {
        dispatch(postData())
        try{
            const response = await httpRequest.post(`dossage-form`,data)
            dispatch(postDataFulfilled(response.data))
        } catch (error) {
            dispatch(postDataFailed())
        }
    }
}

export const putDossageForm = (id,data) => {
    return async dispatch => {
        dispatch(putData())
        try{
            const response = await httpRequest.put(`dossage-form/${id}`,data)
            dispatch(putDataFulfilled(response.data))
        } catch (error) {
            dispatch(putDataFailed())
        }
    }
}

export const delDossageForm = (id) => {
    return async dispatch => {
        dispatch(delData())
        try{
            const response = await httpRequest.destroy(`dossage-form/${id}`)
            dispatch(delDataFulfilled(response.data))
        } catch (error) {
            dispatch(delDataFailed())
        }
    }
}