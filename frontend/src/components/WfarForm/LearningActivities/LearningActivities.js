import styles from './LearningActivities.module.css';
import DynamicInputField from '../UI/DynamicInputField';
import { useState } from 'react';
const LearningActivities = (props) => {

    return (
        <div className={styles['learning-activities-container']}>
            {props.inputFields.map((input, index) => {

                let isLast = index === props.inputFields.length - 1 ? "1" : "";
                
                return <DynamicInputField key={index}
                            index={index}
                            type="text"
                            isLast={isLast}
                            onChange={event => props.onChange(index, event)}
                            onBlur={event => props.onBlur(index, event)}
                            onRemoveInput={props.onRemoveInput}
                            onAddInput={props.onAddInput}
                            placeholder={"Enter learning activity no. " + (index + 1)}
                            value={input.value}
                            error={input.error} />
            })}
        </div>
    );
}

export default LearningActivities;