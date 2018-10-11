import { bindActionCreators } from 'redux';
import { match } from 'react-router-dom';
import { recentCreators } from './store/modules/list/recent';

const routes = [
    {
        path: '/recent' || '/',
        preload: async (ctx: any, { dispatch }: any, match: match<any>) => {
            const ListActions = bindActionCreators(recentCreators, dispatch);
            return ListActions.getPinList();
        }
    },
];

export default routes;