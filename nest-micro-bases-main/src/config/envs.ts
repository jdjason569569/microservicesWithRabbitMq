import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  QUEUE: string
}

const envsSchema = joi.object({
  QUEUE: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  queue: envVars.QUEUE,
}