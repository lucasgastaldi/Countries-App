import {
    GET_COUNTRIES,
    FILTER_BY_REGION,
    ORDER_BY_NAME,
    GET_COUNTRY_BY_NAME,
    GET_ALL_ACTIVITIES,
    FILTER_BY_ACTIVITY,
    POPULATION_ASC,
    POPULATION_DES,
    GET_COUNTRY_DETAIL,
} from '../actions/index';

const initialState = {
    countries: [],
    allCountries: [],
    countriesDetail: [],
    activities: []
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case FILTER_BY_REGION:
            const allCountries = state.allCountries
            const region = action.payload === 'All' ? allCountries : allCountries.filter(c => c.continent === action.payload)
            return {
                ...state,
                countries: region
            }
        case ORDER_BY_NAME:
            let arr = action.payload === 'asc' ? 
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    countries: arr
                }
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countriesDetail: action.payload
            }    
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            };
        case FILTER_BY_ACTIVITY:
            return {
                ...state,
                countries: state.countries.filter((c)=>{
                    return c.activities?.some((a)=> a.name === action.payload)
            })
        }
        case POPULATION_ASC:
            return {
                ...state,
                countries: state.countries.slice().sort((a,b) => (a.population - b.population))
            } 
        case POPULATION_DES:
            return {
                ...state,
                countries: state.countries.slice().sort((a,b) => (a.population - b.population)).reverse()
            } 
        default:
            return state;
    }
}
