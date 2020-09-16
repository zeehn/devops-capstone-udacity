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


    stage('Deploying') {
      steps{
        echo 'Deploying...'
        withAWS(credentials: 'aws-static', region: 'ap-east-2') {
          sh "kubectl config use-context arn:aws:eks:us-east-2:725209754350:cluster/eks-cluster"
          sh "kubectl apply -f K8s"
          sh "kubectl get nodes"
          sh "kubectl get all -n my-namespace"   
        }
      }
    }
  }
}