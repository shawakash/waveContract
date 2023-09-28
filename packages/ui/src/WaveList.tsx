import Link from 'next/link';
import React from 'react';
import { Wave } from './WaveForm';

export const WavesList: React.FC<{ waves: Wave[] }> = ({ waves }) => {
    return (
        <>
            {waves.length > 0 &&
                <div className="w-[1000px] mx-auto p-4 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold mb-6">Wave Activity</h1>
                    {waves.map((wave, index) => (
                        <Link target='_blank' href={`https://sepolia.etherscan.io/address/${wave.address}`}>
                            <div
                                key={index}
                                className="mb-6 p-4 rounded-lg bg-blue-100 hover:bg-blue-200 transition duration-300 ease-in-out"
                            >
                                {wave.message.length > 0 && <p className="text-lg text-transparent bg-gradient-radial bg-clip-text  from-red-500 to-purple-500 font-semibold">{wave.message}</p>}
                                <p className="text-gray-500 font-medium mb-2">From {wave.name.trim().split(" ")[0]}, 👋🏻👋🏻👋🏻</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500">
                                        {wave.timestamp.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-700">{wave.address}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>}
        </>
    );
};

