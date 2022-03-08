import axios from 'axios'
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const FILTER_BY_REGION = "FILTER_BY_REGION";
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY" 
export const FILTER_COUNTRIES = 'FILTER_COUNTRIES';
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const POPULATION_DES = "POPULATION_DES";
export const POPULATION_ASC = "POPULATION_ASC";


export function getCountries(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/countries')
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data.results
        })
    }
}

export function filterByRegion(payload){
    return {
        type: "FILTER_BY_REGION",
        payload
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function populationDes(payload){
    return {
        type: "POPULATION_DES",
        payload
    }
}

export function populationAsc(payload){
    return {
        type: "POPULATION_ASC",
        payload
    }
}

export function getCountryByName(name){
    return async function(dispatch) {
        try {
            let country = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: "GET_COUNTRY_BY_NAME",
                payload: country.data.result
            }) 
        } catch(error) {
            console.log(error)
        }
    }
}

export function getCountryDetail(id){
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:3001/countries/${id}`)
        dispatch({ 
            type: "GET_COUNTRY_DETAIL", 
            payload: res.data
        })
    }
}


export function getAllActivities() {
    return async function (dispatch) {
        return axios.get('http://localhost:3001/activities')
            .then((response) => {
                dispatch({
                    type: "GET_ALL_ACTIVITIES",
                    payload: response.data
                })
            })
    }
}

export function filterByActivity(payload){
    return {
        type: "FILTER_BY_ACTIVITY",
        payload
    }
}