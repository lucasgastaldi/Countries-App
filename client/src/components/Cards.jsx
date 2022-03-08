import React from "react";
import { Link } from 'react-router-dom'
import style from '../style/Cards.module.css'

export default function Cards({ id, img, name, population, continent}){
    return (
        <div className={style.cards}>
            <h1>{name}</h1>
            <Link to={"/home/" + id}>
                <img className={style.flag} src={img} alt="img"/>
            </Link>
            <h2>Region: {continent}</h2>
            <h3>Population: {population}</h3>
        </div>
    )
}