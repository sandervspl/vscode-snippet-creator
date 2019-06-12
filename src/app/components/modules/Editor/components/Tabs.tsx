import * as i from '@types';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import Tab from '@material-ui/core/Tab';
import { AddCircle } from '@material-ui/icons';
import Stores from 'app/stores';
import { StyledTabs } from './styled';
import NewSnippetModal from './NewSnippetModal';

@inject(Stores.editorTabsStore)
@observer
class TabsContainer extends Component<TabsProps> {
  @observable open = true;

  @action
  onOpen = () => {
    this.open = true;
  }

  @action
  onClose = () => {
    this.open = false;
  }

  @action
  handleTabChange = (event: React.ChangeEvent, value: number) => {
    const { editorTabsStore } = this.props;
    const { tabs } = editorTabsStore!;

    if (tabs[value] && tabs[value].id === 0) {
      this.onOpen();
    } else {
      editorTabsStore!.tabId = value;
    }
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
          {editorTabsStore!.tabs.map((tab) => {
            const tabProps = tab.id === 0
              ? { icon: <AddCircle /> }
              : { label: tab.name };

            return (
              <Tab key={tab.id} {...tabProps} />
            );
          })}
        </StyledTabs>

        <NewSnippetModal open={this.open} onClose={this.onClose} />
      </>
    );
  }
}

interface TabsProps {
  editorTabsStore?: i.EditorTabsStore;
  tabId: number;
}

export default TabsContainer;
