import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

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
      <div className="flex w-[600px] flex-col items-start p-6 lg:w-full">
        <Image
          width={0}
          alt="LOGO"
          height={0}
          sizes="100vw"
          className="debug-red"
          src="/images/logo.png"
          style={{ width: "20%", height: "auto" }}
        />
        {children}
        <div className="max-w-4000px bg-cream relative hidden max-h-full w-full flex-1 flex-col gap-3 overflow-hidden pl-24 pt-10 lg:flex">
          <h2 className="text-gravel font-bold md:text-4xl">
            Hi, I’m your AI powered sales assistant, Corinna!
          </h2>
          <p className="text-iridium mb-10 md:text-sm">
            Corinna is capable of capturing lead information without a form...{" "}
            <br />
            something never done before 😉
          </p>
          <Image
            width={0}
            sizes="30"
            height={0}
            loading="lazy"
            alt="app image"
            src="/images/app-ui.png"
            className="absolute top-48 !w-[1600px] shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
