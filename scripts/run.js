// This scripts compiles the smart contract, deploys it to our local blockchain, and run it once it's there.

const main = async () => {
    //Grabbing the wallet address of Contract Owner(the person deploying our contract/me) and also grabbed a random wallet address
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // Compile our contract and generates necessary files under the artifacts directory
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
      // Fund the contract so we can send ETH
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
    
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    // Get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    // Wave 
    let waveTxn = await waveContract.wave("Wave #1");
    await waveTxn.wait(); // Wait for the transaction to be mined

    let waveTxn2 = await waveContract.wave("Wave #2");
    await waveTxn2.wait(); // Wait for the transaction to be mined
    
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));
    
    // Get all waves
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();