// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGelatoOps {
    
    /// only callable by gelato
    /// @notice Execution API called by Gelato
    /// @param _txFee Fee paid to Gelato for execution, deducted on the TaskTreasury
    /// @param _feeToken Token used to pay for the execution. ETH = 0xeeeeee...
    /// @param _taskCreator On which contract should Gelato check when to execute the tx
    /// @param _useTaskTreasuryFunds If msg.sender's balance on TaskTreasury should pay for the tx
    /// @param _revertOnFailure To revert or not if call to execAddress fails
    /// @param _execAddress On which contract should Gelato execute the tx
    /// @param _execData Data used to execute the tx, queried from the Resolver by Gelato
    function exec(
        uint256 _txFee,
        address _feeToken,
        address _taskCreator,
        bool _useTaskTreasuryFunds,
        bool _revertOnFailure,
        bytes32 _resolverHash,
        address _execAddress,
        bytes calldata _execData
    ) external;
}