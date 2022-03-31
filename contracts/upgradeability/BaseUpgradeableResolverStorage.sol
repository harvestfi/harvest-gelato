// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BaseUpgradeableResolverStorage {
  bytes32 internal constant _PAUSED_TRIGGERING_SLOT = 0xb39eacfef30dce8bf4d2a1c5e2b0c13a57748f43c411d367f32a3c0b373a0fd2;
  bytes32 internal constant _PROFIT_SHARING_TARGET_SLOT = 0x7efd8c16bc3c6e12a0af8e8d60f363ad4fbfb76959198a3b4fa2451c8b61360f;
  bytes32 internal constant _PROFIT_SHARING_TOKEN_TO_NATIVE_PRICEFEED_SLOT = 0x80b975bc5e76d9ae26fa73d022ca45acd59dc15f92020385bd6d5fd467284b08;
  bytes32 internal constant _GREAT_DEAL_RATIO_SLOT = 0xcfb514bf2c31d5828d2d3bff1fbebd93582c481a1cd796583ad6daeb51cedf36;
  bytes32 internal constant _PROFIT_SHARING_TOKEN_SLOT = 0x406c2950ca74957cee4ebed9a6daac5c5b97fceb405fa1eae4ebc01cbd61e099;
  bytes32 internal constant _CONTROLLER_SLOT = 0x70b3e8d18368bad384385907a3d89cfeecfe7c949e3ad705957a29512e260ec2;
  bytes32 internal constant _POKE_ME_SLOT = 0xc8e8ea5944ac445d6a6d8a4f7bcdd582856398bbc65a75356981628f30c6324d;
  bytes32 internal constant _GAS_FEE_PREMIUM_SLOT = 0xefe8fc35a91b0afe7baad82b4baf0c7e1279ea58ed2599ac12fe856e41826a2f;
  bytes32 internal constant _MAX_IDLE_FRACTION_SLOT = 0xa4bf07778ed0f11bbf14f1fe680b39652ccdb81e7fcd41c3bfb820fcfa377fe1;

  bytes32 internal constant _NEXT_IMPLEMENTATION_SLOT = 0xcfe905b661403e0f26512769ffd220899a7e83e70902b0e494ce2c2d8f6a6563;
  bytes32 internal constant _NEXT_IMPLEMENTATION_TIMESTAMP_SLOT = 0x03ac3c2f69082456ae0db3f2a1e5928d18e44938556e9d71462c4b83c57356c4;
  bytes32 internal constant _NEXT_IMPLEMENTATION_DELAY_SLOT = 0xf410e535ca71b322566106e38b02191b5c44412157ef838524bd18c56b5adb8b;

  constructor() {
    assert(_PAUSED_TRIGGERING_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.pausedTriggering")) - 1));
    assert(_PROFIT_SHARING_TARGET_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.profitSharingTarget")) - 1));
    assert(_PROFIT_SHARING_TOKEN_TO_NATIVE_PRICEFEED_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.profitToNativeTokenPricefeed")) - 1));
    assert(_GREAT_DEAL_RATIO_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.greatDealRatio")) - 1));
    assert(_PROFIT_SHARING_TOKEN_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.profitSharingToken")) - 1));
    assert(_CONTROLLER_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.controller")) - 1));
    assert(_POKE_ME_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.pokeMe")) - 1));
    assert(_GAS_FEE_PREMIUM_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.gasFeePremium")) - 1));
    assert(_MAX_IDLE_FRACTION_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.maxIdleFraction")) - 1));

    assert(_NEXT_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.nextImplementation")) - 1));
    assert(_NEXT_IMPLEMENTATION_TIMESTAMP_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.nextImplementationTimestamp")) - 1));
    assert(_NEXT_IMPLEMENTATION_DELAY_SLOT == bytes32(uint256(keccak256("eip1967.resolverStorage.nextImplementationDelay")) - 1));
  }

  function _setController(address value) internal {
    setAddress(_CONTROLLER_SLOT, value);
  }

  function controller() public view returns (address) {
    return getAddress(_CONTROLLER_SLOT);
  }

  function _setPokeMe(address value) internal {
    setAddress(_POKE_ME_SLOT, value);
  }

  function pokeMe() public view returns (address) {
    return getAddress(_POKE_ME_SLOT);
  }

  function _setMaxIdleFraction(uint256 value) internal {
    setUint256(_MAX_IDLE_FRACTION_SLOT, value);
  }

  function maxIdleFraction() public view returns (uint256) {
    return getUint256(_MAX_IDLE_FRACTION_SLOT);
  }

  function _setProfitSharingTokenToNativePriceFeed(address value) internal {
    setAddress(_PROFIT_SHARING_TOKEN_TO_NATIVE_PRICEFEED_SLOT, value);
  }

  function profitSharingTokenToNativePriceFeed() public virtual view returns (address) {
    return getAddress(_PROFIT_SHARING_TOKEN_TO_NATIVE_PRICEFEED_SLOT);
  }

  function _setProfitSharingTarget(address value) internal {
    setAddress(_PROFIT_SHARING_TARGET_SLOT, value);
  }

  function profitSharingTarget() public view returns (address) {
    return getAddress(_PROFIT_SHARING_TARGET_SLOT);
  }

  function _setProfitSharingToken(address value) internal {
    setAddress(_PROFIT_SHARING_TOKEN_SLOT, value);
  }

  function profitSharingToken() public view returns (address) {
    return getAddress(_PROFIT_SHARING_TOKEN_SLOT);
  }

  function _setGreatDealRatio(uint256 value) internal {
    setUint256(_GREAT_DEAL_RATIO_SLOT, value);
  }

  function greatDealRatio() public view returns (uint256) {
    return getUint256(_GREAT_DEAL_RATIO_SLOT);
  }

  function _setGasFeePremium(uint256 value) internal {
    setUint256(_GAS_FEE_PREMIUM_SLOT, value);
  }

  function gasFeePremium() public view returns (uint256) {
    return getUint256(_GAS_FEE_PREMIUM_SLOT);
  }

  // a flag for disabling any triggers for emergencies
  function _setPausedTriggering(bool value) internal {
    setBoolean(_PAUSED_TRIGGERING_SLOT, value);
  }

  function pausedTriggering() public view returns (bool) {
    return getBoolean(_PAUSED_TRIGGERING_SLOT);
  }

  // upgradeability
  function _setNextImplementation(address value) internal {
    setAddress(_NEXT_IMPLEMENTATION_SLOT, value);
  }

  function nextImplementation() public view returns (address) {
    return getAddress(_NEXT_IMPLEMENTATION_SLOT);
  }

  function _setNextImplementationTimestamp(uint256 value) internal {
    setUint256(_NEXT_IMPLEMENTATION_TIMESTAMP_SLOT, value);
  }

  function nextImplementationTimestamp() public view returns (uint256) {
    return getUint256(_NEXT_IMPLEMENTATION_TIMESTAMP_SLOT);
  }

  function _setNextImplementationDelay(uint256 value) internal {
    setUint256(_NEXT_IMPLEMENTATION_DELAY_SLOT, value);
  }

  function nextImplementationDelay() public view returns (uint256) {
    return getUint256(_NEXT_IMPLEMENTATION_DELAY_SLOT);
  }

  // generic slots
  function setBoolean(bytes32 slot, bool value) internal {
    setUint256(slot, value ? 1 : 0);
  }

  function getBoolean(bytes32 slot) internal view returns (bool) {
    return (getUint256(slot) == 1);
  }

  function setAddress(bytes32 slot, address value) internal {
    // solhint-disable-next-line no-inline-assembly
    assembly {
      sstore(slot, value)
    }
  }

  function setUint256(bytes32 slot, uint256 value) internal {
    // solhint-disable-next-line no-inline-assembly
    assembly {
      sstore(slot, value)
    }
  }

  function getAddress(bytes32 slot) internal view returns (address str) {
    // solhint-disable-next-line no-inline-assembly
    assembly {
      str := sload(slot)
    }
  }

  function getUint256(bytes32 slot) internal view returns (uint256 str) {
    // solhint-disable-next-line no-inline-assembly
    assembly {
      str := sload(slot)
    }
  }
}
