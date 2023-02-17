// ******************* type of and Type Guards
function foo(bar: string | number) {
  if (typeof bar === 'string') {
    // handling is string
  }

  // here it is a number
}


class Song {
  constructor(public title: string, public duration: string | number) {

  }
}

function getSongDuration(item: Song){
  // check that the duration is of type string
  if(typeof item.duration === 'string'){
    return item.duration;
  }

  const {duration} = item;
  const minutes = Math.floor(duration / 60000);
  const seconds = (duration / 1000) % 60;

  // parse the duration from milliseconds
  return `${minutes}:${seconds}`;
}

// get song duration as string
const songDurationFromString = getSongDuration(new Song('title', '05:41'));
console.log(songDurationFromString);

// get song duration as number
const songDurationFromMs = getSongDuration(new Song('title', 33000));
console.log(songDurationFromString);

