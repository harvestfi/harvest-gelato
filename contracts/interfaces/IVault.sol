// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVault {
    function availableToInvestOut() external view returns (uint256);

    /** Returns the current underlying (e.g., DAI's) balance together with
    * the invested amount (if DAI is invested elsewhere by the strategy).
    */
    function underlyingBalanceWithInvestment() view external returns (uint256);

    function vaultFractionToInvestNumerator() external view returns (uint256);
    function vaultFractionToInvestDenominator() external view returns (uint256);
    function underlyingBalanceInVault() external view returns (uint256);

    function underlying() external view returns (address);
}
