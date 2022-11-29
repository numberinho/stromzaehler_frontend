import { data } from 'autoprefixer';
import { useEffect, useState } from 'react'
import BarchartDaily from '../components/barchartDaily.js';
import BarchartHourly from '../components/barchartHourly.js';

export default function Home() {

  const [connected, setConnected] = useState(false)
  const [liveData, setLiveData] = useState({ Live: 0, Bezug: 0, Abgabe: 0 });
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);

  useEffect(() => {
    var ws = new WebSocket("ws://192.168.178.24:8080/ws")

    ws.onopen = () => {
      setConnected(true)
      console.log("open!")
    };

    ws.onmessage = (nachricht) => {
      let incoming = JSON.parse(nachricht.data)
      if (incoming.Type == 1) {
        setLiveData(incoming)
      } else if (incoming.Type == 2) {
        setHourlyData(incoming)
      } else if (incoming.Type == 3) {
        setDailyData(incoming)
      }
    }

    ws.onclose = () => {
      setConnected(false)
      console.log("closed")
    }

    return () => {
      ws.close();
    };
  }, [])


  return (
    <div className="flex flex-col justify-center items-center gap-4 pt-4 pb-4">
      {/* Obere Anzeige */}
      <div className="flex flex-col w-11/12 bg-base-100 rounded-xl shadow-lg divide-y-2">
        {/* Oberer Abschnitt */}
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col w-full items-center m-3">
            <div className="text-md text-black/50 font-semibold">Momentan</div>
            <div className={liveData.Live < 350 ? "font-bold text-5xl  text-lime-300" : "font-bold text-5xl text-error"}>{Math.round(liveData.Live)}</div>
            <div className="text-xs text-black/50">Wh</div>
          </div>
        </div>
        {/* Unterer Abschnitt*/}
        <div className="flex flex-row divide-x-2 p-3">
          {/* Total Bezug */}
          <div className="flex flex-col w-full items-center ">
            <div className="text-md text-black/50">Bezug Gesamt</div>
            <div className="font-bold text-4xl">{Math.round(liveData.Bezug)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
          {/* Total Abgabe */}
          <div className="flex flex-col w-full items-center">
            <div className="text-md text-black/50">Abgabe Gesamt</div>
            <div className="font-bold text-4xl">{Math.round(liveData.Abgabe)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
        </div>
      </div>
      {/* Stündliche Anzeige */}
      <div className="flex flex-col w-11/12 bg-base-100 rounded-xl shadow-lg divide-y-2 p-3">
        <BarchartHourly data={hourlyData} />
      </div>
      {/* Untere Anzeige */}
      <div className="flex flex-col w-11/12 bg-base-100 rounded-xl shadow-lg divide-y-2">
        {/* 1. Element */}
        <div className="flex flex-row divide-x-2 p-3">
          {/* Total Bezug */}
          <div className="flex flex-col w-full items-center ">
            <div className="text-md text-black/50 font-semibold">Woche</div>
          </div>
          {/* Total Abgabe */}
          <div className="flex flex-col w-full items-center">
            <div className="text-md text-black/50 font-semibold">letzte Woche</div>
          </div>
        </div>
        <div className="flex flex-row divide-x-2 p-3">
          {/* Total Bezug */}
          <div className="flex flex-col w-full items-center ">
            <div className="text-md text-black/50">Bezug</div>
            <div className="font-bold text-3xl">{Math.round(liveData.Bezug)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
          {/* Total Abgabe */}
          <div className="flex flex-col w-full items-center">
            <div className="text-md text-black/50">Bezug</div>
            <div className="font-bold text-3xl">{Math.round(liveData.Abgabe)}%</div>
            <div className="text-xs text-black/50">{Math.round(liveData.Abgabe)} kWh</div>
          </div>
        </div>
        <div className="flex flex-row divide-x-2 p-3">
          {/* Total Bezug */}
          <div className="flex flex-col w-full items-center ">
            <div className="text-md text-black/50">Abgabe</div>
            <div className="font-bold text-3xl">{Math.round(liveData.Bezug)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
          {/* Total Abgabe */}
          <div className="flex flex-col w-full items-center">
            <div className="text-md text-black/50">Abgabe</div>
            <div className="font-bold text-3xl">{Math.round(liveData.Abgabe)}%</div>
            <div className="text-xs text-black/50">{Math.round(liveData.Abgabe)} kWh</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-11/12 bg-base-100 rounded-xl shadow-lg divide-y-2 p-3">
        <BarchartDaily data={dailyData} />
      </div>
    </div >
  )
}
