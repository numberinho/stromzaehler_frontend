import { useEffect, useState } from 'react'
import Barchart from '../components/barchart';

export default function Home() {

  const [data, setData] = useState({ Live: 0, Bezug: 0, Abgabe: 0 });
  const [barchart, setBarchart] = useState([24, 72, 29, 41, 50, 69, 22]);

  useEffect(() => {
    var ws = new WebSocket("ws://192.168.178.24:8080/ws")

    ws.onopen = () => {
      console.log("open!")
    };

    ws.onmessage = (nachricht) => {
      setData(JSON.parse(nachricht.data))
    }

    ws.onclose = () => {
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
            <div className={data.Live < 350 ? "font-bold text-5xl  text-lime-300" : "font-bold text-5xl text-error"}>{Math.round(data.Live)}</div>
            <div className="text-xs text-black/50">Wh</div>
          </div>
        </div>
        {/* Unterer Abschnitt*/}
        <div className="flex flex-row divide-x-2 p-3">
          {/* Total Bezug */}
          <div className="flex flex-col w-full items-center ">
            <div className="text-md text-black/50">Bezug Gesamt</div>
            <div className="font-bold text-4xl">{Math.round(data.Bezug)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
          {/* Total Abgabe */}
          <div className="flex flex-col w-full items-center">
            <div className="text-md text-black/50">Abgabe Gesamt</div>
            <div className="font-bold text-4xl">{Math.round(data.Abgabe)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
        </div>
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
            <div className="font-bold text-3xl">{Math.round(data.Bezug)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
          {/* Total Abgabe */}
          <div className="flex flex-col w-full items-center">
            <div className="text-md text-black/50">Bezug</div>
            <div className="font-bold text-3xl">{Math.round(data.Abgabe)}%</div>
            <div className="text-xs text-black/50">{Math.round(data.Abgabe)} kWh</div>
          </div>
        </div>
        <div className="flex flex-row divide-x-2 p-3">
          {/* Total Bezug */}
          <div className="flex flex-col w-full items-center ">
            <div className="text-md text-black/50">Abgabe</div>
            <div className="font-bold text-3xl">{Math.round(data.Bezug)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
          {/* Total Abgabe */}
          <div className="flex flex-col w-full items-center">
            <div className="text-md text-black/50">Abgabe</div>
            <div className="font-bold text-3xl">{Math.round(data.Abgabe)}%</div>
            <div className="text-xs text-black/50">{Math.round(data.Abgabe)} kWh</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-11/12 bg-base-100 rounded-xl shadow-lg divide-y-2 p-3">
        <Barchart data={barchart} live={Math.round(data.Bezug)} />
      </div>
    </div >
  )
}
