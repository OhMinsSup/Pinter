import * as React from 'react';
import SidebarContainer from '../base/SidebarContainer';
import GalleryContainer from '../common/GalleryContainer';
import NoticeModalContainer from '../common/NoticeMobalContainer';
import MakePinGroupContainer from '../common/MakePinGroupContainer';
import GroupPinSettingContainer from '../common/GroupPinSettingContainer';

const EtcContainer = () => (
  <React.Fragment>
    <SidebarContainer />
    <GalleryContainer />
    <NoticeModalContainer />
    <MakePinGroupContainer />
    <GroupPinSettingContainer />
  </React.Fragment>
);

export default EtcContainer;
