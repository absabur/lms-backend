# Express Server Setup Guide

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## Step 2: Install Dependencies

```bash
npm install
```

---

## Step 3: Set Up Environment Variables

Create a `.env` file in the root of your project and add your environment variables.

Example `.env` file:

```bash
PORT=8888
MONGO_URI=mongodb+srv://username:password@clusterlms.kftmc.mongodb.net/lms?retryWrites=true&w=majority
CLOUDINARY_NAME=sdfgsdfgsdf
CLOUDINARY_API_KEY=45654631541435
CLOUDINARY_API_SECRET=aagasgsad51g45as1dg451as
SMTP_USERNAME=user@example.com
SMTP_PASSWORD=sadfsadfdsf
JWT_SECRET=asdgsgsagsdfgsdfg
JWT_PASSWORD_KEY=sdgfsdfgsdfgsdfg
JWT_CHANGE_EMAIL_KEY=sdfgsdgsdfgdsf
clientUrl=
JWT_EXPIRE=30
COOKIE_EXPIRE=30
NODE_ENV=development
```
### Quick Setup Instructions

1. Replace the MONGO_URI..
2. Replace the CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.`.
3. Replace SMTP_USERNAME, SMTP_PASSWORD.

You can customize these variables according to your project requirements.

---

## Step 4: Start the Server

### For Development

```bash
npm run dev
```

*(Make sure you have `nodemon` installed for hot-reloading in development mode.)*

### For Production

```bash
npm start
```

---

## Folder Structure Example
```bash
├── config
├── controllers
├── middleware
├── models
├── routes
├── utils
├── .env
├── app.js
├── index.js
├── package-lock.json
├── package.json
├── Readme.md
```

---

## Available Scripts

| Command       | Description                                   |
|---------------|-----------------------------------------------|
| `npm run dev` | Run server in development mode with `nodemon` |
| `npm start`   | Run server in production mode                 |

---

## Notes

- Ensure your `.env` file is **never committed** to version control (add it to `.gitignore`).
- Update your `.env` variables based on the environment (development, staging, production).

---


# API Documentation

## Admin

### Admin - signup

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/signup`

**Body (URL Encoded):**

- `email: example@gmail.com`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - register

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/register`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `verificationCode: 628128`
- `name: Test Student`
- `email: example@gmail.com`
- `phone: 01521710796`
- `nId: 1965256324`
- `image: File (/C:/Users/absab/Downloads/ab-sabur.png)`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: 111111,
            confirmPassword: 111111,
            verificationCode: 628128,
            name: Test Student,
            email: example@gmail.com,
            phone: 01521710796,
            nId: 1965256324,
            image: File (/C:/Users/absab/Downloads/ab-sabur.png),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - login

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/login`

**Body (URL Encoded):**

- `email: example@gmail.com`
- `password: 111111`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
            password: 111111,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - logout

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/logout`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - profile

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/profile`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/profile`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - update password

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/update-password`

**Body (URL Encoded):**

- `oldPassword: aaaaaa`
- `newPassword: 111111`
- `confirmPassword: 111111`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/update-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            oldPassword: aaaaaa,
            newPassword: 111111,
            confirmPassword: 111111,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - update profile

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/update-profile`

**Body (Form Data):**

- `name: change name`
- `phone: `
- `nId: `
- `image: File (/C:/Users/absab/Downloads/1000003903.jpg)`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/update-profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: change name,
            phone: ,
            nId: ,
            image: File (/C:/Users/absab/Downloads/1000003903.jpg),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - forgate password

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/forgate-password`

**Body (URL Encoded):**

- `email: example@gmail.com`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/forgate-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - reset password

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/reset-password`

**Body (URL Encoded):**

- `newPassword: 111111`
- `confirmPassword: 111111`
- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODIxMjQ5LCJleHAiOjE3NDA4MjE4NDl9.orrRerFvfkwQ0IbUU483qKQ94Fg03bGcfJ9W6VeIVh4`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newPassword: 111111,
            confirmPassword: 111111,
            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODIxMjQ5LCJleHAiOjE3NDA4MjE4NDl9.orrRerFvfkwQ0IbUU483qKQ94Fg03bGcfJ9W6VeIVh4,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - email update request

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/email-update-request`

**Body (URL Encoded):**

- `email: example@gmail.com`
- `password: 111111`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/email-update-request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
            password: 111111,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - email update

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/email-update`

**Body (URL Encoded):**

- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyY2RhY2MxMWU4MTE3ODdiZWQ0NDkiLCJpYXQiOjE3NDA4MjE1NjEsImV4cCI6MTc0MDgyMjE2MX0.TmW_urPzc_vMp9MjR_crIoDw8JS91FYP-vTKUpf8r74`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/email-update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyY2RhY2MxMWU4MTE3ODdiZWQ0NDkiLCJpYXQiOjE3NDA4MjE1NjEsImV4cCI6MTc0MDgyMjE2MX0.TmW_urPzc_vMp9MjR_crIoDw8JS91FYP-vTKUpf8r74,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - create student

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/create-student`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `name: test from admin`
- `banglaName: ফ্রম অ্যাডমিন `
- `fathersName: test`
- `mothersName: test`
- `email: example@gmail.com`
- `phone: 01758695425`
- `addmissionRoll: 121212`
- `boardRoll: `
- `registration: `
- `department: cst`
- `session: 2021`
- `shift: 2`
- `district: bog`
- `upazila: dup`
- `union: zia`
- `village: bor`
- `address: last`
- `image: File (/C:/Users/absab/Downloads/Untitled design (1).png)`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/create-student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: 111111,
            confirmPassword: 111111,
            name: test from admin,
            banglaName: ফ্রম অ্যাডমিন ,
            fathersName: test,
            mothersName: test,
            email: example@gmail.com,
            phone: 01758695425,
            addmissionRoll: 121212,
            boardRoll: ,
            registration: ,
            department: cst,
            session: 2021,
            shift: 2,
            district: bog,
            upazila: dup,
            union: zia,
            village: bor,
            address: last,
            image: File (/C:/Users/absab/Downloads/Untitled design (1).png),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - update student

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/update-student/67c2d85b6b6341122934fe39`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `name: test rupdate from admin`
- `banglaName: ফ্রম অ্যাডমিন `
- `fathersName: test`
- `mothersName: test`
- `email: example@gmail.com`
- `phone: 01758695425`
- `addmissionRoll: 121212`
- `boardRoll: `
- `registration: `
- `department: cst`
- `session: 2021`
- `shift: 2`
- `district: bog`
- `upazila: dup`
- `union: zia`
- `village: bor`
- `address: last`
- `image: File ([])`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/update-student/67c2d85b6b6341122934fe39`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: 111111,
            confirmPassword: 111111,
            name: test rupdate from admin,
            banglaName: ফ্রম অ্যাডমিন ,
            fathersName: test,
            mothersName: test,
            email: example@gmail.com,
            phone: 01758695425,
            addmissionRoll: 121212,
            boardRoll: ,
            registration: ,
            department: cst,
            session: 2021,
            shift: 2,
            district: bog,
            upazila: dup,
            union: zia,
            village: bor,
            address: last,
            image: File ([]),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - all students

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/all-students?name=&banglaName=&fathersName=&mothersName=&email=&phone=&department=&session=&shift=&district=&upazila=&union=&village=&isApproved=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/all-students?name=&banglaName=&fathersName=&mothersName=&email=&phone=&department=&session=&shift=&district=&upazila=&union=&village=&isApproved=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - get student

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/student-details/67c2d85b6b6341122934fe39`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/student-details/67c2d85b6b6341122934fe39`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - approve student

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/approve-student/67c2d85b6b6341122934fe39`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/approve-student/67c2d85b6b6341122934fe39`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - ban student

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/ban-student/67c2d85b6b6341122934fe39`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/ban-student/67c2d85b6b6341122934fe39`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - unban student

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/unban-student/67c2d85b6b6341122934fe39`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/unban-student/67c2d85b6b6341122934fe39`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - create teacher

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/create-teacher`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `name: test teacher`
- `email: example@gmail.com`
- `phone: 015635478569`
- `nId: 465424`
- `department: cst`
- `post: ji`
- `teacherId: 6425205`
- `address: bd`
- `image: File (/C:/Users/absab/Downloads/rahad.jpg)`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/create-teacher`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: 111111,
            confirmPassword: 111111,
            name: test teacher,
            email: example@gmail.com,
            phone: 015635478569,
            nId: 465424,
            department: cst,
            post: ji,
            teacherId: 6425205,
            address: bd,
            image: File (/C:/Users/absab/Downloads/rahad.jpg),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - update teacher

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/update-teacher/67c2dc177e25f82e0195f989`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `name: test teacher updated`
- `email: example@gmail.com`
- `phone: 015635478569`
- `nId: 465424`
- `department: cst`
- `post: ji`
- `teacherId: 6425205`
- `address: bd`
- `image: File ([])`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/update-teacher/67c2dc177e25f82e0195f989`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: 111111,
            confirmPassword: 111111,
            name: test teacher updated,
            email: example@gmail.com,
            phone: 015635478569,
            nId: 465424,
            department: cst,
            post: ji,
            teacherId: 6425205,
            address: bd,
            image: File ([]),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - all teacher

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/all-teachers?name=&email=&phone=&post=&department=&isApproved=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/all-teachers?name=&email=&phone=&post=&department=&isApproved=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - get teacher by id

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/teacher-details/67c2dc177e25f82e0195f989`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/teacher-details/67c2dc177e25f82e0195f989`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - approve-teacher

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/approve-teacher/67c2dc177e25f82e0195f989`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/approve-teacher/67c2dc177e25f82e0195f989`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - ban teacher

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/ban-teacher/67c2dc177e25f82e0195f989`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/ban-teacher/67c2dc177e25f82e0195f989`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - unban teacher

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/unban-teacher/67c2dc177e25f82e0195f989`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/unban-teacher/67c2dc177e25f82e0195f989`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - all admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/all-admins?name=&email=&phone=&isApproved=&isSuperAdmin=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/all-admins?name=&email=&phone=&isApproved=&isSuperAdmin=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - get admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/admin-details/67c2cdacc11e811787bed449`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/admin-details/67c2cdacc11e811787bed449`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - approve admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/approve-admin/67c2cdacc11e811787bed449`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/approve-admin/67c2cdacc11e811787bed449`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - ban admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/ban-admin/67c2cdacc11e811787bed449`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/ban-admin/67c2cdacc11e811787bed449`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Admin - unban admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/unban-admin/67c2cdacc11e811787bed449`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/admin/unban-admin/67c2cdacc11e811787bed449`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

## Book

### Book - create book

**Method:** `POST`

**URL:** `http://localhost:8888/api/book/add-book`

**Body (Form Data):**

- `bookName:  Introduction to Algorithms`
- `bookAuthor:  Thomas H. Cormen`
- `publisher:  MIT Press`
- `edition:  4th`
- `numberOfPages:  1312`
- `country:  USA`
- `language:  English`
- `mrp:  1200`
- `shelf:  A-3`
- `bookNumber:  B001`
- `department:  Computer Science`
- `quantity:  5`
- `description:  A comprehensive textbook on algorithms covering a wide range of topics including data structures, graph algorithms, sorting, and more.`
- `bookNumbers: 001.01, 001.02, 001.03, 001.04, 001.05`
- `images: File (['/C:/Users/absab/Downloads/wall.jpg', '/C:/Users/absab/Downloads/wal.jpg', '/C:/Users/absab/Downloads/wal - Copy.jpg'])`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/book/add-book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bookName:  Introduction to Algorithms,
            bookAuthor:  Thomas H. Cormen,
            publisher:  MIT Press,
            edition:  4th,
            numberOfPages:  1312,
            country:  USA,
            language:  English,
            mrp:  1200,
            shelf:  A-3,
            bookNumber:  B001,
            department:  Computer Science,
            quantity:  5,
            description:  A comprehensive textbook on algorithms covering a wide range of topics including data structures, graph algorithms, sorting, and more.,
            bookNumbers: 001.01, 001.02, 001.03, 001.04, 001.05,
            images: File (['/C:/Users/absab/Downloads/wall.jpg', '/C:/Users/absab/Downloads/wal.jpg', '/C:/Users/absab/Downloads/wal - Copy.jpg']),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Book - update-book

**Method:** `POST`

**URL:** `http://localhost:8888/api/book/update-book/67c2f532f9ce5b08f89f1d92`

**Body (Form Data):**

- `bookName:  Introduction to Algorithms`
- `bookAuthor:  Thomas H. Cormen`
- `publisher:  MIT Press`
- `edition:  4th`
- `numberOfPages:  1310`
- `country:  USA`
- `language:  English`
- `mrp:  1200`
- `shelf:  A-3`
- `bookNumber:  B001`
- `department:  Computer Science`
- `quantity: `
- `description:  A comprehensive textbook on algorithms covering a wide range of topics including data structures, graph algorithms, sorting, and more.`
- `bookNumbers: 001.01, 001.02, 001.03, 001.04, 001.05`
- `images: `


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/book/update-book/67c2f532f9ce5b08f89f1d92`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bookName:  Introduction to Algorithms,
            bookAuthor:  Thomas H. Cormen,
            publisher:  MIT Press,
            edition:  4th,
            numberOfPages:  1310,
            country:  USA,
            language:  English,
            mrp:  1200,
            shelf:  A-3,
            bookNumber:  B001,
            department:  Computer Science,
            quantity: ,
            description:  A comprehensive textbook on algorithms covering a wide range of topics including data structures, graph algorithms, sorting, and more.,
            bookNumbers: 001.01, 001.02, 001.03, 001.04, 001.05,
            images: ,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Book - all books

**Method:** `GET`

**URL:** `http://localhost:8888/api/book/all-books?bookName=&bookAuthor=&publisher=&edition=&language=&department=&shelf=&country=&mrpMin=&mrpMax=&quantityMin=&quantityMax=&sortBy=&sortOrder=&page=1&limit=10&search=`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/book/all-books?bookName=&bookAuthor=&publisher=&edition=&language=&department=&shelf=&country=&mrpMin=&mrpMax=&quantityMin=&quantityMax=&sortBy=&sortOrder=&page=1&limit=10&search=`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Book - get book

**Method:** `GET`

**URL:** `http://localhost:8888/api/book/get-book/67c2f29f54b4e981a7f41066`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/book/get-book/67c2f29f54b4e981a7f41066`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

## BookStudent

### BookStudent - book take req

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-take-request/67c2f532f9ce5b08f89f1d92`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/student/book-take-request/67c2f532f9ce5b08f89f1d92`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookStudent - book take req cancel

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-take-request-cancel/67c2f9cdbbb9cc2dafda0e0c`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/student/book-take-request-cancel/67c2f9cdbbb9cc2dafda0e0c`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookStudent - book take req approve

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-take-request-approve/67c3005df97e683036297deb`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/student/book-take-request-approve/67c3005df97e683036297deb`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookStudent - book return req

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-return-request/67c3005df97e683036297deb`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/student/book-return-request/67c3005df97e683036297deb`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookStudent - book return req cancel

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-return-request-cancel/67c3005df97e683036297deb`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/student/book-return-request-cancel/67c3005df97e683036297deb`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookStudent - book return req approve

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-return-request-approve/67c3005df97e683036297deb`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/student/book-return-request-approve/67c3005df97e683036297deb`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookStudent - borrow list

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/get-borrow-lists?bookId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/student/get-borrow-lists?bookId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookStudent - borrow list admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/get-borrow-lists-admin?bookId=&studentId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/student/get-borrow-lists-admin?bookId=&studentId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

## BookTeacher

### BookTeacher - book take req

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-take-request/id`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/teacher/book-take-request/id`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookTeacher - book take req cancel

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-take-request-cancel/id`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/teacher/book-take-request-cancel/id`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookTeacher - book take req appreve

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-take-request-approve/id`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/teacher/book-take-request-approve/id`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookTeacher - book return req

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-return-request/id`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/teacher/book-return-request/id`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookTeacher - book return req cancel

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-return-request-cancel/id`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/teacher/book-return-request-cancel/id`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookTeacher - book return req approve

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-return-request-approve/id`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/teacher/book-return-request-approve/id`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookTeacher - borrow list

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/get-borrow-lists?bookId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/teacher/get-borrow-lists?bookId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### BookTeacher - borrow list admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/get-borrow-lists-admin?bookId=&teacherId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/take-book/teacher/get-borrow-lists-admin?bookId=&teacherId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

## FixedValue

### FixedValue - create country

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/country`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/country`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all countries

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/countries`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/countries`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - create language

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/language`

**Body (URL Encoded):**

- `name: English`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/language`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: English,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all languages

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/languages`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/languages`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - create shelf

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/shelf`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/shelf`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all shelves

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/shelves`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/shelves`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - create department

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/department`

**Body (URL Encoded):**

- `name: Mining and Mine Survey Technology`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/department`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: Mining and Mine Survey Technology,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all departments

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/departments`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/departments`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - create session

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/session`

**Body (URL Encoded):**

- `name: 24-25`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 24-25,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all sessions

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/sessions`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/sessions`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - create shift

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/shift`

**Body (URL Encoded):**

- `name: Second`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/shift`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: Second,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all shifts

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/shifts`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/shifts`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - create district

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/district`

**Body (URL Encoded):**

- `name: Dhaka`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/district`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: Dhaka,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all districts

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/districts`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/districts`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - create upazila

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/upazila`

**Body (URL Encoded):**

- `name: `
- `districtId: `
- `id: `


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/upazila`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: ,
            districtId: ,
            id: ,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all upazilas

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/upazilas?sortBy=&sortOrder=&name=&districtId=&search=`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/upazilas?sortBy=&sortOrder=&name=&districtId=&search=`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - create post

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/post`

**Body (URL Encoded):**

- `name: Junior Instructor`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: Junior Instructor,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### FixedValue - all posts

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/posts`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/fixed-values/posts`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

## Student

### Student - signup

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/signup`

**Body (URL Encoded):**

- `email: example@gmail.com`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - register

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/register`

**Body (Form Data):**

- `password: `
- `confirmPassword: `
- `verificationCode: `
- `name: `
- `banglaName: `
- `fathersName: `
- `mothersName: `
- `email: `
- `phone: `
- `addmissionRoll: `
- `boardRoll: `
- `registration: `
- `department: `
- `session: `
- `shift: `
- `district: `
- `upazila: `
- `union: `
- `village: `
- `address: `
- `image: File ([])`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: ,
            confirmPassword: ,
            verificationCode: ,
            name: ,
            banglaName: ,
            fathersName: ,
            mothersName: ,
            email: ,
            phone: ,
            addmissionRoll: ,
            boardRoll: ,
            registration: ,
            department: ,
            session: ,
            shift: ,
            district: ,
            upazila: ,
            union: ,
            village: ,
            address: ,
            image: File ([]),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - login

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/login`

**Body (URL Encoded):**

- `email: example@gmail.com`
- `password: aaaaaa`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
            password: aaaaaa,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - logout

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/logout`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - profile

**Method:** `GET`

**URL:** `http://localhost:8888/api/student/profile`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/profile`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - update password

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/update-password`

**Body (URL Encoded):**

- `oldPassword: 111111`
- `newPassword: aaaaaa`
- `confirmPassword: aaaaaa`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/update-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            oldPassword: 111111,
            newPassword: aaaaaa,
            confirmPassword: aaaaaa,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - update profile

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/update-profile`

**Body (Form Data):**

- `name: test rupdate from user`
- `banglaName: ফ্রম`
- `fathersName: test`
- `mothersName: test`
- `phone: 01758695425`
- `addmissionRoll: 121212`
- `boardRoll: `
- `registration: `
- `department: cst`
- `session: 2021`
- `shift: 2`
- `district: bog`
- `upazila: dup`
- `union: zia`
- `village: bor`
- `address: last`
- `image: File (/C:/Users/absab/Downloads/file (1).png)`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/update-profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: test rupdate from user,
            banglaName: ফ্রম,
            fathersName: test,
            mothersName: test,
            phone: 01758695425,
            addmissionRoll: 121212,
            boardRoll: ,
            registration: ,
            department: cst,
            session: 2021,
            shift: 2,
            district: bog,
            upazila: dup,
            union: zia,
            village: bor,
            address: last,
            image: File (/C:/Users/absab/Downloads/file (1).png),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - forgate password

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/forgate-password`

**Body (URL Encoded):**

- `email: example@gmail.com`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/forgate-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - reset password

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/reset-password`

**Body (URL Encoded):**

- `newPassword: aaaaaa`
- `confirmPassword: aaaaaa`
- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODI1MzE0LCJleHAiOjE3NDA4MjU5MTR9.mWUVTCqIT3x34u1044BE7jZdIcy63jPYyb6cjmKXI-s`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newPassword: aaaaaa,
            confirmPassword: aaaaaa,
            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODI1MzE0LCJleHAiOjE3NDA4MjU5MTR9.mWUVTCqIT3x34u1044BE7jZdIcy63jPYyb6cjmKXI-s,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - email update request

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/email-update-request`

**Body (URL Encoded):**

- `email: example@gmail.com`
- `password: aaaaaa`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/email-update-request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
            password: aaaaaa,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Student - email update

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/email-update`

**Body (URL Encoded):**

- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyZDg1YjZiNjM0MTEyMjkzNGZlMzkiLCJpYXQiOjE3NDA4MjU1NzgsImV4cCI6MTc0MDgyNjE3OH0.TVCFPKZolPecIAKBOP__RnwNMBL9DYePxypT6a235EY`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/student/email-update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyZDg1YjZiNjM0MTEyMjkzNGZlMzkiLCJpYXQiOjE3NDA4MjU1NzgsImV4cCI6MTc0MDgyNjE3OH0.TVCFPKZolPecIAKBOP__RnwNMBL9DYePxypT6a235EY,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

## Teacher

### Teacher - signup

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/signup`

**Body (URL Encoded):**

- `email: example@gmail.com`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - register

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/register`

**Body (Form Data):**

- `password: `
- `confirmPassword: `
- `verificationCode: `
- `name: `
- `email: `
- `phone: `
- `nId: `
- `department: `
- `post: `
- `teacherId: `
- `address: `
- `image: File ([])`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: ,
            confirmPassword: ,
            verificationCode: ,
            name: ,
            email: ,
            phone: ,
            nId: ,
            department: ,
            post: ,
            teacherId: ,
            address: ,
            image: File ([]),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - login

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/login`

**Body (URL Encoded):**

- `email: example@gmail.com`
- `password: aaaaaa`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
            password: aaaaaa,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - logout

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/logout`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - profile

**Method:** `GET`

**URL:** `http://localhost:8888/api/teacher/profile`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/profile`, {
        method: 'GET',
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - update password

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/update-password`

**Body (URL Encoded):**

- `oldPassword: 111111`
- `newPassword: aaaaaa`
- `confirmPassword: aaaaaa`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/update-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            oldPassword: 111111,
            newPassword: aaaaaa,
            confirmPassword: aaaaaa,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - update profile

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/update-profile`

**Body (Form Data):**

- `name: test teacher updated as teacher`
- `phone: 015635478569`
- `nId: 465424`
- `department: cst`
- `post: ji`
- `teacherId: 6425205`
- `address: bd`
- `image: File ([])`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/update-profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: test teacher updated as teacher,
            phone: 015635478569,
            nId: 465424,
            department: cst,
            post: ji,
            teacherId: 6425205,
            address: bd,
            image: File ([]),
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - forgate password

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/forgate-password`

**Body (URL Encoded):**

- `email: example@gmail.com`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/forgate-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - reset password

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/reset-password`

**Body (URL Encoded):**

- `newPassword: aaaaaa`
- `confirmPassword: aaaaaa`
- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODI3MDEwLCJleHAiOjE3NDA4Mjc2MTB9.8prnFw3Y1492BAnW3oCf5mqv9dRP-rWKEwyE5TR9CLY`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newPassword: aaaaaa,
            confirmPassword: aaaaaa,
            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODI3MDEwLCJleHAiOjE3NDA4Mjc2MTB9.8prnFw3Y1492BAnW3oCf5mqv9dRP-rWKEwyE5TR9CLY,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - email update request

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/email-update-request`

**Body (URL Encoded):**

- `email: example@gmail.com`
- `password: aaaaaa`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/email-update-request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: example@gmail.com,
            password: aaaaaa,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

### Teacher - email update

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/email-update`

**Body (URL Encoded):**

- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyZGMxNzdlMjVmODJlMDE5NWY5ODkiLCJpYXQiOjE3NDA4MjcxNTUsImV4cCI6MTc0MDgyNzc1NX0.Zq1STlSOJQB6b9HNGz9uCdK8plzdrZ_TsU5FETTgJhU`


## fetch method

```bash

try {
    const response = await fetch(`http://localhost:8888/api/teacher/email-update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyZGMxNzdlMjVmODJlMDE5NWY5ODkiLCJpYXQiOjE3NDA4MjcxNTUsImV4cCI6MTc0MDgyNzc1NX0.Zq1STlSOJQB6b9HNGz9uCdK8plzdrZ_TsU5FETTgJhU,
        }),
    });
    const result = await response.json();
} catch (error) {
    console.error(error);
}
                
```

---

