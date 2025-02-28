const errorResponse = (res, {statusCode = 500, message = "server error."}) => {
    return res.status(statusCode).json({
        success: false,
        error: message,
    })
} 



module.exports = { errorResponse }