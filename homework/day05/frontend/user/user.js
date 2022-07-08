// 회원 목록 조회 API를 요청해주세요.
const getUser = () => {
  // 받은 데이터로 createUserDiv함수를 이용해
  // 목록 화면을 완성해주세요.
  axios.get('http://localhost:3000/users')
  .then((res) => {
      // 성공 핸들링
      let users = res.data;
  // 2. 받은 데이터로 createMenuCard 함수를 이용해 메뉴 카드를 모두 만들어주세요.
      for(user of users){
        createUserDiv(user);
      }
  });
  
}

const createUserDiv = (data) => {
  const userTableItem = document.createElement('div')
  userTableItem.className = 'User_Table_Item'

  const emailItem = document.createElement('div')
  emailItem.className = 'Item_Info'
  emailItem.textContent = data?.email || 'abc@gmail.com'

  const personalItem = document.createElement('div')
  personalItem.className = 'Item_Info'
  personalItem.textContent = data?.personal || '220111-1******'

  const phoneItem = document.createElement('div')
  phoneItem.className = 'Item_Info'
  phoneItem.textContent = data?.phone || '010-1234-5678'

  const preferItem = document.createElement('div')
  preferItem.className = 'Item_Info'
  preferItem.textContent = data?.prefer || 'naver.com'

  const menuBack = document.querySelector('#User_Data_Wrapper')
  menuBack.appendChild(userTableItem)
  userTableItem.appendChild(emailItem)
  userTableItem.appendChild(personalItem)
  userTableItem.appendChild(phoneItem)
  userTableItem.appendChild(preferItem)
}
