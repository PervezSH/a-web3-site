pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    // Event is an inheritable member of a contract, it is emitted and stores the arguments passed in transaction logs
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave{
        address waver;
        string message;
        uint256 timestamp;
    }

    // An array of structs
    Wave[] waves;

    constructor(){
        console.log("I am Smart Contract!");
    }

    function wave(string memory _message) public{
        totalWaves += 1;
        console.log("%s waved at us! and wrote: %s", msg.sender, _message);

        // Storing the wave data into array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Emitting NewWave Event
        // These logs get stored in the blockchain and are accessible using address of the contract
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getTotalWaves() public view returns (uint256){
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }
}
