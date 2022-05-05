import styles from './TeamMeetScreenshots.module.css';
import DynamicInputField from '../UI/DynamicInputField';
import ImageCard from '../../UI/FormControl/ImageCard/ImageCard';
import { useState } from 'react';

const TeamMeetScreenshots = (props) => {

    return (
        <div>
            <label>Teams Meet Screenshot</label>
            <ImageCard />
        </div>
    );
}

export default TeamMeetScreenshots;