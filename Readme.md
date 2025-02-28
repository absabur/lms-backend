# Admin Signup Verification API

This API endpoint handles the admin signup verification process for the Library Management System.

## Endpoint

**POST /api/admin/signup**

## Request

### Request Body

```json
{
  "email": "admin@example.com"
}
```

---


# Admin Registration API

This API endpoint handles the registration of new admins for the Library Management System.

## Endpoint

**POST /api/admin/register**

## Request

### Request Body

```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "phone": "1234567890",
  "nId": "1234567890123456",
  "password": "adminpassword",
  "confirmPassword": "adminpassword",
  "verificationCode": "123456",
  "image": "image_file" 
}
```


---

# Admin Login API

This API endpoint allows an admin to log in to the Library Management System.

## Endpoint

**POST /api/admin/login**

## Request

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
```

---

# Admin Logout API

This API endpoint allows an admin to log out from the Library Management System by clearing their authentication token.

## Endpoint

**POST /api/admin/logout**

## Request

This endpoint does not require a request body.

## Response

### Success (200)

```json
{
  "success": true
}
```

---

# Get Admin Profile API

This API endpoint allows an admin to fetch their profile details from the Library Management System.

## Endpoint

**GET /api/admin/profile**

## Request

This endpoint requires authentication via a JWT token.

### Headers

| Header         | Value              | Description                                  |
| -------------- | ------------------ | -------------------------------------------- |
| Authorization  | Bearer <token>      | The admin's JWT token for authentication.    |

## Response

### Success (200)

```json
{
  "success": true,
  "admin": {
    "name": "Admin Name",
    "email": "admin@example.com",
    "phone": "1234567890",
    "nId": "1234567890123456",
    "avatar": {
      "public_id": "avatar_public_id",
      "url": "avatar_image_url"
    },
    "createDate": "2025-02-28T00:00:00",
    "updateDate": "2025-02-28T00:00:00"
  }
}
```

---

# Update Admin Password API

This API endpoint allows an admin to update their password in the Library Management System.

## Endpoint

**POST /api/admin/update-password**

## Request

This endpoint requires authentication via a JWT token.

### Headers

| Header         | Value              | Description                                  |
| -------------- | ------------------ | -------------------------------------------- |
| Authorization  | Bearer <token>      | The admin's JWT token for authentication.    |

### Request Body

| Field           | Type     | Description                         |
| --------------- | -------- | ----------------------------------- |
| oldPassword     | string   | The admin's current password.       |
| newPassword     | string   | The new password to set.            |
| confirmPassword | string   | The new password confirmation.      |

**Note:** The `newPassword` and `confirmPassword` fields should match.

## Response

### Success (200)

```json
{
  "success": true
}
```

---

# Update Admin Profile API

This API endpoint allows an admin to update their profile in the Library Management System, including their name, phone number, national ID, and avatar.

## Endpoint

**POST /api/admin/update-profile**

## Request

This endpoint requires authentication via a JWT token.

### Headers

| Header         | Value              | Description                                  |
| -------------- | ------------------ | -------------------------------------------- |
| Authorization  | Bearer <token>      | The admin's JWT token for authentication.    |

### Request Body

| Field      | Type     | Description                                 |
| ---------- | -------- | ------------------------------------------- |
| name       | string   | The admin's name.                           |
| phone      | string   | The admin's phone number.                   |
| nId        | string   | The admin's national ID.                    |
| image      | file     | (Optional) The admin's new avatar image.    |

**Note:** If a field is empty, the existing value will be preserved. The avatar is optional, and only provided if a new image is uploaded.

## Response

### Success (200)

```json
{
  "success": true,
  "admin": {
    "name": "Updated Name",
    "phone": "Updated Phone",
    "nId": "Updated National ID",
    "avatar": {
      "public_id": "cloudinary_public_id",
      "url": "cloudinary_secure_url"
    },
    "createDate": "2022-01-01T00:00:00Z",
    "updateDate": "2022-01-01T00:00:00Z"
  }
}
```

---

# Forgot Admin Password API

This API endpoint handles the process of sending a password reset email to the admin for the Library Management System.

## Endpoint

**POST /api/admin/forgot-password**

## Request

### Request Body

```json
{
  "email": "admin@example.com"
}
```

---

# Reset Password API

This API endpoint allows an admin to reset their password using a valid token received from the password reset email.

## Endpoint

**POST /api/admin/reset-password**

## Request

### Request Body

```json
{
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123",
  "token": "valid-jwt-token"
}
```

---

# Update Admin Email Request API

This API endpoint allows an admin to request to update their email address. The admin needs to verify the new email through a verification link sent to the new email address.

## Endpoint

**POST /api/admin/email-update-request**

## Request

### Request Body

```json
{
  "email": "newemail@example.com",
  "password": "adminpassword"
}
```

---

# Update Admin Email Confirm API

This API endpoint allows an admin to confirm and update their email address using the token sent to the new email address. It processes the token and updates the admin's email in the database if valid.

## Endpoint

**POST /api/admin/email-update**

## Request

### Request Body

```json
{
  "token": "verification_token_here"
}
```

---

# Get All Admins API

This API endpoint retrieves a list of all admin users, with optional filters for admin status, ban status, and search queries across multiple fields.

## Endpoint

**GET /api/admin/all-admins**

## Query Parameters

| Parameter     | Type    | Description                                                        |
|---------------|---------|--------------------------------------------------------------------|
| `isAdmin`     | string  | Filter by admin status (`true` or `false`).                       |
| `isBan`       | string  | Filter by ban status (`true` or `false`).                         |
| `search`      | string  | Search admins by `nId`, `email`, or `phone`.                      |

## Request

Example:
**GET /api/admin/all-admins?isAdmin=true&isBan=false&search=john**

---


# Get All Students API

This API endpoint retrieves a list of all students, with optional filters for approval status, ban status, technology, session, group, and search queries across multiple fields.

## Endpoint

**GET /api/admin/all-students**

## Query Parameters

| Parameter      | Type    | Description                                                       |
|----------------|---------|-------------------------------------------------------------------|
| `isApproved`   | string  | Filter by approval status (`true` or `false`).                    |
| `isBan`        | string  | Filter by ban status (`true` or `false`).                        |
| `technology`   | string  | Filter by technology (e.g., `Computer Science`, `Electrical`).    |
| `session`      | string  | Filter by session (e.g., `2020`, `2021`).                        |
| `group`        | string  | Filter by group (e.g., `A`, `B`, `C`).                           |
| `search`       | string  | Search students by `registration`, `addmissionRoll`, `boardRoll`, `email`, or `phone`. |

## Request

Example:
**GET /api/admin/all-students?isApproved=true&isBan=false&technology=Computer%20Science&search=john**


---


# Get All Teachers API

This API endpoint retrieves a list of all teachers with optional filters for approval status, ban status, post, department, and search queries across multiple fields.

## Endpoint

**GET /api/admin/all-teachers**

## Query Parameters

| Parameter      | Type    | Description                                                       |
|----------------|---------|-------------------------------------------------------------------|
| `isApproved`   | string  | Filter by approval status (`true` or `false`).                    |
| `isBan`        | string  | Filter by ban status (`true` or `false`).                        |
| `post`         | string  | Filter by the teacher's post (e.g., `Professor`, `Lecturer`).     |
| `department`   | string  | Filter by department (e.g., `Computer Science`, `Mathematics`).   |
| `search`       | string  | Search teachers by `teacherId`, `nId`, `email`, or `phone`.       |

## Request

Example:
**GET /api/admin/all-teachers?isApproved=true&isBan=false&post=Professor&search=john**


---


# Get Admin Details API

This API endpoint retrieves the details of an admin by their unique `id`.

## Endpoint

**GET /api/admin/admin-details/:id**

## URL Parameters

| Parameter | Type   | Description                      |
|-----------|--------|----------------------------------|
| `id`      | string | The unique `id` of the admin (24-character MongoDB ObjectId). |

## Request

Example:
**GET /api/admin/admin-details/605c72ef153207001f7f3a6**


---


# Get Student Details API

This API endpoint retrieves the details of a student by their unique `id`.

## Endpoint

**GET /api/admin/student-details/:id**

## URL Parameters

| Parameter | Type   | Description                       |
|-----------|--------|-----------------------------------|
| `id`      | string | The unique `id` of the student (24-character MongoDB ObjectId). |

## Request

Example:
**GET /api/admin/student-details/605c72ef153207001f7f3a7**


---


# Get Teacher Details API

This API endpoint retrieves the details of a teacher by their unique `id`.

## Endpoint

**GET /api/admin/teacher-details/:id**

## URL Parameters

| Parameter | Type   | Description                       |
|-----------|--------|-----------------------------------|
| `id`      | string | The unique `id` of the teacher (24-character MongoDB ObjectId). |

## Request

Example:
**GET /api/admin/teacher-details/605c72ef153207001f7f3b8**


---


# Create Student API

This API endpoint allows an admin to register a new student in the system.

## Endpoint

**POST /api/admin/create-student**

## Request Body

The request body must include the following fields:

| Field             | Type   | Description                                                   |
|-------------------|--------|---------------------------------------------------------------|
| `password`        | string | The student's password.                                        |
| `confirmPassword` | string | The confirmation password (must match `password`).            |
| `name`            | string | The student's full name.                                       |
| `banglaName`      | string | The student's name in Bangla (optional).                       |
| `fathersName`     | string | The name of the student's father.                              |
| `mothersName`     | string | The name of the student's mother.                              |
| `email`           | string | The student's email address.                                  |
| `phone`           | string | The student's phone number.                                   |
| `addmissionRoll`  | string | The student's admission roll number.                          |
| `boardRoll`       | string | The student's board roll number.                              |
| `registration`    | string | The student's registration number.                            |
| `technology`      | string | The technology the student is enrolled in.                    |
| `session`         | string | The student's academic session.                               |
| `shift`           | string | The student's shift (e.g., morning, evening).                 |
| `group`           | string | The student's group (if applicable).                          |
| `district`        | string | The student's district of residence.                          |
| `upazila`         | string | The student's upazila (sub-district).                         |
| `union`           | string | The student's union (local administrative area).              |
| `village`         | string | The student's village.                                        |
| `address`         | string | The student's full address.                                   |
| `avatar` (file)   | file   | The student's avatar image (must be uploaded).                 |

### Example Request Body:

```json
{
  "password": "password123",
  "confirmPassword": "password123",
  "name": "John Doe",
  "banglaName": "জন ডো",
  "fathersName": "Mr. Doe",
  "mothersName": "Mrs. Doe",
  "email": "john.doe@example.com",
  "phone": "0123456789",
  "addmissionRoll": "2023-4567",
  "boardRoll": "1234567",
  "registration": "ABC123",
  "technology": "Computer Science",
  "session": "2023",
  "shift": "Morning",
  "group": "A",
  "district": "Dhaka",
  "upazila": "Uptown",
  "union": "U1",
  "village": "Village X",
  "address": "123 Main Street, Dhaka, Bangladesh",
  "avatar": "imageFile.jpg"
}
```


---


# Register Teacher by Admin - API Documentation

## Endpoint
`POST /create-teacher`

### Description
This endpoint is used by an admin to register a new teacher in the system. The admin must provide the teacher's personal details, and an avatar image must be uploaded. Once the teacher is successfully created, an email is sent to the teacher confirming the account creation.

---

## Request Body

The request body must be in `JSON` format with the following fields:

- **password** (string): The password for the teacher account.
- **confirmPassword** (string): The confirmation of the password.
- **name** (string): The name of the teacher.
- **email** (string): The email of the teacher.
- **phone** (string): The phone number of the teacher.
- **nId** (string): The National ID of the teacher.
- **department** (string): The department the teacher belongs to.
- **post** (string): The post or title of the teacher.
- **teacherId** (string): A unique identifier for the teacher.
- **address** (string): The address of the teacher.

### Example Request

```json
{
  "password": "password123",
  "confirmPassword": "password123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "nId": "1234567890123",
  "department": "Computer Science",
  "post": "Professor",
  "teacherId": "T12345",
  "address": "123 Main St, City, Country"
}
```


---


