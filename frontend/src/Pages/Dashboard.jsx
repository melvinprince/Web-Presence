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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [education, setEducation] = useState("");
    const [projects, setProjects] = useState("");
    const [skills, setSkills] = useState("");
    const [languages, setLanguages] = useState("");
    const [experience, setExperience] = useState("");
    const [date_of_birth, setDateOfBirth] = useState("");
    const [nationality, setNationality] = useState("");
    const [current_country, setCurrentCountry] = useState("");
    const [image, setImage] = useState(""); // State to store image URL

    const [idPresent, setIdPresent] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleOpen = () => setIsPopupVisible(true);
    const handleClose = () => setIsPopupVisible(false);

    const setData = (data) => {
        setName(data.name);
        setEmail(data.email);
        setTitle(data.title);
        setEducation(data.education);
        setProjects(data.projects);
        setSkills(data.skills);
        setLanguages(data.languages);
        setExperience(data.experience);
        setDateOfBirth(data.date_of_birth);
        setNationality(data.nationality);
        setCurrentCountry(data.current_country);
        setImage(data.image_url); // Set the image URL when user data is fetched
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
                setData(data);
            } catch (error) {
                handleOpen();
                console.error(error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleUserDetailsSubmit = async (data) => {
        setData(data);
        try {
            if (idPresent) {
                await updateUserDetails(data);
                dispatch(setUserDetails(data));
                handleClose();
            } else {
                await addUserDetails(data); 
                setIdPresent(true);
                dispatch(setUserDetails(data));
                handleClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const userDetails = { name, email, title, education, projects, skills, languages, experience, date_of_birth, nationality, current_country, image };

    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <div className="details">
                    {image && <img src={image} alt="User Profile" />}
                    <h3>Name : {name}</h3>
                    <h3>Email : {email}</h3>
                    <h3>Title : {title}</h3>
                    <h3>Education : {education}</h3>
                    <h3>Projects : {projects}</h3>
                    <h3>Skills : {skills}</h3>
                    <h3>Languages : {languages}</h3>
                    <h3>Experience : {experience}</h3>
                    <h3>Date of Birth : {date_of_birth}</h3>
                    <h3>Nationality : {nationality}</h3>
                    <h3>Current Country: {current_country}</h3>
                </div>
                <button onClick={handleOpen}>Add/Edit Details</button>
            </div>
            <TemplateSelector userDetails={userDetails} />
            {isPopupVisible && 
                <PopUpDetailsEntry 
                    handleClose={handleClose} 
                    onSubmit={handleUserDetailsSubmit}
                    userDetails={userDetails}        
                />
            }
            <Footer />
        </div>
    );
}
