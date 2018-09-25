import { Context } from 'koa';
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

const ssr = async (ctx: Context) => {
    try {
        const { state, html, context } = await render(ctx);
        if (context.status) {
            ctx.status = context.status;
        }
        const body = buildHtml(html, state);
        ctx.body = body;
    } catch (e) {
        ctx.body = indexHtml;
    }
}

export default ssr;
