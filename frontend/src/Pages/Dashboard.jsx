import Header from "../Components/Header"
import Footer from "../Components/Footer"
import PopUpDetailsEntry from "../Components/PopUpDetailsEntry"
import { useState, useEffect } from "react"
import { addUserDetails as addUserDetailsService, getUserDetails } from "../services/userDetailsService"

export default function Dashboard() {
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

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const handleOpen = () => setIsPopupVisible(true);
    const handleClose = () => setIsPopupVisible(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserDetails();
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
            } catch (error) {
                handleOpen();
                console.error(error);
            }
        };
        fetchData();
    }, []);
    
    const handleUserDetailsSubmit = async (data) => {
        // Update the local state with the form data
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

        try {
            // Pass the data to the service function
            await addUserDetailsService(data); 
            handleClose(); // Close the popup on success
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
            </div>
            {isPopupVisible && <PopUpDetailsEntry handleClose={handleClose} onSubmit={handleUserDetailsSubmit} />}
            <Footer />
        </div>
    );
}
