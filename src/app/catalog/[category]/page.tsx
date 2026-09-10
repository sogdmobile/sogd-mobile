import { redirect } from "next/navigation";

interface CategorySubPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategorySubPage({ params }: CategorySubPageProps) {
  const { category } = await params;
  redirect(`/catalog?category=${encodeURIComponent(category)}`);
}
