import { Link } from 'react-router-dom'
import style from './startpage.module.css'

export const StartPage = () => {
	return (
		<div className={style['Body']}>
			<div className={style['MenuLeft']}>
				<div className={style['Logo']}>
					<img className={style['logoimg']} src='./imgs/logo.png' alt='' />
					<p className={style['Logotext']}>MemoryMaster</p>
				</div>

				<h1 className={style['StartText']}>Начни Играть!</h1>
				<p className={style['desc']}>
					Исследуйте различные режимы игры, бросьте вызов своей памяти и
					отслеживайте свой прогресс.
				</p>
				<Link to='/Games'>
					<button className={style['startbtn']}>Начать</button>
				</Link>
			</div>

			<div className={style['MenuRight']}></div>
		</div>
	)
}
