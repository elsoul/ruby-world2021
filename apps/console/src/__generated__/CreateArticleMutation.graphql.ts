/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateArticleInput = {
    articleCategoryId?: string | null | undefined;
    body?: string | null | undefined;
    clientMutationId?: string | null | undefined;
    isDeleted?: boolean | null | undefined;
    isPublic?: boolean | null | undefined;
    justCreated?: boolean | null | undefined;
    publicDate?: string | null | undefined;
    slug?: string | null | undefined;
    tags?: Array<string> | null | undefined;
    thumnailUrl?: string | null | undefined;
    title?: string | null | undefined;
};
export type CreateArticleMutationVariables = {
    input: CreateArticleInput;
};
export type CreateArticleMutationResponse = {
    readonly createArticle: {
        readonly articleEdge: {
            readonly node: {
                readonly id: string;
                readonly title: string | null;
                readonly body: string | null;
                readonly slug: string | null;
                readonly createdAt: unknown | null;
                readonly updatedAt: unknown | null;
            } | null;
        };
    } | null;
};
export type CreateArticleMutation = {
    readonly response: CreateArticleMutationResponse;
    readonly variables: CreateArticleMutationVariables;
};



/*
mutation CreateArticleMutation(
  $input: CreateArticleInput!
) {
  createArticle(input: $input) {
    articleEdge {
      node {
        id
        title
        body
        slug
        createdAt
        updatedAt
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateArticlePayload",
    "kind": "LinkedField",
    "name": "createArticle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ArticleEdge",
        "kind": "LinkedField",
        "name": "articleEdge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "node",
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
        ],
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
    "name": "CreateArticleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateArticleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2460b0b537f71c8a16043c62edba2766",
    "id": null,
    "metadata": {},
    "name": "CreateArticleMutation",
    "operationKind": "mutation",
    "text": "mutation CreateArticleMutation(\n  $input: CreateArticleInput!\n) {\n  createArticle(input: $input) {\n    articleEdge {\n      node {\n        id\n        title\n        body\n        slug\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '96c3b51db36513c9fc6150d74cd60b63';
export default node;
