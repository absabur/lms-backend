const express = require("express");
const takingBookTeacherRouter = express.Router();
const { isAdmin, isTeacher } = require("../middleware/authentication.js");
const { takingRequestBookTeacher, cancelTakingRequestBookTeacher, approveTakingRequestBookTeacher, returnRequestBookTeacher, cancelReturnRequestBookTeacher, approveReturnRequestBookTeacher, getTeacherBorrowingRequests, getTeacherBorrowingRequestsByAdmin, cancelTakingRequestBookTeacherByAdmin, assignBookDirectlyTeacher, returnBookDirectlyTeacher } = require("../controllers/bookTeacherController.js");

takingBookTeacherRouter.get( "/book-take-request/:id([0-9a-fA-F]{24})", isTeacher, takingRequestBookTeacher);
takingBookTeacherRouter.get( "/book-take-request-cancel/:id([0-9a-fA-F]{24})", isTeacher, cancelTakingRequestBookTeacher);
takingBookTeacherRouter.get( "/book-take-request-cancel-by-admin/:id([0-9a-fA-F]{24})", isAdmin, cancelTakingRequestBookTeacherByAdmin);
takingBookTeacherRouter.get( "/book-take-request-approve/:id([0-9a-fA-F]{24})/:bookNumber", isAdmin, approveTakingRequestBookTeacher);
takingBookTeacherRouter.get( "/assign-book-directly/:teacher([0-9a-fA-F]{24})/:book([0-9a-fA-F]{24})/:bookNumber", isAdmin, assignBookDirectlyTeacher);
takingBookTeacherRouter.get( "/book-return-request/:id([0-9a-fA-F]{24})", isTeacher, returnRequestBookTeacher);
takingBookTeacherRouter.get( "/book-return-request-cancel/:id([0-9a-fA-F]{24})", isTeacher, cancelReturnRequestBookTeacher);
takingBookTeacherRouter.get( "/book-return-request-approve/:id([0-9a-fA-F]{24})", isAdmin, approveReturnRequestBookTeacher);
takingBookTeacherRouter.get( "/return-book-directly/:id([0-9a-fA-F]{24})", isAdmin, returnBookDirectlyTeacher);
takingBookTeacherRouter.get( "/get-borrow-lists", isTeacher, getTeacherBorrowingRequests);
takingBookTeacherRouter.get( "/get-borrow-lists-admin", isAdmin, getTeacherBorrowingRequestsByAdmin);

module.exports = takingBookTeacherRouter;