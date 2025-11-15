# 🌟 Intelligent Registration System — Complete Guide

A clean, modern, fully validated Registration System with end-to-end automation using Cypress.

This README gives you everything: setup steps, folder structure, commands, automation flows, screenshots guide, troubleshooting and submission checklist.

---

## 📁 Project Structure

```
fRUGUAL/
│
├── index.html
├── css/
│    └── styles.css
├── js/
│    └── script.js
├── server/
│    └── server.js   (optional mock backend)
├── cypress/
│    ├── integration/
│    │     └── registration_spec.js
│    ├── videos/
│    └── screenshots/
├── package.json
└── cypress.config.js
```

---

## 🚀 Features

### ✔ Fully responsive form

### ✔ Client-side smart validations

* Required fields
* Email disposable domain detection
* Phone number must match country code
* Password strength meter
* Confirm password validation
* Terms & Conditions required

### ✔ Dynamic Dropdown Logic

* Country → State → City auto-update

### ✔ Inline error messages

### ✔ Disabled submit button until valid

### ✔ Clean success message on submit

### ✔ Cypress automation included

---

## 🛠 Installation

Make sure **Node.js** and **npm** are installed.

Open terminal inside your project folder and run:

```
npm install
```

This installs Cypress and http-server.

---

## ▶️ Running the Project

Start the local server:

```
npm run serve
```

The app opens at:

```
http://localhost:5500/index.html
```

Keep this terminal open.

---

## 🧪 Running Cypress Tests

Open Cypress UI:

```
npm run cypress:open
```

Run all tests headlessly:

```
npm run cypress:run
```

This will generate:

* 📸 screenshots → `cypress/screenshots/`
* 🎥 video → `cypress/videos/`

---

## 🧭 Automation Flows

### **Flow A — Negative Test (Missing Last Name)**

* Fill all fields except Last Name
* Validate: submit button disabled
* Validate: inline error text
* Screenshot: `error-state.png`

### **Flow B — Positive Test (All Valid Inputs)**

* Fill entire form with valid data
* Submit enabled → click
* Validate: success message
* Validate: form resets
* Screenshot: `success-state.png`

### **Flow C — Form Logic Test**

* Country → State auto-update
* State → City auto-update
* Password strength meter
* Wrong confirm password disables button
* Submit stays disabled until valid

---

## 🧩 Troubleshooting

### ❗ Cypress: “Could not find videos folder”

Make sure these folders exist:

```
cypress/videos
cypress/screenshots
```

Delete any file named `videos` and create a folder instead.

### ❗ Test A failing (submit disabled)

This is expected. Update the test to check `submit` is disabled.

### ❗ Page not opening

Run:

```
npm run serve
```

pay attention to the port number (default: 5500).

---

## 🎥 What to Submit

### ✔ Full source code

### ✔ Cypress automation script

### ✔ Screenshots:

* error-state
* success-state

### ✔ Running video (auto-generated)

### ✔ README file

---

## ⭐ Credits

Developed as part of a software testing and automation assessment. Includes modern UI, clear validation rules, and strong automation coverage.

If you want, this README can be exported as PDF or styled further.