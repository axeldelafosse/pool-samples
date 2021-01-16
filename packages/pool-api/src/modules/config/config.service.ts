import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

const env = ['development', 'production', 'staging'];

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
    ) {
      this.envConfig = this.validateInput(process.env);
    } else {
      const config = dotenv.parse(fs.readFileSync(filePath));
      this.envConfig = this.validateInput(config);
    }
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(...env)
        .default('development'),
      PORT: Joi.number().default(3000),
      JWT_SECRET_KEY: Joi.string().required(),
      HASURA_GRAPHQL_ADMIN_SECRET: Joi.string().required(),
      HASURA_GRAPHQL_JWT_SECRET: Joi.string().required(),
      HASURA_GRAPHQL_UNAUTHORIZED_ROLE: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),
      S3_KEY: Joi.string().required(),
      S3_SECRET: Joi.string().required(),
      S3_BUCKET: Joi.string().required(),
      S3_REGION: Joi.string().required(),
    }).unknown();

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
