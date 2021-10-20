pipeline {
  agent any
  tools {nodejs "Node"}

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
        docker-compose --version
        docker-compose -f docker-compose-prod.yml -t "masterziii/sca-project-frontend:${env.BUILD_NUMBER}" build
        '''
        echo 'complete'
      }
    }

    stage('Test application') {
      steps {
        echo 'Testing application'
      }
    }

    // stage('Build Docker image') {
    //   steps {
    //     echo 'Building Docker image'
    //     script {
    //       image = docker.build("masterziii/sca-project-frontend:${env.BUILD_NUMBER}")
    //     }
    //   }
    // }
    // stage('Push Docker image to DockerHub') {
    //   steps {
    //     echo 'Pushing Docker image to DockerHub'
    //     script {
    //       withCredentials([string(credentialsId: 'DockerHub', variable: 'DockerHub')]) {
    //         sh 'docker login -u masterziii -p ${DockerHub}'
    //       }
    //       image.push("${env.BUILD_NUMBER}")
    //     }
    //   }
    // }
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
