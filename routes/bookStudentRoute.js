const express = require("express");
const takingBookStudentRouter = express.Router();
const { isAdmin, isStudent, isStudentApproved } = require("../middleware/authentication.js");
const { takingRequestBookStudent, cancelTakingRequestBookStudent, approveTakingRequestBookStudent, returnRequestBookStudent, cancelReturnRequestBookStudent, approveReturnRequestBookStudent, getStudentBorrowingRequests, getStudentBorrowingRequestsByAdmin } = require("../controllers/bookStudentController.js");

takingBookStudentRouter.get( "/book-take-request/:id([0-9a-fA-F]{24})", isStudentApproved, takingRequestBookStudent);
takingBookStudentRouter.get( "/book-take-request-cancel/:id([0-9a-fA-F]{24})", isStudentApproved, cancelTakingRequestBookStudent);
takingBookStudentRouter.get( "/book-take-request-approve/:id([0-9a-fA-F]{24})", isAdmin, approveTakingRequestBookStudent);
takingBookStudentRouter.get( "/book-return-request/:id([0-9a-fA-F]{24})", isStudentApproved, returnRequestBookStudent);
takingBookStudentRouter.get( "/book-return-request-cancel/:id([0-9a-fA-F]{24})", isStudentApproved, cancelReturnRequestBookStudent);
takingBookStudentRouter.get( "/book-return-request-approve/:id([0-9a-fA-F]{24})", isAdmin, approveReturnRequestBookStudent);
takingBookStudentRouter.get( "/get-borrow-lists", isStudent, getStudentBorrowingRequests);
takingBookStudentRouter.get( "/get-borrow-lists-admin", isAdmin, getStudentBorrowingRequestsByAdmin);

module.exports = takingBookStudentRouter;