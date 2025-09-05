import { ProjectsList } from "@/modules/home/ui/components/projects-list";

const Projects = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <ProjectsList />
      </section>
    </div>
  );
};

export default Projects;
