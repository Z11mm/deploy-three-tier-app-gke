pipeline {
    agent any

    tools {nodejs "node"}

    stages {
        stage('Build) {
            echo 'Create a build for React app'
            sh '''
            #!/bin/bash
            rm -rf *.tar.gz
            npm install
            npm run build
            tar czf react-build.tar.gz /build
            '''
            echo 'Build complete'
        }
    }
}