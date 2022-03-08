import style from '../style/Activity.module.css' 

export default function Activity ({activities, countryName}) {
    if(activities && activities.length){
    return(
        <div >
            <h2>Activities to do in {countryName}</h2>
            <table className={style.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Duration (hours)</th>
                    <th>Season</th>
                    <th>Difficulty</th>
                </tr>
                </thead>
                <tbody>
                {activities && activities.map((a)=>
                <tr className={style.tableRow} key={a.id} >
                    <td>{a.name}</td>
                    <td>{a.duration}</td>
                    <td>{a.season}</td>
                    <td>{a.difficulty}</td>
                </tr>
                )}
                </tbody>
            </table>
        </div>
    )
    } else{
        return (
            <h2>You didnt organize anything yet...</h2>
        )
    }
}

