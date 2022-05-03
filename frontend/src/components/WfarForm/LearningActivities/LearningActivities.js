import styles from './LearningActivities.module.css';
import DynamicInputField from '../UI/DynamicInputField';
import { useState } from 'react';
const LearningActivities = (props) => {

    const SAMPLE_ITEMS = [
        {
            key: 1,
            id: "learningActivity1",
            inputName: "learningActivity",
            placeholder: "Enter learning activity #1",
            value: null
        }
    ];

    const [learningActivityFields, setLearningActivityFields] = useState(SAMPLE_ITEMS);

    const onAddInputField = () => {

        console.log("TEST: on add input field");


        setLearningActivityFields((prevState) => {

            var count = prevState[prevState.length-1].key + 1;

            const item = {
                key: count,
                id: "learningActivity" + count,
                onChange: null,
                onBlur: null,
                onAdd: onAddInputField,
                inputName: "learningActivity",
                placeholder: "Enter learning activity #" + count,
                value: null
            };
            return [...prevState, item];
        });

    }

    const onRemoveInputField = (key) => {
        console.log("TEST: on remove input field" + key);
        
        setLearningActivityFields((prevState) => {

            let newArray = [];

            for (let i = 0; i < prevState.length; i++) {
                if (prevState[i].key == (key)) 
                    continue;
                
                newArray.push(prevState[i]);
            }

            return newArray;
        });
    }

    console.log(learningActivityFields);
    return (
        <div className={styles['learning-activities-container']}>
            {learningActivityFields.map((field, i) => {

                let isLast;
                if (i === learningActivityFields.length - 1) {
                    isLast = "1";
                }

                return <DynamicInputField
                    key={field.key}
                    type="text"
                    index={field.key}
                    isLast={isLast}
                    id={field.id}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    // onClick={field.key == learningActivityFields.length ? onAddInputField : onRemoveInputField }
                    onRemove={onRemoveInputField}
                    onAdd={onAddInputField}
                    name={field.inputName}
                    placeholder={field.placeholder}
                    value={field.value} />
            })}
        </div>
    );
}

export default LearningActivities;