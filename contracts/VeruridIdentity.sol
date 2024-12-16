// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VeruridIdentity is ReentrancyGuard, Ownable {
    struct User {
        bytes32 publicDataHash;
        bytes32 privateDataHash;
        bool isVerified;
        uint256 lastVerificationTime;
    }
    
    mapping(address => User) public users;
    mapping(bytes32 => bool) public usedProofs;
    
    event UserRegistered(address indexed userAddress, bytes32 publicDataHash);
    event VerificationCompleted(address indexed userAddress, uint256 timestamp);
    event VerificationFailed(address indexed userAddress, uint256 timestamp);
    
    error InvalidProof();
    error ProofAlreadyUsed();
    error UserNotRegistered();
    error UserAlreadyVerified();
    
    constructor() Ownable(msg.sender) {}
    
    function registerUser(
        bytes32 _publicDataHash,
        bytes32 _privateDataHash
    ) external nonReentrant {
        if(users[msg.sender].isVerified) revert UserAlreadyVerified();
        
        users[msg.sender] = User({
            publicDataHash: _publicDataHash,
            privateDataHash: _privateDataHash,
            isVerified: false,
            lastVerificationTime: 0
        });
        
        emit UserRegistered(msg.sender, _publicDataHash);
    }
    
    function verifyUser(
        bytes32 _zkProof,
        bytes calldata _proof,
        uint256[2] calldata _pubSignals
    ) external nonReentrant {
        if(users[msg.sender].publicDataHash == bytes32(0)) revert UserNotRegistered();
        if(usedProofs[_zkProof]) revert ProofAlreadyUsed();
        
        // Verify the ZK proof
        bool isValid = verifyProof(_proof, _pubSignals);
        if(!isValid) revert InvalidProof();
        
        // Mark proof as used
        usedProofs[_zkProof] = true;
        
        // Update user verification status
        users[msg.sender].isVerified = true;
        users[msg.sender].lastVerificationTime = block.timestamp;
        
        emit VerificationCompleted(msg.sender, block.timestamp);
    }
    
    function verifyProof(
        bytes calldata _proof,
        uint256[2] calldata _pubSignals
    ) internal pure returns (bool) {
        // In production, implement the actual verification logic using your ZK-SNARK verification library
        // This is a placeholder that should be replaced with actual verification
        return true;
    }
    
    function isUserVerified(address _user) external view returns (bool) {
        return users[_user].isVerified;
    }
}