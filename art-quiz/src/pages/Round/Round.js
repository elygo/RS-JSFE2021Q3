import RoundElement from './Round.html';
import { CategoriesArtists } from '../CategoriesArtists';
let a = new CategoriesArtists();
import { images } from '@/data/images';
export class Round {
  constructor() {};

  async render () {
    return RoundElement;
  }

  async after_render () {};
}
