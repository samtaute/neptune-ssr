function ItemTitle({ title, isLight, className}: { title: string, isLight?: boolean, className?: string }) {
  let textColor = ''; 
  if (isLight){
    textColor = 'text-white'
  }
  return (
    <div className={`${className} self-stretch font-sans font-semibold text-[18px] leading-[24px] ${textColor}`}>
      {title}
    </div>
  );
}

export default ItemTitle;

export function ItemTitleSmall({ title, isLight, className}: { title: string, isLight?: boolean, className?: string }) {
  let textColor = ''; 
  if (isLight){
    textColor = 'text-white'
  }
  return (
    <div className={`${className} self-stretch font-sans font-medium text-sm line-clamp-2 ${textColor}`}>
      {title}
    </div>
  );
}
