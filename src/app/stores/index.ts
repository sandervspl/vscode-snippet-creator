import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// import instance stores
import testStore from './Test';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

// Store list for MobX inject
enum Stores {
  routingStore = 'routingStore',
  testStore = 'testStore',
}
export default Stores;

// Stores for MobX provider
export const storeDirectory = {
  routingStore,
  testStore,
};

export const history = syncHistoryWithStore(browserHistory, routingStore);

// DEBUGGING
if (!__PROD__) {
  window.stores = storeDirectory;
}
