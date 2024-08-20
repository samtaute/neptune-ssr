//We likely will need to implement a content context but for now just commenting this out since  we are getting by withu passing props. 
//import {createContext, useReducer} from 'react'
// import { ContentEntity, ContentLibaryEntity } from './types'


// type ContentContextObj = {
//     content: ContentLibaryEntity, 
//     getContentBySchedule: (sched: string)=>ContentEntity[]
// }


// export const contentContext = createContext<ContentContextObj>({
//     content: {},
//     getContentBySchedule: ()=>{return []}
// })

// export default function ContentContextProvider(startingContent: ContentLibaryEntity){
//     function contentReducer(state: ContentContextObj, action:{
//         type: "INCREMENT_POINTER", 
//         payload: {
//             schedule: string,
//             count: number
//         }
//     }){
//         const newContent = JSON.parse(JSON.stringify(state)) as ContentLibaryEntity; 
//         const {schedule, count} = action.payload; 
//         if(Object.prototype.hasOwnProperty.call(newContent, schedule)){
//             newContent[schedule]['pointer'] = newContent[schedule]['pointer'] + count; 
//             return count; 
//         }
//         return state; 
//     }

//     // //start here
//     // const [content, contentDispatch] = useReducer(contentReducer, startingContent)


// }

