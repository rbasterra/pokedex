
    
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
       }));

       displayPokemon(pokemon);
    });

    const displayPokemon = (pokemon) => {
        const myPokemon = pokemon.map( poke =>
            `
            <li class='card'><h2 class='card-title'>${poke.name}</h2>
            <img class='card-image' src='${poke.image}'/>
            <p class='card=subtitle'>${poke.type}</p>
            <p class='card=subtitle'>${poke.id}</p>
            </li>
            `
        ).join('');

        list.innerHTML = myPokemon;
    }
   
});