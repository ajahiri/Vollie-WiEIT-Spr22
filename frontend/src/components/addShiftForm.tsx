/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// import { Button } from "react-bootstrap/lib/InputGroup";
import "./addShiftForm.css";
type formProps = {
    handleEvent: any;
    handleClose: any;
    // ...rest of your props
};

const AddShiftForm: React.FC<formProps> = ({ handleEvent, handleClose }) => {
    return (
        <div>
            <form className="add-shift-form">
                <label className="title">Title</label>
                <input type="text" required name="shiftTitle" onChange={handleEvent} />

                <label>Description</label>
                <textarea required name="shiftDescription" onChange={handleEvent} />

                <label>Select Start Date</label>
                <input type="date" required name="startDate" onChange={handleEvent} />

                <label>Select End Date</label>
                <input type="date" required name="endDate" onChange={handleEvent} />

                <label>Time</label>
                <input type="text" required name="shiftTime" onChange={handleEvent} />

                <label>Address</label>
                <input type="text" required name="shiftAddress" onChange={handleEvent} />

                <label>Venue</label>
                <input type="text" required name="shiftVenue" onChange={handleEvent} />

                <label>Address Description</label>
                <input type="text" required name="addressDescription" onChange={handleEvent} />

                <label>Hours</label>
                <input type="text" required name="shiftHours" onChange={handleEvent} />

                <h1 className="type-header">Volunteer Type Numbers</h1>
                <hr className="type-line" />
                <div className="type-container">
                    <div className="type">
                        <label>General volunteer:</label>
                        <input type="text" name="type1" min="0" onChange={handleEvent} />
                    </div>
                    <div className="type">
                        <label>Undergraduate ambassadors:</label>
                        <input type="text" name="type1" min="0" onChange={handleEvent} />
                    </div>
                    <div className="type">
                        <label>Postgradute ambassadors:</label>
                        <input type="text" name="type1" min="0" onChange={handleEvent} />
                    </div>
                    <div className="type">
                        <label>Staff ambassadors:</label>
                        <input type="text" name="type1" min="0" onChange={handleEvent} />
                    </div>
                    <div className="type">
                        <label>Sprouts:</label>
                        <input type="text" name="type1" min="0" onChange={handleEvent} />
                    </div>
                </div>
                <div className="btn-container">
                    <button className="cancel-btn" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="add-btn" type="submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddShiftForm;
