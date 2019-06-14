import * as i from '@types';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Tab from '@material-ui/core/Tab';
import { AddCircle } from '@material-ui/icons';
import Stores from 'app/stores';
import { StyledTabs } from './styled';

@inject(Stores.editorTabsStore)
@observer
class TabsContainer extends Component<Props> {
  createTab = () => {
    return this.props.editorTabsStore!.addEmptyTab();
  }

  handleTabChange = (event: React.ChangeEvent, tabId: number) => {
    const editorTabsStore = this.props.editorTabsStore!;
    let newActiveTabId = tabId;

    if (editorTabsStore.getTab(tabId) == null) {
      newActiveTabId = this.createTab();
    }

    editorTabsStore.setActiveTab(newActiveTabId);
  }

  render() {
    const { tabId, editorTabsStore } = this.props;
    const { tabs } = editorTabsStore!;

    return (
      <StyledTabs
        value={tabId}
        onChange={this.handleTabChange}
        variant="scrollable"
        scrollButtons="off"
        tabsamount={Object.keys(tabs).length}
      >
        {Object.keys(tabs).map((key) => (
          <Tab key={tabs[key].id} label={tabs[key].name} value={tabs[key].id} />
        ))}
        <Tab icon={<AddCircle />} value={-1} />
      </StyledTabs>
    );
  }
}

interface Props {
  editorTabsStore?: i.EditorTabsStore;
  tabId: number;
}

export default TabsContainer;
