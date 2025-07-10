import Providers from "@/state/react-query/react-query";
import { Container } from "@/components/container";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/authopt";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="account-link"><a href="/account">Account</a></div>
      <Providers>
        <Suspense>
          <Container />
        </Suspense>
      </Providers>
    </main>
  );
}
