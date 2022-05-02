import SearchField from "../../UI/FormControl/SearchField/SearchField";
import styles from "./SearchFaculty.module.css";

const searchFaculty = () => {
  return (
    <div className={styles.searchFieldContainer}>
      <SearchField
        id="link"
        onChange={null}
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
