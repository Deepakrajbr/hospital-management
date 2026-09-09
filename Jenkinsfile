pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24'
    }

    environment {
        DOCKER_USERNAME = 'deepakraj172004'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Deepakrajbr/hospital-management.git'
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    def changedFiles = sh(
                        script: "git diff --name-only HEAD~1 HEAD",
                        returnStdout: true
                    ).trim()

                    echo "Changed files:"
                    echo changedFiles

                    env.DOCTOR_CHANGED = 'false'
                    env.AUTH_CHANGED = 'false'
                    env.GATEWAY_CHANGED = 'false'
                    env.FRONTEND_CHANGED = 'false'

                    if (changedFiles.contains('services/doctor-service/')) {
                        env.DOCTOR_CHANGED = 'true'
                    }

                    if (changedFiles.contains('services/auth-service/')) {
                        env.AUTH_CHANGED = 'true'
                    }

                    if (changedFiles.contains('services/gateway/')) {
                        env.GATEWAY_CHANGED = 'true'
                    }

                    if (changedFiles.contains('frontend/')) {
                        env.FRONTEND_CHANGED = 'true'
                    }

                    echo "Doctor changed: ${env.DOCTOR_CHANGED}"
                    echo "Auth changed: ${env.AUTH_CHANGED}"
                    echo "Gateway changed: ${env.GATEWAY_CHANGED}"
                    echo "Frontend changed: ${env.FRONTEND_CHANGED}"
                }
            }
        }

        stage('Doctor CI/CD') {
            when {
                expression {
                    env.DOCTOR_CHANGED == 'true'
                }
            }

            stages {

                stage('Test Doctor') {
                    steps {
                        sh '''
                            cd services/doctor-service
                            npm ci
                            npm test
                        '''
                    }
                }

                stage('Build Doctor') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            docker build \
                                -t doctor-service:${IMAGE_TAG} \
                                services/doctor-service
                        '''
                    }
                }

                stage('Push Doctor') {
                    steps {
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'dockerhub-credentials',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASSWORD'
                            )
                        ]) {
                            sh '''
                                export IMAGE_TAG=$(git rev-parse --short HEAD)

                                echo "$DOCKER_PASSWORD" | docker login \
                                    -u "$DOCKER_USER" \
                                    --password-stdin

                                docker tag \
                                    doctor-service:${IMAGE_TAG} \
                                    ${DOCKER_USER}/doctor-service:${IMAGE_TAG}

                                docker push \
                                    ${DOCKER_USER}/doctor-service:${IMAGE_TAG}
                            '''
                        }
                    }
                }

                stage('Deploy Doctor') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            kubectl set image deployment/doctor-service \
                                doctor-service=${DOCKER_USERNAME}/doctor-service:${IMAGE_TAG}

                            kubectl rollout status deployment/doctor-service
                        '''
                    }
                }
            }
        }

        stage('Auth CI/CD') {
            when {
                expression {
                    env.AUTH_CHANGED == 'true'
                }
            }

            stages {

                stage('Install Auth Dependencies') {
                    steps {
                        sh '''
                            cd services/auth-service
                            npm ci
                        '''
                    }
                }

                stage('Build Auth') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            docker build \
                                -t auth-service:${IMAGE_TAG} \
                                services/auth-service
                        '''
                    }
                }

                stage('Push Auth') {
                    steps {
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'dockerhub-credentials',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASSWORD'
                            )
                        ]) {
                            sh '''
                                export IMAGE_TAG=$(git rev-parse --short HEAD)

                                echo "$DOCKER_PASSWORD" | docker login \
                                    -u "$DOCKER_USER" \
                                    --password-stdin

                                docker tag \
                                    auth-service:${IMAGE_TAG} \
                                    ${DOCKER_USER}/auth-service:${IMAGE_TAG}

                                docker push \
                                    ${DOCKER_USER}/auth-service:${IMAGE_TAG}
                            '''
                        }
                    }
                }

                stage('Deploy Auth') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            kubectl set image deployment/auth-service \
                                auth-service=${DOCKER_USERNAME}/auth-service:${IMAGE_TAG}

                            kubectl rollout status deployment/auth-service
                        '''
                    }
                }
            }
        }

        stage('Gateway CI/CD') {
            when {
                expression {
                    env.GATEWAY_CHANGED == 'true'
                }
            }

            stages {

                stage('Install Gateway Dependencies') {
                    steps {
                        sh '''
                            cd services/gateway
                            npm ci
                        '''
                    }
                }

                stage('Build Gateway') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            docker build \
                                -t gateway:${IMAGE_TAG} \
                                services/gateway
                        '''
                    }
                }

                stage('Push Gateway') {
                    steps {
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'dockerhub-credentials',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASSWORD'
                            )
                        ]) {
                            sh '''
                                export IMAGE_TAG=$(git rev-parse --short HEAD)

                                echo "$DOCKER_PASSWORD" | docker login \
                                    -u "$DOCKER_USER" \
                                    --password-stdin

                                docker tag \
                                    gateway:${IMAGE_TAG} \
                                    ${DOCKER_USER}/gateway:${IMAGE_TAG}

                                docker push \
                                    ${DOCKER_USER}/gateway:${IMAGE_TAG}
                            '''
                        }
                    }
                }

                stage('Deploy Gateway') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            kubectl set image deployment/gateway \
                                gateway=${DOCKER_USERNAME}/gateway:${IMAGE_TAG}

                            kubectl rollout status deployment/gateway
                        '''
                    }
                }
            }
        }

        stage('Frontend CI/CD') {
            when {
                expression {
                    env.FRONTEND_CHANGED == 'true'
                }
            }

            stages {

                stage('Build Frontend') {
                    steps {
                        sh '''
                            cd frontend
                            npm ci
                            npm run build
                        '''
                    }
                }

                stage('Build Frontend Docker Image') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            docker build \
                                -t frontend:${IMAGE_TAG} \
                                frontend
                        '''
                    }
                }

                stage('Push Frontend') {
                    steps {
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'dockerhub-credentials',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASSWORD'
                            )
                        ]) {
                            sh '''
                                export IMAGE_TAG=$(git rev-parse --short HEAD)

                                echo "$DOCKER_PASSWORD" | docker login \
                                    -u "$DOCKER_USER" \
                                    --password-stdin

                                docker tag \
                                    frontend:${IMAGE_TAG} \
                                    ${DOCKER_USER}/frontend:${IMAGE_TAG}

                                docker push \
                                    ${DOCKER_USER}/frontend:${IMAGE_TAG}
                            '''
                        }
                    }
                }

                stage('Deploy Frontend') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            kubectl set image deployment/frontend \
                                frontend=${DOCKER_USERNAME}/frontend:${IMAGE_TAG}

                            kubectl rollout status deployment/frontend
                        '''
                    }
                }
            }
        }
    }
}