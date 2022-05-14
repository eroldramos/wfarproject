import MyWFARCard from "./MyWFARCard";
import styles from "./MyWFAR.module.css";

const MyWFAR = (props) => {

    let items = props.items;

    return (
        <div className={styles.myWfar}>

            {/* <h1>agagaga{items}</h1> */}
            {items.length > 0 && items.map(item => {
                return (
                    <MyWFARCard key={item.id} id={item.id} weekNo={item.week_no} weekBracket={item.week_bracket} status={item.status} entries={item.wfar_entries} />);
            })}
            
        </div>
    )
}

export default MyWFAR;