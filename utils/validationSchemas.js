import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Ingresa un campo valido').required("Este campo es requerido"),
  password: Yup.string().min(8, 'Contrasena muy corta!, minimo de 8 caracteres'),
})

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Este campo es requerido'),
  email: Yup.string().email('Ingresa un campo valido').required("Este campo es requerido"),
  password: Yup.string().min(8, 'Contrasena muy corta!, minimo de 8 caracteres'),
  confirmationPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contrasenas deben coincidir!').required('Este campo es requerido')
})
