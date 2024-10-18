import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex w-full min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative w-full">
           {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
