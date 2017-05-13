# Scrapyard Wars Game - UI

This is the UI for the 2 player co-op Scrapyard Wars game.

It was built using [Phaser.js](https://phaser.io/) (graphics), [Howler.js](https://howlerjs.com/) (audio), and [Webpack](https://webpack.js.org/) (asset management). Based off of the [Phaser ES6 Boilerplate](https://github.com/goldfire/phaser-boilerplate/).

## Development

Install the dependencies:

```
npm i && sudo npm i -g grunt
```

Start the development web server:

```
npm run dev
```

Access the project in the browser:

[http://locahost:8080](http://locahost:8080)

Edit some files, hit save, view the browser, it automagically reloads, we've got **Hot Reload**.

Sanity check, check for lint:

`npm run lint`

And most importantly, have fun :space_invader:

## Production Build

Install the dependencies:

`npm i && sudo npm i -g grunt`

Build the production package:

`npm run build`

Copy the files under the resulting `dist` directory onto the production environment and serve the files statically.