import React, { FormEvent, LegacyRef, useRef } from "react";

export type Gif = {
  address: string,
  timestamp: string,
  name: string,
  link: string
}

export type GifRequestData = {
  name: string,
  link: string
}

export const LinkForm: React.FC<{
    handleGif: (data: GifRequestData) => void,
    currentAccount: string,
    connectWallet: () => void,
  }> =
    ({ handleGif, currentAccount, connectWallet }) => {

      const nameRef = useRef<HTMLInputElement>(null);
      const linkRef = useRef<HTMLInputElement>(null);

      const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
          //@ts-ignore
          name: nameRef.current.value,
          //@ts-ignore
          link: linkRef.current.value
        };

        handleGif(data);
      }

      return (
        <>
          <div className="w-[1000px]">
            <form onSubmit={handleSubmit} className="bg-white hover:shadow-xl transition-all duration-200 rounded-lg shadow-md p-6">
              <div className="mb-4">
                <label htmlFor="link" className="block text-gray-600 font-semibold">
                  Gif Link
                </label>
                <input
                  id="link"
                  name="link"
                  className="w-full border rounded-md transition-all duration-200 py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Gif Link"
                  defaultValue={""}
                  required
                  ref={linkRef}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border rounded-md transition-all duration-200 py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Your Name(Optional)"
                  defaultValue={""}
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