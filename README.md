# starts

> Simplify your live development workflow ❤️

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

> [Powered by your github ⭐s](https://github.com/basarat/starts/stargazers)

<iframe src="https://ghbtns.com/github-btn.html?user=basarat&repo=starts&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>

I consult as a pure frontend developer and normally have all JS / HTML generated into a `public` folder that we then upload to our CDN (normally S3). We have a few projects with `"start": "npm run emails:live & npm run pdfs:live & npm run app:live"`. It was time for something simpler. Perhaps you are are same  🌹

> Think of it as `concurrently`, `nodemon` and `light-server` merged to play well with each other 🌹

## Quick starts
Install

`npm install starts --save-dev --save-exact`

Create a `starts.ts` file

```ts
import {starts} from "starts";

starts({
  serve: {
    dir "./public"
  },
  /** 
   * If you edit any of the files on the right, the command on the left executes.
   * and if we were serving something, the connected web pages reload as well.
   */
  run: [
    { cmd: "npm run emails", watch: ["src/emails"] },
    { cmd: "npm run pdfs", watch: ["src/pdfs"] },
    { cmd: "npm run app", watch: ["src/app"] },
  ]
});
```

Run it `npm install ts-node --save --save-exact` with `package.json`: 

```json
{
  "scripts": {
    "start": "ts-node ./src/starts.ts"  
  }
}
```

> Ofcourse you can use js / raw node if you want to. But why would you.

## More 

All the config options:

```
export type ServeConfig = {
  dir?: string
  port?: number
  host?: string
}

export type RunConfig = {
  cmd: string
  watch?: string[]
  reload?: /** Default */ 'all' | 'css' | 'none'
  keepAlive?: boolean
}

/**
 * The complete config
 */
export type StartsConfig = {
  verbose?: boolean
  serve?: ServeConfig
  run?: RunConfig[]
  /** autorun initially */
  initialRun?: boolean
}
```

[travis-image]:https://travis-ci.org/basarat/starts.svg?branch=master
[travis-url]:https://travis-ci.org/basarat/starts
[npm-image]:https://img.shields.io/npm/v/starts.svg?style=flat
[npm-url]:https://npmjs.org/package/starts
