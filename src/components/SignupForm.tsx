import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ethers } from "ethers";

export const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [icNumber, setIcNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [icPhoto, setIcPhoto] = useState<File | null>(null);
  const [personalPhoto, setPersonalPhoto] = useState<File | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to MetaMask",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'ic' | 'personal') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'ic') {
        setIcPhoto(file);
      } else {
        setPersonalPhoto(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRegistering(true);
      
      // Get existing users or initialize empty array
      const existingUsersStr = localStorage.getItem('users');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      
      // Create new user data
      const userData = {
        name,
        phone,
        secretCode,
        icNumber,
        address,
        birthdate,
        icPhotoUrl: icPhoto ? URL.createObjectURL(icPhoto) : null,
        personalPhotoUrl: personalPhoto ? URL.createObjectURL(personalPhoto) : null,
        walletAddress,
      };

      // Add new user to array
      const updatedUsers = [...existingUsers, userData];
      
      // Store updated users array
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('userData', JSON.stringify(userData));

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to register user",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Card className="w-full max-w-md animate-bounce-in hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center animate-fade-in">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 animate-slide-in">
            <h3 className="text-lg font-semibold">Public Information</h3>
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="hover:border-primary transition-colors duration-300"
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="hover:border-primary transition-colors duration-300"
            />
          </div>

          <div className="space-y-4 animate-slide-in [animation-delay:100ms]">
            <h3 className="text-lg font-semibold">Private Information</h3>
            <Input
              placeholder="Secret Code"
              type="password"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              required
              className="hover:border-primary transition-colors duration-300"
            />
            <Input
              placeholder="IC Number"
              value={icNumber}
              onChange={(e) => setIcNumber(e.target.value)}
              required
              className="hover:border-primary transition-colors duration-300"
            />
            <Input
              placeholder="Residential Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="hover:border-primary transition-colors duration-300"
            />
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              className="hover:border-primary transition-colors duration-300"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium">IC Photo</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'ic')}
                required
                className="hover:border-primary transition-colors duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Personal Photo</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'personal')}
                required
                className="hover:border-primary transition-colors duration-300"
              />
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full animate-scale-in [animation-delay:200ms] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={connectWallet}
            disabled={isConnecting || !!walletAddress}
          >
            {walletAddress
              ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : isConnecting
              ? "Connecting..."
              : "Connect Wallet"}
          </Button>

          <Button 
            type="submit" 
            className="w-full animate-scale-in [animation-delay:300ms] hover:scale-105 transition-transform duration-300" 
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
