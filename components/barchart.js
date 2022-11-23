export default function Barchart(props) {


    if (!props.data || !props.live > 0) {
        return <div>...Loading</div>
    }

    props.data[6] = props.live

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

    var now = new Date().getDay()
    var maxValue = Math.max(...props.data)

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
            <div className='flex flex-row w-full justify-evenly'>
                {props.data.map((value, index) => {
                    return (
                        <div className='flex flex-col-reverse'>
                            <ProgressBar height={value} index={index} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}