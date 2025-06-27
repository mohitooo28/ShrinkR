const createErrorResponse = (message, statusCode = 500, code = 'INTERNAL_ERROR', details = null) => {
    const error = {
        error: {
            message,
            code,
            statusCode,
            timestamp: new Date().toISOString()
        }
    };
    
    if (details) {
        error.error.details = details;
    }
    
    return error;
};

const createSuccessResponse = (data, message = 'Success', meta = null) => {
    const response = {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
    
    if (meta) {
        response.meta = meta;
    }
    
    return response;
};

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let code = err.code || 'INTERNAL_ERROR';
    
    if (err.code === 11000) {
        statusCode = 409;
        message = 'Resource already exists';
        code = 'DUPLICATE_RESOURCE';
    }
    
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation error';
        code = 'VALIDATION_ERROR';
    }
    
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
        code = 'INVALID_ID';
    }
    
    const errorResponse = createErrorResponse(message, statusCode, code);
    
    res.status(statusCode).json(errorResponse);
};

const notFoundHandler = (req, res) => {
    const errorResponse = createErrorResponse(
        `Route ${req.originalUrl} not found`,
        404,
        'ROUTE_NOT_FOUND'
    );
    
    res.status(404).json(errorResponse);
};

module.exports = {
    createErrorResponse,
    createSuccessResponse,
    errorHandler,
    notFoundHandler
};
