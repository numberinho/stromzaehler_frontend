export default function BarchartDaily(props) {

    if (props.data === null) {
        return (
            <div className="animate-pulse flex space-x-4 ml-2" >
                Warte auf Livedaten
            </div >)
    }

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    var now = new Date().getDay()

    let maxValue = Math.max(...props.data.Daily)

    const ProgressBar = (props) => {

        return (
            <div className='flex flex-col justify-center items-center'>
                <div className={props.height > 70 ? 'w-6 rounded-t-xl bg-orange-400' : 'w-6 rounded-t-xl bg-lime-300'} style={{ height: (props.height / maxValue) * 150 + "px" }}></div>
                <div className="text-sm text-black/70">{weekdays[now + 6 - props.index]}</div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className='flex justify-center text-black/50 text-md font-semibold'>Wochenübersicht</div>
            <div className=' text-black/60 text-xs'>{Math.round(maxValue * 100) / 100 + " kWh"}</div>
            <div className='relative flex flex-row-reverse w-full justify-evenly'>
                {[7, 6, 5, 4, 3, 2, 1, 0].map((value, index) => {
                    return (
                        <div key={"barchart" + index} className='flex flex-col-reverse'>
                            <ProgressBar height={props.data.Daily[index]} index={index} />
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