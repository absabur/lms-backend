const express = require("express");
const takingBookTeacherRouter = express.Router();
const { isAdmin, isTeacherApproved, isTeacher } = require("../middleware/authentication.js");
const { takingRequestBookTeacher, cancelTakingRequestBookTeacher, approveTakingRequestBookTeacher, returnRequestBookTeacher, cancelReturnRequestBookTeacher, approveReturnRequestBookTeacher, getTeacherBorrowingRequests, getTeacherBorrowingRequestsByAdmin, cancelTakingRequestBookTeacherByAdmin } = require("../controllers/bookTeacherController.js");

takingBookTeacherRouter.get( "/book-take-request/:id([0-9a-fA-F]{24})", isTeacherApproved, takingRequestBookTeacher);
takingBookTeacherRouter.get( "/book-take-request-cancel/:id([0-9a-fA-F]{24})", isTeacherApproved, cancelTakingRequestBookTeacher);
takingBookTeacherRouter.get( "/book-take-request-cancel-by-admin/:id([0-9a-fA-F]{24})", isAdmin, cancelTakingRequestBookTeacherByAdmin);
takingBookTeacherRouter.get( "/book-take-request-approve/:id([0-9a-fA-F]{24})/:bookNumber", isAdmin, approveTakingRequestBookTeacher);
takingBookTeacherRouter.get( "/book-return-request/:id([0-9a-fA-F]{24})", isTeacherApproved, returnRequestBookTeacher);
takingBookTeacherRouter.get( "/book-return-request-cancel/:id([0-9a-fA-F]{24})", isTeacherApproved, cancelReturnRequestBookTeacher);
takingBookTeacherRouter.get( "/book-return-request-approve/:id([0-9a-fA-F]{24})", isAdmin, approveReturnRequestBookTeacher);
takingBookTeacherRouter.get( "/get-borrow-lists", isTeacher, getTeacherBorrowingRequests);
takingBookTeacherRouter.get( "/get-borrow-lists-admin", isAdmin, getTeacherBorrowingRequestsByAdmin);

module.exports = takingBookTeacherRouter;