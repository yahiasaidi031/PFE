const { ValidateSignature } = require('../../utils');

module.exports = async (req, res, next) => {
    try {
        const isAuthorized = await ValidateSignature(req,'user');

        if (isAuthorized) {
            return next();
        }
        return res.status(403).json({ message: 'Not Authorized' });
    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}