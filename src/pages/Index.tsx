import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
        <Button 
          variant="outline"
          onClick={() => navigate('/enterprise-login')}
          className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Building2 className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
          Enterprise Login
        </Button>
        <div className="space-x-4 animate-fade-in">
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate('/signup')}
            className="hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </Button>
        </div>
      </div>
      {/* Hidden flag for CTF */}
      {/* VER{H3Y_F1ND_M3} */}
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;