pipeline {
  agent any
  tools {nodejs "Node"}

  environment {
    PROJECT_ID = "sca-cloud-school-c2"
    CLUSTER_NAME = "sca-project-cluster"
    LOCATION = "us-central1-f"
    CREDENTIALS_ID = "kubernetes"
  }

  stages {

    stage('Start build notification') {
      steps {
        // send build started notifications
        slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      }
    }

    stage('Build Docker image') {
      steps {
        echo 'Building image'
        sh '''
        docker-compose -f docker-compose-prod.yml build
        docker image ls
        '''
        echo 'complete'
      }
    }

    stage('Test application') {
      steps {
        echo 'Testing application'
      }
    }

    stage('Push Docker image to DockerHub') {
      steps {
        echo 'Pushing Docker image to DockerHub'
        script {
          withCredentials([string(credentialsId: 'DockerHub', variable: 'DockerHub')]) {
            sh '''
            docker login -u masterziii -p ${DockerHub}
            docker image push masterziii/sca-project-frontend:latest
            '''
          }
        }
      }
    }
    stage('Deploy to GKE') {
      steps {
        echo 'Deploying to GKE'
        sh 'ls -ltr'
        // sh "sed -i 's/masterziii/sca-project-frontend:latest/masterziii/sca-project-frontend:${env.BUILD_ID}/g' react_deployment.yml"
        step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'react_deployment.yml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
      
      }
    }
  }
  post {
    success {
      slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }

    failure {
      slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
  }
}
