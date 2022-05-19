import { useSelector } from "react-redux";

const CurrentWeekContainer = (props) => {

    const sem = useSelector((state) => state.activeSem).activeSem;
    let label;
    let school_year;
    let current_week;
    if(sem){
        label = sem[0].label;
        school_year = sem[0].school_year;
        current_week = sem[0].current_week;
    }

    return (
        <div className="current-week-main-container">
            <div className="current-semester">
                <p>{label} of {school_year}</p>
            </div>
            <div className="current-week-container">
                <p id="current-week">WEEK {current_week}</p>
                <p>Current Week</p>
            </div>
        </div>
    )
}

export default CurrentWeekContainer;