// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    struct WaveData {
        string name;
        uint256 waveCount;
    }

    struct ReturnWaveData {
        string name;
        uint256 waveCount;
        string addressString;
    }

    struct WaveAddress {
        string name;
        string addressString;
    }

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved.
        string name;
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] waves;

    // Mapping from address to WaveData
    mapping(address => WaveData) public waveData;
    address[] wavedAddress;

    constructor() {
        console.log("There starts the journey of a LEGEND! ");
        console.log(msg.sender);
    }

    function wave(string memory _name, string memory _message) public {
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        if (bytes(_name).length == 0) {
            waves.push(Wave(msg.sender, "Anonymus", _message, block.timestamp));
        } else {
            waves.push(Wave(msg.sender, _name, _message, block.timestamp));
        }

        wavedAddress.push(msg.sender);
        waveData[msg.sender].waveCount += 1;

        if (bytes(waveData[msg.sender].name).length == 0) {
            if (bytes(_name).length == 0) {
                waveData[msg.sender].name = "Anonymous";
            } else {
                waveData[msg.sender].name = _name;
            }
        }

        console.log("%s has waved!", msg.sender);
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getWaversData() public view returns (ReturnWaveData[] memory) {
        uint256 numWaved = wavedAddress.length;
        ReturnWaveData[] memory uniqueWavesData = new ReturnWaveData[](
            numWaved
        );

        uint256 uniqueCount = 0;

        for (uint256 i = 0; i < numWaved; i++) {
            address userAddress = wavedAddress[i];

            // Check if the address is not seen before
            bool isUnique = true;
            for (uint256 j = 0; j < uniqueCount; j++) {
                if (
                    keccak256(bytes(uniqueWavesData[j].name)) ==
                    keccak256(bytes(waveData[userAddress].name)) &&
                    uniqueWavesData[j].waveCount ==
                    waveData[userAddress].waveCount
                ) {
                    isUnique = false;
                    break;
                }
            }

            if (isUnique) {
                uniqueWavesData[uniqueCount].name = waveData[userAddress].name;
                uniqueWavesData[uniqueCount].waveCount = waveData[userAddress]
                    .waveCount;
                uniqueWavesData[uniqueCount].addressString = addressToString(
                    userAddress
                );

                uniqueCount++;
            }
        }

        // Resize the array to remove empty slots (if any)
        assembly {
            mstore(uniqueWavesData, uniqueCount)
        }

        return uniqueWavesData;
    }

    function getWavesFor(string memory _name) public view returns (uint256) {
        uint256 numWaved = wavedAddress.length;

        if (bytes(_name).length == 0) {
            // Return 0 if no name is provided
            return 0;
        }

        uint256 totalWavesForName = 0;

        for (uint256 i = 0; i < numWaved; i++) {
            address userAddress = wavedAddress[i];
            if (
                keccak256(bytes(waveData[userAddress].name)) ==
                keccak256(bytes(_name))
            ) {
                totalWavesForName += waveData[userAddress].waveCount;
            }
        }

        return totalWavesForName;
    }

    function addressToString(
        address _address
    ) internal pure returns (string memory) {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory hexString = new bytes(42); // Address is 20 bytes, plus "0x" and 2 characters for each byte
        for (uint i = 0; i < 20; i++) {
            bytes1 char = bytes1(
                uint8(uint256(_bytes) / (2 ** (8 * (19 - i))))
            );
            bytes1 hi = bytes1(uint8(char) / 16);
            bytes1 lo = bytes1(uint8(char) - 16 * uint8(hi));
            hexString[i * 2] = toHexChar(hi);
            hexString[i * 2 + 1] = toHexChar(lo);
        }
        return string(abi.encodePacked("0x", hexString));
    }

    function toHexChar(bytes1 _byte) internal pure returns (bytes1) {
        if (_byte < bytes1(uint8(10))) {
            return bytes1(uint8(_byte) + 0x30); // 0-9
        } else {
            return bytes1(uint8(_byte) + 0x57); // a-f
        }
    }

    function getWaverLogs() public view returns (WaveAddress[] memory) {
        uint256 wavedAddressLength = wavedAddress.length;
        WaveAddress[] memory recent = new WaveAddress[](wavedAddressLength);

        for (uint i = 0; i < wavedAddressLength; i++) {
            address waveAddress = wavedAddress[i];
            recent[i].addressString = addressToString(wavedAddress[i]);
            recent[i].name = waveData[waveAddress].name;
        }

        return recent;
    }
}
