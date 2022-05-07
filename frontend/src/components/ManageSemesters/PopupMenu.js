import styles from "./PopupMenu.module.css";

const PopupMenu = (props) => {
  const items = props.items;

  return (
    <div className={styles["pop-up"]} onMouseLeave={props.onMouseLeave}>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} onClick={item.onClick}>
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopupMenu;
