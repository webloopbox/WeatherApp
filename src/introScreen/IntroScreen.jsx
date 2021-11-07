import React, { useEffect } from 'react'

import { useGlobalContext } from '../context'

const IntroScreen = ({children}) => {

    const {current_city_data, intro_hide_status, setIntroInvisibility, setForm, setLoading, active_loading, setReady, is_ready} = useGlobalContext()
    const {city} = current_city_data

    useEffect(() => {

        const body = document.getElementsByTagName("body")[0]
        body.style.overflowY = 'hidden'
        
        if(city) {

           setForm(false)
           setLoading(true)

           setTimeout(() => {
            
            setIntroInvisibility(true)
            // STOP LOADING
            setLoading(false)
            setReady(true)

            body.style.overflowY = 'auto'
           },1500)
           
        }
    },[city])
    
    return <>
        <div className={`intro-screen ${(intro_hide_status) ? 'hide' : ''} ${(!intro_hide_status && is_ready) ? 'invisible' : ''} `}>
            <div className={`loading ${active_loading ? 'active' : ''}`}>
                <span className="circle circle-1"></span>
                <span className="circle circle-2"></span>
                <span className="circle circle-3"></span>
                <span className="circle circle-4"></span>
                <span className="circle circle-5"></span>
                <span className="circle circle-6"></span>
                <span className="circle circle-7"></span>
                <span className="circle circle-8"></span>
            </div>
        </div>
        {children}
    </>
}


export default IntroScreen