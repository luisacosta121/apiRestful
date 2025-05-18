import dotenv from 'dotenv'

//dotenv.config()
dotenv.config()

const PORT = process.env.PORT || 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || '' // 'MEM', 'FILE', 'MONGODB'

export default {
    PORT,
    MODO_PERSISTENCIA
}

