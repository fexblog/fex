

function requestLog(req, res, next) {
  this.Logger.log("debug", ""+new Date()+" "+req.method+": "+req.url);
  next();
}


module.exports = {
    "callable": requestLog,
    "type": "middleware",
    "bind": true
};

