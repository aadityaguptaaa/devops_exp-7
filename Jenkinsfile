pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "aadityaxggg/myapp"
        DOCKER_TAG   = "latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/aadityaguptaaa/devops_exp-7.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo '📤 Pushing image to DockerHub...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        dockerImage.push()
                        dockerImage.push("build-${env.BUILD_NUMBER}")
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
    steps {
        echo '☸️ Deploying to Kubernetes...'
        sh 'kubectl --kubeconfig=/var/jenkins_home/kubeconfig apply -f k8s/deployment.yaml'
        sh 'kubectl --kubeconfig=/var/jenkins_home/kubeconfig apply -f k8s/service.yaml'
        sh 'kubectl --kubeconfig=/var/jenkins_home/kubeconfig rollout status deployment/myapp-deployment --timeout=60s'
    }
}

        stage('Verify Deployment') {
            steps {
                echo '✅ Verifying deployment...'
                sh 'kubectl --kubeconfig=/var/jenkins_home/kubeconfig get pods -l app=myapp'
                sh 'kubectl --kubeconfig=/var/jenkins_home/kubeconfig get svc myapp-service'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully! App is live on Kubernetes.'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
        }
        always {
            echo '🧹 Cleaning up local Docker images...'
            sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
        }
    }
}
