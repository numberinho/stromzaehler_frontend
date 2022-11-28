import { useEffect, useState } from 'react'

export default function BarchartHourly(props) {

    var now = new Date().getHours()

    const [barchart, setBarchart] = useState([10, 20, 30, 40, 50, 60]);
    const [maxValue, setMaxValue] = useState(0);

    // runs every time barchart data changes
    useEffect(() => {
        fetch("http://localhost:8080/history/hourly", {
            headers: {
                Accept: 'application/json',
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setBarchart(json);
                setMaxValue(Math.max(...json))
            })
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
            <div className='flex w-2 flex-col items-center'>
                <div className={props.height > 70 ? 'w-2 rounded-t-xl bg-orange-400' : 'w-6 rounded-t-xl bg-lime-300'} style={{ height: (props.height / maxValue) * 150 + "px" }}></div>
                {props.index % 2 == 0 ? <div className="text-xs text-black/70">{props.index}</div> : <div className="text-xs text-black/70">&nbsp;</div>}
            </div>
        )
    }

    return (
        <div>
            <div className='flex justify-center text-black/60 text-md'>Tagesübersicht</div>
            <div className='flex flex-row w-full justify-evenly'>
                {[...Array(24).keys()].map((value, index) => {
                    return (
                        <div key={"barchartHourly" + index} className='flex flex-col-reverse'>
                            <ProgressBar height={barchart[value]} index={index} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}