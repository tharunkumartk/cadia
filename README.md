# Desocade
Desocade is fun game!

## How to run these examples locally

Run the following in your terminal

```sh
git clone https://github.com/deso-protocol/deso-examples-react.git
cd deso-examples-react
npm i
npm run start
```

## How to use this repo

If you want to port these examples to your own app, set up a project using the
docs for your preferred tool (Create React App, Vite, Nextjs, Remix, Angular, Vue,
etc). If you're not sure, Create React App is a reasonable choice for getting a
development environment up and running for quick prototyping/experimenting.

Next install the [DeSo identity
library](https://www.npmjs.com/package/@deso-core/identity) using your preferred
package manager:

```sh
# npm
npm i @deso-core/identity

# yarn
yarn add @deso-core/identity
```

Finally, use the examples found in this repo to help you build social features
for your application using the [DeSo blockchain](https://deso.com)

There are lots of comments throughout the code, but if anything is unclear, please open an issue!

## Examples

- [Configuration](./src/routes/root.jsx#L7)
- [Login](./src/components/nav.jsx#L27)
- [Logout](./src/components/nav.jsx#L31)
- State Sync
  1. [Create a react context](./src/contexts.js#L7)
  2. [Set up useState hook](./src/routes/root.jsx#L18)
  3. [Set up useEffect hook](./src/routes/root.jsx#L24)
  4. [Subscribe to identity](./src/routes/root.jsx#L40)
  5. [Instantiate a context provider](./src/routes/root.jsx#L117)
  6. [Use state from identity anywhere](./src/components/nav.jsx#L8)
  7. [React to changes in your code](./src/components/nav.jsx#L16)
- [Check permissions](./src/routes/sign-and-submit-tx.jsx#L8)
- [Request permissions](./src/routes/sign-and-submit-tx.jsx#L50)
- [Create, sign, submit a transaction](./src/routes/sign-and-submit-tx.jsx#L61)
