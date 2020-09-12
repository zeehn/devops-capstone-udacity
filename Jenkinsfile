pipeline {
  environment {
    dockerHub = 'zackondocker'
    imageName = 'capstone-project'
  }

  agent any

  stages {
    stage('Linting Dockerfile'){
      steps {
        sh 'echo Linting Dockerfile...' 
        sh '''docker run --rm -i hadolint/hadolint < ./Dockerfile'''
      }
    }

    stage('Scanning for Security') {
      steps { 
        aquaMicroscanner imageName: 'node:12', notCompliesCmd: 'exit 1', onDisallowed: 'fail'
      }
    }

    stage('Building Docker Image') {
      steps {
        sh 'docker build -t ${imageName} .'
      }
    }
    
    stage('Pushing to DockerHub') {
      steps {
        withDockerRegistry([url: "", credentialsId: "dockers-creds"]) {
          sh 'docker tag ${imageName} ${dockerHub}/${imageName}'
          sh 'docker push ${dockerHub}/${imageName}'
        }
      }
    }


  }
}