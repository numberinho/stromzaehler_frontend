import { useState } from "react"

export default function BarchartHourly(props) {

    if (props.data === null) {
        return (
            <div className="animate-pulse flex space-x-4 ml-2" >
                Warte auf Livedaten
            </div >)
    }

    let x = 0

    var now = new Date().getHours()
    let maxValue = Math.max(...props.data.Hourly)

    const ProgressBar = (props) => {

        return (
            <div className='flex w-2 flex-col items-center'>
                <div className={props.height > 70 ? 'w-2 rounded-t-lg bg-blue-400' : 'w-2 rounded-t-xl bg-lime-300'} style={{ height: (props.height / maxValue) * 150 + "px" }}></div>
                {props.index % 2 == 0 ? <div className="text-xs text-black/70">{props.index}</div> : <div className="text-xs text-black/70">&nbsp;</div>}
            </div>
        )
    }

    return (
        <div className="relative">
            <div className='flex justify-center text-black/50 text-md font-semibold'>Tagesübersicht</div>
            <div className=' text-black/60 text-xs'>{Math.round(maxValue * 100) / 100 + " kWh"}</div>
            <div className='relative flex flex-row-reverse w-full justify-evenly'>
                {[...Array(24).keys()].map((value, index) => {
                    if (now - index < 0) {
                        x++
                        console.log(x)
                    }
                    return (
                        <div key={"barchartHourly" + index} className='flex flex-col-reverse'>
                            <ProgressBar height={props.data.Hourly[index]} index={now - index < 0 ? 24 - x : now - index} />
                        </div>
                    )
                })}
                <div className='absolute border-t-2 border-dashed border-black/5 w-full text-xs ' style={{ top: "1px" }}></div>
                <div className='absolute border-t-2 border-dashed border-black/5 w-full text-xs ' style={{ top: "50px" }}></div>
                <div className='absolute border-t-2 border-dashed border-black/5 w-full text-xs ' style={{ top: "100px" }}></div>
            </div>
        </div>
    )
}