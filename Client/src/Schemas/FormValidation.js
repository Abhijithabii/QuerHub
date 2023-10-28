import * as Yup from 'yup'

export const signupSchema = Yup.object({
    username : Yup.string().min(3).max(25).required("Enter Your Name"),
    email : Yup.string().email().required("Enter Your Email"),
    password : Yup.string().min(6).required("Enter Your Password"),
    confirm_password : Yup.string().required("Enter Your Password").oneOf([Yup.ref('password'), null], "Password Must Match")
});


export const loginSchema = Yup.object({
    email : Yup.string().email().required("Enter Your Email"),
    password : Yup.string().min(6).required("Enter Your Password"),
});