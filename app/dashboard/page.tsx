
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
    const [startDate, setStartDate] = useState('2026-01-01');
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
        <div className="mx-2 mt-1 text-sm">
            <input className="bg-gray-400 p-2 rounded-sm border border-gray-500"
                type='date'
                defaultValue={startDate}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-2 gap-2 text-xs text-mauve-700 dark:text-mauve-400" >
            { apod.map((item: Apod) => (
                <ApodItem key={item.date} item={item} />
            ))}
        </div>
      </div>  
    )
}

export function ApodItem({ item }: { item: Apod }) {
    const [desc, setDesc] = useState(false);
    const isVideoMp4 = item.media_type === 'video' && item.url.endsWith('.mp4');

    return (
        <div className="w-auto overflow-hidden mt-2 p-2 border border-gray-700 text-sm">
            <p className="font-bold">{item.title}</p>
            <p className="mb-2">{item.date}</p>
            {isVideoMp4
            ? <video controls className="w-full">
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            : item.media_type === 'video'
                ? <iframe  src= {item.url} title={item.title} />
                : <img src={item.url} className="size-auto" />
            }
            <div className="my-2">
                <div className="flex item-start justify-start my-2">
                    <div className="mr-4">Explaination</div>
                    <button className="border border-gray-500 rounded-xs px-1" 
                      onClick={() => setDesc(!desc)}>{!desc ? "Open" : "Close"}</button>                            
                </div>
                {desc && item.explanation}
            </div>
            {item.copyright ? <label>&copy; {item.copyright}</label> : <p>Source: NASA OPEN API</p>}
        </div>
    )
}