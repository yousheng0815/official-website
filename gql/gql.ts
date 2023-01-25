/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n      query Content($owner: String!, $name: String!, $expression: String) {\n        repository(owner: $owner, name: $name) {\n          id\n          object(expression: $expression) {\n            id\n            ... on Blob {\n              text\n            }\n          }\n        }\n      }\n    ": types.ContentDocument,
    "\n      query BlogManifest($owner: String!, $name: String!, $expression: String) {\n        repository(owner: $owner, name: $name) {\n          id\n          object(expression: $expression) {\n            id\n            ... on Blob {\n              text\n            }\n          }\n        }\n      }\n    ": types.BlogManifestDocument,
};

export function graphql(source: "\n      query Content($owner: String!, $name: String!, $expression: String) {\n        repository(owner: $owner, name: $name) {\n          id\n          object(expression: $expression) {\n            id\n            ... on Blob {\n              text\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query Content($owner: String!, $name: String!, $expression: String) {\n        repository(owner: $owner, name: $name) {\n          id\n          object(expression: $expression) {\n            id\n            ... on Blob {\n              text\n            }\n          }\n        }\n      }\n    "];
export function graphql(source: "\n      query BlogManifest($owner: String!, $name: String!, $expression: String) {\n        repository(owner: $owner, name: $name) {\n          id\n          object(expression: $expression) {\n            id\n            ... on Blob {\n              text\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query BlogManifest($owner: String!, $name: String!, $expression: String) {\n        repository(owner: $owner, name: $name) {\n          id\n          object(expression: $expression) {\n            id\n            ... on Blob {\n              text\n            }\n          }\n        }\n      }\n    "];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;