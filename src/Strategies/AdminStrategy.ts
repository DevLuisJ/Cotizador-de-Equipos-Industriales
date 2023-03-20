import { AuthenticationStrategy } from "@loopback/authentication";
import { RedirectRoute } from "@loopback/rest/dist/router/redirect-route";
import { HttpErrors, Request } from "@loopback/rest/";
import { UserProfile } from "@loopback/security";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import parseBearerToken from "parse-bearer-token";
import { service } from "@loopback/core/dist/service";
import { AutenticacionService } from "../services";
import { Usuario } from "../models";
import { Llaves } from "../Config/Llaves";



export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string = 'admin';

    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ){

    }
    async authenticate(request: Request):Promise<UserProfile | undefined>{
        let token = parseBearerToken(request);
        if(token){
            let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
            if(datos.data.id == Llaves.RolAdministrador){
                let perfil: UserProfile = Object.assign({
                nombre : datos.data.nombre
               })
                return perfil;
                              
            }else{
                throw new HttpErrors[401]("El token incluido no es valido");  
            }
        }else{
            throw new HttpErrors[401]("No se ha incluido un token en la solicitud");
        }
    }
        
    }
