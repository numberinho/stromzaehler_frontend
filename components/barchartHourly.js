
export default function BarchartHourly(props) {

    if (props.data === null) {
        return <div>...Loading</div>
    }

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
        <div>
            <div className='flex justify-center text-black/60 text-md'>Tagesübersicht</div>
            <div className='flex flex-row-reverse w-full justify-evenly'>
                {[...Array(24).keys()].map((value, index) => {
                    return (
                        <div key={"barchartHourly" + index} className='flex flex-col-reverse'>
                            <ProgressBar height={props.data.Hourly[index]} index={now - index <= 0 ? 24 - index + 1 : now - index} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}