import { useEffect, useMemo, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import {
  createQR,
  encodeURL,
  TransactionRequestURLFields,
  findReference,
  FindReferenceError,
} from "@solana/pay";
import { Keypair } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import useToastHook from "@/hooks/useToastHook";

export default function MintQR() {
  const { connection } = useConnection();

  // Initialize a ref used for the QR code
  const qrRef = useRef<HTMLDivElement>(null);

  // Generate a random reference address that is added to the Solana Pay transaction
  // This allows us to find the transaction on the network once it's been sent by the mobile wallet
  const reference = useMemo(() => Keypair.generate().publicKey, []);

  // Keep track of the most recent transaction that was notified, so we can reuse the reference address
  // Alternatively, you can generate a new reference address for each transaction
  const mostRecentNotifiedTransaction = useRef<string | undefined>(undefined);

  // Toast notification hook
  const displayToast = useToastHook();

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!base_url) return;
    // The API URL, which will be used to create the Solana Pay URL
    // Append the reference address to the URL as a query parameter
    const apiUrl = `${base_url}/api/mintNft?reference=${reference.toBase58()}`;

    // Create Solana Pay URL
    const urlParams: TransactionRequestURLFields = {
      link: new URL(apiUrl),
    };
    const solanaUrl = encodeURL(urlParams);

    // Create QR code encoded with Solana Pay URL
    const qr = createQR(
      solanaUrl, // The Solana Pay URL
      512, // The size of the QR code
      "transparent" // The background color of the QR code
    );

    // Update the ref with the QR code
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [reference, base_url]);

  useEffect(() => {
    if (!base_url) return;
    // Poll the network for transactions that include the reference address
    const interval = setInterval(async () => {
      try {
        // Find transactions that include the reference address
        const signatureInfo = await findReference(connection, reference, {
          until: mostRecentNotifiedTransaction.current, // Only look for transactions after the most recent one we've found
          finality: "confirmed",
        });

        // Update the most recent transaction with the transaction we just found
        mostRecentNotifiedTransaction.current = signatureInfo.signature;

        // Toast notification
        displayToast(signatureInfo.signature);
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          return;
        }
        console.error("Unknown error", e);
      }
    }, 1000); // Check for new transactions every second
    return () => {
      clearInterval(interval);
    };
  }, [reference, base_url, connection, displayToast]);

  if (!base_url) {
    return <div>Error: NEXT_PUBLIC_BASE_URL not set</div>;
  }

  return <Flex ref={qrRef} />;
}
