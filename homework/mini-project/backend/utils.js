export function getToday(){
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = now.getMonth()+1;
    const dd = now.getDate();
    const today = `${String(yyyy).padStart(4,'0')}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;

    return today;
}

// phone 번호가 담긴 문자열을 분해 후 dash '-' 추가하여 배열로 반환하기.
export function addDashToPhone(phone){
    if(phone.length === 10) return phone.slice(0,3)+'-'+phone.slice(3,6)+'-'+phone.slice(6,10);
    if(phone.length === 11) return phone.slice(0,3)+'-'+phone.slice(3,7)+'-'+phone.slice(7,11);
}