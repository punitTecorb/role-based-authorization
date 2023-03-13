import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
const { CREATED, OK } = StatusCodes;
import { success } from '@constants';
import userService from '@controllers/user';
import authorize from '@utils/authorize';
import Role from '@utils/role';

// Constants
const router = Router();
// routes
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize(Role.Admin), getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users


function authenticate(req:any, res:any, next:any) {
    userService.authenticate(req.body.username,req.body.password)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req:any, res:any, next:any) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req:any, res:any, next:any) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}




// Export default
export default router;
