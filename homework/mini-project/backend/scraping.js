import axios from 'axios';
import cheerio from 'cheerio';

export async function scrapOgData(url){

    // 1. url 을 받아온 후 html 코드 받아오기
    const scrapedSite = await axios.get(url);

    // 2. scraping 결과에서 og(오픈그래프) 코드 골라내서 변수에 저장하기
    const result = {};
    const $ = cheerio.load(scrapedSite.data);
    $('meta').each((_, el)=>{
        if($(el).attr("property")?.includes("og:")){
            const key = $(el).attr("property"); // og:title, og:description ...
            const value = $(el).attr("content");
            result[key] = value;
        }
    })

    // 3. og 결과값 { key: value } 형식 리턴.
    return result;
    // return console.log(result['og:image']);
}

// scrapOgData('https://bans.tistory.com');