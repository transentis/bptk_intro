# Introduction to the Business Prototyping Toolkit

The Business Prototyping Toolkit (BPTK) is a computational modeling framework that enables you to build simulation models using System Dynamics (SD) and/or agent-based modeling (ABM) and manage simulation scenarios with ease.

The framework is used to build models of markets, business models, organisations and entire business ecosystems. It can be used to build small, explorative models (as illustrated here) as well as large models with hundreds of thousands of equations.

The guiding principle of the framework is to let the modeler concentrate on building simulation models by providing a seamless interface for managing model settings and scenarios and for plotting simulation results. It takes a "minimalistic" approach and just provides the necessary modeling and simulation functionality. It standard open source packages for everything else, in particular it relies on environments such as Jupyter to provide plotting and interactive dashboards.

-   All plotting is done using Matplotlib.
-   Simulation results are returned as Pandas dataframes.
-   Numerics via NumPy and SciPy.

Model settings and scenarios are kept in JSON files. These settings are automatically loaded by the framework upon initialization, as are the model classes themselves. This makes interactive modeling, coding and testing very painless, especially if using the Jupyter notebook environment.

This repository contains an introductory [Jupyter Notebook](intro_to_bptk.ipynb) that illustrates how to model the dynamics of customer acquisition model using four different approaches:

-   System Dynamics (using SD DSL)
-   Agent-based Modeling (ABM)
-   Hybrid SD DSL/ABM model
-   System Dynamics (using XMILE)

## Installing

1. Open your command line in an appropriate folder and clone this repository: `git clone http://github.com/transentis/bptk_intro.git`
2. CD into the directory: `cd bptk_intro`
3. Set up a virtual environment: `python3 -m venv venv`
4. Activate the enviroment: `source venv\bin\activate`
5. Install the required packages: `pip install -r requirements.txt`
6. Start jupyter: `jupyter lab``
7. Open the notebook [intro_to_bptk.ipynb](intro_to_bptk.ipynb) in Jupyter.

## REST API Server for Customer Acquisition Model

Th directory [rest-api](./rest-api) contains a simple REST API server for the Customer Acquisition Simulation built using BPTK and Flask. The application runs standalone and does not depend on any other files outside of this directory.

Follow these steps to run the server locally

1. Open a new terminal in Juptyer lab (or from your local terminal)
2. change into the rest-api directory: `cd rest-api`
3. Make the run_server.sh script exectuable: `chmod +x run_server.sh`
4. Start the server via `./run_server.sh`
5. You can check the server is running by point your browser at [localhost:5000](http://localhost:5000) which should return the page “BPTK-Py REST API Server”
6. Test queries using the [api-usage notebook](./rest-api/api_usage.ipynb)

## Frontend for Customer Acquisition Model

The directory [frontend](./frontend) contains a simple react app for the Customer Acquisition Simulation. It uses the local API from the [rest-api](./rest-api) folder in this project. The application runs standalone and does not depend on any other files outside of this directory.

Follow these steps to run the frontend locally

1. Follow the steps from "REST API Server for Customer Acquisition Model" to run the api locally
2. Open a terminal (it is best to do this outside of jupyter and outside of any python venv) 
3. change into the frontend directory: `cd frontend`
4. Install needed npm packages: `yarn install`
5. Start the app via `yarn start-local`
6. If both the api and this website are launched correctly, you can view the website at [localhost:3000](http://localhost:3000)

## Further Reading

You can find extensive [documentation](https://bptk.transentis.com) online and advanced tutorials and examples on [GitHub](https://github.com/transentis/).

You can also find more advanced examples on GitHub:

-   [COVID Simulation](https://github.com/transentis/sim-covid-19). Jupyter notebooks and dashboards illustrating the SIR model.
-   [COVID Simulation Dashboard](https://github.com/transentis/sim-covid-dashboard). A web-based simulation dashboard for the COVID simulation built using our BPTK Widgets library for Javascript. View a [live version](http://www.covid-sim.com) of the dashboard online.
-   [Beer Distribution Game](https://github.com/transentis/beergame). In-depth analysis of the beergame using both System Dynamics and Agent-based simulation. Includes an illustration of how to use BPTK in conjunction with reinforcement learning to train agents to play the beergame autonomously.
