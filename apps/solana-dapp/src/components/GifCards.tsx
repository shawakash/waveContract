import React, { useEffect, useState } from 'react';
import { Gif } from './LinkForm';
import Link from 'next/link';

export const GifCards: React.FC<{ gifs: Gif[] }> = ({ gifs }) => {

  return (
    <div className="flex flex-wrap justify-center items-center gap-10">
      {gifs.map((gif, index) => (
        <div
          key={index}
          className="bg-white w-[400px] h-[380px] rounded-2xl flex flex-col gap-y-2  shadow-lg hover:shadow-2xl transition-all duration-300">
          <img
            src={gif.link}
            alt={gif.address.toString()}
            className="w-[400px] h-[300px] rounded-t-2xl object-cover"
          />
          <Link href={`https://explorer.solana.com/address/${gif.address.toString()}?cluster=devnet`}>
            <p className="text-center text-gray-800">Address: <span className='text-gray-500'>{gif.address.toString().slice(0, 5)}...</span></p>
          </Link>
          <p className="text-center text-gray-500">{gif.name.toString()}</p>
        </div>
      ))}
    </div>
  );
};
