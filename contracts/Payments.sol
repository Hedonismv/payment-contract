pragma solidity ^0.8.0;

contract Payments {
    address owner;

    event Paid(address indexed _from, uint _amount, uint _timestamp);

    constructor(){
        owner = msg.sender;
    }

    function pay() external payable{
        emit Paid(msg.sender, msg.value, block.timestamp);
    }


    modifier onlyOwner(address _to){
        require(msg.sender == owner, "You are not an owner of this address");
        require(_to != address(0), "Invalid address");
        _;
    }

    function withdraw(address payable _to) external payable onlyOwner(_to){
        _to.transfer(address(this).balance);
    }

}
