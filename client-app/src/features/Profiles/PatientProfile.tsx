import { observer } from "mobx-react-lite";
import { Segment } from "semantic-ui-react";


 export default observer (function PatientProfile () {

        return (
            <Segment>
                {<h1>Profile of Patient</h1>}
            </Segment>
        )
    })
