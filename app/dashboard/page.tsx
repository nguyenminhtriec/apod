
'use client';

import TurndownService from 'turndown';
import ReactMarkdown from 'react-markdown';
import React, { Suspense, useState, useEffect } from "react";
// import { ChevronRight, ChevronDown } from "lucide-react";
import { getRandomDate } from "@/app/utils/datemanage";


type Apod = {
    copyright: string | undefined,
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    title: string,
    url: string
}

export default function Apod() {
    const [startDate, setStartDate] = useState('2026-01-01');
    const [apod, setApod] = useState<Apod[]>([]);
    const [loading, setLoading] = useState(false);

    const getPicture = async () => {
        setLoading(true);
        setApod([]);
        const apodResponse = await fetch('/dashboard/api', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({startDate}),
        })
        if (!apodResponse.ok) {
            console.log("No response from API");
            return;
        }
        const data = await apodResponse.json();
        console.log("Apod received", data);
        setApod(data);
        setLoading(false);
    }

    useEffect(() => {
        getPicture();
    }, [startDate]);

    return (
      <div>
        <div className="flex items-center mx-2 mt-1 text-sm">
            <DatePicker isoStringDate={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <button 
                disabled={loading}
                onClick={() => {
                    const randomDate = getRandomDate();
                    setStartDate(randomDate.split('T')[0]);
                }} 
                className="bg-blue-500 rounded-sm h-8 hover:bg-blue-400 ml-4 p-1 cursor-pointer "
            >
                Random Pictures
            </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-2 gap-2 text-xs text-mauve-700 dark:text-mauve-400" >
            { apod.map((item: Apod) => (
                <Suspense key={item.date} fallback={<div>Loading...</div>} >
                    <ApodItem item={item} />
                </Suspense>
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
            <img src={item.hdurl} className="w-full" />
            <div className="my-2">
                <div className="flex item-start justify-start my-2">
                    <div className="mr-4">Explanation</div>
                    <button className="border border-gray-500 rounded-xs px-1 cursor-pointer" 
                      onClick={() => setDesc(!desc)}>{!desc ? "Open" : "Close"}</button>                            
                </div>
                <div >{desc && <ReactMarkdown>{convertToMarkdown(item.explanation)}</ReactMarkdown>}</div>
            </div>
            {item.copyright && <div>&copy;{<ReactMarkdown>{convertToMarkdown(item.copyright)}</ReactMarkdown>} </div> }
        </div>
    )
}

function ApodMedia({ item }: { item: Apod }) {
    return (
        <div>
            {item.media_type === 'image'
            ? <img src={item.hdurl} className="size-auto" />
            : item.media_type === 'video' 
                ? <video controls className="w-full">
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                : <iframe className="w-auto" 
                src= {item.url} title={item.title} allow="encrypted-media; accelerometer;" allowFullScreen />               
            }
        </div>
    )
}

export function DatePicker({isoStringDate, onChange}: {isoStringDate: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {    
    return (
        <div className="flex items-center justify-start my-2">        
            <input 
                type="date"
                value={isoStringDate}
                min='1995-06-16'
                max={new Date(Date.now()).toISOString().split('T')[0]}
                onChange={onChange}
                className="bg-gray-400 p-2 rounded-sm border border-gray-500"
            />
        </div>
    )
}

function convertToMarkdown(html: string): string {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);
    return markdown;
}

