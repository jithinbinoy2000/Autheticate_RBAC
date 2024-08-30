import {configureStore} from '@reduxjs/toolkit'
import textSlice from './textSlice';
const textStore = configureStore({
       reducer:{
        text: textSlice
       }
})
export default textStore;