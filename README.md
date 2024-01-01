<p align="center">
  <h1 align="center">Dropout Analysis for School Education</h1>
</p>

## Table Of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

## About the Project

The Dropout Analysis and Intervention System is a comprehensive solution aimed at addressing the high dropout rates in schools, with a particular focus on mitigating the impact of poverty and various socio-economic factors. The project provides a strategic framework for governments to formulate targeted policies by analyzing dropout data across different categories.

## Glimps of our Project
![Dashboard](https://github.com/devamdoshi212/DropoutAnalysis/assets/114012274/a0038a82-7f62-42a4-97ca-e59155ddc6af)
![Gujarat Map](https://github.com/devamdoshi212/DropoutAnalysis/assets/114012274/14691566-883e-4b26-b501-e9da6f61046a)
![Analysis](https://github.com/devamdoshi212/DropoutAnalysis/assets/114012274/f347040d-d97b-40a1-88a5-e464d9c3e5dc)

## Built With

- Frontend: [React](https://reactjs.org/)
- Backend:
  - [Node.js](https://nodejs.org/) for general backend functionality
  - [Flask](https://flask.palletsprojects.com/) for ML backend

## Machine Learning Models

- [K-Nearest Neighbors (KNN)](https://scikit-learn.org/stable/modules/neighbors.html#k-neighbors-classifiers)
- [Random Forest](https://scikit-learn.org/stable/modules/ensemble.html#random-forests)

## Getting Started

### Prerequisites

#### General:

1. **Git:**
   - Make sure Git is installed on your system. You can download it from [here](https://git-scm.com/).

2. **Node.js and npm:**
   - Install Node.js and npm from [https://nodejs.org/](https://nodejs.org/).

3. **Python:**
   - Install Python from [https://www.python.org/](https://www.python.org/).

#### Frontend:

1. **React:**
   - Ensure you have a basic understanding of React.
   - Documentation: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)

2. **npm Packages:**
   - Navigate to the `frontend` directory and install dependencies using `npm install`.

#### Backend:

1. **Flask:**
   - Install Flask using `pip install Flask`.

2. **Machine Learning Libraries:**
   - Install scikit-learn using `pip install scikit-learn`.

3. **Other Backend Dependencies:**
   - Navigate to the `backend` directory and install dependencies using `pip install -r requirements.txt`.

#### Database (if applicable):

1. **Database System:**
   - Ensure the necessary database system MongoDB or is installed.

2. **Database Connection Configuration:**
   - Provide configuration details for connecting the backend with the database in your backend code.

#### Environment Variables:

1. **Set Up Environment Variables:**
   - If your project uses sensitive information (e.g., API keys, database credentials), make sure you set up environment variables for security. You can use tools like `dotenv` for this purpose.


### Installation
1. **Clone the Repository:**

    ```bash
    git clone https://github.com/UdayGohel/DropoutAnalysis.git
    ```

2. **Navigate to Project Directory:**

    ```bash
    cd DropoutAnalysis
    ```

3. **Install Dependencies for Back-end:**

    ```bash
    npm install
    ```

4. **Run the Application for Back-end (Express or Node.js server):**

    ```bash
    npm start
    ```

5. **Navigate to Flask Project Directory:**

    ```bash
    cd ML2  # Replace with the actual directory containing your Flask app
    ```

6. **Install Dependencies for Flask:**

    ```bash
    pip install -r requirements.txt
    ```

   If you don't have a `requirements.txt` file, make sure Flask is installed:

    ```bash
    pip install Flask
    ```

7. **Run the Flask Application:**

    ```bash
    python server.py
    ```

   Replace `app.py` with the actual name of your Flask application file.

8. **Navigate to React Project Directory:**

    ```bash
    cd client-web
    ```

9. **Install Dependencies for React JS:**

    ```bash
    npm install
    ```

10. **Run the Application for Front-end:**

    ```bash
    npm start
    ```

## Usage

### Policy Precision:

- Governments can make informed policy decisions based on clear visualizations and analyses.
### Resource Optimization:

- Efficiently allocate resources to schools and areas with the highest dropout rates.
### Reduced Dropout Rates:

- Targeted interventions will contribute to a significant reduction in dropout rates.
### Social Inclusion:

- Address gender, caste, and age-related disparities for a more inclusive education system.
### Data-Driven Decision-Making:

- Encourage evidence-based decision-making for sustainable improvements.

## Features

#### Robust Feature Set:

The system offers a comprehensive and powerful array of features.
#### Visualization Tools:

Utilizes various charts (bar, line, pie) for effective data visualization.
Enables easy comparison and tracking of dropout rates across different categories.
Predictive Analytics:

Integrates machine learning models for predicting potential dropout cases.
Features an early warning system with alerts for timely intervention and support.
#### Map Integration:

Includes an interactive map overlay for Gujarat districts.
Utilizes regional heatmaps to identify high-risk areas for targeted interventions.

### Contributors

- [_Devam Doshi_](https://github.com/devamdoshi212)
- [_Uday Gohel_](https://github.com/UdayGohel)
- [_Dhruv Shah_](https://github.com/dhruvsharma1999)
- [_Harekrushna Tejani_](https://github.com/harekrushn13)
- [_Harsh Nirmal_](https://github.com/HarshN187)
- [_Isha Sanghani_](https://github.com/Ishasanghani)


### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

We appreciate your contributions and look forward to working with you!

