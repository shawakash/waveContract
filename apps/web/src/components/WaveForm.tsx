import { WaveRequestData } from "@/pages";
import React, { FormEvent, LegacyRef, useRef } from "react";

export const WaveForm: React.FC<{
    handleWave: (data: WaveRequestData) => void,
    currentAccount: string,
    connectWallet: () => void,
  }> =
    ({ handleWave, currentAccount, connectWallet }) => {

      const nameRef = useRef<HTMLInputElement>(null);
      const messageRef = useRef<HTMLTextAreaElement>(null);

      const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
          //@ts-ignore
          name: nameRef.current.value,
          //@ts-ignore
          message: messageRef.current.value
        };

        handleWave(data);
      }

      return (
        <>
          <div className="w-[1000px]">
            <form onSubmit={handleSubmit} className="bg-white hover:shadow-xl transition-all duration-200 rounded-lg shadow-md p-6">
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
                  defaultValue={""}
                  ref={nameRef}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-600 font-semibold">
                  Message
                </label>
                <textarea
                  rows={2}
                  id="message"
                  name="message"
                  className="w-full border rounded-md transition-all duration-200 py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Your Message"
                  defaultValue={""}
                  required
                  ref={messageRef}
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