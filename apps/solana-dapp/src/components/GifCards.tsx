import React, { useEffect, useState } from 'react';
import { Gif } from './LinkForm';

export const GifCards: React.FC<{ gifs: Gif[] }> = ({ gifs }) => {

    return (
        <div className="flex flex-wrap justify-center items-center gap-10">
            {gifs.map((gif, index) => (
                <div key={index} className="bg-white w-[400px] h-[380px] rounded-2xl flex flex-col gap-y-2  shadow-lg hover:shadow-2xl transition-all duration-300">
                    <img
                        // src={gif.address}
                        alt={gif.name}
                        className="w-[400px] h-[300px] rounded-t-2xl object-cover"
                    />
                    <p className="text-center text-gray-800">{gif.name}</p>
                    {/* <p className="text-center text-gray-500">{gif.timestamp.toString()}</p> */}
                </div>
            ))}
        </div>
    );
};
