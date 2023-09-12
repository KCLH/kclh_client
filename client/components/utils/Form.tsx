export default function Form({
  children,
  onSubmit,
}: {
  children: any;
  onSubmit: any;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>{children}</div>
    </form>
  );
}
