import { atom } from 'jotai'
import { memo, useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import '../src/App.css'
import { Cards } from './Cards'
import { Header } from './Components/Header/Header'
import Memory from './Games/Memory/Memory'
import { NumbersGame } from './Games/NumbersGame/NumbersGame'
import { NumbersOrdersGame } from './Games/NumbersOrdersGame/NumbersOrdersGame'
import { Home } from './Pages/Home/Home'
import { SettingMemory } from './Pages/Settings/SettingsMemory'
import { StartPage } from './Pages/StartPage/StartPage'
import { Statics } from './Pages/Statics/Statics'
export const atomStatickMassHistory = atom([])
export const App = memo(() => {
	const [quanity, setQuanity] = useState(null)
	const [gameindex, setGameindex] = useState(
		JSON.parse(localStorage.getItem('gameindex')) || 0
	)
	const [timeOnSite, setTimeOnSite] = useState(
		JSON.parse(localStorage.getItem('timeOnSite'))
	)
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeOnSite(prev => prev + 1000)
			localStorage.setItem('timeOnSite', JSON.stringify(timeOnSite))
		}, 1000)

		return () => clearInterval(timer)
	}, [timeOnSite])
	const DIFF_NAMES = useMemo(() => Cards[gameindex].dificcult, [gameindex])
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<StartPage />} />
				<Route
					path='/SettingMemory'
					element={
						<SettingMemory
							setQuanity={setQuanity}
							gameindex={gameindex}
							quanity={quanity}
							DIFF_NAMES={DIFF_NAMES}
							nameDiffCard={DIFF_NAMES}
						/>
					}
				></Route>
				<Route
					path='/Games'
					element={<Home setGameindex={setGameindex} />}
				></Route>
				<Route
					path='/MemoryGame'
					element={<Memory difficult={quanity} gameindex={gameindex} />}
				></Route>
				<Route
					path='/Numbers'
					element={<NumbersGame difficult={quanity} gameindex={gameindex} />}
				></Route>
				<Route
					path='/NumbersOrders'
					element={
						<NumbersOrdersGame difficult={quanity} gameindex={gameindex} />
					}
				></Route>
				<Route path='/Statics' element={<Statics />}></Route>
			</Routes>
		</>
	)
})
export default App
