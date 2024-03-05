import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  getPokemons$!: Observable<any> 

  pokemons: any[] = [];
  totalRecords: number = 0;
  rows: number = 50;
  filteredPokemons: any[] = []; 
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService,
    private route: ActivatedRoute, private router: Router) {

    this.getPokemons$ = this.pokemonService.fetchCharacters()
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      const page = params['page'] ? (params['page'] - 1) * this.rows : 0;
      console.log(page)
      this.fetchPokemons(page);
    });
  }

  fetchPokemons(offset: number): void {
    this.pokemonService.getPokemons(offset).subscribe(data => {
      console.log(data)
      this.pokemons = data.results;
      this.filteredPokemons = this.pokemons;
      this.totalRecords = data.count;
    });
  }

  search(): void {
    if (!this.searchTerm) {
      this.filteredPokemons = this.pokemons; // If search term is cleared, show all pokemons
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  paginate(event: any): void {
    const page = event.page + 1; // PrimeNG pages are 0-based, API is 1-based
    this.router.navigate(['/pokemon-list/detail'], { queryParams: { page: page } });
   
  }

  getPokemonId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2]; // Pokémon ID is second to last segment
  }

}
