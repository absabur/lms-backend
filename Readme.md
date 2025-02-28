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