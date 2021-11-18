/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ArticleFilter = {
    OR?: Array<ArticleFilter> | null | undefined;
    articleCategoryId?: string | null | undefined;
    body?: string | null | undefined;
    endDate?: string | null | undefined;
    isDeleted?: boolean | null | undefined;
    isPublic?: boolean | null | undefined;
    justCreated?: boolean | null | undefined;
    publicDate?: string | null | undefined;
    searchKeyword?: string | null | undefined;
    slug?: string | null | undefined;
    startDate?: string | null | undefined;
    tags?: Array<string> | null | undefined;
    thumnailUrl?: string | null | undefined;
    title?: string | null | undefined;
};
export type ArticleListQueryVariables = {
    first?: number | null | undefined;
    after?: string | null | undefined;
    last?: number | null | undefined;
    before?: string | null | undefined;
    filter?: ArticleFilter | null | undefined;
};
export type ArticleListQueryResponse = {
    readonly articleSearch: {
        readonly totalCount: number;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly title: string | null;
                readonly createdAt: unknown | null;
            } | null;
        } | null> | null;
        readonly pageInfo: {
            readonly endCursor: string | null;
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
            readonly startCursor: string | null;
        };
    };
};
export type ArticleListQuery = {
    readonly response: ArticleListQueryResponse;
    readonly variables: ArticleListQueryVariables;
};



/*
query ArticleListQuery(
  $first: Int
  $after: String
  $last: Int
  $before: String
  $filter: ArticleFilter
) {
  articleSearch(first: $first, after: $after, last: $last, before: $before, filter: $filter) {
    totalCount
    edges {
      node {
        id
        title
        createdAt
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "before"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v5 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ArticleEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
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
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PageInfo",
    "kind": "LinkedField",
    "name": "pageInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasPreviousPage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "startCursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v7 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before"
  },
  (v5/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticleListQuery",
    "selections": [
      {
        "alias": "articleSearch",
        "args": [
          (v5/*: any*/)
        ],
        "concreteType": "ArticleConnection",
        "kind": "LinkedField",
        "name": "__ArticleList_articleSearch_connection",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArticleListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "ArticleConnection",
        "kind": "LinkedField",
        "name": "articleSearch",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
        "filters": [
          "filter"
        ],
        "handle": "connection",
        "key": "ArticleList_articleSearch",
        "kind": "LinkedHandle",
        "name": "articleSearch"
      }
    ]
  },
  "params": {
    "cacheID": "db4015946df47c23028989bb27d4e342",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "bidirectional",
          "path": [
            "articleSearch"
          ]
        }
      ]
    },
    "name": "ArticleListQuery",
    "operationKind": "query",
    "text": "query ArticleListQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n  $filter: ArticleFilter\n) {\n  articleSearch(first: $first, after: $after, last: $last, before: $before, filter: $filter) {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5dc8ce686c3758904f0bf0f22ba7780b';
export default node;
