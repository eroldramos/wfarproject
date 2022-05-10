import React,{Fragment} from "react"
import styles from "./Table.module.css"


const genericTable = props =>{
    
    return (
        <table className={styles.table}>
            <tr>
                <th>Faculty</th>
            </tr> 
        </table>
    )


}

export default genericTable;