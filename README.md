# Project: Deploy a Three-Tier application to The Cloud

## Introduction
This is my final project for the She Code Africa Cloud School(Cohort 2). <br>

This application is a face-detection app based off of the AI/ML [Clarifai API](https://www.clarifai.com/models/ai-face-detection). The application allows users to upload images of audiences in an event and record the audience count. 

## Application Architecture
![Application Architecture](/assets/images/app-str.png)

This application is a three-tier application, with the frontend and the backend split into two repositories:  
* The frontend is this current repository,  while
* The backend is in [this repository](https://github.com/Z11mm/sca-project-c2-app-api)

### Frontend architecture
The `/src` directory contains the React components and css styles for the project. `App.js` is the entrypoint for the application.<br>
Tachyons, react-components and css are used for styling.

## Deployment Architecture
![Deployment Architecture](/assets/images/deploy-str.png)

Deploy the frontend and api on the same GKE cluster while using GCP-managed Cloud SQL database service.

* Frontend deployment
    * The deployment file `react_deployment.yml` contains the Kubernetes objects required for this application. The API key is defined in the Secrets file. <br>

    * Deploy the React frontend with a Load Balancer service to make it accessible over the public internet.  

    * Configure Nginx as a reverse proxy to direct traffic to the API.

    * Enable Zero Downtime Deployment with a rolling update strategy in Kubernetes. <br>

* API deployment <br>

    * Create Secrets for database credentials and service accounts for IAM authentication to Cloud SQL. <br>

    * Deploy the API with a ClusterIP service which will ensure it is not accessible over the internet. <br>

    * The `service-acc-key.yml` file is the service account credentials required for the GKE cluster to access the Cloud SQL database. Deploy this file before `api_deployment.yml`<br>

    * The `api_deployment.yml` deployment file contains the Kubernetes objects- Secrets, Service and Deployment - required for this application for easy readability. The order of deployment is Secrets, Service and then Deployment. <br>   

    * Enable Zero Downtime Deployment with a rolling update strategy in Kubernetes. <br>


* Database deployment
    * Setup Postgres on Cloud SQL instance.
    * Use Cloud SQL Auth Proxy for secure access to Cloud SQL instance without the need for authorized networks or  
    or configuring SSL.
    * Setup Cloud SQL Auth Proxy as a 'sidecar', to run as a container within the pod running the API container. Mount service account secret as a volume on Cloud SQL Auth Proxy container.

## Available Scripts

In the project directory, you can run:

* `npm start` <br> to run the app in development mode. <br>
    Open [http://localhost:3000](http://localhost:3000) or the next available port to view it in the browser. <br>
    To use Docker containers, run `docker-compose -f docker-compose-dev.yml up` in development mode(add the `--build` flag when you run the command for the first time or you add new dependencies). <br>
    In production mode, run `docker-compose -f docker-compose-prod.yml build` to create production-ready image.

    The page will reload if you make edits.  
    You will also see any lint errors in the console.

* `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

## Infrastructure Provisioning

![Provision infrastructure in GCP using Terraform](/assets/images/infra-provision.png)
Provision infrastructure in GCP using Terraform. Infrastructure for this project includes:
* VPC network
* Firewall rules
* Google Compute Engine VM instances
* Google Kubernetes Engine Cluster
* Cloud SQL Instance for Postgres
* Remote backend

Check out the Terraform configuration for this project in this [repo](https://github.com/Z11mm/sca-project-c2-iac)

## Configuration Management with Ansible

![Configure Jenkins](/assets/images/jenkins-config.png)

Install Ansible in one of the two VM instances provisioned with Terraform. Then, install and configure Jenkins for this project using Ansible.

To install Ansible, follow these steps:
* Access the Ansible VM instance using ssh: <br>
    - `gcloud compute ssh <ansible-server-name>` <br>
* Generate SSH keys: <br>
    - `ssh-keygen` <br>
* Copy the public key: <br>
    - `sudo cat ~/.ssh/id_rsa.pub` <br>
* Access the Jenkins VM instance using ssh.  
* Paste the public key within `~/.ssh/authorized_keys` folder: <br>
    - `sudo vi /home/<username>/.ssh/authorized_keys` <br>
* Confirm connection between the two instances: <br>
    - `ssh <jenkins-instance-ip-address>` <br>
* Run the following commands to install Ansible:

    * Update Repository by including the official project’s PPA <br>
     `sudo apt-get update` <br>
     `sudo apt-add-repository -y ppa:ansible/ansible` <br>
     `sudo apt-get update` to refresh the package manager <br>

    * Install Ansible (and Python) <br>
     `sudo apt-get install -y ansible` <br>
     `sudo apt install python-pip -y` <br>

    * Install Boto Framework <br>
     `sudo pip install boto boto3` <br>
     `sudo apt-get install python-boto -y` <br>

    * Check that Ansible is installed <br>
     `ansible --version` <br>

    * Add the ip address of the Jenkins instance within Ansible's inventory file: <br>
     `sudo vi /etc/ansible/hosts` <br>
     Add this snippet within `/etc/ansible/hosts`: <br>
        ```
        [jenkins-server]
        <external-ip-address> ansible_ssh_user=<username> ansible_ssh_private_key=path/to/private/key   ansible_python_interpreter=path/to/python

        ```

* Install and configure Jenkins
    - Create a directory within the Ansible instance named `playbooks`:  <br>
        `mkdir playbooks` <br>
    - Within the `playbooks` directory, create playbooks. Playbooks for this project can be found in this 
[repo](https://github.com/Z11mm/ansible-playbooks)
    - Run the playbooks, one at a time using this command: <br>
        `sudo ansible-playbook <filename>`
    - Install Java first, followed by Jenkins, and then the others in any order.
    - Once complete, open `http://<ext-ip-address>:8080` in the browser and follow the prompts.
    - In the Jenkins web application, install the following plugins:
        - Node
        - Google Kubernetes Engine
        - Docker
        - Slack Notifications
## Continuous Integration (CI pipeline)  
A push to the repository triggers the CI/CD script in the Jenkinsfile. The CI portion of the script does the following:
* Runs `npm run build` to create a build folder.
* Builds a Docker image using the `docker-compose-prod.yml` file.
* Pushes the Docker image to DockerHub with a tag version corresponding to the build id.
* Sends Slack notifications when build starts and if build is successful or build fails.


## Continuous Deployment (CD pipeline)
The CD portion of the script does the following:
* Pulls the Docker image from DockerHub.
* Replaces the `:latest` tag version within the deployment file with the updated build id.
* Deploys the application to Google Kubernetes Engine(GKE) using the Jenkins GKE plugin.
* Sends Slack notifications when build starts and if build is successful or build fails.

## Monitoring

Monitor the application running in GKE through the built-in Cloud Operations for GKE which has Cloud Monitoring and Logging by default. <br>

* Set up a Monitoring Dashboard for GKE

![Monitoring Dashboard for GKE](/assets/images/gke-dashboard.png)

* Set up an alerting policy to get notifications, with Slack as the notification channel

![Alerting policy](/assets/images/alerting-policy.png)
![Alerting policy](/assets/images/IMG_0172.PNG)