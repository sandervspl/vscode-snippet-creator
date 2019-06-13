import * as i from '@types';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import Tab from '@material-ui/core/Tab';
import { AddCircle } from '@material-ui/icons';
import Stores from 'app/stores';
import { StyledTabs } from './styled';
// import NewSnippetModal from './NewSnippetModal';

@inject(Stores.editorTabsStore)
@observer
class TabsContainer extends Component<TabsProps> {
  @action
  handleTabChange = (event: React.ChangeEvent, value: number) => {
    const { editorTabsStore } = this.props;
    const { tabs } = editorTabsStore!;

    if (tabs[value] == null) {
      editorTabsStore!.addEmptyTab();
    }

    editorTabsStore!.setActiveTab(value);
  }

  render() {
    const { tabId, editorTabsStore } = this.props;

    return (
      <>
        <StyledTabs
          value={tabId}
          onChange={this.handleTabChange}
          variant="scrollable"
          scrollButtons="off"
          tabsAmount={editorTabsStore!.tabs.length}
        >
          {editorTabsStore!.tabs.map((tab) => (
            <Tab key={tab.id} label={tab.name} />
          ))}
          <Tab icon={<AddCircle />} />
        </StyledTabs>

        {/* <NewSnippetModal open={this.open} onClose={this.onClose} /> */}
      </>
    );
  }
}

interface TabsProps {
  editorTabsStore?: i.EditorTabsStore;
  tabId: number;
}

export default TabsContainer;
