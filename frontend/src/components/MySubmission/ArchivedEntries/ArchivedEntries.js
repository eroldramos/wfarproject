import { Fragment } from "react";
import ArchivedEntry from "./ArchivedEntry";
import styles from './ArchivedEntries.module.css';

const ArchivedEntries = (props) => {

    let items = props.items;

    return (
        <Fragment>
            <div className={styles['archived-entries']}>
                {items.length > 0 && items.map(item => {
                    return (<ArchivedEntry key={item.id} 
                                            id={item.id}
                                            accomplishmentDate={item.accomplishment_date}
                                            courseYearSection={item.course_year_section}
                                            subject={item.subject}
                                            semester={item.semester}
                                            weekNo={item.week_no} />);
                })}
                {items.length <= 0 && <div className="placeholder-data-not-available">No archived entries for the selected semester.</div>}
            </div>
        </Fragment>

    )
}

export default ArchivedEntries;