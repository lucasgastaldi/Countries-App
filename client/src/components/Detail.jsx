import React from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../actions/index";
import { useEffect } from "react";
import style from '../style/Detail.module.css'
import background from '../images/detail.jpg'


export default function Detail(){
    const {id}= useParams();
    let countriesDetail= useSelector((state)=> state.countriesDetail)
    const dispatch= useDispatch()

    console.log(countriesDetail)

    useEffect(()=>{
        dispatch(getCountryDetail(id))
    },[])

        return(
            <div className={style.backgroundDiv}>
                <img src={background} alt="" className={style.background} />
                   
                    <div className={style.container}>
                        <div>
                        <h1>{countriesDetail?.name}</h1>
                        <h5>{countriesDetail?.continent}</h5>
                        <h5>{countriesDetail?.altSpellings}</h5>
                        <img className={style.flag} src={countriesDetail?.img} alt="img not found"/>
                        <div className={style.detailContainer}>
                            <div className={style.detailDiv}>
                                <h5>SUBREGION: {countriesDetail?.subregion}</h5>
                                <h5>CAPITAL: {countriesDetail?.capital}</h5>
                            </div>
                            <div className={style.detailDiv}>
                                <h5>AREA: {countriesDetail?.area}</h5>
                                <h5>POBLACION: {countriesDetail?.population}</h5>
                            </div>
                        </div>
                     
                        <h5>ACTIVIDADES</h5>
                        

                        {countriesDetail?.activities?.length ?
                    countriesDetail?.activities.map(a=>{
                        return (<div className={style.detailAct} key={a.id} >
                            <h5> {a.name}</h5>
                            <h5>Difficulty: {a.difficulty}</h5>
                            <h5> {a.duration} mins</h5>
                            <h5> {a.season}</h5>
                            
                        </div>   )
                    } ):
                        <h5> NO HAY ACTIVIDADES PARA ESTE PAIS</h5>
                    }
                    </div>

                <Link to= "/home">
                    <button className={style.button}>Volver</button>
                </Link>

                    </div>
            </div>
        )
}
