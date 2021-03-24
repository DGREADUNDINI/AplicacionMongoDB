import User from "../models/User.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("users/signup");

export const singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas son diferentes" });
  }
  if (password.length < 4) {
    errors.push({ text: "La contraseña es mas corta de 4 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    // email ya verificado
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "Este email ya esta en uso");
      res.redirect("/users/signup");
    } else {
      // guardar nuevo usuario vvvvv
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Estas registrado");
      res.redirect("/users/signin");
    }
  }
};

export const renderSigninForm = (req, res) => res.render("users/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

export const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Adios uwu");
  res.redirect("/users/signin");
};
