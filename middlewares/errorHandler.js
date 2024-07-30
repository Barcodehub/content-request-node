module.exports = (err, req, res, next) => {
    console.error(err.stack);
    
    const status = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
  
    res.status(status).json({
      success: false,
      status,
      message,
    });
  };