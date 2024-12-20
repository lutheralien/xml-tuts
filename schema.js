// File: schema.js
const Joi = require("joi");
const { XMLValidator } = require("fast-xml-parser");

const customerSchema = Joi.object({
  ACCOUNT_NUMBER: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .description("10-digit account number")
    .example("1234567890"),

  ACCOUNT_CURRENCY: Joi.string()
    .valid("GHS", "USD", "EUR", "GBP")
    .required()
    .description("Account currency code")
    .example("GHS"),

  ACCOUNT_BRANCH: Joi.string()
    .length(3)
    .required()
    .description("3-digit branch code")
    .example("001"),

  TITLE: Joi.string()
    .valid("Mr", "Mrs", "Miss", "Dr", "Prof", "Rev")
    .description("Customer title")
    .example("Mr"),

  FIRST_NAME_OR_COMPANY_NAME: Joi.string()
    .min(2)
    .max(100)
    .required()
    .description("First name or company name")
    .example("John"),

  SURNAME: Joi.string()
    .min(2)
    .max(50)
    .description("Surname for individual customers")
    .example("Doe"),

  OTHER_NAME: Joi.string()
    .min(2)
    .max(50)
    .description("Middle name")
    .example("Smith"),

  GENDER: Joi.string().valid("M", "F").description("Gender (M/F)").example("M"),

  DOB_DOI: Joi.date()
    .iso()
    .required()
    .description("Date of Birth/Incorporation (ISO format)")
    .example("1990-01-01"),

  PHONE_NUMBER: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .description("Phone number with optional + prefix")
    .example("+233201234567"),

  EMAIL: Joi.string()
    .email()
    .required()
    .description("Valid email address")
    .example("john.doe@example.com"),

  ADDRESS_POST_BOX: Joi.string()
    .max(50)
    .description("Post box address")
    .example("P.O. Box 1234"),

  ADDRESS_CITY: Joi.string()
    .required()
    .max(50)
    .description("City name")
    .example("Accra"),

  ADDRESS_COUNTRY: Joi.string()
    .required()
    .max(50)
    .description("Country name")
    .example("Ghana"),

  RESIDENTIAL_ADDRESS: Joi.string()
    .required()
    .max(200)
    .description("Full residential or office address")
    .example("123 Independence Avenue, Accra"),

  ID_TYPE_CODE: Joi.string()
    .valid("GHCARD", "PASSPORT", "INCORP_CERT")
    .required()
    .description("Type of identification document")
    .example("GHCARD"),

  ID_NUMBER: Joi.string()
    .required()
    .max(50)
    .description("Identification document number")
    .example("GHA-123456789-0"),

  EXPIRY_DATE: Joi.date()
    .iso()
    .required()
    .description("ID document expiry date (ISO format)")
    .example("2025-12-31"),

  PLACE_OF_ISSUE: Joi.string()
    .required()
    .max(100)
    .description("Place where ID was issued")
    .example("Accra"),

  CUSTOMER_PHOTO: Joi.string()
    .base64()
    .description("Base64 encoded customer photo")
    .example("data:image/jpeg;base64,..."),

  CUSTOMER_SIGNATURE: Joi.string()
    .base64()
    .required()
    .description("Base64 encoded signature")
    .example("data:image/jpeg;base64,..."),

  IDCARD_PHOTO_FRONT: Joi.string()
    .base64()
    .required()
    .description("Base64 encoded ID front photo")
    .example("data:image/jpeg;base64,..."),

  IDCARD_PHOTO_BACK: Joi.string()
    .base64()
    .required()
    .description("Base64 encoded ID back photo")
    .example("data:image/jpeg;base64,..."),

  NATIONALITY_CODE: Joi.string()
    .length(3)
    .required()
    .description("ISO 3-letter nationality code")
    .example("GHA"),

  OCCUPATION: Joi.string()
    .required()
    .max(100)
    .description("Customer occupation or business type")
    .example("Software Engineer"),
});

// XML Schema definition
const XML_SCHEMA = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="AP_CUSTOMER_INFO">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="ACCOUNT_NUMBER">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:pattern value="[0-9]{10}"/>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
        <xs:element name="ACCOUNT_CURRENCY">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:enumeration value="GHS"/>
              <xs:enumeration value="USD"/>
              <xs:enumeration value="EUR"/>
              <xs:enumeration value="GBP"/>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
        <!-- Add other elements with restrictions -->
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>`;
module.exports = { customerSchema, XML_SCHEMA };
