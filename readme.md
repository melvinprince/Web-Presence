# Web Presence

**Web Presence** is a user-friendly React application that simplifies the process of creating professional portfolios, especially for those who may not have coding experience. It offers a variety of features, including pre-designed templates and responsive design, to help users build impressive online portfolios with ease.

## Features

- **User Authentication:** Securely register and log in to manage your portfolio.
- **Detailed Profiles:** Create comprehensive profiles with personal information, skills, education, projects, and experience.
- **Template Selection:** Choose from a variety of professionally designed templates to customize the look of your portfolio.
- **Responsive Design:** Your portfolio will look great on all devices (desktops, tablets, and phones).
- **Easy to Use:** The application is designed to be intuitive and easy to navigate, even for users with no coding experience.

## Future Enhancements

- **Drag-and-Drop Editor:** A visual editor for easier customization of portfolio content.
- **Custom Domain Support:** Ability to use your own domain name for your portfolio.
- **More Templates:** A wider selection of templates to cater to diverse needs and styles.
- **PDF Download:** Option to download your portfolio as a PDF document.

## Tech Stack

- **Frontend:** React, Redux, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js and npm:** Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).
- **PostgreSQL:** Install PostgreSQL and create a database for the application.

### Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/your-username/web-presence.git](https://github.com/your-username/web-presence.git)

   ```

2. **Install dependencies (frontend):**

   ```Bash
   cd web-presence/frontend
   npm install
   ```

3. **Install dependencies**

   ```Bash
   cd web-presence/backend
   npm install
   ```

4. **Create .env file in backend**
   ```Set the follwoing data
   DB_USER=
   DB_HOST=
   DB_DATABASE=
   DB_PASSWORD=
   DB_PORT=5
   JWT_SECRET=
   REFRESH_TOKEN_SECRET=
   ```  

5. Start the development servers:

   Frontend: ```npm run dev``` in the frontend directory.
   
   Backend: ```node server.js``` in the backend directory.

## Contributing

Contributions are welcome! Please feel free to submit pull requests.
Here are some ways you can contribute:

 - **Report bugs**
 - **Suggest new features**
 - **Improve documentation**
 - **Write code**
