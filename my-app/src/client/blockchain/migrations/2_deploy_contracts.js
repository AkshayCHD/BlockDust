var MovieContract = artifacts.require("./MovieContract.sol");

module.exports = function(deployer) {
  deployer.deploy(MovieContract);
};
