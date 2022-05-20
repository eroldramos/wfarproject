import MyWFARCard from "./MyWFARCard";
import styles from "./MyWFAR.module.css";

const MyWFAR = (props) => {

    let items = props.items;

    return (
        <div className={styles.myWfar}>
            {items.length > 0 && items.map(item => {
                return (
                    <MyWFARCard key={item.id} id={item.id} weekNo={item.week_no} weekBracket={item.week_bracket} status={item.status} entries={item.wfar_entries} />);
            })}
            {items.length <= 0 && <div className="placeholder-data-not-available">No WFARs are available for the selected semester.</div>}
        </div>
    )
}

export default MyWFAR;