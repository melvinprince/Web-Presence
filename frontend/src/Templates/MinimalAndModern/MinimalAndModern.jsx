import { useSelector } from 'react-redux';
import './minimalandmodern.css';

export default function MinimalAndModern() {
    const userDetails = useSelector(state => state.userDetails);
    console.log("userDetails in black and white", userDetails);

    return (
        <div className="wrapper-minimal-and-modern">
            <div className="minimal-and-modern">
                {/* Profile Section */}
                <header className="profile-header">
                    <div className="profile-image">
                        <img src={userDetails?.userData?.image_url} alt="Profile" />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{userDetails?.userData?.name}</h1>
                        <h2 className="profile-title">{userDetails?.userData?.title}</h2>
                    </div>
                </header>

                {/* About Section */}
                <section className="about-section">
                    <h2>About Me</h2>
                    <p>{userDetails?.userData?.about}</p>
                    <ul className="personal-details">
                        <li><strong>Born On:</strong> {userDetails?.userData?.date_of_birth}</li>
                        <li><strong>Nationality:</strong> {userDetails?.userData?.nationality}</li>
                        <li><strong>Current Country:</strong> {userDetails?.userData?.current_country}</li>
                    </ul>
                </section>

                {/* Skills and Languages Section */}
                <section className="skills-languages">
                    <div className="skills">
                        <h2>Skills</h2>
                        <p>{userDetails?.userData?.skills}</p>
                    </div>
                    <div className="languages">
                        <h2>Languages</h2>
                        <p>{userDetails?.userData?.languages}</p>
                    </div>
                </section>

                {/* Education Section */}
                <section className="education-section">
                    <h2>Education</h2>
                    {userDetails?.education?.map((edu, index) => (
                        <div key={index} className="education-item">
                            <p><strong>{edu.college_name}</strong></p>
                            <p>{edu.degree} in {edu.major}</p>
                            <p>Graduated: {edu.graduation_month} {edu.graduation_year}</p>
                        </div>
                    ))}
                </section>

                {/* Experience Section */}
                <section className="experience-section">
                    <h2>Experience</h2>
                    {userDetails?.experience?.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <h3>{exp.title}</h3>
                            <p><strong>{exp.company_name}</strong></p>
                            <p>{exp.start_date} - {exp.end_date}</p>
                        </div>
                    ))}
                </section>

                {/* Projects Section */}
                <section className="projects-section">
                    <h2>Projects</h2>
                    {userDetails?.projects?.map((project, index) => (
                        <div key={index} className="project-item">
                            <h3>{project.project_name}</h3>
                            <p>{project.project_outcome}</p>
                            <a href={project.project_link} target="_blank" rel="noopener noreferrer">View Project</a>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
