import ThemesControl from "@/modules/home/ui/components/themes-control";

const Themes = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <ThemesControl />
      </section>
    </div>
  );
};

export default Themes;
