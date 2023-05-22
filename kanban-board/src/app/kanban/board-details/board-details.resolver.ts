import {Injectable} from '@angular/core';
import {BoardItem} from "../board-item/board-item";

@Injectable({
  providedIn: 'root',
})
export class BoardDetailsResolver {
  constructor() {
  }

  public resolveToDo(): BoardItem[] {
    console.log('Resolving toDoItems')
    return [
      {
        id: 'id3',
        title: 'Title of item 3',
        description: 'Description of item 3 some description to make the card bigger trying some more',
        assignedTo: 'Developers Name',
        points: 3,
        state: 'New'
      },
      {
        id: 'id4',
        title: 'Title of item 1',
        description: 'Description of item 1 make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more',
        assignedTo: 'Developer',
        points: 3,
        state: 'New'
      },
      {
        id: 'id6',
        title: 'Title of item 3',
        description: 'Description of item 3 some description to make the card bigger trying some more',
        assignedTo: 'Developers Name',
        points: 3,
        state: 'New'
      },
      {
        id: 'id7',
        title: 'Title of item 1',
        description: 'Description of item 1 make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more',
        assignedTo: 'Developer',
        points: 3,
        state: 'New'
      },
      {
        id: 'id8',
        title: 'Title of item 2',
        description: 'Description of item 2 make the card bigger trying some more make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more',
        assignedTo: 'Developer',
        points: 3,
        state: 'New'
      },
      {
        id: 'id9',
        title: 'Title of item 3',
        description: 'Description of item 3 some description to make the card bigger trying some more',
        assignedTo: 'Developers Name',
        points: 3,
        state: 'New'
      }
    ];
  }

  public resolveDoing(): BoardItem[] {
    return [

      {
        id: 'id2',
        title: 'Title of item 2',
        description: 'Description of item 2 make the card bigger trying some more make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more',
        assignedTo: 'Developer',
        points: 3,
        state: 'Doing'
      }
    ];
  }

  public resolveTesting(): BoardItem[] {
    return [
      {
        id: 'id5',
        title: 'Title of item 2',
        description: 'Description of item 2 make the card bigger trying some more make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more',
        assignedTo: 'Developer',
        points: 3,
        state: 'Testing'
      }
    ];
  }

  public resolveSignOff(): BoardItem[] {
    return [    ];
  }

  public resolveDone(): BoardItem[] {
    return [
      {
        id: 'id1',
        title: 'Title of item 1',
        description: 'Description of item 1 make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more',
        assignedTo: 'Developer',
        points: 3,
        state: 'Done'
      }
    ];
  }

}
