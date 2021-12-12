const main = async () => {
    // Grabbing the wallet address of Contract Owner(the person deploying our contract/me)
    const [deployer] = await hre.ethers.getSigners();
    // Returns the balnce of deployer's wallet
    const accountBalance = await deployer.getBalance();
  
    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());
    // Compile our contract and generates necessary files under the artifacts directory
    const Token = await hre.ethers.getContractFactory('WavePortal');
    // Deploying our contract
    const portal = await Token.deploy();
    await portal.deployed();

    // Address where contract is deployed to
    console.log('WavePortal address: ', portal.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();