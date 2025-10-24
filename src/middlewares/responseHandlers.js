function apiResponse(req, res, next) {
    res.success = (data, message = 'Success', statusCode = 200) => {
        res.status(statusCode).json({
            message,
            data,
        });
    };

    res.error = (errors, message = 'An error occurred', statusCode = 500) => {
        res.status(statusCode).json({
            success: false,
            message,
            errors: Array.isArray(errors) ? errors : [errors],
        })
    };

    return next();
}

export default apiResponse;