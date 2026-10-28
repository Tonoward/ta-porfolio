export default function Button({
  children,
  action,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  action?: () => void;
}) {
  return (
    <button
      onClick={action}
      className={
        `rounded-2xl bg-primary px-4 py-2 text-textcolor` +
        (props.className ? ` ${props.className}` : "")
      }
    >
      {children}
    </button>
  );
}
