import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = "clave_secreta"; // luego usa .env

// REGISTRO
export const register = async (req, res) => { //creamos la contaste registro
    try {
        const { nombre, email, password } = req.body; //creamos una constante de la cual campitaros los campos 

        const existUser = await User.findOne({ email }); //hacemos un await para confirmar que el emaiol no exista
        if (existUser) {
            return res.status(400).json({ message: "El usuario ya existe" }); //SI EXISTE DEVUELVE UN MENSAJE
        }

        const hashedPassword = await bcrypt.hash(password, 10); //hacemos un await para usar bcrypt.hashed para incriptar la cable

        const user = await User.create({
            nombre,
            email,
            password: hashedPassword
        }); // Aqui creamos el usario con las variables ingresadas y encryptamos la clave con la funcion anterior

        res.status(201).json({ message: "Usuario registrado" }); //mensajito de confirmacion

    } catch (error) {
        res.status(500).json({ message: error.message }); // mensajito si todo fallo
    }
};

// LOGIN
export const login = async (req, res) => { //creamos la constante del login
    try {
        const { email, password } = req.body; // hacemos que una funcion capture las variables de los campos

        const user = await User.findOne({ email }); //Buscamos si el emial existe
        if (!user) {
            return res.status(400).json({ message: "Usuario no existe" }); //si el email no coincide lanza una alerta
        }

        const isMatch = await bcrypt.compare(password, user.password); //hacemos lo mismo pero ahora con la contrase{a}
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" }); //mensajito
        }

        const token = jwt.sign(
            { id: user._id },
            SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, user }); //se crea el token de la entrada del ussuario

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};