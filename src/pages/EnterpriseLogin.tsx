import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const EnterpriseLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin") {
      toast({
        title: "Success",
        description: "Welcome to Enterprise Dashboard",
      });
      navigate("/enterprise-dashboard");
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-bounce-in hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center animate-fade-in">Enterprise Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="animate-slide-in hover:border-primary transition-colors duration-300"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="animate-slide-in [animation-delay:100ms] hover:border-primary transition-colors duration-300"
            />
            <Button 
              type="submit" 
              className="w-full animate-scale-in [animation-delay:200ms] hover:scale-105 transition-transform duration-300"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnterpriseLogin;