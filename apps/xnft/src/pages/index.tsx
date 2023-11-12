import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3, Idl } from '@project-serum/anchor';
import { Buffer } from "buffer";
import toast from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

//@ts-ignore
const getSolanaObject = () => window?.solana;



export default function Home() {


  const [publicKey, setPublicKey] = useState<string>("");

  const checkIfWalletIsConnected = async () => {
    const solana = getSolanaObject();
    if (solana?.isPhantom) {
      console.log('Phantom wallet found!');
      const response = await solana.connect({});
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );
      setPublicKey(response.publicKey.toString());

    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻 And Connect to Devnet Network');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected().then();
    return () => getSolanaObject().disconnect();
  }, []);

  const walletConnect = async () => {
    const solana = getSolanaObject();
    const response = await solana.connect({});
    console.log(
      'Connected with Public Key:',
      response.publicKey.toString()
    );
    setPublicKey(response.publicKey.toString());
  }


  return (
    <>
      <Head>
        <title>Solana</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col gap-y-10 bg-gradient-to-br from-blue-700 to-pink-500 items-center p-24 bg-blend-overlay ${inter.className}`}
      >

        {publicKey.length == 0 &&
          <button
            onClick={walletConnect}
            className=''
          >
            Connect Wallet
          </button>
        }

      </main>
    </>
  )
}
