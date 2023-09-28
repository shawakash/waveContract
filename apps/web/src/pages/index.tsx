import Image from 'next/image'
import { Inter } from 'next/font/google'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { ethers } from 'ethers';
import abiJson from '../utils/WavePortal.json';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PersonIntroduction } from "../components/PersonIntroduction"
import { WaveForm } from "../components/WaveForm"
import { WavesList } from '@/components/WaveList';


const inter = Inter({ subsets: ['latin'] })

export type Wave = {
  address: string,
  timestamp: object,
  name: string,
  message: string
}

export type WaveRequestData = {
  name: string,
  message: string
}

//@ts-ignore
const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async (): Promise<string | null> => {
  try {
    const ethereum = getEthereumObject();

    /*
    * First make sure we have access to the Ethereum object.
    */
    if (!ethereum) {
      console.error("Make sure you have a Wallet!, recomended: Metamask");
      alert("Make sure you have a Wallet 💳!, recomended: Metamask");
      return null;
    }

    console.log("Wallet Connected", ethereum);

    // fetches all the account
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      alert('Connect any one of your eth account to its network 🛜')
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};


export default function Home() {

  const [allWaves, setAllWaves] = useState<Wave[]>([]);
  const [totalWaves, setTotalWaves] = useState<Number | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [loader, setLoader] = useState<Boolean>(false);
  const contractAddress = '0x2A2ED2F9F5Df8fA8442426c1618e2792972F3eDC';
  const contractABI = abiJson.abi;

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Make sure you have a Wallet 💳!, recomended: Metamask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const wave = async (data: WaveRequestData) => {
    try {
      const { name, message } = data;

      const ethereum = getEthereumObject();
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        setLoader(true);
        toast.success("Directing to Metamask!")

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count);

        // Waving
        //@ts-ignore
        const waveTxn = await wavePortalContract.wave(name, message);
        const txnHash: string = waveTxn.hash;
        toast.promise(waveTxn.wait(), {
          loading: `Mining -- ${txnHash.slice(0, 3) + "..." + txnHash.slice(txnHash.length - 5, txnHash.length - 1)}`,
          success: `Minned -- ${txnHash.slice(0, 3) + "..." + txnHash.slice(txnHash.length - 5, txnHash.length - 1)}`,
          error: "Some Problem"
        });
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        setLoader(false);

        count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count);
        await getAllWaves();
        console.log("Retrieved total wave count...", count);

      } else {
        console.log("Ethereum object doesn't exist!");
      }

    } catch (error) {
      console.error(error);
    }
  }

  const getTotalWaves = async () => {
    try {
      const ethereum = getEthereumObject();
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const waveContract = new ethers.Contract(contractAddress, contractABI, signer);

        const totalWaves = await waveContract.getTotalWaves();
        console.log("Total Waves: ", totalWaves);
        return totalWaves;
      }

    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const getAllWaves = async () => {
    try {
      const ethereum = getEthereumObject();
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();


        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned: Wave[] = [];
        for (let i = waves.length - 1; i >= 0; i--) {
          const wave = waves[i];
          wavesCleaned.push({
            address: wave.waver,
            name: wave.name,
            message: wave.message,
            timestamp: new Date(Number(wave.timestamp) * 1000),
          });
        }

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findMetaMaskAccount().then(async (account) => {

      if (account !== null) {
        setCurrentAccount(account);
      }
    });

    if (currentAccount) {
      getTotalWaves().then(waves => {
        setTotalWaves(waves);
      });
      getAllWaves().then(_ => console.log());
    }

  }, [currentAccount]);

  const person = {
    name: 'John Doe',
    title: 'Web Developer',
    description:
      'I am a web developer with expertise in front-end and back-end technologies. I enjoy creating responsive and user-friendly web applications.',
    imageUrl: 'https://avatars.githubusercontent.com/u/112852873?v=4', // Replace with the actual image URL
  };

  console.log(allWaves)

  return (
    <main
      className={`flex min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 gap-y-10 flex-col bg-slate-100 items-center p-24 ${inter.className}`}
    >
      <PersonIntroduction
        name={person.name}
        title={person.title}
        description={person.description}
        imageUrl={person.imageUrl}
        totalWaves={totalWaves}
      />

      <WaveForm
        handleWave={wave}
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      />

      <WavesList 
          waves={allWaves}
      />

    </main>
  );
}




