import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCode2,
  Plus,
  Code,
  PlayCircle,
  Check,
  AlertTriangle,
} from "lucide-react";

export const SmartContracts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("my-contracts");
  const [contractCode, setContractCode] =
    useState<string>(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;
    
    event ValueChanged(uint256 newValue);
    
    function setValue(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }
    
    function getValue() public view returns (uint256) {
        return value;
    }
}`);

  const sampleContracts = [
    {
      id: "contract-1",
      name: "ERC20 Token",
      description: "A standard ERC20 token contract",
      deployedAt: "0x12345...",
      deployedOn: "2023-09-15",
      status: "active",
    },
    {
      id: "contract-2",
      name: "NFT Marketplace",
      description: "Smart contract for NFT trading platform",
      deployedAt: "0x67890...",
      deployedOn: "2023-10-22",
      status: "active",
    },
  ];

  // Sample templates
  const templates = [
    {
      id: "template-1",
      name: "ERC20 Token",
      description: "Standard ERC20 token with basic functionality",
      category: "Tokens",
      complexity: "Medium",
    },
    {
      id: "template-2",
      name: "NFT (ERC721)",
      description: "Non-fungible token with metadata support",
      category: "NFTs",
      complexity: "Medium",
    },
    {
      id: "template-3",
      name: "Simple Auction",
      description: "A basic auction contract for digital assets",
      category: "DeFi",
      complexity: "Easy",
    },
    {
      id: "template-4",
      name: "Multisig Wallet",
      description: "Wallet requiring multiple signatures for transactions",
      category: "Wallets",
      complexity: "Hard",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "my-contracts":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Smart Contracts</h2>
              <button
                onClick={() => setActiveTab("create")}
                className="btn btn-primary"
              >
                <Plus size={16} className="mr-2" />
                Create New
              </button>
            </div>

            {sampleContracts.length === 0 ? (
              <div className="text-center py-12">
                <FileCode2 size={48} className="mx-auto mb-4 text-dark-500" />
                <h3 className="text-lg font-medium mb-2">No Contracts Yet</h3>
                <p className="text-dark-400 mb-6">
                  You haven't created any smart contracts yet.
                </p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="btn btn-primary"
                >
                  Create Your First Contract
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {sampleContracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="card card-hover hover:border-primary-600 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-lg">
                            {contract.name}
                          </h3>
                          <span className="ml-3 badge bg-success-500/20 text-success-500">
                            {contract.status}
                          </span>
                        </div>
                        <p className="text-dark-400 mb-4">
                          {contract.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-dark-500 mb-1">
                              Contract Address
                            </p>
                            <p className="text-sm font-mono">
                              {contract.deployedAt}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-500 mb-1">
                              Deployed On
                            </p>
                            <p className="text-sm">{contract.deployedOn}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn btn-outline btn-sm">
                          Interact
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          View Code
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );

      case "create":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                <button className="btn btn-accent flex-1">
                  <PlayCircle size={16} className="mr-2" />
                  <a href="https://example.com">
                    {" "}
                    For Business Smart Contracts
                  </a>
                </button>
              </h2>
              <button
                onClick={() => setActiveTab("my-contracts")}
                className="btn btn-ghost"
              >
                Back to Contracts
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="card mb-6">
                  <h3 className="font-semibold mb-4">Contract Code</h3>
                  <div className="bg-dark-950 rounded-lg border border-dark-800 h-80 overflow-y-auto">
                    <textarea
                      value={contractCode}
                      onChange={(e) => setContractCode(e.target.value)}
                      className="font-mono text-sm w-full h-full bg-transparent p-4 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-4">Compiler Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-dark-300 mb-2">
                        Solidity Version
                      </label>
                      <select className="input">
                        <option>0.8.20</option>
                        <option>0.8.19</option>
                        <option>0.8.17</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-dark-300 mb-2">
                        Optimization
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="optimization"
                            className="mr-2"
                            checked
                          />
                          <span>Enabled</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="optimization"
                            className="mr-2"
                          />
                          <span>Disabled</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="card mb-6">
                  <h3 className="font-semibold mb-4">Contract Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-dark-300 mb-2">
                        Contract Name
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="MyContract"
                        value="SimpleStorage"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-dark-300 mb-2">
                        Description
                      </label>
                      <textarea
                        className="input min-h-[80px]"
                        placeholder="Enter a description for your contract"
                        value="A simple storage contract to store and retrieve a value"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-dark-300 mb-2">
                        Network
                      </label>
                      <select className="input">
                        <option>Ethereum Mainnet</option>
                        <option>Goerli Testnet</option>
                        <option>Sepolia Testnet</option>
                        <option>Polygon</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="btn btn-primary flex-1">
                    <Code size={16} className="mr-2" />
                    Compile
                  </button>
                  <button className="btn btn-accent flex-1">
                    <PlayCircle size={16} className="mr-2" />
                    Deploy
                  </button>
                </div>

                <div className="mt-6 bg-success-500/20 text-success-500 rounded-lg p-4 flex items-start">
                  <Check size={20} className="mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      Contract compiled successfully!
                    </p>
                    <p className="text-sm mt-1">
                      Your contract is ready to be deployed.
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-warning-500/20 text-warning-500 rounded-lg p-4 flex items-start">
                  <AlertTriangle
                    size={20}
                    className="mr-3 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-medium">This is a simulation</p>
                    <p className="text-sm mt-1">
                      In a real implementation, this would connect to actual
                      blockchain networks and compile/deploy real smart
                      contracts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "templates":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Contract Templates</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="input mr-2"
                />
                <select className="input w-40">
                  <option>All Categories</option>
                  <option>Tokens</option>
                  <option>NFTs</option>
                  <option>DeFi</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="card card-hover hover:border-primary-600 cursor-pointer"
                >
                  <div className="flex justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary-900/50 flex items-center justify-center text-primary-500">
                      <FileCode2 size={20} />
                    </div>
                    <span className="badge bg-dark-800 text-dark-300">
                      {template.complexity}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-dark-400 text-sm mb-4">
                    {template.description}
                  </p>
                  <div className="flex justify-between mt-auto">
                    <span className="text-xs text-dark-500">
                      {template.category}
                    </span>
                    <button className="btn btn-ghost btn-sm">
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6">Smart Contracts</h1>

        <div className="bg-dark-800 rounded-lg mb-6">
          <div className="grid grid-cols-3 border-b border-dark-700">
            <button
              className={`py-4 text-center font-medium transition-colors ${
                activeTab === "my-contracts"
                  ? "text-primary-500 border-b-2 border-primary-500"
                  : "text-dark-300 hover:text-dark-100"
              }`}
              onClick={() => setActiveTab("my-contracts")}
            >
              My Contracts
            </button>
            <button
              className={`py-4 text-center font-medium transition-colors ${
                activeTab === "create"
                  ? "text-primary-500 border-b-2 border-primary-500"
                  : "text-dark-300 hover:text-dark-100"
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create New
            </button>
            <button
              className={`py-4 text-center font-medium transition-colors ${
                activeTab === "templates"
                  ? "text-primary-500 border-b-2 border-primary-500"
                  : "text-dark-300 hover:text-dark-100"
              }`}
              onClick={() => setActiveTab("templates")}
            >
              Templates
            </button>
          </div>
        </div>

        {renderTabContent()}
      </motion.div>
    </div>
  );
};
