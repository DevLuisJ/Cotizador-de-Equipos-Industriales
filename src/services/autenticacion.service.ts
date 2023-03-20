import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
import { Llaves } from '../Config/Llaves';
const generador = require("generate-password");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave(): any{
    let clave = generador.generate({
      lenght:8,
      numbers:true
    });
    return clave
  }

  CifrarClave(clave:String){
    let claveCifrada = cryptojs.MD5(clave);
    return claveCifrada;
  }

  IdentificarUsuario(usuario:String, clave:String){
    try {
      let u = this.usuarioRepository.findOne({where:{email :usuario, password :clave}});
      if (u){
        return u;
      }
      return false
    } catch {
      return false
    }
  }

  GenerarTokenJWT(usuario: Usuario){
    let token = jwt.sign({
      data:{
        id:usuario.id,
        email: usuario.email,
        nombre: usuario.nombre + " " + usuario.apellidos
        
      }
      
    },
    Llaves.claveJWT);
    return token;
  }
  ValidarTokenJWT(token:String){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false
    }
  }

  
}
