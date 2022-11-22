import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {

  public transform(value: any): string {
    // used to convert description for workouts based on the type
    if (value.type === 'endurance') {
      return `
        Distance: ${ value.endurance.distance + 'km' },
        Duration: ${ value.endurance.duration + 'mins' }
      `;
    } else {
      return `
        Weight: ${ value.strength.weight + 'kg' },
        Reps: ${ value.strength.reps },
        Sets: ${ value.strength.sets }
      `;
    }
  }
}
