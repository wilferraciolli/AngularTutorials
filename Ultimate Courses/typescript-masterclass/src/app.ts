import * as _ from 'lodash';

// this will be a know type because we have declared lodash types
_.chunk([1, 2, 3, 4], 2);

// add our own method to lodash
_.mixin({
  log(item: string) {
    console.log(':::', item);
  }
});

_.log('item to log');
