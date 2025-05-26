const express = require("express");
const takingBookStudentRouter = express.Router();
const { isAdmin, isStudent } = require("../middleware/authentication.js");
const { takingRequestBookStudent, cancelTakingRequestBookStudent, approveTakingRequestBookStudent, returnRequestBookStudent, cancelReturnRequestBookStudent, approveReturnRequestBookStudent, getStudentBorrowingRequests, getStudentBorrowingRequestsByAdmin, cancelTakingRequestBookStudentByAdmin, assignBookDirectlyStudent, returnBookDirectlyStudent } = require("../controllers/bookStudentController.js");

takingBookStudentRouter.get( "/book-take-request/:id([0-9a-fA-F]{24})", isStudent, takingRequestBookStudent);
takingBookStudentRouter.get( "/book-take-request-cancel/:id([0-9a-fA-F]{24})", isStudent, cancelTakingRequestBookStudent);
takingBookStudentRouter.get( "/book-take-request-cancel-by-admin/:id([0-9a-fA-F]{24})", isAdmin, cancelTakingRequestBookStudentByAdmin);
takingBookStudentRouter.get( "/book-take-request-approve/:id([0-9a-fA-F]{24})/:bookNumber", isAdmin, approveTakingRequestBookStudent);
takingBookStudentRouter.get( "/assign-book-directly/:student([0-9a-fA-F]{24})/:book([0-9a-fA-F]{24})/:bookNumber", isAdmin, assignBookDirectlyStudent);
takingBookStudentRouter.get( "/book-return-request/:id([0-9a-fA-F]{24})", isStudent, returnRequestBookStudent);
takingBookStudentRouter.get( "/book-return-request-cancel/:id([0-9a-fA-F]{24})", isStudent, cancelReturnRequestBookStudent);
takingBookStudentRouter.get( "/book-return-request-approve/:id([0-9a-fA-F]{24})", isAdmin, approveReturnRequestBookStudent);
takingBookStudentRouter.get( "/return-book-directly/:id([0-9a-fA-F]{24})", isAdmin, returnBookDirectlyStudent);
takingBookStudentRouter.get( "/get-borrow-lists", isStudent, getStudentBorrowingRequests);
takingBookStudentRouter.get( "/get-borrow-lists-admin", isAdmin, getStudentBorrowingRequestsByAdmin);

module.exports = takingBookStudentRouter;