import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavigationButtonsProps {
  showLogout?: boolean;
}

const NavigationButtons = ({ showLogout }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
  };

  return (
    <div className="fixed top-4 left-4 space-x-4 z-50 animate-fade-in">
      <Button
        variant="outline"
        onClick={() => navigate('/')}
        className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        <Home className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
        Home
      </Button>
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="group hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back
      </Button>
      {showLogout && (
        <Button
          variant="outline"
          onClick={handleLogout}
          className="group hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
        >
          <LogOut className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
          Log Out
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;