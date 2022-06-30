import {registerAs} from "@nestjs/config";


export default registerAs('movies', () => ({
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  },
}));
