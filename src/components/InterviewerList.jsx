import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';


export default function InterviewerList (props) {
    const interviewers = props.interviewers || []

    const interviewerListItems = interviewers.map((interviewer, index) => {

        return (

            <InterviewerListItem
                key={index}
                name={interviewer.name}
                avatar={interviewer.avatar}
                selected={interviewer.id === props.value}//deleted .id 
                setInterviewer={() => {
                    props.onChange(interviewer.id)
                }}
                
            />

        )
    })

    return (

        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {interviewerListItems}
            </ul>
        </section>
    )
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};