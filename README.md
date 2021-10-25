# Project: Deploy a Three-Tier application to The Cloud

## Introduction
This application is a face-detection app based off of the AI/ML [Clarifai API](https://www.clarifai.com/models/ai-face-detection). The application allows users to upload images of audiences in an event and record the audience count. 

## Application Architecture
![Application Architecture](/assets/images/app-str.png)

The parts of the application are as follows:
* Frontend - ReactJS, this repo
* API - NodeJS, found in this [repo](https://github.com/Z11mm/sca-project-c2-app-api)
* Database - PostgreSQL, found [here](https://github.com/Z11mm/sca-project-c2-app-api/tree/main/postgres)

## Available Scripts

In the project directory, you can run:

* `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) or the next available port to view it in the browser.
For containers, run `docker-compose -f docker-compose-dev.yml up --build` in development mode.
In production mode, run `docker-compose -f docker-compose-dev.yml build` to create production-ready image.

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
* VPC network
* Firewall rules
* Google Compute Engine VM instances
* Google Kubernetes Engine Cluster
* Cloud SQL Instance for Postgres
* Remote backend

Provision infrastructure in GCP using Terraform. 

Check out the infrastructure-as-code configuration  
for this project in this [repo](https://github.com/Z11mm/sca-project-c2-iac)

## Configuration Management with Ansible

![Configure Jenkins](/assets/images/jenkins-config.png)

Install Ansible in one of the two VM instances provisioned with Terraform. Then, install and configure Jenkins for this project using Ansible.

To install Ansible, follow these steps:
* Access the Ansible VM instance using ssh:
    - `gcloud compute ssh <ansible-server-name>`
* Generate SSH keys:
    - `ssh-keygen`
* Copy the public key:
    - `sudo cat ~/.ssh/id_rsa.pub`
* Access the Jenkins VM instance using ssh. 
* Paste the public key within `~/.ssh/authorized_keys` folder:
    - `sudo vi /home/<username>/.ssh/authorized_keys`
* Confirm connection between the two instances:
    - `ssh <jenkins-instance-ip-address>`
* Run the following commands to install Ansible:

    * Update Repository by including the official project’s PPA
     `sudo apt-get update`
     `sudo apt-add-repository -y ppa:ansible/ansible`
     `sudo apt-get update` to refresh the package manager

    * Install Ansible (and Python)
     `sudo apt-get install -y ansible`
     `sudo apt install python-pip -y`

    * Install Boto Framework
     `sudo pip install boto boto3`
     `sudo apt-get install python-boto -y`

    * Check that Ansible is installed
     `ansible --version`

    * Add the ip address of the Jenkins instance within Ansible's inventory file:
     `sudo vi /etc/ansible/hosts`
     Add this snippet within `/etc/ansible/hosts`:
        ```
        [jenkins-server]
        <external-ip-address> ansible_ssh_user=<username> ansible_ssh_private_key=path/to/private/key   ansible_python_interpreter=path/to/python

        ```

* Install and configure Jenkins
    - Create a directory within the Ansible instance named `playbooks`:  
        `mkdir playbooks`
    - Within the `playbooks` directory, create playbooks. Playbooks for this project can be found in this 
[repo](https://github.com/Z11mm/ansible-playbooks)
    - Run the playbooks, one at a time using this command:
        `sudo ansible-playbook <filename>`
    - Install Java first, followed by Jenkins, and then the others in any order.
    - Once complete, open `http://<ext-ip-address>:8080` in the browser and follow the prompts.
    - In the Jenkins web application, install the following plugins:
        - Node
        - Google Kubernetes Engine
        - Docker

## Continuous Integration (CI pipeline)  
A push to the repository triggers the CI/CD script in the Jenkinsfile. The CI portion of the script does the following:
* Runs `npm run build` to create a build folder.
* Builds a Docker image using the `docker-compose-prod.yml` file.
* Pushes the Docker image to DockerHub with a tag version corresponding to the build id.


## Continuous Deployment (CD pipeline)
A push to the repository triggers the CI/CD script in the Jenkinsfile. The CD portion of the script does the following:
* Pulls the Docker image from DockerHub.
* Replaces the `:latest` tag version within the deployment file with the updated build id.
* Deploys the application to Google Kubernetes Engine(GKE) using the Jenkins GKE plugin.