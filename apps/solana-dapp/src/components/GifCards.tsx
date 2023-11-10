import React, { useEffect, useState } from 'react';
import { Gif } from './LinkForm';
import Link from 'next/link';

export const GifCards: React.FC<{ gifs: Gif[] }> = ({ gifs }) => {

  return (
    <div className="flex flex-wrap justify-center items-center gap-10">
      {gifs.map((gif, index) => (
        <div
          key={gif.uuid}
          className=" inset-0  bg-opacity-30 bg-gray-200 backdrop-filter backdrop-blur-lg w-[400px] h-[380px] rounded-2xl flex flex-col gap-y-2  shadow-lg hover:shadow-2xl transition-all duration-300">
          <img
            src={gif.gifLink}
            alt={gif.userAddress.toString()}
            className="w-[400px] h-[300px] rounded-t-2xl object-cover"
          />
          <Link target='self' href={`https://explorer.solana.com/address/${gif.userAddress.toString()}?cluster=devnet`}>
            <div className="flex flex-row px-4 justify-between">
              <p className="text-start text-slate-200 font-semibold tracking-wide">Address: </p>
              <p className='text-slate-300'>{gif.userAddress.toString().slice(0, 25)}...</p>
            </div>
          </Link>
          <div className="flex flex-row px-4 justify-between">
            <p className="text-center text-slate-100 font-bold">By {gif.name.toString()}</p>
            <p className="text-center text-slate-200">Votes: <span className='text-slate-300'>{gif.votes.toString()}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
};
