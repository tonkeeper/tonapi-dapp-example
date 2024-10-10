# TonAPI dApp Example

This project demonstrates how to build a decentralized application (dApp) using **TonAPI** via the [`@ton-api/client`](https://www.npmjs.com/package/@ton-api/client/v/0.2.0-beta.1). It simplifies interaction with the TON blockchain by providing pre-processed data formats. The project is built with **React**, **TypeScript**, and **Vite**, and integrates **TonConnect** for wallet interaction.

[View the example here](https://tonkeeper.github.io/tonapi-dapp-example/)

## Features

- **TonAPI via `@ton-api/client`**: Enables straightforward blockchain interaction with TON, making it easy to fetch and send data in usable formats.
- **TonConnect Integration**: Wallet connection for interacting with the dApp.

## Quick Start

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`

To use the full API functionality, add your API key from [TonConsole](https://tonconsole.com) in the `.env` file:

```
VITE_TONAPI_KEY=your-api-key
```

For browser-based dApps, it's recommended to set usage limits by IP when issuing the key. The app can still run without the key for basic functionality.

