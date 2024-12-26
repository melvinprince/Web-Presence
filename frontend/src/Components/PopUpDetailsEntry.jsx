import "./css/popupdetailsentry.css";

export default function PopUpDetailsEntry({handleClose, onSubmit}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        onSubmit(data);
    }


    return (
        <div className="popup-details-entry">
            <div className="popup-details-entry-content">
                <button className="close-button" onClick={handleClose}>×</button>
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="education">Education</label>
                        <input type="text" id="education" name="education" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="projects">Projects</label>
                        <input type="text" id="projects" name="projects" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="projects">Experience</label>
                        <input type="text" id="experience" name="experience" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills">Skills</label>
                        <input type="text" id="skills" name="skills" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="languages">Languages</label>
                        <input type="text" id="languages" name="languages" required />
                    </div>-
                    <div className="form-group">
                        <label htmlFor="date_of_birth">Date of Birth</label>
                        <input type="date" id="date_of_birth" name="date_of_birth" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nationality">Nationality</label>
                        <input type="text" id="nationality" name="nationality" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="current_country">Current Country</label>
                        <input type="text" id="current_country" name="current_country" required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}