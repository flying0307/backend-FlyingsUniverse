// https://swagger-autogen.github.io/docs
import swaggerAutogen from 'swagger-autogen';

// eslint-disable-next-line import/extensions
import './dist/load-env.js';
console.log(process.env.AUTH_BASE_URL);

const outputFile = './src/swagger_output.json'; 
const endpointsFiles = ['./src/app.ts'];

const doc = {
  info: {
    version: '1.0.0', 
    title: 'Flyings\' Universe API Document',
    description: `${process.env.AUTH_BASE_URL} \r\n The provided API endpoints facilitate various operations in the web application.\r\n They include functionalities such as user authentication, data retrieval, data manipulation and system status checks.`,
  },
  components: {
    securitySchemes:{
      openId: {
        type: 'openIdConnect',
        openIdConnectUrl: 'https://dev-robyjnbtu38jww2k.us.auth0.com/.well-known/openid-configuration',
      },
    },
  },
  host: `${process.env.AUTH_BASE_URL}`,
  basePath: '', 
  schemes: ['https', 'http'],
  consumes: ['application/json'], 
  produces: ['application/json'], 
  tags: [
    {
      name: 'User',
      description: 'User router',
    },
    {
      name: 'Auth',
      description: 'Auth router',
    },
  ],

  '@definitions': {
    Unauthorized: {
      type: 'object',
      properties: {
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
    ChangePwd: {
      type: 'object',
      properties: {
        old: { type: 'string', example: '~o1l2d3!B' },
        new: { type: 'string', example: '~n4e5w6!A' },
      },
    },
    ResponseChangePwd: {
      type: 'object',
      properties: {
        strong: { type: 'boolean', example: true },
        vaild: { type: 'boolean', example: true },
        changed: { type: 'boolean', example: true },
      },
    },
    AddUserHook: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            email: { 'type': 'string', 'example': 'user@example.com' },
            password: { 'type': 'string', 'example': '1wsa3@~A2' },
          },
          required: ['email', 'password'],
        },
        hook: { 'type': 'string', 'example': 'xxxxxxxx' },
      },
      required: ['user', 'hook'],
    },
    CurrentAuth: {
      type: 'object',
      properties: {
        user_id: { type: 'string', example: '980ujiu87761q66rfa' },
        name: { type: 'string', example: 'Flying' },
        email: { type: 'string', example: 'flying@123.com' },
        email_verified: { type: 'boolean', example: true },
        type: { type: 'string', example: 'auth0|google-oauth2|facebook-oauth2' },
      },
    },
    UpdateName: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'New Name' },
      },
    },
    AboutMe: {
      type: 'object',
      properties: {
        user_id: { type: 'string', example: 'hK3345678' },
        email: { type: 'string', example: '345@678.com' },
        email_verified: { type: 'boolean', example: false },
        created_at: { type: 'string', example: '2023-07-14T06:20:52.442Z' },
        updated_at: { type: 'string', example: '2023-07-14T06:20:52.442Z' },
        picture: { type: 'string', example: 'http://' },
        name: { type: 'string', example: 'Star' },
        nickname: { type: 'string', example: 'Star' },
        last_login: { type: 'string', example: '2023-07-14T06:20:52.442Z' },
        logins_count: { type: 'integer', format: 'int32', example: 10 },
        type: { type: 'string', example: 'auth0|google-oauth2|facebook-oauth2' },
      },
    },
    Stat: {
      type: 'object',
      properties: {
        total_user: { type: 'integer', format: 'int32', example: 1314 },
        today_active_user: { type: 'integer', format: 'int32', example: 205 },
        avg_last_7_active_user: {
          type: 'integer',
          format: 'int32',
          example: 520,
        },
      },
    },

    AllUser: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            example: 'hK3345678',
          },
          email: {
            type: 'string',
            example: '345@678.com',
          },
          email_verified: {
            type: 'boolean',
            example: false,
          },
          username: {
            type: 'string',
            example: 'HK Star',
          },
          created_at: {
            type: 'string',
            example: '2023-07-14T06:20:52.442Z',
          },
          updated_at: {
            type: 'string',
            example: '2023-07-14T06:20:52.442Z',
          },
          picture: {
            type: 'string',
            example: 'http://',
          },
          name: {
            type: 'string',
            example: 'Star',
          },
          nickname: {
            type: 'string',
            example: 'Star',
          },
          last_login: {
            type: 'string',
            example: '2023-07-14T06:20:52.442Z',
          },
          logins_count: {
            type: 'number',
            example: 10,
          },
        },
      },
    },
  },
};

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);