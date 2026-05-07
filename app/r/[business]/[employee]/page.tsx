import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ReviewFlow } from "@/components/review/review-flow";

interface Props {
  params: Promise<{ business: string; employee: string }>;
}

export default async function EmployeeReviewPage({ params }: Props) {
  const { business: bizSlug, employee: empSlug } = await params;
  const supabase = await createClient();

  const { data: biz } = await supabase
    .from("businesses_public")
    .select("*")
    .eq("slug", bizSlug)
    .single();

  if (!biz) notFound();

  const { data: employee } = await supabase
    .from("employees")
    .select("*")
    .eq("business_id", biz.id)
    .eq("slug", empSlug)
    .eq("active", true)
    .single();

  if (!employee) notFound();

  return <ReviewFlow business={biz} employee={employee} />;
}
