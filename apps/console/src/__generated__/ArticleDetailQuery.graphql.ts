/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ArticleDetailQueryVariables = {
    id: string;
};
export type ArticleDetailQueryResponse = {
    readonly article: {
        readonly id: string;
        readonly title: string | null;
        readonly body: string | null;
        readonly slug: string | null;
        readonly createdAt: unknown | null;
        readonly updatedAt: unknown | null;
    };
};
export type ArticleDetailQuery = {
    readonly response: ArticleDetailQueryResponse;
    readonly variables: ArticleDetailQueryVariables;
};



/*
query ArticleDetailQuery(
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
    "name": "ArticleDetailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArticleDetailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d8c2fbdd18449aec17c946622683aff0",
    "id": null,
    "metadata": {},
    "name": "ArticleDetailQuery",
    "operationKind": "query",
    "text": "query ArticleDetailQuery(\n  $id: String!\n) {\n  article(id: $id) {\n    id\n    title\n    body\n    slug\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();
(node as any).hash = '608d7a0c88415b7850c33c555923a49f';
export default node;
