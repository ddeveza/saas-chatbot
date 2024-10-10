import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="debug-red">{children}</div>
    </div>
  );
}
