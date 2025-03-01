const express = require("express");
const takingBookTeacherRouter = express.Router();
const { isAdmin, isTeacher } = require("../middleware/authentication.js");
const { takingRequestBookTeacher, cancelTakingRequestBookTeacher, approveTakingRequestBookTeacher, returnRequestBookTeacher, cancelReturnRequestBookTeacher, approveReturnRequestBookTeacher, getTeacherBorrowingRequests, getTeacherBorrowingRequestsByAdmin } = require("../controllers/bookTeacherController.js");

takingBookTeacherRouter.get( "/book-take-request/:id([0-9a-fA-F]{24})", isTeacher, takingRequestBookTeacher);
takingBookTeacherRouter.get( "/book-take-request-cancel/:id([0-9a-fA-F]{24})", isTeacher, cancelTakingRequestBookTeacher);
takingBookTeacherRouter.get( "/book-take-request-approve/:id([0-9a-fA-F]{24})", isAdmin, approveTakingRequestBookTeacher);
takingBookTeacherRouter.get( "/book-return-request/:id([0-9a-fA-F]{24})", isTeacher, returnRequestBookTeacher);
takingBookTeacherRouter.get( "/book-return-request-cancel/:id([0-9a-fA-F]{24})", isTeacher, cancelReturnRequestBookTeacher);
takingBookTeacherRouter.get( "/book-return-request-approve/:id([0-9a-fA-F]{24})", isAdmin, approveReturnRequestBookTeacher);
takingBookTeacherRouter.get( "/get-borrow-lists", isTeacher, getTeacherBorrowingRequests);
takingBookTeacherRouter.get( "/get-borrow-lists-admin", isAdmin, getTeacherBorrowingRequestsByAdmin);

module.exports = takingBookTeacherRouter;