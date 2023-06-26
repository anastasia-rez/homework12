
const url = 'https://fakestoreapi.com/products';

const model = {
    rates: [],
    searchText: '',
    sort: null,

    doSort: function(direction) {
        this.sort = direction;
        this.render();
    },

    doSearch(text){
        this.searchText = text.toLowerCase();
        this.render();
    },

    load: async function(){
        let data = await fetch(url);
            data = await data.json();
          
        this.rates = data;
        
        this.render();
    },

    render: function(){
        let productsGrid = document.getElementById('products-grid');

        if(this.sort == 'up'){
            this.rates.sort( (a, b) => a.price - b.price);
        } else if(this.sort == 'down') {
            this.rates.sort( (a, b) => b.price - a.price);
        }

        let listToshow = this.rates.filter(item => item.description.toLowerCase().includes(this.searchText) || item.title.toLowerCase().includes(this.searchText));


        productsGrid.innerHTML = listToshow.map(item => `
            <div class="py-2">
                <div class="card overflow-auto m-2" style="height:500px">
                    <img src="${item.image}" class="card-img-top p-3" alt="..." style="height:250px">
                    <div class="card-body">
            
                        <h5 class="card-title" >
                            ${item.title}
                        </h5>
            
                        <p class="card-text ">
                            ${item.description}
                        </p>
            
                        <p class="text-end fs-3">
                            ${item.price} $
                        </p>
                    
                    </div>
                    
                </div>
            
            </div>
            `).join('');   

    }
}

model.load();


const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function(){
    model.doSearch(searchInput.value);
});

const sortUpBtn = document.getElementById('reductionPrice');

sortUpBtn.addEventListener('click', function(){
    model.doSort('up');
});

const sortDownBtn = document.getElementById('ascendingPrice');

sortDownBtn.addEventListener('click', function(){
    model.doSort('down');
});