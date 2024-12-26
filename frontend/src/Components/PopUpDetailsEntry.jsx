import "./css/popupdetailsentry.css";
import { useState, useEffect } from "react";

export default function PopUpDetailsEntry({ handleClose, onSubmit, userDetails = {} }) {
    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        education: "",
        projects: "",
        skills: "",
        languages: "",
        experience: "",
        date_of_birth: "",
        nationality: "",
        current_country: "",
    });

    // Update state when userDetails prop changes
    useEffect(() => {
        setFormData({
            name: userDetails.name || "",
            email: userDetails.email || "",
            title: userDetails.title || "",
            education: userDetails.education || "",
            projects: userDetails.projects || "",
            skills: userDetails.skills || "",
            languages: userDetails.languages || "",
            experience: userDetails.experience || "",
            date_of_birth: userDetails.date_of_birth || "",
            nationality: userDetails.nationality || "",
            current_country: userDetails.current_country || "",
        });
    }, [userDetails]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Field configuration
    const fields = [
        { name: "name", label: "Name" },
        { name: "email", label: "Email", type: "email" },
        { name: "title", label: "Title" },
        { name: "education", label: "Education" },
        { name: "projects", label: "Projects" },
        { name: "skills", label: "Skills" },
        { name: "languages", label: "Languages" },
        { name: "experience", label: "Experience" },
        { name: "date_of_birth", label: "Date of Birth", type: "date" },
        { name: "nationality", label: "Nationality" },
        { name: "current_country", label: "Current Country" },
    ];

    return (
        <div className="popup-details-entry">
            <div className="popup-details-entry-content">
                <button className="close-button" onClick={handleClose}>×</button>
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map(({ name, label, type = "text" }) => (
                        <div className="form-group" key={name}>
                            <label htmlFor={name}>{label}</label>
                            <input
                                type={type}
                                id={name}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
