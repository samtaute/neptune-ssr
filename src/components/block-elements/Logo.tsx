function Logo({src, className = 'h-5'}: {src: string, className?: string}){
    return <img src={src} className={className} alt="logo"/>
}

export default Logo; 