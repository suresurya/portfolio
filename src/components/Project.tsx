
type ProjectProps = {
  title: string;
  description: string;
  tech?: string;
};

const Project = ({ title, description, tech }: ProjectProps) => {
  return (
    <div className="theme-card-glass rounded-xl p-4 sm:p-5 space-y-2">
      <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-[color:var(--color-text-subtle)]">
        {description}
      </p>
      {tech && (
        <p className="text-[10px] sm:text-xs text-[color:var(--color-text-subtle)]/80">
          <span className="font-semibold">Tech:</span> {tech}
        </p>
      )}
    </div>
  );
};

export default Project;