import { Request, Response } from 'express';
const manifest  = require('../../../frontend/build/asset-manifest.json');
const render = require('./render.js');

function buildHtml(rendered, state) {
    const escaped = JSON.stringify(state).replace(/</g, '\\u003c');
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="manifest" href="/manifest.json">
        <link rel="shortcut icon" href="/favicon.ico">
        <link href="/${manifest['main.css']}" rel="stylesheet">
        </head>
        <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${rendered}</div>
        <script>
            window.__PRELOADED_STATE__ = ${escaped}
        </script>
        <script type="text/javascript" src="/${manifest['main.js']}"></script>
        </body>
        </html>
    `;
    return html;
}

export const indexHtml = buildHtml('', null);


const ssr = async (req: Request, res: Response) => {
    try {
        const { state, html } = await render(req, res);
        const body = buildHtml(html, state);
        res.json(body);
    } catch (e) {
        res.json(indexHtml);
    }
}

export default ssr;