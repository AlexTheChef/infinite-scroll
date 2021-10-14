const url = "http://localhost:3001/api/users"
const display = document.querySelector('.list')

let limit = 10;
let hasMorePages = true;
let currentPage = 1;
total = 0;

function Fetch(page, limit) {
    fetch(url + `?page=${page}&limit=${limit}`)
        .then((result) => result.json())
        .then((data) => {
            hasMorePages = data.hasMore
            for (const element of data.results) {
                display.innerHTML += `
                <ul>
                    <li>ID: ${element.id}</li>
                    <li>Name: ${element.name}</li>
                    <li>Email: ${element.email}</li>
                    <li>Address: ${element.address}</li>
                    <li>Country: ${element.country}</li>
                    <li>Company: ${element.company}</li>
                </ul>
            `
            }
        })
}

const hasMoreQuotes = (page, limit, hasMoreQuotes) => {
    const startIndex = (page - 1) * limit + 1;
    return hasMoreQuotes !== 0;
};

const loadQuotes = async (page, limit) => {   
    setTimeout(async () => {
        try {           
            if (hasMoreQuotes(page, limit, hasMorePages)) {               
                const response = Fetch(page, limit);                           
            }
        } catch (error) {
            console.log(error.message);
        }
    }, 500);
};

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMoreQuotes(currentPage, limit, hasMorePages)) {
        currentPage++;
        loadQuotes(currentPage, limit);
    }
}, {
    passive: true
});

loadQuotes(currentPage, limit);
