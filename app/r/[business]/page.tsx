import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ReviewFlow } from "@/components/review/review-flow";

interface Props {
  params: Promise<{ business: string }>;
}

export default async function BusinessReviewPage({ params }: Props) {
  const { business: slug } = await params;
  const supabase = await createClient();

  const { data: biz } = await supabase
    .from("businesses_public")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!biz) notFound();

  return <ReviewFlow business={biz} employee={null} />;
}
