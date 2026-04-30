const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Jenkins + K8s App</title></head>
      <body style="font-family:Arial; text-align:center; margin-top:100px;">
        <h1>🚀 Hello from Jenkins + Kubernetes!</h1>
        <p>CI/CD Pipeline is working successfully.</p>
        <p>Deployed via Jenkins → Docker → Kubernetes</p>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
