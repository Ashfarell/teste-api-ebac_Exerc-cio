const Joi = require ('joi')

const produtosSchema = Joi.object({                 //As propriedades (preço, qtd, id, etc.) que existem no teste devem estar no arquivo    
    quantidade: Joi.number(),                       //Outra opção é “.unknown(true)” ⇒Senão quiser validar o campo password (ou qualquer 
    produtos: Joi.array().items({
    nome: Joi.string(),
    preco:Joi.number(),                            //Number = integer (n/ existe no Joy)
    descricao: Joi.string(),
    quantidade: Joi.number(),                       //qtd de cada itens cadastrados
    _id: Joi.string()
    })
})
export default produtosSchema;