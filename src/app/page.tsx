import FormBuilder from "@/components/FormBuilder/FormBuilder";

export default function Home() {
  return (
    <main className="border border-gray-light bg-gray-dark p-4 rounded-lg max-w-5xl m-auto mt-10">
      <header className="p-5">
        <h1 className="text-center text-2xl">Form Builder</h1>
      </header>

      <FormBuilder />
    </main>
  );
}
