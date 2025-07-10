import Providers from "@/state/react-query/react-query";
import { Container } from "@/components/container";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "@/app/api/authopt";
import LogoutButton from "@/components/ui/logout";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Providers>
        <Suspense>
          <div className="account-back-button">
            <a href="/">
              <span className="font-ibm font-semibold text-base leading-base tracking-normal">
                Back to map
              </span>
            </a>
          </div>
          <div>
            <p className="font-ibm font-semibold text-base leading-base tracking-normal">Account Information</p>
            <br />
            <pre>Name: {(session.user?.name)}</pre>
            <br />
            <pre>Email: {(session.user?.email)}</pre>
            <br />
            <pre>API Key: {(session.apiKey)}</pre>
          </div>
          <div>
            <br /><br />
            <LogoutButton />
          </div>
        </Suspense>
      </Providers>
    </main>
  );
}
