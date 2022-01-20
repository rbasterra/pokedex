
    
window.addEventListener('load', () => {   
    const list = document.getElementById('pokedex');

    const promises = [];

    for (let i=1; i <= 150; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
        
    }
   
   
   Promise.all(promises).then(results =>{ 
       const pokemon = results.map(result =>({
           name:result.name,
           image: result.sprites['front_default'],
           type: result.types.map(type => type.type.name).join(','),
           id: result.id,
           abilities: result.abilities.map (ability => ability.ability.name).join(', '),
           height: result.height,
           stats: result.stats
       }));

       console.log(results[0]);

       displayPokemon(pokemon);
       return pokemon;
    })
    .then ((results) =>{
        // console.log(results.find(result => result.name =='venusaur'));
        
        const boxes = document.querySelectorAll('.box');
        // console.log(boxes);
        boxes.forEach(box => box.addEventListener('mouseenter', (e) => {console.log('hover');
        console.log(e.target);

        const divBack = e.target.querySelector('.box-back');
        const divFront = e.target.querySelector('.box-front');
        const name = divFront.querySelector('.card-title').innerText;
        const pokemon = results.find(result => result.name == name.toLowerCase());
        console.log(pokemon);
        
        const  rows = pokemon.stats.map(stat =>`<tr><td>${stat.stat.name}</td><td>${stat.base_stat}</td><td>${stat.effort}</td></tr>`).join('');

        console.log(rows);

        divBack.innerHTML = `<li class='card-back'>
        <div>
        <p class='card=subtitle'>Abilities: ${pokemon.abilities}</p>
        <p class='card=subtitle'>Height: ${pokemon.height}</p>
        </div>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Base</th>
                    <th>Effort</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        </dvi>
        </li>`


        if (!(divBack === null)){
            console.log('aqui divBack: ' + divBack);
            // divBack.innerText = 'probando';
        }

        if (!(divFront === null)){
            // console.log('aqui divFront" ' + divFront);
            // console.log('name: ' + divFront.querySelector('.card-title').innerText);
            // const name = divFront.querySelector('.card-title').innerText;
            // console.log(name);
            // console.log(results.find(result => result.name == name.toLowerCase()));
        }

        }));
        // box.addEventListener('click', () => console.log('hover'));
    });

    const displayPokemon = (pokemon) => {
        const myPokemon = pokemon.map( poke =>
            `
            <div class='box'>
            <div class="box-inner">
            <div class="box-front">
            <li class='card'><h2 class='card-title'>${poke.name}</h2>
            <img class='card-image' src='${poke.image}'/>
            <p class='card=subtitle'>${poke.type}</p>
            <p class='card=subtitle'>${poke.id}</p>
            </li>
            </div>
            <div class="box-back">back face</div>
            </div>
            </div> 
            `
        ).join('');

        list.innerHTML = myPokemon;
                
    }
   
});