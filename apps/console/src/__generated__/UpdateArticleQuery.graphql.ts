/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UpdateArticleQueryVariables = {
    id: string;
};
export type UpdateArticleQueryResponse = {
    readonly article: {
        readonly id: string;
        readonly title: string | null;
        readonly body: string | null;
        readonly slug: string | null;
        readonly createdAt: unknown | null;
        readonly updatedAt: unknown | null;
    };
};
export type UpdateArticleQuery = {
    readonly response: UpdateArticleQueryResponse;
    readonly variables: UpdateArticleQueryVariables;
};



/*
query UpdateArticleQuery(
  $id: String!
) {
  article(id: $id) {
    id
    title
    body
    slug
    createdAt
    updatedAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Article",
    "kind": "LinkedField",
    "name": "article",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "body",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateArticleQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateArticleQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9903eb3607ebeb35b0beb4d216490b9c",
    "id": null,
    "metadata": {},
    "name": "UpdateArticleQuery",
    "operationKind": "query",
    "text": "query UpdateArticleQuery(\n  $id: String!\n) {\n  article(id: $id) {\n    id\n    title\n    body\n    slug\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();
(node as any).hash = '37e474f3629b88d3484e9db05f781c96';
export default node;
