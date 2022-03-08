import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { getCountries } from '../actions/index'
import style from '../style/CreateActivity.module.css'
import background from '../images/create.jpg'
import axios from 'axios'

function validate(details) {
    let errors = {}
    if (!details.name ){
        errors.name = 'Debe escribir un nombre.'
    } else if (!details.difficulty ){
        errors.difficulty = 'Debe introducir una difficultad.'
    } else if (!details.duration ){
        errors.duration = 'Debe introducir una duracion.'
    } else if (!details.season ){
        errors.season = 'Debe introducir una estacion.'
    }
    return errors;
}

export default function CreateActivity() {
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({})
    


    const [details, setDetails] = useState({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: []
    })

  
    useEffect(() => {
      dispatch(getCountries())
    }, [dispatch])
  
    function handleChange(e) {
        setDetails({
          ...details,
          [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...details,
            [e.target.name]: e.target.value,
          }))
    }
  
    function handleSelect(e) {
      setDetails({
        ...details,
        [e.target.name]: [...details.countries, e.target.value]
      })
      setErrors(validate({
            ...details,
            [e.target.name]: e.target.value,
          }))
    }
    console.log(details.countries)
    console.log(details)
    function handleSubmit(e) {
        e.preventDefault()
        setErrors(validate({
            ...details,
            [e.target.name]: e.target.value,
          }))
        axios.post("http://localhost:3001/activities", details)
            alert("activity created");
            history.push('/home')
    }
    
  
    return (
      <div className={style.backgroundDiv}>
        <img src={background} alt="" className={style.background} />
        <div className={''}>
          <form className={style.formContainer} key={countries.id} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={''}>Create activity</h1>
            <div className={style.name}>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                name='name'
                className={style.input}
                onChange={(e) => handleChange(e)}
                required
              />
            {errors.name && (
                <p>{errors.name}</p>
            )}
            </div>
  
            <div className={style.name}>
              <label className={''} htmlFor='duration'>
                Duration:
              </label>
              <input
                type='text'
                id='duration'
                name='duration'
                className={style.input}
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.duration && (
                <p>{errors.duration}</p>
            )}
            </div>
  
            <div className={style.name}>
              <label className={''} htmlFor='difficulty'>
                Difficulty:
              </label>
              <select
                id='difficulty'
                name='difficulty'
                className={style.input}
                onChange={(e) => handleChange(e)}
                required
              >
                  {errors.difficulty && (
                <p>{errors.difficulty}</p>
            )}
                <option value=''>Difficulty...</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
  
            <div className={style.name}>
              <label className={''} htmlFor='season'>
                Season:
              </label>
              <select
                className={style.input}
                id='season'
                name='season'
                onChange={(e) => handleChange(e)}
                required
              >
                  {errors.season && (
                <p>{errors.season}</p>
            )}
                <option value=''>Season...</option>
                <option value='Summer'>Summer</option>
                <option value='Fall'>Fall</option>
                <option value='Winter'>Winter</option>
                <option value='Spring'>Spring</option>
              </select>
            </div>
  
            <div className={style.name}>
              <label className={''} htmlFor='countries'>
                Country:
              </label>
              <select
                className={style.input}
                id='countries'
                name='countries'
                onChange={(e) => handleSelect(e)}
                required
              >
                <option value='countries'>Countries...</option>
                {countries.map((c) => (
                  <option value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <br/>
            <div className={style.selectedCountries}>{details.countries.map((c) => `${c} | `)}</div>
            <div className={style.buttons}>
              <button className={style.button2} type='submit'>
                Create
              </button>
              <Link to='/home'>
                <button className={style.button}>Home</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
}