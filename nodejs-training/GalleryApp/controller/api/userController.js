const userModel = require('./../../models/User');

const login = (req, res) => {
    res.json({
        sucess: true,
        access_token: '12345'
    });
};

const register = (req, res) => {
    res.json({
        success: true
    });
}

const show = (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(401).json({
            success: false,
            message: 'Unauthorize'
        });
    }
    
    res.json({
        success: true
    });
}

module.exports = {
    login,
    register,
    show
};