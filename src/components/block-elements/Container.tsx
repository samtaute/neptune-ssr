import { PropsWithChildren } from "react";

//Adds 20px padding on horizontal axix
function Container({children}: PropsWithChildren){
    return <div className="p-5 pt-0 flex w-full min-w-[250px]">
        {children}
    </div>
}

export default Container; 