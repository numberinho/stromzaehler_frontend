export default function BarchartDaily(props) {

    if (props.data === null) {
        return <div>...Loading</div>
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
        <div className="">
            <div className='flex justify-center text-black/60 text-md mb-1'>Wochenübersicht</div>
            <div className='flex flex-row-reverse w-full justify-evenly'>
                {[7, 6, 5, 4, 3, 2, 1, 0].map((value, index) => {
                    return (
                        <div key={"barchart" + index} className='flex flex-col-reverse'>
                            <ProgressBar height={props.data.Daily[index]} index={index} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}