import { ArtifactsList } from "@/modules/home/ui/components/artifacts-list";

const Artifacts = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <ArtifactsList />
      </section>
    </div>
  );
};

export default Artifacts;
