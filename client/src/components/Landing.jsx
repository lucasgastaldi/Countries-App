import React from "react"
import { Link } from "react-router-dom"
import style from '../style/Landing.module.css'
import background from '../images/landing.jpg'
import go from '../images/earth.png'

export default function Landing() {
    return(
        <div className={style.backgroundDiv}>
            <img src={background} alt="" className={style.background} />
            <div>
                    <div className={style.logo}>    
                        <img className={style.title} src="https://fontmeme.com/permalink/211206/5cf77a2e533e70f38991f8806d65bf45.png" alt="countries" border="0" />
                    </div>
                    <div>
                        <img className={style.title_2} src="https://fontmeme.com/permalink/211206/20b05dc459ab014b62ef314de159462d.png" alt="app" border="0" />
                    </div>
                    <div className={style.pokeButton}>
                        <Link to='/home' >
                            <img src={go} alt="" className={style.go} /> 
                        </Link>
                    </div>
                    <div>
                        <Link to='/home' >    
                            <img className={style.letsGo} src="https://fontmeme.com/permalink/211206/320205b1cdd7630a7535f9c340630783.png" alt="fuente-pokemon" border="0"/>
                        </Link>
                    </div>
            </div>
        </div>
    )
}
