pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    string message;

    constructor(){
        console.log("I am smart");
    }

    function wave(string memory _message) public{
        totalWaves += 1;
        message = _message;
        console.log("%s waved at us! and wrote: %s", msg.sender, message);
    }

    function getTotalWaves() public view returns (uint256){
        console.log("A total of %d good people waved at us!", totalWaves);
        return totalWaves;
    }
}
