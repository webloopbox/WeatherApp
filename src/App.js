import React from 'react'
import LeftBar from './leftBar/LeftBar'
import RightBar from './rightBar/rightBar'
import Search from './search/Search'
import TemperatureCard from './temperatureCards/temperetureCard'
import IntroScreen from './introScreen/IntroScreen'
import { AppProvider } from './context'


const App = () => {

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