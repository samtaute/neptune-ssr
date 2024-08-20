/**
Injects a script into the <head> element of the DOM
 */
export function injectScript(src: string, attributes?: any){
    const script = document.createElement('script')
    if (attributes && typeof attributes === 'object') {
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value as any)
      })
    }
    script.src = src
    const head = document.getElementsByTagName('head')[0]
    head.insertAdjacentElement('beforeend', script)
    return script
  }


  export function checkScriptLoaded(identifier: string, callback: any, retryInterval = 50, maxRetries = 10){
     let retries = 0; 
     let timeoutId: NodeJS.Timeout; 

     const checkScriptLoaded = () =>{
      if ((window as any)[identifier]){
        callback(); 
      } else if (retries < maxRetries){
        retries +=1; 
        timeoutId = setTimeout(checkScriptLoaded, retryInterval)
      }else{
        console.warn(`Script with id ${identifier} not found`)
      }
     }

     checkScriptLoaded(); 
     return () =>{
      if(timeoutId){
        clearTimeout(timeoutId)
      }
     }
  }

