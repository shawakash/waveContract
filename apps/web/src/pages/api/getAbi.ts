import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const {ETHERSCAN_API_KEY} = process.env;

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if(req.method != 'GET') {
        return res.status(400).json({ message: 'Its a get Request' });
    }

    try {
        const { contractaddress } = req.headers;
        const apiUrl = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractaddress}&apikey=${ETHERSCAN_API_KEY}`;
        console.log(contractaddress)
        const response = await axios.get(apiUrl);
    
        if (response.data.status === '1') {
          const abi = JSON.parse(response.data.result);
          console.log(abi);
          return abi;
        } else {
          throw new Error('Etherscan API returned an error.');
        }

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: `Internal Error, ${error.message}`, error })
    }

}

export default handler;