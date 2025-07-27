# Solana Pay NFT Minter

This is a [Solana Pay](https://solana.com/solana-pay) sample application that demonstrates how to mint an NFT on Solana.

Here is the [Mainnet Demo](https://solana-pay-nft-minter.vercel.app/). To mint, ensure that your wallet is funded with SOL.

## How It Works

This application has two main parts:

1.  A frontend built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/) that displays a QR code for the user to scan.
2.  A backend that handles the minting process.

The minting process is handled by the API route `pages/api/mintNft.ts`. This API route is responsible for creating and sending the minting transaction to the user's wallet.

## Getting Started

To run this application locally, you will need to have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed.

1.  Clone this repository:

    ```bash
    git clone https://github.com/solana-developers/solana-pay-nft-minter.git
    ```

2.  Install the dependencies:

    ```bash
    cd solana-pay-nft-minter
    yarn install
    ```

3.  Run the development server:

    ```bash
    yarn dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scanning QR codes

Solana Pay only works with https URLs, so you won't be able to scan QR codes from a `http://localhost` or `http://192.168...` domain with a wallet.

The easiest way in dev is to use [ngrok](https://ngrok.com). Once you install it you'll be able to run `ngrok http 3000` to get your app running on an https ngrok subdomain. Visiting that subdomain will be identical to your localhost, including hot reloading. But because it's public and https, you'll be able to scan Solana Pay QR codes with any compatible wallet.

## Reference

The `reference` in Solana Pay refers to a unique public key that is included as an account in a transaction, so that we can listen for a transaction including it. It doesn't affect the behavior of the transaction, and is neither a signer nor writeable.

When we create a transaction request QR code we don't know what transaction is going to be created. The API can return any transaction, and can for example choose to return different transactions based on the user requesting the transaction.

We can use the `findReference` function to find a transaction on-chain with the given reference. This allows us to display the QR code on one device, scan it and sign/send the transaction in a wallet on a different device/network, and detect it on the device displaying the QR code (or anywhere else) immediately, without knowing anything about the transaction beforehand - except that it will include the `reference`.

An example of listening for transactions with a given reference can be found in [`./components/MintQR.tsx`](./components/MintQR.tsx)
