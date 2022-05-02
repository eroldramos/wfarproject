import { Fragment } from "react";
import ArchivedEntry from "./ArchivedEntry";
import styles from './ArchivedEntries.module.css';

const ArchivedEntries = (props) => {

    let items = props.items;

    return (
        <Fragment>
            <div className={styles['archived-entries']}>
                {items.map(item => {
                    return (<ArchivedEntry key={item.id} 
                                            id={item.id}
                                            applicableDate={item.start}
                                            CYS={item.CYS}
                                            subject={item.subject}
                                            semester={item.semester}
                                            week={item.weekTitle} />);
                })}
            </div>
        </Fragment>

    )
}

export default ArchivedEntries;