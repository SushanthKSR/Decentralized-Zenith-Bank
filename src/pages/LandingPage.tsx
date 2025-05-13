import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Shield,
  Banknote,
  FileCode2,
  Wallet,
  BarChart3,
  Landmark,
  X,
  Mail,
  Lock,
  User,
} from "lucide-react";
import { useWallet } from "../hooks/useWallet";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className="card card-hover"
  >
    <div className="h-12 w-12 rounded-lg bg-primary-900/50 flex items-center justify-center mb-4 text-primary-500">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-dark-400">{description}</p>
  </motion.div>
);

export const LandingPage: React.FC = () => {
  const { connectWallet, isLoading } = useWallet();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Register:", { name, email, password });
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="py-6 px-6 md:px-12 border-b border-dark-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 flex items-center justify-center">
              <Wallet size={24} className="text-white" />
            </div>
            <span className="font-bold text-xl text-white">Zenith Bank</span>
          </div>

          <nav className="flex items-center space-x-4">
            <a
              href="#features"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-dark-300 hover:text-white transition-colors"
            >
              About
            </a>
            <Dialog.Root open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <Dialog.Trigger asChild>
                <button className="btn btn-outline">Login</button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                  <div className="bg-dark-900 rounded-xl border border-dark-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <Dialog.Title className="text-xl font-semibold">
                        Login to Zenith Bank
                      </Dialog.Title>
                      <Dialog.Close className="text-dark-400 hover:text-white">
                        <X size={20} />
                      </Dialog.Close>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400"
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input pl-10"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400"
                          />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input pl-10"
                            placeholder="Enter your password"
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary w-full">
                        Login
                      </button>
                    </form>
                    <div className="mt-4 text-center">
                      <p className="text-dark-400">
                        Don't have an account?{" "}
                        <button
                          onClick={() => {
                            setIsLoginOpen(false);
                            setIsRegisterOpen(true);
                          }}
                          className="text-primary-500 hover:text-primary-400"
                        >
                          Register
                        </button>
                      </p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-dark-800">
                      <button
                        onClick={connectWallet}
                        className="btn btn-outline w-full flex items-center justify-center"
                      >
                        <Wallet size={20} className="mr-2" />
                        Connect with MetaMask
                      </button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <Dialog.Root open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
              <Dialog.Trigger asChild>
                <button className="btn btn-primary">Register</button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                  <div className="bg-dark-900 rounded-xl border border-dark-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <Dialog.Title className="text-xl font-semibold">
                        Create an Account
                      </Dialog.Title>
                      <Dialog.Close className="text-dark-400 hover:text-white">
                        <X size={20} />
                      </Dialog.Close>
                    </div>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400"
                          />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input pl-10"
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400"
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input pl-10"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400"
                          />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input pl-10"
                            placeholder="Create a password"
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary w-full">
                        Create Account
                      </button>
                    </form>
                    <div className="mt-4 text-center">
                      <p className="text-dark-400">
                        Already have an account?{" "}
                        <button
                          onClick={() => {
                            setIsRegisterOpen(false);
                            setIsLoginOpen(true);
                          }}
                          className="text-primary-500 hover:text-primary-400"
                        >
                          Login
                        </button>
                      </p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-dark-800">
                      <button
                        onClick={connectWallet}
                        className="btn btn-outline w-full flex items-center justify-center"
                      >
                        <Wallet size={20} className="mr-2" />
                        Connect with MetaMask
                      </button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                  Decentralized Banking
                </span>{" "}
                for the Digital Age
              </h1>
              <p className="text-xl text-dark-300 mb-8">
                Secure wallet-to-wallet transfers, bank-to-bank crypto
                transactions, and smart contracts management—all in one
                platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="btn btn-primary px-8 py-3"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="btn btn-outline px-8 py-3"
                >
                  Login
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 to-transparent blur-xl" />
              <div className="relative bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8">
                <div className="text-center">
                  <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center mb-4">
                    <Wallet size={40} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-dark-400 mb-6">
                    Connect your wallet to access the Zenith banking platform
                  </p>
                  <button
                    onClick={connectWallet}
                    disabled={isLoading}
                    className="btn btn-primary px-8 py-3 w-full"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Connecting...
                      </div>
                    ) : (
                      <span>Connect MetaMask</span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 px-6 bg-dark-900/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Features That Set Us Apart
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-dark-300 text-xl max-w-3xl mx-auto"
              >
                Our decentralized banking platform offers a wide range of
                features designed for the modern crypto user.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Wallet size={24} />}
                title="Wallet Integration"
                description="Seamlessly connect your MetaMask wallet for secure and easy transactions."
                delay={0.2}
              />
              <FeatureCard
                icon={<Banknote size={24} />}
                title="Crypto Transfers"
                description="Send and receive cryptocurrencies with just a few clicks."
                delay={0.3}
              />
              <FeatureCard
                icon={<Landmark size={24} />}
                title="Bank Transactions"
                description="Transfer between traditional banks and crypto wallets with ease."
                delay={0.4}
              />
              <FeatureCard
                icon={<FileCode2 size={24} />}
                title="Smart Contracts"
                description="Create, deploy, and manage smart contracts directly from our platform."
                delay={0.5}
              />
              <FeatureCard
                icon={<BarChart3 size={24} />}
                title="Transaction History"
                description="View your complete transaction history with detailed insights."
                delay={0.6}
              />
              <FeatureCard
                icon={<Shield size={24} />}
                title="Enhanced Security"
                description="Your assets are protected with industry-leading security measures."
                delay={0.7}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-dark-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 flex items-center justify-center">
                  <Wallet size={16} className="text-white" />
                </div>
                <span className="font-bold text-white">Zenith Bank</span>
              </div>
              <p className="text-dark-400 text-sm">
                A decentralized banking platform for the modern era. Secure,
                fast, and reliable.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-dark-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-dark-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Developers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Team Members - 139</h4>
              <ul className="space-y-2 text-dark-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sushanth Kesamreddy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Harsh Sharma
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tanusha Mawkin
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Siddhant Dogra
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-dark-800 text-center text-dark-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Zenith All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
