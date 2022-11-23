import { data } from 'autoprefixer';
import { useEffect, useState } from 'react'

export default function Barchart(props) {

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    var now = new Date().getDay()

    const [barchart, setBarchart] = useState([10, 20, 30, 40, 50, 60]);
    const [maxValue, setMaxValue] = useState(0);

    // runs every time barchart data changes
    useEffect(() => {
        setMaxValue(Math.max(...barchart))
    }, [])

    // runs every time live data changes
    useEffect(() => {
        if (props.live > maxValue) {
            setMaxValue(props.live)
        }
    }, [props.live])

    if (props.live === 0) {
        return <div>...Loading</div>
    }

    const ProgressBar = (props) => {

        return (
            <div className='flex flex-col justify-center items-center'>
                <div className={props.height > 70 ? 'w-6 rounded-t-xl bg-orange-400' : 'w-6 rounded-t-xl bg-lime-300'} style={{ height: (props.height / maxValue) * 150 + "px" }}></div>
                <div className="text-sm text-black/70">{weekdays[now + 6 - props.index]}</div>
            </div>
        )
    }

    return (
        <div>
            <div className='flex justify-center text-black/60 text-md'>Wochenübersicht</div>
            <div className='flex flex-row w-full justify-evenly'>
                {[5, 4, 3, 2, 1, 0].map((value, index) => {
                    return (
                        <div className='flex flex-col-reverse'>
                            <ProgressBar key={index} height={barchart[value]} index={index} />
                        </div>
                    )
                })}
                <div className='flex flex-col-reverse'>
                    <ProgressBar height={props.live} index={0} />
                </div>
            </div>
        </div>
    )
}