pipeline {
  agent any
  tools {nodejs "node"}

  stages {

    stage('Checkout SCM') {
      steps {
        echo 'Checking out git repo'
        // scm: [$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'e63ec2f4-548b-4ef0-83b4-cd5dd3ba952f', url: 'git@github.com:Z11mm/sca-project-c2-app.git']]]
      }
    }

    stage('Build') {
      steps {
        echo 'Building application'
        // sh '''
        // #!/bin/bash
        // rm -rf *.tar.gz
        // npm install
        // npm run build
        // tar czf react-build.tar.gz /build
        // '''
        echo 'Build complete'
      }
    }
  }
}