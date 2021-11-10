import React, { useEffect } from 'react'
import LeftBar from './leftBar/LeftBar'
import RightBar from './rightBar/rightBar'
import Search from './search/Search'
import TemperatureCard from './temperatureCards/temperetureCard'
import IntroScreen from './introScreen/IntroScreen'
import { AppProvider } from './context'


const App = () => {

    useEffect(() => {
        const img_tags = document.getElementsByTagName("img")
        for (let i = 0; i < img_tags.length; i++) {
            img_tags[i].setAttribute('draggable', false);
        }
    }, [])

    return <div id="app">
        <AppProvider>
            <IntroScreen>
                <LeftBar />
                <Search />
                <RightBar />
                <TemperatureCard />
            </IntroScreen>
        </AppProvider>

    </div>
}
export default App