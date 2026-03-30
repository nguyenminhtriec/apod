
'use client';

type Apod = {
    copyright: string | undefined,
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string
}

import { useState } from "react";
// import { ChevronRight, ChevronDown } from "lucide-react";

export default function Apod() {
    const [startDate, setStartDate] = useState('');
    const [apod, setApod] = useState<Apod[]>([]);

    const getPicture = async () => {
        const apodResponse = await fetch('/dashboard/api', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({startDate}),
        })
        if (!apodResponse.ok) {
            console.error("No response from API");
            return;
        }
        const data = await apodResponse.json();
        console.log("Apod received", data);
        setApod(data);
    }
    return (
      <div>
        <div className="mx-2">
            <input className='bg-gray-500 p-2'
                type='date'
                onChange={e => setStartDate(e.target.value)}
            />
            <button 
                disabled={!startDate}
                onClick={getPicture} 
                className="bg-blue-500 rounded-sm hover:bg-blue-300 ml-4 p-2"
            >
                Get Pictures
            </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 m-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-xs text-mauve-400" >
            { apod.map((item: Apod) => (
                <ApodItem key={item.date} item={item} />
            ))}
        </div>
      </div>  
    )
}

export function ApodItem({ item }: { item: Apod }) {
    const [desc, setDesc] = useState(false);
    return (
        <div className="w-auto overflow-hidden mt-2 p-2 border border-gray-700 text-xs text-gray-400">
            <p className="font-bold">{item.title}</p>
            <p>{item.date}</p>
            {item.media_type==='video'
                ? <video controls muted src= {item.url} title={item.title} />
                : <img src={item.url} className="size-auto mt-4" />
            }
            <div className="my-2">
                <div className="flex item-start justify-start my-2">
                    <div className="mr-4">Explaination</div>
                    <button className="border border-gray-500 rounded-xs px-1" 
                      onClick={() => setDesc(!desc)}>{!desc ? "Open" : "Close"}</button>                            
                </div>
                {desc && item.explanation}
            </div>
            {item.copyright ? <label>&copy; {item.copyright}</label> : <p id="NASA">Source: NASA OPEN API</p>}
        </div>
    )
}