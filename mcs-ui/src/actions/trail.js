import * as httpRequest from '../utils/axios.js';
import { getData, getDataFulfilled, getDataFailed } from '../reducers/trailSlice.js';

export const getTrailList = () => {
    return async dispatch => {
        dispatch(getData())
        try{
            const response = await httpRequest.get(`audit-trail`)
            dispatch(getDataFulfilled(response.data))
        } catch (error) {
            dispatch(getDataFailed())
        }
    }
}