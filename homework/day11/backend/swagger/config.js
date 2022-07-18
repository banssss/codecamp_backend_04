export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Bans MiniProject API 명세서',
        version: '1.0.0',
        description: `Bans의 미니 프로젝트 API 입니다. 
        [여기](https://plastic-kitchen-95e.notion.site/PipeLine-Mini-Project-1809d9c70d854671b9e7c6f746c8aa2a) 에서 파이프라인을 확인하실 수 있습니다.`
      },
    },
    apis: ['./swagger/*.swagger.js'], // files containing annotations as above
  };