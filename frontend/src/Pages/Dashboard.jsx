import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PopUpDetailsEntry from "../Components/PopUpDetailsEntry";
import { useState, useEffect } from "react";
import { addOrUpdateUserDetails, getUserDetails, deleteEntry } from "../services/userDetailsService";
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
      about: "",
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

  const handleUserDetailsSubmit = async (userData, profileLinks, education, projects, experience) => {
    const formattedData = {
      userData,
      profileLinks,
      education,
      projects,
      experience,
    };
    console.log("formattedData", formattedData);

    updateUserDataState(formattedData);
    try {
      await addOrUpdateUserDetails(formattedData);
      dispatch(setUserDetails(formattedData));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEntry = async (category, index) => {
    try {
      await deleteEntry(category, index);

      const updatedUserDetails = {...userDetails};
      updatedUserDetails[category].splice(index, 1);
      updateUserDataState(updatedUserDetails);

      dispatch(setUserDetails(updatedUserDetails));

    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <button className="add-edit-button addedit-top" onClick={handleOpen}>Add/Edit Details</button> {/* Added class to button */}

        <div className="details-container"> {/* Added container for details */}
          <div className="user-details"> {/* Added class for user details */}
            {userDetails.userData.image_url && (
              <img className="profile-image" src={userDetails.userData.image_url} alt="User Profile" />
            )}
            <div className="user-info"> {/* Added container for user info */}
              <h3>Name: </h3>{userDetails.userData.name}
              <h3>Email: </h3>{userDetails.userData.email}
              <h3>Title: </h3>{userDetails.userData.title}
              <h3>About: </h3>{userDetails.userData.about}
              {/* Add other userData fields as needed */}
              <h3>Date of Birth: </h3>{userDetails.userData.date_of_birth}
              <h3>Nationality: </h3>{userDetails.userData.nationality}
              <h3>Current Country: </h3>{userDetails.userData.current_country}
            </div>
          </div>

          <div className="profile-links"> {/* Added class for profile links */}
            <ul>
            <h3>Profile Links:</h3>
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
            <div className="section">
              <h3>Skills:</h3>
              <p> {userDetails.userData.skills}</p>
            </div>

            <div className="section">
              <h3>Languages:</h3>
              <p>{userDetails.userData.languages}</p>
            </div>
          </div>

          <div className="sections"> {/* Added class for sections */}
            <div className="section"> {/* Added class for each section */}
              <h3>Education:</h3>
              <ul>
                {userDetails.education.map((edu, index) => (
                  <li key={index}>
                    Graduated in <em>{edu.graduation_year}</em> with a <em>{edu.degree}</em> in <em>{edu.major}</em> from <em>{edu.college_name}</em>
                    <button onClick={() => handleDeleteEntry('education', index)}>Delete Entry</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>Projects:</h3>
              <ul>
                {userDetails.projects.map((project, index) => (
                  <li key={index}>
                    <em>{project.project_name}</em> : {project.project_outcome}
                    {project.project_link && (<span> (<a href={project.project_link} target="_blank" rel="noreferrer">View Project</a>)</span>)}
                    <button onClick={() => handleDeleteEntry('projects', index)}>Delete Entry</button>
                  </li>
                ))}
              </ul>
            </div>

            

            <div className="section">
              <h3>Experience:</h3>
              <ul>
                {userDetails.experience.map((exp, index) => (
                  <li key={index}>
                    <em>{exp.title}</em> at <em>{exp.company_name}</em> ({exp.start_date} - {exp.end_date})
                    <button onClick={() => handleDeleteEntry('experience', index)}>Delete Entry</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <button className="add-edit-button" onClick={handleOpen}>Add/Edit Details</button> {/* Added class to button */}
      </div>
      <TemplateSelector userDetails={userDetails.userData} />
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