// create our dictionary using record
let dictionary: Record<string, TrackStates> = {};

interface TrackStates {
  current: string;
  next: string;
}

// create an item that will take the key as the keys of an object, then is value
const item: Record<keyof TrackStates, string> = {
  current: 'js02js9',
  next: '8nlksjsk'
};

// javascript index - numbers are coerced to string when adding to dictionary
dictionary[0] = item;
