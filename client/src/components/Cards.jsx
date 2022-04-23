import React from "react";
import { Link } from 'react-router-dom'
import style from '../style/Cards.module.css'
import { useNavigate } from "react-router";
import { useHistory } from "react-router-dom";

export default function Cards({ id, img, name, population, continent}){
    
    const history = useHistory()

    function detail() {
        history.push("/home/" + id)
    }
    
    return (
        <div onClick={() => detail()} className={style.cards}>
            <h1>{name}</h1>
                <img className={style.flag} src={img} alt="img"/>       
            <h2>Region: {continent}</h2>
            <h3>Population: {population}</h3>
        </div>
    )
}