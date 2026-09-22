pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24'
    }

    environment {
        DOCKER_USERNAME = 'deepakraj172004'
        HELM_VALUES = 'helm/hospital/values.yaml'
    }

    stages {

        // ============================================================
        // CHECKOUT
        // ============================================================

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Deepakrajbr/hospital-management.git'
            }
        }


        // ============================================================
        // CHECK FOR JENKINS HELM COMMIT
        // ============================================================

        stage('Check Commit') {
            steps {
                script {

                    def commitMessage = sh(
                        script: "git log -1 --pretty=%B",
                        returnStdout: true
                    ).trim()

                    echo "Latest commit:"
                    echo commitMessage

                    if (commitMessage.contains('[skip ci]')) {
                        echo "Jenkins generated commit detected."
                        echo "Skipping CI/CD pipeline."
                        currentBuild.result = 'NOT_BUILT'
                        return
                    }
                }
            }
        }


        // ============================================================
        // DETECT CHANGES
        // ============================================================

        stage('Detect Changes') {
            steps {
                script {

                    def changedFiles = sh(
                        script: "git diff --name-only HEAD~2 HEAD",
                        returnStdout: true
                    ).trim()

                    echo "========================================"
                    echo "Changed files:"
                    echo changedFiles
                    echo "========================================"

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

                    echo "Doctor   : ${env.DOCTOR_CHANGED}"
                    echo "Auth     : ${env.AUTH_CHANGED}"
                    echo "Gateway  : ${env.GATEWAY_CHANGED}"
                    echo "Frontend : ${env.FRONTEND_CHANGED}"
                }
            }
        }


        // ============================================================
        // DOCTOR
        // ============================================================

        stage('Doctor CI/CD') {

            when {
                expression {
                    env.DOCTOR_CHANGED == 'true'
                }
            }

            stages {

                stage('Doctor Dependencies') {
                    steps {
                        sh '''
                            cd services/doctor-service
                            npm ci
                        '''
                    }
                }


                stage('Doctor Build') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            docker build \
                                -t ${DOCKER_USERNAME}/doctor-service:${IMAGE_TAG} \
                                services/doctor-service
                        '''
                    }
                }

                stage('Doctor Push') {
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

                                docker push \
                                    ${DOCKER_USERNAME}/doctor-service:${IMAGE_TAG}
                            '''
                        }
                    }
                }
            }
        }


        // ============================================================
        // AUTH
        // ============================================================

        stage('Auth CI/CD') {

            when {
                expression {
                    env.AUTH_CHANGED == 'true'
                }
            }

            stages {

                stage('Auth Dependencies') {
                    steps {
                        sh '''
                            cd services/auth-service
                            npm ci
                        '''
                    }
                }

                stage('Auth Build') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            docker build \
                                -t ${DOCKER_USERNAME}/auth-service:${IMAGE_TAG} \
                                services/auth-service
                        '''
                    }
                }

                stage('Auth Push') {
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

                                docker push \
                                    ${DOCKER_USERNAME}/auth-service:${IMAGE_TAG}
                            '''
                        }
                    }
                }
            }
        }


        // ============================================================
        // GATEWAY
        // ============================================================

        stage('Gateway CI/CD') {

            when {
                expression {
                    env.GATEWAY_CHANGED == 'true'
                }
            }

            stages {

                stage('Gateway Dependencies') {
                    steps {
                        sh '''
                            cd services/gateway
                            npm ci
                        '''
                    }
                }

                stage('Gateway Build') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            docker build \
                                -t ${DOCKER_USERNAME}/gateway:${IMAGE_TAG} \
                                services/gateway
                        '''
                    }
                }

                stage('Gateway Push') {
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

                                docker push \
                                    ${DOCKER_USERNAME}/gateway:${IMAGE_TAG}
                            '''
                        }
                    }
                }
            }
        }


        // ============================================================
        // FRONTEND
        // ============================================================

        stage('Frontend CI/CD') {

            when {
                expression {
                    env.FRONTEND_CHANGED == 'true'
                }
            }

            stages {

                stage('Frontend Dependencies') {
                    steps {
                        sh '''
                            cd frontend
                            npm ci
                        '''
                    }
                }

                stage('Frontend Build') {
                    steps {
                        sh '''
                            cd frontend
                            npm run build
                        '''
                    }
                }

                stage('Frontend Docker Build') {
                    steps {
                        sh '''
                            export IMAGE_TAG=$(git rev-parse --short HEAD)

                            docker build \
                                -t ${DOCKER_USERNAME}/frontend:${IMAGE_TAG} \
                                frontend
                        '''
                    }
                }

                stage('Frontend Push') {
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

                                docker push \
                                    ${DOCKER_USERNAME}/frontend:${IMAGE_TAG}
                            '''
                        }
                    }
                }
            }
        }


        // ============================================================
        // UPDATE HELM
        // ============================================================

        stage('Update Helm Images') {
    steps {
        script {

            def imageTag = sh(
                script: "git rev-parse --short HEAD",
                returnStdout: true
            ).trim()

            echo "Using image tag: ${imageTag}"

            if (env.DOCTOR_CHANGED == 'true') {
                sh """
                    sed -i "s|deepakraj172004/doctor-service:.*|deepakraj172004/doctor-service:${imageTag}|" ${HELM_VALUES}
                """
                echo "Doctor Helm image updated."
            }

            if (env.AUTH_CHANGED == 'true') {
                sh """
                    sed -i "s|deepakraj172004/auth-service:.*|deepakraj172004/auth-service:${imageTag}|" ${HELM_VALUES}
                """
                echo "Auth Helm image updated."
            }

            if (env.GATEWAY_CHANGED == 'true') {
                sh """
                    sed -i "s|deepakraj172004/gateway:.*|deepakraj172004/gateway:${imageTag}|" ${HELM_VALUES}
                """
                echo "Gateway Helm image updated."
            }

            if (env.FRONTEND_CHANGED == 'true') {
                sh """
                    sed -i "s|deepakraj172004/frontend:.*|deepakraj172004/frontend:${imageTag}|" ${HELM_VALUES}
                """
                echo "Frontend Helm image updated."
            }
        }
    }
}

        // ============================================================
        // SHOW HELM CHANGES
        // ============================================================

        stage('Verify Helm Changes') {

            steps {

                sh '''
                    echo "========================================"
                    echo "Updated Helm values:"
                    echo "========================================"

                    cat helm/hospital/values.yaml

                    echo "========================================"
                    echo "Git diff:"
                    echo "========================================"

                    git diff -- helm/hospital/values.yaml
                '''
            }
        }


        // ============================================================
        // COMMIT HELM CHANGE
        // ============================================================

        stage('Commit Helm Changes') {

            steps {

                sh '''
                    git config user.name "Jenkins"
                    git config user.email "jenkins@hospital-management.local"

                    git add helm/hospital/values.yaml

                    if git diff --cached --quiet; then
                        echo "No Helm changes detected."
                    else
                        git commit -m "Update Helm image tags [skip ci]"
                    fi
                '''
            }
        }


        // ============================================================
        // PUSH HELM CHANGE
        // ============================================================

        stage('Push Helm Changes') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-credentials',
                        usernameVariable: 'GITHUB_USER',
                        passwordVariable: 'GITHUB_TOKEN'
                    )
                ]) {

                    sh '''
                        if git log -1 --pretty=%B | grep -q "\\[skip ci\\]"; then

                            git push \
                                https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/Deepakrajbr/hospital-management.git \
                                HEAD:main

                        else

                            echo "No Jenkins Helm commit to push."

                        fi
                    '''
                }
            }
        }


        // ============================================================
        // ARGO CD
        // ============================================================

        stage('Argo CD') {

            steps {

                echo '''
                ========================================
                CI completed.

                Docker images pushed to Docker Hub.
                Helm image tags updated in Git.

                Argo CD will detect the Git change
                and deploy the new images to Kubernetes.
                ========================================
                '''
            }
        }
    }


    // ================================================================
    // POST
    // ================================================================

    post {

        success {
            echo '''
            ========================================
            PIPELINE SUCCESS
            ========================================

            GitHub
               ↓
            Jenkins
               ↓
            Docker Hub
               ↓
            Helm Git Update
               ↓
            Argo CD
               ↓
            Kubernetes
            '''
        }

        failure {
            echo '''
            ========================================
            PIPELINE FAILED
            ========================================

            Check the failed stage above.
            '''
        }
    }
}