const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/components/doc/swagger_output.json'
//const endpointsFiles = ['./api/personRouter.js']

const endpointsFiles = ['./src/components/users/routes.ts']
swaggerAutogen(outputFile, endpointsFiles)