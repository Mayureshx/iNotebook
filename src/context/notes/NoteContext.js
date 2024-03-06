import  { createContext } from 'react'

//Simply creating a comtect and exoprting it
const NoteContext = createContext();

export default NoteContext;

//ContextApi : In your app if u have more complex componets like "one under another",in that case
//if u want use or update any state like "color : pink" then u have to pass that state as a "props"
//by "one by one" i.e There are 3 layers of componrts and 3rd layer componet want to use state "color : pink"
//then we have to pass first to "1st layer component" -> "2st layer component" -> "3rd layer component"
//which is more pain to us un that situation "contextApi" comes and solve this problem by giving
//access of state as props directly to "3rd layer componet"