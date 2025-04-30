const cards = {
    card_1: {
        cardId: '1',
        userId: '1',
        
    },
}


fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    .then((response) => response.json())
    .then((json) => console.log());