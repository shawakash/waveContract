import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

//@ts-ignore
const getSolanaObject = () => window?.solana;

export default function Home() {

  const [publicKey, setPublicKey] = useState<String>("");

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
      alert('Solana object not found! Get a Phantom Wallet 👻');
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
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      Hola
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
