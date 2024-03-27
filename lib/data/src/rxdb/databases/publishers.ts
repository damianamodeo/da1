import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  RxDocument,
  RxCollection,
} from 'rxdb';

export const publishersSchemaLiteral = {
  title: 'publishers schema',
  description: 'Members of the congregation',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    displayName: {
      type: 'string',
      maxLength: 100,
    },
    firstName: {
      type: 'string',
      maxLength: 100,
    },
    middleName: {
      type: 'string',
      maxLength: 100,
    },
    lastName: {
      type: 'string',
    },
  },
  required: ['firstName', 'lastName', 'id'],
  indexes: [],
} as const; // <- It is important to set 'as const' to preserve the literal type

const schemaTyped = toTypedRxJsonSchema(publishersSchemaLiteral);

export type PublishersDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export type PublishersDocMethods = {
  scream: (v: string) => string;
};

export type PublishersDocument = RxDocument<
  PublishersDocType,
  PublishersDocMethods
>;

// we declare one static ORM-method for the collection
export type PublishersCollectionMethods = {
  countAllDocuments: () => Promise<number>;
};

// and then merge all our types
export type PublishersCollection = RxCollection<
  PublishersDocType,
  PublishersDocMethods,
  PublishersCollectionMethods
>;

export type PublishersCollections = {
  publishers: PublishersCollection;
};

// create the typed RxJsonSchema from the literal typed object.
export const publishersSchema: RxJsonSchema<PublishersDocType> =
  publishersSchemaLiteral;

export const addPublisher = async (
  publisher: PublishersDocType
) => {
  return publisher;
};

export const publishersDocMethods: PublishersDocMethods = {
  scream: function (this: PublishersDocument, what: string) {
    return this.firstName + ' screams: ' + what.toUpperCase();
  },
};

export const publishersCollectionMethods: PublishersCollectionMethods = {
  countAllDocuments: async function (this: PublishersCollection) {
    const allDocs = await this.find().exec();
    return allDocs.length;
  },
};
