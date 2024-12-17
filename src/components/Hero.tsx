import { Shield, Lock, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl text-center animate-fade-in">
        <div className="flex justify-center mb-8 space-x-4">
          <Shield className="w-12 h-12 text-primary" />
          <Lock className="w-12 h-12 text-secondary" />
          <Key className="w-12 h-12 text-accent" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Secure Decentralized Identity Verification
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Protect your identity with advanced blockchain security
        </p>
        <Button 
          size="lg"
          onClick={() => navigate('/signup')}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Hero;
