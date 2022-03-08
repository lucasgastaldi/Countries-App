import style from '../style/Paginado.module.css'

export default function Paginado({countriesPerPage, allCountries, paginado}) {
    const page = []

    for (let i=0; i<=Math.ceil(allCountries/countriesPerPage); i++) {
        page.push(i+1)
    }

    return (
        <div className={style.container}>
            <ul className={style.paginado}>
                {page?.map( p => (
                    <li key={p}>
                        <button className={style.pageBtn} onClick={() => paginado(p)}>{p}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}