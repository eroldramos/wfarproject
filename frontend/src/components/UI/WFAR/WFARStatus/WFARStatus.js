import styles from './WFARStatus.module.css';

const WFARStatus = (props) => {

    let statusClass;
    let statusLabel;

    switch(props.status) {
        case 2:
            statusClass = "toBeChecked";
            statusLabel = "To be checked";
            break;

        case 3:
            statusClass = "ok";
            statusLabel = "Ok";
            break;

        case 4:
            statusClass = "withRevisions";
            statusLabel = "With Revisions";
            break;
    }

    let classes = styles['card-status'] + ' ' + styles[statusClass];

    return (
        <div className={classes}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.35439 0.0278382C4.57993 0.192366 2.93483 1.02745 1.75489 2.36286C0.574809 3.69827 -0.0515639 5.43357 0.00332519 7.21479C0.0583244 8.99601 0.790377 10.6891 2.05056 11.9494C3.31075 13.2096 5.00395 13.9417 6.7852 13.9967C8.56653 14.0516 10.3018 13.4252 11.6371 12.2451C12.9725 11.065 13.8076 9.42009 13.9721 7.6456C14.0945 6.27694 13.8124 4.90244 13.1609 3.69262C12.5095 2.48267 11.5173 1.4905 10.3074 0.839122C9.09753 0.187624 7.72307 -0.0944421 6.35442 0.0278681L6.35439 0.0278382ZM10.7601 5.42687L6.61127 9.53255C6.48674 9.65371 6.31989 9.72161 6.14617 9.72161C5.97246 9.72161 5.80562 9.65371 5.68107 9.53255L3.23571 7.19729C3.06363 7.03194 2.99281 6.7874 3.04979 6.55579C3.10688 6.32405 3.28327 6.14046 3.51244 6.07405C3.74162 6.00754 3.98883 6.06847 4.1609 6.2337L6.13456 8.12734L9.82826 4.47858C9.99896 4.31812 10.2414 4.25905 10.4667 4.32289C10.6922 4.38684 10.8675 4.56439 10.9286 4.79055C10.9897 5.0167 10.9276 5.25833 10.7651 5.42704L10.7601 5.42687Z" fill="#1A9E50" />
            </svg>

            { statusLabel }
        </div>
    );
}

export default WFARStatus;