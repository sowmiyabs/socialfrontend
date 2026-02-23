import Feed from "../components/Feed";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Home Feed</h1>
      <Feed />
    </div>
  );
}
