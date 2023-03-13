// const jwt = require("jsonwebtoken");
import { expressjwt, Request as JWTRequest } from 'express-jwt';
const secret = process.env.JWT_SECRET_TOKEN;



function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressjwt({ secret:"you jwt token", algorithms: ['HS256'] }),
        // authorize based on user role
        (req:any, res:any, next:any) => {
            if (roles.length && !roles.includes(req.user.role as never)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // authentication and authorization successful
            next();
        }
    ];
}

export default authorize;
