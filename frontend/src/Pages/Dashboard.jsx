import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PopUpDetailsEntry from "../Components/PopUpDetailsEntry";
import { useState, useEffect } from "react";
import { addUserDetails, getUserDetails, updateUserDetails } from "../services/userDetailsService";
import TemplateSelector from "../Components/TemplateSelector";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../actions/userActions";
import "./css/dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();

  const [userDetails, setUserDetailsState] = useState({
    userData: {
      name: "",
      email: "",
      title: "",
      date_of_birth: "",
      nationality: "",
      current_country: "",
      image_url: "",
      skills: "",
      languages: "",
    },
    profileLinks: { linkedin: "", github: "", website: "" },
    education: [],
    projects: [],
    experience: [],
  });

  const [idPresent, setIdPresent] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpen = () => setIsPopupVisible(true);
  const handleClose = () => setIsPopupVisible(false);

  const updateUserDataState = (data) => {
    setUserDetailsState(data);
    localStorage.setItem('userDetails', JSON.stringify(data));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetails();
        if (data.user_id) {
          setIdPresent(true);
          dispatch(setUserDetails(data));
        }
        console.log("data after fetching in dashboard", data);
        
        updateUserDataState(data);
      } catch (error) {
        handleOpen();
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleUserDetailsSubmit = async (formattedData) => {
    updateUserDataState(formattedData); // Update state with the new format
    try {
      if (idPresent) {
        await updateUserDetails(formattedData);
        dispatch(setUserDetails(formattedData));
      } else {
        await addUserDetails(formattedData);
        setIdPresent(true);
        dispatch(setUserDetails(formattedData));
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="details">
          {userDetails.userData.image_url && <img src={userDetails.userData.image_url} alt="User Profile" />}
          <h3>Name: {userDetails.userData.name}</h3>
          <h3>Email: {userDetails.userData.email}</h3>
          <h3>Title: {userDetails.userData.title}</h3>
          {/* Add other userData fields as needed */}
          <h3>Date of Birth: {userDetails.userData.date_of_birth}</h3>
          <h3>Nationality: {userDetails.userData.nationality}</h3>
          <h3>Current Country: {userDetails.userData.current_country}</h3>


          <h3>Profile Links:</h3>
          <ul>
            {userDetails.profileLinks.linkedin && (
              <li>
                LinkedIn: <a href={userDetails.profileLinks.linkedin} target="_blank" rel="noreferrer">{userDetails.profileLinks.linkedin}</a>
              </li>
            )}
            {userDetails.profileLinks.github && (
              <li>
                GitHub: <a href={userDetails.profileLinks.github} target="_blank" rel="noreferrer">{userDetails.profileLinks.github}</a>
              </li>
            )}
            {userDetails.profileLinks.website && (
              <li>
                Website: <a href={userDetails.profileLinks.website} target="_blank" rel="noreferrer">{userDetails.profileLinks.website}</a>
              </li>
            )}
          </ul>

          <h3>Education:</h3>
          <ul>
            {userDetails.education.map((edu, index) => (
              <li key={index}>
                Graduated in {edu.graduation_year} with a {edu.degree} in {edu.major} from {edu.college_name} 
              </li>
            ))}
          </ul>

          <h3>Projects:</h3>
          <ul>
            {userDetails.projects.map((project, index) => (
              <li key={index}>
                {project.project_name} : {project.project_outcome}
                {project.project_link && (<span> (<a href={project.project_link} target="_blank" rel="noreferrer">View Project</a>)</span>)}
              </li>
            ))}
          </ul>

          <h3>Skills:</h3>
          <p>{userDetails.userData.skills}</p>
    
          <h3>Languages: </h3>
          <p>{userDetails.userData.languages}</p>

          <h3>Experience:</h3>
          <ul>
            {userDetails.experience.map((exp, index) => (
              <li key={index}>
                {exp.title} at {exp.company_name} ({exp.start_date} - {exp.end_date})
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleOpen}>Add/Edit Details</button>
      </div>
      <TemplateSelector userDetails={userDetails} />
      {isPopupVisible && (
        <PopUpDetailsEntry
          handleClose={handleClose}
          onSubmit={handleUserDetailsSubmit}
          userDetails={userDetails}
        />
      )}
      <Footer />
    </div>
  );
}