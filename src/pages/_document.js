import Document, { Html, Head, Main, NextScript } from "next/document";
import { Container } from "react-bootstrap";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
         
          <meta name="title" content="Public Primary" />
          <meta
            name="description"
            content="Public Primary is a platform where users can create and join local constituencies within their county, including government and private groups."
          />

       
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Public Primary" />
          <meta
            property="og:description"
            content="Create, join, and engage with constituencies in your local county. Government and private groups in one platform."
          />
          <meta
            property="og:image"
            content="https://public-primary.vercel.app/fav.png"
          />
          <meta
            property="og:url"
            content="https://public-primary.vercel.app/"
          />


          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Public Primary" />
          <meta
            name="twitter:description"
            content="Join your local county constituencies and participate in governance and community groups."
          />
          <meta
            name="twitter:image"
            content="https://public-primary.vercel.app/fav.png"
          />

          <link rel="shortcut icon" href="/fav.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/fav.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/fav.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/fav.png" />

   
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Aclonica&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@1&display=swap"
            rel="stylesheet"
          />


          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            crossOrigin="anonymous"
          />

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            crossOrigin="anonymous"
          />
        </Head>

        <body>
          <Container fluid className="px-0">
            <Main />
            <NextScript />
            <div id="notifications"></div>
          </Container>
        </body>
      </Html>
    );
  }
}

export default MyDocument;