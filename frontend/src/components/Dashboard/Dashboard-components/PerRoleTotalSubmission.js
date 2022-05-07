const PerRoleTotalSubmission = (props) => {

    return (
        <div className="per-role-submission">
            <div className="info">
                <h5>DEPARTMENT HEAD</h5>
                <div className="total-submission-status">
                    <p className="total-submitted">0<span className="total-employees">/2</span></p>
                </div>
                <p className="phrase">have submitted this week</p>
            </div>
            <div className="graph-container">
                <div className="circular-progress">
                    <div className="value-container">0%</div>
                </div>
            </div>
        </div>
    )
}

export default PerRoleTotalSubmission;