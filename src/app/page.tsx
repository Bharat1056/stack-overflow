import HomePage from "@/components/Home/Home";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/Login')
  }

  return (
    <>
      <HomePage email={data.user.email || ""} />
    </>
  );
}
