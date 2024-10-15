# eKebele

eKebele is a digital platform designed to streamline and manage administrative tasks for local government offices in Ethiopia. This README provides detailed instructions on how to install and set up eKebele locally.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 20.12 or higher)
- npm (version 10.9 or higher)
- Git

## Installation

Follow these steps to install eKebele locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/wubeshetA/eKebele.git
    cd eKebele
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

Before running the application, you need to create a `.env` file in the root directory of the project. Copy the content from `.env.example` and modify it according to your environment.

1. **Create a `.env` file:**
    ```bash
    cp .env.example .env
    ```

2. **Modify the `.env` file:**
    Open the `.env` file and update the environment variables as needed.

## Running the Application

3. **Start the development server:**
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:5173/`.

## Contributing

To contribute to eKebele, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Create a pull request.

## Technologies Used

The frontend of eKebele is built using the following technologies:
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router**: A library for routing in React applications.

## Author

[Wubeshet Yimam](https:linkein.com/in/wubeshet)