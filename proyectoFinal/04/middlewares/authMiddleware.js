export function isAuth(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    }else{
        res.json({status: "Not Authenticated"});
    }
}