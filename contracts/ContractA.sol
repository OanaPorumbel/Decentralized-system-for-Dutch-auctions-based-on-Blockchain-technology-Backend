pragma solidity ^0.8.3;
pragma experimental ABIEncoderV2;


contract ContractA {
    address owner;

     uint256 testVar;

     event TestEvent(uint256 testVar);

    constructor() {
        owner = msg.sender;
    }

    function incrementTestVar() public {
        testVar = testVar + 1;

        emit TestEvent(testVar);
    }

}