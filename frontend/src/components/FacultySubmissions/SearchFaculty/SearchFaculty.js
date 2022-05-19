import SearchField from "../../UI/FormControl/SearchField/SearchField";
import styles from "./SearchFaculty.module.css";

const searchFaculty = (props) => {

  return (
    <div className={styles.searchFieldContainer}>
      <SearchField
        id="link"
        onEnterSearch={props.onEnterSearch}
        labelName="search"
        inputName="search"
        placeholder="Search faculty"
        size="rg"
        type="filter"
      />
    </div>
  );
};

export default searchFaculty;
