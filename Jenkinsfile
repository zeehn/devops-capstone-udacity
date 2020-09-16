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
        sh 'trivy image node:12'
       
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

    stage('Creating Cluster') {
      steps {
        withAWS(credentials: 'aws-creds', region: 'us-east-2') {
          sh 'eksctl create cluster --name capstone-project-cluster --version 1.17 --nodegroup-name linux-workers --node-type t2.medium --nodes 3 --nodes-min 1 --nodes-max 4 --node-ami auto --region us-east-2'
          sh 'aws eks --region=us-east-2 update-kubeconfig --name capstone-project'
          sh 'kubectl apply -f Deployment/app-deploy.yml'
        }
      }
    }

    stage("Cleaning up") {
      steps{
        echo 'Cleaning up...'
        sh "docker system prune"
      }
    }
  }
}