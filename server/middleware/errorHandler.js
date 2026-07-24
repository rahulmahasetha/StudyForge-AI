/**
 * Global Error Handler Middleware
 * Intercepts all errors thrown in routes and formats them securely before sending to the client.
 */
const errorHandler = (err, req, res, next) => {
  console.error('[Error]:', err.message);

  // If the error comes from our custom application logic, we might throw it with a specific status code
  const statusCode = err.statusCode || 500;
  
  // Security Consideration: Never expose raw stack traces or internal server details to the client in production
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    // Provide a hint for user-facing errors if applicable
    details: err.details || null
  });
};

module.exports = { errorHandler };
