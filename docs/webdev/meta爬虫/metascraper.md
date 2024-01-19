# MetaScraper使用 

[MetaScraper](https://metascraper.js.org/)
[创建无服务器函数来抓取网页元数据](https://devpress.csdn.net/cloudnative/62f93e0ec6770329307fdb4b.html)

## 安装
```sh
npm i metascraper
```

安装10这个版本
```sh
npm i got@10
```
```sh
npm i metascraper-amazon metascraper-audio metascraper-author metascraper-clearbit metascraper-date metascraper-description metascraper-image metascraper-instagram metascraper-lang metascraper-logo metascraper-logo metascraper-publisher metascraper-readability metascraper-soundcloud metascraper-spotify metascraper-telegram metascraper-title metascraper-url metascraper-video metascraper-youtube
```
更多解析包
[Rules bundles](https://github.com/microlinkhq/metascraper#rules-bundles)

## 使用

```js
// api/scrape.js
// In Vercel, any file inside the folder "/api" is mapped to "/api/*" and 
// will be treated as an API endpoint.

const { parse } = require("url");
const got = require("got");
// Initialize metascraper passing in the list of rules bundles to use.
const metascraper = require("metascraper")([
  require("metascraper-amazon")(),
  require("metascraper-audio")(),
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-instagram")(),
  require("metascraper-lang")(),
  require("metascraper-logo")(),
  require("metascraper-clearbit-logo")(),
  require("metascraper-logo-favicon")(),
  require("metascraper-publisher")(),
  require("metascraper-readability")(),
  require("metascraper-spotify")(),
  require("metascraper-title")(),
  require("metascraper-telegram")(),
  require("metascraper-url")(),
  require("metascraper-logo-favicon")(),
  require("metascraper-soundcloud")(),
  require("metascraper-video")(),
]);


// For an API route to work, you need to export a function as default (a.k.a request handler),
// which then receives the following parameters:
// - req: The request object.
// - res: The response object.
// See https://vercel.com/docs/serverless-functions/supported-languages#node.js for details.
export default async function handler(req, res) {
  // Parse the "?url" query parameter.
  const targetUrl = parse(req.url, true).query?.url;

  // Make sure the provided URL is valid.
  if (!targetUrl) {
    res
      .status(401)
      .send('Please provide a valid URL in the "url" query parameter.');
    return;
  }

  try {
    // Use the got library to fetch the website content.
    const { body: html, url } = await got(targetUrl);
    // Extract the metadata from the website content.
    const metadata = await metascraper({ html, url });
    // The Vercel Edge Network can cache the response at the edge in order to 
    // serve data to your users as fast as possible.
    // Here we're caching the response at the edge for 1 hour.
    // See https://vercel.com/docs/edge-network/caching for details.
    res.setHeader("Cache-Control", "s-maxage=3600");    
    // Make this API publicly accessible. 
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Return the metadata as JSON
    res.status(200).json(metadata);
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: `Unable to scrape "${url}".` });
  }
}
```