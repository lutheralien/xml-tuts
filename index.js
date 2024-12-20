const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const { customerSchema, XML_SCHEMA } = require('./schema');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/xml' }));

// Swagger documentation setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer Onboarding API',
      version: '1.0.0',
      description: 'API for Fidelity Bank customer onboarding'
    }
  },
  apis: ['./index.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get('/api/schema', (req, res) => {
  const format = req.query.format || 'json';
  
  if (format === 'xml') {
    res.type('application/xml').send(XML_SCHEMA);
  } else {
    const schemaDescription = {};
    
    const fields = customerSchema.describe().keys;
    for (const [key, value] of Object.entries(fields)) {
      schemaDescription[key] = {
        type: value.type,
        rules: value.rules,
        description: value.description,
        example: value.examples?.[0] || null,
        required: value.flags?.presence === 'required'
      };
    }
    
    res.json(XML_SCHEMA);
  }
});

// Example data endpoint
app.get('/api/example', (req, res) => {
  const format = req.query.format || 'json';
  
  const exampleData = {
    ACCOUNT_NUMBER: "1234567890",
    ACCOUNT_CURRENCY: "GHS",
    ACCOUNT_BRANCH: "001",
    TITLE: "Mr",
    FIRST_NAME_OR_COMPANY_NAME: "John",
    SURNAME: "Doe",
    OTHER_NAME: "Smith",
    GENDER: "M",
    DOB_DOI: "1990-01-01",
    PHONE_NUMBER: "+233201234567",
    EMAIL: "john.doe@example.com",
    ADDRESS_POST_BOX: "P.O. Box 1234",
    ADDRESS_CITY: "Accra",
    ADDRESS_COUNTRY: "Ghana",
    RESIDENTIAL_ADDRESS: "123 Independence Avenue, Accra",
    ID_TYPE_CODE: "GHCARD",
    ID_NUMBER: "GHA-123456789-0",
    EXPIRY_DATE: "2025-12-31",
    PLACE_OF_ISSUE: "Accra",
    CUSTOMER_PHOTO: "data:image/jpeg;base64,/9j/...",
    CUSTOMER_SIGNATURE: "data:image/jpeg;base64,/9j/...",
    IDCARD_PHOTO_FRONT: "data:image/jpeg;base64,/9j/...",
    IDCARD_PHOTO_BACK: "data:image/jpeg;base64,/9j/...",
    NATIONALITY_CODE: "GHA",
    OCCUPATION: "Software Engineer"
  };

  if (format === 'xml') {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject({ AP_CUSTOMER_INFO: exampleData });
    res.type('application/xml').send(xml);
  } else {
    res.json(exampleData);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});

