import { getUser } from "@/lib/db/queries";
import { User } from "@prisma/client";
import * as React from "react";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = async ({}) => {
  const user = await getUser();
  if (!user) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }
  const getUserDisplayName = (user: Pick<User, "id" | "name" | "email">) => {
    return user.name || user.email || "Unknown User";
  };
  return (
    <div>
      <h1>Welcome back, {getUserDisplayName(user)}</h1>
    </div>
  );
};

export default DashboardPage;
