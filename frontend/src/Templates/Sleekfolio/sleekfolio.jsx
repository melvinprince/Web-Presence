import "./sleekfolio.css";
import { useSelector } from 'react-redux';


export default function Sleekfolio() {
    const userDetails = useSelector(state => state.userDetails);

    return (
        <div className="wrapper-sleekfolio">
            <div className="container-sleekfolio">
                {/* Header Section */}
                <div className="headerr">
                    <div className="header-main">
                        <img 
                            src={userDetails.userData.image_url} 
                            alt={`${userDetails.userData.name}'s profile`} 
                            className="profile-image" 
                        />
                        <div className="header-info">
                            <h1>{userDetails.userData.name}</h1>
                            <h2>{userDetails.userData.title}</h2>
                            <p>{userDetails.userData.about}</p>
                        </div>
                    </div>
                    <div className="header-details">
                        <ul>
                            <li><strong>Date of Birth:</strong> {userDetails.userData.date_of_birth}</li>
                            <li><strong>Nationality:</strong> {userDetails.userData.nationality}</li>
                            <li><strong>Current Country:</strong> {userDetails.userData.current_country}</li>
                            <li><strong>Skills:</strong> {userDetails.userData.skills}</li>
                            <li><strong>Languages:</strong> {userDetails.userData.languages}</li>
                        </ul>
                    </div>
                </div>

                {/* Education Section */}
                <section className="education">
                    <h2>Education</h2>
                    <div className="education-list">
                        {userDetails.education.map((edu, index) => (
                            <div className="education-item" key={index}>
                                <h3>{edu.degree} in {edu.major}</h3>
                                <p>{edu.college_name}</p>
                                <p>Graduated: {edu.graduation_month} {edu.graduation_year}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section className="experience">
                    <h2>Experience</h2>
                    <div className="experience-list">
                        {userDetails.experience.map((exp, index) => (
                            <div className="experience-item" key={index}>
                                <h3>{exp.title}</h3>
                                <p>{exp.company_name}</p>
                                <p>
                                    {new Date(exp.start_date).toLocaleDateString()} - 
                                    {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section className="projects">
                    <h2>Projects</h2>
                    <div className="projects-grid">
                        {userDetails.projects.map((project, index) => (
                            <div className="project-item" key={index}>
                                <h3>{project.project_name}</h3>
                                <p>{project.project_outcome}</p>
                                <a href={project.project_link} target="_blank" rel="noopener noreferrer">
                                    View Project
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
