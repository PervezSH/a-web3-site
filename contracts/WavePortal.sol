pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    // Generate a random number
    uint256 private seed; 

    // Event is an inheritable member of a contract, it is emitted and stores the arguments passed in transaction logs
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave{
        address waver;
        string message;
        uint256 timestamp;
    }

    // An array of structs
    Wave[] waves;

    constructor () payable {
        console.log("I am Smart Contract!");
        
        // Set initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public{
        totalWaves += 1;
        console.log("%s waved at us! and wrote: %s", msg.sender, _message);

        // Storing the wave data into array
        waves.push(Wave(msg.sender, _message, block.timestamp));
        // Emitting NewWave Event
        // These logs get stored in the blockchain and are accessible using address of the contract
        emit NewWave(msg.sender, block.timestamp, _message);

        // Generate a new seed
        seed = (block.timestamp + block.difficulty + seed) % 100;
        console.log("Random # generated: %d", seed);
        //50% Chance that the user wins the prize

        if (seed <= 50) {
            console.log("%s Won!", msg.sender);
            // Send ETH to the winer
            uint256 prizeAmount = 0.0001 ether;

            require(
                prizeAmount <= address(this).balance,
                "Not Enough Money:("
            );
            // Sending money
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to send money:(");
        }
    }

    function getTotalWaves() public view returns (uint256){
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }
}
