const {signup,signin,getuser}=require('../controllers/auth-controller.js')
const router=require('express').Router()
const jwt=require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ login: false, message: 'No token provided.' });
    jwt.verify(token, 'authentication-token', (err, decoded) => {
    if (err)
        return res.status(500).send({ login: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
    });
};

router.post('/SignUp',signup)
router.post('/SignIn',signin)
router.get('/getuser',verifyToken,getuser)
module.exports=router;