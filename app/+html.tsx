import {ScrollViewStyleReset} from 'expo-router/html';
import {type PropsWithChildren} from 'react';

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function HtmlRoot({children}: PropsWithChildren) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <script src="https://telegram.org/js/telegram-web-app.js"></script>

            <ScrollViewStyleReset/>
        </head>
        <body>{children}</body>
        </html>
    );
}
