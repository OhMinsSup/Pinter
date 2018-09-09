import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import App from './App';
import configure from './store/configureStore';
import routesConfig from './routesConfig';

const serverRender = async (req: any,  res: any) => {
    const store = configure();
    const promises: any[] = [];

    routesConfig.every((route: any) => {
        const match = matchPath(req.url, route);

        if (match) {
            if (route.preload) {
                promises.push(route.preload(req, req, store, match));
            }

            if (route.stop) return false;
        }

        return true;
    });

    try {
        await Promise.all(promises);
    } catch (e) {
        console.log(e);
    }

    const context = {};
    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
                <App />
            </StaticRouter>
        </Provider>
    )
    return {
        html,
        state: store.getState(),
    };
}

export default serverRender;