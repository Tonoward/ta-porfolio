

export default function Button({ children, action, ...props }: { children: React.ReactNode, className?: string, action?: () => void }) {
  return (
    <button onClick={action} className={`px-4 py-2 bg-primary text-textcolor rounded-2xl` + (props.className ? ` ${props.className}` : "")}>
      {children}
    </button>
  );
}