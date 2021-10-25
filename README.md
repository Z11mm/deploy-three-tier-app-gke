# Project: Deploy a Three-Tier application to The Cloud

## Introduction
This application is a face-detection app based off of the AI/ML [Clarifai API](https://www.clarifai.com/models/ai-face-detection). The application allows users to upload images of audiences in an event and record the audience count. 

## Application Architecture
The parts of the application are as follows:
* Frontend - ReactJS
* API - [NodeJS](https://github.com/Z11mm/sca-project-c2-app-api)
* Database - [PostgreSQL](https://github.com/Z11mm/sca-project-c2-app-api/tree/main/postgres)

## Available Scripts

In the project directory, you can run:

* `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) or the next available port to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

* `npm run test`

Launches the test runner in the interactive watch mode.  

* `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

## Infrastructure Provisioning

![Provision infrastructure in GCP using Terraform](/assets/images/infra-provision.png)
Infrastructure for this project:
* Google Compute Engine VM instances
* Google Kubernetes Engine Cluster
* Cloud SQL Instance for Postgres

Provision infrastructure in GCP using Terraform. Check out the infrastructure-as-code configuration  
for this project in this [repo](https://github.com/Z11mm/sca-project-c2-iac)

## Continuous Integration (CI pipeline)  
The CI/CD pipeline is setup using Jenkins.  

A push to the repository triggers the CI/CD script in the Jenkinsfile. The CI portion of the script does the following:
* Runs `npm run build` to create a build folder.
* Builds a Docker image using the `docker-compose-prod.yml` file.
* Pushes the Docker image to DockerHub with a tag version corresponding to the build id.


## Continuous Deployment (CD pipeline)
A push to the repository triggers the CI/CD script in the Jenkinsfile. The CD portion of the script does the following:
* Pulls the Docker image from DockerHub.
* Replaces the `:latest` tag version within the deployment file with the updated build id
* Deploys the application to Google Kubernetes Engine(GKE) using the Jenkins GKE plugin.