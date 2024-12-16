// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UserContract is ReentrancyGuard, Ownable {
    // Address of the contract owner is handled by Ownable
    
    // Mapping of user Ethereum addresses to their user info
    mapping(address => UserInfo) private userInfoMap;

    // Structure to store user information
    struct UserInfo {
        string name;          // Public data
        uint256 phoneNumber;  // Public data
        bytes32 secretCodeHash; // Hashed secret code
        bytes32 residentAddressHash; // Hashed resident address
    }

    // Event for user creation
    event UserCreated(address indexed userAddress, string name, uint256 phoneNumber);

    constructor() Ownable(msg.sender) {}

    // Function to create a new user
    function createUser(
        string memory _name,
        uint256 _phoneNumber,
        string memory _secretCode,
        string memory _residentAddress
    ) public nonReentrant {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_phoneNumber > 0, "Phone number cannot be zero");
        require(bytes(_secretCode).length > 0, "Secret code cannot be empty");
        require(bytes(_residentAddress).length > 0, "Address cannot be empty");

        // Ensure the user is not already registered
        UserInfo storage userInfo = userInfoMap[msg.sender];
        require(
            bytes(userInfo.name).length == 0 && userInfo.phoneNumber == 0,
            "User already exists"
        );

        // Store the user's data
        userInfo.name = _name;
        userInfo.phoneNumber = _phoneNumber;
        userInfo.secretCodeHash = keccak256(abi.encodePacked(_secretCode));
        userInfo.residentAddressHash = keccak256(abi.encodePacked(_residentAddress));

        emit UserCreated(msg.sender, _name, _phoneNumber);
    }

    // Function to retrieve public information
    function getPublicInfo(address _userAddress)
        public
        view
        returns (string memory name, uint256 phoneNumber)
    {
        UserInfo storage userInfo = userInfoMap[_userAddress];
        require(bytes(userInfo.name).length > 0, "No user found for this address");
        return (userInfo.name, userInfo.phoneNumber);
    }

    // Function to retrieve private hashed data (restricted to the owner)
    function getPrivateData(address _userAddress)
        external
        view
        onlyOwner
        returns (bytes32 secretCodeHash, bytes32 residentAddressHash)
    {
        UserInfo storage userInfo = userInfoMap[_userAddress];
        require(bytes(userInfo.name).length > 0, "No user found for this address");
        return (userInfo.secretCodeHash, userInfo.residentAddressHash);
    }
}