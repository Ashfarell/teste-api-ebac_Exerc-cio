const Joi = require ('joi')

const usuariosSchema = Joi.object({                 //As propriedades (nome, email, id, etc.) que existem no teste devem estar no arquivo
    quantidade: Joi.number(),                       //Outra opção é “.unknown(true)” ⇒Senão quiser validar o campo password (ou qualquer 
    usuarios: Joi.array().items({
    nome: Joi.string(),
    email:Joi.string(),   
    password: Joi.string(), 
    administrador: Joi.string(),                       //Number = integer (n/ existe no Joy)
    _id: Joi.string()
    })
})
export default usuariosSchema;