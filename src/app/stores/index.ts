import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// import instance stores
import editorTabsStore from './EditorTabs';
import editorStore from './Editor';
import outputStore from './Output';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

// Store list for MobX inject
enum Stores {
  routingStore = 'routingStore',
  editorTabsStore = 'editorTabsStore',
  editorStore = 'editorStore',
  outputStore = 'outputStore',
}
export default Stores;

// Stores for MobX provider
export const storeDirectory = {
  routingStore,
  editorTabsStore,
  editorStore,
  outputStore,
};

const historySyncedStore = syncHistoryWithStore(browserHistory, routingStore);

export const history = historySyncedStore;

// DEBUGGING
if (__DEV__) {
  window.stores = storeDirectory;
}
