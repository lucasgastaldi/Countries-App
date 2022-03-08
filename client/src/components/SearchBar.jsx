import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../actions";
import { filterByActivity } from '../actions'
import style from '../style/SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [country, setCountry] = useState("")
    const [activity, setActivity] = useState("")

    function handleInput(e) {
        e.preventDefault()
        setCountry(e.target.value)
        console.log(country)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getCountryByName(country))

    }
    
    const inputActivityHandler = (e) =>{
        setActivity(e.target.value)
    }

    

    const setInputHandler = (e)=>{
        e.preventDefault()
        dispatch(filterByActivity(activity))

    }

    return (
        <div className={style.searchContainer}>
            <div className={style.search}>
                <input className={style.input} type="text" placeholder="Search country..." onChange={ (e) => handleInput(e) } value={country} />
                <button className={style.button} type="submit" onClick={ (e) => handleSubmit(e)}>Search</button>
            </div>
            <div className={style.search}>
                <input className={style.input} placeholder="Filter by activity" type="text" onChange={inputActivityHandler} value={activity} />
                <button className={style.button} type="submit" onClick={setInputHandler}>Search</button>
            </div>
        </div>
    )
}
