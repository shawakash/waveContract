import Image from 'next/image'
import { Inter } from 'next/font/google'
import { FormEvent, LegacyRef, useEffect, useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

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

  const nameRef = useRef(null);
  const [currentAccount, setCurrentAccount] = useState<string>("");

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

  useEffect(() => {
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });
  }, []);

  const person = {
    name: 'John Doe',
    title: 'Web Developer',
    description:
      'I am a web developer with expertise in front-end and back-end technologies. I enjoy creating responsive and user-friendly web applications.',
    imageUrl: 'https://avatars.githubusercontent.com/u/112852873?v=4', // Replace with the actual image URL
  };

  const handleWave = (e: FormEvent) => {
    e.preventDefault();
  }

  return (
    <main
      className={`flex min-h-screen gap-y-10 flex-col bg-slate-100 items-center p-24 ${inter.className}`}
    >
      <PersonIntroduction
        name={person.name}
        title={person.title}
        description={person.description}
        imageUrl={person.imageUrl}
      />

      <WaveForm
        handleWave={handleWave}
        nameRef={nameRef}
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      />

    </main>
  );
}

const PersonIntroduction: React.FC<{
  name: string,
  title: string,
  description: string,
  imageUrl: string,
}> = ({ name, title, description, imageUrl }) => {
  return (
    <div className="bg-white w-[1000px] rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col items-center sm:flex-row">
        <img
          src={imageUrl}
          alt={`${name}'s profile`}
          className="w-16 h-16 rounded-full mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>
      <p className="mt-4">{description}</p>
    </div>
  );
};

const WaveForm: React.FC<{
  handleWave: (e: FormEvent) => void,
  nameRef: LegacyRef<HTMLInputElement> | undefined,
  currentAccount: string,
  connectWallet: () => void
}> =
  ({ handleWave, nameRef, currentAccount, connectWallet }) => {
    return (
      <>
        <div className="w-[1000px]">
          <form onSubmit={handleWave} className="bg-white hover:shadow-xl transition-all duration-200 rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border rounded-md transition-all duration-200 py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                required
                ref={nameRef}
              />
            </div>
            <div className="flex flex-row gap-x-5">
              {!currentAccount && (
                <button className="bg-blue-500 hover:scale-105 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition-all duration-200" onClick={connectWallet}>
                  Connect Wallet 
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:scale-105 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition-all duration-200"
              >
                Wave to me 👋🏻👋🏻👋🏻
              </button>
            </div>
          </form >
        </div >
      </>
    );
  }
