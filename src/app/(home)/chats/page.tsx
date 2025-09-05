import { ChatHistory } from "@/modules/home/ui/components/chat-history";

const Chats = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <ChatHistory />
      </section>
    </div>
  );
};

export default Chats;
