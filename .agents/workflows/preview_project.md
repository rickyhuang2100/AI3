---
description: Start the Firebase local emulators to preview the project.
---

# Preview Project

Follow these steps to start the local preview:

1.  Ensure you are in the project root directory.
2.  Start the Firebase emulators for hosting and functions:
    ```bash
    npx -y firebase-tools@latest emulators:start
    ```
3.  Access the preview:
    - Hosting: [http://127.0.0.1:5000](http://127.0.0.1:5000)
    - Emulator UI: [http://127.0.0.1:4000](http://127.0.0.1:4000)
    - Functions: [http://127.0.0.1:5001](http://127.0.0.1:5001)
