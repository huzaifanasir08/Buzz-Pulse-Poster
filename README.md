# Buzz Pulse Poster \| Instagram Automation Platform

![Buzz Pulse
Poster](https://github.com/user-attachments/assets/d4aa8eb5-bd54-4c29-94af-a184672c8ee1)

## Overview

Buzz Pulse Poster is a full‑stack Instagram automation platform built
with **Django**, **React**, **Celery**, and the **Instagram Graph
API**.\
It enables effortless bulk scheduling, reliable automated posting, and
high‑scale content delivery for agencies, creators, and businesses
managing multiple Instagram accounts.

This system was engineered for long‑term stability, minimal manual
intervention, and high‑volume performance.

------------------------------------------------------------------------

## ✨ Key Features

-   **Automated bulk posting** for images and reels
-   **Flexible scheduling engine**
    -   Fixed daily posting
    -   Interval‑based posting (e.g., every 4 hours)
-   **Celery + Celery Beat** for rock‑solid task execution (99.98%
    success rate)
-   **Proxy rotation support** to reduce Instagram account risk
-   **Google Cloud Storage integration** for secure media hosting
-   **Multi‑account management**
-   **Token‑based authentication**
-   **Admin dashboard & analytics**

------------------------------------------------------------------------

## 🛠 Tech Stack

### Backend

-   Django
-   Django REST Framework
-   Celery + Celery Beat
-   Redis
-   Instagram Graph API
-   Google Cloud Storage

### Frontend

-   React
-   Axios

### Services

-   Proxy server integration
-   Email alert system
-   Automated file cleanup

------------------------------------------------------------------------

## 📚 API Documentation

### Base URL

(local example)

    http://localhost:8000/

------------------------------------------------------------------------

### **Instagram Account APIs**

#### Create Instagram Account

`POST /createaccount/`
Payload:

``` json
{
  "username": "...",
  "account_id": "...",
  "access_token": "...",
  "proxy": "ip:port"
}
```

#### List Accounts

`GET /accountslist/` --- Only available accounts
`GET /allaccountlist/` --- All accounts

------------------------------------------------------------------------

### **Media Upload**

#### Upload File to GCS

`POST /upload_to_gcs/`
Form‑Data:

    files: <media files>

Response:

``` json
{
  "status": "success",
  "uploaded_file": [
    {"filename": "...", "url": "..."}
  ]
}
```

------------------------------------------------------------------------

### **Save Post Details**

`POST /savedata/`
Supports: - **delay mode** - **daily fixed‑time mode**

------------------------------------------------------------------------

### **Fetching Stats**

`GET /statistics?id=<account_id>`

------------------------------------------------------------------------

### **Auth APIs**

#### Login

`POST /login/`

``` json
{ "username": "", "password": "" }
```

Returns:

``` json
{ "token": "..." }
```

#### Get Profile

`GET /profile/`

#### Update Profile

`PUT /profile/`

------------------------------------------------------------------------

### **Media Post API (DRF ViewSets)**

  Route             Description
  ----------------- ------------------
  `/posts/`         MediaFileViewSet
  `/media-posts/`   MediaPostViewSet

------------------------------------------------------------------------

## 📸 Screenshots

-   Login Page
-   Dashboard / Home (Bulk Media Upload + Scheduler)
-   Statistics & Insights
-   Admin Panel

------------------------------------------------------------------------

## 🧠 How Posting Works (Internals)

-   Posts are queued in DB
-   Celery worker scans scheduled posts
-   Proxy rotated before each attempt
-   Upload → processing → publish flow handled through Graph API
-   Auto‑delete from GCS once posted
-   Email alerts for failures
-   All attempts logged

------------------------------------------------------------------------

## 🚀 Getting Started

### Clone the Repo

``` bash
git clone https://github.com/yourusername/buzz-pulse-poster.git
cd buzz-pulse-poster
```

### Backend Setup

``` bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Celery Worker

``` bash
celery -A core worker --loglevel=info
celery -A core beat --loglevel=info
```

### Frontend Setup

``` bash
npm install
npm start
```

------------------------------------------------------------------------

## 📄 License (MIT)

    MIT License

    Copyright (c) 2025 Huzaifa Nasir

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

------------------------------------------------------------------------

## 🙌 Author

**Huzaifa Nasir**
Full‑Stack Developer · Django Expert · Automation Architect

------------------------------------------------------------------------
