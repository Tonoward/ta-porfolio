import { notFound } from "next/navigation";

// Catches every URL no other page matches (e.g. /ja/nope), so the 404 renders
// inside the localized layout with the navbar and footer, in the visitor's language.
// Real routes always win over this catch-all.
export default function UnmatchedPage() {
  notFound();
}
