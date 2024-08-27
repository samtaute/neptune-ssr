function ItemTitle({ title, color }: { title: string, color: string }) {
  let textColor = ''; 
  if (color === "light"){
    textColor = 'text-white'
  }
  return (
    <div className={`self-stretch font-sans font-semibold text-[18px] leading-[24px] ${textColor}`}>
      {title}
    </div>
  );
}

export default ItemTitle;
