import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <title>MIX Bootcamp</title>
        <meta name="title" content="MIX Bootcamp" />
        <meta name="description" content="Join a community of tech enthusiasts, get access to free coding tutorials, classes and mentorship (HTML, CSS, Javascript, React)" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mix.mitchelinaju.com" />
        <meta property="og:title" content="MIX Bootcamp" />
        <meta property="og:description" content="Join a community of tech enthusiasts, get access to free coding tutorials, classes and mentorship (HTML, CSS, Javascript, React)" />
        <meta property="og:image" content="https://res.cloudinary.com/mitchelinaju/image/upload/v1689991000/get_in_tech_og-image_pg83ab.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mix.mitchelinaju.com" />
        <meta property="twitter:title" content="MIX Bootcamp" />
        <meta property="twitter:description" content="Join a community of tech enthusiasts, get access to free coding tutorials, classes and mentorship (HTML, CSS, Javascript, React)" />
        <meta property="twitter:image" content="https://res.cloudinary.com/mitchelinaju/image/upload/v1689991000/get_in_tech_og-image_pg83ab.png" />

      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
