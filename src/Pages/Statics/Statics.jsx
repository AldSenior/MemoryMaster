import {
	ChartAreaStackedNormalized,
	ClockArrowRotateLeft,
} from '@gravity-ui/icons'
import { Button, Icon } from '@gravity-ui/uikit'
import Chart from 'chart.js/auto'
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
	const [StaticMod, setStaticMod] = useState(true)
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

	const sortedHistoryByDate = uniqueHistory.sort()
	const reverseHis = [...sortedHistoryByDate].reverse()
	useEffect(() => {
		const ctx = document
			.getElementById('activityHistoryChart')
			?.getContext('2d')

		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: reverseHis.map(item => item.title),
				datasets: [
					{
						label: 'Время/Очки',
						data: reverseHis.map(item => parseFloat(item.scored)),
						backgroundColor: () => {
							return reverseHis.map(item => {
								if (item.title == 'Найди пару') {
									return 'rgba(255, 99, 132, 0.6)'
								} else if (item.title == 'Последовательность цифр') {
									return 'red'
								} else {
									return 'yellow'
								}
							})
						},
						borderColor: 'black',
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		})
		localStorage.setItem(
			'StatickMassHistory',
			JSON.stringify(sortedHistoryByDate)
		)
	}, [StaticMod])

	return (
		<div className={style['Statics']}>
			<div className={style['LeftBlockStaticsWeek']}>
				<h1>История активности</h1>
				<div className={style['StaticsBar']}>
					<Button
						className={style['switchBtn']}
						view='normal-contrast'
						size='l'
						onClick={() => setStaticMod(prev => !prev)}
					>
						Переключить на
						<Icon
							data={
								StaticMod ? ChartAreaStackedNormalized : ClockArrowRotateLeft
							}
							size={18}
						/>
					</Button>
					{StaticMod ? (
						StatickMassHistory.map((item, index) => {
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
						})
					) : (
						<canvas id='activityHistoryChart'></canvas>
					)}
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
