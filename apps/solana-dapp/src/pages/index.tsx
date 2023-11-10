import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Gif, GifRequestData, LinkForm } from '../components/LinkForm';
import { GifCards } from '../components/GifCards';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3, Idl } from '@project-serum/anchor';
import { Buffer } from "buffer";
import toast from 'react-hot-toast';
import data from "../utils/keypair.json";

const inter = Inter({ subsets: ['latin'] })

//@ts-ignore
const getSolanaObject = () => window?.solana;

const getRandomTimestamp = (): string => {
  const currentDate = new Date();
  return currentDate.toISOString(); // Returns the current timestamp in ISO format
};

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(data._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret);

// This is the address of your solana program, if you forgot, just run solana address -k target/deploy/myepicproject-keypair.json
export const programID = new PublicKey("2iPwRfZMtBJroE52FUUV4i5Jm75z18KTm3mJPt2N9ZDZ");

// Set our network to devnet.
export const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
export const opts = {
  preflightCommitment: "processed"   // "finalized" --> for the whole solana t verify your transaction
}


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



const getGifs = (list: Gif[]) => {
  const gifs = list.map((gif: Gif, _index: Number) => gif);
  return gifs;
}


export default function Home() {


  const [publicKey, setPublicKey] = useState<string>("");
  const [gifs, setGifs] = useState<Gif[] | null>(null);
  const [hasAccount, setHasAccount] = useState<Boolean>(() => baseAccount.publicKey == null ? false : true);

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

  const createAccount = async () => {
    try {
      const provider = getProvider();
      const program = await getProgram();

      console.log("Ping..");

      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });
      console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
      setHasAccount(true);

      await getGifList();
    } catch (error) {
      console.log("Error creating BaseAccount account:", error);
    }
  }

  const getProgram = async (): Promise<Program<Idl>> => {
    // Get metadata about your solana program
    const idl = await Program.fetchIdl(programID, getProvider());
    // Create a program that you can call
    //@ts-ignore
    return new Program(idl, programID, getProvider());
  };

  const getGifList = async () => {
    try {
      const program = await getProgram();
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

      console.log("Got the account", account)
      //@ts-ignore
      const gifs = getGifs(account.gifList);
      setGifs(gifs);

    } catch (error) {
      console.log("Error in getGifList: ", error)
      setGifs([]);
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected().then();
    return () => getSolanaObject().disconnect();
  }, []);

  useEffect(() => {
    if (publicKey) {
      console.log('Fetching GIF list...');
      getGifList();
    }
  }, [publicKey])

  const walletConnect = async () => {
    const solana = getSolanaObject();
    const response = await solana.connect({});
    console.log(
      'Connected with Public Key:',
      response.publicKey.toString()
    );
    setPublicKey(response.publicKey.toString());
  }

  const handleGif = async (data: GifRequestData) => {

    if (data) {
      try {
        const provider = getProvider();
        const program = await getProgram();

        // toast.promise(program.rpc.addGif(data.link, data.name, {
        //   accounts: {
        //     baseAccount: baseAccount.publicKey,
        //     user: provider.wallet.publicKey
        //   },
        // }), {
        //   loading: "Adding Giff..",
        //   success: "Added Successfully",
        //   error: "Solana Error"
        // });

        await program.rpc.addGif(data.link, data.name, {
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey
          },
        });
        console.log("GIF successfully sent to program", data.link);

        await getGifList();

      } catch (error) {
        console.log("Error sending GIF:", error)
      }

      //@ts-ignore
    }

  }

  const getProvider = () => {
    const solana = getSolanaObject();
    //@ts-ignore
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      //@ts-ignore
      connection, solana, opts.preflightCommitment,
    );
    return provider;
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

        <LinkForm
          handleGif={handleGif}
          connectWallet={walletConnect}
          currentAccount={publicKey}
          createAccount={createAccount}
          hasAccount={hasAccount}
        />


        {gifs && <GifCards
          gifs={gifs}
        />}

      </main>
    </>
  )
}
