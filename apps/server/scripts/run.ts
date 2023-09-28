import hre from 'hardhat';

const main = async () => {
    //@ts-ignore
    const [owner, randomPerson] = await hre.ethers.getSigners();

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.parseEther("0.1"),
    });
    await waveContract.waitForDeployment();
    const contractAddress = await waveContract.getAddress();

    console.log("Contract deployed to:", await waveContract.getAddress());
    console.log("Contract deployed by:", owner.address);

    await waveContract.getTotalWaves();

    // const firstWaveTxn = await waveContract.wave("owner", "hola");
    // await firstWaveTxn.wait();
    let contractBalance = await hre.ethers.provider.getBalance(
       contractAddress
    );
    console.log("Contract balance:", hre.ethers.formatEther(contractBalance), 'eth');

    const waveTxn = await waveContract.wave("", "This is wave #1");
    await waveTxn.wait();
  
    const waveTxn2 = await waveContract.wave("" ,"This is wave #2");
    await waveTxn2.wait();
  
    contractBalance = await hre.ethers.provider.getBalance(contractAddress);
    console.log(
      "Contract balance:",
      hre.ethers.formatEther(contractBalance)
    );
  
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();