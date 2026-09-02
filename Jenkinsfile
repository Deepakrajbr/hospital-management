pipeline {
    agent any
    tools {
    nodejs 'NodeJS-22'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Deepakrajbr/hospital-management.git'
            }
        }

        stage('Get Git Commit') {
            steps {
                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Git Commit: ${env.IMAGE_TAG}"
                }
            }
        }
        
        stage('Test Doctor Service') {
            steps {
            sh '''
            cd services/doctor-service
            npm ci
            npm test
            '''
                
            }
            
        }

        stage('Build Doctor Image') {
            steps {
                sh '''
                    docker build \
                        -t doctor-service:${IMAGE_TAG} \
                        services/doctor-service
                '''
            }
        }

        stage('Push Doctor Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | \
                        docker login \
                        -u "$DOCKER_USERNAME" \
                        --password-stdin

                        docker tag \
                            doctor-service:${IMAGE_TAG} \
                            ${DOCKER_USERNAME}/doctor-service:${IMAGE_TAG}

                        docker push \
                            ${DOCKER_USERNAME}/doctor-service:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Verify Deployment') {
    steps {
        sh '''
            kubectl get pods -l app=doctor-service

            kubectl get deployment doctor-service \
                -o jsonpath='{.spec.template.spec.containers[*].image}'

            echo ""

            kubectl rollout status deployment/doctor-service

            kubectl get pods -l app=doctor-service \
                -o wide
        '''
    }
}
    }
}