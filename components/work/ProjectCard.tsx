import Image from "next/image";
import Link from "next/link";

import { getCategorySummary, type Project } from "@/content/projects";
import type { CategoryKey } from "@/lib/categories";

import Badge from "@/components/ui/Badge";

const PLACEHOLDER_IMAGE = "/placeholder-project.svg";

export default function ProjectCard({
  project,
  category,
}: {
  project: Project;
  /** The category list being viewed. Picks the summary written for it. */
  category?: CategoryKey;
}) {
  const summary = category
    ? getCategorySummary(project, category)
    : project.summary;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl glass text-foreground transition duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:flex-row">
      <div className="relative aspect-video w-full shrink-0 sm:aspect-auto sm:w-2/5">
        <Image
          src={project.image ?? PLACEHOLDER_IMAGE}
          alt=""
          fill
          sizes="(min-width: 640px) 20rem, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="overflow-x-auto">
          <ul className="flex flex-wrap gap-2" aria-label="Categories">
            {project.categories.map((key) => (
              <li key={key}>
                <Badge category={key} />
              </li>
            ))}
          </ul>
        </div>

        <h3 className="text-xl font-bold">
          <Link
            href={`/work/case-studies/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm text-muted lg:text-base">
          {summary}
        </p>

        <span
          aria-hidden
          className="mt-auto text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
        >
          See more →
        </span>
      </div>
    </article>
  );
}
