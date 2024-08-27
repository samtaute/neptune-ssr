function Logo({src, className}: {src: string, className?: string}){
    return <img src={src} className={`${className} h-5`} alt="logo"/>
}

export default Logo; 