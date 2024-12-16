import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import NavigationButtons from "@/components/NavigationButtons";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      toast({
        title: "Error",
        description: "Please login first",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-8">
      <NavigationButtons showLogout />
      <div className="max-w-4xl mx-auto space-y-8 pt-16">
        <h1 className="text-3xl font-bold animate-slide-in">User Dashboard</h1>
        
        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Public Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="animate-fade-in [animation-delay:100ms]">
              <label className="font-medium">Name:</label>
              <p>{userData.name}</p>
            </div>
            <div className="animate-fade-in [animation-delay:200ms]">
              <label className="font-medium">Phone Number:</label>
              <p>{userData.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in [animation-delay:200ms] hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Private Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="animate-fade-in [animation-delay:300ms]">
              <label className="font-medium">Residential Address:</label>
              <p>{userData.address}</p>
            </div>
            <div className="animate-fade-in [animation-delay:400ms]">
              <label className="font-medium">Birthdate:</label>
              <p>{userData.birthdate}</p>
            </div>
            <div className="animate-fade-in [animation-delay:500ms]">
              <label className="font-medium">IC Photo:</label>
              {userData.icPhotoUrl && (
                <img 
                  src={userData.icPhotoUrl} 
                  alt="IC Photo" 
                  className="mt-2 max-w-xs rounded-lg border animate-scale-in hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="animate-fade-in [animation-delay:600ms]">
              <label className="font-medium">Personal Photo:</label>
              {userData.personalPhotoUrl && (
                <img 
                  src={userData.personalPhotoUrl} 
                  alt="Personal Photo" 
                  className="mt-2 max-w-xs rounded-lg border animate-scale-in hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;