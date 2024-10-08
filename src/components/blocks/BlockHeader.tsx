

function BlockHeader({ text, sub }: { text: string, sub?:string }) {
  return (
    <div className="flex p-5 pt-2 pb-4 relative flex-col items-start">
      <h1 className={`font-sans text-2xl font-semibold`}>{text}</h1>
      {sub && <h2 className="absolute bottom-[-2px] left-5 text-sm font-sans font-medium">{sub}</h2>}
    </div>
  );
}

export default BlockHeader;
