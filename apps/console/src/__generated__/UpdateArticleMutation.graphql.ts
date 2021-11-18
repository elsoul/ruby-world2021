/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UpdateArticleInput = {
    articleCategoryId?: string | null | undefined;
    body?: string | null | undefined;
    clientMutationId?: string | null | undefined;
    id: string;
    isDeleted?: boolean | null | undefined;
    isPublic?: boolean | null | undefined;
    justCreated?: boolean | null | undefined;
    publicDate?: string | null | undefined;
    slug?: string | null | undefined;
    tags?: Array<string> | null | undefined;
    thumnailUrl?: string | null | undefined;
    title?: string | null | undefined;
};
export type UpdateArticleMutationVariables = {
    input: UpdateArticleInput;
};
export type UpdateArticleMutationResponse = {
    readonly updateArticle: {
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
export type UpdateArticleMutation = {
    readonly response: UpdateArticleMutationResponse;
    readonly variables: UpdateArticleMutationVariables;
};



/*
mutation UpdateArticleMutation(
  $input: UpdateArticleInput!
) {
  updateArticle(input: $input) {
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
    "concreteType": "UpdateArticlePayload",
    "kind": "LinkedField",
    "name": "updateArticle",
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
    "name": "UpdateArticleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateArticleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4b2454d72e941c7d47e5b5ea9b992455",
    "id": null,
    "metadata": {},
    "name": "UpdateArticleMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateArticleMutation(\n  $input: UpdateArticleInput!\n) {\n  updateArticle(input: $input) {\n    articleEdge {\n      node {\n        id\n        title\n        body\n        slug\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '151d26fee4bbb048be51692469232f95';
export default node;
