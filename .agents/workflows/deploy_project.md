---
description: Deploy the project to Firebase Hosting and Cloud Functions.
---

# Deploy Project

Follow these steps to deploy your project to Firebase:

1.  **Ensure you are logged in**:
    ```bash
    npx -y firebase-tools@latest login
    ```
2.  **Install dependencies** (if changed):
    ```bash
    cd functions && npm install && cd ..
    ```
3.  **Deploy to Firebase**:
    - Deploy everything:
      ```bash
      npx -y firebase-tools@latest deploy
      ```
    - Deploy only Hosting:
      ```bash
      npx -y firebase-tools@latest deploy --only hosting
      ```
    - Deploy only Functions:
      ```bash
      npx -y firebase-tools@latest deploy --only functions
      ```
