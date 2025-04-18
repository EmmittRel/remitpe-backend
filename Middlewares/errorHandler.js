const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Resource not found with the specified ID'
      });
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate field value entered'
      });
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages
      });
    }
  
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  };
  
  module.exports = errorHandler;