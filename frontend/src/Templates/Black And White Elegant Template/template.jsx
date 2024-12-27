import { useSelector } from 'react-redux';
import './template.css';

export default function Template() {
    // Access userDetails directly from Redux state
    const userDetails = useSelector(state => state.userDetails);

    // You can directly render the details without local state
    return (
        <div className="template-content">
            <div className="first">
                <img src={userDetails.image_url} alt="Profile Image" />
                <div className="name">
                    <h1>{userDetails.name}</h1>
                </div>
                <div className="title">
                    <h2>{userDetails.title}</h2>
                </div>
            </div>
            <div className="about">
                <p>About Me </p>
                <p>{userDetails.about}</p>
                <p>Born On: {userDetails.date_of_birth}</p>
                <p>Nationality: {userDetails.nationality}</p>
            </div>
            <div className="sk-ed-lg">
                <div className="skills">
                    <p>Skills</p>
                    <p>{userDetails.skills}</p>
                </div>
                <div className="education">
                    <p>Education</p>
                    <p>{userDetails.education}</p>
                </div>
                <div className="languages">
                    <p>Languages</p>
                    <p>{userDetails.languages}</p>
                </div>
            </div>
            <div className="experience">
                <p>Experience</p>
                <p>{userDetails.experience}</p>
            </div>
            <div className="projects">
                <p>Projects</p>
                <p>{userDetails.projects}</p>
            </div>
        </div>
    );
}
