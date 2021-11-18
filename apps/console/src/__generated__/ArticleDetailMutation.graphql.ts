/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type DeleteArticleInput = {
    clientMutationId?: string | null | undefined;
    id: string;
};
export type ArticleDetailMutationVariables = {
    input: DeleteArticleInput;
};
export type ArticleDetailMutationResponse = {
    readonly deleteArticle: {
        readonly article: {
            readonly id: string;
        };
    } | null;
};
export type ArticleDetailMutation = {
    readonly response: ArticleDetailMutationResponse;
    readonly variables: ArticleDetailMutationVariables;
};



/*
mutation ArticleDetailMutation(
  $input: DeleteArticleInput!
) {
  deleteArticle(input: $input) {
    article {
      id
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
    "concreteType": "DeleteArticlePayload",
    "kind": "LinkedField",
    "name": "deleteArticle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
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
    "name": "ArticleDetailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArticleDetailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "21a84f78b1a6b7b822a24fb8a080cc06",
    "id": null,
    "metadata": {},
    "name": "ArticleDetailMutation",
    "operationKind": "mutation",
    "text": "mutation ArticleDetailMutation(\n  $input: DeleteArticleInput!\n) {\n  deleteArticle(input: $input) {\n    article {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'df6b32c88ba51aa9c8c29d81ecfa7ba0';
export default node;
