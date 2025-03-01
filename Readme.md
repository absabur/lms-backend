```json

		{
			"name": "Admin",
			"routes": [
				{
					"name": "signup",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/signup"
					},
					"response": []
				},
				{
					"name": "register",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "password",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "verificationCode",
									"value": "628128",
									"type": "text"
								},
								{
									"key": "name",
									"value": "Test Student",
									"type": "text"
								},
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "01521710796",
									"type": "text"
								},
								{
									"key": "nId",
									"value": "1965256324",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": "/C:/Users/absab/Downloads/ab-sabur.png"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/register"
					},
					"response": []
				},
				{
					"name": "login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "bogura.polytechnic.library@gmail.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "111111",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/login"
					},
					"response": []
				},
				{
					"name": "logout",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/admin/logout"
					},
					"response": []
				},
				{
					"name": "profile",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/profile"
					},
					"response": []
				},
				{
					"name": "update password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "oldPassword",
									"value": "aaaaaa",
									"type": "text"
								},
								{
									"key": "newPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "111111",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/update-password"
					},
					"response": []
				},
				{
					"name": "update profile",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "name",
									"value": "change name",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "",
									"type": "text"
								},
								{
									"key": "nId",
									"value": "",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": "/C:/Users/absab/Downloads/1000003903.jpg"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/update-profile"
					},
					"response": []
				},
				{
					"name": "forgate password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/forgate-password"
					},
					"response": []
				},
				{
					"name": "reset password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "newPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODIxMjQ5LCJleHAiOjE3NDA4MjE4NDl9.orrRerFvfkwQ0IbUU483qKQ94Fg03bGcfJ9W6VeIVh4",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/reset-password"
					},
					"response": []
				},
				{
					"name": "email update request",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "abdussabur929@gmail.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "111111",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/email-update-request"
					},
					"response": []
				},
				{
					"name": "email update",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyY2RhY2MxMWU4MTE3ODdiZWQ0NDkiLCJpYXQiOjE3NDA4MjE1NjEsImV4cCI6MTc0MDgyMjE2MX0.TmW_urPzc_vMp9MjR_crIoDw8JS91FYP-vTKUpf8r74",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/email-update"
					},
					"response": []
				},
				{
					"name": "create student",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "password",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "name",
									"value": "test from admin",
									"type": "text"
								},
								{
									"key": "banglaName",
									"value": "ফ্রম অ্যাডমিন ",
									"type": "text"
								},
								{
									"key": "fathersName",
									"value": "test",
									"type": "text"
								},
								{
									"key": "mothersName",
									"value": "test",
									"type": "text"
								},
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "01758695425",
									"type": "text"
								},
								{
									"key": "addmissionRoll",
									"value": "121212",
									"type": "text"
								},
								{
									"key": "boardRoll",
									"value": "",
									"type": "text"
								},
								{
									"key": "registration",
									"value": "",
									"type": "text"
								},
								{
									"key": "technology",
									"value": "cst",
									"type": "text"
								},
								{
									"key": "session",
									"value": "2021",
									"type": "text"
								},
								{
									"key": "shift",
									"value": "2",
									"type": "text"
								},
								{
									"key": "district",
									"value": "bog",
									"type": "text"
								},
								{
									"key": "upazila",
									"value": "dup",
									"type": "text"
								},
								{
									"key": "union",
									"value": "zia",
									"type": "text"
								},
								{
									"key": "village",
									"value": "bor",
									"type": "text"
								},
								{
									"key": "address",
									"value": "last",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": "/C:/Users/absab/Downloads/IMG_20250217_112334.jpg"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/create-student"
					},
					"response": []
				},
				{
					"name": "update student",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "password",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "name",
									"value": "test rupdate from admin",
									"type": "text"
								},
								{
									"key": "banglaName",
									"value": "ফ্রম অ্যাডমিন ",
									"type": "text"
								},
								{
									"key": "fathersName",
									"value": "test",
									"type": "text"
								},
								{
									"key": "mothersName",
									"value": "test",
									"type": "text"
								},
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "01758695425",
									"type": "text"
								},
								{
									"key": "addmissionRoll",
									"value": "121212",
									"type": "text"
								},
								{
									"key": "boardRoll",
									"value": "",
									"type": "text"
								},
								{
									"key": "registration",
									"value": "",
									"type": "text"
								},
								{
									"key": "technology",
									"value": "cst",
									"type": "text"
								},
								{
									"key": "session",
									"value": "2021",
									"type": "text"
								},
								{
									"key": "shift",
									"value": "2",
									"type": "text"
								},
								{
									"key": "district",
									"value": "bog",
									"type": "text"
								},
								{
									"key": "upazila",
									"value": "dup",
									"type": "text"
								},
								{
									"key": "union",
									"value": "zia",
									"type": "text"
								},
								{
									"key": "village",
									"value": "bor",
									"type": "text"
								},
								{
									"key": "address",
									"value": "last",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": []
								}
							]
						},
						"url": "http://localhost:8888/api/admin/update-student/67c2d85b6b6341122934fe39"
					},
					"response": []
				},
				{
					"name": "all students",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/all-students"
					},
					"response": []
				},
				{
					"name": "get student",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/student-details/67c2d85b6b6341122934fe39"
					},
					"response": []
				},
				{
					"name": "approve student",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/approve-student/67c2d85b6b6341122934fe39"
					},
					"response": []
				},
				{
					"name": "ban student",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/ban-student/67c2d85b6b6341122934fe39"
					},
					"response": []
				},
				{
					"name": "unban student",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/unban-student/67c2d85b6b6341122934fe39"
					},
					"response": []
				},
				{
					"name": "create teacher",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "password",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "name",
									"value": "test teacher",
									"type": "text"
								},
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "015635478569",
									"type": "text"
								},
								{
									"key": "nId",
									"value": "465424",
									"type": "text"
								},
								{
									"key": "department",
									"value": "cst",
									"type": "text"
								},
								{
									"key": "post",
									"value": "ji",
									"type": "text"
								},
								{
									"key": "teacherId",
									"value": "6425205",
									"type": "text"
								},
								{
									"key": "address",
									"value": "bd",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": "/C:/Users/absab/Downloads/rahad.jpg"
								}
							]
						},
						"url": "http://localhost:8888/api/admin/create-teacher"
					},
					"response": []
				},
				{
					"name": "update teacher",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "password",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "name",
									"value": "test teacher updated",
									"type": "text"
								},
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "015635478569",
									"type": "text"
								},
								{
									"key": "nId",
									"value": "465424",
									"type": "text"
								},
								{
									"key": "department",
									"value": "cst",
									"type": "text"
								},
								{
									"key": "post",
									"value": "ji",
									"type": "text"
								},
								{
									"key": "teacherId",
									"value": "6425205",
									"type": "text"
								},
								{
									"key": "address",
									"value": "bd",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": []
								}
							]
						},
						"url": "http://localhost:8888/api/admin/update-teacher/67c2dc177e25f82e0195f989"
					},
					"response": []
				},
				{
					"name": "all teacher",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/all-teachers"
					},
					"response": []
				},
				{
					"name": "get teacher by id",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/teacher-details/67c2dc177e25f82e0195f989"
					},
					"response": []
				},
				{
					"name": "approve-teacher",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/approve-teacher/67c2dc177e25f82e0195f989"
					},
					"response": []
				},
				{
					"name": "ban teacher",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/ban-teacher/67c2dc177e25f82e0195f989"
					},
					"response": []
				},
				{
					"name": "unban teacher",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/unban-teacher/67c2dc177e25f82e0195f989"
					},
					"response": []
				},
				{
					"name": "all admin",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/all-admins"
					},
					"response": []
				},
				{
					"name": "get admin",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/admin-details/67c2cdacc11e811787bed449"
					},
					"response": []
				},
				{
					"name": "approve admin",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/approve-admin/67c2cdacc11e811787bed449"
					},
					"response": []
				},
				{
					"name": "ban admin",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/ban-admin/67c2cdacc11e811787bed449"
					},
					"response": []
				},
				{
					"name": "unban admin",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/admin/unban-admin/67c2cdacc11e811787bed449"
					},
					"response": []
				}
			]
		},
		{
			"name": "Book",
			"routes": [
				{
					"name": "create book",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "bookName",
									"value": " Introduction to Algorithms",
									"type": "text"
								},
								{
									"key": "bookAuthor",
									"value": " Thomas H. Cormen",
									"type": "text"
								},
								{
									"key": "publisher",
									"value": " MIT Press",
									"type": "text"
								},
								{
									"key": "edition",
									"value": " 4th",
									"type": "text"
								},
								{
									"key": "numberOfPages",
									"value": " 1312",
									"type": "text"
								},
								{
									"key": "country",
									"value": " USA",
									"type": "text"
								},
								{
									"key": "language",
									"value": " English",
									"type": "text"
								},
								{
									"key": "mrp",
									"value": " 1200",
									"type": "text"
								},
								{
									"key": "shelf",
									"value": " A-3",
									"type": "text"
								},
								{
									"key": "bookNumber",
									"value": " B001",
									"type": "text"
								},
								{
									"key": "category",
									"value": " Computer Science",
									"type": "text"
								},
								{
									"key": "quantity",
									"value": " 5",
									"type": "text"
								},
								{
									"key": "description",
									"value": " A comprehensive textbook on algorithms covering a wide range of topics including data structures, graph algorithms, sorting, and more.",
									"type": "text"
								},
								{
									"key": "bookNumbers",
									"value": "001.01, 001.02, 001.03, 001.04, 001.05",
									"type": "text"
								},
								{
									"key": "images",
									"type": "file",
									"src": [
										"/C:/Users/absab/Downloads/wall.jpg",
										"/C:/Users/absab/Downloads/wal.jpg",
										"/C:/Users/absab/Downloads/wal - Copy.jpg"
									]
								}
							]
						},
						"url": "http://localhost:8888/api/book/add-book"
					},
					"response": []
				},
				{
					"name": "update-book",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "bookName",
									"value": " Introduction to Algorithms",
									"type": "text"
								},
								{
									"key": "bookAuthor",
									"value": " Thomas H. Cormen",
									"type": "text"
								},
								{
									"key": "publisher",
									"value": " MIT Press",
									"type": "text"
								},
								{
									"key": "edition",
									"value": " 4th",
									"type": "text"
								},
								{
									"key": "numberOfPages",
									"value": " 1310",
									"type": "text"
								},
								{
									"key": "country",
									"value": " USA",
									"type": "text"
								},
								{
									"key": "language",
									"value": " English",
									"type": "text"
								},
								{
									"key": "mrp",
									"value": " 1200",
									"type": "text"
								},
								{
									"key": "shelf",
									"value": " A-3",
									"type": "text"
								},
								{
									"key": "bookNumber",
									"value": " B001",
									"type": "text"
								},
								{
									"key": "category",
									"value": " Computer Science",
									"type": "text"
								},
								{
									"key": "quantity",
									"value": "",
									"type": "text"
								},
								{
									"key": "description",
									"value": " A comprehensive textbook on algorithms covering a wide range of topics including data structures, graph algorithms, sorting, and more.",
									"type": "text"
								},
								{
									"key": "bookNumbers",
									"value": "001.01, 001.02, 001.03, 001.04, 001.05",
									"type": "text"
								},
								{
									"key": "images",
									"value": "",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/book/update-book/67c2f532f9ce5b08f89f1d92"
					},
					"response": []
				},
				{
					"name": "all books",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/book/all-books"
					},
					"response": []
				},
				{
					"name": "get book",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/book/get-book/67c2f29f54b4e981a7f41066"
					},
					"response": []
				}
			]
		},
		{
			"name": "BookStudent",
			"routes": [
				{
					"name": "book take req",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/student/book-take-request/67c2f532f9ce5b08f89f1d92"
					},
					"response": []
				},
				{
					"name": "book take req cancel",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/student/book-take-request-cancel/67c2f9cdbbb9cc2dafda0e0c"
					},
					"response": []
				},
				{
					"name": "book take req approve",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/student/book-take-request-approve/67c3005df97e683036297deb"
					},
					"response": []
				},
				{
					"name": "book return req",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/student/book-return-request/67c3005df97e683036297deb"
					},
					"response": []
				},
				{
					"name": "book return req cancel",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/student/book-return-request-cancel/67c3005df97e683036297deb"
					},
					"response": []
				},
				{
					"name": "book return req approve",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/student/book-return-request-approve/67c3005df97e683036297deb"
					},
					"response": []
				},
				{
					"name": "borrow list",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/student/get-borrow-lists"
					},
					"response": []
				},
				{
					"name": "borrow list admin",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/student/get-borrow-lists-admin"
					},
					"response": []
				}
			]
		},
		{
			"name": "BookTeacher",
			"routes": [
				{
					"name": "book take req",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/teacher/book-take-request/id"
					},
					"response": []
				},
				{
					"name": "book take req cancel",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/teacher/book-take-request-cancel/id"
					},
					"response": []
				},
				{
					"name": "book take req appreve",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/teacher/book-take-request-approve/id"
					},
					"response": []
				},
				{
					"name": "book return req",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/teacher/book-return-request/id"
					},
					"response": []
				},
				{
					"name": "book return req cancel",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/teacher/book-return-request-cancel/id"
					},
					"response": []
				},
				{
					"name": "book return req approve",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/teacher/book-return-request-approve/id"
					},
					"response": []
				},
				{
					"name": "borrow list",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/teacher/get-borrow-lists"
					},
					"response": []
				},
				{
					"name": "borrow list admin",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/take-book/teacher/get-borrow-lists-admin"
					},
					"response": []
				}
			]
		},
		{
			"name": "FixedValue",
			"routes": [
				{
					"name": "create country",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/country"
					},
					"response": []
				},
				{
					"name": "all countries",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/countries"
					},
					"response": []
				},
				{
					"name": "create language",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/language"
					},
					"response": []
				},
				{
					"name": "all languages",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/languages"
					},
					"response": []
				},
				{
					"name": "create shelf",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/shelf"
					},
					"response": []
				},
				{
					"name": "all shelves",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/shelves"
					},
					"response": []
				},
				{
					"name": "create department",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/department"
					},
					"response": []
				},
				{
					"name": "all departments",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/departments"
					},
					"response": []
				},
				{
					"name": "create technology",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/technology"
					},
					"response": []
				},
				{
					"name": "all technologies",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/technologies"
					},
					"response": []
				},
				{
					"name": "create category",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/category"
					},
					"response": []
				},
				{
					"name": "all categories",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/categories"
					},
					"response": []
				},
				{
					"name": "create session",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/session"
					},
					"response": []
				},
				{
					"name": "all sessions",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/sessions"
					},
					"response": []
				},
				{
					"name": "create shift",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/shift"
					},
					"response": []
				},
				{
					"name": "all shifts",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/shifts"
					},
					"response": []
				},
				{
					"name": "create district",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/district"
					},
					"response": []
				},
				{
					"name": "all districts",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/districts"
					},
					"response": []
				},
				{
					"name": "create upazila",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/upazila"
					},
					"response": []
				},
				{
					"name": "all upazilas",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/upazilas"
					},
					"response": []
				},
				{
					"name": "create post",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/post"
					},
					"response": []
				},
				{
					"name": "all posts",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/fixed-values/posts"
					},
					"response": []
				}
			]
		},
		{
			"name": "Student",
			"routes": [
				{
					"name": "signup",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/student/signup"
					},
					"response": []
				},
				{
					"name": "register",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "password",
									"value": "",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "",
									"type": "text"
								},
								{
									"key": "verificationCode",
									"value": "",
									"type": "text"
								},
								{
									"key": "name",
									"value": "",
									"type": "text"
								},
								{
									"key": "banglaName",
									"value": "",
									"type": "text"
								},
								{
									"key": "fathersName",
									"value": "",
									"type": "text"
								},
								{
									"key": "mothersName",
									"value": "",
									"type": "text"
								},
								{
									"key": "email",
									"value": "",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "",
									"type": "text"
								},
								{
									"key": "addmissionRoll",
									"value": "",
									"type": "text"
								},
								{
									"key": "boardRoll",
									"value": "",
									"type": "text"
								},
								{
									"key": "registration",
									"value": "",
									"type": "text"
								},
								{
									"key": "technology",
									"value": "",
									"type": "text"
								},
								{
									"key": "session",
									"value": "",
									"type": "text"
								},
								{
									"key": "shift",
									"value": "",
									"type": "text"
								},
								{
									"key": "district",
									"value": "",
									"type": "text"
								},
								{
									"key": "upazila",
									"value": "",
									"type": "text"
								},
								{
									"key": "union",
									"value": "",
									"type": "text"
								},
								{
									"key": "village",
									"value": "",
									"type": "text"
								},
								{
									"key": "address",
									"value": "",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": []
								}
							]
						},
						"url": "http://localhost:8888/api/student/register"
					},
					"response": []
				},
				{
					"name": "login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "abdussabur929@gmail.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "aaaaaa",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/student/login"
					},
					"response": []
				},
				{
					"name": "logout",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/student/logout"
					},
					"response": []
				},
				{
					"name": "profile",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/student/profile"
					},
					"response": []
				},
				{
					"name": "update password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "oldPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "newPassword",
									"value": "aaaaaa",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "aaaaaa",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/student/update-password"
					},
					"response": []
				},
				{
					"name": "update profile",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "name",
									"value": "test rupdate from user",
									"type": "text"
								},
								{
									"key": "banglaName",
									"value": "ফ্রম",
									"type": "text"
								},
								{
									"key": "fathersName",
									"value": "test",
									"type": "text"
								},
								{
									"key": "mothersName",
									"value": "test",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "01758695425",
									"type": "text"
								},
								{
									"key": "addmissionRoll",
									"value": "121212",
									"type": "text"
								},
								{
									"key": "boardRoll",
									"value": "",
									"type": "text"
								},
								{
									"key": "registration",
									"value": "",
									"type": "text"
								},
								{
									"key": "technology",
									"value": "cst",
									"type": "text"
								},
								{
									"key": "session",
									"value": "2021",
									"type": "text"
								},
								{
									"key": "shift",
									"value": "2",
									"type": "text"
								},
								{
									"key": "district",
									"value": "bog",
									"type": "text"
								},
								{
									"key": "upazila",
									"value": "dup",
									"type": "text"
								},
								{
									"key": "union",
									"value": "zia",
									"type": "text"
								},
								{
									"key": "village",
									"value": "bor",
									"type": "text"
								},
								{
									"key": "address",
									"value": "last",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": "/C:/Users/absab/Downloads/file (1).png"
								}
							]
						},
						"url": "http://localhost:8888/api/student/update-profile"
					},
					"response": []
				},
				{
					"name": "forgate password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/student/forgate-password"
					},
					"response": []
				},
				{
					"name": "reset password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "newPassword",
									"value": "aaaaaa",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "aaaaaa",
									"type": "text"
								},
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODI1MzE0LCJleHAiOjE3NDA4MjU5MTR9.mWUVTCqIT3x34u1044BE7jZdIcy63jPYyb6cjmKXI-s",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/student/reset-password"
					},
					"response": []
				},
				{
					"name": "email update request",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "abdussabur929@gmail.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "aaaaaa",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/student/email-update-request"
					},
					"response": []
				},
				{
					"name": "email update",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyZDg1YjZiNjM0MTEyMjkzNGZlMzkiLCJpYXQiOjE3NDA4MjU1NzgsImV4cCI6MTc0MDgyNjE3OH0.TVCFPKZolPecIAKBOP__RnwNMBL9DYePxypT6a235EY",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/student/email-update"
					},
					"response": []
				}
			]
		},
		{
			"name": "Teacher",
			"routes": [
				{
					"name": "signup",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/signup"
					},
					"response": []
				},
				{
					"name": "register",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "password",
									"value": "",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "",
									"type": "text"
								},
								{
									"key": "verificationCode",
									"value": "",
									"type": "text"
								},
								{
									"key": "name",
									"value": "",
									"type": "text"
								},
								{
									"key": "email",
									"value": "",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "",
									"type": "text"
								},
								{
									"key": "nId",
									"value": "",
									"type": "text"
								},
								{
									"key": "department",
									"value": "",
									"type": "text"
								},
								{
									"key": "post",
									"value": "",
									"type": "text"
								},
								{
									"key": "teacherId",
									"value": "",
									"type": "text"
								},
								{
									"key": "address",
									"value": "",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": []
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/register"
					},
					"response": []
				},
				{
					"name": "login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "abdussabur929@gmail.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "aaaaaa",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/login"
					},
					"response": []
				},
				{
					"name": "logout",
					"request": {
						"method": "POST",
						"header": [],
						"url": "http://localhost:8888/api/teacher/logout"
					},
					"response": []
				},
				{
					"name": "profile",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:8888/api/teacher/profile"
					},
					"response": []
				},
				{
					"name": "update password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "oldPassword",
									"value": "111111",
									"type": "text"
								},
								{
									"key": "newPassword",
									"value": "aaaaaa",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "aaaaaa",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/update-password"
					},
					"response": []
				},
				{
					"name": "update profile",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "name",
									"value": "test teacher updated as teacher",
									"type": "text"
								},
								{
									"key": "phone",
									"value": "015635478569",
									"type": "text"
								},
								{
									"key": "nId",
									"value": "465424",
									"type": "text"
								},
								{
									"key": "department",
									"value": "cst",
									"type": "text"
								},
								{
									"key": "post",
									"value": "ji",
									"type": "text"
								},
								{
									"key": "teacherId",
									"value": "6425205",
									"type": "text"
								},
								{
									"key": "address",
									"value": "bd",
									"type": "text"
								},
								{
									"key": "image",
									"type": "file",
									"src": []
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/update-profile"
					},
					"response": []
				},
				{
					"name": "forgate password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "efootballpes11th@gmail.com",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/forgate-password"
					},
					"response": []
				},
				{
					"name": "reset password",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "newPassword",
									"value": "aaaaaa",
									"type": "text"
								},
								{
									"key": "confirmPassword",
									"value": "aaaaaa",
									"type": "text"
								},
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmb290YmFsbHBlczExdGhAZ21haWwuY29tIiwiaWF0IjoxNzQwODI3MDEwLCJleHAiOjE3NDA4Mjc2MTB9.8prnFw3Y1492BAnW3oCf5mqv9dRP-rWKEwyE5TR9CLY",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/reset-password"
					},
					"response": []
				},
				{
					"name": "email update request",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "abdussabur929@gmail.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "aaaaaa",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/email-update-request"
					},
					"response": []
				},
				{
					"name": "email update",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVzc2FidXI5MjlAZ21haWwuY29tIiwiaWQiOiI2N2MyZGMxNzdlMjVmODJlMDE5NWY5ODkiLCJpYXQiOjE3NDA4MjcxNTUsImV4cCI6MTc0MDgyNzc1NX0.Zq1STlSOJQB6b9HNGz9uCdK8plzdrZ_TsU5FETTgJhU",
									"type": "text"
								}
							]
						},
						"url": "http://localhost:8888/api/teacher/email-update"
					},
					"response": []
				}
			]
		}
```
