import { NextFunction, Request,Response  } from "express";
import { getCustomRepository } from "typeorm";
import { UsuarioRepository } from "../../../repositories/UsuarioRepository";
import Resposta from "../../util/message";
import { statusCode } from "../../util/statusCode";



export const VerificandoSeUsuarioNaoExiste= async (numeroDeIdentificacao=undefined,response:Response, request:Request,next:NextFunction)=>{
 
  console.log(numeroDeIdentificacao)
  const usuarioRepository = getCustomRepository(UsuarioRepository);
  const numeroDeIdentificacaoExist= await usuarioRepository.findOne({ numeroDeIdentificacao});
 
  if (!numeroDeIdentificacaoExist){
    return response.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado))
 
  }
 return next
}


export const VerificandoSeUsuarioJaExiste= async (numeroDeIdentificacao=undefined,response:Response, request:Request,next:NextFunction)=>{
 try {
  
  console.log(numeroDeIdentificacao)
  const usuarioRepository = getCustomRepository(UsuarioRepository);
  const numeroDeIdentificacaoExist= await usuarioRepository.findOne({ numeroDeIdentificacao});
  console.log(numeroDeIdentificacaoExist)
  
  if (numeroDeIdentificacaoExist){
   return response.status(statusCode.naoEncontrado).json(Resposta(statusCode.naoEncontrado))
 
  }
  
  return 
  response.setHeader('Content-type','application/json')
 
 } catch (error) {
  console.log(error)
  return response.status(statusCode.erroInterno).json(Resposta(statusCode.erroInterno))
 
 }
}


 