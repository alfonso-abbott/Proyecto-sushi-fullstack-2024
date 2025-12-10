//export const registro = (req,res) => res.send('Registro000')
import Usuarios from "../modelos/modelo.js"

export const registro = async (req,res) => {
  const {nombre, email, password} = req.body
  try{
    const nuevoUsuario = new Usuarios({
        nombre,
        email,
        password
    })


    await nuevoUsuario.save()
    //console.log(nuevoUsuario)
    //console.log(nombre, email, password)
    res.send("Registrando")
  }catch(error){
    console.log(error)
  }
}


export const login = (req,res) => res.send('Login')
