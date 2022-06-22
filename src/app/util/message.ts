import { Response } from "express"

 const mensagem=[
  {
    status:200,
    mensagem:"ação bem sucedida!"
  },
  {
    status:201,
    mensagem:"Criado com sucesso!"
  },
  {
    status:404,
    mensagem:"dados não encontrado!"
  },
  {
    status:500,
    mensagem:"ocorreu um erro inesperado!"
  },
  {
    status:401,
    mensagem:"esta ação não pode ser realizada!"
  },
  {
    status:402,
    mensagem:"você não tem permissão para executar esta acção!"
  },
  {
    status:400,
  
    mensagem:"preenha os dados correctamente!"
  },
  {
    status:401,
    tipo:'duplicação de dados',
    mensagem:"Já existe!"
  }
]

 

const Resposta = (status=200,tipo=undefined)=>{
  try {
    console.log('Executei')
  const resposta= mensagem.find(statu=>statu.status===status && statu?.tipo===tipo)
   return resposta
  } catch (error) {
    
    return mensagem.find(status=> status.status===500)  }
}

export default Resposta
