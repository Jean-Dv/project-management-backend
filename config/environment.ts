import dotenv from 'dotenv'

import { IEnvironment } from 'types/common/interfaces'

dotenv.config()

const ENV: IEnvironment = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 4000,
}

export default ENV