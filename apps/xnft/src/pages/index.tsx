import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3, Idl } from '@project-serum/anchor';
import dynamic from "next/dynamic";
import { Container } from '@/components/Container';
import { useWallet } from "@solana/wallet-adapter-react";
import toast from 'react-hot-toast';

// This is to disable SSR when using WalletMultiButton
const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);


//@ts-ignore
const getSolanaObject = () => window?.solana;



export default function Home() {

  const wallet = useWallet()
  const [publicKey, setPublicKey] = useState<string>("");

  const checkIfWalletIsConnected = async () => {
    const solana = getSolanaObject();
    try {
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

    } catch (error) {
      setPublicKey("");
      console.log(error);
      toast.error("Error In Connecting Wallet, Try Phantom");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected().then();
    // return () => getSolanaObject().disconnect();
  }, []);

  const walletConnect = async () => {
    const solana = getSolanaObject();
    try {
      // console.log(await wallet.connect())
      const response = await solana.connect({});
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );
      setPublicKey(response.publicKey.toString());
    } catch (error) {
      toast.error("Error In Connecting Wallet, Try Phantom");
      console.error(error)
    }
  }

  console.log(wallet.publicKey)


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
              <button
                onClick={walletConnect}
                className='bg-blue-500 hover:scale-105 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition-all duration-200'
              >
                Connect Wallet
              </button>
            </>
          }

          {wallet.publicKey && <>
            <Container enable={false} />
          </>}

        </div>

      </main>
    </>
  )
}
