import { Router } from "express";
import { createUser, deletUser, getUser, getUsers, updateUser } from "../controllers/user";


const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id',deletUser);




export default router;