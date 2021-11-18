import 'regenerator-runtime/runtime'
import { Environment, RecordSource, Store } from 'relay-runtime'
import { devMode } from '@/utils/env'
import {
  cacheMiddleware,
  RelayNetworkLayer,
  urlMiddleware,
  retryMiddleware,
} from 'react-relay-network-modern'

const source = new RecordSource()
const store = new Store(source)

let storeEnvironment: Environment | null = null

export const createEnvironment = () => {
  if (storeEnvironment) return storeEnvironment
  storeEnvironment = new Environment({
    store,
    network: new RelayNetworkLayer([
      cacheMiddleware({
        size: 1000,
        ttl: 15 * 60 * 1000,
        allowMutations: true,
        allowFormData: true,
        clearOnMutation: true,
      }),
      retryMiddleware(),
      urlMiddleware({
        url: () =>
          devMode
            ? 'http://localhost:4000/endpoint'
            : 'https://souls-souls-rubyworld-api-bqdqxzb5za-an.a.run.app/endpoint',
      }),
    ]),
  })
  return storeEnvironment
}
