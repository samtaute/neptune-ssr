import Logo from "./Logo";

function ItemFooter({interest, logo, isLight}: {interest?: string, logo?: string, isLight?:boolean}) {
  let content; 
  let textColor= 'text-[#747474]' 

  if(interest){
    content = interest; 
  }else if(logo){
    content = <Logo src={logo}/>
  }else {content = 'popular'}


  if(isLight){
    textColor='text-white'
  }
  return (
    <div className="flex items-center self-stretch">
      <div className={`font-sans flex text-xs font-medium ${textColor} flex-grow flex-shrink-0 basis-0`}>{content}</div>
      <ThreeDot isLight/>
    </div>
  );
}
export default ItemFooter;


function ThreeDot({isLight}: {isLight?: boolean}){
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12ZM10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12ZM5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14Z" fill={isLight ? 'white' : "#949494"}/>
    </svg>
}