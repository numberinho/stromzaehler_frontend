import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [data, setData] = useState(0);

  useEffect(() => {
    var ws = new WebSocket("ws://192.168.178.24:8080/ws")

    ws.onopen = (event) => {
      console.log("open!")
    };
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data))
    }

    ws.onclose = (event) => {
      console.log("closed")
    }

    return () => {
      ws.close();
    };
  }, [])



  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-3/4 m-5 bg-base-100 rounded-xl shadow-lg divide-y-2">

        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col w-full items-center m-3">
            <div className="text-md text-black/50">Momentan</div>
            <div className={data.Live < 350 ? "font-bold text-4xl  text-lime-300" : "font-bold text-4xl text-error"}>{Math.round(data.Live)}</div>
            <div className="text-xs text-black/50">Wh</div>
          </div>
        </div>

        <div className="flex flex-row divide-x-2 p-3">
          <div className="flex flex-col w-full items-center ">
            <div className="text-md text-black/50">Total Bezug</div>
            <div className="font-bold text-4xl">{Math.round(data.Bezug)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="text-md text-black/50">Total Abgabe</div>
            <div className="font-bold text-4xl">{Math.round(data.Abgabe)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
        </div>



      </div>

      <div className="flex flex-col w-2/3 m-5 bg-base-100 rounded-xl shadow-lg">

        <div className="flex w-full flex-col border-b-2 border-slate-100 items-center">
          <div className="flex flex-col w-full items-center m-3">
            <div className="text-md text-black/50">Heute gesamt:</div>
            <div className={data.Live < 350 ? "font-bold text-4xl  text-lime-300" : "font-bold text-4xl text-error"}>{Math.round(data.Live)}</div>
            <div className="text-xs text-black/50">Wh</div>
          </div>
        </div>

        <div className="flex flex-col border-b-2 border-slate-100 justify-evenly">
          <div className="flex flex-col items-center justify-center m-3">
            <div className="text-md text-black/50">Gestern gesamt:</div>
            <div className="font-bold text-4xl">{Math.round(data.Bezug)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center m-3">
            <div className="text-md text-black/50">Gestern um diese Uhrzeit:</div>
            <div className="font-bold text-4xl">{Math.round(data.Abgabe)}</div>
            <div className="text-xs text-black/50">kWh</div>
          </div>
        </div>


      </div>
    </div>
  )
}
