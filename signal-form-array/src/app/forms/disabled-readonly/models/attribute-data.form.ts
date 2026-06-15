import {min, minError, required, schema, Schema, validate} from '@angular/forms/signals';

export interface AttributeDataForm {
  alcoholPurchase: boolean;
  age: number;
  beverage: Array<string>;
}

export const attributeInitialValue: AttributeDataForm = {
  alcoholPurchase: false,
  age: 18,
  beverage: [
    'Beer',
    'Wine'
  ]
}

export const attributeSchema: Schema<AttributeDataForm> = schema<AttributeDataForm>((path) => {
  // age is required only when buying alcohol
  required(path.age,
    {
      message: 'Age ge is required when purchasing alcohol',
      when: (ctx) => ctx.valueOf(path.alcoholPurchase)
    },
  );

  // age must be over 18 only when buying alcohol
  // min(path.age,
  //   (ctx) => ctx.valueOf(path.alcoholPurchase) ? 18 : undefined, {
  //     message: 'Must be 18 or over to purchase alcohol'
  //   }
  // );

  validate(path.age, (ctx) => {
    //   if (ctx.valueOf(path.alcoholPurchase)
    //     && !ctx.valueOf(path.age)) {
    //     return requiredError({message: 'Age is required when purchasing alcohol'});
    //   }
    //
    //   if (ctx.valueOf(path.alcoholPurchase) && ctx.valueOf(path.age) < 18) {
    //     return minError(18, {message: 'Must be 18+ to purchase alcohol'});
    //   }

    if (!ctx.valueOf(path.alcoholPurchase)) {
      return null;
    }

    const age = ctx.valueOf(path.age);
    return age < 18
      ? minError(18, {message: 'Must be 18 or over to purchase alcohol'})
      : null;
  });

  // applyWhen(
  //   (ctx) => ctx.valueOf(path.alcoholPurchase),
  //   () => {
  //     required(path.age, {message: 'Age is required when purchasing alcohol'});
  //     min(path.age, 18, {message: 'Must be 18+ to purchase alcohol'});
  //   }
  // );

  // Disable beverages if under 18
  // disabled(path.beverage, (ctx) => ctx.valueOf(path.age) < 18);
});
