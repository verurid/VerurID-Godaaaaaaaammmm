export interface UserData {
  // Public info
  name: string;
  phoneNumber: string;
  // Private info
  secretCode: string;
  residentAddress: string;
  birthdate: string;
  icPhotoUrl: string;
  personalPhotoUrl: string;
}

export const dummyUsers: UserData[] = [
  {
    name: "Alice",
    phoneNumber: "01234567890",
    secretCode: "abc123",
    residentAddress: "UTM, Johor",
    birthdate: "08/08/2008",
    icPhotoUrl: "/placeholder.svg", // Using the default placeholder image
    personalPhotoUrl: "/placeholder.svg", // Using the default placeholder image
  },
  {
    name: "Bob",
    phoneNumber: "01234567891",
    secretCode: "def456",
    residentAddress: "UPM, Selangor",
    birthdate: "15/03/2000",
    icPhotoUrl: "/placeholder.svg",
    personalPhotoUrl: "/placeholder.svg",
  },
  {
    name: "Charlie",
    phoneNumber: "01234567892",
    secretCode: "ghi789",
    residentAddress: "USM, Penang",
    birthdate: "22/11/1995",
    icPhotoUrl: "/placeholder.svg",
    personalPhotoUrl: "/placeholder.svg",
  },
  {
    name: "David",
    phoneNumber: "01234567893",
    secretCode: "jkl012",
    residentAddress: "UKM, Selangor",
    birthdate: "30/06/2005",
    icPhotoUrl: "/placeholder.svg",
    personalPhotoUrl: "/placeholder.svg",
  },
  {
    name: "Eva",
    phoneNumber: "01234567894",
    secretCode: "mno345",
    residentAddress: "UM, Kuala Lumpur",
    birthdate: "12/09/1998",
    icPhotoUrl: "/placeholder.svg",
    personalPhotoUrl: "/placeholder.svg",
  }
];

// Helper function to verify login credentials
export const verifyCredentials = (name: string, secretCode: string): boolean => {
  return dummyUsers.some(user => user.name === name && user.secretCode === secretCode);
};