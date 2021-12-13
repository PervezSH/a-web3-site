// This scripts compiles the smart contract, deploys it to our local blockchain, and run it once it's there.

const main = async () => {
    //Grabbing the wallet address of Contract Owner(the person deploying our contract/me) and also grabbed a random wallet address
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // Compile our contract and generates necessary files under the artifacts directory
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    // Getting totalWave count
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("A total of %d good people waved at us!", waveCount);
    
    // Waving at myself
    let waveTxn = await waveContract.wave("I'm the Owner");
    await waveTxn.wait(); // Wait for the transaction to be mined
    
    // Random person waving at us
    waveTxn = await waveContract.connect(randomPerson).wave("Heyyyyyy!");
    await waveTxn.wait(); // Wait for the transaction to be mined
    
    // Getting totalWave count again
    waveCount = await waveContract.getTotalWaves();
    console.log("A total of %d good people waved at us!", waveCount);
    
    // Getting Wave struct
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