"use client";

import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { useUser } from "@clerk/nextjs";
import { greet } from "greeting-functions";

const Page = () => {
  const { user } = useUser();

  function getCurrentHour(): number {
    return new Date().getHours();
  }

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full my-auto">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <h1 className="font-caladea text-3xl md:text-9xl text-center">
          <p className="font-caladea text-4xl md:text-6xl mb-12">
            {greet(user?.lastName || user?.firstName || "Donkies", {
              style: "casual",
              hour: getCurrentHour(),
              timeBased: true,
            })}
          </p>
        </h1>

        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
    </div>
  );
};

export default Page;
