import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/LoginForm";
import NavigationButtons from "@/components/NavigationButtons";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 p-4 flex items-center justify-center">
      <NavigationButtons />
      <Card className="w-full max-w-md animate-slide-in hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="animate-fade-in">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="animate-scale-in [animation-delay:200ms]">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;