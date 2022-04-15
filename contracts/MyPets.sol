//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyPets {
  string public MyDog;
  address public Owner;

  constructor(string memory _myDog) {
    Owner = msg.sender;
    MyDog = _myDog;
  }

  modifier OnlyOwner(){
    require(msg.sender == Owner, "Authorized user only");
    _;
  }

  function changeOwner(address _newOwner) external OnlyOwner{
    Owner = _newOwner;
  }

  function updateDog(string memory _myDog) external OnlyOwner{
    require(msg.sender == Owner, "Authorized user only");
    MyDog = _myDog;
  }
}
