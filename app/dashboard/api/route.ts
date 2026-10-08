
import { simpleDate, getRandomDate } from "@/app/utils/datemanage";

export async function POST(req: Request) {
    const baseUrl = process.env.APOD_BASE_URL;
    const {startDate} = await req.json();
    const params = harmonizeParams(startDate);

    const url = `${baseUrl}?${params.toString()}`
    console.log("Getting data from", url);
    const response = await fetch(url, {cache: "force-cache"});
    const data = await response.json();

    if (!response.ok) {
        return Response.json({error: "Failed to fetch data from APOD API"}, {status: 500});
    }
    return Response.json(data);
}

function harmonizeParams(date: string, dateOffset=3) {
    const apiKey: string = process.env.APOD_API_KEY || '';
    const stamp = Date.parse(date);
    let params = new URLSearchParams();
    
    const offset = dateOffset * 24 *3600 * 1000;
    const newStamp = (stamp + offset) < Date.now() ? stamp+offset : Date.now()-1;
    const endDate = new Date(newStamp).toISOString();
    const startDate = new Date(date).toISOString();
    const simpleEndDate = simpleDate(endDate);
    const simpleStartDate = simpleDate(startDate);

    params.set('date_from', simpleStartDate);
    params.set('date_to', simpleEndDate);
    params.set('api_key', apiKey);
    
    return params;
}

