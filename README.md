# CI/CD Pipeline: Jenkins → Docker → Kubernetes

## 📁 Project Structure
```
jenkins-k8s-cicd/
├── app.js              ← Node.js Application
├── package.json        ← Node dependencies
├── Dockerfile          ← Docker image build instructions
├── Jenkinsfile         ← CI/CD pipeline stages
├── .gitignore
└── k8s/
    ├── deployment.yaml ← Kubernetes Deployment
    └── service.yaml    ← Kubernetes Service (NodePort)
```

---

## ⚡ QUICK START — Commands in Order

### STEP 1: Open in VS Code
```bash
cd jenkins-k8s-cicd
code .
```

### STEP 2: Install Node dependencies (to test locally)
```bash
npm install
node app.js
# Open http://localhost:3000 in browser
```

### STEP 3: Build & Test Docker locally
```bash
# Build image
docker build -t myapp:latest .

# Run container
docker run -p 3000:3000 myapp:latest

# Open http://localhost:3000 in browser
# Press Ctrl+C to stop
```

### STEP 4: Push to DockerHub
```bash
# Login to DockerHub
docker login

# Tag image (replace YOUR_USERNAME)
docker tag myapp:latest YOUR_USERNAME/myapp:latest

# Push image
docker push YOUR_USERNAME/myapp:latest
```

### STEP 5: Push code to GitHub
```bash
git init
git add .
git commit -m "Initial commit - CI/CD App"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### STEP 6: Start Minikube (Kubernetes)
```bash
minikube start
kubectl get nodes
```

### STEP 7: Deploy manually to Kubernetes (to test before Jenkins)
```bash
# Update image name in k8s/deployment.yaml first!
# Replace YOUR_DOCKERHUB_USERNAME with your actual username

kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Check status
kubectl get pods
kubectl get svc

# Access the app
minikube service myapp-service --url
```

### STEP 8: Setup Jenkins Pipeline
1. Install Jenkins locally or use Docker:
   ```bash
   docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
   ```
2. Open http://localhost:8080
3. Install plugins: Docker Pipeline, Kubernetes CLI, Git, Pipeline
4. Add credentials:
   - DockerHub: Manage Jenkins → Credentials → Username+Password → ID: dockerhub-credentials
   - Kubeconfig: Manage Jenkins → Credentials → Secret File → upload ~/.kube/config → ID: kubeconfig
5. New Item → Pipeline → Pipeline from SCM → Git → your repo URL
6. Build Now!

---

## 🔧 Files to Edit Before Running

| File | What to change |
|------|---------------|
| `Jenkinsfile` | Replace `YOUR_USERNAME` and `YOUR_REPO` |
| `Jenkinsfile` | Replace `YOUR_DOCKERHUB_USERNAME` |
| `k8s/deployment.yaml` | Replace `YOUR_DOCKERHUB_USERNAME` |

---

## ✅ Verify Everything Works
```bash
kubectl get pods          # Should show 2 pods Running
kubectl get svc           # Should show myapp-service
kubectl get deployments   # Should show myapp-deployment
minikube service myapp-service --url  # Get the URL
```
