import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import NavigationButtons from "@/components/NavigationButtons";
import { SignupForm } from "@/components/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-4 flex items-center justify-center">
      <NavigationButtons />
      <SignupForm />
    </div>
  );
};

export default Signup;