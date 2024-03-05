import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  private baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=50&offset=50'

  private pokemonAPI = 'https://pokeapi.co/api/v2/pokemon'

  constructor(private httpClient: HttpClient) { }


  fetchCharacters(): Observable<any> {
   return this.httpClient.get(this.baseURL)
  }

  getPokemons(offset: number = 0, limit: number = 50): Observable<any> {
    return this.httpClient.get(`${this.pokemonAPI}/?offset=${offset}&limit=${limit}`);
  }
  
  getPokemonDetail(idOrName: string): Observable<any> {
    return this.httpClient.get(`${this.pokemonAPI}/${idOrName}`);
  }
}
