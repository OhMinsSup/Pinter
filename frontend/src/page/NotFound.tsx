import * as React from 'react';
import { History } from 'history';
import NotFoundTemplate from '../components/common/NotFound';

type Props = {
  history: History;
};

const NotFound: React.SFC<Props> = ({ history }) => {
  return <NotFoundTemplate onGoBack={history.goBack} />;
};

export default NotFound;
