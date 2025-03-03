# API Documentation

## Admin

### signup

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/signup`

**Body (URL Encoded):**

- `email: efootballpes11th@gmail.com`

---

### register

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/register`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `verificationCode: 628128`
- `name: Test Student`
- `email: efootballpes11th@gmail.com`
- `phone: 01521710796`
- `nId: 1965256324`
- `image: File (/C:/Users/absab/Downloads/ab-sabur.png)`

---

### login

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/login`

**Body (URL Encoded):**

- `email: bogura.polytechnic.library@gmail.com`
- `password: 111111`

---

### logout

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/logout`

---

### profile

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/profile`

---

### update password

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/update-password`

**Body (URL Encoded):**

- `oldPassword: aaaaaa`
- `newPassword: 111111`
- `confirmPassword: 111111`

---

### update profile

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/update-profile`

**Body (Form Data):**

- `name: change name`
- `phone: `
- `nId: `
- `image: File (/C:/Users/absab/Downloads/1000003903.jpg)`

---

### forgate password

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/forgate-password`

**Body (URL Encoded):**

- `email: efootballpes11th@gmail.com`

---

### reset password

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/reset-password`

**Body (URL Encoded):**

- `newPassword: 111111`
- `confirmPassword: 111111`
- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODIxMjQ5LCJleHAiOjE3NDA4MjE4NDl9.orrRerFvfkwQ0IbUU483qKQ94Fg03bGcfJ9W6VeIVh4`

---

### email update request

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/email-update-request`

**Body (URL Encoded):**

- `email: abdussabur929@gmail.com`
- `password: 111111`

---

### email update

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/email-update`

**Body (URL Encoded):**

- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyY2RhY2MxMWU4MTE3ODdiZWQ0NDkiLCJpYXQiOjE3NDA4MjE1NjEsImV4cCI6MTc0MDgyMjE2MX0.TmW_urPzc_vMp9MjR_crIoDw8JS91FYP-vTKUpf8r74`

---

### create student

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/create-student`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `name: test from admin`
- `banglaName: ফ্রম অ্যাডমিন `
- `fathersName: test`
- `mothersName: test`
- `email: efootballpes11th@gmail.com`
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

---

### update student

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/update-student/67c2d85b6b6341122934fe39`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `name: test rupdate from admin`
- `banglaName: ফ্রম অ্যাডমিন `
- `fathersName: test`
- `mothersName: test`
- `email: efootballpes11th@gmail.com`
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

---

### all students

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/all-students?name=&banglaName=&fathersName=&mothersName=&email=&phone=&department=&session=&shift=&district=&upazila=&union=&village=&isApproved=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`

---

### get student

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/student-details/67c2d85b6b6341122934fe39`

---

### approve student

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/approve-student/67c2d85b6b6341122934fe39`

---

### ban student

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/ban-student/67c2d85b6b6341122934fe39`

---

### unban student

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/unban-student/67c2d85b6b6341122934fe39`

---

### create teacher

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/create-teacher`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `name: test teacher`
- `email: efootballpes11th@gmail.com`
- `phone: 015635478569`
- `nId: 465424`
- `department: cst`
- `post: ji`
- `teacherId: 6425205`
- `address: bd`
- `image: File (/C:/Users/absab/Downloads/rahad.jpg)`

---

### update teacher

**Method:** `POST`

**URL:** `http://localhost:8888/api/admin/update-teacher/67c2dc177e25f82e0195f989`

**Body (Form Data):**

- `password: 111111`
- `confirmPassword: 111111`
- `name: test teacher updated`
- `email: efootballpes11th@gmail.com`
- `phone: 015635478569`
- `nId: 465424`
- `department: cst`
- `post: ji`
- `teacherId: 6425205`
- `address: bd`
- `image: File ([])`

---

### all teacher

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/all-teachers?name=&email=&phone=&post=&department=&isApproved=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`

---

### get teacher by id

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/teacher-details/67c2dc177e25f82e0195f989`

---

### approve-teacher

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/approve-teacher/67c2dc177e25f82e0195f989`

---

### ban teacher

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/ban-teacher/67c2dc177e25f82e0195f989`

---

### unban teacher

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/unban-teacher/67c2dc177e25f82e0195f989`

---

### all admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/all-admins?name=&email=&phone=&isApproved=&isSuperAdmin=&isBan=&sortBy=&sortOrder=&page=1&limit=10&search=`

---

### get admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/admin-details/67c2cdacc11e811787bed449`

---

### approve admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/approve-admin/67c2cdacc11e811787bed449`

---

### ban admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/ban-admin/67c2cdacc11e811787bed449`

---

### unban admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/admin/unban-admin/67c2cdacc11e811787bed449`

---

## Book

### create book

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

---

### update-book

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

---

### all books

**Method:** `GET`

**URL:** `http://localhost:8888/api/book/all-books?bookName=&bookAuthor=&publisher=&edition=&language=&department=&shelf=&country=&mrpMin=&mrpMax=&quantityMin=&quantityMax=&sortBy=&sortOrder=&page=1&limit=10&search=`

---

### get book

**Method:** `GET`

**URL:** `http://localhost:8888/api/book/get-book/67c2f29f54b4e981a7f41066`

---

## BookStudent

### book take req

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-take-request/67c2f532f9ce5b08f89f1d92`

---

### book take req cancel

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-take-request-cancel/67c2f9cdbbb9cc2dafda0e0c`

---

### book take req approve

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-take-request-approve/67c3005df97e683036297deb`

---

### book return req

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-return-request/67c3005df97e683036297deb`

---

### book return req cancel

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-return-request-cancel/67c3005df97e683036297deb`

---

### book return req approve

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/book-return-request-approve/67c3005df97e683036297deb`

---

### borrow list

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/get-borrow-lists?bookId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10&search=`

---

### borrow list admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/student/get-borrow-lists-admin?bookId=&studentId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10&search=`

---

## BookTeacher

### book take req

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-take-request/id`

---

### book take req cancel

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-take-request-cancel/id`

---

### book take req appreve

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-take-request-approve/id`

---

### book return req

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-return-request/id`

---

### book return req cancel

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-return-request-cancel/id`

---

### book return req approve

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/book-return-request-approve/id`

---

### borrow list

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/get-borrow-lists?bookId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10&search=`

---

### borrow list admin

**Method:** `GET`

**URL:** `http://localhost:8888/api/take-book/teacher/get-borrow-lists-admin?bookId=&teacherId=&bookNumber=&takingApproveBy=&returnApproveBy=&sortBy=&sortOrder=&page=1&limit=10&search=`

---

## FixedValue

### create country

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/country`

---

### all countries

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/countries`

---

### create language

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/language`

**Body (URL Encoded):**

- `name: English`

---

### all languages

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/languages`

---

### create shelf

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/shelf`

---

### all shelves

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/shelves`

---

### create department

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/department`

**Body (URL Encoded):**

- `name: Mining and Mine Survey Technology`

---

### all departments

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/departments`

---

### create session

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/session`

**Body (URL Encoded):**

- `name: 24-25`

---

### all sessions

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/sessions`

---

### create shift

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/shift`

**Body (URL Encoded):**

- `name: Second`

---

### all shifts

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/shifts`

---

### create district

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/district`

**Body (URL Encoded):**

- `name: Dhaka`

---

### all districts

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/districts`

---

### create upazila

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/upazila`

**Body (URL Encoded):**

- `name: `
- `districtId: `
- `id: `

---

### all upazilas

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/upazilas?name=&districtId=&sortBy=&sortOrder=&search=`

---

### create post

**Method:** `POST`

**URL:** `http://localhost:8888/api/fixed-values/post`

**Body (URL Encoded):**

- `name: Junior Instructor`

---

### all posts

**Method:** `GET`

**URL:** `http://localhost:8888/api/fixed-values/posts`

---

## Student

### signup

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/signup`

**Body (URL Encoded):**

- `email: efootballpes11th@gmail.com`

---

### register

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

---

### login

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/login`

**Body (URL Encoded):**

- `email: abdussabur929@gmail.com`
- `password: aaaaaa`

---

### logout

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/logout`

---

### profile

**Method:** `GET`

**URL:** `http://localhost:8888/api/student/profile`

---

### update password

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/update-password`

**Body (URL Encoded):**

- `oldPassword: 111111`
- `newPassword: aaaaaa`
- `confirmPassword: aaaaaa`

---

### update profile

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

---

### forgate password

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/forgate-password`

**Body (URL Encoded):**

- `email: efootballpes11th@gmail.com`

---

### reset password

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/reset-password`

**Body (URL Encoded):**

- `newPassword: aaaaaa`
- `confirmPassword: aaaaaa`
- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODI1MzE0LCJleHAiOjE3NDA4MjU5MTR9.mWUVTCqIT3x34u1044BE7jZdIcy63jPYyb6cjmKXI-s`

---

### email update request

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/email-update-request`

**Body (URL Encoded):**

- `email: abdussabur929@gmail.com`
- `password: aaaaaa`

---

### email update

**Method:** `POST`

**URL:** `http://localhost:8888/api/student/email-update`

**Body (URL Encoded):**

- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyZDg1YjZiNjM0MTEyMjkzNGZlMzkiLCJpYXQiOjE3NDA4MjU1NzgsImV4cCI6MTc0MDgyNjE3OH0.TVCFPKZolPecIAKBOP__RnwNMBL9DYePxypT6a235EY`

---

## Teacher

### signup

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/signup`

**Body (URL Encoded):**

- `email: efootballpes11th@gmail.com`

---

### register

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

---

### login

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/login`

**Body (URL Encoded):**

- `email: abdussabur929@gmail.com`
- `password: aaaaaa`

---

### logout

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/logout`

---

### profile

**Method:** `GET`

**URL:** `http://localhost:8888/api/teacher/profile`

---

### update password

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/update-password`

**Body (URL Encoded):**

- `oldPassword: 111111`
- `newPassword: aaaaaa`
- `confirmPassword: aaaaaa`

---

### update profile

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

---

### forgate password

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/forgate-password`

**Body (URL Encoded):**

- `email: efootballpes11th@gmail.com`

---

### reset password

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/reset-password`

**Body (URL Encoded):**

- `newPassword: aaaaaa`
- `confirmPassword: aaaaaa`
- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODI3MDEwLCJleHAiOjE3NDA4Mjc2MTB9.8prnFw3Y1492BAnW3oCf5mqv9dRP-rWKEwyE5TR9CLY`

---

### email update request

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/email-update-request`

**Body (URL Encoded):**

- `email: abdussabur929@gmail.com`
- `password: aaaaaa`

---

### email update

**Method:** `POST`

**URL:** `http://localhost:8888/api/teacher/email-update`

**Body (URL Encoded):**

- `token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyZGMxNzdlMjVmODJlMDE5NWY5ODkiLCJpYXQiOjE3NDA4MjcxNTUsImV4cCI6MTc0MDgyNzc1NX0.Zq1STlSOJQB6b9HNGz9uCdK8plzdrZ_TsU5FETTgJhU`

---

