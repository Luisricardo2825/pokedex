import { ActivityIndicator } from "@/components/ActivityIndicator";

export default function Loading() {
  return (
    <div className="flex min-h-screen justify-center items-center min-w-full">
      <ActivityIndicator className="w-32 h-32 fill-red-600" />
    </div>
  );
}
