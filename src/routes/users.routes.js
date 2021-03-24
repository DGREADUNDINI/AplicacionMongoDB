import { Router } from "express";
import {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout,
} from "../controllers/users.controller.js";

const router = Router();
router.get("/users/signup", renderSignUpForm);// rutas

router.post("/users/signup", singup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

export default router;
