import { atom } from 'jotai'
import { useEffect, useState } from 'react'
import { Cards } from '../../Cards'
import { TimeOnSite } from '../../Components/TimeOnSite'
import { DayStreakCounter } from '../../DayStreakCounter'
import { Records } from '../../Records'
import style from './statics.module.css'
export const idHistoryGame = atom(
	JSON.parse(localStorage.getItem('StatickMassHistory')?.length || 0)
)
export const Statics = () => {
	const [StatickMassHistory, setStatickMassHistory] = useState(
		JSON.parse(localStorage.getItem('StatickMassHistory')) || []
	)

	useEffect(() => {
		const uniqueHistory = StatickMassHistory.reduce((acc, current) => {
			const existing = acc.find(item => item.id === current.id)
			if (!existing) {
				acc.push(current)
			} else {
				if (parseFloat(current.scored) > parseFloat(existing.scored)) {
					acc = acc.filter(item => item.id !== current.id)
					acc.push(current)
				}
			}
			return acc
		}, [])

		const sortedHistoryByDate = uniqueHistory
			.sort((a, b) => new Date(a.currentDate) - new Date(b.currentDate))
			.reverse()

		setStatickMassHistory(sortedHistoryByDate)
		localStorage.setItem(
			'StatickMassHistory',
			JSON.stringify(sortedHistoryByDate)
		)
	}, [])
	return (
		<div className={style['Statics']}>
			<div className={style['LeftBlockStaticsWeek']}>
				<h1>История активности</h1>
				<div className={style['StaticsBar']}>
					{StatickMassHistory.map((item, index) => {
						return (
							<div key={index} className={style['stored']}>
								<img src={item.img} alt='' />
								<div className={style['recorde']}>
									<p>{item.title}</p>
									<p className={style['scored']}>
										<span>{item.scored}</span>
										<span>{item.currentDate}</span>
										<span>{item.diff}</span>
									</p>
								</div>
							</div>
						)
					})}
				</div>
				<div className={style['MyPerfom']}>
					<div className={style['blockperf']}>
						<div className={style['iconblock']}>
							<img src='/imgs/book.png' />
						</div>
						<h3>Всего времени на сайте</h3>
						<TimeOnSite />
					</div>
					<div className={style['blockperf']}>
						<div className={style['iconblock']}>
							<img src='/imgs/star.svg' />
						</div>
						<DayStreakCounter />
					</div>
					<div className={style['blockperf']}>
						<div className={style['iconblock']}>
							<img src='/imgs/complitedgalka.png' />
						</div>
						<h3>Всего играл</h3>
						<p>{StatickMassHistory.length}</p>
					</div>
				</div>
			</div>
			<div className={style['RightBlockStaticsWeek']}>
				<h1>Рекорды</h1>
				<div className={style['StoredActivity']}>
					{Cards.map((item, index) => {
						return (
							<div key={index} className={style['stored']}>
								<img src={item.img} alt='' />
								<div className={style['recorde']}>
									<p>{item.title}</p>
									<p>Рекорд:{Records[index].record}</p>
									<p>Поставлен:{item.currentDate}</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
