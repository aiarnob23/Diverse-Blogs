# Blog Website

A modern, responsive blog website built with React.js. This platform allows users to view blog posts, dynamically load content, and interact with blog posts seamlessly. The website is designed to be fast, responsive, and user-friendly.

## Features

- **Responsive Design**: Automatically adjusts to mobile, tablet, and desktop screens.
- **Dynamic Blog Fetching**: Uses React's `useEffect` hook to fetch blog details from an external service.
- **Loading States**: Displays a skeleton loader or spinner while the content is loading to prevent layout shifts.
- **Error Handling**: Graceful error handling if blog details cannot be fetched.
- **Modern UI**: A simple, clean, and modern user interface designed to improve the reading experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Technologies Used](#technologies-used)

## Installation

Follow the steps below to set up this project locally.

1. Clone the repository:
   ```bash
   git clone https://github.com/aiarnob23/Diverse-Blogs.git
2. Navigate to the project directory:
   cd blog-website
3.Install the necessary dependencies:
   npm install
3.Set up your .env file
4.Start the development server:
   npm start
5.Open your browser and go to http://localhost:5173 to view the 
  application.

## Usage
The home page displays a list of blog posts.

Clicking on a blog title will take you to a detailed view of that specific blog.

The detailed view fetches blog content dynamically, displaying it with a modern UI.

While the blog content is loading, a skeleton loader or spinner will be displayed to avoid any layout shifting.

If an error occurs while fetching blog details, an error message will be shown.

## Development
To start developing locally, follow these steps:

Install dependencies as shown above.

Run the app in development mode:
npm run dev
You can make changes to the React components and see live updates.

For linting and formatting, the app uses ESLint and Prettier, which will automatically check your code.

## Technologies Used

- **React.js**
- **React Router**
- **Tailwind CSS**
- **CSS**
- **Firebase**
- **MongoDB**
- **JWT Token**
- **Express.js**
- **Node.js**
- **Mongoose**
- etc.

Developed with ❤️ by Your Aminul Islam Arnob