import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3, Idl } from '@project-serum/anchor';
import dynamic from "next/dynamic";
import { Container } from '@/components/Container';

// This is to disable SSR when using WalletMultiButton
const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);


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
    // return () => getSolanaObject().disconnect();
  }, []);

  const walletConnect = async () => {
    const solana = getSolanaObject();
    try {
      const response = await solana.connect({});
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );
      setPublicKey(response.publicKey.toString());
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <Head>
        <title>Solana</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col gap-y-10 bg-gradient-to-br from-blue-700 to-pink-500 items-center p-24 bg-blend-overlay`}
      >


        <div className="w-[1000px] min-h-[150px] bg-gray-300 hover:shadow-xl transition-all duration-200 rounded-lg shadow-md p-6">
          {publicKey.length == 0 &&
            <>
              <WalletMultiButtonDynamic className="bg-blue-500 hover:scale-105 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition-all duration-200 cta-button connect-wallet-button" />
              <button
                onClick={walletConnect}
                className='bg-blue-500 hover:scale-105 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition-all duration-200'
              >
                Connect Wallet
              </button>
            </>
          }

          {publicKey.length > 0 && <>
            <Container enable={false} />
          </>}

        </div>

      </main>
    </>
  )
}
