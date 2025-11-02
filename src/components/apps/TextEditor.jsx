export default function textEditor({ params }) {
  return (
    <div className="h-full p-4">
      <textarea
        className="w-full h-full border-0 focus:outline-none font-mono text-sm resize-none"
        defaultValue={params.data}
      />
    </div>
  );
}
