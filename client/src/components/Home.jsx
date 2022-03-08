import React from 'react'
import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, filterByRegion, orderByName, populationDes, populationAsc } from '../actions'
import { Link } from 'react-router-dom'
import style from '../style/Home.module.css'
import earth from '../images/earth.png'
import Cards from './Cards'
import Paginado from './Paginado'
import SearchBar from './SearchBar'

export default function Home() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const [currentPage, setCurrentpage] = useState(1)
    const [countriesPerPage, setcountriesPerPage] = useState(9)
    const lastCountry = currentPage * countriesPerPage
    const firstCountry = lastCountry - countriesPerPage
    const currentCountry = allCountries.slice(firstCountry, lastCountry)
    const [orden, setOrden] = useState('')

    const paginado = (page) => {
        setCurrentpage(page)
    }

    useEffect (() => {
        dispatch(getCountries())
    }, [])

    function handleClick(e){
        e.preventDefault()
        dispatch(getCountries())
    }

    function handleFilterRegion(e){
        dispatch(filterByRegion(e.target.value))
    }

    function handlePopulation(e) {
        if(e.target.value === 'pasc'){
            dispatch(populationAsc())
        }
        if(e.target.value === 'pdes'){
            dispatch(populationDes())
        }
    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentpage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    

    return (
        <div className={style.background}>
            <div className={style.nav}>
                <img className={style.earth} src={earth} alt="earth" />
                <div className={style.logo}>    
                    <img className={style.title} src="https://fontmeme.com/permalink/211206/5cf77a2e533e70f38991f8806d65bf45.png" alt="countries" border="0" />
                </div>
                <div>
                    <Link to='/activities'>
                        <span className={style.createButton}><a className={style.createButtonA}></a></span>
                    </Link>
                    <Link to='/' >
                      <span><a></a></span>
                    </Link>
                </div> 
            </div>

                <div className={style.filtersDiv}>
                <div className={style.filtersContainer}>
                    <select className={style.filters} onChange={ e => {handleSort(e)}}>
                        <option>Asc-Desc</option>
                        <option value='asc'>Ascendent</option>
                        <option value='des'>Descendent</option>
                    </select>
                </div>
                <div className={style.filtersContainer}>
                    <select className={style.filters} onChange={handlePopulation}>
                            <option>By population</option>
                            <option value='pasc'>Ascendent</option>
                            <option value='pdes'>Descendent</option>
                    </select>
                </div>
                <div className={style.filter}>
                    <select className={style.filters} onChange={e => handleFilterRegion(e)}>
                        <option>By region</option>
                        <option value='All'>All</option>
                        <option value='Africa'>Africa</option>
                        <option value='Americas'>Americas</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                </div>
                <div>
                    <button className={style.reload} onClick={ e => {handleClick(e)}}>Reload</button>
                </div>
            </div>

            <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado} />

            <SearchBar />

            <div className={style.cardContainer}>
                {currentCountry.length ?  
                    currentCountry.map((c) => (
                        <div className={style.cardCont}>
                            <Cards id={c.id} img={c.img} name={c.name} population={c.population} continent={c.continent} key={c.id}/>
                        </div>  
                    ))
                : <div className={style.loading}>Loading...</div>
                }

            </div>
        </div>
    )

}