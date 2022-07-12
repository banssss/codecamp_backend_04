export function getToday(){
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = now.getMonth()+1;
    const dd = now.getDate();
    const today = `${String(yyyy).padStart(4,'0')}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;

    return today;
}