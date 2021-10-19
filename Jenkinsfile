pipeline {
  agent any
  tools {nodejs "Node"}

  stages {

    stage('Build application') {
      steps {
        echo 'Building application'
        sh '''
        npm ci
        npm run build

        '''
        echo 'complete'
      }
    }

    stage('Test application') {
      steps {
        echo 'Testing application'
      }
    }

    stage('Build Docker image') {
      steps {
        echo 'Building Docker image'
        script {
          image = docker.build("masterziii/sca-project-frontend:${env.BUILD_NUMBER}")
        }
      }
    }
    stage('Push Docker image to DockerHub') {
      steps {
        echo 'Pushing Docker image to DockerHub'
        script {
          withCredentials([string(credentialsId: 'DockerHub', variable: 'DockerHub')]) {
            sh 'docker login -u masterziii -p $(DockerHub)'
          }
          image.push("${env.BUILD_NUMBER}")
        }
      }
    }
  }
}