import { Shield, Lock, Key } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Protection with Decentralization",
      description: "Store personal data on a secure, decentralized blockchain. Encryption and cryptographic keys ensure data protection and eliminate centralized vulnerabilities.",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "User Controlled & Privacy",
      description: "Users manage access to their data via a profile dashboard. Only verification results (e.g., age, identity) are shared, maintaining privacy.",
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Seamless Digital ID Across Services",
      description: "One digital ID for all businesses. Users control which verification results are shared, streamlining onboarding while protecting sensitive data.",
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">How Verurid Protects You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-lg transition-shadow"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;