import { useSelector } from 'react-redux';
import './blackandwhite.css';

export default function BlackAndWhite() {
    const userDetails = useSelector(state => state.userDetails);
    console.log("userDetails in black and white", userDetails);

    return (
        <div className="wrapper-black-and-white">
        <div className="black-and-white">
            <div className="first">
                <img src={userDetails?.userData?.image_url} alt="Profile Image" />
                <div className="name">
                    <h1>{userDetails?.userData?.name}</h1>
                </div>
                <div className="title">
                    <h2>{userDetails?.userData?.title}</h2>
                </div>
            </div>
            <div className="about">
                <p>About Me</p>
                <p>{userDetails?.userData?.about}</p>
                <p>Born On: {userDetails?.userData?.date_of_birth}</p>
                <p>Nationality: {userDetails?.userData?.nationality}</p>
                <p>Current Country: {userDetails?.userData?.current_country}</p>
            </div>
            <div className="sk-lg">
                <div className="skills">
                    <p>Skills</p>
                    <p>{userDetails?.userData?.skills}</p>
                </div>
                
                <div className="languages">
                    <p>Languages</p>
                    <p>{userDetails?.userData?.languages}</p>
                </div>
            </div>
            <div className="education">
                    <p>Education</p>
                    {userDetails?.education?.map((edu, index) => (
                        <div key={index}>
                            <p>{edu.college_name}
                                <br />
                                {edu.degree} 
                                <br />
                                {edu.major}
                                <br />
                                ({edu.graduation_month} {edu.graduation_year})
                            </p>
                        </div>
                    ))}
                </div>
            <div className="experience">
                <p>Experience</p>
                {userDetails?.experience?.map((exp, index) => (
                    <div key={index}>
                        <p>Title: {exp.title} </p>
                        <p>Company: {exp.company_name} </p>
                        <p>Duration:
                             ({exp.start_date} - {exp.end_date})</p>
                    </div>
                ))}
            </div>
            <div className="projects">
                <p>Projects</p>
                {userDetails?.projects?.map((project, index) => (
                    <div key={index}>
                        <p>{project.project_name}</p>
                        <p>{project.project_outcome}</p>
                        <p><a href={project.project_link} target="_blank" rel="noopener noreferrer">View Project</a></p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
