interface Item {
  name: string;
}

// only interfaces can extend
interface Artist extends Item {
  songs: number;
}
interface Artist { // interface Artis can be declared twice
getSongs(): number;
}

// for types, intersection needs to be used when want to extend
type Artist2 = { name: string } & Item;


// when using interfdces that are duplicated, then all of properties are merged together
const newArtist: Artist = {
  name: 'ABC',
  songs: 5,
  getSongs() {
    return this.songs;
  }
};
