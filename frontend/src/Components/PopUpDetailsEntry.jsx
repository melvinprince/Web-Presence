import "./css/popupdetailsentry.css";
import { uploadUserImage } from "../services/userDetailsService";
import { useState, useEffect } from "react";

export default function PopUpDetailsEntry({ handleClose, onSubmit, userDetails = {} }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        profileLinks: { linkedin: "", github: "", website: "" },
        education: [],
        projects: [],
        experience: [],
        date_of_birth: "",
        nationality: "",
        current_country: "",
        image_url: "",
        skills: "",
        languages: "",
    });

    useEffect(() => {
        if (userDetails && userDetails.userData) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...userDetails.userData,
                profileLinks: userDetails.profileLinks || { linkedin: "", github: "", website: "" },
                education: userDetails.education || [],
                projects: userDetails.projects || [],
                experience: userDetails.experience || [],
            }));
        } else {
            setFormData({
                name: "",
                email: "",
                title: "",
                profileLinks: { linkedin: "", github: "", website: "" },
                education: [],
                projects: [],
                experience: [],
                date_of_birth: "",
                nationality: "",
                current_country: "",
                image_url: "",
                skills: "",
                languages: "",
            });
        }
    }, [userDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (section, key, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [key]: value },
        }));
    };

    const addEntry = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], {}],
        }));
    };

    const updateEntry = (field, index, key, value) => {
        const updatedField = [...formData[field]];
        updatedField[index] = { ...updatedField[index], [key]: value };
        setFormData((prev) => ({ ...prev, [field]: updatedField }));
    };

    const removeEntry = (field, index) => {
        const updatedField = [...formData[field]];
        updatedField.splice(index, 1);
        setFormData((prev) => ({ ...prev, [field]: updatedField }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name: formData.name,
            email: formData.email,
            title: formData.title,
            date_of_birth: formData.date_of_birth,
            nationality: formData.nationality,
            current_country: formData.current_country,
            image_url: formData.image_url,
            skills: formData.skills,
            languages: formData.languages,
        };

        const formattedData = {
            userData,
            profileLinks: formData.profileLinks,
            education: formData.education,
            projects: formData.projects,
            experience: formData.experience,
        };

        onSubmit(formattedData);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const imageData = new FormData();
        imageData.append("image", file);

        try {
            const response = await uploadUserImage(imageData);
            if (response?.imageUrl) {
                setFormData((prevState) => ({
                    ...prevState,
                    image_url: response.imageUrl,
                }));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="popup-details-entry">
            <div className="popup-details-entry-content">
                <button className="close-button" onClick={handleClose}>×</button>
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    {/* Basic Details */}
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Nationality</label>
                        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Current Country</label>
                        <input type="text" name="current_country" value={formData.current_country} onChange={handleChange} />
                    </div>

                    {/* Profile Links */}
                    <h3>Profile Links</h3>
                    {["linkedin", "github", "website"].map((link) => (
                        <div className="form-group" key={link}>
                            <label>{link.charAt(0).toUpperCase() + link.slice(1)}</label>
                            <input
                                placeholder="start with https://"
                                type="url"
                                name={link}
                                value={formData.profileLinks[link]}
                                onChange={(e) => handleNestedChange("profileLinks", link, e.target.value)}
                            />
                        </div>
                    ))}

                    {/* Education Section */}
                    <h3>Education</h3>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="nested-form-group">
                            <input
                                placeholder="College"
                                value={edu.college_name || ""}
                                onChange={(e) => updateEntry("education", index, "college_name", e.target.value)}
                            />
                            <input
                                placeholder="Graduation Year"
                                value={edu.graduation_year || ""}
                                onChange={(e) => updateEntry("education", index, "graduation_year", e.target.value)}
                            />
                            <input
                                placeholder="Graduation month"
                                value={edu.graduation_month || ""}
                                onChange={(e) => updateEntry("education", index, "graduation_month", e.target.value)}
                            />
                            <input
                                placeholder="Degree"
                                value={edu.degree || ""}
                                onChange={(e) => updateEntry("education", index, "degree", e.target.value)}
                            />
                            <input
                                placeholder="Major"
                                value={edu.major || ""}
                                onChange={(e) => updateEntry("education", index, "major", e.target.value)}
                            />
                            <button type="button" onClick={() => removeEntry("education", index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addEntry("education")}>Add Education</button>


                    <h3>Skills</h3>
                    <div className="form-group">
                        <input
                            placeholder="Skills"
                            value={formData.skills}
                            onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
                        />
                    </div>

                    <h3>Languages</h3>
                    <div className="form-group">
                        <input
                            placeholder="Languages"
                            value={formData.languages}
                            onChange={(e) => setFormData((prev) => ({ ...prev, languages: e.target.value }))}
                        />
                    </div>

                
                    {/* Projects Section */}
                    <h3>Projects</h3>
                    {formData.projects.map((project, index) => (
                        <div key={index} className="nested-form-group">
                            <input
                                placeholder="Project Name"
                                value={project.project_name || ""}
                                onChange={(e) => updateEntry("projects", index, "project_name", e.target.value)}
                            />
                            <input
                                placeholder="Outcome"
                                value={project.project_outcome || ""}
                                onChange={(e) => updateEntry("projects", index, "project_outcome", e.target.value)}
                            />
                            <input
                                placeholder="Link"
                                value={project.project_link || ""}
                                onChange={(e) => updateEntry("projects", index, "project_link", e.target.value)}
                            />
                            <button type="button" onClick={() => removeEntry("projects", index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addEntry("projects")}>Add Project</button>

                    {/* Experience Section */}
                    <h3>Experience</h3>
                    {formData.experience.map((exp, index) => (
                        <div key={index} className="nested-form-group">
                            <input
                                placeholder="Company"
                                value={exp.company_name || ""}
                                onChange={(e) => updateEntry("experience", index, "company_name", e.target.value)}
                            />
                            <input
                                placeholder="Title"
                                value={exp.title || ""}
                                onChange={(e) => updateEntry("experience", index, "title", e.target.value)}
                            />
                            <input
                                placeholder="Start Date"
                                type="date"
                                value={exp.start_date || ""}
                                onChange={(e) => updateEntry("experience", index, "start_date", e.target.value)}
                            />
                            <input
                                placeholder="End Date"
                                type="date"
                                value={exp.end_date || ""}
                                onChange={(e) => updateEntry("experience", index, "end_date", e.target.value)}
                            />
                            <button type="button" onClick={() => removeEntry("experience", index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addEntry("experience")}>Add Experience</button>

                    {/* Image Upload */}
                    <div className="form-group">
                        <label>Profile Image</label>
                        <input type="file" onChange={handleImageUpload} />
                        {formData.image_url && <img src={formData.image_url} alt="Profile Preview" />}
                    </div>

                    <button type="submit">Save Details</button>
                </form>
            </div>
        </div>
    );
}
