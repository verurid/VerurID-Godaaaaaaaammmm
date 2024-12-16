import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EnterpriseDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getAllUsers = () => {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  };

  const calculateAge = (birthdate: string) => {
    if (!birthdate) return 0;
    const birthdateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
      age--;
    }
    return age;
  };

  const getVerificationStatus = (birthdate: string) => ({
    isOver18: calculateAge(birthdate) >= 18,
    country: "Malaysia",
    isVerified: true,
  });

  useEffect(() => {
    if (!window.ethereum) {
      toast({
        title: "Error",
        description: "Please login first",
        variant: "destructive",
      });
      navigate("/enterprise-login");
    }
  }, [navigate, toast]);

  const StatusIcon = ({ condition }: { condition: boolean }) => (
    condition ? 
      <CheckCircle2 className="text-green-500 animate-rotate-in" /> : 
      <XCircle className="text-red-500 animate-rotate-in" />
  );

  const users = getAllUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/5 p-8">
      <NavigationButtons showLogout />
      <div className="max-w-6xl mx-auto space-y-8 pt-16">
        <h1 className="text-3xl font-bold animate-slide-in">Enterprise Dashboard</h1>
        
        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Users Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="animate-fade-in">
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Over 18</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>IC Verified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => {
                  const status = getVerificationStatus(user.birthdate);
                  return (
                    <TableRow 
                      key={index}
                      className="animate-fade-in hover:bg-primary/5 transition-colors duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <StatusIcon condition={status.isOver18} />
                      </TableCell>
                      <TableCell>{status.country}</TableCell>
                      <TableCell>
                        <StatusIcon condition={status.isVerified} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;