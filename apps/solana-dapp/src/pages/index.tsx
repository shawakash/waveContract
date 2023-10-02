import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Gif, GifRequestData, LinkForm } from './component/LinkForm';
import { GifCards } from './component/GifCards';

const inter = Inter({ subsets: ['latin'] })

//@ts-ignore
const getSolanaObject = () => window?.solana;

const getRandomTimestamp = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Create a dummyGifs array
const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
  'https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif',
  'https://media.giphy.com/media/Hmil6ssfJNaNbGP5Ud/giphy.gif',
  'https://media.giphy.com/media/5SqS7vqbKbouQ/giphy.gif',
  'https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif',
];

const dummyGifs: Gif[] = TEST_GIFS.map((link, index) => ({
  address: link,
  timestamp: getRandomTimestamp(),
  name: `GIF ${index + 1}`,
  link: `https://example.com/gif${index + 1}`,
}));




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

  const handleGif = (data: GifRequestData) => {
    
  }

  return (
    <>
      <Head>
        <title>Solana</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col gap-y-10 bg-gradient-to-br from-blue-200 to-purple-500 items-center p-24 ${inter.className}`}
      >

        {publicKey.length == 0 &&
          <button
            onClick={walletConnect}
            className=''
          >
            Connect Wallet
          </button>
        }

        <LinkForm
          handleGif={handleGif}
          connectWallet={walletConnect}
          currentAccount={publicKey}
        />


        <GifCards
          gifs={dummyGifs}
        />

      </main>
    </>
  )
}
