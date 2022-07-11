import axios from 'axios';

// 1. 비동기 방식일 때
function fetchPost(){
    const result = axios.get('https://koreanjson.com/posts/1')
    console.log(`비동기 방식 : `, result); // Promise
}

fetchPost();

// 2. 동기 방식일 때
async function fetchPost2(){
    const result = await axios.get('https://koreanjson.com/posts/1')
                            // fetch('https://koreanjson.com/posts/1') - 다른 도구들도 있습니다!
    console.log(`동기 방식 : `, result.data); // 정상적인 데이터
}

fetchPost2();