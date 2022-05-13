import styles from './PopupMenu.module.css';

const PopupMenu = (props) => {

    const items = props.items;
    const display = props.display;
    console.log(display);

    return (
        <div className={styles.popUp + ' ' + styles[display]}>
            <ul>
                {items.map(item => {
                    return (
                        <li key={item.id} onClick={item.onClick}>
                            {item.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PopupMenu;