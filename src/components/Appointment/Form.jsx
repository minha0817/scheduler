import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form (props) {

    const [student, setStudent] = useState(props.student || "");
    
    // setInterviewer should receive an id as an argument. example. setInterviewer(3)

    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    const reset = () => {
        setStudent("")
        setInterviewer(null)
    }

    const cancel = () => {
        reset()
        props.onCancel()
    }

    const handleSubmit = event => {
        event.preventDefault();
    }

    return (

        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder={props.name ? props.name : "Enter Student Name"}
                        value={student}
                        onChange={(event) => setStudent(event.target.value)}

                    />
                </form>

                <InterviewerList 

                    interviewers = {props.interviewers}
                    onChange={setInterviewer}
                    value={interviewer}

                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                <Button danger onClick={cancel}>Cancel</Button>
                <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
                </section>
            </section>
        </main>
    )
}
