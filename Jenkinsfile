pipeline {
  agent any
  tools {nodejs "Node"}

  stages {

    stage('Build') {
      steps {
        echo 'Building application'
        sh '''
        npm ci
        npm run build

        '''
        echo 'complete'
      }
    }
  }
}