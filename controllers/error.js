class ErrorHandler {
        constructor(status , message){
            this.status = status || 500;
            this.message = message || "internal Server Error";
        }
}

function handleError (err,req,res,next) {
    var {status,message} = err ;

    if(status == 500) {
        console.log('[ERROR MIDDLEWARE] : ' + message  )
        console.trace();
        message = "INTERNAL_SERVER_ERROR"
    }
    
   return res.status(status || 500).json({
        status : "Error",
        Code : status,
        message : message ,
    })

}

    module.exports = {
        ErrorHandler,
        handleError
    }

