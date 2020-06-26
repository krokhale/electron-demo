import Document, { Html, Head, Main, NextScript } from 'next/document'

// import Headers from '../components/app/common/headers'

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang={'en'}>
            <Head>
                {/*<Headers />*/}
                <link rel="stylesheet" type="text/css" href="/styles/ant.css" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
            </Html>
        )
    }
}

export default MyDocument
