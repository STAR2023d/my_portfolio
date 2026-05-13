type Props = {
  title: string;
  subtitle: string;
};

function SectionTitle({ title, subtitle }: Props) {
  return (
    <div className="mb-14">
      <p className="text-primary font-medium mb-3 uppercase tracking-widest text-sm">
        {subtitle}
      </p>

      <h2 className="text-4xl md:text-5xl font-bold">
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;