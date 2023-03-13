import { CustomError } from "@utils/errors";
import StatusCodes from "http-status-codes";
import { errors } from "@constants";
import { userModel } from "@models/index";
const jwt = require("jsonwebtoken");
import Role from '@utils/role';

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];
function authenticate(username: any ,password:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET_TOKEN);
                const { password, ...userWithoutPassword } = user;
                resolve ({
                    ...userWithoutPassword,
                    token
                });
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}


function getAll(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            return users.map(u => {
                const { password, ...userWithoutPassword } = u;
                resolve ({userWithoutPassword});
            });
        } catch (err) {
            reject(err);
        }
    });
}

function getById(id: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const user = users.find(u => u.id === parseInt(id));
            if (!user) return;
            const { password, ...userWithoutPassword } = user;
            resolve ({userWithoutPassword});
        } catch (err) {
            reject(err);
        }
    });
}








// Export default
export default {
    authenticate,
    getAll,
    getById
} as const;
